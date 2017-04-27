var pngtool = {
	precision : 0,
	components : 0,
	width : 0,
	height : 0,
	bitdepth : 0,
	colortype : 0,
	compression : 0,
	interlace : 0,
	file : {},
	hdrCheck : function(){
		var flag = true;
		this.file.encoding = 'BINARY';
		if (!this.file.open('r')) return false;
		//this.file.seek(0);
		if (this.readByte()!=0x89) flag = false;
		var sig = "";
		for (var i=0;i<3;i++) sig += this.file.readch();
		if (sig!="PNG") flag = false;
		if (this.readByte()!=0x0d) flag = false;
		if (this.readByte()!=0x0a) flag = false;
		if (this.readByte()!=0x1a) flag = false;
		if (this.readByte()!=0x0a) flag = false;
		if (!flag) {
			this.file.close();
			return false;
			}
		return true;
		},
	getIHDR : function(){
		var sz = this.readUShort() << 16 + this.readUShort();
		var sig = "";
		for (var i=0;i<4;i++) sig += this.file.readch();
		if (sig!="IHDR") return false;
		this.width = this.readUShort() * 65535 + this.readUShort();
		this.height = this.readUShort() *65535 + this.readUShort();
		this.bitdepth = this.readByte();
		this.colortype = this.readByte();
		this.compression = this.readByte();
		this.interlace = this.readByte();
		return true;
		},
	readByte : function(){
		return this.file.readch().charCodeAt(0);
		},
	readUShort : function(){
		var result = this.file.readch().charCodeAt(0) * 256;
		result += this.file.readch().charCodeAt(0);
		return result;
		},
	ctype: ["Grayscale","","RGB","Indexed color","Grayscale+Alpha","","RGB+Alpha"]
	}


pngtool.file = File.openDialog ("select PNG File.","*.png");
if (pngtool.hdrCheck()){
	if (pngtool.getIHDR()){
		var tx = pngtool.file.displayName+"\nwidth = " + pngtool.width + " px\n";
		tx += "height = " + pngtool.height + " px\n";
		tx += "bitDepth = " + pngtool.bitdepth + " bit\n";
		tx += "colorType = " + pngtool.ctype[pngtool.colortype] + "\n";
		tx += "compression = " + pngtool.compression + "\n";
		tx += "interlace = " + pngtool.interlace + "\n";
		alert (tx);
		}
	else pngtool.file.close();
	}
