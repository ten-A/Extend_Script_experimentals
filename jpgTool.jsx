jpgtool = {
	precision : 0,
	components : 0,
	width : 0,
	height : 0,
	getInfo : function(f){
		f.encoding = 'BINARY';
		var str = "";
		var bds = [];
		if (f.open("r")){
			while(f.tell()<48000){
				var d = jpgtool.readByte(f);
				if (d==0xff){
					d = jpgtool.readByte(f);
					if (d==0xc0){
						bds = jpgtool.getValue(f);
						}
					}
				}
			f.close();
			}
		return this;
		},
	getValue : function(f){
		var pos = jpgtool.readUShort(f) - 8;
		this.precision = jpgtool.readByte(f);
		this.height = jpgtool.readUShort(f);
		this.width = jpgtool.readUShort (f);
		this.components = jpgtool.readByte(f);
		f.seek(pos, 1);
		},
	readByte : function(targetFile){
		return targetFile.readch().charCodeAt(0);
		},
	readUShort : function(targetFile){
		var result = targetFile.readch().charCodeAt(0) * 256;
		result += targetFile.readch().charCodeAt(0);
		return result;
		}
	}



var val = jpgtool.getInfo(File.openDialog ("select JPG File."));
var tx = "width = " + val.width + " px\n";
 tx += "height = " + val.height + " px\n";
 tx += "precision = " + val.precision + " bit\n";
 tx += "components = " + val.components + " (channel)";
alert (tx);
