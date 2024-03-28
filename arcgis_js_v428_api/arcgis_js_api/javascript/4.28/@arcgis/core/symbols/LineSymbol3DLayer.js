/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as t}from"../chunks/tslib.es6.js";import{p as r}from"../chunks/screenUtils.js";import{property as s}from"../core/accessorSupport/decorators/property.js";import"../chunks/ensureType.js";import"../chunks/typedArrayUtil.js";import{e as o}from"../chunks/enumeration.js";import{subclass as e}from"../core/accessorSupport/decorators/subclass.js";import i from"./LineStyleMarker3D.js";import n from"./Symbol3DLayer.js";import p from"./patterns/LineStylePattern3D.js";import{s as m}from"../chunks/utils5.js";import{w as a}from"../chunks/colors.js";import{s as l}from"../chunks/materialUtils.js";import{S as c}from"../chunks/Symbol3DMaterial.js";import{a as u,l as j}from"../chunks/symbolLayerUtils3D.js";import"../chunks/Logger.js";import"../config.js";import"../core/lang.js";import"../chunks/utils.js";import"../chunks/handleUtils.js";import"../chunks/metadata.js";import"../core/Error.js";import"../chunks/jsonMap.js";import"../chunks/tracking.js";import"../Color.js";import"../chunks/colorUtils.js";import"../chunks/mathUtils.js";import"../chunks/vec3.js";import"../chunks/vec3f64.js";import"../chunks/common.js";import"../core/Clonable.js";import"../core/Accessor.js";import"../core/Handles.js";import"../chunks/maybe.js";import"../chunks/ObjectPool.js";import"../chunks/ObservableBase.js";import"../core/scheduling.js";import"../chunks/nextTick.js";import"../chunks/PooledArray.js";import"../core/promiseUtils.js";import"../chunks/time.js";import"../core/JSONSupport.js";import"../chunks/lineMarkers.js";import"../chunks/writer.js";import"./patterns/StylePattern3D.js";import"../chunks/opacityUtils.js";import"../chunks/aaBoundingBox.js";import"../geometry/Extent.js";import"../geometry/Geometry.js";import"../chunks/reader.js";import"../geometry/SpatialReference.js";import"../chunks/unitUtils.js";import"../chunks/Ellipsoid.js";import"../chunks/assets.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"../geometry/Point.js";import"../core/accessorSupport/decorators/cast.js";import"../geometry/support/webMercatorUtils.js";import"../chunks/aaBoundingRect.js";var h;let k=h=class extends n{constructor(t){super(t),this.material=null,this.type="line",this.join="miter",this.cap="butt",this.size=r(1),this.pattern=null,this.marker=null}clone(){const t={enabled:this.enabled,material:null!=this.material?this.material.clone():null,size:this.size,join:this.join,cap:this.cap,pattern:null!=this.pattern?this.pattern.clone():null,marker:null!=this.marker?this.marker.clone():null};return new h(t)}static fromSimpleLineSymbol(t){const s={enabled:!0,size:t.width??r(1),cap:t.cap||"butt",join:t.join||"miter",pattern:t.style&&"inside-frame"!==t.style?new p({style:t.style}):null,material:new c({color:(t.color||a).clone()}),marker:t.marker?new i({placement:t.marker.placement,style:t.marker.style,color:t.marker.color?.clone()??null}):null};return new h(s)}};t([s({type:c,json:{write:!0}})],k.prototype,"material",void 0),t([o({Line:"line"},{readOnly:!0})],k.prototype,"type",void 0),t([s({type:u,json:{write:!0,default:"miter"}})],k.prototype,"join",void 0),t([s({type:j,json:{write:!0,default:"butt"}})],k.prototype,"cap",void 0),t([s(l)],k.prototype,"size",void 0),t([s(m)],k.prototype,"pattern",void 0),t([s({types:{key:"type",base:i,typeMap:{style:i}},json:{write:!0}})],k.prototype,"marker",void 0),k=h=t([e("esri.symbols.LineSymbol3DLayer")],k);const y=k;export{y as default};