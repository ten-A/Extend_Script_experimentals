var taxCalc = {
	tax : 10,
	base : 8,
	inTax : false,
	re : /(\d{1,3},)?(\d{3},){0,3}(\d{1,3}|\d{1,2})/,
	exe : function (tg){
		if(tg.contents.match(this.re)!=null){
			var str = tg.contents.match(this.re)[0];
			var idx = tg.contents.indexOf(str);
			for (var i = idx+1;i<idx+str.length;i++) {
				tg.characters[idx+1].remove();
				//app.redraw();
				}
			var num= this.rtTax(this.toN(str));
			tg.characters[idx].contents = this.toS(num);
			}
		},
	toS : function (n){
		if ((n+"").length<4) return String(n);
		var dl = ",";
		var str = String(n);
		var rslt = "";
		while (str.length>3){
			rslt = dl + str.substr (-3, 3) + rslt;
			str = str.slice(0,str.length-3);
			}
		rslt = str + rslt;
		if (rslt.substr(0,1)==",") 
			rslt = rslt.substr(1,rslt.length-1);
		return rslt;
		},
	toN : function(st){
		st = st.replace (/,/g, "");
		if (this.inTax) return Math.round(Number(st/(1+this.base/100)));
		else return Number(st);
		},
	rtTax : function (n){
		return Math.round(n*(1+this.tax/100));
		}
	}


taxCalc.inTax = true;
for (var i=0;i<app.selection.length;i++){
	taxCalc.exe(app.selection[i]);
	}
