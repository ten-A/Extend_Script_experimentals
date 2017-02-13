var n = 5; //coordinate: pt
var tg = app.selection[0];
var bd = tg.geometricBounds;
var wdh = bd[2] - bd[0];
var hgt = Math.abs(bd[3] - bd[1]);
makeMz(Math.floor(wdh / n), Math.floor(hgt / n), wdh / wdh / n, Math.floor(wdh / Math.floor(wdh / n)));

tg = app.selection[0].pathItems;
var bk = new GrayColor;
		//bk.cyan = 0;
		//bk.magenta = 0;
		//bk.yellow = 0;
		bk.gray = 100;
var cir,ct,scl;
var bd = [(tg[0].geometricBounds[2] - tg[0].geometricBounds[0])/2,
			(tg[0].geometricBounds[3] - tg[0].geometricBounds[1])/2];
for (var i=0;i<tg.length;i++){
	ct = [tg[i].geometricBounds[0] + bd[0], tg[i].geometricBounds[1] + bd[1]];
	scl = Math.SQRT2 * tg[i].fillColor.gray / 100;
	if (scl<0.03) continue;
	cir = app.activeDocument.pathItems.ellipse(
		ct[1] + bd[1] * scl, ct[0] - bd[0] * scl, bd[0] * scl * 2, bd[1] * scl * 2);
		cir.fillColor = bk;
		}
app.selection[0].remove();
	
	
function makeMz(w, h, wd, ht){
	var actionCode = "/version 3 /name [ 7 746d7053657431] /isOpen 1 /actionCount 1"
		+ "/action-1 {/name [ 7 616374696f6e31] /keyIndex 0 /colorIndex 0 /isOpen 1 /eventCount 2"
		+ "/event-1 {/useRulersIn1stQuadrant 0 /internalName (ai_plugin_rasterize)"
		+ "/localizedName [ 18 e383a9e382b9e382bfe383a9e382a4e382ba]"
		+ "/isOpen 0 /isOn 1 /hasDialog 1 /showDialog 0 /parameterCount 8"
		+ "/parameter-1 {/key 1668246642 /showInPalette 4294967295 /type (enumerated) /name [ 4 434d594b] /value 1}"
		+ "/parameter-2 {/key 1685088558 /showInPalette 4294967295 /type (integer) /value 300}"
		+ "/parameter-3 {/key 1651205988 /showInPalette 4294967295 /type (enumerated) /name [ 12 e3839be383afe382a4e38388] /value 0}"
		+ "/parameter-4 {/key 1954115685 /showInPalette 4294967295 /type (enumerated) /name [ 6 e7b4b0e38184] /value 0}"
		+ "/parameter-5 {/key 1634494763 /showInPalette 4294967295 /type (enumerated) /name [ 18 e382a2e383bce38388e381abe69c80e981a9] /value 1}"
		+ "/parameter-6 {/key 1835103083 /showInPalette 4294967295 /type (boolean) /value 0}"
		+ "/parameter-7 {/key 1886613620 /showInPalette 4294967295 /type (boolean) /value 1}"
		+ "/parameter-8 {/key 1885430884 /showInPalette 4294967295 /type (unit real) /value 0.0 /unit 592476268}}"
		+ "/event-2 {/useRulersIn1stQuadrant 0 /internalName (ai_plugin_mosaic) /localizedName [ 12 e383a2e382b6e382a4e382af] "
		+ "/isOpen 0 /isOn 1 /hasDialog 1 /showDialog 0 /parameterCount 7"
		+ "/parameter-1 {/key 1937208424 /showInPalette 4294967295 /type (integer) /value 0}"
		+ "/parameter-2 {/key 1936222068 /showInPalette 4294967295 /type (integer) /value 0}"
		+ "/parameter-3 {/key 1953985640 /showInPalette 4294967295 /type (integer) /value " + w + "}"
		+ "/parameter-4 {/key 1952999284 /showInPalette 4294967295 /type (integer) /value " + h + "}"
		+ "/parameter-5 {/key 1668246642 /showInPalette 4294967295 /type (boolean) /value 0}"
		+ "/parameter-6 {/key 1684368500 /showInPalette 4294967295 /type (boolean) /value 1}"
		+ "/parameter-7 {/key 1886544756 /showInPalette 4294967295 /type (boolean) /value 0}}}";

	var tmp = File(Folder.desktop + "/tmpSet1.aia");  
	tmp.open('w');  
	tmp.write(actionCode); 
	tmp.close();
	app.loadAction(tmp); 
	app.doScript("action1", "tmpSet1", false);  
	app.unloadAction("tmpSet1","");
	tmp.remove();
	}


