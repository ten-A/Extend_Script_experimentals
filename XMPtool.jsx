XMPtool = {
	ns : "http://ns.chuwa.sytes.net/idcomment/1.0/",
	prefix : "ID_meta:",//custom metada
  f : new Object(),
	read : function(prop){//read exist custom metadata.
    if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
		var xmpFile = new XMPFile(this.f.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ);
		var xmpPackets = xmpFile.getXMP();
		var xmp = new XMPMeta(xmpPackets.serialize());
		alert(xmp.getProperty(this.ns, prop).toString());
		},
	write : function(prop, val){ //argumetns{prop:String/property of custom metadata, val1:String/value} 
    if(xmpLib==undefined) var xmpLib = new ExternalObject('lib:AdobeXMPScript');
		var xmpFile = new XMPFile(this.f.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
		var xmp = xmpFile.getXMP();
		var mt = new XMPMeta(xmp.serialize());
		XMPMeta.registerNamespace(this.ns, this.prefix);
		mt.setProperty(this.ns, prop, val);
		if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(mt);
		xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
		}
	}

XMPtool.f = File.openDialog ();
XMPtool.write("memo1", "てすとの文字列ですね？");
XMPtool.read("memo1");
		
