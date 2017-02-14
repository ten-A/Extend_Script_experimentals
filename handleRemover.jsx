var tg = app.selection;
for(var j,i=0;i<tg.length;i++){
  for (j=0;j<tg[i].pathPoints.length;j++){
    tg[i].pathPoints[j].leftDirection = tg[i].pathPoints[j].anchor;
    tg[i].pathPoints[j].rightDirection = tg[i].pathPoints[j].anchor;
    }
  }
