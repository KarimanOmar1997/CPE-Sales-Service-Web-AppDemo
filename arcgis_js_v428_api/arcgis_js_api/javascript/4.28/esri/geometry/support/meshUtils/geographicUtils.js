// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/Logger"],function(b,e){b.isGeographicMesh=function(a,c){return a.isGeographic||a.isWebMercator&&(c?.geographic??!0)};b.validateGeographicFlag=function(a,c,d){const f=!a.isGeoreferenced;null!=d?.geographic&&d.geographic!==f&&e.getLogger(c).warnOnce(`Specifying the 'geographic' parameter (${d.geographic}) for a Mesh vertex space of type "${a.type}" is not supported. This parameter will be ignored.`)};Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})});