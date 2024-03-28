/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{s as t,l as e,q as i}from"./vec3.js";import{c as s}from"./vec3f64.js";import{c as a}from"./mathUtils.js";class l{constructor(t){this._gain=t,this.lastValue=void 0,this.filteredDelta=void 0}update(t){if(this.hasLastValue()){const e=this.computeDelta(t);this._updateDelta(e)}this.lastValue=t}reset(){this.lastValue=void 0,this.filteredDelta=void 0}hasLastValue(){return void 0!==this.lastValue}hasFilteredDelta(){return void 0!==this.filteredDelta}computeDelta(t){return void 0===this.lastValue?NaN:t-this.lastValue}_updateDelta(t){void 0!==this.filteredDelta?this.filteredDelta=(1-this._gain)*this.filteredDelta+this._gain*t:this.filteredDelta=t}}class r{constructor(t,e,i){this._initialVelocity=t,this._stopVelocity=e,this._friction=i,this._duration=Math.abs(Math.log(Math.abs(this._initialVelocity)/this._stopVelocity)/Math.log(1-this._friction))}get duration(){return this._duration}isFinished(t){return t>this.duration}get friction(){return this._friction}value(t){return this.valueFromInitialVelocity(this._initialVelocity,t)}valueDelta(t,e){const i=this.value(t);return this.value(t+e)-i}valueFromInitialVelocity(t,e){e=Math.min(e,this.duration);const i=1-this.friction;return t*(i**e-1)/Math.log(i)}}class h extends r{constructor(t,e,i,s,a){super(t,e,i),this._sceneVelocity=s,this.direction=a}value(t){return super.valueFromInitialVelocity(this._sceneVelocity,t)}}class n{constructor(t=300,e=12,i=.84){this._minimumInitialVelocity=t,this._stopVelocity=e,this._friction=i,this.enabled=!0,this._time=new l(.6),this._screen=[new l(.4),new l(.4)],this._scene=[new l(.6),new l(.6),new l(.6)],this._tmpDirection=s()}add(t,e,i){if(this.enabled){if(this._time.hasLastValue()&&this._time.computeDelta(i)<.015)return;this._screen[0].update(t[0]),this._screen[1].update(t[1]),this._scene[0].update(e[0]),this._scene[1].update(e[1]),this._scene[2].update(e[2]),this._time.update(i)}}reset(){this._screen[0].reset(),this._screen[1].reset(),this._scene[0].reset(),this._scene[1].reset(),this._scene[2].reset(),this._time.reset()}evaluateMomentum(){if(!this.enabled||!this._screen[0].hasFilteredDelta()||!this._time.hasFilteredDelta())return null;const t=this._screen[0].filteredDelta,e=this._screen[1].filteredDelta,i=null==t||null==e?0:Math.sqrt(t*t+e*e),s=this._time.filteredDelta,a=null==s||null==i?0:i/s;return Math.abs(a)<this._minimumInitialVelocity?null:this.createMomentum(a,this._stopVelocity,this._friction)}createMomentum(s,a,l){t(this._tmpDirection,this._scene[0].filteredDelta??0,this._scene[1].filteredDelta??0,this._scene[2].filteredDelta??0);const r=e(this._tmpDirection);r>0&&i(this._tmpDirection,this._tmpDirection,1/r);const n=this._time.filteredDelta;return new h(s,a,l,null==n?0:r/n,this._tmpDirection)}}class u{constructor(t=2.5,e=.01,i=.95,s=12){this._minimumInitialVelocity=t,this._stopVelocity=e,this._friction=i,this._maxVelocity=s,this.enabled=!0,this.value=new l(.8),this.time=new l(.3)}add(t,e){if(this.enabled&&null!=e){if(this.time.hasLastValue()){if(this.time.computeDelta(e)<.01)return;if(this.value.hasFilteredDelta()){const e=this.value.computeDelta(t);this.value.filteredDelta*e<0&&this.value.reset()}}this.time.update(e),this.value.update(t)}}reset(){this.value.reset(),this.time.reset()}evaluateMomentum(){if(!this.enabled||!this.value.hasFilteredDelta()||!this.time.hasFilteredDelta())return null;let t=this.value.filteredDelta/this.time.filteredDelta;return t=a(t,-this._maxVelocity,this._maxVelocity),Math.abs(t)<this._minimumInitialVelocity?null:this.createMomentum(t,this._stopVelocity,this._friction)}createMomentum(t,e,i){return new r(t,e,i)}}class o extends u{constructor(t=3,e=.01,i=.95,s=12){super(t,e,i,s)}add(t,e){const i=this.value.lastValue;if(null!=i){let e=t-i;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;t=i+e}super.add(t,e)}}class c extends r{constructor(t,e,i){super(t,e,i)}value(t){const e=super.value(t);return Math.exp(e)}valueDelta(t,e){const i=super.value(t),s=super.value(t+e)-i;return Math.exp(s)}}class d extends u{constructor(t=2.5,e=.01,i=.95,s=12){super(t,e,i,s)}add(t,e){super.add(Math.log(t),e)}createMomentum(t,e,i){return new c(t,e,i)}}export{l as F,r as M,n as P,o as R,d as Z};