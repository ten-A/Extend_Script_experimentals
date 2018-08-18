#targetengine session

var idleTask = app.idleTasks.add({name:'preftest', sleep:100})
					.addEventListener(IdleEvent.ON_IDLE, task1);
var str = ""; 
function task1(){
	var flg = app.activeDocument.activeProcess.processResults;
	if(flg.indexOf("No")<0&&str!=flg) {
		sendNotify ("Error!", flg);
		str = flg;
		}
	app.idleTasks.itemByName("preftest").remove();
	idleTask = app.idleTasks.add({name:'preftest', sleep:100})
					.addEventListener(IdleEvent.ON_IDLE, task1);
		return;
		}

function sendNotify(title,discription){
	try{
		var ntfyr = 'display notification "' + discription + '" with title "' + title + '"';
		app.doScript(ntfyr , ScriptLanguage.APPLESCRIPT_LANGUAGE);
		}
	catch (e){}
	}