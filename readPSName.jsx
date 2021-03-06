#include "readBin.jsxinc"

var f = new File(File.openDialog ("Select target FONT."));
f.encoding = 'BINARY';
if (f.open("r")){
	alert(getPSName(f));
	}

function getPSName(f){
	try{
		var ot = readOfstTbl(); //offsetTable
		var nmTb = readTD(ot[1]); //explore nameTables 
		f.seek (nmTb[2]); //move to name table.
		var nr = [];
		var result ="";
		var k = 0, num = 0, str = "";
		 //read name table header
		var fmt = readUShort (f); //format
		var len = readUShort (f);  //count
		var ofst = readUShort (f); //string offset
		for (var i=0;i<len;i++){
			nr = [readUShort (f), //platform ID
				readUShort (f), //encoding ID
				readUShort (f), //language ID
				readUShort (f), //name ID
				readUShort (f), //length
				readUShort (f) + ofst + nmTb[2]]; //offset + name table string offset + name tables start offset
			if (nr[3]==6) break; //ID = 6 as postscript name.
			}
		f.seek(nr[5]); //jump to strings and read it.
		result += f.readch();
		if (result.charCodeAt(0)==0) { //16 bit characters/discard first byte
			result = f.readch();
			for (k=1;k<nr[4]/2;k++) {
				f.readch();
				result += f.readch();
				$.writeln (result.charCodeAt(k))
				}
			}
		else { //8bit Ascii
			for (k=0;k<nr[4];k++) result += f.readch();
			}
		return result;
		}
	catch(e){
		alert(e)
		}
	}

function readOfstTbl(){ //to read offset table
	var dt = ["",0,0,0,0];
	var d;
	var a = f.readch();
	if (a=="O"){ //sfntVersion, in case of "otf"
		dt[0] = a;
		for (i=0;i<3;i++) dt[0] += f.readch();
		}
	else { //sfntVersion, incase of "ttf"
		dt[0] = "0x0" + a.charCodeAt(0).toString (16);
		for (i=0;i<3;i++) {
			a = f.readch();
			d = a.charCodeAt(0).toString (16);
			if (d.length==1) d = "0" + d;
			dt[0] += d;
			}
		}
	dt[1] = readBytes(f); //numTables
	dt[2] = readBytes(f); //searchRange
	dt[3] = readBytes(f); //entrySelector
	dt[4] = readBytes(f); //rangeShift
	return dt;
	}

function readTD(num){
	var a=0;
	for (j=0;j<num;j++){
		dat = ["",0,0,0];
		for (i=0;i<4;i++) dat[0] += f.readch(); //tableTag identifyer
		dat[1] = readULong(f); //checksum
		dat[2] = readULong(f); //offset
		dat[3] = readULong(f); //length
		if (dat[0]=="name") return dat; //in this case, no need other info and discard it.
		}
	}
