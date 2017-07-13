/*
	History Viewer 1.0.1
	2014.5.30 release   2014.6.10 update
*/
function read (fls){
	var prop = "History";
	var ns ="http://ns.adobe.com/xap/1.0/mm/";
	if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
	var xmpFile = new XMPFile(fls, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ);
	var xmpPackets = xmpFile.getXMP();
	var xmp = new XMPMeta(xmpPackets.serialize());
	var history = "";
	for (var i=1;i<=xmp.countArrayItems(ns,prop);i++){
		history += xmp.getProperty(ns, prop + "[" + i + "]" + "/stEvt:when").toString() + "  "
			+ xmp.getProperty(ns, prop + "[" + i + "]" + "/stEvt:action").toString() + "  "
			+ xmp.getProperty(ns, prop + "[" + i + "]" + "/stEvt:softwareAgent").toString() + "\r";
		}	
	return history;
	}


var f = app.activeDocument.fullName.fsName;
//var f = File.openDialog().fsName;

var w = new Window('dialog',"History Viewer");
var tx = w.add("edittext",undefined,"",{multiline:true});
tx.size = [540,400];
tx.text = read(f);
var bt = w.add("button",undefined,"Close");
bt.onClick = function (){w.close();};
w.show();
