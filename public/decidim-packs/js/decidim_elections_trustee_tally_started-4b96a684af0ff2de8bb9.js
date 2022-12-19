/*! For license information please see decidim_elections_trustee_tally_started-4b96a684af0ff2de8bb9.js.LICENSE.txt */
!function(){var t,e={52913:function(t,e,r){"use strict";r(86226),r(6388),r(17163),r(5239),r(29591),r(42670);var n=r(44101),o=r(71397),i=r(53374),a=r(69912);class u extends a.Q{setupElection({bulletinBoardClientParams:t,electionUniqueId:e,authorizationExpirationTimestamp:r}){return this.setupElectionWithTypesFilter({electionUniqueId:e,bulletinBoardClientParams:t,authorizationExpirationTimestamp:r,typesFilter:["create_election","start_key_ceremony","key_ceremony","end_key_ceremony","start_tally","tally","end_tally"]})}async bindEvents({onEvent:t,onBindRestoreButton:e,onBindStartButton:r,onRestore:n,onComplete:o,onStart:i,onTrusteeNeedsToBeRestored:a}){const u=this.trustee.setup();this.trustee.events.subscribe(t),r((async t=>{i(),t.preventDefault(),await u,await this.trustee.needsToBeRestored()?a():(await this.trustee.runTally(),o())})),e((async t=>{await u;const e=t.target.files[0],r=new FileReader;r.onload=async({target:t})=>{const e=t.result;await this.trustee.restore(e)&&(n(),await this.trustee.runTally(),o())},r.readAsText(e)}))}}r(73646);var c=r(31168),s=r(51607);function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function f(){f=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(N){c=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),u=new k(o||[]);return n(a,"_invoke",{value:_(t,r,u)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(N){return{type:"throw",arg:N}}}t.wrap=s;var h={};function p(){}function y(){}function v(){}var m={};c(m,i,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(j([])));w&&w!==e&&r.call(w,i)&&(m=w);var b=v.prototype=p.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function o(n,i,a,u){var c=d(t[n],t,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==l(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,u)}),(function(t){o("throw",t,a,u)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,u)}))}u(c.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function _(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=O(a,r);if(u){if(u===h)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=d(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function j(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:void 0,done:!0}}return y.prototype=v,n(b,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:y,configurable:!0}),y.displayName=c(v,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c(t,u,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(E.prototype),c(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(b),c(b,u,"Generator"),c(b,i,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=j,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:j(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function d(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}function h(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){d(i,n,o,a,u,"next",t)}function u(t){d(i,n,o,a,u,"throw",t)}a(void 0)}))}}$((function(){var t=$(".trustee-step"),e=t.find(".start"),r=function(t){return $("#".concat(t.replace(".","-")))},a=$("#show-restore-modal"),l=a.find(".upload-election-keys"),d=t.find(".back"),p={apiEndpointUrl:t.data("apiEndpointUrl")},y="".concat(t.data("authoritySlug"),".").concat(t.data("electionId")),v=JSON.stringify(t.data("authorityPublicKey")),m=t.data("schemeName"),g={uniqueId:t.data("trusteeSlug"),publicKeyJSON:JSON.stringify(t.data("trusteePublicKey"))},w=new i.F(g.uniqueId,g.publicKeyJSON),b=null,x=null;if("dummy"===m)x=new c.n({trusteeId:g.uniqueId});else{if("electionguard"!==m)throw new Error("Voting scheme ".concat(m," not supported."));x=new s.n({trusteeId:g.uniqueId,workerUrl:"/assets/electionguard/webworker.js"})}var E=new u({authorityPublicKeyJSON:v,trusteeUniqueId:g.uniqueId,trusteeIdentificationKeys:w,trusteeWrapperAdapter:x}),_=function(){var i=h(f().mark((function i(){return f().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,E.setupElection({bulletinBoardClientParams:p,electionUniqueId:y,authorizationExpirationTimestamp:Math.ceil(Number(new Date)/1e3)+7200});case 2:return i.next=4,E.bindEvents({onEvent:function(t){var e=n.wC.parse(t.message.messageId);if(t.type===o.ul){if(b&&b!==e.typeSubtype)r(b).attr("data-step-status","completed");b=e.typeSubtype;var i=r(b);"completed"!==i.data("step-status")&&i.attr("data-step-status","processing")}},onBindStartButton:function(t){e.on("click",t)},onStart:function(){e.prop("disabled",!0)},onComplete:function(){$(".step_status").attr("data-step-status","completed"),e.addClass("hide"),d.removeClass("hide"),$.ajax({method:"PATCH",url:t.data("updateElectionStatusUrl"),contentType:"application/json",data:JSON.stringify({status:"tally_started"}),headers:{"X-CSRF-Token":$("meta[name=csrf-token]").attr("content")}})},onTrusteeNeedsToBeRestored:function(){a.foundation("open")},onBindRestoreButton:function(t){l.on("change",".restore-button-input",t)},onRestore:function(){a.foundation("close")}});case 4:e.prop("disabled",!1);case 5:case"end":return i.stop()}}),i)})));return function(){return i.apply(this,arguments)}}();w.present(function(){var t=h(f().mark((function t(e){return f().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=3;break}return t.next=3,_();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))},86226:function(){window.addEventListener("unhandledrejection",(function(t){console.log("broken",t),$("#server-failure .tech-info").html(t.reason),-1===t.reason.toString().indexOf("fetch")&&($("#server-failure .communication_error").addClass("hide"),$("#server-failure .generic_error").removeClass("hide")),$("#server-failure").foundation("open")}))},25819:function(){},3438:function(){}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,loaded:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,t=[],n.O=function(e,r,o,i){if(!r){var a=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],i=t[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[c])}))?r.splice(c--,1):(u=!1,i<a&&(a=i));if(u){t.splice(l--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},function(){var t={3493:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,a=r[0],u=r[1],c=r[2],s=0;if(a.some((function(e){return 0!==t[e]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var l=c(n)}for(e&&e(r);s<a.length;s++)i=a[s],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var o=n.O(void 0,[9098,8276,4486,2337],(function(){return n(52913)}));o=n.O(o)}();
//# sourceMappingURL=decidim_elections_trustee_tally_started-4b96a684af0ff2de8bb9.js.map