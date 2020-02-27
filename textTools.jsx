var textTools = {
	reverser : function(tgt){ //a textRange
			if(tgt.typename!="TextRange") return false;
			var rst = "";
			var st = tgt.contents;
			for (var i=st.length;i>=0;i--) rst += st.substr(i, "1");
			num = app.activeDocument.selection.characterOffset -1;
			app.activeDocument.selection.contents = "a";
			app.activeDocument.selection.parent.characters[num].contents = rst;
 		},
	charSplitter : function (tx){ //single line textFrame
		if(tgt.typename!="TextFrame") return false;
		if (tx.lines.length>1||tx.characters.length<2) return false;
		var chr,y;
		for (var k=tx.characters.length-1;k>=0;k--){
			chr = tx.duplicate();
			y = tx.position[1];
			for (var j=chr.characters.length-2;j>=0;j--) chr.characters[j].remove();
			tx.characters[k].remove();
			if (tx.height>chr.height) y =  y - tx.height + chr.height;
			chr.position = [tx.position[0]+tx.width, y];
			}
		tx.remove();	
		},
	lineSplitter : function (tx) { //textFrame
		if(tgt.typename!="TextFrame") return false;
		var num = tx.paragraphs.length-1;
		for (var b,h1,h2,j,i=num;i>=0;i--){
			b = tx.duplicate ();
			h1 = tx.height;
			tx.paragraphs[i].remove();
			for (j=i-1;j>=0;j--) b.paragraphs[j].remove();
			h2 = b.height;
			b.position = [tx.position[0], tx.position[1]-h1+h2];
			}
		},
	sortAndConnect : function(tg) { //selected textFrames
		var tf=[];
		for(var i=0;i<tg.length;i++)
			tf.push(tg[i]);
		tf.sort(function(a,b){return b.position[0]>a.position[0]?-1:b.position[0]==a.position[0]?0:1});
		for(var chr=tf[0].characters.length,i=1;i<tf.length;i++) {
			tf[0].characters.add("#");
			tf[0].characters[chr].size = tf[i].characters[0].size;
			tf[0].characters[chr].tracking = tf[i].characters[0].tracking;
			tf[0].characters[chr].characterAttributes.textFont = tf[i].characters[0].characterAttributes.textFont;
			tf[0].characters[chr].horizontalScale = tf[i].characters[0].horizontalScale;
			tf[0].characters[chr].verticalScale = tf[i].characters[0].verticalScale;
			tf[0].characters[chr].baselineShift = tf[i].characters[0].baselineShift;
			tf[0].characters[chr].contents = tf[i].contents;
			chr += tf[i].characters.length;
			tf[i].remove();
			}
		},
	tabSplitter : function(tg){ //single line textFrames
		for (var i=0;i<app.selection.length;i++)
			if(app.selection[i].typename=="TextFrame")
				while(this.firstTabSplitter(app.selection[i])){}
		},
	firstTabSplitter : function(tf) { //textFrame
		if (tf.characters.length<2) return false;
		var wd = tf.width;
		var n = tf.contents.indexOf("\t");
		if (n<0) return false;
		var tf2 = tf.duplicate();
		for (var i=tf.characters.length-1;i>=n;i--) 	tf.characters[i].remove();
		for (i=n;i>=0;i--) tf2.characters[i].remove();
		tf2.position = [tf.position[0] + wd - tf2.width, tf.position[1]];
		tf.characters[tf.characters.length-1].tracking = 0;
		tf2.characters[tf2.characters.length-1].tracking = 0;
		return true;
		}
	}


textTools.reverser(app.selection);
