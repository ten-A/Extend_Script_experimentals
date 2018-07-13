psdtool = {
	depth : 0,
	channels : 0,
	width : 0,
	height : 0,
	mode : 0,
	modeList : ["Bitmap","Grayscale","Indexed","RGB","CMYK","","","Multichannel","Duotone","Lab"],
	sig: true,
	getInfo : function(f){
		f.encoding = 'BINARY';
		var str = "";
		var bds = [];
		var sg = "";
		if (f.open("r")){
			for (var i=0;i<4;i++) sg += f.readch();
			this.sig = (sg=="8BPS")? true : false;
			f.seek(12);
			this.channels = this.readUShort(f);
			this.height = this.readULong(f);
			this.width = this.readULong(f);
			this.depth = this.readUShort(f);
			this.mode = this.readUShort(f);
			f.close();
			}
		return this;
		},
	readByte : function(targetFile){
		return targetFile.readch().charCodeAt(0);;
		},
	readUShort : function(targetFile){
		var result = targetFile.readch().charCodeAt(0) * 256;
		result += targetFile.readch().charCodeAt(0);
		return result;
		},
	readULong: function(targetFile){
		var result=0;
		var a = 16777216;
		for(var k=0;k<4;k++){
			result += targetFile.readch().charCodeAt(0) * a;
			a /= 256;
			}
		return result;
		}
	}

var val = psdtool.getInfo(File.openDialog ("select PSD File."));
if (val.sig){
	var tx = "PSD File Information\n" + "width = " + val.width + " px\n";
	 tx += "height = " + val.height + " px\n";
	 tx += "mode = " + val.modeList[val.mode] + " \n";
	 tx += "depth = " + val.depth + " bits/channel\n"
		+ "channels = " + val.channels + "(channels)";
	alert (tx);
	}
else alert("Not PSD File...");