#targetengine session

/*
	Mutation Events sample of InDesign CC. Provably, It works up to CS5.
	To run in InDesign with a document that has a few layers.
	This listerner will catch change selected layer, release active layer and others will be locked automatically.
*/

if (app.activeDocument..eventListeners.itemByName('autoLockLayers')!=null)
	app.activeDocument.eventListeners.itemByName('autoLockLayers').remove();
	
var listener = app.activeDocument.addEventListener (
	MutationEvent.AFTER_ATTRIBUTE_CHANGED, layersControl);
listener.name = 'autoLockLayers';

function layersControl(ev) {
	for (var i=0;i<app.activeDocument.layers.length;i++){
		app.activeDocument.layers[i].locked=true;
		}
	app.activeDocument.layers.itemByName(ev.attributeValue.name).locked = false;
	}
//remove event
//app.activeDocument.eventListeners.itemByName('autoLockLayers').remove();
