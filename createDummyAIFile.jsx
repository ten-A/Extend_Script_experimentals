var header = "%!PS-Adobe-3.0 "+"\n"+
	"%%Creator: Adobe Illustrator(R) 13.0"+"\n"+
	"%%AI8_CreatorVersion: 13.0.3"+"\n"+
	"%%For: (Ten_a) ()"+"\n"+
	"%%Title: (test.ai)"+"\n"+
	"%%CreationDate: 8/12/09 9:55 AM"+"\n"+
	"%%BoundingBox: 251 351 612 572"+"\n"+
	"%%HiResBoundingBox: 251.5371 351.708 611.0557 571.2261"+"\n"+
	"%%DocumentProcessColors: Black"+"\n"+
	"%AI5_FileFormat 9.0"+"\n"+
	"%AI12_BuildNumber: 483"+"\n"+
	"%AI3_ColorUsage: Color"+"\n"+
	"%AI7_ImageSettings: 0"+"\n"+
	"%%CMYKProcessColor: 1 1 1 1 ([Resistratoin])"+"\n"+
	"%AI3_TemplateBox: 516.5 364.0039 516.5 364.0039"+"\n"+
	"%AI3_TileBox: 236.4053 -15.748 795.4053 767.252"+"\n"+
	"%AI3_DocumentPreview: None"+"\n"+
	"%AI5_ArtSize: 1031.811 728.504"+"\n"+
	"%AI5_RulerUnits: 1"+"\n"+
	"%AI9_ColorModel: 2"+"\n"+
	"%AI5_ArtFlags: 0 0 0 1 0 0 1 0 0"+"\n"+
	"%AI5_TargetResolution: 800"+"\n"+
	"%AI5_NumLayers: 1"+"\n"+
	"%AI9_OpenToView: -5 728.5039 1.35 1412 995 18 0 0 6 75 0 0 1 1 1 0 1"+"\n"+
	"%AI5_OpenViewLayers: 7"+"\n"+
	"%%PageOrigin:0 0"+"\n"+
	"%AI7_GridSettings: 56.6929 8 56.6929 8 1 0 0.8 0.8 0.8 0.9 0.9 0.9"+"\n"+
	"%AI9_Flatten: 1"+"\n"+
	"%AI12_CMSettings: 00.MS"+"\n"+
	"%%EndComments"+"\n"+
	"%%BeginProlog"+"\n"+
	"%%EndProlog"+"\n"+
	"%%BeginSetup"+"\n"+
	"%%EndSetup"+"\n"+
	"%AI5_BeginLayer"+"\n"+
	"1 1 1 1 0 0 1 0 79 128 255 0 50 0 Lb"+"\n"+
	"(Layer1) Ln 0 A 0 Xw 1 Ap 0 O"+"\n"+
	"0 0 0 0.2 k"+"\n"+
	"0 1 0 0 0 Xy 0 J 0 j 1 w 4 M []0 d 0 XR \n";

var footer = "f LB"+"\n"+
	"%AI5_EndLayer--"+"\n"+
	"%%PageTrailer"+"\n"+
	"gsave annotatepage grestore showpage"+"\n"+
	"%%Trailer"+"\n"+
	"%%EOF";

var x = prompt ("width =", 50, "x");
var y = prompt ("height =", 50, "x");
x = x-0;
y = y-0;
x1 = (100+x)+"";
y1 = (100+y)+"";
var filerf = new File ("~/Desktop/test.ai");
var flag = filerf.open ("w","","");

filerf.write(header);
filerf.writeln("100 100 m");

filerf.writeln(x1 + " 100 L");
filerf.writeln(x1 + "  " + y1 + " L");
filerf.writeln(x1 + "  " + y1 + " L");
filerf.writeln("100 " + y1 + " L");
filerf.writeln("100 100 L");
filerf.write(footer);
filerf.close;

