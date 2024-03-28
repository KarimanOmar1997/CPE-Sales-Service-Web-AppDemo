// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../core/asyncUtils ../../core/Collection ../../core/deprecate ../../core/Error ../../core/Evented ../../core/handleUtils ../../core/Logger ../../core/maybe ../../core/promiseUtils ../../core/reactiveUtils ../../core/accessorSupport/decorators/property ../../core/accessorSupport/ensureType ../../core/arrayUtils ../../core/has ../../core/accessorSupport/decorators/subclass ../../core/support/UpdatingHandles ../../layers/GraphicsLayer ../../layers/support/editableLayers ../../layers/support/layerUtils ../../portal/support/urlUtils ../Attachments/AttachmentsViewModel ./CreateFeaturesWorkflow ./CreateWorkflow ./deprecationUtils ./UpdateWorkflow ./workflowUtils ../FeatureForm/featureFormUtils ../FeatureForm/FeatureFormViewModel ../FeatureTemplates/FeatureTemplatesViewModel ../Sketch/SketchViewModel ../Spinner/SpinnerViewModel".split(" "),
function(g,A,x,B,u,f,C,D,y,E,l,h,W,X,Y,F,G,H,I,v,J,K,L,M,w,N,O,P,Q,R,S,T){function p(a,b,c){t.error(new u(a,b,c))}function U(a,b){return a?a.find(c=>c.layer===b):void 0}const t=D.getLogger("esri.widgets.Editor.EditorViewModel"),z=["create","create-features","update"];f=class extends f.EventedAccessor{constructor(a){super(a);this._editableItems=new x;this._sketchGraphicsLayer=new H({listMode:"hide",internal:!0});this._updateEditableItemsTask=null;this._updatingHandles=new G.UpdatingHandles;this._featureTemplatesViewModelLocked=
!1;this.activeWorkflow=null;this._activityQueue=[];this.failures=[];this.hideTemplatesForInactiveLayers=!1;this.attachmentsViewModel=new K({capabilities:{editing:!0}});this.featureFormViewModel=new Q;this.featureTemplatesViewModel=new R({disabledItemFunction:({layer:b})=>this._itemIsSuspended(b)});this.sketchViewModel=new S({layer:this._sketchGraphicsLayer});this.spinnerViewModel=new T;this.pageStack=[];this.showDiscardEditsPrompt=()=>Promise.resolve(!0);this.useDeprecatedCreateWorkflow=this._candidateCommitted=
!1;this.back=async()=>{this.canGoBack&&(this.activeWorkflow?.hasPreviousStep?await this.activeWorkflow.back(this.showDiscardEditsPrompt):await this._cancelWorkflow({force:!this.hasPendingEdits}))};this.saveWorkflow=async()=>{const {featureFormViewModel:b}=this;b.submit();if(b.submittable){var c=b.getValues();0<b.validateContingencyConstraints(c,{includeIncompleteViolations:!0}).length||await this.activeWorkflow?.save()}};this.selectFeature=(b,c=!1)=>{const d=this.activeWorkflow;this._candidateCommitted||
"update"!==d?.type||(d.data.rootFeature=b,c&&(d.next(),this._candidateCommitted=!0))}}initialize(){this.addHandles([l.watch(()=>{const a=this.view?.map?.editableLayers.filter(({parent:c,visible:d})=>c&&"visible"in c?d&&c.visible:d),b=this.view?.allLayerViews?.filter(c=>!!a?.includes(c.layer)&&!c.suspended);return[a,b,this.layerInfos,this.allowedWorkflows,this.hideTemplatesForInactiveLayers]},()=>this._updateEditableItems(),l.syncAndInitial),l.on(()=>this.activeWorkflow,"cancel",()=>this.emit("workflow-cancel")),
l.on(()=>this.activeWorkflow,"commit",()=>this.emit("workflow-commit")),l.on(()=>this.activeWorkflow,"complete",()=>{this.emit("workflow-commit");this._set("activeWorkflow",null)}),l.when(()=>this.view?.map,a=>a.add(this._sketchGraphicsLayer),l.initial),l.watch(()=>this.view?.timeZone,a=>this.featureFormViewModel.timeZone=a),l.watch(()=>this._editableItems.toArray(),()=>{const {activeWorkflow:a}=this;this.syncFeatureTemplates();if(a){var {stepId:b}=a;"create"===a.type?"awaiting-feature-creation-info"!==
b||this.canCreate||this._cancelWorkflow():"update"===a.type&&("awaiting-feature-to-update"===b&&!this.canUpdate||"awaiting-update-feature-candidate"===b&&!a.data.candidates.some(c=>{const d=this._editableItems.find(e=>e.layer===c.layer);return d&&d.supports.includes("update")}))&&this._cancelWorkflow()}}),l.watch(()=>this.page,(a,b)=>{b=[...this.pageStack];if(-1===b.indexOf(a))b.push(a);else for(;b.length&&b.at(-1)!==a;)b.pop();this.pageStack=b},l.syncAndInitial),l.when(()=>"awaiting-update-feature-candidate"===
this.state,()=>this._candidateCommitted=!1),l.on(()=>this.featureTemplatesViewModel,"select",async({item:a,oldItem:b})=>{var {activeWorkflow:c}=this;if(c){if("update"===c.type&&"awaiting-feature-creation-info"===c.activeWorkflow?.stepId)return;try{await this.cancelWorkflow({force:!this.hasPendingEdits})}catch{this.featureTemplatesViewModel.select(b,{emit:!1});return}}if(a){c={layer:a.layer,template:a.template};if(a.supportsUpload)return this.featureTemplatesViewModel.select(b,{emit:!1}),this.startCreateFeaturesWorkflow(c);
this.useDeprecatedCreateWorkflow?this.startCreateWorkflowAtFeatureCreation(c):this.startCreateFeaturesWorkflowAtFeatureCreation(c)}}),l.on(()=>this.view,"key-down",a=>{"Escape"===a.key&&this.activeWorkflow?.keyboardCancellationEnabled&&(a.stopPropagation(),this.back())})])}destroy(){this._cancelWorkflow({warnIfNoWorkflow:!1}).then(()=>{this.view?.map?.remove(this._sketchGraphicsLayer);this.view=null});this._updateEditableItemsTask=y.abortMaybe(this._updateEditableItemsTask);this._updatingHandles.destroy()}get allowedWorkflows(){return this._get("allowedWorkflows")}set allowedWorkflows(a){a&&
0!==a.length||(a=[...z]);this._set("allowedWorkflows",a)}get canCreate(){return this._editableItems.some(a=>a.supports.includes("create")&&!a.suspended)}get canUpdate(){return this._editableItems.some(({attachmentsOnUpdateEnabled:a,layer:b,supports:c,suspended:d})=>{a=!d&&(c.includes("update")||c.includes("delete")||a);c=b.parent;c=!(c&&"visible"in c)||!!c.visible;return b.visible&&c&&a})}get editableItems(){return this._editableItems}get labelOptions(){return this.sketchViewModel.labelOptions}set labelOptions(a){this.sketchViewModel.labelOptions=
a}set layerInfos(a){a?.some(b=>{"allowAttachments"in b&&B.deprecated(t,"Property: layerInfo.allowAttachments",{replacement:"layerInfo.attachmentsOnCreateEnabled or layerInfo.attachmentsOnUpdateEnabled",version:"4.26"});return!0});this._set("layerInfos",a)}get snappingOptions(){return this.sketchViewModel.snappingOptions}set snappingOptions(a){this.sketchViewModel.snappingOptions=a}get state(){if(!this.view?.ready)return"disabled";var a=this.attachmentsViewModel.mode;if("add"===a)return"adding-attachment";
if("edit"===a)return"editing-attachment";({activeWorkflow:a}=this);return a?"update"===a.type&&a.activeWorkflow?.stepId?a.activeWorkflow.stepId:a.stepId:"ready"}get syncing(){return 0<this._activityQueue.length}get updating(){return this._updatingHandles.updating||!0===this.activeWorkflow?.updating}get tooltipOptions(){return this.sketchViewModel.tooltipOptions}set tooltipOptions(a){this.sketchViewModel.tooltipOptions=a}set view(a){this.sketchViewModel.view=a;this.spinnerViewModel.view=a;this._set("view",
a)}get page(){const {activeWorkflow:a,state:b}=this;if("update"===a?.type&&"awaiting-feature-to-update"===a.stepId)return"ready";if("create-features"===a?.type&&0===a.numPendingFeatures){const c=a.data.upload;if(c)return"default"===c.state?"ready":"creating-features-upload-details"}return b??"disabled"}get featureFormDisabled(){const {activeWorkflow:a}=this;return"update"===a?.type&&!1===a.activeEditableItem?.attributeUpdatesEnabled}get canGoBack(){return null!=this.activeWorkflow&&!this.syncing}get shouldShowDeleteButton(){const {activeWorkflow:a}=
this;return!!a&&"update"===a.type&&!!a.activeEditableItem?.supports.includes("delete")}get hasPendingEdits(){return this.activeWorkflow?.hasPendingEdits??!1}async startCreateWorkflowAtFeatureTypeSelection(){w.workflowDeprecation(t,"startCreateWorkflowAtFeatureTypeSelection","startCreateFeaturesWorkflowAtFeatureTypeSelection");await l.whenOnce(()=>!this.updating);if(this.canCreate){await this._cancelWorkflow();var a=this._createCreateWorkflow();await a.start();this._set("activeWorkflow",a)}else p("editing:unsupported-workflow",
"Create workflow is unsupported or disabled.")}async startCreateFeaturesWorkflowAtFeatureTypeSelection(){return this.startCreateFeaturesWorkflow()}async startCreateWorkflowAtFeatureCreation(a){w.workflowDeprecation(t,"startCreateWorkflowAtFeatureCreation","startCreateFeaturesWorkflowAtFeatureCreation");await l.whenOnce(()=>!this.updating);if(this.canCreate){await this._cancelWorkflow();var b=this._createCreateWorkflow("awaiting-feature-to-create");b.data.creationInfo=a;await b.start();this._set("activeWorkflow",
b)}else p("editing:unsupported-workflow","Create workflow is unsupported or disabled.")}async startCreateFeaturesWorkflowAtFeatureCreation(a){return this.startCreateFeaturesWorkflow(a,"creating-features")}async startCreateFeaturesWorkflow(a,b="awaiting-feature-creation-info"){await l.whenOnce(()=>!this.updating);if(!this.canCreate)throw new u("editing:unsupported-workflow","Creating features is unsupported or disabled.");await this._cancelWorkflow();a=this._createCreateFeaturesWorkflow(a,b);await a.start();
this._set("activeWorkflow",a)}async startCreateWorkflowAtFeatureEdit(a){w.workflowDeprecation(t,"startCreateWorkflowAtFeatureEdit");await l.whenOnce(()=>!this.updating);if(this.canCreate){await this._cancelWorkflow();var b=this._createCreateWorkflow("editing-new-feature");b.data.edits.feature=a;await b.start();this._set("activeWorkflow",b)}else p("editing:unsupported-workflow","Create workflow is unsupported or disabled.")}async startCreateFeaturesWorkflowAtFeatureEdit(a){await l.whenOnce(()=>!this.updating);
({initialFeature:a}=a);var b=a.sourceLayer;b=b?this.findEditableItemForLayer(b):void 0;if(!this.canCreate||!b)throw new u("editing:unsupported-workflow","Creating features is unsupported or disabled.");await this._cancelWorkflow();a=this._createCreateFeaturesWorkflow({initialFeature:a,layer:b.layer,maxFeatures:1},"creating-features");await a.start();this._set("activeWorkflow",a)}async startUpdateWorkflowAtFeatureSelection(){await l.whenOnce(()=>!this.updating);if(this.canUpdate){await this._cancelWorkflow();
var a=this._createUpdateWorkflow();await a.start();this._set("activeWorkflow",a)}else p("editing:unsupported-workflow","Update workflow is unsupported or disabled.")}async startUpdateWorkflowAtMultipleFeatureSelection(a){await l.whenOnce(()=>!this.updating);if(this.canUpdate){await this._cancelWorkflow();var b=this._createUpdateWorkflow("awaiting-update-feature-candidate");b.data.candidates=a;await b.start();this._set("activeWorkflow",b)}else p("editing:unsupported-workflow","Update workflow is unsupported or disabled.")}async startUpdateWorkflowAtFeatureEdit(a){await l.whenOnce(()=>
!this.updating);if(this.canUpdate){await this._cancelWorkflow();var b=this._createUpdateWorkflow("editing-existing-feature");b.data.rootFeature=a;await b.start();this._set("activeWorkflow",b)}else p("editing:unsupported-workflow","Update workflow is unsupported or disabled.")}async deleteFeatureFromWorkflow(){const {activeWorkflow:a}=this;a&&"update"===a.type?await a.deleteActiveFeature():p("editing:unsupported-workflow","Deleting requires an active update workflow.")}async cancelWorkflow(a){return this._cancelWorkflow({warnIfNoWorkflow:!0,
...a})}findEditableItemForLayer(a){const b="subtype-sublayer"===a.type?a.parent:a;return this._editableItems.find(c=>c.layer===b)}itemHasInvalidFormTemplate(a){return a?this.findEditableItemForLayer(a.layer)?.hasInvalidFormTemplate??!1:!1}itemHasUnsupportedFields(a){return a?this.findEditableItemForLayer(a.layer)?.hasUnsupportedFields??!1:!1}syncFeatureTemplates(){if(!this._featureTemplatesViewModelLocked){var a=[];for(const {layer:b,supports:c}of this._editableItems)b.loaded&&c.includes("create")&&
!v.isTable(b)&&a.push(b);this.featureTemplatesViewModel.layers=a}}async toggleUpdateWorkflow(){!this.canUpdate||this.hasPendingEdits&&!await this.showDiscardEditsPrompt()||(this.activeWorkflow&&"awaiting-feature-to-update"===this.state?await this.cancelWorkflow({force:!0}):await this.startUpdateWorkflowAtFeatureSelection())}lockFeatureTemplatesViewModel(){this._featureTemplatesViewModelLocked=!0;return C.makeHandle(()=>{this._featureTemplatesViewModelLocked=!1;this.syncFeatureTemplates()})}async _updateEditableItems(){y.abortMaybe(this._updateEditableItemsTask);
const a=A.createTask(async b=>{const c=this.view?.allLayerViews;var d=this.view?.map,e=d?.editableLayers.toArray()??[];d=d?.allTables.toArray().filter(v.isFeatureLayer)??[];await Promise.allSettled(d.map(k=>k.load()));d=d.filter(k=>I.isEditableLayer(k));var n=[...e.reverse(),...d.reverse()].filter(k=>"mesh"===k.geometryType?"3d"===this.view?.type:!0);if(c&&e){e=[];d=[];for(const k of n){var m=c.find(q=>q.layer===k);n=m?e:d;m=!!m?.suspended;if(!m||!this.hideTemplatesForInactiveLayers)if("subtype-group"===
k.type){await k.loadAll();E.throwIfAborted(b);for(let q=k.sublayers.length-1;0<=q;--q)n.push(this._makeEditableItemForLayer(k.sublayers.at(q),m))}else n.push(this._makeEditableItemForLayer(k,m))}b.aborted||(b=this._editableItems,this._editableItems=new x(e.concat(d)),b.destroy())}});this._updatingHandles.addPromise(a.promise);this._updateEditableItemsTask=a}async _cancelWorkflow(a){const b=this.activeWorkflow;b?a&&!1===a.force?(await b.cancel(a),this._set("activeWorkflow",null)):(this.emit("workflow-cancel"),
this._set("activeWorkflow",null),await b.cancel(a)):a?.warnIfNoWorkflow&&p("editing:no-active-workflow","There is no active workflow to cancel.")}_createCreateFeaturesWorkflow(a,b){return L.create({viewModel:this,creationInfo:a,startAt:b,applyEditsCallback:(c,d,e)=>this._applyEdits(c,d,e),addAttachmentsCallback:(c,d)=>this._addAttachments(c,d)})}_createCreateWorkflow(a){return M.create(this,a,(b,c,d)=>this._applyEdits(b,c,d))}_createUpdateWorkflow(a){return N.create({viewModel:this,startAt:a,applyEditsCallback:(b,
c,d)=>this._applyEdits(b,c,d),addAttachmentsCallback:(b,c)=>this._addAttachments(b,c)})}_addAttachments(a,b){b=b.map(c=>this._addAttachment(a,c.feature,c.attachment))??[];return Promise.all(b)}async _addAttachment(a,b,c){let d=null;if("geojson"===a.type||"scene"===a.type||"oriented-imagery"===a.type)throw new u("editor:attachments-not-supported","Adding attachments is not supported for this layer type");await this._queueOperation(async()=>d=await a.addAttachment?.(b,c).catch(e=>{throw e?.error||e;
})??null);return d}async _applyEdits(a,b,c){let d=null;const e=a.url?await v.getOwningPortalUrl(a.url):null,n={returnServiceEditsOption:e&&J.parseKnownArcGISOnlineDomain(e)||RegExp("/hosted/","i").test(a.url)?void 0:"original-and-current-features",...c};await this._queueOperation(async()=>{const {view:m}=this;if(!m)return null;const k=await O.whenEditorLayerView(m,a).catch(()=>null);d=await a.applyEdits(b,n);k&&await l.whenOnce(()=>!k.updating);return d});return d}_queueOperation(a){this._activityQueue.push(a);
this.notifyChange("syncing");const b=(c,d)=>{c=d.indexOf(c);-1<c&&d.splice(c,1)};return a().then(c=>{if(null!=c&&"error"in c&&null!=c.error)throw c.error;if(null!=c&&"addFeatureResults"in c){const {addFeatureResults:d,deleteFeatureResults:e,updateFeatureResults:n}=c,m=d.find(k=>!!k.error)||n.find(k=>!!k.error)||e.find(k=>!!k.error);if(m)throw m.error;}return c}).catch(c=>{p("editing:operation-error","An error occurred.",{error:c});const d={error:c,retry:()=>{b(d,this.failures);return this._queueOperation(a)},
cancel:()=>{b(d,this.failures)}};this._set("failures",[...this.failures,d])}).then(()=>{b(a,this._activityQueue);this.notifyChange("syncing")})}_makeEditableItemForLayer(a,b=!0){const c=v.getEffectiveLayerCapabilities(a);var d=c?.operations;const e=U(this.layerInfos,a),n=P.formTemplateHasInvalidFields(a),m=n||b;var {allowedWorkflows:k}=this;const q=k.includes("create")||k.includes("create-features");var r=k.includes("update");k=r&&!!d?.supportsUpdate&&(!e||!1!==e.enabled&&!1!==e.updateEnabled);const V=
!m&&r&&!!d?.supportsDelete&&(!e||!1!==e.enabled&&!1!==e.deleteEnabled);r=[];q&&d?.supportsAdd&&(!e||!1!==e.enabled&&!1!==e.addEnabled)&&r.push("create");k&&r.push("update");V&&r.push("delete");d=!!c?.data?.supportsAttachment&&(!e||!1!==e.allowAttachments);return{layer:a,supports:r,suspended:b,attributeUpdatesEnabled:k&&!m&&(!e||!1!==e.attributeUpdatesEnabled),geometryUpdatesEnabled:k&&!m&&!!c?.editing?.supportsGeometryUpdate&&(!e||!1!==e.geometryUpdatesEnabled),hasAttachments:d,attachmentsOnCreateEnabled:d&&
q&&(!e||!1!==e.attachmentsOnCreateEnabled),attachmentsOnUpdateEnabled:!m&&d&&(!e||!1!==e.attachmentsOnUpdateEnabled),hasInvalidFormTemplate:n,hasUnsupportedFields:!1}}_itemIsSuspended(a){return this.findEditableItemForLayer(a)?.suspended??!1}};g.__decorate([h.property()],f.prototype,"_editableItems",void 0);g.__decorate([h.property({readOnly:!0})],f.prototype,"activeWorkflow",void 0);g.__decorate([h.property({readOnly:!0})],f.prototype,"_activityQueue",void 0);g.__decorate([h.property({value:[...z]})],
f.prototype,"allowedWorkflows",null);g.__decorate([h.property({readOnly:!0})],f.prototype,"canCreate",null);g.__decorate([h.property({readOnly:!0})],f.prototype,"canUpdate",null);g.__decorate([h.property()],f.prototype,"editableItems",null);g.__decorate([h.property({readOnly:!0})],f.prototype,"failures",void 0);g.__decorate([h.property()],f.prototype,"hideTemplatesForInactiveLayers",void 0);g.__decorate([h.property()],f.prototype,"attachmentsViewModel",void 0);g.__decorate([h.property()],f.prototype,
"featureFormViewModel",void 0);g.__decorate([h.property()],f.prototype,"featureTemplatesViewModel",void 0);g.__decorate([h.property()],f.prototype,"labelOptions",null);g.__decorate([h.property()],f.prototype,"layerInfos",null);g.__decorate([h.property()],f.prototype,"sketchViewModel",void 0);g.__decorate([h.property()],f.prototype,"snappingOptions",null);g.__decorate([h.property()],f.prototype,"spinnerViewModel",void 0);g.__decorate([h.property()],f.prototype,"state",null);g.__decorate([h.property({readOnly:!0})],
f.prototype,"syncing",null);g.__decorate([h.property()],f.prototype,"updating",null);g.__decorate([h.property()],f.prototype,"tooltipOptions",null);g.__decorate([h.property()],f.prototype,"view",null);g.__decorate([h.property()],f.prototype,"pageStack",void 0);g.__decorate([h.property()],f.prototype,"showDiscardEditsPrompt",void 0);g.__decorate([h.property()],f.prototype,"_candidateCommitted",void 0);g.__decorate([h.property()],f.prototype,"page",null);g.__decorate([h.property()],f.prototype,"featureFormDisabled",
null);g.__decorate([h.property()],f.prototype,"canGoBack",null);g.__decorate([h.property()],f.prototype,"shouldShowDeleteButton",null);g.__decorate([h.property()],f.prototype,"hasPendingEdits",null);g.__decorate([h.property()],f.prototype,"useDeprecatedCreateWorkflow",void 0);return f=g.__decorate([F.subclass("esri.widgets.Editor.EditorViewModel")],f)});