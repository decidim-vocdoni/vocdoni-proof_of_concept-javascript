!function(){var e={98920:function(){var e,t,n,i,a;e=$("#promoting-committee-details"),t=$("#initiatives_type_promoting_committee_enabled",e),n=$("#initiatives_type_signature_type"),i=$("#initiatives_type_collect_user_extra_fields"),a=function(){t.is(":checked")?$(".minimum-committee-members-details",e).show():$(".minimum-committee-members-details",e).hide(),"offline"===n.val()?$("#initiatives_type_undo_online_signatures_enabled").parent().parent().hide():$("#initiatives_type_undo_online_signatures_enabled").parent().parent().show(),i.is(":checked")?$("#initiatives_type-extra_fields_legal_information-tabs").parent().parent().show():$("#initiatives_type-extra_fields_legal_information-tabs").parent().parent().hide()},$(t).click((function(){return a()})),$(n).change((function(){return a()})),$(i).click((function(){return a()})),a()},37906:function(){$((function(){var e=document.querySelector(".invite-users-link");null!==e&&e.addEventListener("click",(function(e){var t=document.querySelector("#committee_link"),n=document.createRange();e.preventDefault(),n.selectNode(t),window.getSelection().addRange(n);try{document.execCommand("copy")}catch(i){}window.getSelection().removeAllRanges()}))}))},65120:function(){var e=function(e,t,n){if(e.length){var i=e.data(n),a=e.data("".concat(t,"-search-url")),r=$("#".concat(e.data("".concat(t,"-selector"))));if(r.length){var o=function(){$.ajax({url:a,cache:!1,dataType:"html",data:{type_id:e.val(),selected:i},success:function(e){r.html(e)}})};e.change(o),o()}}};$((function(){var t=$("[data-scope-selector]");e(t,"scope","scope-id"),e(t,"signature-types","signature-type")}))}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(98920),n(37906),n(65120)}()}();
//# sourceMappingURL=decidim_initiatives_admin-eb037000f5917073f265.js.map