(function(){
	var tg = app.selection;
	if(tg.length>2) return;
	var pt = [], i = 0;
	if(tg.length==2) {
		for(var k=0;k<2;k++){
			while (pt.length<2){
				if(tg[k].pathPoints[i].selected==PathPointSelection.ANCHORPOINT) 
					pt.push(tg[k].pathPoints[i].anchor);
				if(i==tg[k].pathPoints.length-1) break;
				i++;
				}
			i = 0;
			if (pt.length==2) break;
			}
		}
	else {
		while (pt.length<2){
			if(tg[0].pathPoints[i].selected==PathPointSelection.ANCHORPOINT) 
				pt.push(tg[0].pathPoints[i].anchor);
			if(i==tg[0].pathPoints.length-1) break;
			i++;
			}
		}
	if(pt.length<2) return;
	if (pt[0][0]>pt[1][0])pt.reverse();
	var deg = Math.atan2(-pt[1][1]+pt[0][1], pt[1][0]-pt[0][0])/Math.PI*180;
	if (tg[0].parent.typename=="CompoundPathItem") tg[0].parent.rotate(deg);
	else tg[0].rotate(deg);
	}())

