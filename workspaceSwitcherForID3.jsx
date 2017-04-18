#targetengine session

var ctn = app.toolBoxTools.currentToolName;
var idleTask = app.idleTasks.add({name:'toolObserver', sleep:80})
					.addEventListener(IdleEvent.ON_IDLE, task1);
function task1(ev){
	app.idleTasks.itemByName("toolObserver").remove();
	if (ctn==app.toolBoxTools.currentToolName){
		idleTask = app.idleTasks.add({name:'toolObserver', sleep:80})
					.addEventListener(IdleEvent.ON_IDLE, task1);
		return;
		}
	toolChanged();
	ctn = app.toolBoxTools.currentToolName;
	idleTask = app.idleTasks.add({name:'toolObserver', sleep:80})
					.addEventListener(IdleEvent.ON_IDLE, task1)
	//$.writeln(app.toolBoxTools.currentToolName);
	}

function toolChanged(){
	//alert("triggered!");
	switch(app.toolBoxTools.currentTool){
		case 1936018548: //SELECTION_TOOL
		case 1685277812: //DIRECT_SELECTION_TOOL
		case 1936741484: //PAGE_TOOL
		case 1734430836: //GAP_TOOL
		case 1852796517: //NONE
		case 1835357292: //MEASURE_TOOL
		case 1919898732: //ROTATE_TOOL
		case 1935889516: //SCALE_TOOL
		case 1936217196: //SHEAR_TOOL
			app.applyWorkspace("ws0");		  
			break;
		case 1954107508: //TYPE_TOOL
		case 1987335276: //VERTICAL_TYPE_TOOL
		case 1953452148: //TYPE_ON_PATH_TOOL
		case 1987334000: //VERTICAL_TYPE_ON_PATH_TOOL
		case 1751602284: //HORIZONTAL_GRID_TOOL
		case 1986483308: //VERTICAL_GRID_TOOL
			app.applyWorkspace("ws1");		  
			break;
		case 1819169900: //LINE_TOOL
		case 1885687412: //PEN_TOOL
		case 1633767540: //ADD_ANCHOR_POINT
		case 1684099188: //DELETE_ANCHOR_POINT
		case 1667518580: //CONVERT_DIRECTION_POINT
		case 1886274412: //PENCIL_TOOL
		case 1936544872: //SMOOTH_TOOL
		case 1701991269: //ERASE_TOOL
		case 1935891060: //SCISSORS_TOOL
		case 1718899820: //FREE_TRANSFORM_TOOL
		case 1919308908: //RECTANGLE_FRAME_TOOL
		case 1885754476: //POLYGON_FRAME_TOOL
		case 1919243372: //RECTANGLE_TOOL
		case 1886147692: //POLYGON_TOOL
		case 1701598316: //ELLIPSE_TOOL
		case 1701205100: //ELLIPSE_FRAME_TOOL
			app.applyWorkspace("ws2");		  
			break;
		case 1735611500: //GRADIENT_SWATCH_TOOL
		case 1734759532: //GRADIENT_FEATHER_TOOL
		case 1751209068: //HAND_TOOL
		case 2053985388: //ZOOM_TOOL
		case 1952601196: //TABLE_TOOL
		case 1852789868: //NOTE_TOOL
		case 1701074028: //EYE_DROPPER_TOOL
			app.applyWorkspace("ws3");		  
			break;
		default:
		break;
		}
	}
