// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../../request","../utils","./support/TraceResult"],function(h,k,e,l){h.submitTraceJob=async function(c,a,f){c=e.parseUrl(c);const d=a.toJSON();d.traceLocations=JSON.stringify(a.traceLocations);a.resultTypes&&(d.resultTypes=JSON.stringify(a.resultTypes));a=e.asValidOptions(c.query,{query:e.encode({...d,async:!0,f:"json"}),...f});({data:a}=await k(`${c.path}/trace`,a));return a.statusUrl};h.trace=async function(c,a,f){c=e.parseUrl(c);const d=a.toJSON();d.traceLocations=JSON.stringify(a.traceLocations);
a.resultTypes&&(d.resultTypes=JSON.stringify(a.resultTypes));f=e.asValidOptions(c.query,{query:e.encode({...d,f:"json"}),...f});return k(`${c.path}/trace`,f).then(b=>{var g=a.outSpatialReference;({data:b}=b);b=l.fromJSON(b.traceResults);b.aggregatedGeometry&&g&&(b.aggregatedGeometry.line&&(b.aggregatedGeometry.line.spatialReference=g.clone()),b.aggregatedGeometry.multipoint&&(b.aggregatedGeometry.multipoint.spatialReference=g.clone()),b.aggregatedGeometry.polygon&&(b.aggregatedGeometry.polygon.spatialReference=
g.clone()));return b})};Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});