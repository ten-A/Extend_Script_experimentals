f = File.openDialog ("select PDF file...");
alert(pdfPageCount(f));


function pdfPageCount(fNm)
{
	if(fNm == null) return -1;
	var f = new File(fNm);
	f.encoding = "Binary";
	if(!f.open("r")) return -1;
	f.seek(0, 0);
	var str = f.read();
	f.close();
	if(!str) return -1;

    var ps = str.match(/<<\/Count\s\d+.+?>>/g);
    if(ps!=null)
    {
        for (var i=0;i<ps.length;i++)
        {
            if (ps[i].indexOf("/Type/Pages")>-1)
            {
                ps = ps[i].match(/<<\/Count\s(\d+)/);
                lim = parseInt(ps[1]);
                if(isNaN(lim)) return -1;
                return lim;
            }
        }
    }

	ps = str.match(/<<.+?\/Type\s\/Pages.+?>>/);
    if(ps!=null)
    {
        ps = ps[0].match(/\/Count\s(\d+)/);
        lim = parseInt(ps[1]);
        if(isNaN(lim)) return -1;
        return lim;
    }

	var ix, _ix, lim;
	ix = str.indexOf("/N ");
	_ix = str.indexOf("/T", ix);
	lim = parseInt(str.substring(ix+3, _ix));
	if(isNaN(lim)) return -1; 
	return lim;
}


