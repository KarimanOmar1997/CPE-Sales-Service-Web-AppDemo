// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../chunks/tslib.es6 ../core/JSONSupport ../core/screenUtils ../core/accessorSupport/decorators/property ../core/accessorSupport/decorators/cast ../core/arrayUtils ../core/has ../core/accessorSupport/decorators/subclass ./support/textUtils".split(" "),function(b,a,h,c,k,m,n,l,e){var f;a=f=class extends a.JSONSupport{constructor(d){super(d);this.decoration="none";this.family="sans-serif";this.size=9;this.weight=this.style="normal"}castSize(d){return h.toPt(d)}clone(){return new f({decoration:this.decoration,
family:this.family,size:this.size,style:this.style,weight:this.weight})}hash(){return`${this.decoration}.${this.family}.${this.size}.${this.style}.${this.weight}`}};b.__decorate([c.property({type:e.fontDecorations,json:{default:"none",write:!0}})],a.prototype,"decoration",void 0);b.__decorate([c.property({type:String,json:{write:!0}})],a.prototype,"family",void 0);b.__decorate([c.property({type:Number,json:{write:{overridePolicy(d,p,g){return{enabled:!g||!g.textSymbol3D}}}}})],a.prototype,"size",
void 0);b.__decorate([k.cast("size")],a.prototype,"castSize",null);b.__decorate([c.property({type:e.fontStyles,json:{default:"normal",write:!0}})],a.prototype,"style",void 0);b.__decorate([c.property({type:e.fontWeights,json:{default:"normal",write:!0}})],a.prototype,"weight",void 0);return a=f=b.__decorate([l.subclass("esri.symbols.Font")],a)});