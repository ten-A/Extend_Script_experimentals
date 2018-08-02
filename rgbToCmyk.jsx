//Convert color value for Illustrator

var colour = app.convertSampleColor(
	ImageColorSpace.RGB,
	[255,0,255],
	ImageColorSpace.CMYK, 
	ColorConvertPurpose.defaultpurpose);  
$.writeln(colour);
