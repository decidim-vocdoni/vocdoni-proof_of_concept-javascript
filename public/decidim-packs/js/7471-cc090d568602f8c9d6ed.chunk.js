"use strict";(self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[]).push([[7471,1574],{57181:function(e,t,n){n.d(t,{a:function(){return f},b:function(){return p},c:function(){return s},d:function(){return m},e:function(){return v},g:function(){return c}});var i=n(90398),o=n(92584),r=n(71520),a=Object.defineProperty,u=(e,t)=>a(e,"name",{value:t,configurable:!0});function c(e,t){const n={schema:e,type:null,parentType:null,inputType:null,directiveDef:null,fieldDef:null,argDef:null,argDefs:null,objectFieldDefs:null};return(0,r.f)(t,(t=>{var o,r;switch(t.kind){case"Query":case"ShortQuery":n.type=e.getQueryType();break;case"Mutation":n.type=e.getMutationType();break;case"Subscription":n.type=e.getSubscriptionType();break;case"InlineFragment":case"FragmentDefinition":t.type&&(n.type=e.getType(t.type));break;case"Field":case"AliasedField":n.fieldDef=n.type&&t.name?l(e,n.parentType,t.name):null,n.type=null===(o=n.fieldDef)||void 0===o?void 0:o.type;break;case"SelectionSet":n.parentType=n.type?(0,i.xC)(n.type):null;break;case"Directive":n.directiveDef=t.name?e.getDirective(t.name):null;break;case"Arguments":const a=t.prevState?"Field"===t.prevState.kind?n.fieldDef:"Directive"===t.prevState.kind?n.directiveDef:"AliasedField"===t.prevState.kind?t.prevState.name&&l(e,n.parentType,t.prevState.name):null:null;n.argDefs=a?a.args:null;break;case"Argument":if(n.argDef=null,n.argDefs)for(let e=0;e<n.argDefs.length;e++)if(n.argDefs[e].name===t.name){n.argDef=n.argDefs[e];break}n.inputType=null===(r=n.argDef)||void 0===r?void 0:r.type;break;case"EnumValue":const u=n.inputType?(0,i.xC)(n.inputType):null;n.enumValue=u instanceof i.mR?d(u.getValues(),(e=>e.value===t.name)):null;break;case"ListValue":const c=n.inputType?(0,i.tf)(n.inputType):null;n.inputType=c instanceof i.p2?c.ofType:null;break;case"ObjectValue":const f=n.inputType?(0,i.xC)(n.inputType):null;n.objectFieldDefs=f instanceof i.sR?f.getFields():null;break;case"ObjectField":const p=t.name&&n.objectFieldDefs?n.objectFieldDefs[t.name]:null;n.inputType=null===p||void 0===p?void 0:p.type;break;case"NamedType":n.type=t.name?e.getType(t.name):null}})),n}function l(e,t,n){return n===o.S.name&&e.getQueryType()===t?o.S:n===o.T.name&&e.getQueryType()===t?o.T:n===o.a.name&&(0,i.Gv)(t)?o.a:t&&t.getFields?t.getFields()[n]:void 0}function d(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return e[n]}function f(e){return{kind:"Field",schema:e.schema,field:e.fieldDef,type:g(e.fieldDef)?null:e.parentType}}function p(e){return{kind:"Directive",schema:e.schema,directive:e.directiveDef}}function s(e){return e.directiveDef?{kind:"Argument",schema:e.schema,argument:e.argDef,directive:e.directiveDef}:{kind:"Argument",schema:e.schema,argument:e.argDef,field:e.fieldDef,type:g(e.fieldDef)?null:e.parentType}}function m(e){return{kind:"EnumValue",value:e.enumValue||void 0,type:e.inputType?(0,i.xC)(e.inputType):void 0}}function v(e,t){return{kind:"Type",schema:e.schema,type:t||e.type}}function g(e){return"__"===e.name.slice(0,2)}u(c,"getTypeInfo"),u(l,"getFieldDef"),u(d,"find"),u(f,"getFieldReference"),u(p,"getDirectiveReference"),u(s,"getArgumentReference"),u(m,"getEnumValueReference"),u(v,"getTypeReference"),u(g,"isMetaField")},71520:function(e,t,n){n.d(t,{f:function(){return i}});function i(e,t){const n=[];let i=e;for(;null===i||void 0===i?void 0:i.kind;)n.push(i),i=i.prevState;for(let o=n.length-1;o>=0;o--)t(n[o])}(0,Object.defineProperty)(i,"name",{value:"forEachState",configurable:!0})},1574:function(e,t,n){n.r(t);var i=n(97480),o=(n(59361),n(78265),n(73935),Object.defineProperty),r=(e,t)=>o(e,"name",{value:t,configurable:!0});function a(e){return{options:e instanceof Function?{render:e}:!0===e?{}:e}}function u(e){const t=e.state.info.options;return(null===t||void 0===t?void 0:t.hoverTime)||500}function c(e,t){const n=e.state.info,o=t.target||t.srcElement;if(!(o instanceof HTMLElement))return;if("SPAN"!==o.nodeName||void 0!==n.hoverTimeout)return;const a=o.getBoundingClientRect(),c=r((function(){clearTimeout(n.hoverTimeout),n.hoverTimeout=setTimeout(f,p)}),"onMouseMove"),d=r((function(){i.C.off(document,"mousemove",c),i.C.off(e.getWrapperElement(),"mouseout",d),clearTimeout(n.hoverTimeout),n.hoverTimeout=void 0}),"onMouseOut"),f=r((function(){i.C.off(document,"mousemove",c),i.C.off(e.getWrapperElement(),"mouseout",d),n.hoverTimeout=void 0,l(e,a)}),"onHover"),p=u(e);n.hoverTimeout=setTimeout(f,p),i.C.on(document,"mousemove",c),i.C.on(e.getWrapperElement(),"mouseout",d)}function l(e,t){const n=e.coordsChar({left:(t.left+t.right)/2,top:(t.top+t.bottom)/2}),i=e.state.info.options,o=i.render||e.getHelper(n,"info");if(o){const r=e.getTokenAt(n,!0);if(r){const a=o(r,i,e,n);a&&d(e,t,a)}}}function d(e,t,n){const o=document.createElement("div");o.className="CodeMirror-info",o.appendChild(n),document.body.appendChild(o);const a=o.getBoundingClientRect(),u=window.getComputedStyle(o),c=a.right-a.left+parseFloat(u.marginLeft)+parseFloat(u.marginRight),l=a.bottom-a.top+parseFloat(u.marginTop)+parseFloat(u.marginBottom);let d=t.bottom;l>window.innerHeight-t.bottom-15&&t.top>window.innerHeight-t.bottom&&(d=t.top-l),d<0&&(d=t.bottom);let f,p=Math.max(0,window.innerWidth-c-15);p>t.left&&(p=t.left),o.style.opacity="1",o.style.top=d+"px",o.style.left=p+"px";const s=r((function(){clearTimeout(f)}),"onMouseOverPopup"),m=r((function(){clearTimeout(f),f=setTimeout(v,200)}),"onMouseOut"),v=r((function(){i.C.off(o,"mouseover",s),i.C.off(o,"mouseout",m),i.C.off(e.getWrapperElement(),"mouseout",m),o.style.opacity?(o.style.opacity="0",setTimeout((()=>{o.parentNode&&o.parentNode.removeChild(o)}),600)):o.parentNode&&o.parentNode.removeChild(o)}),"hidePopup");i.C.on(o,"mouseover",s),i.C.on(o,"mouseout",m),i.C.on(e.getWrapperElement(),"mouseout",m)}i.C.defineOption("info",!1,((e,t,n)=>{if(n&&n!==i.C.Init){const t=e.state.info.onMouseOver;i.C.off(e.getWrapperElement(),"mouseover",t),clearTimeout(e.state.info.hoverTimeout),delete e.state.info}if(t){const n=e.state.info=a(t);n.onMouseOver=c.bind(null,e),i.C.on(e.getWrapperElement(),"mouseover",n.onMouseOver)}})),r(a,"createState"),r(u,"getHoverTime"),r(c,"onMouseOver"),r(l,"onMouseHover"),r(d,"showPopup")},57471:function(e,t,n){n.r(t);var i=n(90398),o=n(97480),r=n(57181),a=(n(1574),n(59361),n(78265),n(73935),n(92584),n(71520),Object.defineProperty),u=(e,t)=>a(e,"name",{value:t,configurable:!0});function c(e,t,n){l(e,t,n),p(e,t,n,t.type)}function l(e,t,n){var i;const o=(null===(i=t.fieldDef)||void 0===i?void 0:i.name)||"";"__"!==o.slice(0,2)&&(m(e,t,n,t.parentType),y(e,".")),y(e,o,"field-name",n,(0,r.a)(t))}function d(e,t,n){var i;y(e,"@"+((null===(i=t.directiveDef)||void 0===i?void 0:i.name)||""),"directive-name",n,(0,r.b)(t))}function f(e,t,n){var i;t.directiveDef?d(e,t,n):t.fieldDef&&l(e,t,n);const o=(null===(i=t.argDef)||void 0===i?void 0:i.name)||"";y(e,"("),y(e,o,"arg-name",n,(0,r.c)(t)),p(e,t,n,t.inputType),y(e,")")}function p(e,t,n,i){y(e,": "),m(e,t,n,i)}function s(e,t,n){var i;const o=(null===(i=t.enumValue)||void 0===i?void 0:i.name)||"";m(e,t,n,t.inputType),y(e,"."),y(e,o,"enum-value",n,(0,r.d)(t))}function m(e,t,n,o){o instanceof i.bM?(m(e,t,n,o.ofType),y(e,"!")):o instanceof i.p2?(y(e,"["),m(e,t,n,o.ofType),y(e,"]")):y(e,(null===o||void 0===o?void 0:o.name)||"","type-name",n,(0,r.e)(t,o))}function v(e,t,n){const i=n.description;if(i){const n=document.createElement("div");n.className="info-description",t.renderDescription?n.innerHTML=t.renderDescription(i):n.appendChild(document.createTextNode(i)),e.appendChild(n)}g(e,t,n)}function g(e,t,n){const i=n.deprecationReason;if(i){const n=document.createElement("div");n.className="info-deprecation",t.renderDescription?n.innerHTML=t.renderDescription(i):n.appendChild(document.createTextNode(i));const o=document.createElement("span");o.className="info-deprecation-label",o.appendChild(document.createTextNode("Deprecated: ")),n.insertBefore(o,n.firstChild),e.appendChild(n)}}function y(e,t,n="",i={onClick:null},o=null){if(n){const r=i.onClick;let a;r?(a=document.createElement("a"),a.href="javascript:void 0",a.addEventListener("click",(e=>{r(o,e)}))):a=document.createElement("span"),a.className=n,a.appendChild(document.createTextNode(t)),e.appendChild(a)}else e.appendChild(document.createTextNode(t))}o.C.registerHelper("info","graphql",((e,t)=>{if(!t.schema||!e.state)return;const n=e.state,i=n.kind,o=n.step,a=(0,r.g)(t.schema,e.state);if("Field"===i&&0===o&&a.fieldDef||"AliasedField"===i&&2===o&&a.fieldDef){const e=document.createElement("div");return c(e,a,t),v(e,t,a.fieldDef),e}if("Directive"===i&&1===o&&a.directiveDef){const e=document.createElement("div");return d(e,a,t),v(e,t,a.directiveDef),e}if("Argument"===i&&0===o&&a.argDef){const e=document.createElement("div");return f(e,a,t),v(e,t,a.argDef),e}if("EnumValue"===i&&a.enumValue&&a.enumValue.description){const e=document.createElement("div");return s(e,a,t),v(e,t,a.enumValue),e}if("NamedType"===i&&a.type&&a.type.description){const e=document.createElement("div");return m(e,a,t,a.type),v(e,t,a.type),e}})),u(c,"renderField"),u(l,"renderQualifiedField"),u(d,"renderDirective"),u(f,"renderArg"),u(p,"renderTypeAnnotation"),u(s,"renderEnumValue"),u(m,"renderType"),u(v,"renderDescription"),u(g,"renderDeprecation"),u(y,"text")}}]);
//# sourceMappingURL=7471-cc090d568602f8c9d6ed.chunk.js.map