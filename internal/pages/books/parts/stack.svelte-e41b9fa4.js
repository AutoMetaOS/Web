import{S as k,i as g,s as v,a3 as $,l as p,g as m,a4 as j,q as u,o as f,d as h,K as c,w,x as y,y as B,B as S,e as q,c as C,a as F,b as x,n as D,p as E,Y as I,t as K,h as N}from"../../../chunks/vendor-1a0fbb3d.js";import{s as V}from"../../../chunks/index-a08375e3.js";import Y from"../components/book.svelte-44b11355.js";import"../components/functions.svelte-1b428c97.js";function d(s,o,a){const t=s.slice();return t[2]=o[a],t}function z(s){return{c,l:c,m:c,p:c,i:c,o:c,d:c}}function A(s){let o,a,t=s[1],e=[];for(let n=0;n<t.length;n+=1)e[n]=b(d(s,t,n));const i=n=>f(e[n],1,1,()=>{e[n]=null});return{c(){o=q("div");for(let n=0;n<e.length;n+=1)e[n].c();this.h()},l(n){o=C(n,"DIV",{class:!0});var r=F(o);for(let l=0;l<e.length;l+=1)e[l].l(r);r.forEach(h),this.h()},h(){x(o,"class","\u0192 \u0192\u2211 w-100")},m(n,r){m(n,o,r);for(let l=0;l<e.length;l+=1)e[l].m(o,null);a=!0},p(n,r){if(r&1){t=n[1];let l;for(l=0;l<t.length;l+=1){const _=d(n,t,l);e[l]?(e[l].p(_,r),u(e[l],1)):(e[l]=b(_),e[l].c(),u(e[l],1),e[l].m(o,null))}for(D(),l=t.length;l<e.length;l+=1)i(l);E()}},i(n){if(!a){for(let r=0;r<t.length;r+=1)u(e[r]);a=!0}},o(n){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)f(e[r]);a=!1},d(n){n&&h(o),I(e,n)}}}function b(s){let o,a;return o=new Y({props:{objective:"todo",id:s[2].bk_id,title:s[2].title,author:s[2].author,image:s[2].image,tags:s[2].tags.split(","),published:s[2].published}}),{c(){w(o.$$.fragment)},l(t){y(o.$$.fragment,t)},m(t,e){B(o,t,e),a=!0},p:c,i(t){a||(u(o.$$.fragment,t),a=!0)},o(t){f(o.$$.fragment,t),a=!1},d(t){S(o,t)}}}function G(s){let o;return{c(){o=K("Fetching...")},l(a){o=N(a,"Fetching...")},m(a,t){m(a,o,t)},p:c,i:c,o:c,d(a){a&&h(o)}}}function H(s){let o,a,t={ctx:s,current:null,token:null,hasCatch:!1,pending:G,then:A,catch:z,value:1,blocks:[,,,]};return $(s[0],t),{c(){o=p(),t.block.c()},l(e){o=p(),t.block.l(e)},m(e,i){m(e,o,i),t.block.m(e,t.anchor=i),t.mount=()=>o.parentNode,t.anchor=o,a=!0},p(e,[i]){s=e,j(t,s,i)},i(e){a||(u(t.block),a=!0)},o(e){for(let i=0;i<3;i+=1){const n=t.blocks[i];f(n)}a=!1},d(e){e&&h(o),t.block.d(e),t.token=null,t=null}}}function J(s){return[V.list("books")]}class Q extends k{constructor(o){super();g(this,o,J,H,v,{})}}export{Q as default};
