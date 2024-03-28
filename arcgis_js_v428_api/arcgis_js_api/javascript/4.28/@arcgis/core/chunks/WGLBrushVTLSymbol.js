/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{h as t}from"./mathUtils.js";import{c as e}from"./mat3f32.js";import{f as i}from"./vec4f32.js";import{v as a,r,s as n}from"./definitions.js";import{W as s}from"./enums4.js";import{u as o}from"./number.js";import{B as l}from"./BufferObject.js";import{c as f,g as c,e as u,U as d,D as p}from"./enums3.js";import{V as m}from"./VertexArrayObject.js";import{T as g,R as y,b as _}from"./StyleDefinition.js";import{c as M,f as U}from"./vec2f32.js";import{f as h}from"./config.js";import{d as v}from"./GeometryUtils2.js";class E{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(t,e){}draw(t,e,i){}drawMany(t,e,i){for(const a of e)a.visible&&this.draw(t,a,i)}}class P extends E{constructor(){super(...arguments),this._color=i(1,0,0,1),this._patternMatrix=e(),this._programOptions={id:!1,pattern:!1}}dispose(){this._vao&&(this._vao.dispose(),this._vao=null)}drawMany(e,i){const{context:n,painter:l,styleLayerUID:d,requestRender:p,allowDelayedRender:m}=e;this._loadWGLResources(e);const g=e.displayLevel,y=e.styleLayer,_=y.backgroundMaterial,M=l.vectorTilesMaterialManager,U=y.getPaintValue("background-color",g),h=y.getPaintValue("background-opacity",g),v=y.getPaintValue("background-pattern",g),E=void 0!==v,P=U[3]*h,T=1|window.devicePixelRatio,I=e.spriteMosaic;let x,S;const R=T>r?2:1,D=e.drawPhase===s.HITTEST,L=this._programOptions;L.id=D,L.pattern=E;const w=M.getMaterialProgram(n,_,L);if(!m||null==p||w.compiled){if(n.bindVAO(this._vao),n.useProgram(w),E){const t=I.getMosaicItemPosition(v,!0);if(null!=t){const{tl:e,br:i,page:r}=t;x=i[0]-e[0],S=i[1]-e[1];const s=I.getPageSize(r);null!=s&&(I.bind(n,f.LINEAR,r,a),w.setUniform4f("u_tlbr",e[0],e[1],i[0],i[1]),w.setUniform2fv("u_mosaicSize",s),w.setUniform1i("u_texture",a))}w.setUniform1f("u_opacity",h)}else this._color[0]=P*U[0],this._color[1]=P*U[1],this._color[2]=P*U[2],this._color[3]=P,w.setUniform4fv("u_color",this._color);if(w.setUniform1f("u_depth",y.z||0),D){const t=o(d+1);w.setUniform4fv("u_id",t)}for(const e of i){if(w.setUniform1f("u_coord_range",e.rangeX),w.setUniformMatrix3fv("u_dvsMat3",e.transforms.dvs),E){const i=Math.max(2**(Math.round(g)-e.key.level),1),a=R*e.width*i,r=a/t(x),n=a/t(S);this._patternMatrix[0]=r,this._patternMatrix[4]=n,w.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix)}n.setStencilFunction(c.EQUAL,0,255),n.drawArrays(u.TRIANGLE_STRIP,0,4)}}else p()}_loadWGLResources(t){if(this._vao)return;const{context:e,styleLayer:i}=t,a=i.backgroundMaterial,r=new Int8Array([0,0,1,0,0,1,1,1]),n=l.createVertex(e,d.STATIC_DRAW,r),s=new m(e,a.getAttributeLocations(),a.getLayoutInfo(),{geometry:n});this._vao=s}}class T extends E{constructor(){super(...arguments),this._programOptions={id:!1}}dispose(){}drawMany(t,e){const{context:i,displayLevel:a,requiredLevel:r,state:n,drawPhase:l,painter:f,spriteMosaic:d,styleLayerUID:m,requestRender:y,allowDelayedRender:_}=t;if(!e.some((t=>t.layerData.get(m)?.circleIndexCount??!1)))return;const M=t.styleLayer,U=M.circleMaterial,h=f.vectorTilesMaterialManager,v=M.getPaintValue("circle-translate",a),E=M.getPaintValue("circle-translate-anchor",a),P=l===s.HITTEST,T=this._programOptions;T.id=P;const I=h.getMaterialProgram(i,U,T);if(_&&null!=y&&!I.compiled)return void y();i.useProgram(I),I.setUniformMatrix3fv("u_displayMat3",E===g.VIEWPORT?n.displayMat3:n.displayViewMat3),I.setUniform2fv("u_circleTranslation",v),I.setUniform1f("u_depth",M.z),I.setUniform1f("u_antialiasingWidth",1.2);let x=-1;if(P){const t=o(m+1);I.setUniform4fv("u_id",t)}for(const t of e){if(!t.layerData.has(m))continue;t.key.level!==x&&(x=t.key.level,U.setDataUniforms(I,a,M,x,d));const e=t.layerData.get(m);if(!e.circleIndexCount)continue;e.prepareForRendering(i);const n=e.vao;null!=n&&(i.bindVAO(n),I.setUniformMatrix3fv("u_dvsMat3",t.transforms.dvs),r!==t.key.level?i.setStencilFunction(c.EQUAL,t.stencilRef,255):i.setStencilFunction(c.GREATER,255,255),i.drawElements(u.TRIANGLES,e.circleIndexCount,p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*e.circleIndexStart),t.triangleCount+=e.circleIndexCount/3)}}}const I=1/65536;class x extends E{constructor(){super(...arguments),this._fillProgramOptions={id:!1,pattern:!1},this._outlineProgramOptions={id:!1}}dispose(){}drawMany(t,e){const{displayLevel:i,drawPhase:a,renderPass:r,spriteMosaic:n,styleLayerUID:l}=t;let f=!1;for(const t of e)if(t.layerData.has(l)){const e=t.layerData.get(l);if(e.fillIndexCount>0||e.outlineIndexCount>0){f=!0;break}}if(!f)return;const c=t.styleLayer,u=c.getPaintProperty("fill-pattern"),d=void 0!==u,p=d&&u.isDataDriven;let m;if(d&&!p){const t=u.getValue(i);m=n.getMosaicItemPosition(t,!0)}const g=!d&&c.getPaintValue("fill-antialias",i);let y,_=!0,M=1;if(!d){const t=c.getPaintProperty("fill-color"),e=c.getPaintProperty("fill-opacity");if(!t?.isDataDriven&&!e?.isDataDriven){const t=c.getPaintValue("fill-color",i);M=c.getPaintValue("fill-opacity",i)*t[3],M>=1&&(_=!1)}}if(_&&"opaque"===r)return;a===s.HITTEST&&(y=o(l+1));const U=c.getPaintValue("fill-translate",i),h=c.getPaintValue("fill-translate-anchor",i);(_||"translucent"!==r)&&this._drawFill(t,l,c,e,U,h,d,m,p,y);const v=!c.hasDataDrivenOutlineColor&&c.outlineUsesFillColor&&M<1;g&&"opaque"!==r&&!v&&this._drawOutline(t,l,c,e,U,h,y)}_drawFill(t,e,i,n,o,l,d,m,y,_){if(d&&!y&&null==m)return;const{context:M,displayLevel:U,state:h,drawPhase:v,painter:E,pixelRatio:P,spriteMosaic:T,requestRender:x,allowDelayedRender:S}=t,R=i.fillMaterial,D=E.vectorTilesMaterialManager,L=P>r?2:1,w=v===s.HITTEST,V=this._fillProgramOptions;V.id=w,V.pattern=d;const A=D.getMaterialProgram(M,R,V);if(S&&null!=x&&!A.compiled)return void x();if(M.useProgram(A),null!=m){const{page:t}=m,e=T.getPageSize(t);null!=e&&(T.bind(M,f.LINEAR,t,a),A.setUniform2fv("u_mosaicSize",e),A.setUniform1i("u_texture",a))}A.setUniformMatrix3fv("u_displayMat3",l===g.VIEWPORT?h.displayMat3:h.displayViewMat3),A.setUniform2fv("u_fillTranslation",o),A.setUniform1f("u_depth",i.z+I),w&&A.setUniform4fv("u_id",_);let N=-1;for(const t of n){if(!t.layerData.has(e))continue;t.key.level!==N&&(N=t.key.level,R.setDataUniforms(A,U,i,N,T));const r=t.layerData.get(e);if(!r.fillIndexCount)continue;r.prepareForRendering(M);const n=r.fillVAO;if(null!=n){if(M.bindVAO(n),A.setUniformMatrix3fv("u_dvsMat3",t.transforms.dvs),M.setStencilFunction(c.EQUAL,t.stencilRef,255),d){const e=Math.max(2**(Math.round(U)-t.key.level),1),i=t.rangeX/(L*t.width*e);A.setUniform1f("u_patternFactor",i)}if(y){const t=r.patternMap;if(!t)continue;for(const[e,i]of t){const t=T.getPageSize(e);null!=t&&(T.bind(M,f.LINEAR,e,a),A.setUniform2fv("u_mosaicSize",t),A.setUniform1i("u_texture",a),M.drawElements(u.TRIANGLES,i[1],p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]))}}else M.drawElements(u.TRIANGLES,r.fillIndexCount,p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*r.fillIndexStart);t.triangleCount+=r.fillIndexCount/3}}}_drawOutline(t,e,i,a,r,n,o){const{context:l,displayLevel:f,state:d,drawPhase:m,painter:y,pixelRatio:_,spriteMosaic:M,requestRender:U,allowDelayedRender:h}=t,v=i.outlineMaterial,E=y.vectorTilesMaterialManager,P=.75/_,T=m===s.HITTEST,x=this._outlineProgramOptions;x.id=T;const S=E.getMaterialProgram(l,v,x);if(h&&null!=U&&!S.compiled)return void U();l.useProgram(S),S.setUniformMatrix3fv("u_displayMat3",n===g.VIEWPORT?d.displayMat3:d.displayViewMat3),S.setUniform2fv("u_fillTranslation",r),S.setUniform1f("u_depth",i.z+I),S.setUniform1f("u_outline_width",P),T&&S.setUniform4fv("u_id",o);let R=-1;for(const t of a){if(!t.layerData.has(e))continue;t.key.level!==R&&(R=t.key.level,v.setDataUniforms(S,f,i,R,M));const a=t.layerData.get(e);if(a.prepareForRendering(l),!a.outlineIndexCount)continue;const r=a.outlineVAO;null!=r&&(l.bindVAO(r),S.setUniformMatrix3fv("u_dvsMat3",t.transforms.dvs),l.setStencilFunction(c.EQUAL,t.stencilRef,255),l.drawElements(u.TRIANGLES,a.outlineIndexCount,p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*a.outlineIndexStart),t.triangleCount+=a.outlineIndexCount/3)}}}class S extends E{constructor(){super(...arguments),this._programOptions={id:!1,pattern:!1,sdf:!1}}dispose(){}drawMany(t,e){const{context:i,displayLevel:r,state:n,drawPhase:l,painter:d,pixelRatio:m,spriteMosaic:y,styleLayerUID:_,requestRender:M,allowDelayedRender:U}=t;if(!e.some((t=>t.layerData.get(_)?.lineIndexCount??!1)))return;const h=t.styleLayer,v=h.lineMaterial,E=d.vectorTilesMaterialManager,P=h.getPaintValue("line-translate",r),T=h.getPaintValue("line-translate-anchor",r),I=h.getPaintProperty("line-pattern"),x=void 0!==I,S=x&&I.isDataDriven;let R,D;if(x&&!S){const t=I.getValue(r);R=y.getMosaicItemPosition(t)}let L=!1;if(!x){const t=h.getPaintProperty("line-dasharray");if(D=void 0!==t,L=D&&t.isDataDriven,D&&!L){const e=t.getValue(r),i=h.getDashKey(e,h.getLayoutValue("line-cap",r));R=y.getMosaicItemPosition(i)}}const w=1/m,V=l===s.HITTEST,A=this._programOptions;A.id=V,A.pattern=x,A.sdf=D;const N=E.getMaterialProgram(i,v,A);if(U&&null!=M&&!N.compiled)return void M();if(i.useProgram(N),N.setUniformMatrix3fv("u_displayViewMat3",n.displayViewMat3),N.setUniformMatrix3fv("u_displayMat3",T===g.VIEWPORT?n.displayMat3:n.displayViewMat3),N.setUniform2fv("u_lineTranslation",P),N.setUniform1f("u_depth",h.z),N.setUniform1f("u_antialiasing",w),V){const t=o(_+1);N.setUniform4fv("u_id",t)}if(R&&null!=R){const{page:t}=R,e=y.getPageSize(t);null!=e&&(y.bind(i,f.LINEAR,t,a),N.setUniform2fv("u_mosaicSize",e),N.setUniform1i("u_texture",a))}let O=-1;for(const t of e){if(!t.layerData.has(_))continue;t.key.level!==O&&(O=t.key.level,v.setDataUniforms(N,r,h,O,y));const e=2**(r-O)/m;N.setUniform1f("u_zoomFactor",e);const n=t.layerData.get(_);if(!n.lineIndexCount)continue;n.prepareForRendering(i);const s=n.vao;if(null!=s){if(i.bindVAO(s),N.setUniformMatrix3fv("u_dvsMat3",t.transforms.dvs),i.setStencilFunction(c.EQUAL,t.stencilRef,255),S||L){const t=n.patternMap;if(!t)continue;for(const[e,r]of t){const t=y.getPageSize(e);null!=t&&(y.bind(i,f.LINEAR,e,a),N.setUniform2fv("u_mosaicSize",t),N.setUniform1i("u_texture",a),i.drawElements(u.TRIANGLES,r[1],p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*r[0]))}}else i.drawElements(u.TRIANGLES,n.lineIndexCount,p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*n.lineIndexStart);t.triangleCount+=n.lineIndexCount/3}}}}class R extends E{constructor(){super(...arguments),this._iconProgramOptions={id:!1,sdf:!1},this._sdfProgramOptions={id:!1},this._spritesTextureSize=M()}dispose(){}drawMany(t,e){const{drawPhase:i,styleLayerUID:a}=t,r=t.styleLayer;let n;i===s.HITTEST&&(n=o(a+1)),this._drawIcons(t,r,e,n),this._drawText(t,r,e,n)}_drawIcons(t,e,i,r){const{context:n,displayLevel:o,drawPhase:l,painter:f,spriteMosaic:c,state:u,styleLayerUID:d,requestRender:p,allowDelayedRender:m}=t,M=e.iconMaterial,U=f.vectorTilesMaterialManager;let E,P=!1;for(const t of i)if(t.layerData.has(d)&&(E=t.layerData.get(d),E.iconPerPageElementsMap.size>0)){P=!0;break}if(!P)return;const T=e.getPaintValue("icon-translate",o),I=e.getPaintValue("icon-translate-anchor",o);let x=e.getLayoutValue("icon-rotation-alignment",o);x===y.AUTO&&(x=e.getLayoutValue("symbol-placement",o)===_.POINT?y.VIEWPORT:y.MAP);const S=x===y.MAP,R=e.getLayoutValue("icon-keep-upright",o)&&S,D=E.isIconSDF,L=l===s.HITTEST,w=this._iconProgramOptions;w.id=L,w.sdf=D;const V=U.getMaterialProgram(n,M,w);if(m&&null!=p&&!V.compiled)return void p();n.useProgram(V),V.setUniformMatrix3fv("u_displayViewMat3",x===y.MAP?u.displayViewMat3:u.displayMat3),V.setUniformMatrix3fv("u_displayMat3",I===g.VIEWPORT?u.displayMat3:u.displayViewMat3),V.setUniform2fv("u_iconTranslation",T),V.setUniform1f("u_depth",e.z),V.setUniform1f("u_mapRotation",v(u.rotation)),V.setUniform1f("u_keepUpright",R?1:0),V.setUniform1f("u_level",10*o),V.setUniform1i("u_texture",a),V.setUniform1f("u_fadeDuration",h/1e3),L&&V.setUniform4fv("u_id",r);let A=-1;for(const a of i){if(!a.layerData.has(d))continue;if(a.key.level!==A&&(A=a.key.level,M.setDataUniforms(V,o,e,A,c)),E=a.layerData.get(d),0===E.iconPerPageElementsMap.size)continue;E.prepareForRendering(n),E.updateOpacityInfo();const i=E.iconVAO;if(null!=i){n.bindVAO(i),V.setUniformMatrix3fv("u_dvsMat3",a.transforms.dvs),V.setUniform1f("u_time",(performance.now()-E.lastOpacityUpdate)/1e3);for(const[e,i]of E.iconPerPageElementsMap)this._renderIconRange(t,V,i,e,a)}}}_renderIconRange(t,e,i,r,n){const{context:s,spriteMosaic:o}=t;this._spritesTextureSize[0]=o.getWidth(r)/4,this._spritesTextureSize[1]=o.getHeight(r)/4,e.setUniform2fv("u_mosaicSize",this._spritesTextureSize),o.bind(s,f.LINEAR,r,a),this._setStencilState(t,n),s.drawElements(u.TRIANGLES,i[1],p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),n.triangleCount+=i[1]/3}_drawText(t,e,i,a){const{context:r,displayLevel:o,drawPhase:l,glyphMosaic:f,painter:c,pixelRatio:u,spriteMosaic:d,state:p,styleLayerUID:m,requestRender:M,allowDelayedRender:E}=t,P=e.textMaterial,T=c.vectorTilesMaterialManager;let I,x=!1;for(const t of i)if(t.layerData.has(m)&&(I=t.layerData.get(m),I.glyphPerPageElementsMap.size>0)){x=!0;break}if(!x)return;const S=e.getPaintProperty("text-opacity");if(S&&!S.isDataDriven&&0===S.getValue(o))return;const R=e.getPaintProperty("text-color"),D=!R||R.isDataDriven||R.getValue(o)[3]>0,L=e.getPaintProperty("text-halo-width"),w=e.getPaintProperty("text-halo-color"),V=(!L||L.isDataDriven||L.getValue(o)>0)&&(!w||w.isDataDriven||w.getValue(o)[3]>0);if(!D&&!V)return;let A=e.getLayoutValue("text-rotation-alignment",o);A===y.AUTO&&(A=e.getLayoutValue("symbol-placement",o)===_.POINT?y.VIEWPORT:y.MAP);const N=A===y.MAP,O=e.getLayoutValue("text-keep-upright",o)&&N,b=l===s.HITTEST,z=.8*3/u;this._glyphTextureSize||(this._glyphTextureSize=U(f.width/4,f.height/4));const k=e.getPaintValue("text-translate",o),C=e.getPaintValue("text-translate-anchor",o),G=this._sdfProgramOptions;G.id=b;const F=T.getMaterialProgram(r,P,G);if(E&&null!=M&&!F.compiled)return void M();r.useProgram(F),F.setUniformMatrix3fv("u_displayViewMat3",A===y.MAP?p.displayViewMat3:p.displayMat3),F.setUniformMatrix3fv("u_displayMat3",C===g.VIEWPORT?p.displayMat3:p.displayViewMat3),F.setUniform2fv("u_textTranslation",k),F.setUniform1f("u_depth",e.z+152587890625e-16),F.setUniform2fv("u_mosaicSize",this._glyphTextureSize),F.setUniform1f("u_mapRotation",v(p.rotation)),F.setUniform1f("u_keepUpright",O?1:0),F.setUniform1f("u_level",10*o),F.setUniform1i("u_texture",n),F.setUniform1f("u_antialiasingWidth",z),F.setUniform1f("u_fadeDuration",h/1e3),b&&F.setUniform4fv("u_id",a);let W=-1;for(const a of i){if(!a.layerData.has(m))continue;if(a.key.level!==W&&(W=a.key.level,P.setDataUniforms(F,o,e,W,d)),I=a.layerData.get(m),0===I.glyphPerPageElementsMap.size)continue;I.prepareForRendering(r),I.updateOpacityInfo();const i=I.textVAO;if(null==i)continue;r.bindVAO(i),F.setUniformMatrix3fv("u_dvsMat3",a.transforms.dvs),this._setStencilState(t,a);const n=(performance.now()-I.lastOpacityUpdate)/1e3;F.setUniform1f("u_time",n),I.glyphPerPageElementsMap.forEach(((t,e)=>{this._renderGlyphRange(r,t,e,f,F,V,D,a)}))}}_renderGlyphRange(t,e,i,a,r,s,o,l){a.bind(t,f.LINEAR,i,n),s&&(r.setUniform1f("u_halo",1),t.drawElements(u.TRIANGLES,e[1],p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*e[0]),l.triangleCount+=e[1]/3),o&&(r.setUniform1f("u_halo",0),t.drawElements(u.TRIANGLES,e[1],p.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*e[0]),l.triangleCount+=e[1]/3)}_setStencilState(t,e){const{context:i,is3D:a,stencilSymbols:r}=t;if(i.setStencilTestEnabled(!0),r)return i.setStencilWriteMask(255),void i.setStencilFunction(c.ALWAYS,e.stencilRef,255);i.setStencilWriteMask(0),a?i.setStencilFunction(c.EQUAL,e.stencilRef,255):i.setStencilFunction(c.GREATER,255,255)}}export{E as W,P as a,x as b,S as c,T as d,R as e};