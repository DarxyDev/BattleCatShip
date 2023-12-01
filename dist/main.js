(()=>{"use strict";var e={434:(e,n,t)=>{t.d(n,{Z:()=>c});var r=t(81),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([e.id,"/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}",""]);const c=i},890:(e,n,t)=>{t.d(n,{Z:()=>p});var r=t(81),o=t.n(r),a=t(645),i=t.n(a),c=t(667),l=t.n(c),s=new URL(t(357),t.b),u=i()(o()),d=l()(s);u.push([e.id,`:root{\n    --COL_mainBG: black;\n    --COL_gameBG: antiquewhite;\n    --COL_defaultText:white;\n\n    --TINT_dark:rgba(0,0,0,.75);\n    --TINT_light:rgba(0, 254, 246, 0.2);\n\n    --SIZE_defaultGap:1.5em;\n    --SIZE_defaultPadding:1.5em;\n}\nhtml{\n    height:100%;\n    width:100%;\n    background-image: url(${d});\n    background-size:33%;\n    color:var(--COL_defaultText);\n}\nbody{\n    width:100%;\n    height:100%;\n}\nh1{\n    font-size: 4em;\n}\nh3{\n    font-size: 2em;\n}\n#gameWindow {\n    position: relative;\n    width:100%;\n    height:100%;\n    background-color: var(--TINT_dark);\n}\n\n.fullscreen{\n    position:absolute;\n    width:100%;\n    height:100%;\n}\n.fl-col-center{\n    display:flex;\n    flex-direction:column;\n    justify-content: center;\n    align-items: center;\n}\n.gap{\n    gap:var(--SIZE_defaultGap);\n}\n.pad{\n    padding:var(--SIZE_defaultPadding);\n}\n.scene-container{\n    width:100%;\n    height:100%;\n}\n.section-container{\n    position:absolute;\n    background-color: var(--TINT_light);\n}\n\n\n/* Animations */\n.blink{\n    animation: 2s infinite alternate blink;\n}\n@keyframes blink {\n    from {opacity: 100%;}\n    33%{opacity: 100%}\n    to {opacity:0%;}\n}`,""]);const p=u},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);r&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var l=e[c],s=r.base?l[0]+r.base:l[0],u=a[s]||0,d="".concat(s," ").concat(u);a[s]=u+1;var p=t(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=o(f,r);r.byIndex=c,n.splice(c,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=t(a[i]);n[c].references--}for(var l=r(e,o),s=0;s<a.length;s++){var u=t(a[s]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}a=l}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},357:(e,n,t)=>{e.exports=t.p+"9b730c4d9de3300fd62e.png"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),r=t(795),o=t.n(r),a=t(569),i=t.n(a),c=t(565),l=t.n(c),s=t(216),u=t.n(s),d=t(589),p=t.n(d),f=t(434),m={};m.styleTagTransform=p(),m.setAttributes=l(),m.insert=i().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=u(),n()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;var g=t(890),h={};h.styleTagTransform=p(),h.setAttributes=l(),h.insert=i().bind(null,"head"),h.domAPI=o(),h.insertStyleElement=u(),n()(g.Z,h),g.Z&&g.Z.locals&&g.Z.locals;const y=function(e,n="human"){let t=0,r=0,o=0;return{get:{name:()=>e,type:()=>n,games:()=>t,wins:()=>r,streak:()=>o},addGamePlayed:e=>{t++,e?(r++,o++):o=0}}};let v,b,S;const T={player1:{player:()=>v},player2:{player:()=>b},game:{isSinglePlayer:()=>S}},w={player1:{player:e=>{void 0===v&&(v=e)}},player2:{player:e=>{void 0===b&&(b=e)}},game:{isSinglePlayer:e=>{void 0===S?!0===e||!1===e?S=e:console.log(`${e} is not boolean. Returning.`):console.log("Can not change number of players. Returning.")}}};let k,E={main:{},p1:{},p2:{}};const P=document.getElementById("gameWindow"),I={initializeScenes:function(){(function(){let e=_("TEMPLATE_title-screen");function n(){document.body.removeEventListener("click",n),document.body.removeEventListener("keypress",n),k==e?x(E.main.playerSelect):console.log("Current scene is not titleScreen. Removing titleScreen event listeners and returning.")}E.main.titleScreen=e,document.body.addEventListener("click",n),document.body.addEventListener("keypress",n)})(),function(){let e=_("TEMPLATE_player-select");E.main.playerSelect=e;const n=e.querySelector('[pSelectID="submit"]'),t=e.querySelector('[pSelectID="singlePlayer"]'),r=e.querySelector('[pSelectID="player1"]'),o=e.querySelector('[pSelectID="player2"]');n.addEventListener("click",(function(){let e=t.checked,n=r.value;""===n&&(n="Player1");let a="human",i=y(n,a);w.player1.player(i),e?(n="CPU",a="computer"):(n=o.value,""===n&&(n="Player 2")),i=y(n,a),w.player2.player(i),w.game.isSinglePlayer(e),x(E.p1.piecePlacement)}))}(),function(){function e(){return _("TEMPLATE_piece-placement")}E.p1.piecePlacement=e(),T.game.isSinglePlayer()?E.p2.piecePlacement=null:E.p2.piecePlacement=e()}()},getScenes:function(){return E},loadScene:x};function x(e){k&&k.remove(),e?(P.appendChild(e),k=e):console.log(`${{sceneNode:e}} is not a valid node.`)}function _(e){let n=document.getElementById(e);return n?n.content.firstElementChild.cloneNode(!0):(console.log(`${e} is an invalid template ID.`),!1)}I.initializeScenes();const L=I.getScenes();I.loadScene(L.main.titleScreen)})()})();