try {
	var libPath = "/HttpClient.framework";
	if (eo==null) var eo = new ExternalObject("lib:" + libPath);
	var rt  = "";
	rt = eo.getHTTP("http://chuwa.iobb.net");
	alert(rt);
	eo.unload();
	} catch (e){
		alert("error: " + e);
		}

