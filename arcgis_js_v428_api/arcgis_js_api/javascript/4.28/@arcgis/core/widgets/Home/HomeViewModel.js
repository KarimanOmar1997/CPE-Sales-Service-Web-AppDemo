/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import o from"../../Viewpoint.js";import s from"../../core/Error.js";import i from"../../core/Evented.js";import{property as e}from"../../core/accessorSupport/decorators/property.js";import"../../chunks/ensureType.js";import"../../chunks/typedArrayUtil.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import{GoToMixin as n}from"../support/GoTo.js";import"../../Camera.js";import"../../core/Clonable.js";import"../../core/Accessor.js";import"../../core/Handles.js";import"../../chunks/Logger.js";import"../../config.js";import"../../core/lang.js";import"../../chunks/maybe.js";import"../../chunks/metadata.js";import"../../chunks/utils.js";import"../../chunks/handleUtils.js";import"../../chunks/ObjectPool.js";import"../../chunks/ObservableBase.js";import"../../chunks/tracking.js";import"../../core/scheduling.js";import"../../chunks/nextTick.js";import"../../chunks/PooledArray.js";import"../../core/promiseUtils.js";import"../../chunks/time.js";import"../../chunks/Cyclical.js";import"../../chunks/mathUtils.js";import"../../chunks/vec3.js";import"../../chunks/vec3f64.js";import"../../chunks/common.js";import"../../core/JSONSupport.js";import"../../core/accessorSupport/decorators/cast.js";import"../../chunks/reader.js";import"../../chunks/writer.js";import"../../geometry/Point.js";import"../../geometry/Geometry.js";import"../../geometry/SpatialReference.js";import"../../chunks/unitUtils.js";import"../../chunks/jsonMap.js";import"../../chunks/Ellipsoid.js";import"../../chunks/assets.js";import"../../request.js";import"../../kernel.js";import"../../core/urlUtils.js";import"../../geometry/support/webMercatorUtils.js";import"../../geometry.js";import"../../geometry/Extent.js";import"../../geometry/Multipoint.js";import"../../chunks/zmUtils.js";import"../../geometry/Polygon.js";import"../../chunks/Axis.js";import"../../chunks/extentUtils.js";import"../../chunks/aaBoundingRect.js";import"../../geometry/Polyline.js";import"../../chunks/typeUtils.js";import"../../geometry/support/jsonUtils.js";let p=class extends(n(i.EventedAccessor)){constructor(t){super(t),this._initialViewpoint=null,this._goingHomeController=null,this.go=this.go.bind(this)}destroy(){this._cancelGo(),this.view=null}get state(){return this.view?.ready?this._goingHomeController?"going-home":"ready":"disabled"}set view(t){this._initialViewpoint=null,this._set("view",t),t&&t.when().then((()=>{this.view===t&&(this._initialViewpoint=t.viewpoint.clone(),this.notifyChange("viewpoint"))}))}get viewpoint(){return this._get("viewpoint")||this._initialViewpoint}set viewpoint(t){this._set("viewpoint",t)}async go(){if(!this.view?.ready)throw new s("home:disabled-state","Cannot go when disabled.");this._cancelGo(),this.emit("go");const t=new AbortController;this._goingHomeController=t;try{await(this.view?.when()),await this.callGoTo({target:this.viewpoint,options:{signal:t.signal}})}catch(t){}this._goingHomeController=null}cancelGo(){this._cancelGo()}_cancelGo(){const{_goingHomeController:t}=this;t&&t.abort(),this._goingHomeController=null}};t([e()],p.prototype,"_goingHomeController",void 0),t([e({readOnly:!0})],p.prototype,"state",null),t([e()],p.prototype,"view",null),t([e({type:o})],p.prototype,"viewpoint",null),t([e()],p.prototype,"go",null),t([e()],p.prototype,"cancelGo",null),p=t([r("esri.widgets.Home.HomeViewModel")],p);const m=p;export{m as default};