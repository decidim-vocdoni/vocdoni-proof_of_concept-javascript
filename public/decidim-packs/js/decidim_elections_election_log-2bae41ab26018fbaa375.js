/*! For license information please see decidim_elections_election_log-2bae41ab26018fbaa375.js.LICENSE.txt */
!function(){var t,e={44101:function(t,e,r){"use strict";r.d(e,{Gu:function(){return o},HP:function(){return i},Ly:function(){return n},wC:function(){return s}});const n="a",o="b",i="t",a=[n,o,"v",i];class s{static parse(t){const[e,r]=t.split("+"),[n,o,i,s]=e.split(".",4),[c,u]=r.split(".",2),l=s?`.${s}`:"";if(!a.includes(c))throw new Error("Invalid message identifier format");return{electionId:`${n}.${o}`,type:i,subtype:s,typeSubtype:`${i}${l}`,author:{type:c,id:u}}}static format(t,e,r,n){return`${t}.${e}+${r}.${n}`}}},42670:function(t,e,r){"use strict";r.d(e,{t:function(){return a}});var n=r(21217),o=r(44101),i=r(39669);class a{constructor({authorityPublicKeyJSON:t}){this.authorityPublicKeyJSON=t,this.authorityPublicKey=n.JWK.asKey(t,"json"),this.keys=null}async parse({messageId:t,signedData:e}){const r=o.wC.parse(t),i=await(this.keys?this.keys[r.author.type][r.author.id]:this.authorityPublicKey);if(!e)return{messageIdentifier:r,decodedData:null};const a=await n.JWS.createVerify(i).verify(e,{algorithms:["RS256"]}),s=JSON.parse(new TextDecoder("utf-8").decode(a.payload));return this.keys||(this.keys=await this.parseCreateElection(s)),{messageIdentifier:r,decodedData:s}}async parseCreateElection({authority:t,bulletin_board:e,trustees:r}){if(!(0,i.h)(t.public_key,this.authorityPublicKeyJSON))throw new Error("The authority public key doesn't match the election's authority public key.");const n={[o.Ly]:{[t.slug]:this.authorityPublicKey},[o.Gu]:{},[o.HP]:{}},a=[];a.push(this.loadKey(e).then((t=>{n[o.Gu][e.slug]=t})));for(const i of r)a.push(this.loadKey(i).then((t=>{n[o.HP][i.slug]=t})));return await Promise.all(a),n}loadKey(t){return n.JWK.asKey(t.public_key,"json")}}},17163:function(t,e,r){"use strict";r(44101)},39669:function(t,e,r){"use strict";function n(t,e){const r="string"===typeof t?JSON.parse(t):t,n="string"===typeof e?JSON.parse(e):e;if(r&&n){const{n:t,e:e,kty:o}=r,{n:i,e:a,kty:s}=n;return t===i&&e===a&&o===s}return!1}r.d(e,{h:function(){return n}})},56633:function(t,e,r){"use strict";var n=r(6388),o=(r(17163),r(5239),r(29591),r(42670));r(44101),r(16855),r(10050),r(73646);function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(){a=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},s=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(j){l=function(t,e,r){return t[e]=r}}function f(t,e,r,o){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),s=new L(o||[]);return n(a,"_invoke",{value:k(t,r,s)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(j){return{type:"throw",arg:j}}}t.wrap=f;var h={};function y(){}function p(){}function v(){}var m={};l(m,s,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(S([])));b&&b!==e&&r.call(b,s)&&(m=b);var w=v.prototype=y.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function o(n,a,s,c){var u=d(t[n],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==i(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function k(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=C(a,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=d(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function C(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,C(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return p.prototype=v,n(w,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:p,configurable:!0}),p.displayName=l(v,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,l(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(_.prototype),l(_.prototype,c,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),l(w,u,"Generator"),l(w,s,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function s(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function c(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){s(i,n,o,a,c,"next",t)}function c(t){s(i,n,o,a,c,"throw",t)}a(void 0)}))}}$(c(a().mark((function t(){var e,r,i,s,u,l,f,d,h,y,p,v,m,g,b,w,x,_,k,C,O,E;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=$(".election-log"),r=e.find("#create-election-step"),i=e.find("#key-ceremony-step"),s=e.find("#vote-step"),u=e.find("#tally-step"),l=e.find("#results-step"),f=JSON.stringify(e.data("authorityPublicKey")),d=new n.K({apiEndpointUrl:e.data("apiEndpointUrl")}),h="".concat(e.data("authoritySlug"),".").concat(e.data("electionId")),y=new o.t({authorityPublicKeyJSON:f}),t.next=12,d.getElectionLogEntries({electionUniqueId:h,types:["create_election","start_key_ceremony","end_key_ceremony","start_vote","end_vote","start_tally","end_tally","publish_results"]});case 12:if(p=t.sent,v=function(){var t=c(a().mark((function t(e,r){var n,o,i,s;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.signedData){t.next=3;break}return r.find(".time").html(""),t.abrupt("return");case 3:return t.next=5,y.parse(e);case 5:n=t.sent,o=new Date(1e3*n.decodedData.iat),i=o.toDateString(),s=o.toLocaleTimeString(),r.find(".time").html("".concat(i," ").concat(s));case 10:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),m=function(t,e){e.find(".card__footer--transparent").removeClass("hide"),e.find(".chained-hash").html(t.chainedHash)},!(b=(g=function(t){return p.find((function(e){return e.messageId.includes(t)}))})("create_election"))){t.next=23;break}return r.find(".no-election-created").addClass("hide"),r.find(".election-created").removeClass("hide"),t.next=22,v(b,r);case 22:m(b,r);case 23:if(w=g("start_key_ceremony"),x=g("end_key_ceremony"),!w||x){t.next=34;break}return i.find(".key-ceremony-not-started").addClass("hide"),i.find(".card__text").removeClass("hide"),t.next=30,v(w,i);case 30:i.find(".key-ceremony-started").removeClass("hide"),m(w,i),t.next=42;break;case 34:if(!x){t.next=42;break}return i.find(".key-ceremony-not-started").addClass("hide"),i.find(".card__text").removeClass("hide"),t.next=39,v(x,i);case 39:i.find(".key-ceremony-started").addClass("hide"),i.find(".key-ceremony-completed").removeClass("hide"),m(x,i);case 42:if(_=g("start_vote"),k=g("end_vote"),!_||k){t.next=53;break}return s.find(".vote-not-started").addClass("hide"),s.find(".card__text").removeClass("hide"),t.next=49,v(_,s);case 49:s.find(".vote-started").removeClass("hide"),m(_,s),t.next=61;break;case 53:if(!k){t.next=61;break}return s.find(".vote-not-started").addClass("hide"),s.find(".card__text").removeClass("hide"),t.next=58,v(k,s);case 58:s.find(".vote-started").addClass("hide"),s.find(".vote-completed").removeClass("hide"),m(k,s);case 61:if(C=g("start_tally"),O=g("end_tally"),!C||O){t.next=72;break}return u.find(".tally-not-started").addClass("hide"),u.find(".card__text").removeClass("hide"),t.next=68,v(C,u);case 68:u.find(".tally-started").removeClass("hide"),m(C,u),t.next=80;break;case 72:if(!O){t.next=80;break}return u.find(".tally-not-started").addClass("hide"),u.find(".card__text").removeClass("hide"),t.next=77,v(O,u);case 77:u.find(".tally-started").addClass("hide"),u.find(".tally-completed").removeClass("hide"),m(O,u);case 80:if(!(E=g("publish_results"))){t.next=88;break}return l.find(".results-not-published").addClass("hide"),l.find(".card__text").removeClass("hide"),t.next=86,v(E,l);case 86:l.find(".results-published").removeClass("hide"),m(E,l);case 88:case"end":return t.stop()}}),t)}))))},21217:function(t,e,r){"use strict";"undefined"===typeof Promise&&r(82702).polyfill(),"undefined"===typeof Buffer&&((r.g||window).Buffer=r(48764).lW),"undefined"===typeof process&&((r.g||window).process=r(34155)),process.version||(process.version="");var n=r(32109);t.exports={JWA:r(35382),JWE:r(30701),JWK:r(32543),JWS:n,util:r(44237),parse:r(48650),canYouSee:n.createVerify}},25819:function(){},3438:function(){}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,loaded:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,t=[],n.O=function(e,r,o,i){if(!r){var a=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],i=t[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[c])}))?r.splice(c--,1):(s=!1,i<a&&(a=i));if(s){t.splice(l--,1);var u=o();void 0!==u&&(e=u)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},function(){var t={2661:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,a=r[0],s=r[1],c=r[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var l=c(n)}for(e&&e(r);u<a.length;u++)i=a[u],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var o=n.O(void 0,[9098,8276,3229],(function(){return n(56633)}));o=n.O(o)}();
//# sourceMappingURL=decidim_elections_election_log-2bae41ab26018fbaa375.js.map