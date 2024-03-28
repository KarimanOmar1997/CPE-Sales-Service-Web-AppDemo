// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define(["exports","./defaultSymbolComplexity","./interfaces","./Loadable"],function(d,e,f,g){class h extends g.Loadable{constructor(a,b,c){super(b);this.symbol=a;this._convert=c;this.symbologySnappingSupported=!1;this.graphics3DSymbol=null;this.referenced=0}getSymbolLayerSize(a){return null!=this.graphics3DSymbol?this.graphics3DSymbol.getSymbolLayerSize(a):null}get symbolLayers(){return null!=this.graphics3DSymbol?this.graphics3DSymbol.symbolLayers:[]}get extentPadding(){return null!=this.graphics3DSymbol?
this.graphics3DSymbol.extentPadding:0}async doLoad(a){a=await this.symbol.fetchSymbol({signal:a});a.id=this.symbol.id;this.graphics3DSymbol=this._convert(a);null!=this.graphics3DSymbol&&await this.graphics3DSymbol.load()}createGraphics3DGraphic(a){return null!=this.graphics3DSymbol?this.graphics3DSymbol.createGraphics3DGraphic(a,this):null}get complexity(){return null!=this.graphics3DSymbol?this.graphics3DSymbol.complexity:e.emptySymbolComplexity}globalPropertyChanged(a,b){return null!=this.graphics3DSymbol?
this.graphics3DSymbol.globalPropertyChanged(a,b):!1}applyRendererDiff(a,b){return null!=this.graphics3DSymbol?this.graphics3DSymbol.applyRendererDiff(a,b):f.ApplyRendererDiffResult.RecreateSymbol}prepareSymbolPatch(a){null!=this.graphics3DSymbol&&this.graphics3DSymbol.prepareSymbolPatch(a)}updateGeometry(a,b){return null!=this.graphics3DSymbol?this.graphics3DSymbol.updateGeometry(a,b):!1}updateTransform(a,b,c,k){return this.graphics3DSymbol?.updateTransform(a,b,c,k)??!1}onRemoveGraphic(){}getFastUpdateStatus(){return null!=
this.graphics3DSymbol?this.graphics3DSymbol.getFastUpdateStatus():{loading:1,fast:0,slow:0}}destroy(){null!=this.graphics3DSymbol&&this.graphics3DSymbol.destroy();this.graphics3DSymbol=void 0;super.destroy()}get destroyed(){return void 0===this.graphics3DSymbol}}d.Graphics3DWebStyleSymbol=h;Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});