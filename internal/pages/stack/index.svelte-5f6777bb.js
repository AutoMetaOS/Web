import{S as G,i as J,s as N,w as M,x as T,y as B,q as v,o as k,B as C,e as x,t as R,k as E,L as U,c as j,a as F,h as V,d as $,m as z,b,M as W,J as w,g as L,p as H,Y as K,R as O,v as P,n as Q}from"../../chunks/vendor-58b3727c.js";import X from"./tile.svelte-46bf1dfd.js";import{F as Z,f as ee,a as te}from"../../chunks/filter-7af1984e.js";import se from"./adder.svelte-2bdb33b2.js";import"../../chunks/index-11cd3664.js";function Y(c,a,o){const s=c.slice();return s[4]=a[o],s}function A(c){let a,o;return a=new X({props:{size:c[0],data:c[4]}}),{c(){M(a.$$.fragment)},l(s){T(a.$$.fragment,s)},m(s,t){B(a,s,t),o=!0},p(s,t){const f={};t&1&&(f.size=s[0]),t&6&&(f.data=s[4]),a.$set(f)},i(s){o||(v(a.$$.fragment,s),o=!0)},o(s){k(a.$$.fragment,s),o=!1},d(s){C(a,s)}}}function re(c){let a,o,s,t,f,u,i,h,_,S,d,q,y;_=new Z({}),d=new se({props:{size:c[0]}});let p=c[2].filter(c[1]),r=[];for(let e=0;e<p.length;e+=1)r[e]=A(Y(c,p,e));const D=e=>k(r[e],1,1,()=>{r[e]=null});return{c(){a=x("style"),o=R(`body {
            background: #222;
        }`),s=E(),t=x("section"),f=x("div"),u=x("img"),h=E(),M(_.$$.fragment),S=E(),M(d.$$.fragment),q=E();for(let e=0;e<r.length;e+=1)r[e].c();this.h()},l(e){const l=U('[data-svelte="svelte-o7vier"]',document.head);a=j(l,"STYLE",{});var m=F(a);o=V(m,`body {
            background: #222;
        }`),m.forEach($),l.forEach($),s=z(e),t=j(e,"SECTION",{class:!0});var n=F(t);f=j(n,"DIV",{class:!0});var g=F(f);u=j(g,"IMG",{class:!0,src:!0,width:!0,height:!0,alt:!0}),h=z(g),T(_.$$.fragment,g),g.forEach($),S=z(n),T(d.$$.fragment,n),q=z(n);for(let I=0;I<r.length;I+=1)r[I].l(n);n.forEach($),this.h()},h(){b(u,"class","m10"),W(u.src,i="/OUI/icons/infinity.svg")||b(u,"src",i),b(u,"width","40px"),b(u,"height","40px"),b(u,"alt",""),b(f,"class","\u0192 \u2206-bw w-100"),b(t,"class","\u0192 \u0192\u2211")},m(e,l){w(document.head,a),w(a,o),L(e,s,l),L(e,t,l),w(t,f),w(f,u),w(f,h),B(_,f,null),w(t,S),B(d,t,null),w(t,q);for(let m=0;m<r.length;m+=1)r[m].m(t,null);y=!0},p(e,[l]){const m={};if(l&1&&(m.size=e[0]),d.$set(m),l&7){p=e[2].filter(e[1]);let n;for(n=0;n<p.length;n+=1){const g=Y(e,p,n);r[n]?(r[n].p(g,l),v(r[n],1)):(r[n]=A(g),r[n].c(),v(r[n],1),r[n].m(t,null))}for(Q(),n=p.length;n<r.length;n+=1)D(n);H()}},i(e){if(!y){v(_.$$.fragment,e),v(d.$$.fragment,e);for(let l=0;l<p.length;l+=1)v(r[l]);y=!0}},o(e){k(_.$$.fragment,e),k(d.$$.fragment,e),r=r.filter(Boolean);for(let l=0;l<r.length;l+=1)k(r[l]);y=!1},d(e){$(a),e&&$(s),e&&$(t),C(_),C(d),K(r,e)}}}function ne(c,a,o){let s,t,f;O(c,ee,i=>o(3,t=i)),O(c,te,i=>o(2,f=i));const u={width:"400px",height:"300px"};return P(()=>{const i=window.innerWidth;let h=0;i>0&&(h=1),i>300&&(h=2),i>600&&(h=3),i>991&&(h=4),i>1440&&(h=5),o(0,u.width=~~(i/h)+"px",u),o(0,u.height=~~(3/4*i/h)+"px",u)}),c.$$.update=()=>{c.$$.dirty&8&&o(1,s=i=>(t==null?void 0:t.length)?i.type===t:!0)},[u,s,f,t]}class fe extends G{constructor(a){super();J(this,a,ne,re,N,{})}}export{fe as default};
