var tg = app.selection[0];

var str="";
var ch =[];
if (tg.fillColor instanceof RGBColor){
	ch =["red","green","blue"];
	for (var i=0;i<3;i++){
		str += ch[i] + ":" + eval("tg.fillColor."+ch[i]) + "\n";
		}
	}
else {
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
