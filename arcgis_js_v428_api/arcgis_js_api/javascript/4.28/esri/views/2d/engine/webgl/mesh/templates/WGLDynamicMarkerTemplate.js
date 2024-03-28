// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../../../../../core/Error ../../../../../../core/Logger ../../../../../../core/screenUtils ../../../../../../chunks/mat2df32 ../../../../../../chunks/vec2f32 ../../../../../../symbols/cim/enums ../../../../../../symbols/cim/utils ../../color ../../definitions ../../number ../../materialKey/MaterialKey ./util ./WGLBaseMarkerTemplate ./WGLDynamicMeshTemplate ../../util/Result".split(" "),function(A,B,f,C,D,E,g,u,n,w,F,G,H,I,J){const K=D.create(),L=C.create();class z extends H(I){constructor(a,
b,p){super(a);this._cimMarkerLayer=a;this._minMaxZoom=w.i1616to32(Math.round(b*n.minMaxZoomPrecisionFactor),Math.round(p*n.minMaxZoomPrecisionFactor));const l=a.color;g.isFeatureValueFn(l)?this._dynamicPropertyMap.set("_fillColor",(c,d,e)=>u.premultiplyAlphaRGBA(l(c,d,e))):this._fillColor=u.premultiplyAlphaRGBA(l);const h=a.outlineColor;g.isFeatureValueFn(h)?this._dynamicPropertyMap.set("_outlineColor",(c,d,e)=>u.premultiplyAlphaRGBA(h(c,d,e))):this._outlineColor=u.premultiplyAlphaRGBA(h);const q=
a.size;g.isFeatureValueFn(q)?this._dynamicPropertyMap.set("_size",(c,d,e)=>f.pt2px(q(c,d,e))):this._size=f.pt2px(q)||0;b=a.scaleX;g.isFeatureValueFn(b)?this._dynamicPropertyMap.set("_scaleX",b):this._scaleX=b;const k=a.offsetX;g.isFeatureValueFn(k)?this._dynamicPropertyMap.set("xOffset",(c,d,e)=>f.pt2px(k(c,d,e))):this.xOffset=f.pt2px(k)||0;const r=a.offsetY;g.isFeatureValueFn(r)?this._dynamicPropertyMap.set("yOffset",(c,d,e)=>f.pt2px(r(c,d,e))):this.yOffset=f.pt2px(r)||0;const m=a.outlineWidth;g.isFeatureValueFn(m)?
this._dynamicPropertyMap.set("_outlineWidth",(c,d,e)=>f.pt2px(m(c,d,e))):this._outlineWidth=f.pt2px(m)||0;b=a.rotation;g.isFeatureValueFn(b)?this._dynamicPropertyMap.set("_angle",b):this._angle=b||0;null!=a.effects&&(b=a.effects,g.isFeatureValueFn(b)?this._dynamicPropertyMap.set("_effects",b):this._effects=b);null!=a.markerPlacement&&(b=a.markerPlacement,g.isFeatureValueFn(b)?this._dynamicPropertyMap.set("_markerPlacement",b):this._markerPlacement=b);this._scaleFactor=a.scaleFactor??1;this._bitSet=
(a.alignment===E.Alignment.MAP?n.bitsetMarkerAlignmentMap:n.bitsetMarkerAlignmentScreen)|(a.colorLocked?n.bitsetGenericLockColor:0)|(a.scaleSymbolsProportionally?n.bitsetMarkerScaleSymbolsProportionally:0);this._materialKey=a.materialKey}static fromCIMMarker(a,b){const [p,l]=G.getMinMaxZoom(a.scaleInfo,b);return new z(a,p,l)}bindFeature(a,b,p){const l=a.readLegacyFeature();a=a.getObjectId();this._dynamicPropertyMap.forEach((M,N)=>{this[N]=M(l,b,p)});var h=this._cimMarkerLayer.materialHash;a="function"===
typeof h?h(l,b,p,a):h;if((a=this._materialCache.get(a))&&J.ok(a.spriteMosaicItem)&&a.spriteMosaicItem){a=a.spriteMosaicItem;h=this._cimMarkerLayer.sizeRatio;var q=a.width/a.height*this._scaleX,k=F.MarkerMaterialKey.load(this._materialKey);k.sdf=a.sdf;k.pattern=!0;k.textureBinding=a.textureBinding;this._materialKey=k.data;var r=this._cimMarkerLayer.rotateClockwise?this._angle:-this._angle,m=this._size,c=m*q,d=this.xOffset,e=this.yOffset;this.xOffset*=this._scaleFactor;this.yOffset*=this._scaleFactor;
var v=this._cimMarkerLayer.scaleSymbolsProportionally&&this._cimMarkerLayer.frameHeight?this._size/f.pt2px(this._cimMarkerLayer.frameHeight):1;v*=this._outlineWidth;var O=f.pt2px(this._cimMarkerLayer.referenceSize),x=0,y=0,t=this._cimMarkerLayer.anchorPoint;t&&(this._cimMarkerLayer.isAbsoluteAnchorPoint?this._size&&(x=f.pt2px(t.x)/(this._size*q),y=f.pt2px(t.y)/this._size):(x=t.x,y=t.y));this._anchorX=x;this._anchorY=y;this._sizeOutlineWidth=w.i8888to32(Math.round(Math.min(Math.sqrt(128*c),255)),Math.round(Math.min(Math.sqrt(128*
m),255)),Math.round(Math.min(Math.sqrt(128*v),255)),Math.round(Math.min(Math.sqrt(128*O),255)));this.angle=r;this._bitestAndDistRatio=w.i1616to32(this._bitSet,Math.round(64*h));this._computeSize(c,m,h,v,this._scaleFactor,a,k.hasSizeVV(),!0);this._applyTransformation(L,K);this.xOffset=d;this.yOffset=e}else B.getLogger("esri.views.2d.engine.webgl.WGLDynamicMarkerTemplate").error(new A("mapview-cim","Encountered an error when binding feature"))}}return z});