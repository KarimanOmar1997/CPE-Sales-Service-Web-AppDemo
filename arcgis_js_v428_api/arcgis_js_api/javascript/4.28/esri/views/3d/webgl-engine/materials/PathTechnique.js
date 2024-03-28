// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("require exports ../../../../chunks/tslib.es6 ../../../../chunks/vec3f64 ../../../ViewingMode ../core/shaderLibrary/ShaderOutput ../core/shaderLibrary/attributes/PathVertexPosition.glsl ../core/shaderLibrary/shading/Normals.glsl ../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../core/shaderTechnique/ReloadableShaderModule ../core/shaderTechnique/ShaderTechnique ../core/shaderTechnique/ShaderTechniqueConfiguration ../lib/OrderIndependentTransparency ../lib/Program ../lib/StencilUtils ../lib/TransparencyPassType ../lib/VertexAttribute ./DefaultTechniqueConfiguration ../../../../chunks/Path.glsl ../../../webgl/renderState".split(" "),
function(w,f,b,h,x,k,y,p,z,A,B,c,l,C,t,m,g,D,E,n){const u=new Map([[g.VertexAttribute.POSITION,0],[g.VertexAttribute.PROFILERIGHT,1],[g.VertexAttribute.PROFILEUP,2],[g.VertexAttribute.PROFILEVERTEXANDNORMAL,3],[g.VertexAttribute.FEATUREVALUE,4]]);class F extends y.PathVertexPositionPassParameters{constructor(){super(...arguments);this.ambient=h.fromValues(.2,.2,.2);this.diffuse=h.fromValues(.8,.8,.8);this.specular=h.fromValues(0,0,0);this.opacity=1;this.origin=h.create();this.modelTransformation=
null}}class q extends B.ShaderTechnique{initializeConfiguration(e,d){d.spherical=e.viewingMode===x.ViewingMode.Global;d.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result}initializeProgram(e){return new C.Program(e.rctx,q.shader.get().build(this.configuration),u)}initializePipeline(){const e=this.configuration.transparencyPassType,d=this.configuration,r=e===m.TransparencyPassType.NONE,v=e===m.TransparencyPassType.FrontFace;return n.makePipelineState({blending:d.output!==
k.ShaderOutput.Color&&d.output!==k.ShaderOutput.Alpha||!d.transparent?null:r?l.blendingDefault:l.oitBlending(e),culling:d.hasSlicePlane&&!d.transparent&&d.doubleSidedMode!==p.NormalsDoubleSidedMode.None?n.frontFaceCullingParams:null,depthTest:{func:l.oitDepthTest(e)},depthWrite:r||v?n.defaultDepthWriteParams:null,colorWrite:n.defaultColorWriteParams,stencilWrite:d.hasOccludees?t.stencilWriteMaskOn:null,stencilTest:d.hasOccludees?t.stencilBaseAllZerosParams:null,polygonOffset:r||v?null:l.OITPolygonOffset})}}
q.shader=new A.ReloadableShaderModule(E.Path,()=>new Promise((e,d)=>w(["../shaders/Path.glsl"],e,d)));class a extends D.DefaultTechniqueConfiguration{constructor(){super(...arguments);this.output=k.ShaderOutput.Color;this.doubleSidedMode=p.NormalsDoubleSidedMode.None;this.transparencyPassType=m.TransparencyPassType.NONE;this.doublePrecisionRequiresObfuscation=this.cullAboveGround=this.multipassEnabled=this.hasOccludees=this.transparent=this.hasSlicePlane=this.vvOpacity=this.vvColor=this.vvSize=this.receiveAmbientOcclusion=
this.receiveShadows=this.spherical=!1}}b.__decorate([c.parameter({count:k.ShaderOutput.COUNT})],a.prototype,"output",void 0);b.__decorate([c.parameter({count:p.NormalsDoubleSidedMode.COUNT})],a.prototype,"doubleSidedMode",void 0);b.__decorate([c.parameter({count:m.TransparencyPassType.COUNT})],a.prototype,"transparencyPassType",void 0);b.__decorate([c.parameter()],a.prototype,"spherical",void 0);b.__decorate([c.parameter()],a.prototype,"receiveShadows",void 0);b.__decorate([c.parameter()],a.prototype,
"receiveAmbientOcclusion",void 0);b.__decorate([c.parameter()],a.prototype,"vvSize",void 0);b.__decorate([c.parameter()],a.prototype,"vvColor",void 0);b.__decorate([c.parameter()],a.prototype,"vvOpacity",void 0);b.__decorate([c.parameter()],a.prototype,"hasSlicePlane",void 0);b.__decorate([c.parameter()],a.prototype,"transparent",void 0);b.__decorate([c.parameter()],a.prototype,"hasOccludees",void 0);b.__decorate([c.parameter()],a.prototype,"multipassEnabled",void 0);b.__decorate([c.parameter()],
a.prototype,"cullAboveGround",void 0);b.__decorate([c.parameter()],a.prototype,"doublePrecisionRequiresObfuscation",void 0);b.__decorate([c.parameter({constValue:!1})],a.prototype,"occlusionPass",void 0);b.__decorate([c.parameter({constValue:z.PBRMode.Disabled})],a.prototype,"pbrMode",void 0);b.__decorate([c.parameter({constValue:!0})],a.prototype,"hasVvInstancing",void 0);b.__decorate([c.parameter({constValue:!1})],a.prototype,"useCustomDTRExponentForWater",void 0);b.__decorate([c.parameter({constValue:!1})],
a.prototype,"useFillLights",void 0);b.__decorate([c.parameter({constValue:!1})],a.prototype,"hasColorTexture",void 0);f.PathPassParameters=F;f.PathTechnique=q;f.PathTechniqueConfiguration=a;f.vertexAttributeLocations=u;Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});