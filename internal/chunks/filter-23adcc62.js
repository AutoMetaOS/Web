import{D,S as O,i as P,s as R,e as y,t as v,c as b,a as w,h as m,d as g,b as k,a7 as j,g as E,J as u,O as I,P as V,j as F,k as Y,m as z,f as A,K as S,Y as B,R as T}from"./vendor-c8cae9c7.js";import{s as G,a as q}from"./index-103846bb.js";const C=D(""),H=D([]);G.list("amos").then(async l=>H.set(l.reverse()));function J(l,e,n){const i=l.slice();return i[4]=e[n],i}function K(l){let e,n=l[4]+"",i,o,r=l[1](l[4])+"",f,c,_,d;return{c(){e=y("div"),i=v(n),o=v("s: "),f=v(r),this.h()},l(s){e=b(s,"DIV",{id:!0,class:!0});var t=w(e);i=m(t,n),o=m(t,"s: "),f=m(t,r),t.forEach(g),this.h()},h(){k(e,"id",c="ct-"+l[4]),k(e,"class","p10 m10 rx5 svelte-stww1r"),j(e,"active",l[2]===l[4])},m(s,t){E(s,e,t),u(e,i),u(e,o),u(e,f),_||(d=I(e,"click",V(l[3])),_=!0)},p(s,t){t&2&&r!==(r=s[1](s[4])+"")&&F(f,r),t&4&&j(e,"active",s[2]===s[4])},d(s){s&&g(e),_=!1,d()}}}function L(l){let e,n,i,o,r=l[0].length+"",f,c,_,d=q,s=[];for(let t=0;t<d.length;t+=1)s[t]=K(J(l,d,t));return{c(){e=y("div");for(let t=0;t<s.length;t+=1)s[t].c();n=Y(),i=y("div"),o=v("Total: "),f=v(r),this.h()},l(t){e=b(t,"DIV",{class:!0,style:!0});var h=w(e);for(let p=0;p<s.length;p+=1)s[p].l(h);n=z(h),i=b(h,"DIV",{class:!0});var a=w(i);o=m(a,"Total: "),f=m(a,r),a.forEach(g),h.forEach(g),this.h()},h(){k(i,"class","p10 m10 fw5 rx5 svelte-stww1r"),k(e,"class","\u0192 \u0192\u2211"),A(e,"color","#fff")},m(t,h){E(t,e,h);for(let a=0;a<s.length;a+=1)s[a].m(e,null);u(e,n),u(e,i),u(i,o),u(i,f),c||(_=I(i,"click",V(l[3])),c=!0)},p(t,[h]){if(h&14){d=q;let a;for(a=0;a<d.length;a+=1){const p=J(t,d,a);s[a]?s[a].p(p,h):(s[a]=K(p),s[a].c(),s[a].m(e,n))}for(;a<s.length;a+=1)s[a].d(1);s.length=d.length}h&1&&r!==(r=t[0].length+"")&&F(f,r)},i:S,o:S,d(t){t&&g(e),B(s,t),c=!1,_()}}}function M(l,e,n){let i,o,r;T(l,H,c=>n(0,o=c)),T(l,C,c=>n(2,r=c));const f=c=>C.set(c.target.id.split("-")[1]);return l.$$.update=()=>{l.$$.dirty&1&&n(1,i=c=>o.map(_=>_.type).filter(_=>_===c).length)},[o,i,r,f]}class U extends O{constructor(e){super();P(this,e,M,L,R,{})}}export{U as F,H as a,C as f};