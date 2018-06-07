#include "readBin.jsxinc"

function readName(pth){
	var localFileName = pth+"/name.table";
	var tgFile = new File(localFileName);
	tgFile.encoding = 'BINARY';
	if (!tgFile.open('r')) {
		alert ('table read error...');
		return null;
		}
	var platform = ['Unicode','Macintosh','ISO','Windows','Custom'];
	var enc = [['Unicode 1.0','Unicode 1.1','ISO/IEC 10646s','Unicode 2.0','Unicode 2.0','Unicode VS','Unicode full'],
			['Roman','Japanese','Chinese (Traditional)','Korean','Arabic','Hebrew','Greek','Russian',
			'RSymbol','Devanagari','Gurmukhi','Gujarati','Oriya','Bengali','Tamil','Telugu','Kannada',
			'Malayalam','Sinhalese','Burmese','Khmer','Thai','Laotian','Georgian','Armenian',
			'Chinese (Simplified)','Tibetan','Mongolian','Geez','Slavic','Vietnamese','Sindhi','Uninterpreted'],
			['ASCII','ISO10646','ISO8859-1'],
			['Symbol','Unicode BMP (UCS-2)','ShiftJIS','PRC','Big5','Wansung','Johab',
			'Reserved','Reserved','Reserved','Unicode UCS-4']];
	var MacLangID = ['English','French','German','Italian','Dutch','Swedish','Spanish','Danish','Portuguese',
			'Norwegian','Hebrew','Japanese','Arabic','Finnish','Greek','Icelandic','Maltese','Turkish','Croatian',
			'Chinese (Traditional)','Urdu','Hindi','Thai','Korean','Lithuanian','Polish','Hungarian','Estonian',
			'Latvian','Sami','Faroese','Farsi/Persian','Russian','Chinese (Simplified)','Flemish','Irish Gaelic',
			'Albanian','Romanian','Czech','Slovak','Slovenian','Yiddish','Serbian','Macedonian','Bulgarian',
			'Ukrainian','Byelorussian','Uzbek','Kazakh','Azerbaijani (Cyrillic script)','Azerbaijani (Arabic script)',
			'Armenian','Georgian','Moldavian','Kirghiz','Tajiki','Turkmen','Mongolian (Mongolian script)',
			'Mongolian (Cyrillic script)','Pashto','Kurdish','Kashmiri','Sindhi','Tibetan','Nepali','Sanskrit',
			'Marathi','Bengali','Assamese','Gujarati','Punjabi','Oriya','Malayalam','Kannada','Tamil','Telugu',
			'Sinhalese','Burmese','Khmer','Lao','Vietnamese','Indonesian','Tagalong','Malay (Roman script)',
			'Malay (Arabic script)','Amharic','Tigrinya','Galla','Somali','Swahili','Kinyarwanda/Ruanda','Rundi',
			'Nyanja/Chewa','Malagasy','Esperanto',
			'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
			'Welsh','Basque','Catalan','Latin','Quenchua','Guarani','Aymara','Tatar','Uighur','Dzongkha',
			'Javanese (Roman script)','Sundanese (Roman script)','Galician','Afrikaans','Breton','Inuktitut',
			'Scottish Gaelic','Manx Gaelic','Irish Gaelic (with dot above)','Tongan','Greek (polytonic)',
			'Greenlandic','Azerbaijani (Roman script)'];
	var winLngID = [
			[0X436,'Afrikaans','South Africa'],
			[0X041C,'Albanian','Albania'],
			[0X484,'Alsatian','France'],
			[0X045E,'Amharic','Ethiopia'],
			[0X1401,'Arabic','Algeria'],
			[0X3C01,'Arabic','Bahrain'],
			[0X0C01,'Arabic','Egypt'],
			[0X801,'Arabic','Iraq'],
			[0X2C01,'Arabic','Jordan'],
			[0X3401,'Arabic','Kuwait'],
			[0X3001,'Arabic','Lebanon'],
			[0X1001,'Arabic','Libya'],
			[0X1801,'Arabic','Morocco'],
			[0X2001,'Arabic','Oman'],
			[0X4001,'Arabic','Qatar'],
			[0X401,'Arabic','Saudi Arabia'],
			[0X2801,'Arabic','Syria'],
			[0X1C01,'Arabic','Tunisia'],
			[0X3801,'Arabic','U.A.E.'],
			[0X2401,'Arabic','Yemen'],
			[0X042B,'Armenian','Armenia'],
			[0X044D,'Assamese','India'],
			[0X082C,'Azeri (Cyrillic)','Azerbaijan'],
			[0X042C,'Azeri (Latin)','Azerbaijan'],
			[0X046D,'Bashkir','Russia'],
			[0X042D,'Basque','Basque'],
			[0X423,'Belarusian','Belarus'],
			[0X845,'Bengali','Bangladesh'],
			[0X445,'Bengali','India'],
			[0X201A,'Bosnian (Cyrillic)','Bosnia and Herzegovina'],
			[0X141A,'Bosnian (Latin)','Bosnia and Herzegovina'],
			[0X047E,'Breton','France'],
			[0X402,'Bulgarian','Bulgaria'],
			[0X403,'Catalan','Catalan'],
			[0X0C04,'Chinese','Hong Kong S.A.R.'],
			[0X1404,'Chinese','Macao S.A.R.'],
			[0X804,'Chinese',"People's Republic of China"],
			[0X1004,'Chinese','Singapore'],
			[0X404,'Chinese','Taiwan'],
			[0X483,'Corsican','France'],
			[0X041A,'Croatian','Croatia'],
			[0X101A,'Croatian (Latin)','Bosnia and Herzegovina'],
			[0X405,'Czech','Czech Republic'],
			[0X406,'Danish','Denmark'],
			[0X048C,'Dari','Afghanistan'],
			[0X465,'Divehi','Maldives'],
			[0X813,'Dutch','Belgium'],
			[0X413,'Dutch','Netherlands'],
			[0X0C09,'English','Australia'],
			[0X2809,'English','Belize'],
			[0X1009,'English','Canada'],
			[0X2409,'English','Caribbean'],
			[0X4009,'English','India'],
			[0X1809,'English','Ireland'],
			[0X2009,'English','Jamaica'],
			[0X4409,'English','Malaysia'],
			[0X1409,'English','New Zealand'],
			[0X3409,'English','Republic of the Philippines'],
			[0X4809,'English','Singapore'],
			[0X1C09,'English','South Africa'],
			[0X2C09,'English','Trinidad and Tobago'],
			[0X809,'English','United Kingdom'],
			[0X409,'English','United States'],
			[0X3009,'English','Zimbabwe'],
			[0X425,'Estonian','Estonia'],
			[0X438,'Faroese','Faroe Islands'],
			[0X464,'Filipino','Philippines'],
			[0X040B,'Finnish','Finland'],
			[0X080C,'French','Belgium'],
			[0X0C0C,'French','Canada'],
			[0X040C,'French','France'],
			[0X140c,'French','Luxembourg'],
			[0X180C,'French','Principality of Monoco'],
			[0X100C,'French','Switzerland'],
			[0X462,'Frisian','Netherlands'],
			[0X456,'Galician','Galician'],
			[0X437,'Georgian','Georgia'],
			[0X0C07,'German','Austria'],
			[0X407,'German','Germany'],
			[0X1407,'German','Liechtenstein'],
			[0X1007,'German','Luxembourg'],
			[0X807,'German','Switzerland'],
			[0X408,'Greek','Greece'],
			[0X046F,'Greenlandic','Greenland'],
			[0X447,'Gujarati','India'],
			[0X468,'Hausa (Latin)','Nigeria'],
			[0X040D,'Hebrew','Israel'],
			[0X439,'Hindi','India'],
			[0X040E,'Hungarian','Hungary'],
			[0X040F,'Icelandic','Iceland'],
			[0X470,'Igbo','Nigeria'],
			[0X421,'Indonesian','Indonesia'],
			[0X045D,'Inuktitut','Canada'],
			[0X085D,'Inuktitut (Latin)','Canada'],
			[0X083C,'Irish','Ireland'],
			[0X434,'isiXhosa','South Africa'],
			[0X435,'isiZulu','South Africa'],
			[0X410,'Italian','Italy'],
			[0X810,'Italian','Switzerland'],
			[0X411,'Japanese','Japan'],
			[0X044B,'Kannada','India'],
			[0X043F,'Kazakh','Kazakhstan'],
			[0X453,'Khmer','Cambodia'],
			[0X486,"K'iche",'Guatemala'],
			[0X487,'Kinyarwanda','Rwanda'],
			[0X441,'Kiswahili','Kenya'],
			[0X457,'Konkani','India'],
			[0X412,'Korean','Korea'],
			[0X440,'Kyrgyz','Kyrgyzstan'],
			[0X454,'Lao','Lao P.D.R.'],
			[0X426,'Latvian','Latvia'],
			[0X427,'Lithuanian','Lithuania'],
			[0X082E,'Lower Sorbian','Germany'],
			[0X046E,'Luxembourgish','Luxembourg'],
			[0X042F,'Macedonian (FYROM)','Former Yugoslav Republic of Macedonia'],
			[0X083E,'Malay','Brunei Darussalam'],
			[0X043E,'Malay','Malaysia'],
			[0X044C,'Malayalam','India'],
			[0X043A,'Maltese','Malta'],
			[0X481,'Maori','New Zealand'],
			[0X047A,'Mapudungun','Chile'],
			[0X044E,'Marathi','India'],
			[0X047C,'Mohawk','Mohawk'],
			[0X450,'Mongolian (Cyrillic)','Mongolia'],
			[0X850,'Mongolian (Traditional)',"People's Republic of China"],
			[0X461,'Nepali','Nepal'],
			[0X414,'Norwegian (Bokmal)','Norway'],
			[0X814,'Norwegian (Nynorsk)','Norway'],
			[0X482,'Occitan','France'],
			[0X448,'Odia (formerly Oriya)','India'],
			[0X463,'Pashto','Afghanistan'],
			[0X415,'Polish','Poland'],
			[0X416,'Portuguese','Brazil'],
			[0X816,'Portuguese','Portugal'],
			[0X446,'Punjabi','India'],
			[0X046B,'Quechua','Bolivia'],
			[0X086B,'Quechua','Ecuador'],
			[0X0C6B,'Quechua','Peru'],
			[0X418,'Romanian','Romania'],
			[0X417,'Romansh','Switzerland'],
			[0X419,'Russian','Russia'],
			[0X243B,'Sami (Inari)','Finland'],
			[0X103B,'Sami (Lule)','Norway'],
			[0X143B,'Sami (Lule)','Sweden'],
			[0X0C3B,'Sami (Northern)','Finland'],
			[0X043B,'Sami (Northern)','Norway'],
			[0X083B,'Sami (Northern)','Sweden'],
			[0X203B,'Sami (Skolt)','Finland'],
			[0X183B,'Sami (Southern)','Norway'],
			[0X1C3B,'Sami (Southern)','Sweden'],
			[0X044F,'Sanskrit','India'],
			[0X1C1A,'Serbian (Cyrillic)','Bosnia and Herzegovina'],
			[0X0C1A,'Serbian (Cyrillic)','Serbia'],
			[0X181A,'Serbian (Latin)','Bosnia and Herzegovina'],
			[0X081A,'Serbian (Latin)','Serbia'],
			[0X046C,'Sesotho sa Leboa','South Africa'],
			[0X432,'Setswana','South Africa'],
			[0X045B,'Sinhala','Sri Lanka'],
			[0X041B,'Slovak','Slovakia'],
			[0X424,'Slovenian','Slovenia'],
			[0X2C0A,'Spanish','Argentina'],
			[0X400A,'Spanish','Bolivia'],
			[0X340A,'Spanish','Chile'],
			[0X240A,'Spanish','Colombia'],
			[0X140A,'Spanish','Costa Rica'],
			[0X1C0A,'Spanish','Dominican Republic'],
			[0X300A,'Spanish','Ecuador'],
			[0X440A,'Spanish','El Salvador'],
			[0X100A,'Spanish','Guatemala'],
			[0X480A,'Spanish','Honduras'],
			[0X080A,'Spanish','Mexico'],
			[0X4C0A,'Spanish','Nicaragua'],
			[0X180A,'Spanish','Panama'],
			[0X3C0A,'Spanish','Paraguay'],
			[0X280A,'Spanish','Peru'],
			[0X500A,'Spanish','Puerto Rico'],
			[0X0C0A,'Spanish (Modern Sort)','Spain'],
			[0X040A,'Spanish (Traditional Sort)','Spain'],
			[0X540A,'Spanish','United States'],
			[0X380A,'Spanish','Uruguay'],
			[0X200A,'Spanish','Venezuela'],
			[0X081D,'Sweden','Finland'],
			[0X041D,'Swedish','Sweden'],
			[0X045A,'Syriac','Syria'],
			[0X428,'Tajik (Cyrillic)','Tajikistan'],
			[0X085F,'Tamazight (Latin)','Algeria'],
			[0X449,'Tamil','India'],
			[0X444,'Tatar','Russia'],
			[0X044A,'Telugu','India'],
			[0X041E,'Thai','Thailand'],
			[0X451,'Tibetan','PRC'],
			[0X041,'Turkish','Turkey'],
			[0X442,'Turkmen','Turkmenistan'],
			[0X480,'Uighur','PRC'],
			[0X422,'Ukrainian','Ukraine'],
			[0X042E,'Upper Sorbian','Germany'],
			[0X420,'Urdu','Islamic Republic of Pakistan'],
			[0X843,'Uzbek (Cyrillic)','Uzbekistan'],
			[0X443,'Uzbek (Latin)','Uzbekistan'],
			[0X042A,'Vietnamese','Vietnam'],
			[0X452,'Welsh','United Kingdom'],
			[0X488,'Wolof','Senegal'],
			[0X485,'Yakut','Russia'],
			[0X478,'Yi','PRC'],
			[0X046A,'Yoruba','Nigeria'],
			[0X41F,'Turkish','Turkic']];
	var nmID = ['Copyright notice','Font Family name','Font Subfamily name',
			'Unique font identifier','Full font name','Version string','Postscript name',
			'Trademark','Manufacturer Name','Designer','Description','URL Vendor',
			'URL Designer','License Description','License Info URL','Reserved','Preferred Family',
			'Preferred Subfamily','Compatible Full','Sample text','PostScript CID findfont name',
			'WWS Family Name','WWS Subfamily Name'];
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
