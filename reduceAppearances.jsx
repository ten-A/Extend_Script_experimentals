function reduceAppearances(){
	var actionCode = '/version 3 /name [ 8 74656d7053657431] /isOpen 1 /actionCount 1'
						+ '/action-1 {/name [ 7 616374696f6e31] /keyIndex 0 /colorIndex 0 /isOpen 1 /eventCount 1'
						+ '/event-1 {/useRulersIn1stQuadrant 0 /internalName (ai_plugin_appearance)'
						+ '/localizedName [ 18 e382a2e38394e382a2e383a9e383b3e382b9]'
						+ '/isOpen 0 /isOn 1 /hasDialog 0 /parameterCount 1'
						+ '/parameter-1 {/key 1835363957 /showInPalette 4294967295 /type (enumerated)'
						+ '/name [ 27 e382a2e38394e382a2e383a9e383b3e382b9e38292e6b688e58ebb] /value 6}}}';
	var tmp = File(Folder.desktop + "/tmpSet1.aia");
	tmp.open('w');
	tmp.write(actionCode);
	tmp.close();
	app.loadAction(tmp);
	app.doScript("action1", "tempSet1", false);
	app.unloadAction("tempSet1","");
	tmp.remove();
	}

reduceAppearances();
