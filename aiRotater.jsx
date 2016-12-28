//Rotate an selected Object, to fit selected anchor points tangent.
//選択したオブジェクトを選択したアンカーポイントに中心を揃え、そのポイントにおける接線に合せて回転をかけてます。

$._aiRotater ={
	offset : 0,
	isLft : true,
	vtcl : false,
	rst : true,
	apply : function (ofst, lft, rst, vtcl){
		$._aiRotater.offset = ofst;
		$._aiRotater.isLft = lft;
		$._aiRotater.vtcl = vtcl;
		$._aiRotater.rst = rst;
		var tg = app.activeDocument.selection;
		if (tg.length!=2) return;
		if ($._aiRotater.isTGP(tg[0])) 
			$._aiRotater.exe(tg[0], $._aiRotater.restoreRotation(tg[1]));
		else if ($._aiRotater.isTGP(tg[1]))
			$._aiRotater.exe(tg[1], $._aiRotater.restoreRotation(tg[0]));
		},	
	exe : function (a, b){
		if ($._aiRotater.vtcl) $._aiRotater.rotater(b,[0,0],-Math.PI/2);
		var angle,idx;
		var tgp = $._aiRotater.getTGP(a);
		if (!tgp) return;
		if (tgp.parent.pathPoints.length<2) return;
		var ctr = $._aiRotater.getCenter(b);
		var diff = [tgp.anchor[0] - ctr[0], tgp.anchor[1] - ctr[1]];
		if (!$._aiRotater.isCorner(a.pathPoints[$._aiRotater.getIndex(a)])){
			angle = $._aiRotater.getAngle(
			tgp.rightDirection[0] - tgp.leftDirection[0],
			tgp.rightDirection[1] - tgp.leftDirection[1]);
			if (angle>=Math.PI/2) angle -= Math.PI;
			if (angle<=-Math.PI/2) angle += Math.PI;
			}
		else if ($._aiRotater .isLft&&!$._aiRotater.isSame(tgp.leftDirection,tgp.anchor)){
			angle = $._aiRotater.getAngle(
				tgp.anchor[0] - tgp.leftDirection[0],
				tgp.anchor[1] - tgp.leftDirection[1]);
			}
		else if (!$._aiRotater .isLft&&!$._aiRotater.isSame(tgp.rightDirection,tgp.anchor)){
			angle = $._aiRotater.getAngle(
				tgp.rightDirection[0] - tgp.anchor[0],
				tgp.rightDirection[1] - tgp.anchor[1]);
			}
		else {
			idx = $._aiRotater.getIndex(tgp.parent);
			if (idx!=0){
				if (tgp.parent.PolarityValues==PolarityValues.POSITIVE
					||idx==tgp.parent.pathPoints.length-1){
					angle = $._aiRotater.getAngle(
						tgp.anchor[0] - tgp.parent.pathPoints[idx-1].rightDirection[0],
						tgp.anchor[1] - tgp.parent.pathPoints[idx-1].rightDirection[1]);
					}
				else {
					angle = $._aiRotater.getAngle(
						tgp.anchor[0] - tgp.parent.pathPoints[idx-1].leftDirection[0],
						tgp.anchor[1] - tgp.parent.pathPoints[idx-1].leftDirection[1]);
					if (angle>Math.PI/2) angle += Math.PI/2;
					}
				}
			}
		$._aiRotater.rotater(b, diff, angle);	
		},
	isSame : function(a,b){
		if(a[0]==b[0]&&a[1]==b[1]) return true;
		return false;
		},
	getIndex : function(tg){
		for (var i=0;i<tg.pathPoints.length;i++)
			if (tg.pathPoints[i].selected==PathPointSelection.ANCHORPOINT)
				return i;
		return null;
		},
	rotater : function (tg, df, angle){
		var tm = new Matrix();
		tm.mValueA = Math.cos(angle);
		tm.mValueB = Math.sin(angle);
		tm.mValueC = -Math.sin(angle);
		tm.mValueD = Math.cos(angle);
		tm.mValueTX = df[0] + $._aiRotater.offset * Math.cos(angle+Math.PI/2);
		tm.mValueTY = df[1] + $._aiRotater.offset * Math.sin(angle+Math.PI/2);
		tg.transform(tm,true,true,true,true,1);
		},
	isTGP : function (obj){
		if (obj.typename=="GroupItem"
			||obj.typename=="TextFrame"
			||obj.typename=="CompoundPathItem"
			||obj.typename=="SymbolItem") 
				return false;
		if (obj.typename=="PathItem") {
			var n = 0;
			for (var i=0;i<obj.pathPoints.length;i++){
				if(obj.pathPoints[i].selected==PathPointSelection.ANCHORPOINT)
					n++;
				if (n>1) return false;
				}
			return true;
			}
		},
	getTGP : function (obj){
		var n = 0;
		var a;
		for (var i=0;i<obj.pathPoints.length;i++){
			if(obj.pathPoints[i].selected==PathPointSelection.ANCHORPOINT){
				a = obj.pathPoints[i];
				n++;
				}
			if (n>1) return false;
			}
		return a;
		},
	getCenter : function (tg){
		var tmp = tg.geometricBounds;
		return [tmp[0]+(tmp[2]-tmp[0])/2, tmp[1]-(tmp[1]-tmp[3])/2];
		},
	isCorner : function(pt){
		var p= new Array();
		p[0] = pt.anchor;
		p[1] = pt.leftDirection;
		p[2] = pt.rightDirection;
		if (p[0][0]==p[1][0]&&p[0][0]==p[2][0]){
			if (p[1][1]==p[2][1]) return true;
			if (p[0][1]<p[1][1]&&p[0][1]>p[2][1]
				||p[0][1]>p[1][1]&&p[0][1]<p[2][1]) return true;
			return false;
			}
		var delta = (p[0][1] - p[1][1]) / (p[0][0] - p[1][0]);
		var ofst = p[0][1] - p[0][0] * delta;
		var rslt = Math.floor(delta * p[2][0] + ofst) - Math.floor (p[2][1]);
		if (rslt==0) return false;
		else return true;
		},
	getAngle : function (x,y){
		if (x==0&&y==0) return 0;
		return Math.atan2(y, x);
		},
	restoreRotation : function (tgt){
		if (!$._aiRotater.rst) return tgt;
		if (tgt.typename=="PathItem"
			||tgt.typename=="CompoundPathItem"
			||tgt.typename=="SymbolItem") return tgt;
		var tx;
		if (tgt.typename=="TextFrame") tx = tgt;
		else {
			if (tgt.textFrames.length<1) return tgt;
			tx = tgt.textFrames[0];
			}
		var angle;
		if (tx.matrix.mValueA<0&&tx.matrix.mValueB<0)
			angle = Math.acos(tx.matrix.mValueD);
		else if (tx.matrix.mValueC<0)
			angle = -Math.acos(tx.matrix.mValueA);
		else
			angle = -Math.asin(tx.matrix.mValueB);
		var tm = app.getRotationMatrix(angle/Math.PI*180);
		tgt.transform(tm,true,true,true,true,1);
		return tgt;
		}
	}

$._aiRotater.apply(0,false,true,false);
