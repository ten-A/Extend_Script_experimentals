/*
	Bridge Mailer 1.0.1 beta. multi Language version.
	Release date/28.June.2014.
	**************************************************
	30.June.2014 change few timing of scheduling task and canceling task.
*/


function BridgeMailer() {
	BridgeMailer.mailServerName = app.preferences.popServer;
	BridgeMailer.username = app.preferences.popUser;
	BridgeMailer.password = app.preferences.passwd;
	BridgeMailer.sender = app.preferences.sender;
	BridgeMailer.POP = 110;
	BridgeMailer.SMTP = 25;
	BridgeMailer.sendTaskID = 0;
	BridgeMailer.attach = false;
	BridgeMailer.Thumbnails = [];
	BridgeMailer.socket = new Socket();
	BridgeMailer.socket.encoding = "binary";
	BridgeMailer.isRunning = false;
	BridgeMailer.boundary = "****=_NextPartMyBody_0000 " + new Date().getSeconds();
	}


BridgeMailer.connect = function(host, port) {
	if(!BridgeMailer.socket.open(host + ":" + port)) return false;
	return true;
	}


BridgeMailer.authorise = function() {
	try {
		BridgeMailer.doCommand("USER " + BridgeMailer.username, "pop")
		BridgeMailer.doCommand("PASS " + BridgeMailer.password, "pop");
		BridgeMailer.doCommand ("QUIT", "pop");
		} catch(o_O) { 
			alert ("BridgeMailer.authorise() Error");
			return false;
			}
		return true;
	}


BridgeMailer.doCommand = function(cmd, type) {
	var reply = "";
	BridgeMailer.socket.write(cmd + "\r\n");
	if (type.match(/pop|smtp/)==null) {
		BridgeMailer.close();
		return false;
		}
	$.sleep(300);
	reply = BridgeMailer.socket.read();
	if(type=="pop"&&reply.substring(0,1)=="-"||type=="smtp"&&!reply) {
		BridgeMailer.close();
		app.cancelTask(BridgeMailer.sendTaskID);
		BridgeMailer.isRunning = false;
		throw "Command error for: " + type + " - " + cmd;
		}
	return true;
	}


BridgeMailer.close = function() { 
	try {
		BridgeMailer.socket.close();
		} catch(error) { 
			alert ("BridgeMailer.close(): Error closing socket: " + error); 
			}
	}


BridgeMailer.getMessage = function(){
	var rslt = [];
	var w = new Window ("dialog","Bridge Mailer");
	var rePnl = w.add('panel',undefined, "Recipient");
	var rec = rePnl.add("edittext",undefined,"");
	rec.size = [400,20];
	var tiPnl = w.add('panel',undefined, "Title");
	var ti = tiPnl.add("edittext",undefined,"Sending Data from Bridge Mailer");
	ti.size = [400,20];
	var mePnl = w.add('panel', undefined,"Message");
	var message = mePnl.add("edittext",undefined,"",{multiLine:true});
	message.size = [400,60];
	var btnGroup = w.add("group", undefined );
	btnGroup.alignment = "center";
	var bt = btnGroup.add("button", undefined, "Send");
	var cl = btnGroup.add("button", undefined, "Cancel");
	bt.onClick = function (){
		if (rec.text.match(/.+@.+\..+/)==null){
			alert("Check Mail address!");
			return;
			}
		w.close();
		rslt.push(rec.text);
		}
	cl.onClick = function (){
		w.close();
		app.cancelTask(BridgeMailer.sendTaskID);
		rslt.push(false);
		}
	w.show();
	rslt.push("=?UTF-8?B?" + BridgeMailer.base64(BridgeMailer.toUTF8(ti.text)) + "?=");
	rslt.push(BridgeMailer.base64(BridgeMailer.toUTF8(message.text + "\r\n")));
	return rslt;
	}


