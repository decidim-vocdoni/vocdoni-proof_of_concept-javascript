!function(){var i,e={56355:function(i,e,t){var n={"./decidim/decidim_dev_dummy.svg":77548,"./decidim/gamification/badges/decidim_gamification_badges_test.svg":94240};function c(i){var e=a(i);return t(e)}function a(i){if(!t.o(n,i)){var e=new Error("Cannot find module '"+i+"'");throw e.code="MODULE_NOT_FOUND",e}return n[i]}c.keys=function(){return Object.keys(n)},c.resolve=a,i.exports=c,c.id=56355},18020:function(i,e,t){"use strict";var n=t(99115),c=t.n(n),a={role:"img","aria-hidden":"true"};function o(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=$.extend(a,e),n=t.title||t.ariaLabel;Reflect.deleteProperty(t,"title");var c={class:"icon icon--".concat(i)};Object.keys(t).forEach((function(i){var e=i.replace(/([A-Z])/g,(function(i){return"-".concat(i[0].toLowerCase())}));"undefined"===typeof c[i]?c[e]=t[i]:c[e]="".concat(c[e]," ").concat(t[i])}));var o=window.Decidim.config.get("icons_path"),d='<svg><use href="'.concat(o,"#icon-").concat(i,'"></use></svg>'),s=$(d);return n?s.prepend("<title>".concat(n,"</title>")):(s.prepend("<title>".concat(i,"</title>")),c["aria-hidden"]="true"),s.attr(c),$("<div />").append(s).html()}var d=function(){$(".decidim-accessibility-indicator").each((function(i,e){var t=$(e),n=t.data("accessibility-target").offset();t.css({top:n.top-30,left:n.left-30})}))},s=function(i){return $("<div />").text(i).html()};$((function(){var i=$('\n    <div lang="en" class="decidim-accessibility-badge" tabindex="0" aria-label="Toggle accessibility report">\n      <div class="decidim-accessibility-title">WAI WCAG</div>\n      <div class="decidim-accessibility-info"></div>\n    </div>\n  '),e=$('<div lang="en" class="decidim-accessibility-report"></div>'),t=null;$(window).on("resize",(function(){clearTimeout(t),t=setTimeout((function(){d()}),500)})),i.on("click",(function(){$("body").toggleClass("decidim-accessibility-report-open"),d()})),c().run().then((function(t){if($("body").prepend(e).prepend(i),t.violations.length<1)return i.addClass("decidim-accessibility-success"),$(".decidim-accessibility-info",i).append(o("check")),void e.append('\n        <div class="decidim-accessibility-report-item">\n          <div class="decidim-accessibility-report-item-title">\n            No accessibility violations found\n          </div>\n        </div>\n      ');i.addClass("decidim-accessibility-violation"),$(".decidim-accessibility-info",i).append(o("warning")).append('\n      <span class="decidim-accessibility-info-amount">\n        '.concat(t.violations.length,"\n      </span>\n    ")),t.violations.forEach((function(i){var t=$('\n        <div class="decidim-accessibility-report-item" data-accessibility-violation-id="'.concat(i.id,'">\n          <div class="decidim-accessibility-report-item-title">\n            ').concat(i.id," - ").concat(s(i.help),'\n          </div>\n          <div class="decidim-accessibility-report-item-description">\n            <div>Impact: ').concat(i.impact,"</div>\n            <div>\n              ").concat(s(i.description),'\n            </div>\n            <div class="decidim-accessibility-report-item-nodes">\n              Nodes:\n            </div>\n          </div>\n        </div>\n      ')),n=$("<ul></ul>");$(".decidim-accessibility-report-item-nodes",t).append(n),i.nodes.forEach((function(i){i.target.forEach((function(i){var e=i.replace(/#\\3([0-9]) /g,"#$1"),c=$(e),a=$('\n            <div class="decidim-accessibility-indicator" aria-hidden="true">'.concat(o("warning"),"</div>\n          "));a.data("accessibility-target",c),c.data("accessibility-indicator",a),c.attr("data-accessibility-violation",!0),$("body").append(a);var d=$('<a href="#">'.concat(e,"</a>"));d.data("accessibility-target",c),n.append($("<li></li>").append(d)),a.on("click",(function(){clearTimeout(t.data("blink-timeout")),clearTimeout(d.data("blink-timeout")),t.addClass("decidim-accessibility-report-item-blink"),t.data("blink-timeout",setTimeout((function(){t.removeClass("decidim-accessibility-report-item-blink")}),1e3)),d.addClass("decidim-accessibility-report-item-nodes-item-blink"),d.data("blink-timeout",setTimeout((function(){d.removeClass("decidim-accessibility-report-item-nodes-item-blink")}),1e3))}))}))})),$(".decidim-accessibility-report-item-nodes a",t).on("click",(function(i){i.preventDefault();var e=$(i.target).data("accessibility-target"),t=e.data("accessibility-indicator");clearTimeout(t.data("blink-timeout")),function(i){var e=i.offset().top,t=$(window).height(),n=$(window).scrollTop();(e<n||e>n+t)&&$(window).scrollTop(e-Math.round(t/2));var c=i.offset().left,a=$(window).width()-240,o=$(window).scrollLeft()+240;(c<o||c>o+a)&&$(window).scrollLeft(c-Math.round(a/2))}(e),setTimeout((function(){t.addClass("decidim-accessibility-indicator-blink"),e.attr("data-accessibility-violation","blink"),t.data("blink-timeout",setTimeout((function(){t.removeClass("decidim-accessibility-indicator-blink"),e.attr("data-accessibility-violation",!0)}),1e3))}),10)})),e.append(t)}))}))})),t(56355)},77548:function(i,e,t){"use strict";i.exports=t.p+"media/images/decidim_dev_dummy-7c65732068c5ec7c313e.svg"},94240:function(i,e,t){"use strict";i.exports=t.p+"media/images/decidim_gamification_badges_test-12369bee0baf637c42e9.svg"}},t={};function n(i){var c=t[i];if(void 0!==c)return c.exports;var a=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=e,i=[],n.O=function(e,t,c,a){if(!t){var o=1/0;for(l=0;l<i.length;l++){t=i[l][0],c=i[l][1],a=i[l][2];for(var d=!0,s=0;s<t.length;s++)(!1&a||o>=a)&&Object.keys(n.O).every((function(i){return n.O[i](t[s])}))?t.splice(s--,1):(d=!1,a<o&&(o=a));if(d){i.splice(l--,1);var r=c();void 0!==r&&(e=r)}}return e}a=a||0;for(var l=i.length;l>0&&i[l-1][2]>a;l--)i[l]=i[l-1];i[l]=[t,c,a]},n.n=function(i){var e=i&&i.__esModule?function(){return i.default}:function(){return i};return n.d(e,{a:e}),e},n.d=function(i,e){for(var t in e)n.o(e,t)&&!n.o(i,t)&&Object.defineProperty(i,t,{enumerable:!0,get:e[t]})},n.o=function(i,e){return Object.prototype.hasOwnProperty.call(i,e)},n.nmd=function(i){return i.paths=[],i.children||(i.children=[]),i},n.p="/decidim-packs/",function(){var i={5563:0};n.O.j=function(e){return 0===i[e]};var e=function(e,t){var c,a,o=t[0],d=t[1],s=t[2],r=0;if(o.some((function(e){return 0!==i[e]}))){for(c in d)n.o(d,c)&&(n.m[c]=d[c]);if(s)var l=s(n)}for(e&&e(t);r<o.length;r++)a=o[r],n.o(i,a)&&i[a]&&i[a][0](),i[a]=0;return n.O(l)},t=self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var c=n.O(void 0,[9115],(function(){return n(18020)}));c=n.O(c)}();
//# sourceMappingURL=decidim_dev-45a54cff55960a255e1f.js.map