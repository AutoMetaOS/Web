import{S as B,i as D,s as H,j as x,m as y,o as S,x as m,u as _,v as T,e as v,k as w,t as L,c as b,a as j,n as E,d as g,g as M,b as A,f as N,H as d,w as O,U as Q,Q as R,A as U,r as V}from"../../chunks/vendor-ac8bda04.js";import Y from"./tile.svelte-d3d92988.js";import{A as z,g as F,f as G}from"../../chunks/adder-02218490.js";import"../../chunks/ClickableTile-a68d8438.js";import"../../chunks/TextInput-be34cf61.js";import"../../chunks/Tile-292ca9b5.js";import"../../chunks/molecular-e392fe60.js";function C(o,s,r){const e=o.slice();return e[2]=s[r],e}function I(o){let s,r;return s=new Y({props:{data:o[2]}}),{c(){x(s.$$.fragment)},l(e){y(s.$$.fragment,e)},m(e,i){S(s,e,i),r=!0},p(e,i){const c={};i&1&&(c.data=e[2]),s.$set(c)},i(e){r||(m(s.$$.fragment,e),r=!0)},o(e){_(s.$$.fragment,e),r=!1},d(e){T(s,e)}}}function J(o){let s,r,e,i,c,u,k,p;e=new z({});let f=o[0].sort(o[1]),a=[];for(let t=0;t<f.length;t+=1)a[t]=I(C(o,f,t));const q=t=>_(a[t],1,1,()=>{a[t]=null});return{c(){s=v("section"),r=v("div"),x(e.$$.fragment),i=w();for(let t=0;t<a.length;t+=1)a[t].c();c=w(),u=v("style"),k=L(`.tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }`),this.h()},l(t){s=b(t,"SECTION",{class:!0});var l=j(s);r=b(l,"DIV",{class:!0});var n=j(r);y(e.$$.fragment,n),i=E(n);for(let $=0;$<a.length;$+=1)a[$].l(n);n.forEach(g),c=E(l),u=b(l,"STYLE",{});var h=j(u);k=M(h,`.tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }`),h.forEach(g),l.forEach(g),this.h()},h(){A(r,"class","\u0192 \u0192\u2211"),A(s,"class","p5")},m(t,l){N(t,s,l),d(s,r),S(e,r,null),d(r,i);for(let n=0;n<a.length;n+=1)a[n].m(r,null);d(s,c),d(s,u),d(u,k),p=!0},p(t,[l]){if(l&3){f=t[0].sort(t[1]);let n;for(n=0;n<f.length;n+=1){const h=C(t,f,n);a[n]?(a[n].p(h,l),m(a[n],1)):(a[n]=I(h),a[n].c(),m(a[n],1),a[n].m(r,null))}for(V(),n=f.length;n<a.length;n+=1)q(n);O()}},i(t){if(!p){m(e.$$.fragment,t);for(let l=0;l<f.length;l+=1)m(a[l]);p=!0}},o(t){_(e.$$.fragment,t),a=a.filter(Boolean);for(let l=0;l<a.length;l+=1)_(a[l]);p=!1},d(t){t&&g(s),T(e),Q(a,t)}}}function K(o,s,r){let e;R(o,G,c=>r(0,e=c));const i=(c,u)=>c.rank>u.rank?1:-1;return U(()=>{F()}),[e,i]}class st extends B{constructor(s){super();D(this,s,K,J,H,{})}}export{st as default};
