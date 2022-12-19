!function(){var e,t={84780:function(e,t,i){"use strict";i(68373),i(5830),i(49262),i(11722),i(96607);i(21217);var n=i(39669);class r{constructor(e,t){this.format="jwk",this.algorithm={name:"RSASSA-PKCS1-v1_5",modulusLength:4096,publicExponent:new Uint8Array([1,0,1]),hash:{name:"SHA-256"}},this.usages=["sign"],this.publicKeyAttrs=["alg","e","kty","n"],this.jwtHeader=this._encode64(JSON.stringify({alg:"RS256",typ:"JWT"})),this.trusteeUniqueId=e,this.privateKey=null,this.publicKey=null,this.storedPublicKey=JSON.parse(t||null),this.keyIdentifier=`${e}-private-key`,this.browserSupport=this._checkBrowserSupport(),this.textEncoder=new TextEncoder("utf-8"),this.dbName="identification_keys",this.dbVersion=1,this.presentPromise=this._read()}present(e){this.presentPromise.then((()=>{this._matchesStoredPublicKey(this.publicKey)?e(this.browserSupport&&null!==this.privateKey):this.reset().then(e(!1))}))}async generate(){return!(!this.browserSupport||this.storedPublicKey)&&new Promise(((e,t)=>{try{return this.crypto.subtle.generateKey(this.algorithm,!0,this.usages).then((t=>this.crypto.subtle.exportKey(this.format,t.privateKey).then((t=>{this.publicKey=this._publicKeyFromPrivateKey(t);const i=document.createElement("a");return i.setAttribute("href",`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(t))}`),i.setAttribute("download",`${this.keyIdentifier}.jwk`),i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),e()})).catch(this._handleErrors)))}catch(i){return t(i)}}))}async upload(e){return!(!this.browserSupport||null!==this.privateKey)&&new Promise(((t,i)=>{if(e)this.onUploadInputChange(e,t,i);else{const e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept",".jwk"),e.style.display="none",document.body.appendChild(e),e.addEventListener("change",(n=>{document.body.removeChild(e),this.onUploadInputChange(n,t,i)})),e.click()}}))}onUploadInputChange(e,t,i){const n=new FileReader;n.readAsText(e.target.files[0]),n.onload=e=>{let n="";try{n=JSON.parse(e.target.result)}catch(r){return i("invalid_format")}return this.crypto.subtle.importKey(this.format,n,this.algorithm,!1,this.usages).then((e=>{const r=this._publicKeyFromPrivateKey(n);this._matchesStoredPublicKey(r)?(this.publicKey=r,this.privateKey=e,this._save().then((()=>t(!0))).catch((()=>{i("could not be saved")}))):i("invalid_public_key")})).catch((()=>{i("invalid_key")}))}}reset(){return this.privateKey=this.publicKey=null,this._clear()}async sign(e){if(!this.browserSupport||null===this.privateKey)return!1;const t=`${this.jwtHeader}.${this._encode64(JSON.stringify(e))}`,i=await this.crypto.subtle.sign(this.algorithm,this.privateKey,this.textEncoder.encode(t));return`${t}.${btoa(Reflect.apply(String.fromCharCode,null,new Uint8Array(i))).replace(/[=]/g,"").replace(/\+/g,"-").replace(/\//g,"_")}`}_checkBrowserSupport(){return this.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,this.crypto=window.crypto||window.msCrypto,window.indexedDB&&window.crypto}_handleErrors(e){throw e}_publicKeyFromPrivateKey(e){return Object.keys(e).filter((e=>this.publicKeyAttrs.includes(e))).reduce(((t,i)=>(t[i]=e[i],t)),{})}_matchesStoredPublicKey(e){return(0,n.h)(e,this.storedPublicKey)}_encode64(e){return btoa(unescape(encodeURIComponent(e))).replace(/[=]/g,"").replace(/\+/g,"-").replace(/\//g,"_")}async _read(){return this._useDb("readonly",(e=>{e.get(this.keyIdentifier).onsuccess=e=>{e.target.result&&(this.privateKey=e.target.result.privateKey,this.publicKey=e.target.result.publicKey)}}))}async _save(){return this._useDb("readwrite",(e=>{e.add({privateKey:this.privateKey,publicKey:this.publicKey},this.keyIdentifier)}))}async _clear(){return this._useDb("readwrite",(e=>{e.delete(this.keyIdentifier)}))}async _useDb(e,t){return new Promise(((i,n)=>{let r=null;const s=this.indexedDB.open(this.dbName,this.dbVersion);s.onerror=e=>{r=null,n(e)},s.onupgradeneeded=()=>{r=s.result,r.createObjectStore("IdentificationKeys")},s.onsuccess=()=>{r=s.result;const n=r.transaction(["IdentificationKeys"],e);t(n.objectStore("IdentificationKeys")),n.oncomplete=()=>{r.close(),i()}}}))}}$((function(){$(document).ready((function(){!function(){var e=$(".trustee_zone form"),t=$("#trustee_slug",e),i=$("#trustee_public_key",e);if(window.trusteeIdentificationKeys=new r(t.val(),i.val()),window.trusteeIdentificationKeys.browserSupport){var n=$("#submit_identification_keys"),s=$("#generate_identification_keys"),o=$("#upload_identification_keys");$("button",s).on("click",(function(){window.trusteeIdentificationKeys.generate().then((function(){i.val(JSON.stringify(window.trusteeIdentificationKeys.publicKey)),n.addClass("visible")})).catch((function(){alert(s.data("error"))}))})),$("button.hollow",n).click((function(){i.val(""),n.removeClass("visible")})),$("button",o).click((function(){window.trusteeIdentificationKeys.upload().then((function(){o.addClass("hide")})).catch((function(e){alert(o.data(e))}))})),window.trusteeIdentificationKeys.present((function(e){o.toggleClass("hide",e)}))}else $("#not_supported_browser").addClass("visible")}()}))}))},25819:function(){},3438:function(){}},i={};function n(e){var r=i[e];if(void 0!==r)return r.exports;var s=i[e]={id:e,loaded:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.m=t,e=[],n.O=function(t,i,r,s){if(!i){var o=1/0;for(l=0;l<e.length;l++){i=e[l][0],r=e[l][1],s=e[l][2];for(var a=!0,c=0;c<i.length;c++)(!1&s||o>=s)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(a=!1,s<o&&(o=s));if(a){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[i,r,s]},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={568:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,s,o=i[0],a=i[1],c=i[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(c)var l=c(n)}for(t&&t(i);u<o.length;u++)s=o[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(l)},i=self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var r=n.O(void 0,[9098,4486],(function(){return n(84780)}));r=n.O(r)}();
//# sourceMappingURL=decidim_elections_trustee_trustee_zone-fe5bbe606750cf977529.js.map