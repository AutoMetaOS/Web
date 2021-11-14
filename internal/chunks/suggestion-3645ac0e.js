import{C as E,S as H,i as L,s as M,j as P,m as V,o as x,x as b,u as $,v as N,e as g,c as k,a as v,d as p,b as m,f,w as O,T as B,P as D,r as R,k as w,n as y,K as j,t as U,g as F,H as G,h as J}from"./vendor-04de4d0b.js";import{b as d}from"./paths-28a87002.js";import{T as W}from"./Tile-7950d14a.js";const _=JSON.parse(`{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "fr":{"name":"Frontier","prelink":"https://frontier.nukes.in/search?query="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`),K=JSON.parse(`{
    "yt": { "url": "${d}/stream" },
    "cal": { "url": "${d}/calendar" },
    "mon": { "url": "${d}/monitor" },
    "debug": { "url": "${d}/debug" },"w3": { "url": "${d}/debug" },"repl": { "url": "${d}/debug" }
}`),I=E([]),S=n=>fetch(`https://api.nukes.in/quick/suggest?q=${n}`).then(e=>e.json()).then(e=>I.set(e)).catch(console.warn),z=n=>{var i;const e=\u0192("#engineImage");e&&(e.src=`${d}/icons/${((i=_[n])==null?void 0:i.name)||n}.svg`)},ne=n=>{var i;let e=K[n]||null;if(e)return e;if(n.charAt(0)==="!"){let s=n.replace("!",""),t=(i=s.split(" ")[0])==null?void 0:i.toLowerCase(),o=s.replace(t+" ","");if(_.hasOwnProperty(t))return z(t),S(o||""),{key:t,query:o,url:_[t].prelink+encodeURIComponent(o)+(_[t].postlink||"")}}else return S(n),z("Basic"),{key:"s",query:n,url:_.s.prelink+encodeURIComponent(n)+(_.s.postlink||"")}},T={r:(n,e)=>n.charAt(0)==="/"?_.r.base+"r"+n:e,y:(n,e)=>n.charAt(0)==="@"?_.y.prelink+"&id="+n.replace("@",""):e},le=({key:n,query:e,url:i})=>T.hasOwnProperty(n)?T[n](e,i):i;function A(n,e,i){const s=n.slice();return s[2]=e[i],s}function Y(n){let e,i=n[2][0]+"";return{c(){e=g("div"),this.h()},l(s){e=k(s,"DIV",{class:!0});var t=v(e);t.forEach(p),this.h()},h(){m(e,"class","fw7")},m(s,t){f(s,e,t),e.innerHTML=i},p(s,t){t&1&&i!==(i=s[2][0]+"")&&(e.innerHTML=i)},d(s){s&&p(e)}}}function Q(n){var c,l;let e,i=(((c=n[2][3])==null?void 0:c.zh)||n[2][0])+"",s,t,o=(((l=n[2][3])==null?void 0:l.zi)||"")+"",a;return{c(){e=g("div"),s=w(),t=g("span"),a=U(o),this.h()},l(r){e=k(r,"DIV",{class:!0});var u=v(e);u.forEach(p),s=y(r),t=k(r,"SPAN",{});var h=v(t);a=F(h,o),h.forEach(p),this.h()},h(){m(e,"class","fw7")},m(r,u){f(r,e,u),e.innerHTML=i,f(r,s,u),f(r,t,u),G(t,a)},p(r,u){var h,q;u&1&&i!==(i=(((h=r[2][3])==null?void 0:h.zh)||r[2][0])+"")&&(e.innerHTML=i),u&1&&o!==(o=(((q=r[2][3])==null?void 0:q.zi)||"")+"")&&J(a,o)},d(r){r&&p(e),r&&p(s),r&&p(t)}}}function X(n){let e,i,s,t,o;function a(r,u){return r[2][3]?Q:Y}let c=a(n),l=c(n);return{c(){e=g("img"),s=w(),t=g("div"),l.c(),o=w(),this.h()},l(r){e=k(r,"IMG",{class:!0,src:!0,alt:!0}),s=y(r),t=k(r,"DIV",{class:!0});var u=v(t);l.l(u),u.forEach(p),o=y(r),this.h()},h(){var r;m(e,"class","rx2 svelte-8zs5jo"),j(e.src,i=((r=n[2][3])==null?void 0:r.zs)||"https://i.imgur.com/drIqvV8.jpg")||m(e,"src",i),m(e,"alt",""),m(t,"class","\u0192-col \u2206-ct")},m(r,u){f(r,e,u),f(r,s,u),f(r,t,u),l.m(t,null),f(r,o,u)},p(r,u){var h;u&1&&!j(e.src,i=((h=r[2][3])==null?void 0:h.zs)||"https://i.imgur.com/drIqvV8.jpg")&&m(e,"src",i),c===(c=a(r))&&l?l.p(r,u):(l.d(1),l=c(r),l&&(l.c(),l.m(t,null)))},d(r){r&&p(e),r&&p(s),r&&p(t),l.d(),r&&p(o)}}}function C(n){let e,i;return e=new W({props:{class:"bg \u0192 rx10",style:n[1],$$slots:{default:[X]},$$scope:{ctx:n}}}),{c(){P(e.$$.fragment)},l(s){V(e.$$.fragment,s)},m(s,t){x(e,s,t),i=!0},p(s,t){const o={};t&33&&(o.$$scope={dirty:t,ctx:s}),e.$set(o)},i(s){i||(b(e.$$.fragment,s),i=!0)},o(s){$(e.$$.fragment,s),i=!1},d(s){N(e,s)}}}function Z(n){let e,i,s=n[0],t=[];for(let a=0;a<s.length;a+=1)t[a]=C(A(n,s,a));const o=a=>$(t[a],1,1,()=>{t[a]=null});return{c(){e=g("ul");for(let a=0;a<t.length;a+=1)t[a].c();this.h()},l(a){e=k(a,"UL",{id:!0,class:!0});var c=v(e);for(let l=0;l<t.length;l+=1)t[l].l(c);c.forEach(p),this.h()},h(){m(e,"id","autoComplete"),m(e,"class","mx-a w-100 svelte-8zs5jo")},m(a,c){f(a,e,c);for(let l=0;l<t.length;l+=1)t[l].m(e,null);i=!0},p(a,[c]){if(c&3){s=a[0];let l;for(l=0;l<s.length;l+=1){const r=A(a,s,l);t[l]?(t[l].p(r,c),b(t[l],1)):(t[l]=C(r),t[l].c(),b(t[l],1),t[l].m(e,null))}for(R(),l=s.length;l<t.length;l+=1)o(l);O()}},i(a){if(!i){for(let c=0;c<s.length;c+=1)b(t[c]);i=!0}},o(a){t=t.filter(Boolean);for(let c=0;c<t.length;c+=1)$(t[c]);i=!1},d(a){a&&p(e),B(t,a)}}}function ee(n,e,i){let s;D(n,I,o=>i(0,s=o));const t=[["--bg","#ccc"],["margin","10px 0"],["padding","5px 10px"],["color","#000"]].map(o=>o.join(":")).join(";");return[s,t]}class ie extends H{constructor(e){super();L(this,e,ee,Z,M,{})}}export{ie as S,ne as e,le as p,I as r};
