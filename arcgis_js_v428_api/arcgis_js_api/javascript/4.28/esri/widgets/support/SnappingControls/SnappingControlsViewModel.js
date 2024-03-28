// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../../chunks/tslib.es6 ../../../core/Accessor ../../../core/Error ../../../core/reactiveUtils ../../../core/accessorSupport/decorators/property ../../../core/accessorSupport/ensureType ../../../core/arrayUtils ../../../core/has ../../../core/accessorSupport/decorators/subclass ../../../views/interactive/snapping/FeatureSnappingLayerSource ../../../views/interactive/snapping/SnappingOptions ../../LayerList/support/layerListUtils ./SnappingLayerListViewModel".split(" "),function(d,c,k,f,
e,q,r,t,l,m,h,n,p){c=class extends c{constructor(a){super(a);this.layerListViewModel=new p.SnappingLayerListViewModel;this.snappingOptions=new h;this.view=null}initialize(){this.addHandles([f.watch(()=>({viewModel:this.layerListViewModel,view:this.view}),({viewModel:a,view:b})=>{a.view=b},f.initial),f.watch(()=>({viewModel:this.layerListViewModel,sources:this.snappingOptions?.featureSources}),({viewModel:a,sources:b})=>{a.featureSnappingSources=b},f.initial)])}get allLayersEnabled(){return(this.layerListViewModel?.selectableItems??
[]).every(a=>a.enabled)}get allLayersDisabled(){return(this.layerListViewModel?.selectableItems??[]).every(a=>!a.enabled)}get layersEnabledCount(){return this.layerListViewModel?.selectableItems?.filter(a=>a.enabled).length??0}get state(){return this.snappingOptions?"ready":"disabled"}toggleSnappingForLayers(a,b){a?.forEach(g=>b?this.enableSnappingForLayer(g):this.disableSnappingForLayer(g))}toggleSnappingForAllLayers(a){this.layerListViewModel.selectableItems.forEach(({layer:{id:b}})=>{a?this.enableSnappingForLayer(b):
this.disableSnappingForLayer(b)})}enableSnappingForLayer(a){(this._findSnappingSourceForLayer(a)??this._makeSnappingSourceForLayer(a)).enabled=!0}disableSnappingForLayer(a){if(a=this._findSnappingSourceForLayer(a))a.enabled=!1}updateEnabledFeatureSources(a){for(const b of this.snappingOptions.featureSources)n.canDisplayLayer(b.layer)&&(b.enabled=a.includes(b.layer.id))}_findSnappingSourceForLayer(a){return this.snappingOptions.featureSources.find(b=>b.layer.id===a)}_makeSnappingSourceForLayer(a){var b=
this.layerListViewModel.operationalItemsFlat.find(g=>g.layer.id===a)?.layer;if(!b)throw new k("snapping-controls:layer-not-found",`cannot enable snapping for layer with id ${a} because no such layer was found in the view`);b=new m({layer:b});this.snappingOptions.featureSources.add(b);return b}};d.__decorate([e.property()],c.prototype,"allLayersEnabled",null);d.__decorate([e.property()],c.prototype,"allLayersDisabled",null);d.__decorate([e.property({constructOnly:!0})],c.prototype,"layerListViewModel",
void 0);d.__decorate([e.property()],c.prototype,"layersEnabledCount",null);d.__decorate([e.property({type:h,nonNullable:!0})],c.prototype,"snappingOptions",void 0);d.__decorate([e.property()],c.prototype,"state",null);d.__decorate([e.property()],c.prototype,"view",void 0);return c=d.__decorate([l.subclass("esri.widgets.support.SnappingControls.SnappingControlsViewModel")],c)});