BridgeMailer.send = function() {
	if(BridgeMailer.Thumbnails.length != 0) {
		BridgeMailer.isRunning = true;
		var messe = BridgeMailer.getMessage();
		if (!messe[0]) {
			BridgeMailer.isRunning = false;
			return;
			}
		if(!BridgeMailer.connect(BridgeMailer.mailServerName , BridgeMailer.POP)) {
			BridgeMailer.isRunning = false;
			return;
			}
		BridgeMailer.authorise();
		BridgeMailer.close();
		if(BridgeMailer.connect(BridgeMailer.mailServerName , BridgeMailer.SMTP)) {
			var welcome = BridgeMailer.socket.read();
			BridgeMailer.doCommand ("EHLO " + BridgeMailer.sender, "smtp");
			BridgeMailer.doCommand ("MAIL FROM: " + BridgeMailer.sender, "smtp");
			BridgeMailer.doCommand ("RCPT TO: " + messe[0], "smtp");
			BridgeMailer.doCommand ("DATA", "smtp");
			BridgeMailer.socket.write ('From: "BridgeMailer" <' + BridgeMailer.sender + '>\r\n');
			BridgeMailer.socket.write ("To: " + messe[0] + "\r\n");
			BridgeMailer.socket.write ("Subject: " + messe[1] + "\r\n");
			BridgeMailer.socket.write ("Date: " + new Date().toString() +  "\r\n");
			BridgeMailer.socket.write("MIME-Version: 1.0\r\n");
			BridgeMailer.socket.write("Content-Type: multipart/mixed;\r\n");
			BridgeMailer.socket.write('\tboundary="' + BridgeMailer.boundary + '"\r\n');
			BridgeMailer.socket.write("X-Mailer: Bridge Mailer 1.0\r\n");
			BridgeMailer.socket.write("\r\n");
			BridgeMailer.socket.write("This is a multi-part mesage in MIME format.\r\n");
			BridgeMailer.socket.write("\r\n");
			BridgeMailer.socket.write("--" + BridgeMailer.boundary + "\r\n");
			BridgeMailer.socket.write("Content-Type: text/plain;");
			BridgeMailer.socket.write(" charset=UTF-8;");
			BridgeMailer.socket.write(" delsp=yes;");
			BridgeMailer.socket.write(" format=flowed;\r\n");
			BridgeMailer.socket.write("Content-Transfer-Encoding: base64\r\n");
			BridgeMailer.socket.write("\r\n");
			BridgeMailer.socket.write(messe[2] + "\r\n");
			BridgeMailer.socket.write("\r\n");
			BridgeMailer.socket.write("--" + BridgeMailer.boundary + "\r\n");
			BridgeMailer.attach = app.scheduleTask('BridgeMailer.sendData()', 10, true);
			}
		}
	}


BridgeMailer.sendData = function() {
	app.document.status = "BridgeMailer is sending files...";
	BridgeMailer.thumb = BridgeMailer.Thumbnails.pop();
	var fp = BridgeMailer.thumb.path;
	BridgeMailer.socket.write("Content-type: " + BridgeMailer.thumb.mimeType + ";\r\n");
	BridgeMailer.socket.write('\tname="=?UTF-8?B?' 
			+ BridgeMailer.base64(BridgeMailer.toUTF8(BridgeMailer.thumb.name)) + '?="\r\n');
	BridgeMailer.socket.write("Content-Disposition: attachment;\r\n");
	BridgeMailer.socket.write('\tfilename="=?UTF-8?B?' 
			+ BridgeMailer.base64(BridgeMailer.toUTF8(BridgeMailer.thumb.name)) + '?="\r\n')
	BridgeMailer.socket.write("Content-Transfer-Encoding: base64\r\n");
	BridgeMailer.socket.write("\r\n");

	BridgeMailer.encodeString(fp);
	if(BridgeMailer.Thumbnails.length!=0) {
		BridgeMailer.socket.write("--" + BridgeMailer.boundary + "\r\n");
		return true;
		}
	else {
		app.scheduleTask('BridgeMailer.finishEmail()', 10, false);
		app.cancelTask(BridgeMailer.attach);
		return;  
		}
	return true;
	}


