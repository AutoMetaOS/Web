import{S as U,i as z,s as F,e as k,t as G,k as A,j as I,l as B,c as $,a as v,g as J,d as m,n as K,m as P,b as E,f as S,H as N,o as T,N as L,x as p,u as _,v as V,w as q,U as M,Q as W,r as y}from"../../../chunks/vendor-7295d73e.js";import{d as X}from"../../../chunks/store-76598d4b.js";import{S as Y}from"../../../chunks/Slider-9268b347.js";import{K as D}from"../../../chunks/molecular-e392fe60.js";import Z from"../shared/videoCard.svelte-2b6d51cf.js";import"../../../chunks/AspectRatio-d39869cf.js";function H(r,t,l){const e=r.slice();return e[5]=t[l],e}function O(r){let t,l,e,n,i,f,d,u,b,j,C;f=new Y({props:{hideTextInput:!0,max:4,value:1}}),f.$on("change",r[3]);let h=r[1].slice(0,r[0]*5),a=[];for(let s=0;s<h.length;s+=1)a[s]=Q(H(r,h,s));const R=s=>_(a[s],1,1,()=>{a[s]=null});return{c(){t=k("div"),l=k("span"),e=G("Nebula"),n=A(),i=k("span"),I(f.$$.fragment),d=A();for(let s=0;s<a.length;s+=1)a[s].c();u=B(),this.h()},l(s){t=$(s,"DIV",{class:!0});var c=v(t);l=$(c,"SPAN",{});var o=v(l);e=J(o,"Nebula"),o.forEach(m),n=K(c),i=$(c,"SPAN",{});var g=v(i);P(f.$$.fragment,g),g.forEach(m),c.forEach(m),d=K(s);for(let w=0;w<a.length;w+=1)a[w].l(s);u=B(),this.h()},h(){E(t,"class","w-100 \u0192 p5 \u2206-bw")},m(s,c){S(s,t,c),N(t,l),N(l,e),N(t,n),N(t,i),T(f,i,null),S(s,d,c);for(let o=0;o<a.length;o+=1)a[o].m(s,c);S(s,u,c),b=!0,j||(C=L(l,"click",r[2]),j=!0)},p(s,c){if(c&3){h=s[1].slice(0,s[0]*5);let o;for(o=0;o<h.length;o+=1){const g=H(s,h,o);a[o]?(a[o].p(g,c),p(a[o],1)):(a[o]=Q(g),a[o].c(),p(a[o],1),a[o].m(u.parentNode,u))}for(y(),o=h.length;o<a.length;o+=1)R(o);q()}},i(s){if(!b){p(f.$$.fragment,s);for(let c=0;c<h.length;c+=1)p(a[c]);b=!0}},o(s){_(f.$$.fragment,s),a=a.filter(Boolean);for(let c=0;c<a.length;c+=1)_(a[c]);b=!1},d(s){s&&m(t),V(f),s&&m(d),M(a,s),s&&m(u),j=!1,C()}}}function Q(r){let t,l;return t=new Z({props:{title:r[5].title,slug:r[5].uri,type:"Nebula",image:r[5].image,token:r[5].token,details:[r[5].channel,new D(r[5].date).timeSince()]}}),{c(){I(t.$$.fragment)},l(e){P(t.$$.fragment,e)},m(e,n){T(t,e,n),l=!0},p(e,n){const i={};n&3&&(i.title=e[5].title),n&3&&(i.slug=e[5].uri),n&3&&(i.image=e[5].image),n&3&&(i.token=e[5].token),n&3&&(i.details=[e[5].channel,new D(e[5].date).timeSince()]),t.$set(i)},i(e){l||(p(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){V(t,e)}}}function x(r){let t,l,e=r[1].length&&O(r);return{c(){t=k("section"),e&&e.c(),this.h()},l(n){t=$(n,"SECTION",{class:!0,id:!0});var i=v(t);e&&e.l(i),i.forEach(m),this.h()},h(){E(t,"class","\u0192 p20 \u0192\u2211"),E(t,"id","search")},m(n,i){S(n,t,i),e&&e.m(t,null),l=!0},p(n,[i]){n[1].length?e?(e.p(n,i),i&2&&p(e,1)):(e=O(n),e.c(),p(e,1),e.m(t,null)):e&&(y(),_(e,1,1,()=>{e=null}),q())},i(n){l||(p(e),l=!0)},o(n){_(e),l=!1},d(n){n&&m(t),e&&e.d()}}}function ee(r,t,l){let e,n;W(r,X,u=>l(4,n=u));const i=()=>l(1,e=[]);let f=1;const d=u=>l(0,f=u.detail);return r.$$.update=()=>{r.$$.dirty&16&&l(1,e=n)},[f,e,i,d,n]}class ie extends U{constructor(t){super();z(this,t,ee,x,F,{})}}export{ie as default};