/*
	Placed Image Marker for Illustrastor
	make new layer and add placed image name. If find too low actual resolution, It marks Red name and Bounds.
*/

var tgt = app.activeDocument.placedItems;
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var xmp;
var actPPI = 0;
var threshold = 200; //PPI
var lyr = app.activeDocument.layers.add();
lyr.name = "Images Info";
var tg,pth,tx;
var cr = [];
cr[0] = new CMYKColor; //regular color
cr[0].cyan = 0;
cr[0].magenta = 0;
cr[0].yellow = 0;
cr[0].black = 100;
cr[1] = new CMYKColor; //warning color
cr[1].cyan = 0;
cr[1].magenta = 100;
cr[1].yellow = 100;
cr[1].black = 0;
cr[2] = new CMYKColor; //warning color
cr[2].cyan = 100;
cr[2].magenta = 0;
cr[2].yellow = 0;
cr[2].black = 0;

for (var i=0;i<tgt.length;i++){
	xmp = new XMPFile(tgt[i].file.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ);
	var obj = xmp.getXMP();
	xmp.closeFile();
	obj.serialize(XMPConst.SERIALIZE_READ_ONLY_PACKET | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
	var pxls = obj.getProperty(XMPConst.NS_EXIF,"PixelXDimension");
	actPPI = pxls/tgt[i].width*72;
	//add Info
	if (tgt[i].parent.typename=="GroupItem") tg = tgt[i].parent.pathItems[0];
	else tg = tgt[i];
	pth = lyr.pathItems.rectangle(tg.top, tg.left, tg.width, tg.height);
	pth.filled = false;
	tx = lyr.textFrames.add();
	tx.textRange.justification = Justification.CENTER;
	tx.textRange.size = 6;
	tx.contents = tgt[i].file.displayName;
	tx.position = [tgt[i].left + tgt[i].width/2-tx.width/2, tgt[i].top - tgt[i].height/2-tx.height/2];
	if(actPPI>0){
		if (actPPI<threshold) {
			pth.strokeColor = cr[1];
			tx.textRange.fillColor = cr[1];
			tx.contents = tgt[i].file.displayName+"\nactual PPI : "+actPPI;
			}
		else pth.strokeColor = cr[0];
		}
	else {
		pth.strokeColor = cr[2];
		tx.textRange.fillColor = cr[2];
		tx.contents = tgt[i].file.displayName+"\nXMP Metadata not included.";
		}
	}