BridgeMailer.base64 = function (str){ //encoder use for short strings only
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var encoded = "";
	var c1, c2, c3;
	var e1, e2, e3, e4;
	var i = 0;
	while(i<str.length){
		c1 = str.charCodeAt(i++);
		c2 = str.charCodeAt(i++);
		c3 =str.charCodeAt(i++);
		e1 = c1 >> 2;
		e2 = ((c1 & 3) << 4) | (c2 >> 4);
		e3 = ((c2 & 15) << 2) | (c3 >> 6);
		e4 = c3 & 63;
		if (isNaN(c2)){
			e3 = e4 = 64;
			} 
		else if (isNaN(c3)) {
			e4 = 64;
			}
		encoded = encoded + keyStr.charAt(e1) + keyStr.charAt(e2) + 
			keyStr.charAt(e3) + keyStr.charAt(e4);
		}
	return encoded;
	}


BridgeMailer.encodeString = function(fpath) { //for encode target object
	var theFile = new File(fpath);
	theFile.encoding = "binary";
	theFile.open("r");
	var binStr = theFile.read();
	theFile.close();
	var flNm = fpath+".tmp";
	var tmpFile = new File(flNm);
	tmpFile.open("w");	
	szB64 = new Array;
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (j=0;j<64;j++){
		szB64[j] = keyStr.charAt(j);
		}
	var ecdStr = "";
	var counter = 0;
	var binLen = binStr.length - (binStr.length % 3); 
	for (i=0;i<binLen;i+=3) {
		ecdStr += szB64[binStr.charCodeAt (i) >> 2];
		ecdStr += szB64[((binStr.charCodeAt (i) & 0x3) << 4) | (binStr.charCodeAt (i+1) >> 4)];
		ecdStr += szB64[((binStr.charCodeAt (i+1) & 15) << 2) | (binStr.charCodeAt (i+2) >> 6)];
		ecdStr += szB64[binStr.charCodeAt (i+2) & 0x3f];
		counter +=4;
		if(counter > 75) {
			tmpFile.writeln (ecdStr);
			ecdStr = "";
			counter = 0;
			}
		}
	switch (binStr.length % 3){
		case 2:
			ecdStr += szB64[binStr.charCodeAt (i) >> 2];
			ecdStr += szB64[((binStr.charCodeAt (i) & 0x3) << 4) | (binStr.charCodeAt (i+1) >> 4)];
			ecdStr += szB64[((binStr.charCodeAt (i+1) & 15) << 2) | (binStr.charCodeAt (i+2) >> 6)];
			ecdStr += "=";
			tmpFile.writeln (ecdStr);	
		break;
		case 1:
			ecdStr += szB64[binStr.charCodeAt (i) >> 2];
			ecdStr += szB64[((binStr.charCodeAt (i) & 0x3) << 4) | (binStr.charCodeAt (i+1) >> 4)];
			ecdStr += "=="
			tmpFile.writeln (ecdStr);	
		break;
		default:
			tmpFile.writeln (ecdStr);	
		break;
		}
	tmpFile.seek(0,0);
	while(!tmpFile.eof) BridgeMailer.socket.write(tmpFile.readln()+"\r\n");
	tmpFile.close();
	tmpFile.remove();
	}


BridgeMailer.toUTF8 = function (str) { //Convert Unicode toUTF-8
	var cd, rslt = "";
	for (var i=0;i<str.length;i++) {
		cd = str.charCodeAt(i);
		if (cd<=0x7f) {
			rslt += str.charAt(i);
			}
		else if (cd>=0x80 && cd<=0x7ff) {
			rslt += String.fromCharCode(((cd >> 6) & 0x1f) | 0xc0);
			rslt += String.fromCharCode((cd & 0x3f) | 0x80);
			}
		else {
			rslt += String.fromCharCode((cd >> 12) | 0xe0);
			rslt += String.fromCharCode(((cd >> 6) & 0x3f) | 0x80);
			rslt += String.fromCharCode((cd & 0x3f) | 0x80);
			}
		}
	return rslt;
	}


