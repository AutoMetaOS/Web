import{S as z,i as G,s as K,e as d,t as q,k as b,w as B,c as f,a as g,h as A,d as h,m as V,x as J,b as j,f as Q,g as X,J as e,y as L,O as Y,j as Z,q as M,o as P,B as W,a8 as ee,v as te,a0 as se}from"../../chunks/vendor-cb8479ec.js";import{E as ae,w as ne}from"../../chunks/functions-23574160.js";import re from"./frame.svelte-83f53fca.js";/* empty css                                                       */function oe(v){let n,s,_,I,r,o,p,w,c,C,a,m,l,u,x,T,N,k,$,D,R,F;return u=new ae({}),u.$on("code",v[2]),$=new re({}),{c(){n=d("section"),s=d("nav"),_=d("div"),I=q("\xA0"),r=b(),o=d("div"),p=q(v[1]),w=b(),c=d("div"),C=q("md: "),a=d("input"),m=b(),l=d("article"),B(u.$$.fragment),x=b(),T=d("hr"),N=b(),k=d("div"),B($.$$.fragment),this.h()},l(t){n=f(t,"SECTION",{class:!0});var i=g(n);s=f(i,"NAV",{class:!0});var y=g(s);_=f(y,"DIV",{});var H=g(_);I=A(H,"\xA0"),H.forEach(h),r=V(y),o=f(y,"DIV",{});var O=g(o);p=A(O,v[1]),O.forEach(h),w=V(y),c=f(y,"DIV",{style:!0});var S=g(c);C=A(S,"md: "),a=f(S,"INPUT",{type:!0}),S.forEach(h),y.forEach(h),m=V(i),l=f(i,"ARTICLE",{class:!0});var E=g(l);J(u.$$.fragment,E),x=V(E),T=f(E,"HR",{class:!0}),N=V(E),k=f(E,"DIV",{class:!0});var U=g(k);J($.$$.fragment,U),U.forEach(h),E.forEach(h),i.forEach(h),this.h()},h(){j(a,"type","checkbox"),Q(c,"padding-right","20px"),j(s,"class","w-100 \u0192 \u2206-bw fade-down svelte-ujh5ef"),j(T,"class","svelte-ujh5ef"),j(k,"class","w-50 h-100 fade-left"),j(l,"class","\u0192 w-100 svelte-ujh5ef"),j(n,"class","svelte-ujh5ef")},m(t,i){X(t,n,i),e(n,s),e(s,_),e(_,I),e(s,r),e(s,o),e(o,p),e(s,w),e(s,c),e(c,C),e(c,a),a.checked=v[0],e(n,m),e(n,l),L(u,l,null),e(l,x),e(l,T),e(l,N),e(l,k),L($,k,null),D=!0,R||(F=Y(a,"change",v[3]),R=!0)},p(t,[i]){(!D||i&2)&&Z(p,t[1]),i&1&&(a.checked=t[0])},i(t){D||(M(u.$$.fragment,t),M($.$$.fragment,t),D=!0)},o(t){P(u.$$.fragment,t),P($.$$.fragment,t),D=!1},d(t){t&&h(n),W(u),W($),R=!1,F()}}}function le(v,n,s){const{F:_}=se,I=new ee;let r,o=!1,p=0,w="";const c=a=>{const m=o?I.render(a.detail):a.detail;if(w===m)return 0;w=m,r.document.open(),r.document.write(m),r.document.close(),s(1,p=o?ne(m):"Code")};te(()=>{var a;r=_("iframe"),r=r.contentWindow||((a=r.contentDocument)==null?void 0:a.document)});function C(){o=this.checked,s(0,o)}return[o,p,c,C]}class me extends z{constructor(n){super();G(this,n,le,oe,K,{})}}export{me as default};
