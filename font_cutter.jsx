#include readBin.jsxinc

var ot = []; //Offset Table
var dat = [];
var bt = [];

var nwflag = false;
var fn = File.openDialog ("Select target FONT.");
var fnm = String(fn).match(/\/([^\/]+?)\.[a-zA-Z]+$/);
var currentPath = "~/desktop/" + RegExp.$1;
var currentFolder = new Folder (currentPath);
if (!currentFolder.exists) {
	currentFolder.create();
	nwflag = true;
	}

var f = new File(fn); //Global, Font File Instance.
f.encoding = 'BINARY';
if (f.open("r")){
	ot = readOfstTbl();
	var w = new Window('palette', 'Offset Table', undefined);
	w.add('statictext', undefined, 'sfnt              ' + ot[0]);
	w.add('statictext', undefined, 'table length  ' + ot[1]);
	w.add('statictext', undefined, 'search range  ' + ot[2]);
	w.add('statictext', undefined, 'entry selector  ' + ot[3]);
	w.add('statictext', undefined, 'range shift  ' + ot[4]);
	var clsBtn = w.add('button', undefined, 'close',{name:'cancel'});
	clsBtn.onClick = function(){w.close()};
	w.show();
	var tw = new Window('palette', 'Table Directory', undefined);
	var clstw = tw.add('button', undefined, 'close', {name:'cancel'});
	readTD (ot[1]);
	clstw.onClick = function(){tw.close()};
	tw.show();
	if (nwflag) for (j=0;j<dat.length;j++) saveTables(dat[j][0], dat[j][2], dat[j][3]);
	}


function readTD(num){
	var a=0;
	for (j=0;j<num;j++){
		dat[j] = ["",0,0,0,"","",""];
		for (i=0;i<4;i++) dat[j][0] += f.readch();
		$.write(dat[j][0]+"  ");
		dat[j][1] = readULong(f);
		dat[j][4] = "0x"+dat[j][1].toString(16);
		dat[j][2] = readULong(f);
		dat[j][5] = "0x"+dat[j][2].toString(16);
		dat[j][3] = readULong(f);
		dat[j][6] = "0x"+dat[j][3].toString(16);
		$.writeln(dat[j][4] + "  " + dat[j][5] + "  " + dat[j][6]);		
		tw.add('statictext',undefined, 
			dat[j][0]+"  "+dat[j][4]+"  "+dat[j][5]+"  "+dat[j][6]);
		if (dat[j][0]=="head"&&!nwflag) nwflag = verifyVersion(dat[j]);
		}
	return dat;
	}


function verifyVersion(dat){
	var currentPoint = f.tell();
	var existFile = new File(currentFolder + "/head.table");
	if (existFile.open('r')){
		var eVer = readFixed(existFile);
		var eRev = readFixed(existFile);
		}
	else {
		return true;
		}
	existFile.close();
	f.seek(dat[2]);
	var targetVer = readFixed(f);
	if (targetVer!=eVer){
		f.seek(currentPoint);
		return true;
		}
	var targetRev = readFixed(f);
	if (targetRev!=eRev){
		f.seek(currentPoint);
		return true;
		}
	f.seek(currentPoint);
	return false;	
	}


function readOfstTbl(){
	var dt = ["",0,0,0,0];
	var d;
	var a = f.readch();
	if (a=="O"){
		dt[0] = a;
		for (i=0;i<3;i++) {
			dt[0] += f.readch();
			}
		} else {
			dt[0] = "0x0" + a.charCodeAt(0).toString (16);
			for (i=0;i<3;i++) {
				a = f.readch();
				d = a.charCodeAt(0).toString (16);
				if (d.length==1) d = "0" + d;
				dt[0] += d;
				}
			}
	dt[1] = readBytes(f);
	dt[2] = readBytes(f);
	dt[3] = readBytes(f);
	dt[4] = readBytes(f);
	return dt;
	}


function readFClass(targetFile){
	var rslt = new Array();
	rslt[0] = targetFile.readch().charCodeAt(0);
	rslt[1] = targetFile.readch().charCodeAt(0);
	return rslt;
	}


function getURArray(ur,range){
	var rslt = new Array;
	var d = 2147483648;
	for (var i=31;i>-1;i--){
		if (ur>=d){
			rslt.unshift(range[i]);
			ur -= d;
			}
		d /= 2;
		}
	return rslt.join ("\n");
	}


function getOTinf(num){
	var result = [0,0,0];
	var n = 2;
	var ctr = 0;
	while (n<num){
		n *= 2;
		ctr++;
		}
	result[0] = n / 2 * 16;
	result[1] = ctr--;
	result[2] = num * 16 - result[0];
	return result;
	}


function saveTables(nam, offset, len) {
	if (nam=="OS/2") nam = "OS_2";
	var fn = new File(currentPath + '/' + nam + ".table");
	fn.encoding = 'BINARY';
	f.seek(offset);
	fn.open("w");
	var chr = f.readch().charCodeAt(0);
	fn.write(String.fromCharCode (chr));
	fn.close();
	fn.open("a");
	for (var i=1;i<len;i++){
		chr = f.readch().charCodeAt(0);
		fn.write (String.fromCharCode(chr));
		}
	fn.close();
	}

u2sj_init();
