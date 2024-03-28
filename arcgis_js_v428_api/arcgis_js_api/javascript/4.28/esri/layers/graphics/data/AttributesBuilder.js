// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("./attributeSupport ./geometryUtils ../../support/fieldUtils ../../../smartMapping/statistics/support/utils ../../../statistics/utils ../../../support/arcadeOnDemand".split(" "),function(k,r,p,t,m,u){class v{constructor(b,a,d){this._fieldDataCache=new Map;this._returnDistinctMap=new Map;this.returnDistinctValues=b.returnDistinctValues??!1;this.fieldsIndex=d;this.featureAdapter=a;if((a=b.outFields)&&!a.includes("*")){this.outFields=a;b=0;for(const e of a){var c=k.getExpressionFromFieldName(e);
c=(a=this.fieldsIndex.get(c))?null:k.getWhereClause(c,d);a=a?a.name:k.getAliasFromFieldName(e)||`FIELD_EXP_${b++}`;this._fieldDataCache.set(e,{alias:a,clause:c})}}}countDistinctValues(b){if(!this.returnDistinctValues)return b.length;b.forEach(a=>this.getAttributes(a));return this._returnDistinctMap.size}getAttributes(b){b=this._processAttributesForOutFields(b);return this._processAttributesForDistinctValues(b)}getFieldValue(b,a,d){const c=d?d.name:a;let e=null;this._fieldDataCache.has(c)?e=this._fieldDataCache.get(c)?.clause:
d||(e=k.getWhereClause(a,this.fieldsIndex),this._fieldDataCache.set(c,{alias:c,clause:e}));return d?this.featureAdapter.getAttribute(b,c):e?.calculateValue(b,this.featureAdapter)}getDataValues(b,a,d=!0){const c=a.normalizationType,e=a.normalizationTotal,g=this.fieldsIndex.get(a.field),n=p.isDateOnlyField(g)||p.isTimestampOffsetField(g),q=p.isTimeOnlyField(g);return b.map(h=>{let f=a.field&&this.getFieldValue(h,a.field,this.fieldsIndex.get(a.field));a.field2?(f=`${m.processNullValue(f)}${a.fieldDelimiter}${m.processNullValue(this.getFieldValue(h,
a.field2,this.fieldsIndex.get(a.field2)))}`,a.field3&&(f=`${f}${a.fieldDelimiter}${m.processNullValue(this.getFieldValue(h,a.field3,this.fieldsIndex.get(a.field3)))}`)):"string"===typeof f&&d&&(n?f=f?(new Date(f)).getTime():null:q&&(f=f?t.timeOnlyToMilliseconds(f):null));c&&Number.isFinite(f)&&(h="field"===c&&a.normalizationField?this.getFieldValue(h,a.normalizationField,this.fieldsIndex.get(a.normalizationField)):null,f=m.getNormalizedValue(f,c,h,e));return f})}async getExpressionValues(b,a,d,c,
e){const {arcadeUtils:g}=await u.loadArcade(),n=g.hasGeometryOperations(a);n&&await g.enableGeometryOperations();const q=g.createFunction(a),h=g.getViewInfo(d),f={fields:this.fieldsIndex.fields};return b.map(l=>{l={attributes:this.featureAdapter.getAttributes(l),layer:f,geometry:n?{...r.getGeometry(c.geometryType,c.hasZ,c.hasM,this.featureAdapter.getGeometry(l)),spatialReference:d?.spatialReference}:null};l=g.createExecContext(l,h,e);return g.executeFunction(q,l)})}validateItem(b,a){this._fieldDataCache.has(a)||
this._fieldDataCache.set(a,{alias:a,clause:k.getWhereClause(a,this.fieldsIndex)});return this._fieldDataCache.get(a)?.clause?.testFeature(b,this.featureAdapter)??!1}validateItems(b,a){this._fieldDataCache.has(a)||this._fieldDataCache.set(a,{alias:a,clause:k.getWhereClause(a,this.fieldsIndex)});return this._fieldDataCache.get(a)?.clause?.testSet(b,this.featureAdapter)??!1}_processAttributesForOutFields(b){const a=this.outFields;if(!a?.length)return this.featureAdapter.getAttributes(b);const d={};for(const c of a){const {alias:e,
clause:g}=this._fieldDataCache.get(c);d[e]=g?g.calculateValue(b,this.featureAdapter):this.featureAdapter.getAttribute(b,e)}return d}_processAttributesForDistinctValues(b){if(null==b||!this.returnDistinctValues)return b;var a=this.outFields,d=[];if(a)for(const e of a){var {alias:c}=this._fieldDataCache.get(e);d.push(b[c])}else for(c in b)d.push(b[c]);a=`${(a||["*"]).join(",")}=${d.join(",")}`;d=this._returnDistinctMap.get(a)||0;this._returnDistinctMap.set(a,++d);return 1<d?null:b}}return v});