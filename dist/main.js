(()=>{"use strict";var e={434:(e,n,t)=>{t.d(n,{Z:()=>l});var r=t(81),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([e.id,"/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}",""]);const l=i},890:(e,n,t)=>{t.d(n,{Z:()=>p});var r=t(81),o=t.n(r),a=t(645),i=t.n(a),l=t(667),c=t.n(l),s=new URL(t(357),t.b),d=i()(o()),u=c()(s);d.push([e.id,`:root {\n    --COL_mainBG: black;\n    --COL_gameBG: antiquewhite;\n    --COL_defaultText: white;\n    --COL_altDefaultText: antiquewhite;\n\n    --TINT_dark: rgba(0, 0, 0, .75);\n    --TINT_lowDark: rgba(0, 0, 0, .25);\n    --TINT_light: rgba(0, 254, 246, 0.2);\n    --TINT_green_light: rgba(0, 255, 0, 0.2);\n    --TINT_green_dark: rgba(0, 255, 0, 0.8);\n    --TINT_red_light: rgba(255, 0, 0, .2);\n\n    --SIZE_defaultGap: 1.5em;\n    --SIZE_defaultPadding: 1.5em;\n}\n\nhtml {\n    height: 100%;\n    width: 100%;\n    background-image: url(${u});\n    background-size: 33%;\n    color: var(--COL_defaultText);\n}\n\nbody {\n    width: 100%;\n    height: 100%;\n}\n\nh1 {\n    font-size: 4em;\n}\n\nh3 {\n    font-size: 2em;\n}\n\n#gameWindow {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    background-color: var(--TINT_dark);\n}\n\n.fullscreen {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n}\n\n.fl-col-center {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.fl-center {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.gap {\n    gap: var(--SIZE_defaultGap);\n}\n\n.pad {\n    padding: var(--SIZE_defaultPadding);\n}\n\n.scene-container {\n    width: 100%;\n    height: 100%;\n}\n\n.section-container {\n    position: relative;\n    background-color: var(--TINT_light);\n}\n\n.quarter-box {\n    width: 25%;\n    aspect-ratio: 1;\n}\n\n.board-tile {\n    width: 100%;\n    height: 100%;\n    border: 1px solid;\n    box-sizing: border-box;\n}\n\n.pPlacement-tile:hover {\n    border: 3px solid var(--COL_altDefaultText);\n}\n\n.tile-greenbg {\n    background-color: var(--TINT_green_light);\n}\n\n.tile-selected-area {\n    background-color: var(--TINT_green_dark);\n}\n\n.tile-redbg {\n    background-color: var(--TINT_red_light);\n}\n\n.red-border {\n    border: 1px solid red;\n}\n\n.border {\n    border: 1px solid;\n}\n\n.border-2px {\n    border: 2px solid;\n}\n\n/* Animations */\n.blink {\n    animation: 2s infinite alternate blink;\n}\n\n@keyframes blink {\n    from {\n        opacity: 100%;\n    }\n\n    33% {\n        opacity: 100%\n    }\n\n    to {\n        opacity: 0%;\n    }\n}`,""]);const p=d},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(i[c]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},i=[],l=0;l<e.length;l++){var c=e[l],s=r.base?c[0]+r.base:c[0],d=a[s]||0,u="".concat(s," ").concat(d);a[s]=d+1;var p=t(u),g={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)n[p].references++,n[p].updater(g);else{var f=o(g,r);r.byIndex=l,n.splice(l,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var l=t(a[i]);n[l].references--}for(var c=r(e,o),s=0;s<a.length;s++){var d=t(a[s]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=c}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},357:(e,n,t)=>{e.exports=t.p+"9b730c4d9de3300fd62e.png"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),r=t(795),o=t.n(r),a=t(569),i=t.n(a),l=t(565),c=t.n(l),s=t(216),d=t.n(s),u=t(589),p=t.n(u),g=t(434),f={};f.styleTagTransform=p(),f.setAttributes=c(),f.insert=i().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=d(),n()(g.Z,f),g.Z&&g.Z.locals&&g.Z.locals;var m=t(890),h={};h.styleTagTransform=p(),h.setAttributes=c(),h.insert=i().bind(null,"head"),h.domAPI=o(),h.insertStyleElement=d(),n()(m.Z,h),m.Z&&m.Z.locals&&m.Z.locals;const b=function(e,n="human"){let t=0,r=0,o=0;return{get:{name:()=>e,type:()=>n,games:()=>t,wins:()=>r,streak:()=>o},addGamePlayed:e=>{t++,e?(r++,o++):o=0}}};function v(e,n){const t=e,r=n;let o=0;return{get:{name:()=>t,length:()=>r},hit:()=>{o++},isSunk:()=>o>=r}}function y(e,n,t){let r,o;return void 0===n[0]?(r=n,o=t):(r=n[0],o=n[1]),r>=e?new Error("Index out of bounds of rowLength."):r<0||o<0?new Error("Index can not be negative."):r*e+o}let T,k="p1";const S={get:{game:{isSinglePlayer:()=>T,boardWidth:()=>10,boardHeight:()=>10,pieceCount:()=>5},scene:{currentPlayer:()=>k}},set:{game:{isSinglePlayer:e=>{void 0===T?!0===e||!1===e?T=e:console.log(`${e} is not boolean. Returning.`):console.log("Can not change number of players. Returning.")}},scene:{swapPlayers:()=>(T||(k="p1"===k?"p2":"p1"),k),setCurrentPlayer:e=>{if("p1"!==e&&"p2"!==e)return console.log(`Invalid playerRef: ${e}`);k=e}}}};function x(e){const n=`player${e}`,t={},r={};let o;S.set[n]=r,S.get[n]=t,t.player=()=>o,r.player=e=>{if(void 0!==o)return console.log("player already set. Returning.");o=e};const a=function(e=10,n=10){let t=0;const r=e*n,o=[];for(let e=0;e<r;e++)o.push(!1);const a=[];for(let e=0;e<r;e++)a.push(!1);return{get:{unitsRemaining:()=>t,boardArray:()=>o,hitArray:()=>a,width:()=>e,height:()=>n},placeUnit:(n,r,a)=>{for(let t=0;t<n.get.length();t++){let n=a?y(e,r[0],r[1]+t):y(e,r[0]+t,r[1]);if(n instanceof Error||o[n])return!1}for(let t=0;t<n.get.length();t++){let i=a?y(e,r[0],r[1]+t):y(e,r[0]+t,r[1]);o[i]=n}return t++,!0},receiveAttack:n=>{const r=y(e,n);if(a[r])return!1;a[r]=!0;const i=o[r];return i?(i.hit(),i.isSunk()?(t--,"sunk"):"hit"):"miss"},isGameOver:()=>t<=0}}(10,10),i=[];for(let e=0;e<5;e++)i.push(v(e.toString,e+2));t.units=()=>i,t.gameboard=()=>a,r.gameboard=e=>{if(void 0!==a)return console.log("gameboard already set. Returning.");a=e}}x(1),x(2);const w=S,E=w.get.game.pieceCount(),I=w.get.game.boardWidth(),P=w.get.game.boardHeight(),_={p1:{gameTiles:void 0,placedPieces:[]},p2:{gameTiles:void 0,placedPieces:[]}};for(let e=0;e<E;e++)_.p1.placedPieces.push(!1),_.p2.placedPieces.push(!1);let L,C=[],A=1;const q=["tile-greenbg","tile-redbg","tile-selected-area"],N=function(){const e={};return e.p1=n("p1"),w.get.game.isSinglePlayer()?e.p2=null:e.p2=n("p2"),[e.p1,e.p2];function n(e){const n=F("TEMPLATE_piece-placement"),t=function(e){const n=[],t=w.get.game.boardWidth(),r=w.get.game.boardHeight();!function(e){const n=w.get.game.boardWidth(),t=w.get.game.boardHeight();e.style.display="grid",e.style.gridTemplate=`repeat(${t}, 1fr) / repeat(${n}, 1fr)`}(e);for(let o=0;o<r;o++)for(let r=0;r<t;r++){const t=document.createElement("div");t.classList.add("board-tile"),t.setAttribute("posX",r),t.setAttribute("posY",o),e.appendChild(t),n.push(t)}return n}(n.querySelector('[pPlacementID="gameBox"]'));return t.forEach((n=>{n.setAttribute("playerRef",e),n.classList.add("pPlacement-tile"),n.addEventListener("mouseover",r),n.addEventListener("mouseleave",o),n.addEventListener("click",a)})),_[e].gameTiles=t,n;function r(e){switch(A){case 1:$(e.target);break;case 2:!function(e){z(L,q[2]);const n=M(L),t=M(e),r=t.x-n.x,o=n.y-t.y,a=Math.abs(r)>Math.abs(o);let i;i=a?r>=0:o>=0;for(let e=1;e<=E;e++){let t=0;switch(!0){case a&&i:t=e<=r?2:0,z(D(e,n),q[t]);break;case a&&!i:t=e<=Math.abs(r)?2:0,z(j(e,n),q[t]);break;case!a&&i:t=e<=o?2:0,z(R(e,n),q[t]);break;case!a&&!i:t=e<=Math.abs(o)?2:0,z(O(e,n),q[t]);break;default:console.log("This should never appear. If it does, blame cosmic radiation.")}}}(e.target);break;default:console.log(`Invalid state: ${A}.`)}}function o(e){H()}function a(e){switch(A){case 1:H(),$(e.target),L=e.target,z(L,q[2]),A=2;break;case 2:console.log("not working?"),e.target,console.log("need to grab unit objects from old script to work with gameboard-manager"),console.log("returning false"),console.log("invalid spot");break;default:console.log(`Invalid state: ${A}.`)}}}};function M(e){const n={x:+e.getAttribute("posX"),y:+e.getAttribute("posY")};return void 0!==n.x&&void 0!==n.y||console.log(`Invalid tile coords in ${e}`),n}function $(e){const n=M(e),t=(n.y,n.x,w.get.scene.currentPlayer());e.classList.add(q[0]),C.push(e);for(let e=1;e<=E;e++)_[t].placedPieces[e-1]?console.log("mark red here?"):Z.forEach((t=>{let r=t(e,n);!1!==r&&z(r)}))}const Z=[R,O,j,D];function R(e,n){let t=n.y*I+n.x-e*I;return!(t<0)&&t}function O(e,n){let t=n.y*I+n.x+e*I;return!(t>=P*I)&&t}function j(e,n){let t=n.x-e;return!(t<0)&&n.y*I+t}function D(e,n){let t=n.x+e;return!(t>=I)&&n.y*I+t}function z(e,n=q[0]){if(!e)return;let t;if("number"==typeof e){let n=w.get.scene.currentPlayer();t=_[n].gameTiles[e]}else t=e;t.classList.add(n),C.push(t)}function H(){C.forEach((e=>{q.forEach((n=>{e.classList.remove(n)}))})),C=[]}let B,G={main:{},p1:{},p2:{}};const U=document.getElementById("gameWindow"),W={initializeScenes:function(){G.main.titleScreen=function(){let e=F("TEMPLATE_title-screen");function n(){document.body.removeEventListener("click",n),document.body.removeEventListener("keypress",n),W.getCurrentScene()==e?W.loadScene(W.getScenes().main.playerSelect):console.log("Current scene is not titleScreen. Removing titleScreen event listeners and returning.")}return document.body.addEventListener("click",n),document.body.addEventListener("keypress",n),e}(),G.main.playerSelect=function(){let e=F("TEMPLATE_player-select");const n=e.querySelector('[pSelectID="submit"]'),t=e.querySelector('[pSelectID="singlePlayer"]'),r=e.querySelector('[pSelectID="player1"]'),o=e.querySelector('[pSelectID="player2"]');return n.addEventListener("click",(function(){let e=t.checked,n=r.value;""===n&&(n="Player1");let a="human",i=b(n,a);w.set.player1.player(i),e?(n="CPU",a="computer"):(n=o.value,""===n&&(n="Player 2")),i=b(n,a),w.set.player2.player(i),w.set.game.isSinglePlayer(e),W.loadScene(W.getScenes().p1.piecePlacement)})),e}(),[G.p1.piecePlacement,G.p2.piecePlacement]=N()},getScenes:function(){return G},loadScene:function(e){B&&B.remove(),e?(U.appendChild(e),B=e):console.log(`${{sceneNode:e}} is not a valid node.`)},getCurrentScene:function(){return B}};function F(e){let n=document.getElementById(e);return n?n.content.firstElementChild.cloneNode(!0):(console.log(`${e} is an invalid template ID.`),!1)}W.initializeScenes();const X=W.getScenes();W.loadScene(X.p1.piecePlacement)})()})();