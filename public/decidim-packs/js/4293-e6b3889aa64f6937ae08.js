(self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[]).push([[4293],{74293:function(t,e,o){"use strict";o(42134);var n=o(45243),i=L.DivIcon.extend({options:{circleText:"",className:"svg-icon",circleAnchor:null,circleColor:null,circleOpacity:null,circleFillColor:"rgb(255,255,255)",circleFillOpacity:null,circleRatio:.5,circleWeight:null,color:"rgb(0,102,255)",fillColor:null,fillOpacity:.4,fontColor:"rgb(0, 0, 0)",fontOpacity:"1",fontSize:null,fontWeight:"normal",iconAnchor:null,iconSize:L.point(32,48),opacity:1,popupAnchor:null,shadowAngle:45,shadowBlur:1,shadowColor:"rgb(0,0,10)",shadowEnable:!1,shadowLength:.75,shadowOpacity:.5,shadowTranslate:L.point(0,0),weight:2},initialize:function(t){var e=L.Util.setOptions(this,t);e.iconSize=L.point(e.iconSize),e.circleAnchor?e.circleAnchor=L.point(e.circleAnchor):e.circleAnchor=L.point(Number(e.iconSize.x)/2,Number(e.iconSize.x)/2),e.circleColor||(e.circleColor=e.color),e.circleFillOpacity||(e.circleFillOpacity=e.opacity),e.circleOpacity||(e.circleOpacity=e.opacity),e.circleWeight||(e.circleWeight=e.weight),e.fillColor||(e.fillColor=e.color),e.fontSize||(e.fontSize=Number(e.iconSize.x/4)),e.iconAnchor?e.iconAnchor=L.point(e.iconAnchor):e.iconAnchor=L.point(Number(e.iconSize.x)/2,Number(e.iconSize.y)),e.popupAnchor?e.popupAnchor=L.point(e.popupAnchor):e.popupAnchor=L.point(0,-.75*e.iconSize.y),e.html=this._createSVG()},_createCircle:function(){var t=Number(this.options.circleAnchor.x),e=Number(this.options.circleAnchor.y),o=this.options.iconSize.x/2*Number(this.options.circleRatio),n=this.options.circleFillColor,i=this.options.circleFillOpacity,r=this.options.circleColor,a=this.options.circleOpacity,c=this.options.circleWeight,l="".concat(this.options.className,"-circle");return'<circle class="'.concat(l,'" cx="').concat(t,'" cy="').concat(e,'" r="').concat(o,'" fill="').concat(n,'" fill-opacity="').concat(i,'" stroke="').concat(r,'" stroke-opacity=').concat(a,'" stroke-width="').concat(c,'"/>')},_createPathDescription:function(){var t=Number(this.options.iconSize.y),e=Number(this.options.iconSize.x),o=Number(this.options.weight),n=o/2;return"M ".concat(n," ").concat(e/2," ")+"L ".concat(e/2," ").concat(t-o," ")+"L ".concat(e-n," ").concat(e/2," ")+"A ".concat(e/4," ").concat(e/4," 0 0 0 ").concat(n," ").concat(e/2," Z")},_createPath:function(){var t=this._createPathDescription(),e=this.options.weight,o=this.options.color,n=this.options.opacity,i=this.options.fillColor,r=this.options.fillOpacity,a="".concat(this.options.className,"-path");return'<path class="'.concat(a,'" d="').concat(t,'" stroke-width="').concat(e,'" stroke="').concat(o,'" stroke-opacity="').concat(n,'" fill="').concat(i,'" fill-opacity="').concat(r,'"/>')},_createShadow:function(){var t=this._createPathDescription(),e=this.options.weight,o=this.options.shadowColor,n=this.options.shadowColor,i="".concat(this.options.className,"-shadow"),r="".concat(this.options.iconSize.x/2,"px ").concat(this.options.iconSize.y,"px"),a=this.options.shadowAngle,c=this.options.shadowLength,l=this.options.shadowOpacity,s=this.options.shadowBlur,p="".concat(this.options.shadowTranslate.x,"px, ").concat(this.options.shadowTranslate.y,"px");return"<filter id='iconShadowBlur'><feGaussianBlur in='SourceGraphic' stdDeviation='".concat(s,"'/></filter>")+'<path filter="url(#iconShadowBlur") class="'.concat(i,'" d="').concat(t,'" fill="').concat(n,'" stroke-width="').concat(e,'" stroke="').concat(o,'" style="opacity: ').concat(l,"; transform-origin: ").concat(r,"; transform: rotate(").concat(a,"deg) translate(").concat(p,") scale(1, ").concat(c,')" />')},_createSVG:function(){var t=this._createPath(),e=this._createCircle(),o=this._createText(),n="";this.options.shadowEnable&&(n=this._createShadow());var i="".concat(this.options.className,"-svg"),r=this.options.iconSize.x,a=this.options.iconSize.y;this.options.shadowEnable&&(r+=this.options.iconSize.y*this.options.shadowLength-this.options.iconSize.x/2,r=Math.max(r,32),a+=this.options.iconSize.y*this.options.shadowLength);var c="width:".concat(r,"px; height:").concat(a);return'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="'.concat(i,'" style="').concat(c,'">').concat(n).concat(t).concat(e).concat(o,"</svg>")},_createText:function(){var t="".concat(this.options.fontSize,"px"),e=this.options.fontWeight,o=Number(this.options.fontSize),n=this.options.circleAnchor.x,i=this.options.circleAnchor.y+.35*o,r=this.options.circleText,a=this.options.fontColor.replace("rgb(","rgba(").replace(")",",".concat(this.options.fontOpacity,")"));return'<text text-anchor="middle" x="'.concat(n,'" y="').concat(i,'" style="font-size: ').concat(t,"; font-weight: ").concat(e,'" fill="').concat(a,'">').concat(r,"</text>")}});L.Marker.extend({options:{iconFactory:L.divIcon.svgIcon,iconOptions:{}},initialize:function(t,e){var o=L.Util.setOptions(this,e);o.icon=o.iconFactory(o.iconOptions),this._latlng=t},onAdd:function(t){L.Marker.prototype.onAdd.call(this,t)},setStyle:function(t){if(this._icon){var e=this._icon.children[0].children[0],o=this._icon.children[0].children[1];if(t.color&&!t.iconOptions){var n=t.color.replace("rgb","rgba").replace(")",",".concat(this.options.icon.options.opacity,")")),i=t.color.replace("rgb","rgba").replace(")",",".concat(this.options.icon.options.fillOpacity,")"));e.setAttribute("stroke",n),e.setAttribute("fill",i),o.setAttribute("stroke",n),this.options.icon.fillColor=i,this.options.icon.color=n,this.options.icon.circleColor=n}if(t.opacity&&this.setOpacity(t.opacity),t.iconOptions){t.color&&(t.iconOptions.color=t.color);var r=L.Util.setOptions(this.options.icon,t.iconOptions);this.setIcon(L.divIcon.svgIcon(r))}}}});function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,a=void 0,a=function(t,e){if("object"!==r(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!==r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===r(a)?a:String(a)),n)}var i,a}n.DivIcon.SVGIcon=i,n.DivIcon.SVGIcon.DecidimIcon=n.DivIcon.SVGIcon.extend({options:{fillColor:"#ef604d",fillOpacity:1,opacity:0},_createPathDescription:function(){return"M14 1.17a11.685 11.685 0 0 0-11.685 11.685c0 11.25 10.23 20.61 10.665 21a1.5 1.5 0 0 0 2.025 0c0.435-.435 10.665-9.81 10.665-21A11.685 11.685 0 0 0 14 1.17Zm0 17.415A5.085 5.085 0 1 1 19.085 13.5 5.085 5.085 0 0 1 14 18.585Z"},_createCircle:function(){return""},_createSVG:function(){var t=this._createPath(),e=this._createCircle(),o=this._createText(),n="".concat(this.options.className,"-svg"),i="width:".concat(this.options.iconSize.x,"px; height:").concat(this.options.iconSize.y,"px;");return'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="'.concat(n,'" style="').concat(i,'">').concat(t).concat(e).concat(o,"</svg>")}});var c={},l=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,o,n;return e=t,n=[{key:"getController",value:function(t){return c[t]}},{key:"setController",value:function(t,e){c[t]=e}},{key:"findByMap",value:function(t){return Object.values(c).find((function(e){return e.getMap()===t}))}}],(o=null)&&a(e.prototype,o),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function p(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,r=void 0,r=function(t,e){if("object"!==s(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===s(r)?r:String(r)),n)}var i,r}var u=function(){function t(e,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=l.getController(e);n&&n.remove(),this.mapId=e,this.config=$.extend({popupTemplateId:"marker-popup",markerColor:"#ef604d"},o),this.map=null,this.eventHandlers={},l.setController(e,this)}var e,o,i;return e=t,(o=[{key:"getConfig",value:function(){return this.config}},{key:"getMap",value:function(){return this.map}},{key:"load",value:function(){return this.map=n.map(this.mapId),this.map.scrollWheelZoom.disable(),this.map.on("popupopen",(function(t){$(t.popup.getElement()).attr("tabindex",0).focus()})),this.map.on("popupclose",(function(t){$(t.popup._source._icon).focus()})),this.map}},{key:"start",value:function(){}},{key:"remove",value:function(){this.map&&(this.map.remove(),this.map=null)}},{key:"createIcon",value:function(){return new n.DivIcon.SVGIcon.DecidimIcon({fillColor:this.config.markerColor,iconSize:n.point(28,36)})}},{key:"setEventHandler",value:function(t,e){this.eventHandlers[t]=e}},{key:"triggerEvent",value:function(t,e){var o=this.eventHandlers[t];return"function"===typeof o?Reflect.apply(o,this,e):null}}])&&p(e.prototype,o),i&&p(e,i),Object.defineProperty(e,"prototype",{writable:!1}),t}();o(95732);function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,r=void 0,r=function(t,e){if("object"!==f(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===f(r)?r:String(r)),n)}var i,r}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function y(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=v(t);if(e){var i=v(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return b(this,o)}}function b(t,e){if(e&&("object"===f(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}var g=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(a,t);var e,o,i,r=y(a);function a(){return h(this,a),r.apply(this,arguments)}return e=a,(o=[{key:"start",value:function(){this.markerClusters=null,Array.isArray(this.config.markers)&&this.config.markers.length>0?this.addMarkers(this.config.markers):this.map.fitWorld()}},{key:"addMarkers",value:function(t){var e=this;null===this.markerClusters&&(this.markerClusters=new n.MarkerClusterGroup,this.map.addLayer(this.markerClusters)),$.template(this.config.popupTemplateId,$("#".concat(this.config.popupTemplateId)).html());var o=new n.LatLngBounds(t.map((function(t){return[t.latitude,t.longitude]})));t.forEach((function(t){var o=new n.Marker([t.latitude,t.longitude],{icon:e.createIcon(),keyboard:!0,title:t.title}),i=document.createElement("div");$.tmpl(e.config.popupTemplateId,t).appendTo(i),o.bindPopup(i,{maxwidth:640,minWidth:500,keepInView:!0,className:"map-info"}).openPopup(),e.markerClusters.addLayer(o)}));var i=this.map.getSize();i.y>=400&&i.x>=400?this.map.fitBounds(o,{padding:[100,100]}):i.y>=120&&i.x>=120?this.map.fitBounds(o,{padding:[30,30]}):this.map.fitBounds(o)}},{key:"clearMarkers",value:function(){this.map.removeLayer(this.markerClusters),this.markerClusters=new n.MarkerClusterGroup,this.map.addLayer(this.markerClusters)}}])&&m(e.prototype,o),i&&m(e,i),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function k(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,r=void 0,r=function(t,e){if("object"!==w(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!==w(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===w(r)?r:String(r)),n)}var i,r}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function x(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=C(t);if(e){var i=C(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return O(this,o)}}function O(t,e){if(e&&("object"===w(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var T=window.open,j=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(a,t);var e,o,i,r=x(a);function a(){return _(this,a),r.apply(this,arguments)}return e=a,(o=[{key:"start",value:function(){var t=this;if(this.map.removeControl(this.map.zoomControl),this.map.dragging.disable(),this.map.touchZoom.disable(),this.map.doubleClickZoom.disable(),this.map.scrollWheelZoom.disable(),this.map.boxZoom.disable(),this.map.keyboard.disable(),this.map.tap&&this.map.tap.disable(),this.config.zoom?this.map.setZoom(this.config.zoom):this.map.setZoom(15),this.config.latitude&&this.config.longitude){var e=[this.config.latitude,this.config.longitude];this.map.panTo(e),n.marker(e,{icon:this.createIcon(),keyboard:!0,title:this.config.title}).addTo(this.map)._icon.removeAttribute("tabindex")}this.config.link&&this.map._container.addEventListener("click",(function(e){e.preventDefault(),t.map._container.focus(),T(t.config.link,"_blank")}))}}])&&k(e.prototype,o),i&&k(e,i),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);o(90694);function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function A(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function I(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(i=n.key,r=void 0,r=function(t,e){if("object"!==P(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===P(r)?r:String(r)),n)}var i,r}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function z(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=N(t);if(e){var i=N(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return B(this,o)}}function B(t,e){if(e&&("object"===P(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var R=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(a,t);var e,o,i,r=z(a);function a(){return A(this,a),r.apply(this,arguments)}return e=a,(o=[{key:"start",value:function(){this.config.marker?this.addMarker(this.config.marker):this.map.fitWorld()}},{key:"addMarker",value:function(t){var e=this;if(null!==t.latitude&&null!==t.longitude){var o={lat:t.latitude,lng:t.longitude};this.triggerEvent("coordinates",[o]),this.marker=n.marker(o,{icon:this.createIcon(),keyboard:!0,title:t.title,draggable:!0}),this.marker.on("drag",(function(t){e.triggerEvent("coordinates",[t.target.getLatLng()])})),this.marker.addTo(this.map);var i=parseInt(this.config.zoom,10)||14;this.map.setView(o,i)}}},{key:"getMarker",value:function(){return this.marker}},{key:"removeMarker",value:function(){this.marker&&(this.marker.remove(),this.marker=null)}}])&&I(e.prototype,o),i&&I(e,i),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);window.Decidim.createMapController=function(t,e){return"static"===e.type?new j(t,e):"drag-marker"===e.type?new R(t,e):new g(t,e)},$((function(){var t=$("[data-decidim-map]");if(t.length<1&&$("#map").length>0)throw new Error("DEPRECATION: Please update your maps customizations or include 'decidim/map/legacy.js' for legacy support!");t.each((function(t,e){var o=$(e),n=o.attr("id");n||(n="map-".concat(Math.random().toString(36).substr(2,9)),o.attr("id",n));var i=o.data("decidim-map"),r=window.Decidim.createMapController(n,i),a=r.load();o.data("map",a),o.data("map-controller",r),o.trigger("configure.decidim",[a,i]),r.start(),o.trigger("ready.decidim",[a,i])}))}))},42134:function(){!function(t,e){var o,n=t.fn.domManip,i="_tmplitem",r=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,a={},c={},l={key:0,data:{}},s=0,p=0,u=[];function f(e,o,n,i){var r={data:i||(o?o.data:{}),_wrap:o?o._wrap:null,tmpl:null,parent:o||null,nodes:[],calls:g,nest:w,wrap:_,html:k,update:S};return e&&t.extend(r,e,{nodes:[],parent:o}),n&&(r.tmpl=n,r._ctnt=r._ctnt||r.tmpl(t,r),r.key=++s,(u.length?c:a)[s]=r),r}function h(e,o,n){var r,a=n?t.map(n,(function(t){return"string"===typeof t?e.key?t.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+i+'="'+e.key+'" $2'):t:h(t,e,t._ctnt)})):e;return o?a:((a=a.join("")).replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,(function(e,o,n,i){v(r=t(n).get()),o&&(r=m(o).concat(r)),i&&(r=r.concat(m(i)))})),r||m(a))}function m(e){var o=document.createElement("div");return o.innerHTML=e,t.makeArray(o.childNodes)}function d(e){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+t.trim(e).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,(function(e,o,n,i,r,a,c){var l,s,p,u=t.tmpl.tag[n];if(!u)throw"Template command not found: "+n;return l=u._default||[],a&&!/\w$/.test(r)&&(r+=a,a=""),r?(r=b(r),c=c?","+b(c)+")":a?")":"",s=a?r.indexOf(".")>-1?r+a:"("+r+").call($item"+c:r,p=a?s:"(typeof("+r+")==='function'?("+r+").call($item):("+r+"))"):p=s=l.$1||"null",i=b(i),"');"+u[o?"close":"open"].split("$notnull_1").join(r?"typeof("+r+")!=='undefined' && ("+r+")!=null":"true").split("$1a").join(p).split("$1").join(s).split("$2").join(i?i.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,(function(t,e,o,n){return(n=n?","+n+")":o?")":"")?"("+e+").call($item"+n:t})):l.$2||"")+"_.push('"}))+"');}return _;")}function y(e,o){e._wrap=h(e,!0,t.isArray(o)?o:[r.test(o)?o:t(o).html()]).join("")}function b(t){return t?t.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function v(e){var o,n,r,l,u,h="_"+p,m={};for(r=0,l=e.length;r<l;r++)if(1===(o=e[r]).nodeType){for(u=(n=o.getElementsByTagName("*")).length-1;u>=0;u--)d(n[u]);d(o)}function d(e){var o,n,r,l,u=e;if(l=e.getAttribute(i)){for(;u.parentNode&&1===(u=u.parentNode).nodeType&&!(o=u.getAttribute(i)););o!==l&&(u=u.parentNode?11===u.nodeType?0:u.getAttribute(i)||0:0,(r=a[l])||((r=f(r=c[l],a[u]||c[u],null,!0)).key=++s,a[s]=r),p&&d(l)),e.removeAttribute(i)}else p&&(r=t.data(e,"tmplItem"))&&(d(r.key),a[r.key]=r,u=(u=t.data(e.parentNode,"tmplItem"))?u.key:0);if(r){for(n=r;n&&n.key!=u;)n.nodes.push(e),n=n.parent;delete r._ctnt,delete r._wrap,t.data(e,"tmplItem",r)}function d(t){r=m[t+=h]=m[t]||f(r,a[r.parent.key+h]||r.parent,null,!0)}}}function g(t,e,o,n){if(!t)return u.pop();u.push({_:t,tmpl:e,item:this,data:o,options:n})}function w(e,o,n){return t.tmpl(t.template(e),o,n,this)}function _(e,o){var n=e.options||{};return n.wrapped=o,t.tmpl(t.template(e.tmpl),e.data,n,e.item)}function k(e,o){var n=this._wrap;return t.map(t(t.isArray(n)?n.join(""):n).filter(e||"*"),(function(t){return o?t.innerText||t.textContent:t.outerHTML||(e=t,(n=document.createElement("div")).appendChild(e.cloneNode(!0)),n.innerHTML);var e,n}))}function S(){var e=this.nodes;t.tmpl(null,null,null,this).insertBefore(e[0]),t(e).remove()}t.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,n){t.fn[e]=function(i){var r,c,l,s,u=[],f=t(i),h=1===this.length&&this[0].parentNode;if(o=a||{},h&&11===h.nodeType&&1===h.childNodes.length&&1===f.length)f[n](this[0]),u=this;else{for(c=0,l=f.length;c<l;c++)p=c,r=(c>0?this.clone(!0):this).get(),t.fn[n].apply(t(f[c]),r),u=u.concat(r);p=0,u=this.pushStack(u,e,f.selector)}return s=o,o=null,t.tmpl.complete(s),u}})),t.fn.extend({tmpl:function(e,o,n){return t.tmpl(this[0],e,o,n)},tmplItem:function(){return t.tmplItem(this[0])},template:function(e){return t.template(e,this[0])},domManip:function(e,i,r,c){if(e[0]&&e[0].nodeType){for(var l,s=t.makeArray(arguments),u=e.length,f=0;f<u&&!(l=t.data(e[f++],"tmplItem")););u>1&&(s[0]=[t.makeArray(e)]),l&&p&&(s[2]=function(e){t.tmpl.afterManip(this,e,r)}),n.apply(this,s)}else n.apply(this,arguments);return p=0,o||t.tmpl.complete(a),this}}),t.extend({tmpl:function(e,o,n,i){var r,s=!i;if(s)i=l,e=t.template[e]||t.template(null,e),c={};else if(!e)return e=i.tmpl,a[i.key]=i,i.nodes=[],i.wrapped&&y(i,i.wrapped),t(h(i,null,i.tmpl(t,i)));return e?("function"===typeof o&&(o=o.call(i||{})),n&&n.wrapped&&y(n,n.wrapped),r=t.isArray(o)?t.map(o,(function(t){return t?f(n,i,e,t):null})):[f(n,i,e,o)],s?t(h(i,null,r)):r):[]},tmplItem:function(e){var o;for(e instanceof t&&(e=e[0]);e&&1===e.nodeType&&!(o=t.data(e,"tmplItem"))&&(e=e.parentNode););return o||l},template:function(e,o){return o?("string"===typeof o?o=d(o):o instanceof t&&(o=o[0]||{}),o.nodeType&&(o=t.data(o,"tmpl")||t.data(o,"tmpl",d(o.innerHTML))),"string"===typeof e?t.template[e]=o:o):e?"string"!==typeof e?t.template(null,e):t.template[e]||t.template(null,r.test(e)?e:t(e)):null},encode:function(t){return(""+t).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}}),t.extend(t.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},if:{open:"if(($notnull_1) && $1a){",close:"}"},else:{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(t){a={}},afterManip:function(e,o,n){var i=11===o.nodeType?t.makeArray(o.childNodes):1===o.nodeType?[o]:[];n.call(e,o),v(i),p++}})}(jQuery)},90694:function(){L.TileLayer.HERE=L.TileLayer.extend({options:{subdomains:"1234",minZoom:2,maxZoom:18,scheme:"normal.day",resource:"maptile",mapId:"newest",format:"png8",appId:"",appCode:"",useCIT:!1,useHTTPS:!0,language:"",language2:""},initialize:function(t){var e=(t=L.setOptions(this,t)).scheme.split(".")[0];t.tileResolution=256;var o=["apiKey="+encodeURIComponent(t.apiKey)];t.apiKey||(o=["app_id="+encodeURIComponent(t.appId),"app_code="+encodeURIComponent(t.appCode)]),t.language&&o.push("lg="+encodeURIComponent(t.language)),t.language2&&o.push("lg2="+encodeURIComponent(t.language2));var n="/maptile/2.1/{resource}/{mapId}/{scheme}/{z}/{x}/{y}/{tileResolution}/{format}"+("?"+o.join("&")),i="/maptile/2.1/copyright/{mapId}?apiKey={apiKey}",r="maps.ls.hereapi.com";t.apiKey||(r="maps"+(t.useCIT?".cit":"")+".api.here.com",i="/maptile/2.1/copyright/{mapId}?app_id={appId}&app_code={appCode}");var a="base."+r;"satellite"!=e&&"terrain"!=e&&"hybrid"!=e||(a="aerial."+r),-1!==t.scheme.indexOf(".traffic.")&&(a="traffic"+r);var c="http"+(t.useHTTPS?"s":""),l=c+"://{s}."+a+n;this._attributionUrl=L.Util.template(c+"://1."+a+i,this.options),L.TileLayer.prototype.initialize.call(this,l,t),this._attributionText=""},onAdd:function(t){L.TileLayer.prototype.onAdd.call(this,t),this._attributionBBoxes||this._fetchAttributionBBoxes()},onRemove:function(t){this._map.attributionControl.removeAttribution(this._attributionText),this._attributionText="",this._map.off("moveend zoomend resetview",this._findCopyrightBBox,this),L.TileLayer.prototype.onRemove.call(this,t)},_fetchAttributionBBoxes:function(){var t=new XMLHttpRequest;t.onreadystatechange=L.bind((function(){4==t.readyState&&200==t.status&&this._parseAttributionBBoxes(JSON.parse(t.responseText))}),this),t.open("GET",this._attributionUrl,!0),t.send()},_parseAttributionBBoxes:function(t){if(this._map){for(var e=t[this.options.scheme.split(".")[0]]||t.normal,o=0;o<e.length;o++)if(e[o].boxes)for(var n=0;n<e[o].boxes.length;n++){var i=e[o].boxes[n];e[o].boxes[n]=L.latLngBounds([[i[0],i[1]],[i[2],i[3]]])}this._map.on("moveend zoomend resetview",this._findCopyrightBBox,this),this._attributionProviders=e,this._findCopyrightBBox()}},_findCopyrightBBox:function(){if(this._map){for(var t=this._attributionProviders,e=[],o=this._map.getZoom(),n=this._map.getBounds(),i=0;i<t.length;i++)if(t[i].minLevel<=o&&t[i].maxLevel>=o)if(t[i].boxes)for(var r=0;r<t[i].boxes.length;r++){var a=t[i].boxes[r];if(n.intersects(a)){e.push(t[i]);break}}else e.push(t[i]);var c=['<a href="https://legal.here.com/en-gb/terms" target="_blank" rel="noopener noreferrer">HERE maps</a>'];for(i=0;i<e.length;i++){var l=e[i];c.push('<abbr title="'+l.alt+'">'+l.label+"</abbr>")}var s="\xa9 "+c.join(", ")+". ";s!==this._attributionText&&(this._map.attributionControl.removeAttribution(this._attributionText),this._map.attributionControl.addAttribution(this._attributionText=s))}}}),L.tileLayer.here=function(t){return new L.TileLayer.HERE(t)}}}]);
//# sourceMappingURL=4293-e6b3889aa64f6937ae08.js.map