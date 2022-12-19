"use strict";(self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[]).push([[2337],{48535:function(e,t,r){r.d(t,{g:function(){return f}});var s=r(50867),n=r(57587),i=r(84087),o=r(68373),a=r.n(o),c=r(5830),u=r.n(c),h=r(49262),l=r.n(h),p=r(11722),d=r.n(p),y=r(96607),b=r.n(y);class f{constructor({apiEndpointUrl:e,headers:t}){const r=new s.u({uri:e,headers:t});this.apolloClient=new n.f({link:r,cache:new i.h})}async getLogEntry({electionUniqueId:e,contentHash:t}){return(await this.apolloClient.query({query:d(),variables:{electionUniqueId:e,contentHash:t}})).data.logEntry}async getElectionLogEntries({electionUniqueId:e,after:t,types:r}){return(await this.apolloClient.query({query:a(),variables:{electionUniqueId:e,after:t,types:r},fetchPolicy:"no-cache"})).data.election.logEntries}async processKeyCeremonyStep({messageId:e,signedData:t}){const r=await this.apolloClient.mutate({mutation:u(),variables:{messageId:e,signedData:t}});if(r.data.processKeyCeremonyStep.error)throw new Error(r.data.processKeyCeremonyStep.error);return r.data.processKeyCeremonyStep.pendingMessage}async getPendingMessageByMessageId({messageId:e}){return(await this.apolloClient.query({query:b(),variables:{messageId:e}})).data.pendingMessage}async processTallyStep({messageId:e,signedData:t}){const r=await this.apolloClient.mutate({mutation:l(),variables:{messageId:e,signedData:t}});if(r.data.processTallyStep.error)throw new Error(r.data.processTallyStep.error);return r.data.processTallyStep.pendingMessage}}},44101:function(e,t,r){r.d(t,{Gu:function(){return n},HP:function(){return i},Ly:function(){return s},wC:function(){return a}});const s="a",n="b",i="t",o=[s,n,"v",i];class a{static parse(e){const[t,r]=e.split("+"),[s,n,i,a]=t.split(".",4),[c,u]=r.split(".",2),h=a?`.${a}`:"";if(!o.includes(c))throw new Error("Invalid message identifier format");return{electionId:`${s}.${n}`,type:i,subtype:a,typeSubtype:`${i}${h}`,author:{type:c,id:u}}}static format(e,t,r,s){return`${e}.${t}+${r}.${s}`}}},42670:function(e,t,r){r.d(t,{t:function(){return o}});var s=r(21217),n=r(44101),i=r(39669);class o{constructor({authorityPublicKeyJSON:e}){this.authorityPublicKeyJSON=e,this.authorityPublicKey=s.JWK.asKey(e,"json"),this.keys=null}async parse({messageId:e,signedData:t}){const r=n.wC.parse(e),i=await(this.keys?this.keys[r.author.type][r.author.id]:this.authorityPublicKey);if(!t)return{messageIdentifier:r,decodedData:null};const o=await s.JWS.createVerify(i).verify(t,{algorithms:["RS256"]}),a=JSON.parse(new TextDecoder("utf-8").decode(o.payload));return this.keys||(this.keys=await this.parseCreateElection(a)),{messageIdentifier:r,decodedData:a}}async parseCreateElection({authority:e,bulletin_board:t,trustees:r}){if(!(0,i.h)(e.public_key,this.authorityPublicKeyJSON))throw new Error("The authority public key doesn't match the election's authority public key.");const s={[n.Ly]:{[e.slug]:this.authorityPublicKey},[n.Gu]:{},[n.HP]:{}},o=[];o.push(this.loadKey(t).then((e=>{s[n.Gu][t.slug]=e})));for(const i of r)o.push(this.loadKey(i).then((e=>{s[n.HP][i.slug]=e})));return await Promise.all(o),s}loadKey(e){return s.JWK.asKey(e.public_key,"json")}}},17163:function(e,t,r){r.d(t,{b:function(){return n}});var s=r(44101);class n{constructor({uniqueId:e,bulletinBoardClient:t,typesFilter:r,options:s}){this.uniqueId=e,this.bulletinBoardClient=t,this.logEntries=[],this.typesFilter=r,this.subscriptionId=null,this.options=s||{waitUntilNextCheck:2e3}}async subscribeToLogEntriesChanges(){this.unsubscribeToLogEntriesChanges(),await this.getLogEntries(),this.subscriptionId=setInterval((()=>{this.getLogEntries()}),this.options.waitUntilNextCheck)}unsubscribeToLogEntriesChanges(){null!==this.subscriptionId&&(clearInterval(this.subscriptionId),this.subscriptionId=null)}getLastMessageFromTrustee(e){for(let t=this.logEntries.length-1;t>=0;t--){const r=this.logEntries[t],n=s.wC.parse(r.messageId);if(n.author.type===s.HP&&n.author.id===e)return r}return null}getLogEntries(){const e=this.logEntries[this.logEntries.length-1],t=e&&e.id||null;return new Promise((e=>{this.bulletinBoardClient.getElectionLogEntries({electionUniqueId:this.uniqueId,after:t,types:this.typesFilter}).then((t=>{t.length&&(this.logEntries=[...this.logEntries,...t]),e()}))}))}}},71397:function(e,t,r){r.d(t,{Qz:function(){return k},ul:function(){return T}});var s=r(70655);function n(e){return"function"===typeof e}var i=!1,o={Promise:void 0,set useDeprecatedSynchronousErrorHandling(e){e&&(new Error).stack;i=e},get useDeprecatedSynchronousErrorHandling(){return i}};function a(e){setTimeout((function(){throw e}),0)}var c={closed:!0,next:function(e){},error:function(e){if(o.useDeprecatedSynchronousErrorHandling)throw e;a(e)},complete:function(){}},u=function(){return Array.isArray||function(e){return e&&"number"===typeof e.length}}();var h=function(){function e(e){return Error.call(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(e,t){return t+1+") "+e.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e,this}return e.prototype=Object.create(Error.prototype),e}(),l=function(){function e(e){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,e&&(this._ctorUnsubscribe=!0,this._unsubscribe=e)}return e.prototype.unsubscribe=function(){var t;if(!this.closed){var r,s=this,i=s._parentOrParents,o=s._ctorUnsubscribe,a=s._unsubscribe,c=s._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,i instanceof e)i.remove(this);else if(null!==i)for(var l=0;l<i.length;++l){i[l].remove(this)}if(n(a)){o&&(this._unsubscribe=void 0);try{a.call(this)}catch(b){t=b instanceof h?p(b.errors):[b]}}if(u(c)){l=-1;for(var d=c.length;++l<d;){var y=c[l];if(null!==(r=y)&&"object"===typeof r)try{y.unsubscribe()}catch(b){t=t||[],b instanceof h?t=t.concat(p(b.errors)):t.push(b)}}}if(t)throw new h(t)}},e.prototype.add=function(t){var r=t;if(!t)return e.EMPTY;switch(typeof t){case"function":r=new e(t);case"object":if(r===this||r.closed||"function"!==typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof e)){var s=r;(r=new e)._subscriptions=[s]}break;default:throw new Error("unrecognized teardown "+t+" added to Subscription.")}var n=r._parentOrParents;if(null===n)r._parentOrParents=this;else if(n instanceof e){if(n===this)return r;r._parentOrParents=[n,this]}else{if(-1!==n.indexOf(this))return r;n.push(this)}var i=this._subscriptions;return null===i?this._subscriptions=[r]:i.push(r),r},e.prototype.remove=function(e){var t=this._subscriptions;if(t){var r=t.indexOf(e);-1!==r&&t.splice(r,1)}},e.EMPTY=function(e){return e.closed=!0,e}(new e),e}();function p(e){return e.reduce((function(e,t){return e.concat(t instanceof h?t.errors:t)}),[])}var d=function(){return"function"===typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),y=function(e){function t(r,s,n){var i=e.call(this)||this;switch(i.syncErrorValue=null,i.syncErrorThrown=!1,i.syncErrorThrowable=!1,i.isStopped=!1,arguments.length){case 0:i.destination=c;break;case 1:if(!r){i.destination=c;break}if("object"===typeof r){r instanceof t?(i.syncErrorThrowable=r.syncErrorThrowable,i.destination=r,r.add(i)):(i.syncErrorThrowable=!0,i.destination=new b(i,r));break}default:i.syncErrorThrowable=!0,i.destination=new b(i,r,s,n)}return i}return s.ZT(t,e),t.prototype[d]=function(){return this},t.create=function(e,r,s){var n=new t(e,r,s);return n.syncErrorThrowable=!1,n},t.prototype.next=function(e){this.isStopped||this._next(e)},t.prototype.error=function(e){this.isStopped||(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this))},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){this.destination.error(e),this.unsubscribe()},t.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},t.prototype._unsubscribeAndRecycle=function(){var e=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=e,this},t}(l),b=function(e){function t(t,r,s,i){var o,a=e.call(this)||this;a._parentSubscriber=t;var u=a;return n(r)?o=r:r&&(o=r.next,s=r.error,i=r.complete,r!==c&&(n((u=Object.create(r)).unsubscribe)&&a.add(u.unsubscribe.bind(u)),u.unsubscribe=a.unsubscribe.bind(a))),a._context=u,a._next=o,a._error=s,a._complete=i,a}return s.ZT(t,e),t.prototype.next=function(e){if(!this.isStopped&&this._next){var t=this._parentSubscriber;o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,this._next,e)&&this.unsubscribe():this.__tryOrUnsub(this._next,e)}},t.prototype.error=function(e){if(!this.isStopped){var t=this._parentSubscriber,r=o.useDeprecatedSynchronousErrorHandling;if(this._error)r&&t.syncErrorThrowable?(this.__tryOrSetError(t,this._error,e),this.unsubscribe()):(this.__tryOrUnsub(this._error,e),this.unsubscribe());else if(t.syncErrorThrowable)r?(t.syncErrorValue=e,t.syncErrorThrown=!0):a(e),this.unsubscribe();else{if(this.unsubscribe(),r)throw e;a(e)}}},t.prototype.complete=function(){var e=this;if(!this.isStopped){var t=this._parentSubscriber;if(this._complete){var r=function(){return e._complete.call(e._context)};o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},t.prototype.__tryOrUnsub=function(e,t){try{e.call(this._context,t)}catch(r){if(this.unsubscribe(),o.useDeprecatedSynchronousErrorHandling)throw r;a(r)}},t.prototype.__tryOrSetError=function(e,t,r){if(!o.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{t.call(this._context,r)}catch(s){return o.useDeprecatedSynchronousErrorHandling?(e.syncErrorValue=s,e.syncErrorThrown=!0,!0):(a(s),!0)}return!1},t.prototype._unsubscribe=function(){var e=this._parentSubscriber;this._context=null,this._parentSubscriber=null,e.unsubscribe()},t}(y);var f=function(){return"function"===typeof Symbol&&Symbol.observable||"@@observable"}();function w(e){return e}function g(e){return 0===e.length?w:1===e.length?e[0]:function(t){return e.reduce((function(e,t){return t(e)}),t)}}var m=function(){function e(e){this._isScalar=!1,e&&(this._subscribe=e)}return e.prototype.lift=function(t){var r=new e;return r.source=this,r.operator=t,r},e.prototype.subscribe=function(e,t,r){var s=this.operator,n=function(e,t,r){if(e){if(e instanceof y)return e;if(e[d])return e[d]()}return e||t||r?new y(e,t,r):new y(c)}(e,t,r);if(s?n.add(s.call(n,this.source)):n.add(this.source||o.useDeprecatedSynchronousErrorHandling&&!n.syncErrorThrowable?this._subscribe(n):this._trySubscribe(n)),o.useDeprecatedSynchronousErrorHandling&&n.syncErrorThrowable&&(n.syncErrorThrowable=!1,n.syncErrorThrown))throw n.syncErrorValue;return n},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){o.useDeprecatedSynchronousErrorHandling&&(e.syncErrorThrown=!0,e.syncErrorValue=t),!function(e){for(;e;){var t=e,r=t.closed,s=t.destination,n=t.isStopped;if(r||n)return!1;e=s&&s instanceof y?s:null}return!0}(e)?console.warn(t):e.error(t)}},e.prototype.forEach=function(e,t){var r=this;return new(t=_(t))((function(t,s){var n;n=r.subscribe((function(t){try{e(t)}catch(r){s(r),n&&n.unsubscribe()}}),s,t)}))},e.prototype._subscribe=function(e){var t=this.source;return t&&t.subscribe(e)},e.prototype[f]=function(){return this},e.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return 0===e.length?this:g(e)(this)},e.prototype.toPromise=function(e){var t=this;return new(e=_(e))((function(e,r){var s;t.subscribe((function(e){return s=e}),(function(e){return r(e)}),(function(){return e(s)}))}))},e.create=function(t){return new e(t)},e}();function _(e){if(e||(e=o.Promise||Promise),!e)throw new Error("no Promise impl found");return e}var v=function(){function e(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return e.prototype=Object.create(Error.prototype),e}(),E=function(e){function t(t,r){var s=e.call(this)||this;return s.subject=t,s.subscriber=r,s.closed=!1,s}return s.ZT(t,e),t.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var e=this.subject,t=e.observers;if(this.subject=null,t&&0!==t.length&&!e.isStopped&&!e.closed){var r=t.indexOf(this.subscriber);-1!==r&&t.splice(r,1)}}},t}(l),S=function(e){function t(t){var r=e.call(this,t)||this;return r.destination=t,r}return s.ZT(t,e),t}(y),K=function(e){function t(){var t=e.call(this)||this;return t.observers=[],t.closed=!1,t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return s.ZT(t,e),t.prototype[d]=function(){return new S(this)},t.prototype.lift=function(e){var t=new I(this,this);return t.operator=e,t},t.prototype.next=function(e){if(this.closed)throw new v;if(!this.isStopped)for(var t=this.observers,r=t.length,s=t.slice(),n=0;n<r;n++)s[n].next(e)},t.prototype.error=function(e){if(this.closed)throw new v;this.hasError=!0,this.thrownError=e,this.isStopped=!0;for(var t=this.observers,r=t.length,s=t.slice(),n=0;n<r;n++)s[n].error(e);this.observers.length=0},t.prototype.complete=function(){if(this.closed)throw new v;this.isStopped=!0;for(var e=this.observers,t=e.length,r=e.slice(),s=0;s<t;s++)r[s].complete();this.observers.length=0},t.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},t.prototype._trySubscribe=function(t){if(this.closed)throw new v;return e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){if(this.closed)throw new v;return this.hasError?(e.error(this.thrownError),l.EMPTY):this.isStopped?(e.complete(),l.EMPTY):(this.observers.push(e),new E(this,e))},t.prototype.asObservable=function(){var e=new m;return e.source=this,e},t.create=function(e,t){return new I(e,t)},t}(m),I=function(e){function t(t,r){var s=e.call(this)||this;return s.destination=t,s.source=r,s}return s.ZT(t,e),t.prototype.next=function(e){var t=this.destination;t&&t.next&&t.next(e)},t.prototype.error=function(e){var t=this.destination;t&&t.error&&this.destination.error(e)},t.prototype.complete=function(){var e=this.destination;e&&e.complete&&this.destination.complete()},t.prototype._subscribe=function(e){return this.source?this.source.subscribe(e):l.EMPTY},t}(K);function C(){}var P=function(){function e(e,t,r){this.nextOrObserver=e,this.error=t,this.complete=r}return e.prototype.call=function(e,t){return t.subscribe(new x(e,this.nextOrObserver,this.error,this.complete))},e}(),x=function(e){function t(t,r,s,i){var o=e.call(this,t)||this;return o._tapNext=C,o._tapError=C,o._tapComplete=C,o._tapError=s||C,o._tapComplete=i||C,n(r)?(o._context=o,o._tapNext=r):r&&(o._context=r,o._tapNext=r.next||C,o._tapError=r.error||C,o._tapComplete=r.complete||C),o}return s.ZT(t,e),t.prototype._next=function(e){try{this._tapNext.call(this._context,e)}catch(t){return void this.destination.error(t)}this.destination.next(e)},t.prototype._error=function(e){try{this._tapError.call(this._context,e)}catch(e){return void this.destination.error(e)}this.destination.error(e)},t.prototype._complete=function(){try{this._tapComplete.call(this._context)}catch(e){return void this.destination.error(e)}return this.destination.complete()},t}(y);const T="[Message] Received";class k{constructor(){this.events=new K}subscribe(e){return this.events.pipe((t=e,function(e){return e.lift(new P(t,r,s))})).subscribe();var t,r,s}broadcastMessageReceived(e){this.events.next({type:T,message:e})}broadcastMessageProcessed(e,t){this.events.next({type:"[Message] Processed",message:e,result:t})}}},53374:function(e,t,r){r.d(t,{F:function(){return n}});var s=r(39669);class n{constructor(e,t){this.format="jwk",this.algorithm={name:"RSASSA-PKCS1-v1_5",modulusLength:4096,publicExponent:new Uint8Array([1,0,1]),hash:{name:"SHA-256"}},this.usages=["sign"],this.publicKeyAttrs=["alg","e","kty","n"],this.jwtHeader=this._encode64(JSON.stringify({alg:"RS256",typ:"JWT"})),this.trusteeUniqueId=e,this.privateKey=null,this.publicKey=null,this.storedPublicKey=JSON.parse(t||null),this.keyIdentifier=`${e}-private-key`,this.browserSupport=this._checkBrowserSupport(),this.textEncoder=new TextEncoder("utf-8"),this.dbName="identification_keys",this.dbVersion=1,this.presentPromise=this._read()}present(e){this.presentPromise.then((()=>{this._matchesStoredPublicKey(this.publicKey)?e(this.browserSupport&&null!==this.privateKey):this.reset().then(e(!1))}))}async generate(){return!(!this.browserSupport||this.storedPublicKey)&&new Promise(((e,t)=>{try{return this.crypto.subtle.generateKey(this.algorithm,!0,this.usages).then((t=>this.crypto.subtle.exportKey(this.format,t.privateKey).then((t=>{this.publicKey=this._publicKeyFromPrivateKey(t);const r=document.createElement("a");return r.setAttribute("href",`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(t))}`),r.setAttribute("download",`${this.keyIdentifier}.jwk`),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),e()})).catch(this._handleErrors)))}catch(r){return t(r)}}))}async upload(e){return!(!this.browserSupport||null!==this.privateKey)&&new Promise(((t,r)=>{if(e)this.onUploadInputChange(e,t,r);else{const e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept",".jwk"),e.style.display="none",document.body.appendChild(e),e.addEventListener("change",(s=>{document.body.removeChild(e),this.onUploadInputChange(s,t,r)})),e.click()}}))}onUploadInputChange(e,t,r){const s=new FileReader;s.readAsText(e.target.files[0]),s.onload=e=>{let s="";try{s=JSON.parse(e.target.result)}catch(n){return r("invalid_format")}return this.crypto.subtle.importKey(this.format,s,this.algorithm,!1,this.usages).then((e=>{const n=this._publicKeyFromPrivateKey(s);this._matchesStoredPublicKey(n)?(this.publicKey=n,this.privateKey=e,this._save().then((()=>t(!0))).catch((()=>{r("could not be saved")}))):r("invalid_public_key")})).catch((()=>{r("invalid_key")}))}}reset(){return this.privateKey=this.publicKey=null,this._clear()}async sign(e){if(!this.browserSupport||null===this.privateKey)return!1;const t=`${this.jwtHeader}.${this._encode64(JSON.stringify(e))}`,r=await this.crypto.subtle.sign(this.algorithm,this.privateKey,this.textEncoder.encode(t));return`${t}.${btoa(Reflect.apply(String.fromCharCode,null,new Uint8Array(r))).replace(/[=]/g,"").replace(/\+/g,"-").replace(/\//g,"_")}`}_checkBrowserSupport(){return this.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,this.crypto=window.crypto||window.msCrypto,window.indexedDB&&window.crypto}_handleErrors(e){throw e}_publicKeyFromPrivateKey(e){return Object.keys(e).filter((e=>this.publicKeyAttrs.includes(e))).reduce(((t,r)=>(t[r]=e[r],t)),{})}_matchesStoredPublicKey(e){return(0,s.h)(e,this.storedPublicKey)}_encode64(e){return btoa(unescape(encodeURIComponent(e))).replace(/[=]/g,"").replace(/\+/g,"-").replace(/\//g,"_")}async _read(){return this._useDb("readonly",(e=>{e.get(this.keyIdentifier).onsuccess=e=>{e.target.result&&(this.privateKey=e.target.result.privateKey,this.publicKey=e.target.result.publicKey)}}))}async _save(){return this._useDb("readwrite",(e=>{e.add({privateKey:this.privateKey,publicKey:this.publicKey},this.keyIdentifier)}))}async _clear(){return this._useDb("readwrite",(e=>{e.delete(this.keyIdentifier)}))}async _useDb(e,t){return new Promise(((r,s)=>{let n=null;const i=this.indexedDB.open(this.dbName,this.dbVersion);i.onerror=e=>{n=null,s(e)},i.onupgradeneeded=()=>{n=i.result,n.createObjectStore("IdentificationKeys")},i.onsuccess=()=>{n=i.result;const s=n.transaction(["IdentificationKeys"],e);t(s.objectStore("IdentificationKeys")),s.oncomplete=()=>{n.close(),r()}}}))}}},69912:function(e,t,r){r.d(t,{Q:function(){return o}});var s=r(5239),n=r(6388),i=r(17163);class o{constructor({authorityPublicKeyJSON:e,trusteeUniqueId:t,trusteeIdentificationKeys:r,trusteeWrapperAdapter:n}){this.trustee=new s.P({uniqueId:t,authorityPublicKeyJSON:e,identificationKeys:r,wrapperAdapter:n})}async setupElection(){throw new Error("not implemented")}async setupElectionWithTypesFilter({bulletinBoardClientParams:e,electionUniqueId:t,authorizationExpirationTimestamp:r,typesFilter:s}){const[o]=t.split("."),a=`${o}.${this.trustee.uniqueId}`,c=await this.trustee.signMessage({trustee_unique_id:a,exp:r}),u=new n.K({...e,headers:{Authorization:c,TrusteeUniqueId:a}}),h=new i.b({uniqueId:t,bulletinBoardClient:u,typesFilter:s});this.trustee.election=h}async bindEvents(){throw new Error("not implemented")}}},5239:function(e,t,r){r.d(t,{P:function(){return o}});var s=r(71397),n=r(42670),i=r(44101);class o{constructor({uniqueId:e,authorityPublicKeyJSON:t,identificationKeys:r,wrapperAdapter:i,options:o}){this.uniqueId=e,this.identificationKeys=r,this.election=null,this.options=o||{waitUntilNextCheck:100},this.wrapperAdapter=i,this.parser=new n.t({authorityPublicKeyJSON:t}),this.events=new s.Qz,this.nextLogEntryIndexToProcess=0,this.lastMessageProcessedWithResult=null,this.hasSetupKeyCeremony=!1}async setup(){if(null===this.election)throw new Error("election is not set.");return await this.wrapperAdapter.setup(),this.election.subscribeToLogEntriesChanges()}tearDown(){this.election.unsubscribeToLogEntriesChanges()}async*setupKeyCeremony(){let e;for(;!e;)e=await this.waitForNextLogEntryResult();return yield await this.wrapperAdapter.backup(),await this.processKeyCeremonyStep(e),this.hasSetupKeyCeremony=!0,this.hasSetupKeyCeremony}async runKeyCeremony(){if(!this.hasSetupKeyCeremony)throw new Error("The key ceremony has not been setup yet");if(await this.needsToBeRestored())throw new Error("You need to restore the wrapper state to continue");return this.waitForNextLogEntryResult().then((async e=>(await this.processKeyCeremonyStep(e),await this.wrapperAdapter.isKeyCeremonyDone()?this.tearDown():this.runKeyCeremony())))}async runTally(){if(await this.needsToBeRestored())throw new Error("You need to restore the wrapper state to continue");return this.waitForNextLogEntryResult().then((async e=>(await this.processTallyStep(e),await this.wrapperAdapter.isTallyDone()?this.tearDown():this.runTally())))}async needsToBeRestored(){return this.election.getLastMessageFromTrustee(this.uniqueId)&&await this.wrapperAdapter.isFresh()}async restore(e){const t=this.election.getLastMessageFromTrustee(this.uniqueId);return this.hasSetupKeyCeremony=t&&await this.wrapperAdapter.restore(e),this.hasSetupKeyCeremony}async waitForNextLogEntryResult(){return await new Promise((e=>{const t=setInterval((async()=>{const{logEntries:r}=this.election;r.length>this.nextLogEntryIndexToProcess&&(clearInterval(t),e())}),this.options.waitUntilNextCheck)})),this.processNextLogEntry()}async processNextLogEntry(){const{logEntries:e}=this.election,t=e[this.nextLogEntryIndexToProcess];this.events.broadcastMessageReceived(t);const{messageIdentifier:r,decodedData:s}=await this.parser.parse(t),n=await this.wrapperAdapter.processMessage(r.typeSubtype,s);if(this.events.broadcastMessageProcessed(t,n),this.nextLogEntryIndexToProcess+=1,n){const{messageType:e,content:t}=n;return{message_id:i.wC.format(this.election.uniqueId,e,i.HP,this.uniqueId),content:t}}return n}async processKeyCeremonyStep(e){if(e&&!this.isMessageAlreadyLogged(e)){const t=await this.signMessage(e);return this.election.bulletinBoardClient.processKeyCeremonyStep({messageId:e.message_id,signedData:t})}}async processTallyStep(e){if(e&&!this.isMessageAlreadyLogged(e)){const t=await this.signMessage(e);return this.election.bulletinBoardClient.processTallyStep({messageId:e.message_id,signedData:t})}}isMessageAlreadyLogged({message_id:e}){const{logEntries:t}=this.election;return t.find((t=>t.messageId===e))}signMessage(e){return this.identificationKeys.sign({iat:Math.floor(new Date/1e3),...e})}}},73646:function(e,t,r){r(6388),r(17163),r(29591)},29591:function(e,t,r){r(42670)},31168:function(e,t,r){r.d(t,{n:function(){return o}});const s="key_ceremony.step_1",n="tally.share";class i{constructor({trusteeId:e}){this.trusteeId=e,this.status=0,this.electionPublicKey=0,this.jointElectionKey=0,this.tallyCastMessage=null,this.quorum=0,this.trusteesKeys={},this.trusteesShares={}}processMessage(e,t){switch(this.status){case 0:"create_election"===e&&(this.quorum=t.scheme.quorum,this.status=1);break;case 1:if("start_key_ceremony"===e)return this.status=2,this.electionPublicKey=2*Math.floor(50+200*Math.random())+1,{messageType:s,content:JSON.stringify({election_public_key:this.electionPublicKey,owner_id:this.trusteeId})};break;case 2:if(e===s){const e=JSON.parse(t.content);this.trusteesKeys[e.owner_id]=e.election_public_key}else if("end_key_ceremony"===e){const e=JSON.parse(t.content);this.jointElectionKey=e.joint_election_key,this.status=3}break;case 3:"start_tally"===e&&(this.status=4);break;case 4:if("tally.cast"===e){this.tallyCastMessage=t.content;const e=JSON.parse(this.tallyCastMessage);for(const[t,r]of Object.entries(e))for(const[s,n]of Object.entries(r))e[t][s]=n%this.electionPublicKey*this.electionPublicKey;return{messageType:n,content:JSON.stringify({owner_id:this.trusteeId,contests:e})}}if(e===n){const e=JSON.parse(t.content);return this.trusteesShares[e.owner_id]=!0,this._compensate()}if("tally.missing_trustee"===e){if(!(t.trustee_id in this.trusteesShares))return this.trusteesShares[t.trustee_id]=!1,this._compensate()}else"end_tally"===e&&(this.status=5)}}isFresh(){return 0===this.status}backup(){return JSON.stringify(this)}restore(e){if(!this.isFresh())return console.warn("Restore not needed"),!1;const t=JSON.parse(e);if(t.trusteeId!==this.trusteeId)return console.warn("Invalid trustee id"),!1;if(1===t.status)return console.warn("Invalid restored status"),!1;try{Object.assign(this,t)}catch(r){return console.error(r),!1}return!0}isKeyCeremonyDone(){return this.status>=3}isTallyDone(){return this.status>=5}_compensate(){const e=Object.keys(this.trusteesKeys).length,t=Object.values(this.trusteesShares).filter((e=>!e)).length;if(t>0&&t<=e-this.quorum&&Object.keys(this.trusteesShares).length===e){const r=JSON.parse(this.tallyCastMessage);for(const[s,n]of Object.entries(r))for(const[i,o]of Object.entries(n))r[s][i]=Math.pow(o%this.electionPublicKey,t)/Math.pow(this.electionPublicKey,e-t);return{messageType:"tally.compensation",content:JSON.stringify({owner_id:this.trusteeId,contests:r})}}}}class o{constructor({trusteeId:e}){this.trusteeId=e,this.wrapper=new i({trusteeId:e})}setup(){}processMessage(e,t){return this.wrapper.processMessage(e,t)}isFresh(){return this.wrapper.isFresh()}backup(){return this.wrapper.backup()}restore(e){return this.wrapper.restore(e)}isKeyCeremonyDone(){return this.wrapper.isKeyCeremonyDone()}isTallyDone(){return this.wrapper.isTallyDone()}}},51607:function(e,t,r){r.d(t,{n:function(){return n}});class s{processPythonCodeOnWorker(e,t){return new Promise(((r,s)=>{this.worker.onmessage=e=>{r(e.data.results)},this.worker.onerror=e=>{console.error(e),s(e)},this.worker.postMessage({python:e,...t})}))}}class n extends s{constructor({trusteeId:e,workerUrl:t}){super(),this.trusteeId=e,this.worker=new Worker(t)}setup(){return this.processPythonCodeOnWorker("\n        from js import trustee_id\n        from bulletin_board.electionguard.trustee import Trustee\n        trustee = Trustee(trustee_id)\n      ",{trustee_id:this.trusteeId})}async processMessage(e,t){const r=await this.processPythonCodeOnWorker("\n      import json\n      from js import message_type, decoded_data\n      trustee.process_message(message_type, json.loads(decoded_data))\n    ",{message_type:e,decoded_data:JSON.stringify(t)});if(r&&r.length>0){const[{message_type:e,content:t}]=r;return{messageType:e,content:t}}}isFresh(){return this.processPythonCodeOnWorker("\n      trustee.is_fresh()\n    ")}backup(){return this.processPythonCodeOnWorker("\n      trustee.backup().hex()\n    ")}restore(e){return this.processPythonCodeOnWorker("\n      from js import state\n\n      trustee = Trustee.restore(bytes.fromhex(state))\n      True\n    ",{state:e})}isKeyCeremonyDone(){return this.processPythonCodeOnWorker("\n      trustee.is_key_ceremony_done()\n    ")}isTallyDone(){return this.processPythonCodeOnWorker("\n      trustee.is_tally_done()\n    ")}}}}]);
//# sourceMappingURL=2337-baa6e3c08098da0c018d.js.map