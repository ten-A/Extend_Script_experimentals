//Photomosaic for Photoshop

app.preferences.rulerUnits = Units.PIXELS; //change applications ruler units.
var dc = app.activeDocument; //target doc
var wh,ht; //number of split
var px = new Array(); //pixel color colection
var fcc = new Array();  //files color collection
var fcm = new Array();  //Strongest Channel collection
var fn = new Array();  //source files name list
var fu = new Array();  //use flag array
var bnds=new Array();  //points of selection bounds


//Script UI (get wh and ht)
var dlg = new Window ('dialog', '', [100,100,360,280]);
	msgPnl = dlg.add('panel', [25,10,240,100], 'split numbers');
	msgPnl.add('statictext', [15,20,50,40],'width');
	msgPnl.str1 = msgPnl.add('edittext', [60,20,200,40],'', {multiline:false});
	msgPnl.add('statictext', [15,50,50,70],'height');
	msgPnl.str2 = msgPnl.add('edittext', [60,50,200,70],'', {multiline:false});
	dlg.btnPnl = dlg.add('panel', [25,110,240,160], ''); 
	dlg.btnPnl.submitBtn = dlg.btnPnl.add('button', [10,10,90,35], 'OK', {name:'ok'});
	dlg.btnPnl.cancelBtn = dlg.btnPnl.add('button', [100,10,190,35], 'cancel', {name:'cancel'});
	dlg.btnPnl.submitBtn.onClick = function (){main()};
	dlg.show();


function main(){ //main 
	wh = Number (msgPnl.str1.text);
	ht = Number (msgPnl.str2.text);
	dlg.close();
	getFlCC(); //get source files color list
	var a,df_;
	var df = 600; //reference numbers of diference.
	var dcHeight = dc.height;
	var dcWidth = dc.width;
	var h = Math.floor (dcHeight / ht);  //target unit size(height)
	var w = Math.floor (dcWidth / wh);  //target unit size(width)
	dc.resizeCanvas (w*wh, h*ht, AnchorPosition.TOPLEFT);
	getPxColor(); //get target documents color collection
	dc.resizeImage(w*wh, h*ht, 144);
	for (var i=0;i<ht;i++){
		for (var j=0;j<wh;j++){
			for (var k=0;k<fcc.length;k++){
				df_ = getDiff (px[i][j], k);
				if (df_<df) {
					df = df_;
					a = k;
					}
				}
			imgAdjust (w, h, a);
			bnds = [
				[w*j,h*i],
				[w*j+w,h*i],
				[w*j+w,h*i+h],
				[w*j,h*i+h],
				[w*j,h*i]
				];
			dc.selection.select (bnds);
			dc.paste(true);
			dc.mergeVisibleLayers();
			fu[a]++;
			df = 600;
			}
		}
	}


function getFlCC(){ //get source files colors
	var srcDir = new Folder (
		Folder.selectDialog ("select a source folder..."));
	var flist = srcDir.getFiles ('*.jpg');
	var fobj,tmp,pcr,rd,gr,bl;
	for (var i=0;i<flist.length;i++){
		fu[i] = 0;
		fobj = new File(flist[i].fsName);
		fn[i] = flist[i].fsName;
		tmp = app.open (fobj);
		tmp.resizeImage (1,1);
		pcr = tmp.colorSamplers.add([0,0]);
		rd = pcr.color.rgb.red;
		gr = pcr.color.rgb.green;
		bl = pcr.color.rgb.blue;
		if (rd>gr&&rd>bl){ 
			fcm[i] = "r";
			} else if (gr>rd&&gr>bl) {
				fcm[i] = "g";
				} else if (bl>gr&&rd<bl) {
					fcm[i] = "b";
					} else {
						fcm[i] = "n"
						}
		fcc.push([
			Math.floor(rd),
			Math.floor(gr),
			Math.floor(bl)
			]);
		tmp.close (SaveOptions.DONOTSAVECHANGES);
		}
	}


function imgAdjust(w, h, num){ 
	var tgFile = new File(fn[num]);
	var tmp = app.open(tgFile);
	var r1 = w / h;
	var r2 = tmp.width / tmp.height;
	var r
	if (r1>r2){
		tmp.resizeImage(w);
		tmp.resizeCanvas (w, h, 
			AnchorPosition.MIDDLECENTER);
		}else{
			r = h/tmp.height;
			tmp.resizeImage(tmp.width*r, h);
			tmp.resizeCanvas (w, h,
				AnchorPosition.MIDDLECENTER);
			}
	tmp.selection.selectAll();
	tmp.selection.copy ();
	tmp.close (SaveOptions.DONOTSAVECHANGES);
	}


function getDiff(tg, n){
	var cm_;
	if (tg[0]>tg[1]&&tg[0]>tg[2]){ 
		cm_ = "r";
		} else if (tg[1]>tg[0]&&tg[1]>tg[2]) {
			cm_ = "g";
			} else if (tg[2]>tg[1]&&tg[0]<tg[2]) {
				cm_ = "b";
				} else {
					cm_ = "n"
					}
	var df = Math.abs(tg[0] - fcc[n][0])
			+ Math.abs(tg[1] - fcc[n][1])
			+ Math.abs(tg[2] - fcc[n][2]);
	if (cm_!=fcm[n]) df += 100;
	if (Math.abs(tg[0]-fcc[n][0])>30) df += 30;
	if (Math.abs(tg[1]-fcc[n][1])>30) df += 30;
	if (Math.abs(tg[2]-fcc[n][2])>30) df += 30;
	df += fu[n]*40;
	return Math.floor(df);
	}


function getPxColor(){
	dc.resizeImage (wh, ht, 1,
		ResampleMethod.BICUBIC);
	for (var i=0;i<ht;i++){
		px[i] = new Array();
		for(var j=0;j<wh;j++){
			pcr = dc.colorSamplers.add([j,i]);
			px[i][j] = [
				Math.floor (pcr.color.rgb.red),
				Math.floor (pcr.color.rgb.green),
				Math.floor (pcr.color.rgb.blue)
				];
			pcr.remove();
			}
		}
	}
