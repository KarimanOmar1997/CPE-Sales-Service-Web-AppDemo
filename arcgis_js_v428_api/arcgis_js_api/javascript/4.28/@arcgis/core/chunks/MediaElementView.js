/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as o}from"./tslib.es6.js";import r from"../core/Accessor.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"./ensureType.js";import"./typedArrayUtil.js";import{subclass as t}from"../core/accessorSupport/decorators/subclass.js";import s from"../geometry/Polygon.js";import{projectOrLoad as n}from"../geometry/projection.js";import{g as l}from"./aaBoundingRect.js";import{n as p}from"./normalizeUtilsSync.js";let i=class extends r{constructor(o){super(o)}get bounds(){const o=this.coords;return null==o?.extent?null:l(o.extent)}get coords(){const o=this.element.georeference?.coords;return n(o,this.spatialReference).geometry}get normalizedCoords(){return s.fromJSON(p(this.coords))}get normalizedBounds(){const o=null!=this.normalizedCoords?this.normalizedCoords.extent:null;return null!=o?l(o):null}};o([e()],i.prototype,"spatialReference",void 0),o([e()],i.prototype,"element",void 0),o([e()],i.prototype,"bounds",null),o([e()],i.prototype,"coords",null),o([e()],i.prototype,"normalizedCoords",null),o([e()],i.prototype,"normalizedBounds",null),i=o([t("esri.layers.support.MediaElementView")],i);export{i as M};