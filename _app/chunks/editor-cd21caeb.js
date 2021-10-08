import{_ as S}from"./preload-helper-ec9aa979.js";import{aa as D,A as G,S as R,i as z,s as B,e as m,k as y,c as h,a as _,d as c,n as E,b as u,af as C,V as T,f as g,H as v,I as b,Y as k,B as V,_ as L,t as A,g as j,a6 as d,J as W}from"./vendor-0748db5e.js";const q=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="a" x1="0" y1="0" x2="60%" y2="60%">
    <stop offset="0" stop-color="#2af"/>
    <stop offset="1" stop-color="rgba(250,220,240)"/>
  </linearGradient>
</defs>
<g fill="url(#a)">
  <path transform="scale(0.64) translate(150,150)" d="M380 125l-9-1s-96-7-134 119c-34 110-111 105-115 105h-5a102 102 0 015-204c35 0 67 18 86 47l16-11a122 122 0 10-100 188c17 0 97-6 132-119 33-110 111-105 115-105h7a102 102 0 11-94 157l-16 11a122 122 0 10112-187z"/>
    <circle stroke="url(#a)" fill="none" stroke-width="8" cx="50%" cy="50%" r="49%" />
 </g>
</svg>
<!-- SVG -->
<style>
svg{
    width: 700px;
    height: 700px;
    border: 1px solid #aaa8;
    border-radius:5px;
}
</style>`,Z=s=>s.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,`
`).split(" ").length;function H(s){let e,a,i,l,o;return{c(){e=m("pre"),a=A(f),i=y(),l=m("div"),o=A("loading editor..."),this.h()},l(t){e=h(t,"PRE",{style:!0,class:!0});var r=_(e);a=j(r,f),r.forEach(c),i=E(t),l=h(t,"DIV",{style:!0});var w=_(l);o=j(w,"loading editor..."),w.forEach(c),this.h()},h(){d(e,"position","absolute"),d(e,"left","0"),d(e,"top","0"),u(e,"class","svelte-151fbwf"),d(l,"position","absolute"),d(l,"width","100%"),d(l,"bottom","0")},m(t,r){g(t,e,r),v(e,a),g(t,i,r),g(t,l,r),v(l,o)},p:b,d(t){t&&c(e),t&&c(i),t&&c(l)}}}function J(s){let e,a,i,l,o=!p&&H();return{c(){e=m("div"),a=m("textarea"),i=y(),o&&o.c(),this.h()},l(t){e=h(t,"DIV",{class:!0});var r=_(e);a=h(r,"TEXTAREA",{tabindex:!0,class:!0}),_(a).forEach(c),i=E(r),o&&o.l(r),r.forEach(c),this.h()},h(){u(a,"tabindex","2"),a.value=f,u(a,"class","svelte-151fbwf"),u(e,"class",l=""+(C(`codemirror-container ${s[0].class}`)+" svelte-151fbwf")),T(e,"flex",I)},m(t,r){g(t,e,r),v(e,a),s[1](a),v(e,i),o&&o.m(e,null)},p(t,[r]){p||o.p(t,r),r&1&&l!==(l=""+(C(`codemirror-container ${t[0].class}`)+" svelte-151fbwf"))&&u(e,"class",l),r&1&&T(e,"flex",I)},i:b,o:b,d(t){t&&c(e),s[1](null),o&&o.d()}}}const K=D();let I=!1,N=!0,$=!0,f=q,O="htmlmixed";function ee(s){if(f=s,n){const{left:e,top:a}=n.getScrollInfo();n.setValue(f=s),n.scrollTo(e,a)}}const U={js:{name:"javascript",json:!1},htmlmixed:{name:"handlebars",base:"text/html"}},M={};let n,p;G(async()=>{p=(await S(()=>import("./codemirror-849ed0e8.js"),["chunks/codemirror-849ed0e8.js","assets/codemirror-f201ac19.css","chunks/vendor-0748db5e.js"])).default,await X(O),n&&n.setValue(f||"")});let x=!0;async function X(s){if(!p)return;n&&n.toTextArea();const e={lineNumbers:N,lineWrapping:!0,indentWithTabs:!0,indentUnit:2,tabSize:2,value:"",mode:U[s]||{name:s},autoCloseBrackets:!0,autoCloseTags:!0,extraKeys:{Enter:"newlineAndIndentContinueMarkdownList","Ctrl-/":"toggleComment","Cmd-/":"toggleComment"},foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]};x&&await P(50),n=p.fromTextArea(M.editor,e),n.on("change",a=>{const i=a.getValue();K("change",{value:i})}),x&&await P(50),n.refresh(),x=!1}const P=s=>new Promise(e=>setTimeout(e,s));function Y(s,e,a){const i=[];let l=k(e,i);function o(t){W[t?"unshift":"push"](()=>{M.editor=t})}return s.$$set=t=>{e=V(V({},e),L(t)),a(0,l=k(e,i))},[l,o]}class te extends R{constructor(e){super();z(this,e,Y,J,B,{})}}export{te as E,I as f,N as l,$ as t,ee as u,Z as w};
