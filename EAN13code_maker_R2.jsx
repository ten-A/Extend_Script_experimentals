//   JAN code maker 2.0.2
//	  This Script work with Adobe Illustrator CS3,. Generate EAN CODE on new AI document.
//	  Creator : ten
//	  Last update : 27.April.2009 (first release/Sep.04.2007)
//        Release 2 : 19.Aug.2011.

//set to attribute parameters
var xpos = 15;
var ypos = 20;
var ptc = 0.93537474;
var yhgt = 64.8;
var currentLevel = 0;
var gain = 0;   //set value, if you want choke lines.
var lnColor = new GrayColor;
lnColor.gray = 100;

var numString = "";
var dlg = new Window ('dialog', 'JAN(EAN)コード入力', [100,100,480,400]);
	dlg.msgPnl = dlg.add('panel', [25,70,355,150], 'コード入力');
	dlg.msgPnl.msgEt = dlg.msgPnl.add('edittext', [15,30,315,50],'', {multiline:false});
	dlg.btnPnl = dlg.add('panel', [120,180,355,225], ''); 
	dlg.btnPnl.submitBtn = dlg.btnPnl.add('button', [20,10,100,25], 'OK', {name:'ok'});
	dlg.btnPnl.cancelBtn = dlg.btnPnl.add('button', [130,10,210,25], 'キャンセル', {name:'cancel'});
	dlg.btnPnl.submitBtn.onClick = function (){creBar()};
	dlg.show();

function creBar(){
	numString = dlg.msgPnl.msgEt.text
	dlg.close();
	var st = Array ();
	var digit = Array ();
	var bar = Array ();
	var fChr = [0x3f,0x34,0x32,0x31,0x2c,0x26,0x23,0x2a,0x29,0x25];

	//1st character selection revese bit data. 7bit data in use, mask first bit.
	//left even code.
	var leSym = [0xa7,0xb3,0x9b,0xa1,0x9d,0xb9,0x85,0x91,0x89,0x97];
	//left odd code.
	var loSym = [0x8d,0x99,0x93,0xbd,0xa3,0xb1,0xaf,0xbb,0xb7,0x8b];
	//right even code
	var roSym = [0x72,0x66,0x6c,0x42,0x5c,0x4e,0x50,0x44,0x48,0x74];

	//input check 
	for (i=0; i<=12; i++ ){
		st[i] = Number (numString.substr (i, 1));
		}
	md10num = st[0]+st[1]*3+st[2]+st[3]*3+st[4]+st[5]*3+st[6]+st[7]*3+st[8]+st[9]*3+st[10]+st[11]*3;
	mdDv = Math.floor (md10num / 10);
	mdOd = md10num - mdDv * 10;
	if (mdOd == 0){
		mdMod=0;
		} else {
			mdMod = 10 - mdOd;
			}

	if (mdMod != st[12]){
		alert("Incorrect input data.");
		dlg.close();
		return;
		}

	//document and layer add
	myDoc = app.documents.add(DocumentColorSpace.CMYK, 150, 100);
	myLayer = myDoc.layers[0];
	myLayer.name = "layer1";
		
	//parity pattern check and get left side bit data
	var wit = fChr[st[0]].toString(2);
	for (i=1;i<=6;i++){
		if (wit[i-1] == "1"){
			digit[i] = loSym[st[i]].toString(2);
			} else {
				digit[i] = leSym[st[i]].toString(2);
				}
		}

	//get right side bit data
	for (i=7;i<=12;i++){
		digit[i] = roSym[st[i]].toString(2);
		}

	//create left guard bar
	drawLine (xpos, 4.677, 1);
	xpos += ptc;
	drawLine (xpos, 4.677, 1);

	//create left side bar	
	for (j=1;j<=6;j++){
		for (i=1;i<=7;i++){
			if (digit[j][i]=="1"){
				currentLevel++;
				}else if (currentLevel>0){
					drawLine(xpos, 0, currentLevel);
					xpos += ptc;
					currentLevel = 0;
						} else {
							xpos += ptc;
							}
			}
		if (currentLevel>0){
			drawLine(xpos, 0, currentLevel);
			currentLevel = 0;
			}
		}

//create center bar
	xpos += ptc;
	drawLine (xpos, 4.677, 1);
	xpos += ptc;
	drawLine (xpos, 4.677, 1);
	xpos += ptc;

	//create right side bar
	for (j=7;j<=12;j++){
		for (i=0;i<7;i++){
			if (digit[j][i]=="1"){
				currentLevel++;
				}else if (currentLevel>0){
					drawLine(xpos, 0, currentLevel);
					xpos += ptc;
					currentLevel = 0;
						} else {
						xpos += ptc;
						}
			}
		if (currentLevel>0){
			drawLine(xpos, 0, currentLevel);
			currentLevel = 0;
			}
		}

	//create right guard bar
	drawLine (xpos, 4.677, 1);
	xpos += ptc;
	drawLine (xpos, 4.677, 1);

	//add OCR string
	var chStyle = myDoc.characterStyles.add("st1");
	var chAttr = chStyle.characterAttributes;

	xpos = 7;
	ypos = 17.5;
	var FontName = app.textFonts.getByName("OCRBStd"); //you can select other font.
	chAttr.textFont = FontName;
	chAttr.size = 8.6;
	chAttr.autoLeading = false;
	chAttr.leading = 9;
	chAttr.kerningMethod = AutoKernType.AUTO;	

	var objTx = myLayer.textFrames.add ();
	objTx.top = ypos;
	objTx.left = xpos;
	//objTx.size=8.6;
	objTx.contents = String(st[0]+" "+st[1]+st[2]+st[3]+st[4]+st[5]+st[6]+" "
							+st[7]+st[8]+st[9]+st[10]+st[11]+st[12]);
	chStyle.applyTo (objTx.textRange);

	//create quiet zone
	var brObj = myLayer.pathItems.rectangle(80.936,4.705,105.703,75.317);
	brObj.fillColor = app.activeDocument.swatches[0].color;
	brObj.stroked = false;
	}


function drawLine(x, len, lv){
	var xpt = x + lv * ptc / 2;
	var tgPath = myLayer.pathItems.add();
	tgPath.stroke = true;
	tgPath.strokeColor = lnColor;
	tgPath.filled =false;
	var ancr1 = tgPath.pathPoints.add();
	ancr1.anchor = [xpt, 15-len];
	ancr1.leftDirection = ancr1.anchor;
	ancr1.rightDirection = ancr1.anchor;
	var ancr2 = tgPath.pathPoints.add();
	ancr2.anchor = [xpt, 79.8];
	ancr2.leftDirection = ancr2.anchor;
	ancr2.rightDirection = ancr2.anchor;
	tgPath.strokeWidth = ptc * lv - gain;
	xpos += ptc * lv;
	}