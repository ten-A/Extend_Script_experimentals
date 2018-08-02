var tg = app.selection[0];

var str="";
var ch =[];
if (tg.fillColor instanceof RGBColor){
	str = "#";
	ch =["red","green","blue"];
	for (var i=0;i<3;i++){
		if (eval("tg.fillColor"+ch[i])==0) str += "00";
		else str += eval("Number(tg.fillColor."+ch[i]+").toString(16)");
		}
	}
else {
	str = "";
	ch =["cyan","magenta","yellow","black"];
	for (var i=0;i<4;i++){
		str += ch[i] + ":" + eval("tg.fillColor." + ch[i]) + "\n" ;
		}
	}

var tx = app.activeDocument.textFrames.add();
tx.contents = str;
tg.selected = false;
tx.selected = true;
app.cut();
tg.selected = true;
