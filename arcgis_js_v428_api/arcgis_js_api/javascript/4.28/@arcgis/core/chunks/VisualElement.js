/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{watch as e}from"../core/reactiveUtils.js";class t{get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e}constructor(t){this._isDecoration=!1,this._attached=!1,this._resourcesCreated=!1,this._visible=!0,this.view=t.view,this._handle=e((()=>t.view.ready),(e=>{this._resourcesCreated&&(e?this._createResources():this._destroyResources())}))}applyProperties(e){let t=!1;for(const s in e)s in this?"attached"===s?t=e[s]:this[s]=e[s]:console.error("Cannot set unknown property",s);this.attached=t}destroy(){this.attached=!1,this._handle.remove()}get attached(){return this._attached}set attached(e){e!==this._attached&&this.view._stage&&(this._attached=e,this._attached&&!this._resourcesCreated?this._createResources():!this._attached&&this._resourcesCreated&&this._destroyResources(),this.onAttachedChange(e))}onAttachedChange(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.attached&&this.updateVisibility(e))}_createResources(){this.createResources(),this._resourcesCreated=!0,this.updateVisibility(this.visible)}_destroyResources(){this.destroyResources(),this._resourcesCreated=!1}}export{t as V};