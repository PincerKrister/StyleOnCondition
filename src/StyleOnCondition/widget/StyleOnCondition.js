/*global logger*/
/*
    StyleOnCondition
    ========================

    @file      : StyleOnCondition.js
    @version   : 0.14
    @author    : Prince YJ
    @date      : Fri, 08 Jul 2016 18:52:48 GMT
    @copyright : Mphasis Corp
    @license   : Apache 2 

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/NodeList-traverse",
], function (declare, _WidgetBase, dom, dojoStyle, dojoArray, lang, NodeList) {
    "use strict";

    // Declare widget's prototype.
    return declare("StyleOnCondition.widget.StyleOnCondition", [ _WidgetBase], {
       
        // Parameters configured in the Modeler.
		MicroflowName: "",
        ReturnValue: "",
        customstyleattribute: "",
        customstylevalue: "",
        Level: "",
        applyforquery: "",
        querystring: "",
        appendclass: "",
        classstring: "",
        UpdateOnce: "",
        temp: "false",

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            // Uncomment the following line to enable debug messages
            logger.level(logger.DEBUG);
            logger.debug(this.id + ".constructor");
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            logger.debug(this.id + ".postCreate");	
        },

		setParentStyle: function(display) {
			console.log(display);
            var tmpattr = this.customstyleattribute;
            var tmpval = this.customstylevalue;
            var enume = this.Level;
			if (display == this.ReturnValue && this.applyforquery==false) 
                {
                if(this.Level=="One")
                {
                    dojoStyle.set(this.domNode.parentNode,tmpattr,tmpval);
			    }
                if (this.Level == "Two")
                {
                    dojoStyle.set(this.domNode.parentNode.parentNode,tmpattr,tmpval);
                }
                if (this.Level == "Three")
                {
                    dojoStyle.set(this.domNode.parentNode.parentNode.parentNode,tmpattr,tmpval);
                }
                if (this.Level == "Four")
                {
                    dojoStyle.set(this.domNode.parentNode.parentNode.parentNode.parentNode,tmpattr,tmpval);
                }
                if (this.Level == "Five")
                {
                    dojoStyle.set(this.domNode.parentNode.parentNode.parentNode.parentNode.parentNode,tmpattr,tmpval);
                }
                }
            if (display == this.ReturnValue && this.applyforquery==true) 
                {
                    if(this.appendclass == false)
                        {
                            dojo.query(this.querystring).style(tmpattr,tmpval);
                        }
                    if(this.appendclass == true)
                        {
                            dojo.query(this.querystring).addClass(this.classstring);
                        }
			    
                }
            
            
		},

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            if(this.temp="false")
                {
                 logger.debug(this.id + ".update");
			     this._contextObj = obj;
			     this._resetSubscriptions();
			     this._updateRendering();
                 callback(); 
                 if(!this.UpdateOnce)
                 {
                     this.temp = "true";
                 }
                }
			
        },
		
		// Rerender the interface.
        _updateRendering: function () {
			if (this.MicroflowName != '') {
				mx.data.action({
					params: {
						applyto: "selection",
						actionname: this.MicroflowName,
						guids: [this._contextObj.getGuid()]
					},
					callback: dojo.hitch(this, function (result) {
						this.setParentStyle(result);
					}),
					error: function(error) {
						alert(error.description);
					}
				}, this);
			}
        },
        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null;
            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }
            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {
                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });
                this._handles = [_objectHandle];
            }
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
          logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
    });
});

require(["StyleOnCondition/widget/StyleOnCondition"], function() {
    "use strict";
});
