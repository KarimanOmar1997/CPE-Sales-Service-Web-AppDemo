/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.28/esri/copyright.txt for details.
*/
import{_ as s}from"../../chunks/tslib.es6.js";import{clone as t}from"../../core/lang.js";import{property as o}from"../../core/accessorSupport/decorators/property.js";import"../../chunks/ensureType.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";import i from"./Element.js";import r from"../../popup/support/RelatedRecordsInfoFieldOrder.js";import"../../chunks/typedArrayUtil.js";import"../../chunks/Logger.js";import"../../config.js";import"../../chunks/utils.js";import"../../chunks/handleUtils.js";import"../../chunks/metadata.js";import"../../core/Error.js";import"../../chunks/tracking.js";import"../../core/JSONSupport.js";import"../../core/Accessor.js";import"../../core/Handles.js";import"../../chunks/maybe.js";import"../../chunks/ObjectPool.js";import"../../chunks/ObservableBase.js";import"../../core/scheduling.js";import"../../chunks/nextTick.js";import"../../chunks/PooledArray.js";import"../../core/promiseUtils.js";import"../../chunks/time.js";var p;let n=p=class extends i{constructor(s){super(s),this.displayCount=null,this.displayType="list",this.editableExpression=null,this.orderByFields=null,this.relationshipId=null,this.type="relationship"}clone(){return new p({description:this.description,displayCount:this.displayCount,displayType:this.displayType,editableExpression:this.editableExpression,label:this.label,orderByFields:t(this.orderByFields),relationshipId:this.relationshipId,visibilityExpression:this.visibilityExpression})}};s([o({type:Number,json:{write:!0}})],n.prototype,"displayCount",void 0),s([o({type:["list"],json:{write:!0}})],n.prototype,"displayType",void 0),s([o({type:String,json:{write:!0}})],n.prototype,"editableExpression",void 0),s([o({type:[r],json:{write:!0}})],n.prototype,"orderByFields",void 0),s([o({type:Number,json:{write:!0}})],n.prototype,"relationshipId",void 0),s([o({type:["relationship"],json:{read:!1,write:!0}})],n.prototype,"type",void 0),n=p=s([e("esri.form.elements.RelationshipElement")],n);const l=n;export{l as default};