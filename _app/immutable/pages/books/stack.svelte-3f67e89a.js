import{S as g,i as d,s as v,w as b,x as k,y as w,q as h,o as u,B as q,e as S,c as $,a as B,d as f,b as y,g as C,p as D,X as I,v as M,n as j}from"../../chunks/index-f6cfea4e.js";import{S as A}from"../../chunks/index-30071b0e.js";import E from"./components/book.svelte-6c5bd9dd.js";import{b as F,p as L}from"../../chunks/functions-4c4d8597.js";import"../../chunks/index-ff9ff7c9.js";function m(r,s,i){const o=r.slice();return o[5]=s[i],o}function p(r){let s,i;return s=new E({props:{objective:"todo",id:r[2](r[5].bk_id),title:r[5].title,author:r[5].author,image:r[5].image,published:r[5].published}}),{c(){b(s.$$.fragment)},l(o){k(s.$$.fragment,o)},m(o,t){w(s,o,t),i=!0},p(o,t){const l={};t&3&&(l.id=o[2](o[5].bk_id)),t&3&&(l.title=o[5].title),t&3&&(l.author=o[5].author),t&3&&(l.image=o[5].image),t&3&&(l.published=o[5].published),s.$set(l)},i(o){i||(h(s.$$.fragment,o),i=!0)},o(o){u(s.$$.fragment,o),i=!1},d(o){q(s,o)}}}function O(r){let s,i,o=r[1].filter(r[4]),t=[];for(let n=0;n<o.length;n+=1)t[n]=p(m(r,o,n));const l=n=>u(t[n],1,1,()=>{t[n]=null});return{c(){s=S("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){s=$(n,"DIV",{class:!0});var a=B(s);for(let e=0;e<t.length;e+=1)t[e].l(a);a.forEach(f),this.h()},h(){y(s,"class","\u0192 \u0192\u2211 \u2206-bw w-100 svelte-78oqvi")},m(n,a){C(n,s,a);for(let e=0;e<t.length;e+=1)t[e].m(s,null);i=!0},p(n,[a]){if(a&15){o=n[1].filter(n[4]);let e;for(e=0;e<o.length;e+=1){const c=m(n,o,e);t[e]?(t[e].p(c,a),h(t[e],1)):(t[e]=p(c),t[e].c(),h(t[e],1),t[e].m(s,null))}for(j(),e=o.length;e<t.length;e+=1)l(e);D()}},i(n){if(!i){for(let a=0;a<o.length;a+=1)h(t[a]);i=!0}},o(n){t=t.filter(Boolean);for(let a=0;a<t.length;a+=1)u(t[a]);i=!1},d(n){n&&f(s),I(t,n)}}}function T(r,s,i){let o,{omni:t=""}=s;const l=e=>(F.update(c=>[...c,e||"1"]),e),n=(e,c)=>e.some(_=>_.toLowerCase().includes(c));M(()=>A.list("books").then(e=>i(1,o=e)));const a=e=>n([e.title,e.author],L.form.basic(t).text);return r.$$set=e=>{"omni"in e&&i(0,t=e.omni)},i(1,o=[]),[t,o,l,n,a]}class H extends g{constructor(s){super(),d(this,s,T,O,v,{omni:0})}}export{H as default};
