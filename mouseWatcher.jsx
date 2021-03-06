#targetengine session

var w = new Window("palette","",[00,35,1800,1100]);
var canvas = w.add("panel",[0,0,1920,1080],"");
canvas.addEventListener("mousedown",logging);
w.opacity=0.05;

app.idleTasks.add({name:'mouseWatcher', sleep:200}).addEventListener(IdleEvent.ON_IDLE, takeInterval);

function mWatcher(){
	if (app.idleTasks.itemByName("interval")) app.idleTasks.itemByName("interval").remove();
	w.show();
	app.idleTasks.add({name:'mouseWatcher', sleep:200}).addEventListener(IdleEvent.ON_IDLE, takeInterval);
	}

function takeInterval(){
	w.close();
	app.idleTasks.itemByName("mouseWatcher").remove();
	app.idleTasks.add({name:'interval', sleep:800}).addEventListener(IdleEvent.ON_IDLE, mWatcher);
	}

function logging(e){
	var tg = app.activeDocument.textFrames[0];
	var st = tg.contents　+ "\r" + e.screenX + ",  " + e.screenY;
	$.writeln( e.screenX + ",  " + e.screenY);
	tg.contents = st;
	}
