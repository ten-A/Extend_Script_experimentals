//Rotate an selected Object, to fit selected anchor points tangent.
//選択したオブジェクトを選択したアンカーポイントに中心を揃え、そのポイントにおける接線に合せて回転をかけてます。

$._aiRotater ={
	apply : function (){
		var tg = app.activeDocument.selection;
		if (tg.length!=2) return;
		var angle,idx;
		if ($._aiRotater.isTGP(tg[0]))
			$._aiRotater.exe(tg[0], tg[1]);
		else
			$._aiRotater.exe(tg[1], tg[0]);
		},	
	exe : function (a, b){
		var tgp = $._aiRotater.getTGP(a);
		var ctr = $._aiRotater.getCenter(b);
		var diff = [tgp.anchor[0]-ctr[0], tgp.anchor[1]-ctr[1]];
		if (!$._aiRotater.isCorner(a.pathPoints[$._aiRotater.getIndex(a)])){
			angle = $._aiRotater.getAngle(
			tgp.rightDirection[0] - tgp.leftDirection[0],
			tgp.rightDirection[1] - tgp.leftDirection[1]);
			}
		else {

			}
		$._aiRotater.rotater(b, diff, angle);	
		},
	getIndex : function(tg){
		for (var i=0;i<tg.pathPoints.length;i++){
			if (tg.pathPoints[i].selected==PathPointSelection.ANCHORPOINT)
				return i;
			}
		return null;
		},
	rotater : function (tg, df, angle){
		var tm = new Matrix();
		tm.mValueA = Math.cos(angle);
		tm.mValueB = Math.sin(angle);
		tm.mValueC = -Math.sin(angle);
		tm.mValueD = Math.cos(angle);
		tm.mValueTX = df[0];
		tm.mValueTY = df[1];
		app.selection[i].transform(tm,true,true,true,true,1);
		},
	isTGP : function (obj){
		if (obj.typename==GroupItem
			||obj.typename==TextFrame
			||obj.typename==CompoundPathItem) 
				return false;
		if (obj.typename==PathItem) {
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
		var delta = (p[0][1] - p[1][1]) / (p[0][0] - p[1][0]);
		var ofst = p[0][1] - p[0][0] * delta;
		var rslt = Math.floor(delta * p[2][0] + ofst) - Math.floor (p[2][1]);
		if (rslt==0) return false;
		else return true;
		},
	getAngle : function (x,y){
		if (x==0&&y==0) return 0;
		return Math.atan2(y, x);
		}
	}

$._aiRotater.apply();
