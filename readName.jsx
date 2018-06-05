#include "readBin.jsxinc"

function readName(pth){
	var localFileName = pth+"/name.table";
	var tgFile = new File(localFileName);
	tgFile.encoding = 'BINARY';
	if (!tgFile.open('r')) {
		alert ('table read error...');
		return null;
		}
	var nr = new Array();
	var result ="name records...\n";
	result += "----------------------------------------------\n";
	var k = 0;
	var num = 0;
	var str = "";
	var fmt = readUShort (tgFile);	
	var len = readUShort (tgFile);
	var ofst = readUShort (tgFile);
	if (fmt==0) {
		for (var i=0;i<len;i++){
			nr[i] = [readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile) + ofst];
			}
		for (i=0;i<len;i++){
			result += "PlatformID= " + nr[i][0] + "  " +  platform[nr[i][0]]+"\n";
			result += "EncodingID=" + nr[i][1] + "  " + enc[nr[i][0]][nr[i][1]] + "\n";
			result += "LanguageID= " + nr[i][2] + "  ";
			tgFile.seek(nr[i][5]);
			if (nr[i][0]==1){
				result += MacLangID[nr[i][2]] + "\n";
				if (nr[i][1]==1){
					str = u2sj(tgFile,nr[i][5],nr[i][4]);
					}else{
						for (k=0;k<nr[i][4];k++) {
							str += tgFile.readch();
							}
						}
				} else if (nr[i][0]==3){
					for (;;){
						if (winLngID[num][0]==nr[i][2]){
							result += winLngID[num][1]+" "+winLngID[num][2]+"\n";
							break;
							}
						num++
						if (num>205) {
							alert("win language ID read error.");
							tgFile.close();
							return null;
							}
						}
					num = 0;
					str = winBMP (tgFile,nr[i][5], nr[i][4]);
					} else {
						str = winBMP (tgFile,nr[i][5], nr[i][4]);
						}
			result += "NameID=" + nr[i][3]+" "+ nmID[nr[i][3]] + "\n";
			result += "length= " + nr[i][4] + "    offset=" + nr[i][5] + "\n";
			result += str + "\n";
			result += "----------------------------------------------\n"
			str = "";
			}
		}
	else if (fmt==1){
		for (var i=0;i<len;i++){
			nr[i] = [readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile),
				readUShort (tgFile) + ofst];
			}
		var ltLen = readUShort (tgFile);
		var ltr = new Array();
		for (i=0;i<ltLen;i++){
			ltr[i] = [readUShort(tgFile), readUShort(tgFile)];
			}
		for (i=0;i<len;i++){
			result += "PlatformID= " + nr[i][0] + "  " +  platform[nr[i][0]]+"\n";
			result += "EncodingID=" + nr[i][1] + "  " + enc[nr[i][0]][nr[i][1]] + "\n";
			result += "LanguageID= " + nr[i][2] + "  ";
			tgFile.seek(nr[i][5]);
			if (nr[i][0]==1){
				result += MacLangID[nr[i][2]] + "\n";
				if (nr[i][1]==1){
					str = u2sj(tgFile,nr[i][5],nr[i][4]);
					}else{
						for (k=0;k<nr[i][4];k++) {
							str += tgFile.readch();
							}
						}
				} else if (nr[i][0]==3){
					for (;;){
						if (winLngID[num][0]==nr[i][2]){
							result += winLngID[num][1]+" "+winLngID[num][2]+"\n";
							break;
							}
						num++
						if (num>205) {
							alert("win language ID read error.");
							tgFile.close();
							return null;
							}
						}
					num = 0;
					str = winBMP (tgFile,nr[i][5], nr[i][4]);
					} else {
						str = winBMP (tgFile,nr[i][5], nr[i][4]);
						}
			result += "NameID=" + nr[i][3]+" "+ nmID[nr[i][3]] + "\n";
			result += "length= " + nr[i][4] + "    offset=" + nr[i][5] + "\n";
			result += str + "\n";
			result += "----------------------------------------------\n"
			str = "";
			}
		result ="Language Tag Records...\n";
		result += "----------------------------------------------\n";
		for (i=0;i<ltLen;i++){
			tgFile.seek(ltr[i][1]);
			for(k=0;k<ltr[i][0];k++) str += readUShort(tgFile);
			result += "Record " + i + "\n";
			result += "length= " + ltr[i][0] + "    offset=" + nr[i][1] + "\n";
			result += str + "\n"
			result += "----------------------------------------------\n"
			str = "";
			}
		}			
	tgFile.close();
	var nmw = new Window('palette','Name Directory',[200,120,650,620]);
	nmw.add('statictext',[5,5,350,20],"format : "+fmt);
	nmw.add('statictext',[5,25,350,40],"record entry : "+len);
	nmw.add('statictext',[5,45,350,60],"offset : "+ofst);
	var txbx = nmw.add('edittext',[5,70,440,470], result, {multiline: true, scrolling: true});
	var nmwCls = nmw.add('button',[5,475,55,490],'close',{name:'cancel'});
	nmwCls.onClick = function(){nmw.close()};
	nmw.show();
	return result;
	}
