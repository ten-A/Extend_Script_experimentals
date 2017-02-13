var $_affine={
	win:function(){
		var w = new Window ('dialog', "affine matrix", undefined);
		var p1 = w.add('panel',undefined,"a");
		p1.size = [100,45];
		var tx1 = p1.add('edittext',undefined,'1',{multiline:false});
		tx1.characters = 5;
		var p2 = w.add('panel',undefined,"b");
		p2.size = [100,45];
		var tx2 = p2.add('edittext',undefined,'0',{multiline:false});
		tx2.characters = 5;
		var p3 = w.add('panel',undefined,"c");
		p3.size = [100,45];
		var tx3 = p3.add('edittext',undefined,'0',{multiline:false});
		tx3.characters = 5;
		var p4 = w.add('panel',undefined,"d");
		p4.size = [100,45];
		var tx4 = p4.add('edittext',undefined,'1',{multiline:false});
		tx4.characters = 5;
		var cl = w.add('button', undefined, 'cancel', {name:'cancel'});
		var bt = w.add('button', undefined , 'apply', {name:'ok'});
		bt.onClick = function (){
			$_affine.applyTransform(tx1.text,tx2.text,tx3.text,tx4.text);
			}
		w.show();
	},
	applyTransform:function(a,b,c,d){
		var tm = new Matrix();
		tm.mValueA = Number(a);
		tm.mValueB = Number(b);
		tm.mValueC = Number(c);
		tm.mValueD = Number(d);
		tm.mValueTX = 0;
		tm.mValueTY = 0;
		//alert(tm.mValueA+tm.mValueB+tm.mValueC+tm.mValueD);
		app.selection[0].transform(tm,true,true,true,true,1);
		app.redraw();
		}
	}
$_affine.win();
