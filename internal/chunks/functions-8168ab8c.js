import{S as b,i as E,s as j,e as m,c as _,a as v,d as n,b as d,M,g,l as w,k as T,t as k,L as S,m as q,h as I,J as y,K as x,Y as $,a9 as C,v as P}from"./vendor-c4bd8a8d.js";/* empty css                                            */function V(o,s,r){const a=o.slice();return a[3]=s[r],a}function z(o){let s,r;return{c(){s=m("script"),this.h()},l(a){s=_(a,"SCRIPT",{type:!0,src:!0});var e=v(s);e.forEach(n),this.h()},h(){d(s,"type","text/javascript"),M(s.src,r=`https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/${o[3]}`)||d(s,"src",r)},m(a,e){g(a,s,e)},d(a){a&&n(s)}}}function D(o){let s,r,a,e,h,p=["ace.min.js","mode-html.min.js","theme-chrome.min.js"],l=[];for(let t=0;t<3;t+=1)l[t]=z(V(o,p,t));return{c(){for(let t=0;t<3;t+=1)l[t].c();s=w(),r=T(),a=m("div"),e=m("pre"),h=k("Initialising..."),this.h()},l(t){const i=S('[data-svelte="svelte-qsmbgv"]',document.head);for(let f=0;f<3;f+=1)l[f].l(i);s=w(),i.forEach(n),r=q(t),a=_(t,"DIV",{class:!0});var c=v(a);e=_(c,"PRE",{class:!0,id:!0});var u=v(e);h=I(u,"Initialising..."),u.forEach(n),c.forEach(n),this.h()},h(){d(e,"class","w-100 svelte-19p418o"),d(e,"id","editor"),d(a,"class","w-50 h-100 p-rel fade-right")},m(t,i){for(let c=0;c<3;c+=1)l[c].m(document.head,null);y(document.head,s),g(t,r,i),g(t,a,i),y(a,e),y(e,h)},p:x,i:x,o:x,d(t){$(l,t),n(s),t&&n(r),t&&n(a)}}}function G(o){const s=function(e,h,p){let l;return()=>{let t=this,i=arguments,c=function(){l=null,p||e.apply(t,i)},u=p&&!l;clearTimeout(l),l=setTimeout(c,h),u&&e.apply(t,i)}},r=C(),a=e=>r("code",e);return P(()=>{setTimeout(function(){let e=ace.edit("editor");e.setTheme("ace/theme/chrome"),e.session.setMode("ace/mode/html"),e.setOptions({useWrapMode:!0,wrapBehavioursEnabled:!0,wrap:!0,showPrintMargin:!1,fontSize:16,cursorStyle:"slim"}),e.on("change",s(function(){a(e.getValue())},500)),e.setValue(L)},500)}),[]}class H extends b{constructor(s){super();E(this,s,G,D,j,{})}}const L=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
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
</style>
<h4></h4>
<h5></h5>
<p></p>
<script>
[p, h4, h5] = ['p', 'h4', 'h5'].map(\u0192);

p.innerHTML = 1;
<\/script>`,J=o=>o.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,`
`).split(" ").length;export{H as E,J as w};
