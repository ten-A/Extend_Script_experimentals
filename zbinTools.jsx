var zbin = {
	decode:function(lebin){
		var ar = lebin.split("");
		var hi,lo;
		var rslt = "";
		while (ar.length>0){
			lo = ar.shift() + ar.shift();
			hi = ar.shift() + ar.shift();
			rslt += String.fromCharCode(Number("0x"+hi+lo));
			}
		return rslt;return
		},
	getLE:function(st){
		var rslt = st.slice(2,4).toString() + st.slice(0,2).toString();
		return rslt;
		},
	encode:function(str){
		var cdStr = "";
		for (var i=0;i<txt.length;i++) cdStr += getLE(txt.charCodeAt(i).toString(16));
		return cdStr;
		}
	}

//Test
$.writeln(zbin.encode("山路を登りながら"));
$.writeln(zbin.decode("3e54298f6f306d305330673042308b30"));