BridgeMailer.finishEmail = function() {
	BridgeMailer.socket.write("\r\n");
	BridgeMailer.socket.write("--" + BridgeMailer.boundary + "--\r\n");
	retval = BridgeMailer.doCommand(".", "smtp");
	BridgeMailer.doCommand("QUIT", "smtp");
	BridgeMailer.close();
	BridgeMailer.isRunning = false;
	app.document.status = "BridgeMailer has finished emailing files.";
	}


BridgeMailer.prototype.run = function() {
	try {
		var emailMenuItem = new MenuElement("command", "BridgeMailer: Send by Email", 
	                                        "at the end of Thumbnail", "BridgeMailerMenu");
		emailMenuItem.onSelect = function(m) {
			if(!BridgeMailer.isRunning) { // Check the status of the background operation
				var cachedSelections = app.document.selections;
				BridgeMailer.Thumbnails = [];
				for(var i=0;i<cachedSelections.length;i++) {
					if(cachedSelections[i].container) continue;
					BridgeMailer.Thumbnails.push(cachedSelections[i]);
					}
				if(BridgeMailer.Thumbnails.length>0) {
					BridgeMailer.sendTaskID = app.scheduleTask('BridgeMailer.send()', 10, false);
					} 
				}		
			}
		emailMenuItem.onDisplay = function(m) {
			var selLength = app.document.selectionLength;
    		if(selLength>0) this.enabled = true;
			else this.enabled = false;
			}
		var emailPref = new MenuElement("command", "Email setting...", 
	                                        "at the end of Help", "BridgeMailerSetting");
		emailPref.onSelect = function() {
			var props =["popServer","popUser","sender","passwd","smtp","smtpPort"];
			var val = [];
			for (var i=0;i<props.length;i++)
				eval("val[" + i + "]=app.preferences." + props[i]);
			var w = new Window ("dialog","Email Settings");
			var pnl0 = w.add('panel',undefined, "mail server");
			var pop = pnl0.add('edittext', undefined, val[0]);
			pop.characters = 40;
			var pnl1 = w.add('panel',undefined, "user name");
			var usr = pnl1.add('edittext', undefined, val[1]);
			usr.characters = 40;
			var pnl2 = w.add('panel',undefined, "mail address");
			var sdr = pnl2.add('edittext', undefined, val[2]);
			sdr.characters = 40;
			var pnl3 = w.add('panel',undefined, "password");
			var pwd = pnl3.add('edittext', undefined, val[3],{noecho:true});
			pwd.characters = 40;
			var pnl4 = w.add('panel',undefined, "smtp server");
			var smt = pnl4.add('edittext', undefined, val[4]);
			smt.characters = 40;
			var pnl5 = w.add('panel',undefined, "smtp port");
			var spt = pnl5.add('edittext', undefined, val[5]);
			spt.characters = 40;
			var btnGroup = w.add("group", undefined );
			btnGroup.alignment = "center";
			var bt = btnGroup.add("button", undefined, "OK");
			var cl = btnGroup.add("button", undefined, "Cancel");
			bt.onClick = function (){
				if (!BridgeMailer.connect(pop.text, BridgeMailer.POP)){
					alert("Could not connect POP server, check this...");
					return;
					}
				app.preferences.popServer = pop.text;
				app.preferences.popUser = usr.text;
				app.preferences.sender = sdr.text;
				app.preferences.passwd = pwd.text;
				app.preferences.smtp = smt.text;
				app.preferences.smtpPort = spt.text;
				BridgeMailer.mailServerName = app.preferences.popServer;
				BridgeMailer.username = app.preferences.popUser;
				BridgeMailer.password = app.preferences.passwd;
				BridgeMailer.sender = app.preferences.sender;
				if (!BridgeMailer.authorise()) return;
				w.close();
				}
			cl.onClick = function (){
				w.close();
				}
			w.show();
			}
	
		} catch(error) { 
			alert (error);
			return false;
			}
	return true;
	}


new BridgeMailer().run();



