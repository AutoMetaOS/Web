import{S as J,i as Q,s as U,e as y,t as m,c as b,a as w,h as v,d as g,b as k,a3 as E,g as q,J as u,U as C,a4 as F,j as H,k as Y,m as z,f as A,E as D,Y as B,Q as I}from"../../chunks/index-132e5a0e.js";import{f as G,a as V}from"../../chunks/index-6c1336a6.js";import{t as S}from"../../chunks/index-50aceac0.js";import"../../chunks/index-cfd1276c.js";function T(a,e,n){const i=a.slice();return i[4]=e[n],i}function j(a){let e,n=a[4]+"",i,c,r=a[1](a[4])+"",f,o,_,d;return{c(){e=y("div"),i=m(n),c=m("s: "),f=m(r),this.h()},l(l){e=b(l,"DIV",{id:!0,class:!0});var t=w(e);i=v(t,n),c=v(t,"s: "),f=v(t,r),t.forEach(g),this.h()},h(){k(e,"id",o="ct-"+a[4]),k(e,"class","p10 m10 rx5 svelte-stww1r"),E(e,"active",a[2]===a[4])},m(l,t){q(l,e,t),u(e,i),u(e,c),u(e,f),_||(d=C(e,"click",F(a[3])),_=!0)},p(l,t){t&2&&r!==(r=l[1](l[4])+"")&&H(f,r),t&4&&E(e,"active",l[2]===l[4])},d(l){l&&g(e),_=!1,d()}}}function K(a){let e,n,i,c,r=a[0].length+"",f,o,_,d=S,l=[];for(let t=0;t<d.length;t+=1)l[t]=j(T(a,d,t));return{c(){e=y("div");for(let t=0;t<l.length;t+=1)l[t].c();n=Y(),i=y("div"),c=m("Total: "),f=m(r),this.h()},l(t){e=b(t,"DIV",{class:!0,style:!0});var h=w(e);for(let p=0;p<l.length;p+=1)l[p].l(h);n=z(h),i=b(h,"DIV",{class:!0});var s=w(i);c=v(s,"Total: "),f=v(s,r),s.forEach(g),h.forEach(g),this.h()},h(){k(i,"class","p10 m10 fw5 rx5 svelte-stww1r"),k(e,"class","\u0192 \u0192\u2211"),A(e,"color","#fff")},m(t,h){q(t,e,h);for(let s=0;s<l.length;s+=1)l[s].m(e,null);u(e,n),u(e,i),u(i,c),u(i,f),o||(_=C(i,"click",F(a[3])),o=!0)},p(t,[h]){if(h&14){d=S;let s;for(s=0;s<d.length;s+=1){const p=T(t,d,s);l[s]?l[s].p(p,h):(l[s]=j(p),l[s].c(),l[s].m(e,n))}for(;s<l.length;s+=1)l[s].d(1);l.length=d.length}h&1&&r!==(r=t[0].length+"")&&H(f,r)},i:D,o:D,d(t){t&&g(e),B(l,t),o=!1,_()}}}function L(a,e,n){let i,c,r;I(a,G,o=>n(0,c=o)),I(a,V,o=>n(2,r=o));const f=o=>V.set(o.target.id.split("-")[1]);return a.$$.update=()=>{a.$$.dirty&1&&n(1,i=o=>c.map(_=>_.type).filter(_=>_===o).length)},[c,i,r,f]}class R extends J{constructor(e){super(),Q(this,e,L,K,U,{})}}export{R as default};
