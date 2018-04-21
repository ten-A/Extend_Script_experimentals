/*
	Link Serializer for InDesign ver.0.0.1
	This script collects all graphics item to the selected holder and geven serialized names. Linked graphics also swapped serialized files .
	All works will logged. Sreialized graphics files also have original name in XMP metadata field.
	License : MTI License.
	Creator : Ten A (An Adobe Community professional) 
*/


linkSerializer = {
	dstFolder  : "~/Desktop/testFolder",
	fn_prefix : "serializedFiles",
	log : "~/Desktop/result.log",
	ns : "http://ns.chuwa.sytes.net/idcomment/1.0/",
	prefix : "ID_meta:",
	f : new Object(),
	read : function(prop){
		if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
		var xmpFile = new XMPFile(this.f.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ);
		var xmpPackets = xmpFile.getXMP();
		var xmp = new XMPMeta(xmpPackets.serialize());
		alert(xmp.getProperty(this.ns, prop).toString());
		},
	write : function(prop, val){ //f:fileObject, val1:String, val2:String
		if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
		var xmpFile = new XMPFile(this.f.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
		var xmp = xmpFile.getXMP();
		var mt = new XMPMeta(xmp.serialize());
		XMPMeta.registerNamespace(this.ns, this.prefix);
		mt.setProperty(this.ns, prop, val);
		if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(mt);
		xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
		},
	collect : function (tgt){
		var tgtFldr = Folder(this.dstFolder.toString());
		if (!tgtFldr.exists) tgtFldr.create();
		var tgtFile, bnds, tmp;
		var num = "";
		var newPath = "";
		var fullPath = "";
		var tg = tgt.allGraphics;
		var len = tg.length;
		var logFile = File(this.log);
		if (logFile.open('w')){
			var ts = new Date();
			logFile.writeln("Start time : " + ts);
			for (var i=0;i<len;i++){
				if (i<10) num = "00" + i;
				else if (i<100) num = "0" + i;
				else num = i;
				newPath = this.dstFolder+ "/" + this.fn_prefix + num + tg[i].itemLink.name.match(/\.[a-zA-Z0-9]+$/);
				fullPath = tg[i].itemLink.filePath.replace(/:/g, "/");
				logFile.writeln(i + "\t" + fullPath + "\t" +newPath);
				tgtFile = File(tg[i].itemLink.filePath).copy(newPath);
				this.f = File(newPath);
				this.write("memo1", fullPath);
				tmp = tg[i].parent;
				tmp.place(File(newPath));
				}
			logFile.close();
			}
		}
	}


//~ linkSerializer.dstFolder = "~/Desktop/collect_folder";
//~ linkSerializer.fn_prefix = "testDocument";
//~ linkSerializer.log = "~/Desktop/testResult.log";
linkSerializer.collect(app.activeDocument)
