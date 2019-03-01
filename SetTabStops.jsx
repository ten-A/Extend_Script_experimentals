//Sets Illustrator's tab stops in one time. 

var tabPos = [30,60,90], tb = new Array(3);
for(var i=0; i<tabPos.length; i++){
  tb[i] = new TabStopInfo;
  tb[i].position = tabPos[i];
  }
app.selection[0].paragraphs[0].tabStops = tb;
