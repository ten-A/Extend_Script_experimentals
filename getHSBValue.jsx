var tg = app.selection[0];
var val = rgbToHsv(tg.fillColor.red, tg.fillColor.green, tg.fillColor.blue);
var tx = app.activeDocument.textFrames.add();

tx.contents = "H:"+val[0] + "\nS:" + val[1] + "\nB:"+ val[2] + "\n";
tg.selected = false;
tx.selected = true;
app.cut();
tg.selected = true;


function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h *= 60;
  }
  return [ h, s, v ];
}
