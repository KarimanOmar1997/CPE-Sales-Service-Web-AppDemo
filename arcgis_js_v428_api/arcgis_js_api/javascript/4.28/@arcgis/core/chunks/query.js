/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import t from"../request.js";import{urlToObject as e,join as n}from"../core/urlUtils.js";import{getJsonType as r}from"../geometry/support/jsonUtils.js";import{normalizeCentralMeridian as a}from"../geometry/support/normalizeUtils.js";import{U as i}from"./unitUtils.js";import{m as o}from"./urlUtils2.js";import{p as s}from"./pbfQueryUtils.js";import{a as u}from"./queryZScale.js";const l="Layer does not support extent calculation.";function m(t,e){const n=t.geometry,a=t.toJSON();delete a.compactGeometryEnabled,delete a.defaultSpatialReferenceEnabled;const o=a;let s,u,l;if(null!=n&&(u=n.spatialReference,l=i(u),o.geometryType=r(n),o.geometry=function(t,e){if(e&&"extent"===t.type)return`${t.xmin},${t.ymin},${t.xmax},${t.ymax}`;if(e&&"point"===t.type)return`${t.x},${t.y}`;const n=t.toJSON();return delete n.spatialReference,JSON.stringify(n)}(n,t.compactGeometryEnabled),o.inSR=l),a.groupByFieldsForStatistics&&(o.groupByFieldsForStatistics=a.groupByFieldsForStatistics.join(",")),a.objectIds&&(o.objectIds=a.objectIds.join(",")),a.orderByFields&&(o.orderByFields=a.orderByFields.join(",")),!a.outFields||!a.returnDistinctValues&&(e?.returnCountOnly||e?.returnExtentOnly||e?.returnIdsOnly)?delete o.outFields:a.outFields.includes("*")?o.outFields="*":o.outFields=a.outFields.join(","),a.outSR?(o.outSR=i(a.outSR),s=t.outSpatialReference):n&&(a.returnGeometry||a.returnCentroid)&&(o.outSR=o.inSR,s=u),a.returnGeometry&&delete a.returnGeometry,a.outStatistics&&(o.outStatistics=JSON.stringify(a.outStatistics)),a.fullText&&(o.fullText=JSON.stringify(a.fullText)),a.pixelSize&&(o.pixelSize=JSON.stringify(a.pixelSize)),a.quantizationParameters&&(t.defaultSpatialReferenceEnabled&&null!=u&&null!=t.quantizationParameters?.extent&&u.equals(t.quantizationParameters.extent.spatialReference)&&delete a.quantizationParameters.extent.spatialReference,o.quantizationParameters=JSON.stringify(a.quantizationParameters)),a.parameterValues&&(o.parameterValues=JSON.stringify(a.parameterValues)),a.rangeValues&&(o.rangeValues=JSON.stringify(a.rangeValues)),a.dynamicDataSource&&(o.layer=JSON.stringify({source:a.dynamicDataSource}),delete a.dynamicDataSource),a.timeExtent){const t=a.timeExtent,{start:e,end:n}=t;null==e&&null==n||(o.time=e===n?e:`${e??"null"},${n??"null"}`),delete a.timeExtent}return t.defaultSpatialReferenceEnabled&&null!=u&&null!=s&&u.equals(s)&&(o.defaultSR=o.inSR,delete o.inSR,delete o.outSR),o}async function y(t,e,n,r){const a=null!=e.timeExtent&&e.timeExtent.isEmpty?{data:{features:[]}}:await x(t,e,"json",r);return u(e,n,a.data),a}async function c(t,e,n,r){if(null!=e.timeExtent&&e.timeExtent.isEmpty)return{data:n.createFeatureResult()};const a=await f(t,e,r),i=a;return i.data=s(a.data,n),i}function f(t,e,n){return x(t,e,"pbf",n)}function d(t,e,n){return null!=e.timeExtent&&e.timeExtent.isEmpty?Promise.resolve({data:{objectIds:[]}}):x(t,e,"json",n,{returnIdsOnly:!0})}function p(t,e,n){return null!=e.timeExtent&&e.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):x(t,e,"json",n,{returnIdsOnly:!0,returnCountOnly:!0})}async function S(t,e,n){if(null!=e.timeExtent&&e.timeExtent.isEmpty)return{data:{count:0,extent:null}};const r=await x(t,e,"json",n,{returnExtentOnly:!0,returnCountOnly:!0}),a=r.data;if(a.hasOwnProperty("extent"))return r;if(a.features)throw new Error(l);if(a.hasOwnProperty("count"))throw new Error(l);return r}async function x(r,i,s,u={},l={}){const y="string"==typeof r?e(r):r,c=i.geometry?[i.geometry]:[],f=await a(c,null,{signal:u.signal}),d=f?.[0];null!=d&&((i=i.clone()).geometry=d);const p=o({...y.query,f:s,...l,...m(i,l)});return t(n(y.path,function(t,e){return null!=t.formatOf3DObjects&&!(e.returnCountOnly||e.returnExtentOnly||e.returnIdsOnly)}(i,l)?"query3d":"query"),{...u,responseType:"pbf"===s?"array-buffer":"json",query:{...p,...u.query}})}export{p as a,d as b,S as c,c as d,y as e,f,x as r};