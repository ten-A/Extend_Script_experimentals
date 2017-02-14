//active Document
var currDoc = File.openDialog ();

//clean up history ...
voidHistory(currDoc);


function voidHistory(fileObject){
	if(loadXMPLibrary()) {
		var myFile = fileObject;
		xmpFile = new XMPFile(myFile.fsName, XMPConst.NS_XMP_MM, XMPConst.OPEN_FOR_UPDATE);
		var myXmp = xmpFile.getXMP();
		var count = myXmp.countArrayItems(XMPConst.NS_XMP_MM, "History") +1;
		//part of delete every arrayitem of history
		while(count--) {
			if(count == 0) break;
			myXmp.deleteArrayItem(XMPConst.NS_XMP_MM, "History", count);
			}
		myXmp.serializeToArray();
		//Store new metadata to file
		if (xmpFile.canPutXMP(myXmp)) {
			xmpFile.putXMP(myXmp);  
			}
		xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
		unloadXMPLibrary();   
		}
	}
 
function loadXMPLibrary(){
	if (!ExternalObject.AdobeXMPScript ){
		try{ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');}
		catch (e){alert('Unable to load the AdobeXMPScript library!'); return false;}
        }
	return true;
    }
 
function unloadXMPLibrary(){
	if( ExternalObject.AdobeXMPScript ){
		try{ExternalObject.AdobeXMPScript.unload(); ExternalObject.AdobeXMPScript = undefined;}
		catch (e){alert('Unable to unload the AdobeXMPScript library!');}
		}
	}
