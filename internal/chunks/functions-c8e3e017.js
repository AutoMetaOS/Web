import{S as x,i as y,s as b,e as p,t as v,k,c as h,a as f,g as _,d as c,n as E,b as w,f as C,H as o,I as g,aa as I,A as S,af as $}from"./vendor-ac8bda04.js";/* empty css                                            */function j(i){let e,t,a,n,s,d;return{c(){e=p("div"),t=p("style"),a=v(`.codeflask__flatten {
            white-space: pre-wrap;
            word-wrap: break-word;
        }`),n=k(),s=p("pre"),d=v("Initialising..."),this.h()},l(l){e=h(l,"DIV",{class:!0});var r=f(e);t=h(r,"STYLE",{});var u=f(t);a=_(u,`.codeflask__flatten {
            white-space: pre-wrap;
            word-wrap: break-word;
        }`),u.forEach(c),n=E(r),s=h(r,"PRE",{class:!0,id:!0});var m=f(s);d=_(m,"Initialising..."),m.forEach(c),r.forEach(c),this.h()},h(){w(s,"class","w-100"),w(s,"id","code"),w(e,"class","w-50 h-100 p-rel fade-right")},m(l,r){C(l,e,r),o(e,t),o(t,a),o(e,n),o(e,s),o(s,d)},p:g,i:g,o:g,d(l){l&&c(e)}}}function z(i){const e=I(),t=a=>e("code",a);return S(()=>{const a=new $(\u0192("#code"),{language:"html",lineNumbers:!0,tabSize:4,wordWrap:!0});a.updateCode(D),a.onUpdate(n=>t(n))}),[]}class q extends x{constructor(e){super();y(this,e,z,j,b,{})}}const D=`<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
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
</style>`,A=i=>i.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,`
`).split(" ").length;export{q as E,A as w};
