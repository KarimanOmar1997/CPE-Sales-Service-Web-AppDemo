// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","../config","../core/has","../core/promiseUtils","../core/urlUtils"],function(e,f,q,t,d){function r(){try{return new DOMException("Aborted","AbortError")}catch{const a=Error();a.name="AbortError";return a}}e.createTimeoutError=function(){return Error("Timeout exceeded")};e.isNoCorsRequestRequired=function(a){const b=f.request.crossOriginNoCorsDomains;return b&&(a=d.getOrigin(a))?(a=a.toLowerCase(),!d.hasSameOrigin(a,d.getAppUrl())&&b[a]<Date.now()-36E5):!1};e.isTimeoutError=function(a){return"object"===
typeof a&&!!a&&"message"in a&&"Timeout exceeded"===a.message};e.loadImageAsync=function(a,b,c=!1,g){return new Promise((u,l)=>{if(t.isAborted(g))l(r());else{var h=()=>{m();l(Error(`Unable to load ${b}`))},k=()=>{const n=a;m();u(n)},p=()=>{if(a){var n=a;m();n.src="";l(r())}},m=()=>{q("esri-image-decode")||(a.removeEventListener("error",h),a.removeEventListener("load",k));a=k=h=null;null!=g&&g.removeEventListener("abort",p);p=null;c&&URL.revokeObjectURL(b)};null!=g&&g.addEventListener("abort",p);q("esri-image-decode")?
a.decode().then(k,h):(a.addEventListener("error",h),a.addEventListener("load",k))}})};e.registerNoCorsDomains=function(a){f.request.crossOriginNoCorsDomains||(f.request.crossOriginNoCorsDomains={});const b=f.request.crossOriginNoCorsDomains;for(let c of a)c=c.toLowerCase(),/^https?:\/\//.test(c)?b[d.getOrigin(c)??""]=0:(b[d.getOrigin("http://"+c)??""]=0,b[d.getOrigin("https://"+c)??""]=0)};e.sendNoCorsRequest=async function(a){var b=f.request.crossOriginNoCorsDomains;const c=d.getOrigin(a);b&&c&&
(b[c.toLowerCase()]=Date.now());b=d.urlToObject(a);a=b.path;"json"===b.query?.f&&(a+="?f\x3djson");try{await fetch(a,{mode:"no-cors",credentials:"include"})}catch{}};Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});