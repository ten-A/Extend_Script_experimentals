#targetengine "session"

var dc = app.activeDocument; 
var i;

var d = new Window ('palette', 'ハイライト処理', [100,100,370,260]);
var slctr = new Array();
slctr =["半角英数","全角約物","全角英数","縦中横","その他","消去"];
d.sel = d.add('panel', [20,20,250,80], ' Select Target');
d.sel.DpDLs = d.sel.add('dropdownlist', [25,15,180,30], slctr);
d.sel.DpDLs.selection = 0;
d.btP = d.add('panel', [20,90,250,145], ''); 
d.btP.submitBtn = d.btP.add('button', [20,15,100,35], '適　用', {name:'ok'});
d.btP.closelBtn = d.btP.add('button', [130,15,210,35], 'とじる', {name:'close'});
d.btP.closelBtn.onClick = function(){d.close()}
d.btP.submitBtn.onClick = function(){
		i = d.sel.DpDLs.selection - 0;
		main()};
d.show();


function main(){
	var myTarget =[
		{target : 'app.findGrepPreferences.findWhat = "[0-9a-zA-Z]";', 
			condition : "findWhat",
			color : [255,200,200]},
		{target : 'app.findGrepPreferences.findWhat = "[、。・「」（）『』”’ー＝＋／＜＞《》［］【】，．＠｀｛｝＾〜｜￥！？＃＄％＆＊]";', 
			condition : "findWhat",
			color : [255,180,255]},
		{target : 'app.findGrepPreferences.findWhat = "[０-９ａ-ｚＡ-Ｚ]";', 
			condition : "findWhat",
			color : [255,150,255]},
		{target : 'app.findGrepPreferences.tatechuyoko = true;',
			condition : "tatechuyoko;",
			color : [180,235,255]},
		{target : 'app.findGrepPreferences.findWhat = ', 
			condition : "findWhat",
			color : [255,190,200]}];
	if (i==4){
		var val = prompt('target input', '[]');
		myTarget[4].target += '"' + val + '";';
		}
	
	if (i<5){
		try {
			applyCondition(myTarget);
			}catch (e) {
				alert (e.message + "\nline " + e.line);
				};
		} else {
			try {
				dc.conditions.everyItem().remove();
				}catch(e){}
			}
			
	}


function applyCondition(tg){
	app.findGrepPreferences =null;
	app.changeGrepPreferences = null;
	if (dc.conditions.item(tg[i].condition)!=null) dc.conditions.item(tg[i].condition).remove();
	dc.conditions.add ({
		name: tg[i].condition, 
		indicatorColor: tg[i].color, 
		indicatorMethod: ConditionIndicatorMethod.useHighlight
		});
	eval(tg[i].target);
	app.changeGrepPreferences.appliedConditions = [dc.conditions.item(tg[i].condition)];
	dc.changeGrep();
	dc.layoutWindows[0].screenMode = ScreenModeOptions.previewOff;
	}

