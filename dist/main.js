(()=>{"use strict";var e={434:(e,n,t)=>{t.d(n,{Z:()=>c});var r=t(81),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([e.id,"/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}",""]);const c=i},890:(e,n,t)=>{t.d(n,{Z:()=>p});var r=t(81),o=t.n(r),a=t(645),i=t.n(a),c=t(667),l=t.n(c),s=new URL(t(357),t.b),d=i()(o()),u=l()(s);d.push([e.id,`:root{\n    --COL_mainBG: black;\n    --COL_gameBG: antiquewhite;\n    --COL_defaultText:white;\n\n    --TINT_dark:rgba(0,0,0,.75);\n    --TINT_lowDark: rgba(0,0,0,.25);\n    --TINT_light:rgba(0, 254, 246, 0.2);\n    --TINT_green_light:rgba(0, 255, 0, 0.2);\n    --TINT_red_light:rgba(255,0,0,.2);\n\n    --SIZE_defaultGap:1.5em;\n    --SIZE_defaultPadding:1.5em;\n}\nhtml{\n    height:100%;\n    width:100%;\n    background-image: url(${u});\n    background-size:33%;\n    color:var(--COL_defaultText);\n}\nbody{\n    width:100%;\n    height:100%;\n}\nh1{\n    font-size: 4em;\n}\nh3{\n    font-size: 2em;\n}\n#gameWindow {\n    position: relative;\n    width:100%;\n    height:100%;\n    background-color: var(--TINT_dark);\n}\n\n.fullscreen{\n    position:absolute;\n    width:100%;\n    height:100%;\n}\n.fl-col-center{\n    display:flex;\n    flex-direction:column;\n    justify-content: center;\n    align-items: center;\n}\n.fl-center{\n    display:flex;\n    justify-content: center;\n    align-items: center;\n}\n.gap{\n    gap:var(--SIZE_defaultGap);\n}\n.pad{\n    padding:var(--SIZE_defaultPadding);\n}\n.scene-container{\n    width:100%;\n    height:100%;\n}\n.section-container{\n    position:relative;\n    background-color: var(--TINT_light);\n}\n.quarter-box{\n    width:25%;\n    aspect-ratio: 1;\n}\n.grid-board-container{\n    display:grid;\n    grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n.board-tile{\n    width: 100%;\n    height:100%;\n    border:1px solid;\n}\n/* .board-tile:hover{\n    opacity:.5;\n    background-color:var(--TINT_lowDark)\n} */\n/* .board-tile:active{\n    opacity:.8;\n    background-color:var(--TINT_lowDark);\n} */\n.game-piece{\n    width:50px;\n    height:50px;\n    background-color: red;\n}\n.tile-hover{\n    background-color:var(--TINT_green_light);\n}\n.red-border{\n    border: 1px solid red;\n}\n.border{\n    border:1px solid;\n}\n.border-2px{\n    border:2px solid;\n}\n\n/* Animations */\n.blink{\n    animation: 2s infinite alternate blink;\n}\n@keyframes blink {\n    from {opacity: 100%;}\n    33%{opacity: 100%}\n    to {opacity:0%;}\n}`,""]);const p=d},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var l=e[c],s=r.base?l[0]+r.base:l[0],d=a[s]||0,u="".concat(s," ").concat(d);a[s]=d+1;var p=t(u),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var g=o(f,r);r.byIndex=c,n.splice(c,0,{identifier:u,updater:g,references:1})}i.push(u)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=t(a[i]);n[c].references--}for(var l=r(e,o),s=0;s<a.length;s++){var d=t(a[s]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=l}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},357:(e,n,t)=>{e.exports=t.p+"9b730c4d9de3300fd62e.png"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),r=t(795),o=t.n(r),a=t(569),i=t.n(a),c=t(565),l=t.n(c),s=t(216),d=t.n(s),u=t(589),p=t.n(u),f=t(434),g={};g.styleTagTransform=p(),g.setAttributes=l(),g.insert=i().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=d(),n()(f.Z,g),f.Z&&f.Z.locals&&f.Z.locals;var m=t(890),h={};h.styleTagTransform=p(),h.setAttributes=l(),h.insert=i().bind(null,"head"),h.domAPI=o(),h.insertStyleElement=d(),n()(m.Z,h),m.Z&&m.Z.locals&&m.Z.locals;function b(e,n,t){let r,o;return void 0===n[0]?(r=n,o=t):(r=n[0],o=n[1]),r>=e?new Error("Index out of bounds of rowLength."):r<0||o<0?new Error("Index can not be negative."):r*e+o}let v;const y={get:{game:{isSinglePlayer:()=>v,boardWidth:()=>10,boardHeight:()=>10}},set:{game:{isSinglePlayer:e=>{void 0===v?!0===e||!1===e?v=e:console.log(`${e} is not boolean. Returning.`):console.log("Can not change number of players. Returning.")}}}};(()=>{function e(e){const n=`player${e}`,t={},r={};let o;y.set[n]=r,y.get[n]=t,t.player=()=>o,r.player=e=>{if(void 0!==o)return console.log("player already set. Returning.");o=e};const a=function(e=10,n=10){let t=0;const r=e*n,o=[];for(let e=0;e<r;e++)o.push(!1);const a=[];for(let e=0;e<r;e++)a.push(!1);return{get:{unitsRemaining:()=>t,boardArray:()=>o,hitArray:()=>a,width:()=>e,height:()=>n},placeUnit:(n,r,a)=>{for(let t=0;t<n.get.length();t++){let n=a?b(e,r[0],r[1]+t):b(e,r[0]+t,r[1]);if(n instanceof Error||o[n])return!1}for(let t=0;t<n.get.length();t++){let i=a?b(e,r[0],r[1]+t):b(e,r[0]+t,r[1]);o[i]=n}return t++,!0},receiveAttack:n=>{const r=b(e,n);if(a[r])return!1;a[r]=!0;const i=o[r];return i?(i.hit(),i.isSunk()?(t--,"sunk"):"hit"):"miss"},isGameOver:()=>t<=0}}(10,10);t.gameBoard=()=>a,r.gameBoard=e=>{if(void 0!==a)return console.log("gameBoard already set. Returning.");a=e}}e(1),e(2)})();const S=y;let T;let w,k={main:{},p1:{},p2:{}};const E=document.getElementById("gameWindow"),x={initializeScenes:function(){k.main.titleScreen=function(){let e=I("TEMPLATE_title-screen");function n(){document.body.removeEventListener("click",n),document.body.removeEventListener("keypress",n),x.getCurrentScene()==e?loadScene(scenes.main.playerSelect):console.log("Current scene is not titleScreen. Removing titleScreen event listeners and returning.")}return document.body.addEventListener("click",n),document.body.addEventListener("keypress",n),e}(),k.main.playerSelect=function(){let e=I("TEMPLATE_player-select");const n=e.querySelector('[pSelectID="submit"]'),t=e.querySelector('[pSelectID="singlePlayer"]'),r=e.querySelector('[pSelectID="player1"]'),o=e.querySelector('[pSelectID="player2"]');return n.addEventListener("click",(function(){let e=t.checked,n=r.value;""===n&&(n="Player1");let a="human",i=playerFactory(n,a);gameState.set.player1.player(i),e?(n="CPU",a="computer"):(n=o.value,""===n&&(n="Player 2")),i=playerFactory(n,a),gameState.set.player2.player(i),gameState.set.game.isSinglePlayer(e),loadScene(scenes.p1.piecePlacement)})),e}(),[k.p1.piecePlacement,k.p2.piecePlacement]=function(){const e={};return e.p1=n(),S.get.game.isSinglePlayer()?e.p2=null:e.p2=n(),[e.p1,e.p2];function n(){const e=I("TEMPLATE_piece-placement"),n=e.querySelector('[pPlacementID="gameBox"]');return T=function(e,n=10,t=10){const r=[];for(let o=0;o<t;o++)for(let t=0;t<n;t++){const n=document.createElement("div");n.classList.add("board-tile"),n.setAttribute("posX",t),n.setAttribute("posY",o),e.appendChild(n),r.push(n)}return r}(n),T.forEach((e=>{e.addEventListener("mouseover",(n=>{e.getAttribute("posX"),e.getAttribute("posY"),e.classList.add("tile-hover")})),e.addEventListener("mouseleave",(()=>{e.classList.remove("tile-hover")}))})),e}}()},getScenes:function(){return k},loadScene:function(e){w&&w.remove(),e?(E.appendChild(e),w=e):console.log(`${{sceneNode:e}} is not a valid node.`)},getCurrentScene:function(){return w}};function I(e){let n=document.getElementById(e);return n?n.content.firstElementChild.cloneNode(!0):(console.log(`${e} is an invalid template ID.`),!1)}x.initializeScenes();const _=x.getScenes();x.loadScene(_.p1.piecePlacement)})()})();