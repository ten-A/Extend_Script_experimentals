(function(){
	var ps;
	if (app.selection[0] instanceof Character 
			||app.selection[0] instanceof Word
			||app.selection[0] instanceof InsertionPoint
			||app.selection[0] instanceof Text) {
		if (app.selection[0].toString().indexOf(InsertionPoint)>-1) {
			ps = app.selection[0].index;
			}
		else {
			ps = 0;
			}
		if(app.idleTasks.itemByName('rubyPalette')!=null)
			app.idleTasks.itemByName("rubyPalette").remove();
		var idleTask = app.idleTasks.add({name:'rubyPalette', sleep:250})
				.addEventListener(IdleEvent.ON_IDLE, task1);
		var w = new Window ('palette', 'ルビ処理', undefined);
		var tx = w.add('edittext', undefined,'', {multiline:false});
		tx.characters = 20;
		w.submitBtn = w.add('button', undefined, '適　用', {name:'ok'});
		w.closelBtn = w.add('button', undefined, 'とじる', {name:'close'});
		w.closelBtn.onClick = function(){
			app.idleTasks.itemByName("rubyPalette").remove();
			w.close();
			}
		w.submitBtn.onClick = function(){
			app.selection[0].rubyString = tx.text;
			app.selection[0].rubyFlag = true;
			};
		w.show();
		}
	function task1(ev){
		$.writeln(app.idleTasks[0].name);
		app.idleTasks.itemByName("rubyPalette").remove();
		if (app.selection[0] instanceof Character
				||app.selection[0] instanceof Word
				||app.selection[0] instanceof InsertionPoint
				||app.selection[0] instanceof Text) {
			if (app.selection[0].index!=ps){ 
				tx.text = app.selection[0].rubyString;
				ps = app.selection[0].index;
			}
		 app.idleTasks.add({name:'rubyPalette', sleep:250})
			.addEventListener(IdleEvent.ON_IDLE, task1);
		 }
		else {
			w.close();
			return;
			}
		}
	}());
