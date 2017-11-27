var f = File.openDialog ("Select target FONT.");
f.encoding = 'BINARY';
if (f.open("r")){
	var ot = readOfstTbl(f);
	var tbl = readTD(ot[1],f);//[tag:string,checksum:number,offsetnumber,length:number]
	//alert(tbl["OS/2"])
	alert(readOS2(f,tbl["OS/2"][2],tbl["OS/2"][3])[21]);//21 is descender value.
	//20:ascender, 21:descender(b as Font Metrics Table, you can reference https://www.microsoft.com/typography/otspec/os2.htm)
	}


function readOfstTbl(f){
	var dt = ["",0,0,0,0];
	var d;
	var a = f.readch();
	if (a=="O"){
		dt[0] = a;
		for (i=0;i<3;i++) dt[0] += f.readch();
		}
	else {
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


function readTD(num, f){
	var a=0;
	var dat = {};
	var str = "";
	for (var i,j=0;j<num;j++){
		dat[j] = [];
		for (i=0;i<4;i++) str += f.readch();
		dat[str] = [str];
		for (i=1;i<4;i++) dat[str].push(readULong(f));
		//$.writeln(dat[str][0]+"  "+dat[str][1]+" "+dat[str][2]+" "+dat[str][3]);
		str = "";
		}
	return dat;
	}

function readOS2(f, offset, len){
	var entryConst = [27,32,37,37,37];
	var entryLength = 0;
	var usWitCls = ["","Thin","Extra-light (Ultra-light)","Light","Normal (Regular)","Medium","Semi-bold (Demi-bold)","Bold","Extra-bold (Ultra-bold)","Black (Heavy)"];
	var usWdthCls =["","Ultra-condensed","Extra-condensed","Condensed","Semi-condensed","Medium (normal)","Semi-expanded","Expanded","Extra-expanded","Ultra-expanded"];
	var entryName = ["version","xAvgCharWidth","usWeightClass","usWidthClass","ySubscriptXSize","ySubscriptYSize","ySubscriptXOffset","ySubscriptYOffset","ySuperscriptXSize","ySuperscriptYSize","ySuperscriptXOffset","ySuperscriptYOffset","yStrikeoutSize","yStrikeoutPosition","sFamilyClass","panose[10]","achVendID[4]","fsSelection","usFirstCharIndex","usLastCharIndex","sTypoAscender","sTypoDescender","sTypoLineGap","usWinAscent","usWinDescent","sxHeight","sCapHeight","usDefaultChar","usBreakChar","usMaxContext"];
	var unicodeRange1 = ["Basic Latin","Latin-1 Supplement","Latin Extended-A","Latin Extended-B","IPA Extensions","Spacing Modifier Letters","Combining Diacritical Marks","Greek and Coptic","Coptic","Cyrillic","Armenian","Hebrew","Vai","Arabic","NKo","Devanagari","Bengali","Gurmukhi","Gujarati","Oriya","Tamil","Telugu","Kannada","Malayalam","Thai","Lao","Georgian","Balinese","Hangul Jamo","Latin Extended Additional","Greek Extended","General Punctuation"];
	var unicodeRange2 = ["Superscripts And Subscripts","Currency Symbols","Combining Diacritical Marks For Symbols","Letterlike Symbols","Number Forms","Arrows","Mathematical Operators","Miscellaneous Technical","Control Pictures","Optical Character Recognition","Enclosed Alphanumerics","Box Drawing","Block Elements","Geometric Shapes","Miscellaneous Symbols","Dingbats","CJK Symbols And Punctuation","Hiragana","Katakana","Bopomofo","Hangul Compatibility Jamo","Phags-pa","Enclosed CJK Letters And Months","CJK Compatibility","Hangul Syllables","Non-Plane 0 *","Phoenician","CJK Unified Ideographs","Private Use Area [plane 0]","CJK Strokes","Alphabetic Presentation Forms","Arabic Presentation Forms-A"];
	var unicodeRange3 = ["Combining Half Marks","Vertical Forms","Small Form Variants","Arabic Presentation Forms-B","Halfwidth And Fullwidth Forms","Specials","Tibetan","Syriac","Thaana","Sinhala","Myanmar","Ethiopic","Cherokee","Unified Canadian Aboriginal Syllabics","Ogham","Runic","Khmer","Mongolian","Braille Patterns","Yi Syllables","Tagalog","Old Italic","Gothic","Deseret","Byzantine Musical Symbols","Mathematical Alphanumeric Symbols","Private Use [plane 15]","Variation Selectors","Tags","Limbu","Tai Le","New Tai Lue"];
	var unicodeRange4 = ["Buginese","Glagolitic","Tifinagh","Yijing Hexagram Symbols","Syloti Nagri","Linear B Syllabary","Ancient Greek Numbers","Ugaritic","Old Persian","Shavian","Osmanya","Cypriot Syllabary","Kharoshthi","Tai Xuan Jing Symbols","Cuneiform","Counting Rod Numerals","Sundanese","Lepcha","Ol Chiki","Saurashtra","Kayah Li","Rejang","Cham","Ancient Symbols","Phaistos Disc","Carian","Domino Tiles","Reserved","Reserved","Reserved","Reserved","Reserved "];
	var unicodePageRange1 = ["Latin 1","Latin 2","Cyrillic","Greek","Turkish","Hebrew","Arabic","Windows Baltic","Vietnamese","Reserved(Alternate ANSI)","Reserved for Alternate ANSI","Reserved for Alternate ANSI","Reserved for Alternate ANSI","Reserved for Alternate ANSI","Reserved for Alternate ANSI","Reserved for Alternate ANSI","Thai","JIS/Japan","Chinese: Simplified chars(PRC and Singapore)","Korean Wansung","Chinese: Traditional chars(Taiwan and Hong Kong)","Korean Johab","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Reserved(Alternate ANSI & OEM)","Macintosh Character Set (US Roman)","OEM Character Set","Symbol Character Set"];
	var unicodePageRange2 = ["Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","Reserved(OEM)","IBM Greek","MS-DOS Russian","MS-DOS Nordic","Arabic","MS-DOS Canadian French","Hebrew","MS-DOS Icelandic","MS-DOS Portuguese","IBM Turkish","IBM Cyrillic; primarily Russian","Latin 2","MS-DOS Baltic","Greek; former 437 G","Arabic; ASMO 708","WE/Latin 1","US"];
	f.seek(offset);
	var b = [];
	var pns = [];
	var uniRange = [];
	var ctr = 0;
	var un = 0;
	var i;
	b[0] = readUShort(f).toString(16);
	entryLength = entryConst[b[0]];
	while (b[0].length<4) b[0] = "0"+b[0];
	b[0] = "0x" + b[0];
	b[1] = readShort(f);
	b[2] = readUShort(f);
	b[3] = readUShort(f);
	uniRange[0] = fstypeValidater (readUShort(f));//fsType
	for (i=4;i<14;i++) b[i] = readShort(f);
	b[14] = readFClass(f);
	for (i=0;i<10;i++) pns.push(f.readch().charCodeAt (0));
	b[15] = pns;
	uniRange[1] = getURArray(readULong(f),unicodeRange1);
	uniRange[2] = getURArray(readULong(f),unicodeRange2);
	uniRange[3] = getURArray(readULong(f),unicodeRange3);
	uniRange[4] = getURArray(readULong(f),unicodeRange4);
	b[16]="";
	for (i=0;i<4;i++) b[16] += f.readch();
	b[17] = readUShort(f);
	b[18] = readUShort(f);
	b[19] = readUShort(f);
	b[20] = readShort(f);
	b[21] = readShort(f);
	b[22] = readShort(f);
	b[23] = readUShort(f);
	b[24] = readUShort(f);
	uniRange[5] = getURArray(readULong(f),unicodePageRange1);
	uniRange[6] = getURArray(readULong(f),unicodePageRange2);
	if (entryLength>32) for (i=25;i<30;i++) b[i] = readShort(f);
	return b;
	}

function fstypeValidater (shrt){
	if (shrt==0) return "Not set"
	var a = shrt & 0xfcf1;
	if (a>0) return false;
	var rslt = [];
	a = shrt & 0xff;
	if(a!=2&&a!=4&&a!=8) return false;
	if (a==2) rslt[0] = "Restricted License embedding";
	if (a==4) rslt[0] = "Preview & Print embedding";
	if (a==8) rslt[0] = "Editable embedding";
	a = (shrt >> 8) & 0x3;
	if (a==1) rslt[1] = "No subsetting";
	if (a==2) rslt[1] = "Bitmap embedding only";
	if (a==3) {
		rslt[1] = "No subsetting";
		rslt[2] = "Bitmap embedding only";
		}
	return rslt.join('\n');
	}


function readLongDt(targetFile){
	var result=0;
	var a = 72057594037927936;
	for(var k=0;k<8;k++){
		result += targetFile.readch().charCodeAt(0) * a;
		a /= 256;
		}
	return result;
	}


function readULong(targetFile){
	var result=0;
	var a = 16777216;
	for(var k=0;k<4;k++){
		result += targetFile.readch().charCodeAt(0) * a;
		a /= 256;
		}
	return result;
	}


function readLong(targetFile){
	var result=0;
	var a = 16777216;
	for(var k=0;k<4;k++){
		result += targetFile.readch().charCodeAt(0) * a;
		a /= 256;
		}
	if (result>2147483648) result -= 4294967296;
	return result;
	}


function readUShort(targetFile){
	var result = targetFile.readch().charCodeAt(0) * 256;
	result += targetFile.readch().charCodeAt(0);
	return result;
	}


function readShort(targetFile){	
	var d = targetFile.readch().charCodeAt(0);
	var result = d << 8;
	result += targetFile.readch().charCodeAt(0);
	if (result>32768) result -= 65536;
	return result;
	}


function readFixed(targetFile){
	var result = "0x";
	var d;
	for (var i=0;i<4;i++){ 
		d = targetFile.readch().charCodeAt(0).toString (16);
		if (d.length==1) d = "0" + d;
		result += d;
		}
	return result;
	}


function readFxd16(targetFile){
	var result = readShort(targetFile) + ".";
	result += readShort(targetFile);
	return Number(result);

	}



function readFxd2d14(targetFile){
	var result = "";
	var d = readShort(targetFile);
	result = d >> 14;
	if (result>2) result -= 4;
	result += (d & 0x3fff) / 16384;
	return result;
	}


function readUnit24(targetFile){
	var result = targetFile.readch().charCodeAt(0) * 65536;
	result += targetFile.readch().charCodeAt(0) * 256;
	result += targetFile.readch().charCodeAt(0);
	return result
	}


function winBMP(tg,ofst,len){
	var byt = 0;
	var st = "";
	for (var i=0;i<len/2;i++){
		byt = tg.readch().charCodeAt(0) * 256;
		st += String.fromCharCode(byt+tg.readch().charCodeAt(0));
		}
	return st;
	}


function readFClass(targetFile){
	var rslt = new Array();
	rslt[0] = targetFile.readch().charCodeAt(0);
	rslt[1] = targetFile.readch().charCodeAt(0);
	return rslt;
	}

function readBytes(targetFile){
	var a = targetFile.readch().charCodeAt (0);
	var dat = a << 8;
	a = targetFile.readch().charCodeAt (0);
	dat += a;
	return dat
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
