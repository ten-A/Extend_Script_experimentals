(function (){
	var actionCode = "/version 3 /name [ 4 73657431]"
		+ "/isOpen 1 /actionCount 1"
		+ "/action-1 {/name [ 7 616374696f6e31]"
		+ "/keyIndex 0 /colorIndex 0 /isOpen 1"
		+ "/eventCount 1"
		+ "/event-1 {/useRulersIn1stQuadrant 0 /internalName (ai_plugin_simplify)"
		+ "/isOpen 0 /isOn 1 /hasDialog 1 /showDialog 0 /parameterCount 4"
		+ "/parameter-1 {"
		+ "/key 1919182693 /showInPalette 4294967295"
		+ "/type (unit real) /value 100.0 /unit 592474723}"
		+ "/parameter-2 {"
		+ "/key 1634561652 /showInPalette 4294967295 /type (unit real) /value 0.0 /unit 591490663}"
		+ "/parameter-3 {"
		+ "/key 1936553064 /showInPalette 4294967295 /type (boolean) /value 0}"
		+ "/parameter-4 {"
		+ "/key 1936552044 /showInPalette 4294967295 /type (boolean) /value 0}}}";

	var tmp = File(Folder.desktop + "/tmpSet1.aia");  
	tmp.open('w');  
	tmp.write(actionCode); 
	tmp.close();
	app.loadAction(tmp); 
	app.doScript("action1", "set1", false);  
	app.unloadAction("set1","");
	tmp.remove();
	}());
