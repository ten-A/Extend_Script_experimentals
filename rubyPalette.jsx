#targetengine session

var ps;
if (app.selection[0] instanceof Character //if selection in not correct, It will terminate.
		||app.selection[0] instanceof Word) {
	if (app.selection[0].toString().indexOf(InsertionPoint)>-1) {
		ps = app.selection[0].index;
		}
	else {
		ps = 0;
		}
	var idleTask = app.idleTasks.add({name:'insertCharacter', sleep:250})
			.addEventListener(IdleEvent.ON_IDLE, task1);

	var w = new Window ('palette', 'モノルビ処理', undefined); //Make UI
	var tx = w.add('edittext', undefined,'', {multiline:false});
	tx.characters = 20;
	w.submitBtn = w.add('button', undefined, '適　用', {name:'ok'});
	w.closelBtn = w.add('button', undefined, 'とじる', {name:'close'});
	w.closelBtn.onClick = function(){
		app.idleTasks.everyItem().remove();
		w.close();
		}
	w.submitBtn.onClick = function(){ //Apply ruby string.
		app.selection[0].rubyString = tx.text;
		app.selection[0].rubyFlag = true;
		};
	w.show();
	}


function task1(ev){ //Main Idle task
	app.idleTasks.everyItem().remove(); //Remove old one.
	if (app.selection[0] instanceof Character //if selection lost, task will stop schaduling next one.
			||app.selection[0] instanceof Word) {
		//Do something you want to do. In this case, check selection and deffer old state, 
		//Get the selections contents and pass back to the Interfaces textbox.
		if (app.selection[0].index!=ps){ 
			tx.text = app.selection[0].rubyString;
			ps = app.selection[0].index; //keep selections state that needs to next task.
		}
	 idleTask = app.idleTasks.add({name:'insertCharacter', sleep:250}) //register new task.
		.addEventListener(IdleEvent.ON_IDLE, task1);
	 }
	else {
		w.close();
		return;
		}
 }
