"use strict";(self.webpackChunkdecidim_development_app=self.webpackChunkdecidim_development_app||[]).push([[1574],{1574:function(e,o,t){t.r(o);var n=t(97480),i=(t(59361),t(78265),t(73935),Object.defineProperty),r=(e,o)=>i(e,"name",{value:o,configurable:!0});function u(e){return{options:e instanceof Function?{render:e}:!0===e?{}:e}}function m(e){const o=e.state.info.options;return(null===o||void 0===o?void 0:o.hoverTime)||500}function s(e,o){const t=e.state.info,i=o.target||o.srcElement;if(!(i instanceof HTMLElement))return;if("SPAN"!==i.nodeName||void 0!==t.hoverTimeout)return;const u=i.getBoundingClientRect(),s=r((function(){clearTimeout(t.hoverTimeout),t.hoverTimeout=setTimeout(f,c)}),"onMouseMove"),p=r((function(){n.C.off(document,"mousemove",s),n.C.off(e.getWrapperElement(),"mouseout",p),clearTimeout(t.hoverTimeout),t.hoverTimeout=void 0}),"onMouseOut"),f=r((function(){n.C.off(document,"mousemove",s),n.C.off(e.getWrapperElement(),"mouseout",p),t.hoverTimeout=void 0,a(e,u)}),"onHover"),c=m(e);t.hoverTimeout=setTimeout(f,c),n.C.on(document,"mousemove",s),n.C.on(e.getWrapperElement(),"mouseout",p)}function a(e,o){const t=e.coordsChar({left:(o.left+o.right)/2,top:(o.top+o.bottom)/2}),n=e.state.info.options,i=n.render||e.getHelper(t,"info");if(i){const r=e.getTokenAt(t,!0);if(r){const u=i(r,n,e,t);u&&p(e,o,u)}}}function p(e,o,t){const i=document.createElement("div");i.className="CodeMirror-info",i.appendChild(t),document.body.appendChild(i);const u=i.getBoundingClientRect(),m=window.getComputedStyle(i),s=u.right-u.left+parseFloat(m.marginLeft)+parseFloat(m.marginRight),a=u.bottom-u.top+parseFloat(m.marginTop)+parseFloat(m.marginBottom);let p=o.bottom;a>window.innerHeight-o.bottom-15&&o.top>window.innerHeight-o.bottom&&(p=o.top-a),p<0&&(p=o.bottom);let f,c=Math.max(0,window.innerWidth-s-15);c>o.left&&(c=o.left),i.style.opacity="1",i.style.top=p+"px",i.style.left=c+"px";const l=r((function(){clearTimeout(f)}),"onMouseOverPopup"),d=r((function(){clearTimeout(f),f=setTimeout(v,200)}),"onMouseOut"),v=r((function(){n.C.off(i,"mouseover",l),n.C.off(i,"mouseout",d),n.C.off(e.getWrapperElement(),"mouseout",d),i.style.opacity?(i.style.opacity="0",setTimeout((()=>{i.parentNode&&i.parentNode.removeChild(i)}),600)):i.parentNode&&i.parentNode.removeChild(i)}),"hidePopup");n.C.on(i,"mouseover",l),n.C.on(i,"mouseout",d),n.C.on(e.getWrapperElement(),"mouseout",d)}n.C.defineOption("info",!1,((e,o,t)=>{if(t&&t!==n.C.Init){const o=e.state.info.onMouseOver;n.C.off(e.getWrapperElement(),"mouseover",o),clearTimeout(e.state.info.hoverTimeout),delete e.state.info}if(o){const t=e.state.info=u(o);t.onMouseOver=s.bind(null,e),n.C.on(e.getWrapperElement(),"mouseover",t.onMouseOver)}})),r(u,"createState"),r(m,"getHoverTime"),r(s,"onMouseOver"),r(a,"onMouseHover"),r(p,"showPopup")}}]);
//# sourceMappingURL=1574-e748414d091af8164dcc.chunk.js.map