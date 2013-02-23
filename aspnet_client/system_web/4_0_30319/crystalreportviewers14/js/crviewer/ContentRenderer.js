/**
 * This JavaScript file/class aims at helping server-side html rendering
 * components to render elements in pixel-perfect way....
 * 
 * This JavaScript file must be independent of any third party libraries
 * (MochiKit, DHTMLLib) as it might be loaded in absence of them (HTML Export)
 * 
 */

if (typeof (bobj) == 'undefined') {
    bobj = {};
}

if (typeof (bobj.crv) == 'undefined') {
    bobj.crv = {};
}

if (typeof (bobj.crv.ContentRenderer) == 'undefined') {

    bobj.crv.ContentRenderer = {
            
        /**
         * @return true when browser is IE
         */
        isIE : function()
        {
            return document.all!=null;
        },
        
        /**
         * Returns DOM element maching ID supplied
         */
        getLayer : function(layerID) {
            return document.getElementById(layerID);
        },
        
        _cachedIsBoxModel : undefined, 
        
        isBoxModel : function() {
            if(this._isBoxModelCachedValue == undefined) {
                if(document.body) {
                    var box = document.createElement('div');
                    box.style.width = '10px';
                    box.style.padding = '1px';
                    box.style.position = 'absolute'; 
                    box.style.visibility = 'hidden'; 
                
                    document.body.appendChild(box);
                    this._cachedIsBoxModel =  (box.offsetWidth == 10);
                    document.body.removeChild(box);
                }
                else {
                    this._cachedIsBoxModel = this.isIE() && (document.compatMode != 'CSS1Compat');
                } 
            }
            
            return this._cachedIsBoxModel;
        },
                
        /**
         * adjust width and height of elements when browser is IE and it's in
         * quirks mode
         * 
         * @param elems
         *            [Hash of {id, {borderWidth, borderHeight}}]
         */
        adjustWidthAndHeight : function(ids) {
            if(!ids || !this.isIE() || !this.isBoxModel())
                return;

            for(var id in ids) {
                var e = ids[id];
                var hThickness = e.HBT; //Horizontal Border Thickness
                var vThickness = e.VBT; //Vertical Border Thickness

                var elems = document.getElementsByName(id);
                for(var i = 0, l = elems.length; i < l; i++) {
                	var elem = elems[i];
                	
                    var width = elem.style.width;
                    width = (width.length > 0) ? eval(width.substring(0, width.length - 2)) : 0;
                        
                    var height = elem.style.height;
                    height = (height.length > 0) ? eval(height.substring(0, height.length - 2)) : 0;
                     
                    elem.style.width = (width + hThickness) + "px";
                    elem.style.height = (height + vThickness) + "px";
                }                
            }
        }
    }
};
