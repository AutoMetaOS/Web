import{S as b,i as g,s as v,a3 as $,l as p,g as _,a4 as y,q as u,o as f,d as h,K as r,w as j,x as w,y as B,B as S,e as q,c as C,a as F,b as z,n as D,p as E,Y as I,t as K,h as N}from"../../../chunks/vendor-4e7e0afc.js";import{s as V}from"../../../chunks/index-8cfe8229.js";import{c as Y,B as x}from"../../../chunks/book-6861fcee.js";import"../components/functions.svelte-f262e55a.js";function d(s,o,l){const e=s.slice();return e[3]=o[l],e}function A(s){return{c:r,l:r,m:r,p:r,i:r,o:r,d:r}}function G(s){let o,l,e=s[2],t=[];for(let n=0;n<e.length;n+=1)t[n]=k(d(s,e,n));const i=n=>f(t[n],1,1,()=>{t[n]=null});return{c(){o=q("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){o=C(n,"DIV",{class:!0});var c=F(o);for(let a=0;a<t.length;a+=1)t[a].l(c);c.forEach(h),this.h()},h(){z(o,"class","\u0192 \u0192\u2211 w-100 svelte-kilcz2")},m(n,c){_(n,o,c);for(let a=0;a<t.length;a+=1)t[a].m(o,null);l=!0},p(n,c){if(c&3){e=n[2];let a;for(a=0;a<e.length;a+=1){const m=d(n,e,a);t[a]?(t[a].p(m,c),u(t[a],1)):(t[a]=k(m),t[a].c(),u(t[a],1),t[a].m(o,null))}for(D(),a=e.length;a<t.length;a+=1)i(a);E()}},i(n){if(!l){for(let c=0;c<e.length;c+=1)u(t[c]);l=!0}},o(n){t=t.filter(Boolean);for(let c=0;c<t.length;c+=1)f(t[c]);l=!1},d(n){n&&h(o),I(t,n)}}}function k(s){let o,l;return o=new x({props:{objective:"todo",id:s[3].bk_id,title:s[3].title,author:s[3].author,image:s[0](s[3].image),tags:s[3].tags.split(","),published:s[3].published}}),{c(){j(o.$$.fragment)},l(e){w(o.$$.fragment,e)},m(e,t){B(o,e,t),l=!0},p:r,i(e){l||(u(o.$$.fragment,e),l=!0)},o(e){f(o.$$.fragment,e),l=!1},d(e){S(o,e)}}}function H(s){let o;return{c(){o=K("Fetching...")},l(l){o=N(l,"Fetching...")},m(l,e){_(l,o,e)},p:r,i:r,o:r,d(l){l&&h(o)}}}function J(s){let o,l,e={ctx:s,current:null,token:null,hasCatch:!1,pending:H,then:G,catch:A,value:2,blocks:[,,,]};return $(s[1],e),{c(){o=p(),e.block.c()},l(t){o=p(),e.block.l(t)},m(t,i){_(t,o,i),e.block.m(t,e.anchor=i),e.mount=()=>o.parentNode,e.anchor=o,l=!0},p(t,[i]){s=t,y(e,s,i)},i(t){l||(u(e.block),l=!0)},o(t){for(let i=0;i<3;i+=1){const n=e.blocks[i];f(n)}l=!1},d(t){t&&h(o),e.block.d(t),e.token=null,e=null}}}function L(s){const o=e=>(Y.update(t=>[...t,e]),e),l=V.list("books");return[o,l]}class R extends b{constructor(o){super();g(this,o,L,J,v,{})}}export{R as default};
