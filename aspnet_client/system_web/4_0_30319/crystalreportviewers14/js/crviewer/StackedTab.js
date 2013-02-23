
/*
================================================================================
StackedTab
================================================================================
*/
bobj.crv.newStackedTab = function(kwArgs) {
    var UPDATE = MochiKit.Base.update;
   
    kwArgs = UPDATE({
        id: bobj.uniqueId(),
        label: '',
        width: 300,
        height: null,  // null height means grow as big as necessary
        openAdvCB: null,
        name : '',
        isDataFetching: false
    }, kwArgs);
    
    var o = newWidget(kwArgs.id);
    o.widgetType = 'StackedTab';
    bobj.fillIn(o, kwArgs);  
    
    o._content = null;
    
    if(o.openAdvCB) {
        o._advanceButton = newIconWidget( 
                o.id + '_advBtn',        
                bobj.crv.allInOne.uri,    
                o.openAdvCB, 
                null,   //text
                L_bobj_crv_paramsOpenAdvance.replace("%1", o.name),//tooltip,   
                5, 10, 5, bobj.crv.allInOne.openParameterArrowDy + 1);   //width, height, dx, dy, disDx, disDy, cancelEventPropagation
        o._advanceButton.setClasses("stackedTabButton", "", "", "iconcheckhover");
        o._advanceButton.margin = 0;
        o._advanceButton.outEnable = false;
    }
    
    o._initWidget = o.init;
    o._resizeWidget = o.resize;
    UPDATE(o, bobj.crv.StackedTab);
    
    return o;    
};

bobj.crv.StackedTab = {
    setTabDisabled : function(dis) {
        if (this._content)
            this._content.setTabDisabled (dis);

        if (this._advanceButton && this._advanceButton.layer)
            bobj.disableTabbingKey (this._advanceButton.layer, dis);

        if (this._textCtn)
            bobj.disableTabbingKey (this._textCtn, dis);
        
        if(this._dataFetchLayer)
            bobj.disableTabbingKey (this._dataFetchLayer, dis);
    },
    
    init : function() {
        var connect = MochiKit.Signal.connect;
        var signal = MochiKit.Signal.signal;
        var partial = MochiKit.Base.partial;
        
        this._initWidget ();

        if (this._content) {
            this._content.init ();
        }

        if (this._advanceButton) {
            this._advanceButton.init ();     
            this._advanceButton.css.width = "13px";
        }
        
        this._dataFetchLayer = getLayer(this.id + "_df");
        this._labelCtn = getLayer (this.id + '_labelCtn');
        this._textCtn = getLayer (this.id + '_textCtn');
        this._contentCtn = getLayer (this.id + '_contentCtn');

        if (this.openAdvCB) {
            connect (this._contentCtn, 'onclick', this.openAdvCB);
        }
        
        connect(this._content, 'ParameterUIResized',  partial (signal, this, "StackedTabResized"));
    },
        
    getHTML : function() {
        var h = bobj.html;
        var DIV = h.DIV;
        var IMG = h.IMG;
        
        var stackedTabAtt = {
            'class' : 'stackedTab',
            cellpadding : "0",
            id : this.id
        };
        
        var labelCtnAtt = {
            id: this.id + '_labelCtn',
            cellpadding : "0",
            'class': 'crvnoselect stackedTabTitle'
        };
                
        var contentHTML = this._content ? this._content.getHTML() : '';
        var advButtonHTML = this._advanceButton ? this._advanceButton.getHTML() : '';
        var dataFetchHTML = "";
        
        if (this.isDataFetching) {
            var URL_TAG = "url(%1);"
            dataFetchHTML = IMG ( {
                src : _skin + '../transp.gif',
                title : L_bobj_crv_ParamsDataTip,
                tabindex: 0,
                id: this.id + "_df",
                style : {
                    width : "16px",
                    height : "16px",
                    "background-image" : URL_TAG.replace("%1", bobj.crv.allInOne.uri),
                    "background-position" : "0px " + (-bobj.crv.allInOne.paramDataFetchingDy) + "px",
                    display : 'inline',
                    position : 'relative',
                    "margin-right" : '4px',
                    'float' : this._advanceButton ? 'left' : '',
                    'vertical-align' : 'middle'
                }
            });
        }

        var html = DIV (stackedTabAtt, DIV (labelCtnAtt, h.TABLE ( {
            cellpadding : "0",
            width : '100%'
        }, h.TD ({style : {"vertical-align" : "top"}}, DIV ( {
            'class' :'stackedTabText',
            id :this.id + '_textCtn',
            title :this.label,
            'tabIndex' :0,
            style : {
                'font-weight' : 'bold',
                'color' : '#4F5C72'
            }
        }, convStr (this.label))), h.TD ({align : "right"}, dataFetchHTML, advButtonHTML))
        ), DIV ( {
            id :this.id + '_contentCtn',
            style : { cursor : this._advanceButton ? _hand : 'default' },
            'class' :'stackedTabContentCtn'
        }, contentHTML));
            
        return html;
    },
    
    setDirty : function(isDirty) {
        if(this._textCtn) {
            this._textCtn.style.fontStyle = isDirty ? "italic" : "";
            this._textCtn.title = isDirty ? this.label + " " + L_bobj_crv_ParamsDirtyTip : this.label;
        }
        
        var classAttribute = "class";
        if(MochiKit.Base.isIE())
            classAttribute = "className";
        
        if(this._labelCtn) {
            var titleClassName = isDirty ? "stackedTabTitleDirty" : "stackedTabTitle";
            this._labelCtn.setAttribute(classAttribute, titleClassName);
        }
    },
    
    resize : function(w) {
        w = w - 4; // TODO exclude margins properly
        if(this._labelCtn) {
            // Exclude margins for safari as it miscalculates left/top margins
            var excludeMargins = !_saf; 
            bobj.setOuterSize(this._labelCtn, w  , null, excludeMargins);   
        }
        if (this._content) { 
            this._content.resize(w -2);
        }    
        bobj.setOuterSize(this.layer, w);
    },
    
    /**
     * Set the widget that is displayed below the tab. Must be called before getHTML.
     *
     * @param widget [Widget]  Widget that appears below the tab when the tab is expanded
     */
    setContent : function(widget) {
        this._content = widget;   
    },
    
    /**
     * Get the widget that is displayed below the tab.
     *
     * @return [Widget]  Widget that appears below the tab
     */
    getContent : function() {
        return this._content;   
    },
    
    /**
     * Focus the advanced button if available
     */
    focusAdvButton : function() {
    	if (this._advanceButton && this._advanceButton.focus) 
    		this._advanceButton.focus();
    }
    
};