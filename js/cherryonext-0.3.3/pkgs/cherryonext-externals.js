/*
 *  Copyright (c) 2007 - 2011, CherryOnExt Team
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the CherryOnExt Team nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL CherryOnExt Team BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Ext.namespace("Ext.ux.layout");Ext.ux.layout.RowFitLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,trackChildEvents:["collapse","expand","hide","show"],renderAll:function(a,b){Ext.ux.layout.RowFitLayout.superclass.renderAll.apply(this,arguments);a.on("add",this.containerListener);a.on("remove",this.containerListener)},renderItem:function(f,a,d){Ext.ux.layout.RowFitLayout.superclass.renderItem.apply(this,arguments);for(var b=0,e=this.trackChildEvents.length;b<e;b++){f.on(this.trackChildEvents[b],this.itemListener)}f.animCollapse=false;f.rowFit={hasAbsHeight:false,relHeight:0,calcRelHeight:0,calcAbsHeight:0};if(f.height){if(typeof f.height=="string"&&f.height.indexOf("%")){f.rowFit.relHeight=parseInt(f.height)}else{f.setHeight(f.height);f.rowFit.hasAbsHeight=true}}},onLayout:function(g,h){Ext.ux.layout.RowFitLayout.superclass.onLayout.call(this,g,h);if(this.container.collapsed||!g.items||!g.items.length){return}var b=0,m=0,k=1,j=[],o=0;for(var e=0,a=g.items.length;e<a;e++){var l=g.items.itemAt(e);if(!l.isVisible()){continue}if(l.collapsed){b+=l.getFrameHeight()}else{if(l.rowFit.hasAbsHeight){b+=l.height}else{if(!l.rowFit.relHeight){o++}else{m+=l.rowFit.relHeight}j.push(l)}}}if(o==0&&m!=100){k=100/m}var q=h.getStyleSize().height-b,d=q;while(j.length){var l=j.shift(),f=l.rowFit.relHeight*k,p=0;if(!f){f=(100-m)/o}if(!j.length){p=d}else{p=Math.round(q*f/100)}if(p<0){p=0}l.rowFit.calcAbsHeight=p;l.rowFit.calcRelHeight=f;l.setHeight(p);d-=p}},itemListener:function(a){a.ownerCt.doLayout()},containerListener:function(a){a.doLayout()}});if(Ext.SplitBar.BasicLayoutAdapter){Ext.ux.layout.RowFitLayout.SplitAdapter=function(c){if(c&&c.el.dom.nextSibling){var b=Ext.getCmp(c.el.dom.nextSibling.id),a=Ext.getCmp(c.resizingEl.id);if(b){c.maxSize=(a.height||a.rowFit.calcAbsHeight)+b.getInnerHeight()-1}c.minSize=a.getFrameHeight()+1}};Ext.extend(Ext.ux.layout.RowFitLayout.SplitAdapter,Ext.SplitBar.BasicLayoutAdapter,{setElementSize:function(f,g,b){var e=Ext.getCmp(f.resizingEl.id);if(!e||e.collapsed||!e.isVisible()){return}if(e.rowFit.hasAbsHeight){e.setHeight(g)}else{if(f.el.dom.nextSibling){var d=Ext.getCmp(f.el.dom.nextSibling.id),k=g-e.rowFit.calcAbsHeight,c=d.rowFit,j=e.rowFit,h=j.calcRelHeight/j.calcAbsHeight,i=h*k;j.relHeight=j.calcRelHeight+i;if(c.hasAbsHeight){var a=d.height-k;d.height=a;d.setHeight(a)}else{c.relHeight=c.calcRelHeight-i}}}e.ownerCt.doLayout()}})}Ext.Container.LAYOUTS["row-fit"]=Ext.ux.layout.RowFitLayout;Ext.apply(Ext.DataView.prototype,{deselect:function(b,a){if(this.isSelected(b)){var b=this.getNode(b);this.selected.removeElement(b);if(this.last==b.viewIndex){this.last=false}Ext.fly(b).removeClass(this.selectedClass);if(!a){this.fireEvent("selectionchange",this,this.selected.elements)}}}});Ext.namespace("Ext.ux.Andrie");Ext.ux.Andrie.Select=function(a){if(a.transform&&typeof a.multiSelect=="undefined"){var b=Ext.getDom(a.transform);a.multiSelect=(Ext.isIE?b.getAttributeNode("multiple").specified:b.hasAttribute("multiple"))}a.hideTrigger2=a.hideTrigger2||a.hideTrigger;Ext.ux.Andrie.Select.superclass.constructor.call(this,a)};Ext.extend(Ext.ux.Andrie.Select,Ext.form.ComboBox,{multiSelect:false,minLength:0,minLengthText:"Minimum {0} items required",maxLength:Number.MAX_VALUE,maxLengthText:"Maximum {0} items allowed",clearTrigger:true,history:false,historyMaxLength:0,separator:",",displaySeparator:",",valueArray:[],rawValueArray:[],initComponent:function(){this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger2Class}]};Ext.ux.Andrie.Select.superclass.initComponent.call(this);if(this.multiSelect){this.typeAhead=false;this.editable=false;this.triggerAction="all";this.selectOnFocus=false}if(this.history){this.forceSelection=false}if(this.value){this.setValue(this.value)}},hideTrigger1:true,getTrigger:Ext.form.TwinTriggerField.prototype.getTrigger,initTrigger:Ext.form.TwinTriggerField.prototype.initTrigger,trigger1Class:"x-form-clear-trigger",trigger2Class:"x-form-arrow-trigger",onTrigger2Click:function(){this.onTriggerClick()},onTrigger1Click:function(){this.clearValue()},initList:function(){if(!this.list){var a="x-combo-list";this.list=new Ext.Layer({shadow:this.shadow,cls:[a,this.listClass].join(" "),constrain:false});var b=this.listWidth||Math.max(this.wrap.getWidth(),this.minListWidth);this.list.setWidth(b);this.list.swallowEvent("mousewheel");this.assetHeight=0;if(this.title){this.header=this.list.createChild({cls:a+"-hd",html:this.title});this.assetHeight+=this.header.getHeight()}this.innerList=this.list.createChild({cls:a+"-inner"});this.innerList.on("mouseover",this.onViewOver,this);this.innerList.on("mousemove",this.onViewMove,this);this.innerList.setWidth(b-this.list.getFrameWidth("lr"));if(this.pageSize){this.footer=this.list.createChild({cls:a+"-ft"});this.pageTb=new Ext.PagingToolbar({store:this.store,pageSize:this.pageSize,renderTo:this.footer});this.assetHeight+=this.footer.getHeight()}if(!this.tpl){this.tpl='<tpl for="."><div class="'+a+'-item">{'+this.displayField+"}</div></tpl>"}this.view=new Ext.DataView({applyTo:this.innerList,tpl:this.tpl,singleSelect:true,multiSelect:this.multiSelect,simpleSelect:true,overClass:a+"-cursor",selectedClass:this.selectedClass,itemSelector:this.itemSelector||"."+a+"-item"});this.view.on("click",this.onViewClick,this);this.view.on("beforeClick",this.onViewBeforeClick,this);this.bindStore(this.store,true);if(this.valueArray.length){this.selectByValue(this.valueArray)}if(this.resizable){this.resizer=new Ext.Resizable(this.list,{pinned:true,handles:"se"});this.resizer.on("resize",function(e,c,d){this.maxHeight=d-this.handleHeight-this.list.getFrameWidth("tb")-this.assetHeight;this.listWidth=c;this.innerList.setWidth(c-this.list.getFrameWidth("lr"));this.restrictHeight()},this);this[this.pageSize?"footer":"innerList"].setStyle("margin-bottom",this.handleHeight+"px")}}},initEvents:function(){Ext.form.ComboBox.superclass.initEvents.call(this);this.keyNav=new Ext.KeyNav(this.el,{up:function(a){this.inKeyMode=true;this.hoverPrev()},down:function(a){if(!this.isExpanded()){this.onTriggerClick()}else{this.inKeyMode=true;this.hoverNext()}},enter:function(b){if(this.isExpanded()){this.inKeyMode=true;var a=this.view.indexOf(this.view.lastItem);this.onViewBeforeClick(this.view,a,this.view.getNode(a),b);this.onViewClick(this.view,a,this.view.getNode(a),b)}else{this.onSingleBlur()}return true},esc:function(a){this.collapse()},tab:function(a){this.collapse();return true},home:function(a){this.hoverFirst();return false},end:function(a){this.hoverLast();return false},scope:this,doRelay:function(c,b,a){if(a=="down"||this.scope.isExpanded()){return Ext.KeyNav.prototype.doRelay.apply(this,arguments)}if(a=="enter"||this.scope.isExpanded()){return Ext.KeyNav.prototype.doRelay.apply(this,arguments)}return true},forceKeyDown:true});this.queryDelay=Math.max(this.queryDelay||10,this.mode=="local"?10:250);this.dqTask=new Ext.util.DelayedTask(this.initQuery,this);if(this.typeAhead){this.taTask=new Ext.util.DelayedTask(this.onTypeAhead,this)}if(this.editable!==false){this.el.on("keyup",this.onKeyUp,this)}if(!this.multiSelect){if(this.forceSelection){this.on("blur",this.doForce,this)}this.on("focus",this.onSingleFocus,this);this.on("blur",this.onSingleBlur,this)}this.on("change",this.onChange,this)},doForce:function(){if(this.el.dom.value.length>0){if(this.el.dom.value==this.emptyText){this.clearValue()}else{if(!this.multiSelect){this.el.dom.value=this.lastSelectionText===undefined?"":this.lastSelectionText;this.applyEmptyText()}}}},onLoad:function(){if(!this.hasFocus){return}if(this.store.getCount()>0){this.expand();this.restrictHeight();if(this.lastQuery==this.allQuery){if(this.editable){this.el.dom.select()}this.selectByValue(this.value,true)}else{this.selectNext();if(this.typeAhead&&this.lastKey!=Ext.EventObject.BACKSPACE&&this.lastKey!=Ext.EventObject.DELETE){this.taTask.delay(this.typeAheadDelay)}}}else{this.collapse()}},onSelect:function(a,b){if(this.fireEvent("beforeselect",this,a,b)!==false){this.addValue(a.data[this.valueField||this.displayField]);this.fireEvent("select",this,a,b);if(!this.multiSelect){this.collapse()}}},onSingleFocus:function(){this.oldValue=this.getRawValue()},onSingleBlur:function(){var a=this.findRecord(this.displayField,this.getRawValue());if(a){this.select(this.store.indexOf(a))}if(String(this.oldValue)!=String(this.getRawValue())){this.setValue(this.getRawValue());this.fireEvent("change",this,this.oldValue,this.getRawValue())}this.oldValue=String(this.getRawValue())},onChange:function(){if(!this.clearTrigger){return}if(this.getValue()!=""){this.triggers[0].show()}else{this.triggers[0].hide()}},collapse:function(){this.hoverOut();Ext.ux.Andrie.Select.superclass.collapse.call(this)},expand:function(){Ext.ux.Andrie.Select.superclass.expand.call(this)},onViewOver:function(b,a){if(this.inKeyMode){return}},onViewBeforeClick:function(c,a,b,d){this.preClickSelections=this.view.getSelectedIndexes()},onViewClick:function(f,b,d,g){if(typeof b!="undefined"){var a=this.preClickSelections.indexOf(b);if(a!=-1&&this.multiSelect){this.removeValue(this.store.getAt(b).data[this.valueField||this.displayField]);if(this.inKeyMode){this.view.deselect(b,true)}this.hover(b,true)}else{var c=this.store.getAt(b);if(c){if(this.inKeyMode){this.view.select(b,true)}this.onSelect(c,b);this.hover(b,true)}}}if(f!==false){this.el.focus()}},addValue:function(b){if(!this.multiSelect){this.setValue(b);return}if(b instanceof Array){b=b[0]}b=String(b);if(this.valueArray.indexOf(b)==-1){var e=b;var c=this.findRecord(this.valueField||displayField,b);if(c){e=c.data[this.displayField];if(this.view){this.select(this.store.indexOf(c))}}else{if(this.forceSelection){return}}var a=Ext.apply([],this.valueArray);a.push(b);var d=Ext.apply([],this.rawValueArray);d.push(e);b=a.join(this.separator||",");e=d.join(this.displaySeparator||this.separator||",");this.commonChangeValue(b,e,a,d)}},removeValue:function(b){if(b instanceof Array){b=b[0]}b=String(b);if(this.valueArray.indexOf(b)!=-1){var e=b;var c=this.findRecord(this.valueField||displayField,b);if(c){e=c.data[this.displayField];if(this.view){this.deselect(this.store.indexOf(c))}}else{if(this.forceSelection){return}}var a=Ext.apply([],this.valueArray);a.remove(b);var d=Ext.apply([],this.rawValueArray);d.remove(e);b=a.join(this.separator||",");e=d.join(this.displaySeparator||this.separator||",");this.commonChangeValue(b,e,a,d)}},setValue:function(c){var b=[],h=[];if(c!==null){if(!(c instanceof Array)){if(this.separator&&this.separator!==true){c=c.split(String(this.separator))}else{c=[c]}}else{if(!this.multiSelect){c=c.slice(0,1)}}for(var d=0,a=c.length;d<a;d++){var f=c[d];var g=null;if(this.valueField){var e=this.findRecord(this.valueField||this.displayField,f);if(e){g=e.data[this.displayField]}else{if(this.forceSelection){continue}else{var e=this.findRecord(this.displayField,f);g=f;if(e){f=e.data[this.valueField]}}}}b.push(f);h.push(g)}}c=b.join(this.separator||",");g=h.join(this.displaySeparator||this.separator||",");this.commonChangeValue(c,g,b,h);if(this.history&&!this.multiSelect&&this.mode=="local"){this.addHistory(this.valueField?this.getValue():this.getRawValue())}if(this.view){this.view.clearSelections();this.selectByValue(this.valueArray)}},commonChangeValue:function(b,d,a,c){this.lastSelectionText=d;this.valueArray=a;this.rawValueArray=c;if(this.hiddenField){this.hiddenField.value=b}Ext.form.ComboBox.superclass.setValue.call(this,d);this.value=b;if(this.oldValueArray!=this.valueArray){this.fireEvent("change",this,this.oldValueArray,this.valueArray)}this.oldValueArray=Ext.apply([],this.valueArray)},validateValue:function(a){if(!Ext.ux.Andrie.Select.superclass.validateValue.call(this,a)){return false}if(this.valueArray.length<this.minLength){this.markInvalid(String.format(this.minLengthText,this.minLength));return false}if(this.valueArray.length>this.maxLength){this.markInvalid(String.format(this.maxLengthText,this.maxLength));return false}return true},clearValue:function(){this.commonChangeValue("","",[],[]);if(this.view){this.view.clearSelections()}Ext.ux.Andrie.Select.superclass.clearValue.call(this)},reset:function(){if(this.view){this.view.clearSelections()}Ext.ux.Andrie.Select.superclass.reset.call(this)},getValue:function(a){if(a){return typeof this.valueArray!="undefined"?this.valueArray:[]}return Ext.ux.Andrie.Select.superclass.getValue.call(this)},getRawValue:function(a){if(a){return typeof this.rawValueArray!="undefined"?this.rawValueArray:[]}return Ext.ux.Andrie.Select.superclass.getRawValue.call(this)},select:function(a,c){this.selectedIndex=a;if(!this.view){return}this.view.select(a,this.multiSelect);if(c!==false){var b=this.view.getNode(a);if(b){this.innerList.scrollChildIntoView(b,false)}}},deselect:function(a,c){this.selectedIndex=a;this.view.deselect(a,this.multiSelect);if(c!==false){var b=this.view.getNode(a);if(b){this.innerList.scrollChildIntoView(b,false)}}},selectByValue:function(c,g){this.hoverOut();if(c!==undefined&&c!==null){if(!(c instanceof Array)){c=[c]}var b=[];for(var d=0,a=c.length;d<a;d++){var f=c[d];var e=this.findRecord(this.valueField||this.displayField,f);if(e){this.select(this.store.indexOf(e),g);b.push(f)}}return b.join(",")}return false},selectFirst:function(){var a=this.store.getCount();if(a>0){this.select(0)}},selectLast:function(){var a=this.store.getCount();if(a>0){this.select(a)}},hover:function(a,d){if(!this.view){return}this.hoverOut();var c=this.view.getNode(a);this.view.lastItem=c;Ext.fly(c).addClass(this.view.overClass);if(d!==false){var b=this.view.getNode(a);if(b){this.innerList.scrollChildIntoView(b,false)}}},hoverOut:function(){if(!this.view){return}if(this.view.lastItem){Ext.fly(this.view.lastItem).removeClass(this.view.overClass);delete this.view.lastItem}},hoverNext:function(){if(!this.view){return}var b=this.store.getCount();if(b>0){if(!this.view.lastItem){this.hover(0)}else{var a=this.view.indexOf(this.view.lastItem);if(a<b-1){this.hover(a+1)}}}},hoverPrev:function(){if(!this.view){return}var b=this.store.getCount();if(b>0){if(!this.view.lastItem){this.hover(0)}else{var a=this.view.indexOf(this.view.lastItem);if(a!=0){this.hover(a-1)}}}},hoverFirst:function(){var a=this.store.getCount();if(a>0){this.hover(0)}},hoverLast:function(){var a=this.store.getCount();if(a>0){this.hover(a)}},addHistory:function(b){if(!b.length){return}var a=this.findRecord(this.valueField||this.displayField,b);if(a){this.store.remove(a)}else{var c={};if(this.valueField){c[this.valueField]=b}c[this.displayField]=b;a=new this.store.reader.recordType(c)}this.store.clearFilter();this.store.insert(0,a);this.pruneHistory()},pruneHistory:function(){if(this.historyMaxLength==0){return}if(this.store.getCount()>this.historyMaxLength){var c=this.store.getRange(this.historyMaxLength,this.store.getCount());for(var b=0,a=c.length;b<a;b++){this.store.remove(c[b])}}}});Ext.reg("select",Ext.ux.Andrie.Select);Ext.ns("Ext.ux.form");Ext.ux.form.DateTime=Ext.extend(Ext.form.Field,{defaultAutoCreate:{tag:"input",type:"hidden"},timeWidth:100,dtSeparator:" ",hiddenFormat:"Y-m-d H:i:s",otherToNow:true,timePosition:"right",dateFormat:"m/d/y",timeFormat:"g:i A",initComponent:function(){Ext.ux.form.DateTime.superclass.initComponent.call(this);this.validationTask=new Ext.util.DelayedTask(this.validate,this);var b=Ext.apply({},{id:this.id+"-date",format:this.dateFormat||Ext.form.DateField.prototype.format,width:this.timeWidth,selectOnFocus:this.selectOnFocus,validationEvent:false,listeners:{blur:{scope:this,fn:this.onBlur},focus:{scope:this,fn:this.onFocus}}},this.dateConfig);this.df=new Ext.form.DateField(b);delete (this.dateFormat);var a=Ext.apply({},{id:this.id+"-time",format:this.timeFormat||Ext.form.TimeField.prototype.format,width:this.timeWidth,selectOnFocus:this.selectOnFocus,validationEvent:false,listeners:{blur:{scope:this,fn:this.onBlur},focus:{scope:this,fn:this.onFocus}}},this.timeConfig);this.tf=new Ext.form.TimeField(a);delete (this.timeFormat);this.relayEvents(this.df,["focus","specialkey","invalid","valid"]);this.relayEvents(this.tf,["focus","specialkey","invalid","valid"])},filterValidation:function(a){if(!a.isNavKeyPress()){this.validationTask.delay(this.validationDelay)}},destroy:function(){if(this.df.rendered){this.df.destroy()}if(this.tf.rendered){this.tf.destroy()}Ext.ux.form.DateTime.superclass.destroy.call(this)},onRender:function(c,a){if(this.isRendered){return}Ext.ux.form.DateTime.superclass.onRender.call(this,c,a);var b;if("bellow"===this.timePosition){b=Ext.DomHelper.append(c,{tag:"table",style:"border-collapse:collapse",children:[{tag:"tr",children:[{tag:"td",style:"padding-bottom:1px",cls:"ux-datetime-date"}]},{tag:"tr",children:[{tag:"td",cls:"ux-datetime-time"}]}]},true)}else{b=Ext.DomHelper.append(c,{tag:"table",style:"border-collapse:collapse",children:[{tag:"tr",children:[{tag:"td",style:"padding-right:4px",cls:"ux-datetime-date"},{tag:"td",cls:"ux-datetime-time"}]}]},true)}this.tableEl=b;this.wrap=b.wrap({cls:"x-form-field-wrap"});this.wrap.on("mousedown",this.onMouseDown,this,{delay:10});this.df.render(b.child("td.ux-datetime-date"));this.tf.render(b.child("td.ux-datetime-time"));this.df.getEl().on("keyup",this.filterValidation,this);this.tf.getEl().on("keyup",this.filterValidation,this);if(Ext.isIE&&Ext.isStrict){b.select("input").applyStyles({top:0})}this.on("specialkey",this.onSpecialKey,this);this.df.el.swallowEvent(["keydown","keypress"]);this.tf.el.swallowEvent(["keydown","keypress"]);if("side"===this.msgTarget){var d=this.el.findParent(".x-form-element",10,true);this.errorIcon=d.createChild({cls:"x-form-invalid-icon"});this.df.errorIcon=this.errorIcon;this.tf.errorIcon=this.errorIcon}this.isRendered=true;this.validate()},adjustSize:Ext.BoxComponent.prototype.adjustSize,alignErrorIcon:function(){this.errorIcon.alignTo(this.tableEl,"tl-tr",[2,0])},initDateValue:function(){this.dateValue=this.otherToNow?new Date():new Date(1970,0,1,0,0,0)},initTimeValue:function(){this.timeValue=this.otherToNow?new Date():new Date(1970,0,1,0,0,0)},disable:function(){if(this.isRendered){this.df.disabled=this.disabled;this.df.onDisable();this.tf.onDisable()}this.disabled=true;this.df.disabled=true;this.tf.disabled=true;this.fireEvent("disable",this);return this},enable:function(){if(this.rendered){this.df.onEnable();this.tf.onEnable()}this.disabled=false;this.df.disabled=false;this.tf.disabled=false;this.fireEvent("enable",this);return this},focus:function(){this.df.focus()},getPositionEl:function(){return this.wrap},getResizeEl:function(){return this.wrap},getValue:function(){return(this.getDateTime())},isValid:function(){return this.df.isValid()&&this.tf.isValid()},isVisible:function(){return this.df.rendered&&this.df.getActionEl().isVisible()},onBlur:function(a){if(this.wrapClick){a.focus();this.wrapClick=false}if(a===this.df){this.updateDate()}else{this.updateTime()}this.updateHidden();(function(){if(!this.df.hasFocus&&!this.tf.hasFocus){var b=this.getValue();if(String(b)!==String(this.startValue)){this.fireEvent("change",this,b,this.startValue)}this.hasFocus=false;this.fireEvent("blur",this)}}).defer(100,this)},onFocus:function(){if(!this.hasFocus){this.hasFocus=true;this.startValue=this.getValue();this.fireEvent("focus",this)}},onMouseDown:function(a){this.wrapClick="td"===a.target.nodeName.toLowerCase()},onSpecialKey:function(b,c){var a=c.getKey();if(a==c.TAB){if(b===this.df&&!c.shiftKey){c.stopEvent();this.tf.focus()}if(b===this.tf&&c.shiftKey){c.stopEvent();this.df.focus()}}if(a==c.ENTER){this.updateValue()}},setDate:function(a){this.df.setValue(a)},setTime:function(a){this.tf.setValue(a)},setSize:function(a,b){if(!a){return}if("bellow"==this.timePosition){this.df.setSize(a,b);this.tf.setSize(a,b);if(Ext.isIE){this.df.el.up("td").setWidth(a);this.tf.el.up("td").setWidth(a)}}else{this.df.setSize(a-this.timeWidth-4,b);this.tf.setSize(this.timeWidth,b);if(Ext.isIE){this.df.el.up("td").setWidth(a-this.timeWidth-4);this.tf.el.up("td").setWidth(this.timeWidth)}}},setValue:function(c){if(!c&&true===this.emptyToNow){this.setValue(new Date());return}else{if(!c){this.setDate("");this.setTime("");this.updateValue();if(this.rendered){this.validate()}return}}c=c?c:new Date(1970,0,1,0,0,0);var a,b;if(c instanceof Date){this.setDate(c);this.setTime(c);this.dateValue=new Date(c);this.timeValue=new Date(c)}else{a=c.split(this.dtSeparator);this.setDate(a[0]);if(a[1]){this.setTime(a[1])}}this.updateValue();if(this.rendered){this.validate()}},setVisible:function(a){if(a){this.df.show();this.tf.show()}else{this.df.hide();this.tf.hide()}return this},show:function(){return this.setVisible(true)},hide:function(){return this.setVisible(false)},updateDate:function(){var a=this.df.getValue();if(a){if(!(this.dateValue instanceof Date)){this.initDateValue()}this.dateValue.setMonth(0);this.dateValue.setFullYear(a.getFullYear());this.dateValue.setMonth(a.getMonth());this.dateValue.setDate(a.getDate())}else{this.dateValue=""}},updateTime:function(){var a=this.tf.getValue();if(a){if(!(a instanceof Date)){a=Date.parseDate(a,this.tf.format)}if(!(this.timeValue instanceof Date)){this.initTimeValue()}this.timeValue.setHours(a.getHours());this.timeValue.setMinutes(a.getMinutes());this.timeValue.setSeconds(a.getSeconds())}else{this.timeValue=""}},getDateTime:function(){if(this.dateValue instanceof Date&&this.timeValue instanceof Date){var a=new Date();a.setHours(this.timeValue.getHours());a.setMinutes(this.timeValue.getMinutes());a.setSeconds(this.timeValue.getSeconds());a.setMonth(0);a.setFullYear(this.dateValue.getFullYear());a.setMonth(this.dateValue.getMonth());a.setDate(this.dateValue.getDate());return(a)}else{if(this.dateValue instanceof Date){return(new Date(this.dateValue))}}return("")},updateHidden:function(){if(this.isRendered){var b="";var a=this.getDateTime();if(a instanceof Date){b=a.format(this.hiddenFormat)}this.el.dom.value=b}},updateValue:function(){this.updateDate();this.updateTime();this.updateHidden();return},validate:function(){var b=this.tf.validate();var a=this.df.validate();if(a){this.df.clearInvalid()}if(b){this.tf.clearInvalid()}if(a&&b){this.updateValue();return(this.validateValue(this.getValue()))}return(false)},markInvalid:function(a){this.df.markInvalid(a);this.tf.markInvalid(a)},clearInvalid:function(){this.df.clearInvalid();this.tf.clearInvalid()},renderer:function(c){var b=c.editor.dateFormat||Ext.ux.form.DateTime.prototype.dateFormat;b+=" "+(c.editor.timeFormat||Ext.ux.form.DateTime.prototype.timeFormat);var a=function(e){var d=Ext.util.Format.date(e,b);return d};return a}});Ext.reg("xdatetime",Ext.ux.form.DateTime);