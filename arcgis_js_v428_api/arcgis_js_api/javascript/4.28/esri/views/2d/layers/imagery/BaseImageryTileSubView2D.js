// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/tslib.es6 ../../../../geometry ../../../../core/Accessor ../../../../core/Logger ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators/property ../../../../core/accessorSupport/ensureType ../../../../core/arrayUtils ../../../../core/has ../../../../core/accessorSupport/decorators/subclass ../../../../core/support/UpdatingHandles ../../../../geometry/Point ../../../../layers/support/PixelBlock ../../../../layers/support/TileInfo ../../../../layers/support/rasterDatasets/RawBlockCache ../../../../layers/support/rasterFunctions/rasterProjectionHelper ../../tiling/TileInfoView ../../tiling/TileKey ../../tiling/TileQueue ../../tiling/TileStrategy ../../engine/webgl/definitions ../../../webgl/capabilities ../../../../geometry/Extent".split(" "),
function(g,h,K,y,t,q,k,L,M,N,z,A,B,C,u,l,v,D,O,E,w,r,F,G){const H=[0,0];g.BaseImageryTileSubView2D=class extends y{constructor(){super(...arguments);this._updatingHandles=new A.UpdatingHandles;this._blockCacheRegistryId=this._blockCacheRegistryUrl=this._fetchQueue=this._tileInfoView=this._tileStrategy=this._emptyTilePixelBlock=null;this._srcResolutions=[];this.previousLOD=null;this._needBlockCacheUpdate=!1;this._abortController=this._symbolizerParams=this._globalSymbolizerParams=null;this._isCustomTilingScheme=
!1;this._maxIndexedColormapSize=0;this._rasterFunctionState="na";this.attached=this._globalUpdateRequested=!1;this.timeExtent=null;this.redrawOrRefetch=q.debounce(async(a={})=>{if(this.previousLOD&&!this.layerView.suspended){var b=this._rasterFunctionState;a.reprocess&&(await this._updatingHandles.addPromise(this.layer.updateRasterFunction()),this.updateRasterFunctionParameters());var c=this._rasterFunctionState,{type:d}=this;return a.refetch||"raster"!==d&&a.reprocess||"cpu"===c||"cpu"===b?this._updatingHandles.addPromise(this.doRefresh()):
this._updatingHandles.addPromise(this._redrawImage(a.signal))}})}destroy(){this._updatingHandles.destroy()}get useWebGLForProcessing(){return this._get("useWebGLForProcessing")??!0}set useWebGLForProcessing(a){this._set("useWebGLForProcessing",a)}get useProgressiveUpdate(){return this._get("useProgressiveUpdate")??!0}set useProgressiveUpdate(a){if(this._tileStrategy&&this.useProgressiveUpdate!==a){this._tileStrategy.destroy();this.container.removeAllChildren();const b=this._getCacheSize(a);this._tileStrategy=
new w({cachePolicy:"purge",acquireTile:c=>this.acquireTile(c),releaseTile:c=>this.releaseTile(c),cacheSize:b,tileInfoView:this._tileInfoView});this._set("useProgressiveUpdate",a);this.layerView.requestUpdate()}}update(a){this._fetchQueue.pause();this._fetchQueue.state=a.state;this._tileStrategy.update(a);this._fetchQueue.resume();const {extent:b,resolution:c,scale:d}=a.state;a=this._tileInfoView.getClosestInfoForScale(d);if(this.layer.raster){if(!this.useProgressiveUpdate||this._needBlockCacheUpdate){const f=
this._srcResolutions[a.level],e=b.toJSON?b:G.fromJSON(b);l.update(this._blockCacheRegistryUrl,this._blockCacheRegistryId,e,c,f,this.layer.raster.ioConfig.sampling)}this._needBlockCacheUpdate=!1;this.previousLOD?.level!==a.level&&(this.previousLOD=a,null==this._symbolizerParams||this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._tileStrategy.updateCacheSize(0))}}moveEnd(){if(this.layerView.hasTilingEffects||!this.useProgressiveUpdate)this._abortController&&this._abortController.abort(),
this._abortController=new AbortController,0===this._fetchQueue.length&&this._redrawImage(this._abortController.signal).then(()=>{this._globalUpdateRequested=!1;this.layerView.requestUpdate()});const a=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy.updateCacheSize(a);this.layerView.requestUpdate()}get updating(){return this._globalUpdateRequested||this._updatingHandles?.updating}attach(){var a=F.getWebGLCapabilities("2d");this._maxIndexedColormapSize=4*(a.maxTextureSize||4096);a.supportsTextureFloat||
(this.useWebGLForProcessing=!1);this._initializeTileInfo();this._tileInfoView=new D(this.layerView.tileInfo,this.layerView.fullExtent);a=this._computeFetchConcurrency();this._fetchQueue=new E({tileInfoView:this._tileInfoView,concurrency:a,process:(b,c)=>this._fetchTile(b,c)});a=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy=new w({cachePolicy:"purge",acquireTile:b=>this.acquireTile(b),releaseTile:b=>this.releaseTile(b),cacheSize:a,tileInfoView:this._tileInfoView});this._updateBlockCacheRegistry()}detach(){this._tileStrategy.destroy();
this._fetchQueue.clear();this.container.removeAllChildren();this._fetchQueue=this._tileStrategy=this._tileInfoView=null;l.unregister(this._blockCacheRegistryUrl,this._blockCacheRegistryId);this._blockCacheRegistryUrl=this._blockCacheRegistryId=null}acquireTile(a){a=this.container.createTile(a);this._updatingHandles.addPromise(this._enqueueTileFetch(a));this.layerView.requestUpdate();this._needBlockCacheUpdate=!0;this._globalUpdateRequested=this.layerView.hasTilingEffects||!this.useProgressiveUpdate;
return a}releaseTile(a){this._fetchQueue.abort(a.key.id);this.container.removeChild(a);a.once("detach",()=>{a.destroy();this.layerView.requestUpdate()});this.layerView.requestUpdate()}createEmptyTilePixelBlock(a=null){const b=null==a||a.join(",")===this._tileInfoView.tileInfo.size.join(",");if(b&&null!=this._emptyTilePixelBlock)return this._emptyTilePixelBlock;a=a||this._tileInfoView.tileInfo.size;const [c,d]=a;a=new C({width:c,height:d,pixels:[new Uint8Array(c*d)],mask:new Uint8Array(c*d),pixelType:"u8"});
b&&(this._emptyTilePixelBlock=a);return a}_getBandIds(){if(!("rasterFunctionChain"in this.container&&this.container.rasterFunctionChain))return this.layer.bandIds;const {bandIds:a,raster:b}=this.layer,c="rasterFunction"in b?b.rasterFunction.rawInputBandIds:null;return a?.length&&c?.length&&1!==b.rasterInfo.bandCount?a.map(d=>c[Math.min(d,c.length-1)]):a||c}updateRasterFunctionParameters(){}_fetchTile(a,b){b=null!=b?b.signal:null;const c=this.canUseWebGLForProcessing(),{layerView:d}=this,{tileInfo:f}=
d,e=!f.isWrappable&&null!=v.getWorldWidth(d.view.spatialReference);return this.fetchTile(a,{allowPartialFill:!0,datumTransformation:d.datumTransformation,interpolation:c?"nearest":this.layer.interpolation,registryId:this._blockCacheRegistryId,requestRawData:c&&this.layer.raster.hasUniqueSourceStorageInfo,skipRasterFunction:"raster"===this.type&&null!=this.container.rasterFunctionChain,signal:b,srcResolution:this._srcResolutions[a.level],timeExtent:d.timeExtent,tileInfo:f,disableWrapAround:e})}_getCacheSize(a){return a?
40:0}_initializeTileInfo(){const {layerView:a}=this;var b=a.view.spatialReference;if(this._canUseLayerLODs()){const {origin:I,lods:x}=this.layer.tileInfo;var c=x.map(({scale:p})=>p);b=u.create({spatialReference:b,size:r.tileSize,scales:c,origin:I});a.set("tileInfo",b);this._srcResolutions=x.map(({resolution:p})=>({x:p,y:p}))}else{var {scales:d,srcResolutions:f,isCustomTilingScheme:e}=v.computeProjectedScales(this.layer.rasterInfo,b,{tileSize:r.tileSize,alignGlobalDatasetWithAGOL:!0,limitToSrcResolution:!1});
c=u.create({spatialReference:b,size:r.tileSize,scales:d});var m=0===c.origin.x,{xmin:n,ymax:J}=a.fullExtent;if(m||e&&c.origin.x>n)c.origin=new B({x:n,y:J,spatialReference:b});this._isCustomTilingScheme=e;a.set("tileInfo",c);this._srcResolutions=f??[]}}_canUseLayerLODs(){const {layer:a,layerView:b}=this;if("Map"!==a.raster.tileType)return!1;const {lods:c}=a.tileInfo,d=b.view.constraints?.effectiveLODs;return d?.length===c.length&&d.every(({scale:f},e)=>.001>Math.abs(f-c[e].scale))}_computeFetchConcurrency(){var {blockBoundary:a}=
this.layer.rasterInfo.storageInfo;a=a[a.length-1];return 64<(a.maxCol-a.minCol+1)*(a.maxRow-a.minRow+1)?2:10}async _enqueueTileFetch(a,b){if(!this._fetchQueue.has(a.key.id)){try{const c=await this._fetchQueue.push(a.key),d=this._getBandIds();let f=!this.useProgressiveUpdate||this.layerView.hasTilingEffects&&!this._globalSymbolizerParams;if(this._globalUpdateRequested&&!this.layerView.moving&&0===this._fetchQueue.length){f=!1;try{await this._redrawImage(this._abortController?.signal)}catch(n){q.isAbortError(n)&&
t.getLogger(this).error(n)}this._globalUpdateRequested=!1}!this.canUseWebGLForProcessing()&&"rasterVF"!==this.type||this.layerView.hasTilingEffects||null!=this._symbolizerParams||this._updateSymbolizerParams();const e=this._tileInfoView.getTileCoords(H,a.key),m=this._tileInfoView.getTileResolution(a.key);await this.updateTileSource(a,{source:c,symbolizerParams:this._symbolizerParams,globalSymbolizerParams:this._globalSymbolizerParams,suspended:f,bandIds:d,coords:e,resolution:m});a.once("attach",()=>
this.layerView.requestUpdate());this.container.addChild(a)}catch(c){q.isAbortError(c)||t.getLogger(this).error(c)}this.layerView.requestUpdate()}}async _redrawImage(a){0!==this.container.children.length&&(await this.layer.updateRenderer(),this.layerView.hasTilingEffects?await this._updateGlobalSymbolizerParams(a):(this._updateSymbolizerParams(),this._globalSymbolizerParams=null),a=this.container.children.map(async b=>this.updateTileSymbolizerParameters(b,{local:this._symbolizerParams,global:this._globalSymbolizerParams})),
await Promise.allSettled(a),this.container.requestRender())}async _updateGlobalSymbolizerParams(a){a=await this.layer.fetchPixels(this.layerView.view.extent,this.layerView.view.width,this.layerView.view.height,{srcResolution:this._srcResolutions[this.previousLOD.level],registryId:this._blockCacheRegistryId,signal:a});if(a?.pixelBlock){var {resolution:b}=this.previousLOD,c=this._getBandIds();a=this.layer.symbolizer.generateWebGLParameters({pixelBlock:a.pixelBlock.extractBands(c),isGCS:this.layerView.view.spatialReference.isGeographic,
resolution:{x:b,y:b},bandIds:c});!this.canUseWebGLForProcessing()&&a&&"stretch"===a.type&&this.layer.renderer&&"raster-stretch"===this.layer.renderer.type&&(a.factor=a.factor.map(d=>255*d),a.outMin=Math.round(255*a.outMin),a.outMax=Math.round(255*a.outMax));this._globalSymbolizerParams=a}}_updateSymbolizerParams(){const {resolution:a}=this.previousLOD,b=this._getBandIds();this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null,isGCS:this.layerView.view.spatialReference.isGeographic,
resolution:{x:a,y:a},bandIds:b})}_updateBlockCacheRegistry(a=!1){const {layer:b,layerView:c}=this,{url:d,raster:f}=b;var {multidimensionalDefinition:e}=b.normalizeRasterFetchOptions({multidimensionalDefinition:b.multidimensionalDefinition,timeExtent:c.timeExtent});e=f.rasterInfo.multidimensionalInfo?f.getSliceIndex(e):null;e=l.getRasterId(d,e);if(e!==this._blockCacheRegistryUrl){null!=this._blockCacheRegistryUrl&&l.unregister(this._blockCacheRegistryUrl,this._blockCacheRegistryId);this._blockCacheRegistryId=
l.register(e,f.rasterInfo);if(a){({view:a}=c);const m=this._tileInfoView.getClosestInfoForScale(a.scale);l.update(e,this._blockCacheRegistryId,a.extent,a.resolution,this._srcResolutions[m.level],f.ioConfig.sampling)}this._blockCacheRegistryUrl=e}}async doRefresh(){if(this.attached){await this.layer.updateRenderer();this.layerView.hasTilingEffects||this._updateSymbolizerParams();this._updateBlockCacheRegistry(!0);this._fetchQueue.reset();var a=[];this._globalUpdateRequested=this.layerView.hasTilingEffects||
!this.useProgressiveUpdate;this._tileStrategy.refresh(b=>a.push(this._enqueueTileFetch(b)));await this._updatingHandles.addPromise(Promise.allSettled(a))}}};h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"_globalUpdateRequested",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"attached",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"container",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"layer",void 0);
h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"layerView",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"type",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"useWebGLForProcessing",null);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"useProgressiveUpdate",null);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,"timeExtent",void 0);h.__decorate([k.property()],g.BaseImageryTileSubView2D.prototype,
"updating",null);g.BaseImageryTileSubView2D=h.__decorate([z.subclass("esri.views.2d.layers.imagery.BaseImageryTileSubView2D")],g.BaseImageryTileSubView2D);Object.defineProperty(g,Symbol.toStringTag,{value:"Module"})});