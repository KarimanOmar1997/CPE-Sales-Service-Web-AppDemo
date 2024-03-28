/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as s}from"../../chunks/tslib.es6.js";import{JSONSupport as r}from"../../core/JSONSupport.js";import{F as e,E as t,V as o}from"../../chunks/unitUtils.js";import{property as i}from"../../core/accessorSupport/decorators/property.js";import"../../chunks/ensureType.js";import"../../chunks/typedArrayUtil.js";import{subclass as p}from"../../core/accessorSupport/decorators/subclass.js";import"../../core/Accessor.js";import"../../core/Handles.js";import"../../chunks/Logger.js";import"../../config.js";import"../../core/lang.js";import"../../chunks/maybe.js";import"../../chunks/metadata.js";import"../../chunks/utils.js";import"../../chunks/handleUtils.js";import"../../chunks/ObjectPool.js";import"../../chunks/ObservableBase.js";import"../../chunks/tracking.js";import"../../core/scheduling.js";import"../../chunks/nextTick.js";import"../../chunks/PooledArray.js";import"../../core/promiseUtils.js";import"../../core/Error.js";import"../../chunks/time.js";import"../../chunks/jsonMap.js";import"../../chunks/Ellipsoid.js";import"../../chunks/assets.js";import"../../request.js";import"../../kernel.js";import"../../core/urlUtils.js";let u=class extends r{constructor(){super(...arguments),this.value=null,this.displayValue=null,this.uncertainty=null}};s([i({type:Number,json:{read:!0,write:!0}})],u.prototype,"value",void 0),s([i({type:String,json:{read:!0,write:!0}})],u.prototype,"displayValue",void 0),s([i({type:Number,json:{read:!0,write:!0}})],u.prototype,"uncertainty",void 0),u=s([p("esri.rest.support.ImageMeasureResultValue")],u);let n=class extends u{constructor(){super(...arguments),this.unit=null}};s([i({type:String,json:{read:e.read,write:e.write}})],n.prototype,"unit",void 0),n=s([p("esri.rest.support.ImageMeasureResultLengthValue")],n);let a=class extends u{constructor(){super(...arguments),this.unit=null}};s([i({type:String,json:{read:t.read,write:t.write}})],a.prototype,"unit",void 0),a=s([p("esri.rest.support.ImageMeasureResultAreaValue")],a);let l=class extends u{constructor(){super(...arguments),this.unit=null}};s([i({type:String,json:{read:o.read,write:o.write}})],l.prototype,"unit",void 0),l=s([p("esri.rest.support.ImageMeasureResultAngleValue")],l);let c=class extends r{constructor(){super(...arguments),this.name=null,this.sensorName=null}};s([i({type:String,json:{read:!0,write:!0}})],c.prototype,"name",void 0),s([i({type:String,json:{read:!0,write:!0}})],c.prototype,"sensorName",void 0),c=s([p("esri.rest.support.BaseImageMeasureResult")],c);export{c as BaseImageMeasureResult,l as ImageMeasureResultAngleValue,a as ImageMeasureResultAreaValue,n as ImageMeasureResultLengthValue};