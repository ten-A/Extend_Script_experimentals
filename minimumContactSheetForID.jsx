var dc = app.activeDocument;
var pg = dc.pages[0];
var fdr = Folder.selectDialog("Select Folder");
var fls = fdr.getFiles("*.jpg");
var x = 10, y = 16;
while (fls.length>0)
{
    var rct = pg.rectangles.add();
    rct.geometricBounds = [y, x, y + 44, x + 58];
    rct.place(fls[0]);
    rct.fit(FitOptions.PROPORTIONALLY);
    x = x + 66;
    if (x>142) 
    {
        x = 10, y = y + 56;
    }
    if (y>240) 
    {
        x = 10, y = 16;
        pg = dc.pages.add();
    }     
    fls.shift();
}
