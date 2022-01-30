import{S as b,i as j,s as E,e as u,c as f,a as m,d as o,b as d,M,g as _,l as y,k,t as S,L as q,m as I,h as $,J as v,K as g,Y as C,a6 as P,v as T}from"./vendor-58b3727c.js";/* empty css                                            */import{d as V}from"./index-41082c0c.js";function z(l,t,a){const e=l.slice();return e[2]=t[a],e}function D(l){let t,a;return{c(){t=u("script"),this.h()},l(e){t=f(e,"SCRIPT",{type:!0,src:!0});var r=m(t);r.forEach(o),this.h()},h(){d(t,"type","text/javascript"),M(t.src,a=`https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/${l[2]}`)||d(t,"src",a)},m(e,r){_(e,t,r)},d(e){e&&o(t)}}}function G(l){let t,a,e,r,h,w=["ace.min.js","mode-html.min.js","theme-chrome.min.js"],i=[];for(let s=0;s<3;s+=1)i[s]=D(z(l,w,s));return{c(){for(let s=0;s<3;s+=1)i[s].c();t=y(),a=k(),e=u("div"),r=u("pre"),h=S("Initialising..."),this.h()},l(s){const n=q('[data-svelte="svelte-qsmbgv"]',document.head);for(let p=0;p<3;p+=1)i[p].l(n);t=y(),n.forEach(o),a=I(s),e=f(s,"DIV",{class:!0});var c=m(e);r=f(c,"PRE",{class:!0,id:!0});var x=m(r);h=$(x,"Initialising..."),x.forEach(o),c.forEach(o),this.h()},h(){d(r,"class","w-100 svelte-19p418o"),d(r,"id","editor"),d(e,"class","w-50 h-100 p-rel fade-right")},m(s,n){for(let c=0;c<3;c+=1)i[c].m(document.head,null);v(document.head,t),_(s,a,n),_(s,e,n),v(e,r),v(r,h)},p:g,i:g,o:g,d(s){C(i,s),o(t),s&&o(a),s&&o(e)}}}function R(l){const t=P(),a=e=>t("code",e);return T(()=>{setTimeout(function(){let e=ace.edit("editor");e.setTheme("ace/theme/chrome"),e.session.setMode("ace/mode/html"),e.setOptions({useWrapMode:!0,wrapBehavioursEnabled:!0,wrap:!0,showPrintMargin:!1,fontSize:16,cursorStyle:"slim"}),e.on("change",V(function(){a(e.getValue())},500)),e.setValue(B)},500)}),[]}class O extends b{constructor(t){super();j(this,t,R,G,E,{})}}const B=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
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
<style>
svg{
    width: 700px;
    height: 700px;
    border: 1px solid #aaa8;
    border-radius:5px;
}
</style>`,W=l=>l.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,`
`).split(" ").length;export{O as E,W as w};
