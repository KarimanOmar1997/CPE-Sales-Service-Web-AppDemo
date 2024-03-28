/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import"../../../chunks/typedArrayUtil.js";import{g as e}from"../../../chunks/metadata.js";import{t}from"../../../chunks/tracking.js";import{i as r}from"../../../chunks/ensureType.js";import{L as n}from"../../../chunks/Logger.js";import{s as o}from"../../../config.js";import i,{M as s}from"../../Error.js";import"../../lang.js";import"../../../chunks/utils.js";import"../../../chunks/handleUtils.js";const a=Symbol("Accessor-beforeDestroy");var c;!function(e){e[e.INITIALIZING=0]="INITIALIZING",e[e.CONSTRUCTING=1]="CONSTRUCTING",e[e.CONSTRUCTED=2]="CONSTRUCTED"}(c||(c={}));class u extends s{constructor(e,t,r){super(e,t,r)}}function p(e){return!!e&&e.prototype?.declaredClass&&0===e.prototype.declaredClass.indexOf("esri.core.Collection")}u.prototype.type="warning";const f=n.getLogger("esri.core.accessorSupport.extensions.serializableProperty.reader");function y(e,t,r){e&&(!r&&!t.read||t.read?.reader||!1===t.read?.enabled||function(e){return"types"in e?j(e.types):b(e.type)}(e)&&o("read.reader",l(e),t))}function l(e){const t=e.ndimArray??0;if(t>1)return function(e){const t=d(e),r=g.bind(null,t),n=e.ndimArray??0;return(e,t,o)=>{if(null==e)return e;e=r(e,o,n);let i=n,s=e;for(;i>0&&Array.isArray(s);)i--,s=s[0];if(void 0!==s)for(let t=0;t<i;t++)e=[e];return e}}(e);if(1===t)return w(e);if("type"in e&&m(e.type)){const t=e.type.prototype?.itemType?.Type,r=w("function"==typeof t?{type:t}:{types:t});return(t,n,o)=>{const i=r(t,n,o);return i?new e.type(i):i}}return d(e)}function d(t){return"type"in t?function(e){return e.prototype.read?(t,r,n)=>{if(null==t)return t;const o=typeof t;if("object"!==o)return void f.error(`Expected JSON value of type 'object' to deserialize type '${e.prototype.declaredClass}', but got '${o}'`);const i=new e;return i.read(t,n),i}:e.fromJSON}(t.type):function(t){let r=null;const n=t.errorContext??"type",o=t.validate;return(i,s,a)=>{if(null==i)return i;const c=typeof i;if("object"!==c)return void f.error(`Expected JSON value of type 'object' to deserialize, but got '${c}'`);r||(r=function(t){const r={};for(const n in t.typeMap){const o=t.typeMap[n],i=e(o.prototype);if("function"==typeof t.key)continue;const s=i[t.key];if(!s)continue;s.json?.type&&Array.isArray(s.json.type)&&1===s.json.type.length&&"string"==typeof s.json.type[0]&&(r[s.json.type[0]]=o);const a=s.json?.write;if(!a?.writer){r[n]=o;continue}const c=a.target,u="string"==typeof c?c:t.key,p={};a.writer(n,p,u),p[u]&&(r[p[u]]=o)}return r}(t));const p=t.key;if("string"!=typeof p)return;const y=i[p],l=y?r[y]:t.defaultKeyValue?t.typeMap[t.defaultKeyValue]:void 0;if(!l){const e=`Type '${y||"unknown"}' is not supported`;return a?.messages&&i&&a.messages.push(new u(`${n}:unsupported`,e,{definition:i,context:a})),void f.error(e)}const d=new l;return d.read(i,a),o?o(d):d}}(t.types)}function g(e,t,r,n){return 0!==n&&Array.isArray(t)?t.map((t=>g(e,t,r,n-1))):e(t,void 0,r)}function w(e){const t=d(e);return(e,r,n)=>{if(null==e)return e;if(Array.isArray(e)){const r=[];for(const o of e){const e=t(o,void 0,n);void 0!==e&&r.push(e)}return r}const o=t(e,void 0,n);return void 0!==o?[o]:void 0}}function m(e){if(!p(e))return!1;const t=e.prototype.itemType;return!(!t||!t.Type)&&("function"==typeof t.Type?b(t.Type):j(t.Type))}function b(e){return!Array.isArray(e)&&!!e&&e.prototype&&("read"in e.prototype||"fromJSON"in e||m(e))}function j(e){for(const t in e.typeMap)if(!b(e.typeMap[t]))return!1;return!0}function h(e){e.name&&(e.read&&"object"==typeof e.read?void 0===e.read.source&&(e.read.source=e.name):e.read={source:e.name},e.write&&"object"==typeof e.write?void 0===e.write.target&&(e.write.target=e.name):e.write={target:e.name})}function A(e){"boolean"==typeof e.read?e.read={enabled:e.read}:"function"==typeof e.read?e.read={enabled:!0,reader:e.read}:e.read&&"object"==typeof e.read&&void 0===e.read.enabled&&(e.read.enabled=!0)}function v(e){"boolean"==typeof e.write?e.write={enabled:e.write}:"function"==typeof e.write?e.write={enabled:!0,writer:e.write}:e.write&&"object"==typeof e.write&&void 0===e.write.enabled&&(e.write.enabled=!0)}function O(e,t){if(!t.write||t.write.writer||!1===t.write.enabled&&!t.write.overridePolicy)return;const r=e?.ndimArray??0;var n,i;e&&(1===r||"type"in e&&p(e.type))?t.write.writer=k:r>1?t.write.writer=(i=r,(e,t,r,n)=>{let s;if(null===e)s=null;else{s=S(e,n,i);let t=i,r=s;for(;t>0&&Array.isArray(r);)t--,r=r[0];if(void 0!==r)for(let e=0;e<t;e++)s=[s]}o(r,s,t)}):t.types?Array.isArray(t.types)?t.write.writer=(n=t.types[0],(e,t,r,o)=>e&&Array.isArray(e)?T(e.filter((e=>N(e,n,o))),t,r,o):T(e,t,r,o)):t.write.writer=function(e){return(t,r,n,o)=>t?N(t,e,o)?T(t,r,n,o):void 0:T(t,r,n,o)}(t.types):t.write.writer=T}function N(e,t,r){for(const r in t.typeMap)if(e instanceof t.typeMap[r])return!0;if(r?.messages){const o=t.errorContext??"type",s=`Values of type '${("function"!=typeof t.key?e[t.key]:e.declaredClass)??"Unknown"}' cannot be written`;r&&r.messages&&e&&r.messages.push(new i(`${o}:unsupported`,s,{definition:e,context:r})),n.getLogger("esri.core.accessorSupport.extensions.serializableProperty.writer").error(s)}return!1}function T(e,t,r,n){o(r,C(e,n),t)}function C(e,t){return e&&"function"==typeof e.write?e.write({},t):e&&"function"==typeof e.toJSON?e.toJSON():"number"==typeof e?_(e):e}function _(e){return e===-1/0?-Number.MAX_VALUE:e===1/0?Number.MAX_VALUE:isNaN(e)?null:e}function k(e,t,r,n){let i;null===e?i=null:e&&"function"==typeof e.map?(i=e.map((e=>C(e,n))),"function"==typeof i.toArray&&(i=i.toArray())):i=[C(e,n)],o(r,i,t)}function S(e,t,r){return 0!==r&&Array.isArray(e)?e.map((e=>S(e,t,r-1))):C(e,t)}function x(e,t){return z(e,"any",t?.origin)}function I(e,t){return z(e,"read",t?.origin)}function P(e,t){return z(e,"write",t?.origin)}function z(e,t,r){let n=e?.json;if(n?.origins&&r){let e;e="link-chart"===r?n.origins[r]&&("any"===t||t in n.origins[r])?n.origins[r]:n.origins["web-map"]:n.origins[r],e&&("any"===t||t in e)&&(n=e)}return n}function E(e){return e.type?M(e):$(e)}function M(e){if(!e.type)return;let t=0,n=e.type;for(;Array.isArray(n)&&!r(n);)n=n[0],t++;return{type:n,ndimArray:t}}function $(e){if(!e.types)return;let t=0,r=e.types;for(;Array.isArray(r);)r=r[0],t++;return{types:r,ndimArray:t}}function U(e){(function(e){if(e.json||(e.json={}),A(e.json),v(e.json),h(e.json),e.json.origins)for(const t in e.json.origins)A(e.json.origins[t]),v(e.json.origins[t]),h(e.json.origins[t]);return!0})(e)&&(function(e){if(e.json&&e.json.origins){const t=e.json.origins,r={"web-document":["web-scene","web-map"]};for(const e in r)if(t[e]){const n=t[e];r[e].forEach((e=>{t[e]=n})),delete t[e]}}}(e),function(e){const t=(r=e).json.types?$(r.json):r.type?M(r):$(r);var r;if(e.json.origins)for(const r in e.json.origins){const n=e.json.origins[r],o=n.types?E(n):t;y(o,n,!1),n.types&&!n.write&&e.json.write&&e.json.write.enabled&&(n.write={...e.json.write}),O(o,n)}y(t,e.json,!0),O(t,e.json)}(e))}const L=new Set,J=new Set;function R(t){return r=>{t??="esri.core.Accessor",r.prototype.declaredClass=t,D(r);const n=[],o=[];let i=r.prototype;for(;i;)i.hasOwnProperty("initialize")&&!L.has(i.initialize)&&(L.add(i.initialize),n.push(i.initialize)),i.hasOwnProperty("destroy")&&!J.has(i.destroy)&&(J.add(i.destroy),o.push(i.destroy)),i=Object.getPrototypeOf(i);L.clear(),J.clear();const s=class extends r{constructor(...e){if(super(...e),this.constructor===s&&"function"==typeof this.postscript){if(n.length&&Object.defineProperty(this,"initialize",{enumerable:!1,configurable:!0,value(){for(let e=n.length-1;e>=0;e--)n[e].call(this)}}),o.length){let e=!1;const t=this[a];Object.defineProperty(this,"destroy",{enumerable:!1,configurable:!0,value(){if(!e){e=!0,t.call(this);for(let e=0;e<o.length;e++)o[e].call(this)}}})}this.postscript(...e)}}};s.__accessorMetadata__=e(r.prototype),s.prototype.declaredClass=t;const c=(t||"AccessorSubclass").split(".").slice(-1)[0];return Object.defineProperty(s,"name",{value:c,configurable:!0}),s}}function V(e,r){return null==r.get?function(){const r=this.__accessor__,n=r.propertiesByName.get(e);if(void 0===n)return;t(n);const o=r.store;return o.has(e)?o.get(e):n.metadata.value}:function(){const t=this.__accessor__,r=t.propertiesByName.get(e);if(void 0!==r)return r.getComputed(t)}}function D(t){const r=t.prototype,n=e(r),o={};for(const e of Object.getOwnPropertyNames(n)){const t=n[e];U(t),o[e]={enumerable:!0,configurable:!0,get:V(e,t),set(r){const n=this.__accessor__;if(void 0!==n){if(!Object.isFrozen(this)){if(n.initialized&&t.readOnly)throw new TypeError(`[accessor] cannot assign to read-only property '${e}' of ${this.declaredClass}`);if(n.lifecycle===c.CONSTRUCTED&&t.constructOnly)throw new TypeError(`[accessor] cannot assign to construct-only property '${e}' of ${this.declaredClass}`);n.set(e,r)}}else Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:r})}}}Object.defineProperties(t.prototype,o)}export{c as L,u as W,x as a,P as b,a as c,l as d,D as finalizeClass,_ as n,I as o,R as subclass};