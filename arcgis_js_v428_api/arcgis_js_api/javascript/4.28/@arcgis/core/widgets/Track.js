/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as o}from"../chunks/tslib.es6.js";import{d as t}from"../core/Accessor.js";import{L as s}from"../chunks/Logger.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"../chunks/ensureType.js";import"../chunks/typedArrayUtil.js";import{subclass as r}from"../core/accessorSupport/decorators/subclass.js";import i,{l as p}from"./Widget.js";import{g as n}from"../chunks/globalCss.js";import{l}from"../chunks/legacyIcon.js";import{a as m}from"../chunks/accessibleHandler.js";import{m as a}from"../chunks/messageBundle.js";import{v as c}from"../chunks/vmEvent.js";import{t as u}from"../chunks/jsxFactory.js";import"../chunks/widgetUtils.js";import j from"./Track/TrackViewModel.js";import"../core/Handles.js";import"../chunks/maybe.js";import"../chunks/metadata.js";import"../core/lang.js";import"../chunks/utils.js";import"../chunks/handleUtils.js";import"../chunks/ObjectPool.js";import"../chunks/ObservableBase.js";import"../chunks/tracking.js";import"../core/scheduling.js";import"../chunks/nextTick.js";import"../chunks/PooledArray.js";import"../core/promiseUtils.js";import"../core/Error.js";import"../config.js";import"../chunks/time.js";import"../intl.js";import"../chunks/date.js";import"../chunks/jsonMap.js";import"../chunks/locale.js";import"../chunks/timeZoneUtils.js";import"../chunks/datetime.js";import"../chunks/messages.js";import"../request.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/JSONSupport.js";import"../chunks/assets.js";import"../chunks/domUtils.js";import"../core/Evented.js";import"../core/Promise.js";import"../core/reactiveUtils.js";import"../chunks/asyncUtils.js";import"../core/Collection.js";import"../chunks/shared.js";import"../chunks/SimpleObservable.js";import"../chunks/uuid.js";import"../core/accessorSupport/decorators/cast.js";import"../chunks/projector.js";import"../chunks/dom.js";import"../chunks/index.js";import"../chunks/jsxWidgetSupport.js";import"./support/GeolocationPositioning.js";import"../Graphic.js";import"../geometry.js";import"../geometry/Extent.js";import"../geometry/Geometry.js";import"../chunks/reader.js";import"../geometry/SpatialReference.js";import"../chunks/unitUtils.js";import"../chunks/Ellipsoid.js";import"../chunks/writer.js";import"../geometry/Point.js";import"../geometry/support/webMercatorUtils.js";import"../geometry/Multipoint.js";import"../chunks/zmUtils.js";import"../geometry/Polygon.js";import"../chunks/Axis.js";import"../chunks/extentUtils.js";import"../chunks/aaBoundingRect.js";import"../chunks/mathUtils.js";import"../chunks/vec3.js";import"../chunks/vec3f64.js";import"../chunks/common.js";import"../geometry/Polyline.js";import"../chunks/typeUtils.js";import"../geometry/support/jsonUtils.js";import"../PopupTemplate.js";import"../core/Clonable.js";import"../layers/support/fieldUtils.js";import"../core/sql.js";import"../chunks/arcadeOnDemand.js";import"../popup/content.js";import"../popup/content/AttachmentsContent.js";import"../popup/content/Content.js";import"../popup/content/CustomContent.js";import"../popup/content/ExpressionContent.js";import"../popup/ElementExpressionInfo.js";import"../popup/content/FieldsContent.js";import"../popup/FieldInfo.js";import"../chunks/enumeration.js";import"../popup/support/FieldInfoFormat.js";import"../popup/content/MediaContent.js";import"../popup/content/BarChartMediaInfo.js";import"../popup/content/mixins/ChartMediaInfo.js";import"../popup/content/mixins/MediaInfo.js";import"../popup/content/support/ChartMediaInfoValue.js";import"../Color.js";import"../chunks/colorUtils.js";import"../popup/content/support/ChartMediaInfoValueSeries.js";import"../chunks/chartMediaInfoUtils.js";import"../popup/content/ColumnChartMediaInfo.js";import"../popup/content/ImageMediaInfo.js";import"../popup/content/support/ImageMediaInfoValue.js";import"../popup/content/LineChartMediaInfo.js";import"../popup/content/PieChartMediaInfo.js";import"../popup/content/RelationshipContent.js";import"../popup/support/RelatedRecordsInfoFieldOrder.js";import"../popup/content/TextContent.js";import"../popup/ExpressionInfo.js";import"../popup/LayerOptions.js";import"../popup/RelatedRecordsInfo.js";import"../support/actions/ActionBase.js";import"../core/Identifiable.js";import"../support/actions/ActionButton.js";import"../support/actions/ActionToggle.js";import"../symbols.js";import"../symbols/CIMSymbol.js";import"../symbols/Symbol.js";import"../symbols/ExtrudeSymbol3DLayer.js";import"../symbols/Symbol3DLayer.js";import"../chunks/utils4.js";import"../symbols/edges/Edges3D.js";import"../chunks/screenUtils.js";import"../chunks/materialUtils.js";import"../chunks/opacityUtils.js";import"../symbols/edges/SketchEdges3D.js";import"../symbols/edges/SolidEdges3D.js";import"../chunks/Symbol3DMaterial.js";import"../symbols/FillSymbol.js";import"../symbols/SimpleLineSymbol.js";import"../symbols/LineSymbol.js";import"../symbols/LineSymbolMarker.js";import"../chunks/lineMarkers.js";import"../symbols/FillSymbol3DLayer.js";import"../symbols/patterns/LineStylePattern3D.js";import"../symbols/patterns/StylePattern3D.js";import"../chunks/utils5.js";import"../chunks/colors.js";import"../chunks/symbolLayerUtils3D.js";import"../chunks/aaBoundingBox.js";import"../symbols/Font.js";import"../symbols/IconSymbol3DLayer.js";import"../chunks/persistableUrlUtils.js";import"../chunks/Symbol3DAnchorPosition2D.js";import"../symbols/LabelSymbol3D.js";import"../symbols/Symbol3D.js";import"../chunks/collectionUtils.js";import"../portal/Portal.js";import"../core/Loadable.js";import"../portal/PortalGroup.js";import"../portal/PortalQueryParams.js";import"../portal/PortalQueryResult.js";import"../portal/PortalUser.js";import"../portal/PortalFolder.js";import"../symbols/LineSymbol3DLayer.js";import"../symbols/LineStyleMarker3D.js";import"../symbols/ObjectSymbol3DLayer.js";import"../symbols/PathSymbol3DLayer.js";import"../symbols/TextSymbol3DLayer.js";import"../symbols/WaterSymbol3DLayer.js";import"../symbols/support/StyleOrigin.js";import"../chunks/Thumbnail.js";import"../chunks/calloutUtils.js";import"../symbols/callouts/Callout3D.js";import"../symbols/callouts/LineCallout3D.js";import"../symbols/support/Symbol3DVerticalOffset.js";import"../symbols/LineSymbol3D.js";import"../symbols/MarkerSymbol.js";import"../symbols/MeshSymbol3D.js";import"../symbols/PictureFillSymbol.js";import"../chunks/urlUtils.js";import"../symbols/PictureMarkerSymbol.js";import"../symbols/PointSymbol3D.js";import"../symbols/PolygonSymbol3D.js";import"../symbols/SimpleFillSymbol.js";import"../symbols/SimpleMarkerSymbol.js";import"../symbols/TextSymbol.js";import"../symbols/WebStyleSymbol.js";import"../chunks/geolocationUtils.js";import"../chunks/project.js";import"../chunks/utils6.js";import"../chunks/utils7.js";import"../rest/support/ProjectParameters.js";import"./support/GoTo.js";const d={base:"esri-track",widgetIcon:l.tracking},h="esri.widgets.Track",y=s.getLogger(h);let b=class extends i{constructor(o,t){super(o,t),this.iconClass=d.widgetIcon,this.icon=null,this.messages=null,this.viewModel=new j}loadDependencies(){return p({icon:()=>import("../chunks/calcite-icon.js"),loader:()=>import("../chunks/calcite-loader.js")})}get geolocationOptions(){return this.viewModel.geolocationOptions}set geolocationOptions(o){this.viewModel.geolocationOptions=o}get goToLocationEnabled(){return this.viewModel.goToLocationEnabled}set goToLocationEnabled(o){this.viewModel.goToLocationEnabled=o}get goToOverride(){return this.viewModel.goToOverride}set goToOverride(o){this.viewModel.goToOverride=o}get graphic(){return this.viewModel.graphic}set graphic(o){this.viewModel.graphic=o}get label(){return this.messages?.widgetLabel??""}set label(o){this._overrideIfSome("label",o)}get rotationEnabled(){return this.viewModel.rotationEnabled}set rotationEnabled(o){this.viewModel.rotationEnabled=o}get scale(){return this.viewModel.scale}set scale(o){this.viewModel.scale=o}get tracking(){return this.viewModel.tracking}get useHeadingEnabled(){return t(y,"useHeadingEnabled",{replacement:"rotationEnabled",version:"4.27",warnOnce:!0}),this.viewModel.rotationEnabled}set useHeadingEnabled(o){t(y,"useHeadingEnabled",{replacement:"rotationEnabled",version:"4.27",warnOnce:!0}),this.viewModel.rotationEnabled=o}get view(){return this.viewModel.view}set view(o){this.viewModel.view=o}start(){this.viewModel.start()}stop(){this.viewModel.stop()}render(){const o=this.viewModel?.state,t={[n.disabled]:"disabled"===o,[n.hidden]:"feature-unsupported"===o},s="tracking"===o,{messages:e}=this,r=(s?e?.stopTracking:e?.startTracking)??"";return u("div",{"aria-label":r,bind:this,class:this.classes(d.base,n.widget,n.widgetButton,t),hidden:"feature-unsupported"===o,onclick:this._toggleTracking,onkeydown:this._toggleTracking,role:"button",tabIndex:0,title:r},this._renderIcon(),u("span",{class:l.fontFallbackText},r))}_renderIcon(){const{icon:o,iconClass:t,viewModel:s}=this;switch(s?.state){case"waiting":return u("calcite-loader",{inline:!0,key:"loader",label:"",scale:"s",type:"indeterminate"});case"tracking":return this._renderCalciteIcon("pause");default:return o?this._renderCalciteIcon(o):t&&t!==d.widgetIcon?this._renderLegacyIcon(t):this._renderCalciteIcon("compass-north-circle")}}_renderCalciteIcon(o){return u("calcite-icon",{icon:o,key:"icon",scale:"s"})}_renderLegacyIcon(o){return u("span",{"aria-hidden":"true",class:o,key:"legacy-icon"})}_toggleTracking(){const o=this.viewModel;o&&"feature-unsupported"!==o.state&&"disabled"!==o.state&&("tracking"!==o.state&&"waiting"!==o.state?this.viewModel.start():this.viewModel.stop())}};o([e()],b.prototype,"geolocationOptions",null),o([e()],b.prototype,"goToLocationEnabled",null),o([e()],b.prototype,"goToOverride",null),o([e()],b.prototype,"graphic",null),o([e()],b.prototype,"iconClass",void 0),o([e()],b.prototype,"icon",void 0),o([e()],b.prototype,"label",null),o([e(),a("esri/widgets/Track/t9n/Track")],b.prototype,"messages",void 0),o([e()],b.prototype,"rotationEnabled",null),o([e()],b.prototype,"scale",null),o([e({readOnly:!0})],b.prototype,"tracking",null),o([e()],b.prototype,"useHeadingEnabled",null),o([e()],b.prototype,"view",null),o([e({type:j}),c(["track","track-error"])],b.prototype,"viewModel",void 0),o([m()],b.prototype,"_toggleTracking",null),b=o([r(h)],b);const g=b;export{g as default};