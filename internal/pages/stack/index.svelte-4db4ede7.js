import{S as q,i as B,s as D,j as x,m as y,o as S,x as m,u as _,v as w,e as v,k as E,t as H,c as b,a as j,n as T,d as g,g as L,b as I,f as M,H as d,w as N,V as O,Q,A as R,r as Y}from"../../chunks/vendor-05f61b45.js";import z from"./tile.svelte-7f0d8d27.js";import F from"./adder.svelte-ba65544e.js";import{g as G,f as J}from"../../chunks/functions-bd0a4d12.js";import"../../chunks/TextInput-4effc771.js";import"../../chunks/Tile-491a8ec5.js";import"../../chunks/molecular-e392fe60.js";function A(l,s,r){const e=l.slice();return e[2]=s[r],e}function C(l){let s,r;return s=new z({props:{data:l[2]}}),{c(){x(s.$$.fragment)},l(e){y(s.$$.fragment,e)},m(e,i){S(s,e,i),r=!0},p(e,i){const c={};i&1&&(c.data=e[2]),s.$set(c)},i(e){r||(m(s.$$.fragment,e),r=!0)},o(e){_(s.$$.fragment,e),r=!1},d(e){w(s,e)}}}function K(l){let s,r,e,i,c,f,$,p;e=new F({});let u=l[0].sort(l[1]),a=[];for(let t=0;t<u.length;t+=1)a[t]=C(A(l,u,t));const V=t=>_(a[t],1,1,()=>{a[t]=null});return{c(){s=v("section"),r=v("div"),x(e.$$.fragment),i=E();for(let t=0;t<a.length;t+=1)a[t].c();c=E(),f=v("style"),$=H(`.tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }`),this.h()},l(t){s=b(t,"SECTION",{class:!0});var o=j(s);r=b(o,"DIV",{class:!0});var n=j(r);y(e.$$.fragment,n),i=T(n);for(let k=0;k<a.length;k+=1)a[k].l(n);n.forEach(g),c=T(o),f=b(o,"STYLE",{});var h=j(f);$=L(h,`.tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }`),h.forEach(g),o.forEach(g),this.h()},h(){I(r,"class","\u0192 \u0192\u2211"),I(s,"class","p5")},m(t,o){M(t,s,o),d(s,r),S(e,r,null),d(r,i);for(let n=0;n<a.length;n+=1)a[n].m(r,null);d(s,c),d(s,f),d(f,$),p=!0},p(t,[o]){if(o&3){u=t[0].sort(t[1]);let n;for(n=0;n<u.length;n+=1){const h=A(t,u,n);a[n]?(a[n].p(h,o),m(a[n],1)):(a[n]=C(h),a[n].c(),m(a[n],1),a[n].m(r,null))}for(Y(),n=u.length;n<a.length;n+=1)V(n);N()}},i(t){if(!p){m(e.$$.fragment,t);for(let o=0;o<u.length;o+=1)m(a[o]);p=!0}},o(t){_(e.$$.fragment,t),a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)_(a[o]);p=!1},d(t){t&&g(s),w(e),O(a,t)}}}function P(l,s,r){let e;Q(l,J,c=>r(0,e=c));const i=(c,f)=>c.rank>f.rank?1:-1;return R(()=>{G()}),[e,i]}class st extends q{constructor(s){super();B(this,s,P,K,D,{})}}export{st as default};
