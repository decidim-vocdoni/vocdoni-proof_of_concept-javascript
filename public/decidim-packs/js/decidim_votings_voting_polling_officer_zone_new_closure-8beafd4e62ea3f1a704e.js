!function(){var e={31631:function(){$((function(){var e=$("#submit-verify-votes"),t=$("#btn-modal-closure-count-error"),o=$("#envelopes_result_total_ballots_count"),n=$("#envelopes_result_election_votes_count");o.on("blur",(function(){parseInt(o.val(),10)===parseInt(n.val(),10)?(e.removeClass("disabled hide"),t.addClass("hide")):(e.addClass("hide"),t.removeClass("hide"))})),$("#submit-verify-votes").addClass("disabled"),o.on("keyup",(function(){$("#modal-total-ballots-value").html(parseInt(o.val(),10)),$("#envelopes_result_polling_officer_notes").val("")})),$("#envelopes_result_polling_officer_notes").on("keyup",(function(){var e=$("#envelopes_result_polling_officer_notes").val();$("#btn-submit-from-modal").toggleClass("disabled",!e.trim())}))}))}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,o),l.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";o(31631)}()}();
//# sourceMappingURL=decidim_votings_voting_polling_officer_zone_new_closure-8beafd4e62ea3f1a704e.js.map