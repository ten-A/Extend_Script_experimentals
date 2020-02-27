//Run it in InDesign CC and will get extracted extension folder.

(function(){
	var f = File.openDialog("Please select your zxp installer file.");
	f.fsName.match(/(.+?)(\.zxp)/);
	var fdr = new Folder(RegExp.$1);
	if (!fdr.exists) fdr.create();
	else return;
	app.unpackageUCF(f, fdr);
})();
