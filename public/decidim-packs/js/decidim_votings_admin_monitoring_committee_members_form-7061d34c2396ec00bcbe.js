!function(){"use strict";function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(o=i.key,l=void 0,l=function(n,t){if("object"!==e(n)||null===n)return n;var r=n[Symbol.toPrimitive];if(void 0!==r){var i=r.call(n,t||"default");if("object"!==e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(n)}(o,"string"),"symbol"===e(l)?l:String(l)),i)}var o,l}var r=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,e),this.controllerField=t.controllerField,this.wrapperSelector=t.wrapperSelector,this.dependentFieldsSelector=t.dependentFieldsSelector,this.dependentInputSelector=t.dependentInputSelector,this.enablingCondition=t.enablingCondition,this._bindEvent(),this._run()}var r,i,o;return r=e,(i=[{key:"_run",value:function(){var e=this.controllerField,n=e.parents(this.wrapperSelector).find(this.dependentFieldsSelector),t=n.find(this.dependentInputSelector);this.enablingCondition(e)?(t.prop("disabled",!1),n.show()):(t.prop("disabled",!0),n.hide())}},{key:"_bindEvent",value:function(){var e=this;this.controllerField.on("change",(function(){e._run()}))}}])&&t(r.prototype,i),o&&t(r,o),Object.defineProperty(r,"prototype",{writable:!1}),e}();function i(e){return new r(e)}$((function(){var e=$("#monitoring_committee_member_existing_user");i({controllerField:e,wrapperSelector:".user-fields",dependentFieldsSelector:".user-fields--email",dependentInputSelector:"input",enablingCondition:function(e){return"false"===e.val()}}),i({controllerField:e,wrapperSelector:".user-fields",dependentFieldsSelector:".user-fields--name",dependentInputSelector:"input",enablingCondition:function(e){return"false"===e.val()}}),i({controllerField:e,wrapperSelector:".user-fields",dependentFieldsSelector:".user-fields--user-picker",dependentInputSelector:"input",enablingCondition:function(e){return"true"===e.val()}})}))}();
//# sourceMappingURL=decidim_votings_admin_monitoring_committee_members_form-7061d34c2396ec00bcbe.js.map