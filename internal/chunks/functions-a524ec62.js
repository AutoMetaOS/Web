import{S as u,i as f,s as g,e as d,t as v,c as p,a as h,g as x,d as i,b as l,f as w,H as m,I as n,a6 as _,A as y}from"./vendor-7295d73e.js";/* empty css                                            */function j(o){let t,s,r;return{c(){t=d("div"),s=d("pre"),r=v("Initialising..."),this.h()},l(e){t=p(e,"DIV",{class:!0});var a=h(t);s=p(a,"PRE",{class:!0,id:!0});var c=h(s);r=x(c,"Initialising..."),c.forEach(i),a.forEach(i),this.h()},h(){l(s,"class","w-100 svelte-19p418o"),l(s,"id","editor"),l(t,"class","w-50 h-100 p-rel fade-right")},m(e,a){w(e,t,a),m(t,s),m(s,r)},p:n,i:n,o:n,d(e){e&&i(t)}}}function b(o){const t=_(),s=r=>t("code",r);return y(()=>{["https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/ace.min.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/mode-html.min.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/theme-chrome.min.js"].forEach(e=>{const a=document.createElement("script");a.type="text/javascript",a.src=e,document.body.appendChild(a)}),setTimeout(function(){let e=ace.edit("editor");e.setTheme("ace/theme/chrome"),e.session.setMode("ace/mode/html"),e.setOptions({useWrapMode:!0,wrapBehavioursEnabled:!0,wrap:!0,showPrintMargin:!1,fontSize:16,cursorStyle:"slim"}),e.on("change",function(){s(e.getValue())}),e.setValue(E)},2e3)}),[]}class S extends u{constructor(t){super();f(this,t,b,j,g,{})}}const E=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
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
</style>`,C=o=>o.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,`
`).split(" ").length;export{S as E,C as w};
