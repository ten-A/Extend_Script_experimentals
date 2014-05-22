var prefKeeper = {
	prefs : [[ //Real,Boolean,Integer
		"cursorKeyLength",
		"constrain/angle",
		"constrain/cos",
		"constrain/sin",
		"ovalRadius",
		"liveCorners/cornerAngleLimit",
		"text/sizeIncrement",
		"text/riseIncrement",
		"text/fontMenu/faceSizeMultiplier",
		"Guide/Color/red",
		"Guide/Color/green",
		"Guide/Color/blue",
		"Grid/Color/Dark/r",
		"Grid/Color/Dark/g",
		"Grid/Color/Dark/b",
		"Grid/Color/Lite/r",
		"Grid/Color/Lite/g",
		"Grid/Color/Lite/b",
		"Grid/Horizontal/Spacing",
		"Grid/Vertical/Spacing",
		"snapomatic/Color/red",
		"snapomatic/Color/green",
		"snapomatic/Color/blue",
		"smartGuides/customAngles0",
		"smartGuides/customAngles1",
		"smartGuides/customAngles2",
		"smartGuides/customAngles3",
		"smartGuides/customAngles4",
		"smartGuides/customAngles5",
		"smartGuides/angles0",
		"smartGuides/angles1",
		"smartGuides/angles2",
		"smartGuides/angles3",
		"smartGuides/angles4",
		"smartGuides/angles5",
		"uiBrightness"
		],[
		"pen/disableAutoAddDelete",
		"usePreciseCursors",
		"showToolTips",
		"antialias/graphic",
		"antialias/text",
		"antialias/image",
		"selectSameTintPercentage",
		"fileFormatGetFile/ConvertedInFilename",
		"doubleClickToIsolate",
		"cropMarkStyle",
		"transformPatterns",
		"scaleLineWeight",
		"includeStrokeInBounds",
		"snapToPoint",
		"selectBehind",
		"highlightAnchorOnMouseOver",
		"showDirectionHandles",
		"liveCorners/hideCornerWidgetBasedOnAngle",
		"showAsianTextOptions",
		"AI WorldReadiness Dict Key",
		"text/useEnglishFontNames",
		"text/fontMenu/showInFace",
		"text/doFontLocking",
		"numbersArePoints",
		"Grid/Posn",
		"Guide/Style",
		"Guide/ShowPixelGrid",
		"Grid/Style",
		"artNamesAreXMLIDs",
		"Grid/Style",
		"Grid/Posn",
		"smartGuides/showAlignmentGuides",
		"smartGuides/showObjectHighlighting",
		"smartGuides/showToolGuides",
		"smartGuides/showConstructionGuides",
		"smartGuides/showLabels",
		"smartGuides/showReadouts",
		"uiCanvasIsWhite",
		"uiOpenDocumentsAsTabs",
		"DisplayBitmapsAsAntiAliasedPixelPreview",
		"plugin/FileClipboard/copySVGCode",
		"plugin/FileClipboard/copyAsPDF",
		"plugin/FileClipboard/copyAsAICB",
		"plugin/FileClipboard/AICBOption"
		],[
		"selectionTolerance",
		"hitShapeOnPreview",
		"hitTypeShapeOnPreview",
		"snappingTolerance",
		"selectedAnchorMarkType",
		"unselectedAnchorMarkType",
		"directionHandleMarkType",
		"text/kernIncrement",
		"rulerType",
		"strokeUnits",
		"text/units",
		"text/asianunits",
		"Grid/Horizontal/Ticks",
		"Grid/Vertical/Ticks",
		"text/recentFontMenu/showNEntries",
		"text/doNonLatinInlineInput",
		"artNamesAreXMLIDs",
		"numbersArePoints",
		"smartGuides/anglesCount",
		"smartGuides/customAnglesCount",
		"smartGuides/tolerance",
		"plugin/AdobeSlicingPlugin/showSliceNumbers",
		"hyphenation/language",
		"plugin/FileClipboard/linkoptions",
		"plugin/AdobeSlicingPlugin/feedback/red",
		"plugin/AdobeSlicingPlugin/feedback/green",
		"plugin/AdobeSlicingPlugin/feedback/blue",
		"useLowResProxy",
		"blackPreservation/Onscreen",
		"blackPreservation/Export"
		]],
	store : function(){ //Save preferences
		var i,j;
		var rslt = [];
		for (i=0;i<this.prefs.length;i++){
			rslt[i] = [];
			for (j=0;j<this.prefs[i].length;j++){
				switch (i){
					case 0: //Real
						rslt[i].push(app.preferences.getRealPreference(this.prefs[i][j]));
						break;
					case 1: //Boolean
						rslt[i].push(app.preferences.getBooleanPreference(this.prefs[i][j]));
						break;
					case 2: //Integer
						rslt[i].push(app.preferences.getIntegerPreference(this.prefs[i][j]));
						break;
						}
				}
			}
		var f = File.saveDialog("save preferences file","*.ini");
		if (f==null) return;
		if (f.open("w")){
			for (i=0;i<rslt.length;i++) f.writeln(rslt[i].join());
			f.close();
			}
		},
	restore : function(){ //Reload Preferences
		var f = File.openDialog("select preferences file","*.ini",false);
		if (f==null) return;
		if (f.open("r")){
			var str = f.read();
			f.close();
			var ln = str.split("\n");
			var value = [];
			for (var i=0;i<3;i++) value[i] = ln[i].split(",");
			var j;
			for (i=0;i<this.prefs.length;i++){
				for (j=0;j<this.prefs[i].length;j++){
					switch (i){
						case 0: //Real
							//$.writeln(this.prefs[i][j]+"  "+value[i][j]);
							app.preferences.setRealPreference(this.prefs[i][j],value[i][j]);
							break;
						case 1: //Boolean
							//$.writeln(this.prefs[i][j]+"  "+value[i][j]);
							if (value[i][j]=="true")
								app.preferences.setBooleanPreference(this.prefs[i][j],true);
							else
								app.preferences.setBooleanPreference(this.prefs[i][j],false);
							break;
						case 2: //Integer
							//$.writeln(this.prefs[i][j]+"  "+value[i][j]);
							app.preferences.setIntegerPreference(this.prefs[i][j],value[i][j]);
							break;
							}
					}
				}
			}
		}
	}


var w = new Window ('dialog','Preference Keeper'); //User Interface (automatic layout)
w.location = [200,150];
var bt1 = w.add('button', undefined,"Store");
var bt2 = w.add('button', undefined,"Restore");
bt1.onClick = function(){
	prefKeeper.store();
	w.close();
	}
bt2.onClick = function(){
	prefKeeper.restore();
	w.close();
	}
w.show();



