import{D as M,U as C,S as T,i as V,s as D,e as d,k as y,c as _,a as b,m as q,d as p,b as h,M as I,g,J as w,K as $,Y as N,R as O,Z as P,l as S,_ as R}from"./vendor-a193541a.js";import{b as k}from"./paths-4b3c6e7e.js";const f=JSON.parse(`{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`),U=JSON.parse(`{
    "yt": { "url": "${k}/stream" },
    "math": { "url": "${k}/math" },
    "books": { "url": "${k}/books" },
    "debug": { "url": "${k}/debug" },
    "stack": { "url": "${k}/stack" }
}`),j=M([]),H=s=>fetch(`https://api.nukes.in/quick/suggest?q=${s}`).then(e=>e.json()).then(j.set).catch(console.warn),z=s=>{var l;const e=C.exports.F("#engineImage");return e&&(e.src=`${k}/icons/${((l=f[s])==null?void 0:l.name)||s}.svg`),0},Y=s=>{var l;let e=U[s]||null;if(e)return e;if((s==null?void 0:s.charAt(0))==="!"){let r=s.replace("!",""),t=(l=r.split(" ")[0])==null?void 0:l.toLowerCase(),n=r.replace(t+" ","");if(f.hasOwnProperty(t))return z(t),H(n||""),{key:t,query:n,url:f[t].prelink+encodeURIComponent(n)+(f[t].postlink||"")}}else return H(s),z("Basic"),{key:"s",query:s,url:f.s.prelink+encodeURIComponent(s)+(f.s.postlink||"")}},A={r:(s,e)=>s.charAt(0)==="/"?f.r.base+"r"+s:e,y:(s,e)=>s.charAt(0)==="@"?f.y.prelink+"&id="+s.replace("@",""):e},K=({key:s,query:e,url:l})=>A.hasOwnProperty(s)?A[s](e,l):l;function E(s,e,l){const r=s.slice();return r[2]=e[l],r}function J(s){let e,l=s[2][0]+"",r;return{c(){e=new P,r=S(),this.h()},l(t){e=R(t),r=S(),this.h()},h(){e.a=r},m(t,n){e.m(l,t,n),g(t,r,n)},p(t,n){n&1&&l!==(l=t[2][0]+"")&&e.p(l)},d(t){t&&p(r),t&&e.d()}}}function x(s){var a,u;let e,l=(((a=s[2][3])==null?void 0:a.zh)||s[2][0])+"",r,t,n=(((u=s[2][3])==null?void 0:u.zi)||"")+"";return{c(){e=d("div"),r=y(),t=d("span")},l(i){e=_(i,"DIV",{});var o=b(e);o.forEach(p),r=q(i),t=_(i,"SPAN",{});var c=b(t);c.forEach(p)},m(i,o){g(i,e,o),e.innerHTML=l,g(i,r,o),g(i,t,o),t.innerHTML=n},p(i,o){var c,m;o&1&&l!==(l=(((c=i[2][3])==null?void 0:c.zh)||i[2][0])+"")&&(e.innerHTML=l),o&1&&n!==(n=(((m=i[2][3])==null?void 0:m.zi)||"")+"")&&(t.innerHTML=n)},d(i){i&&p(e),i&&p(r),i&&p(t)}}}function L(s){let e,l,r,t,n,a;function u(c,m){return c[2][3]?x:J}let i=u(s),o=i(s);return{c(){e=d("div"),l=d("img"),t=y(),n=d("div"),o.c(),a=y(),this.h()},l(c){e=_(c,"DIV",{class:!0,style:!0});var m=b(e);l=_(m,"IMG",{class:!0,src:!0,alt:!0}),t=q(m),n=_(m,"DIV",{class:!0});var v=b(n);o.l(v),v.forEach(p),a=q(m),m.forEach(p),this.h()},h(){var c;h(l,"class","rx2 svelte-mv1po"),I(l.src,r=((c=s[2][3])==null?void 0:c.zs)||"https://i.imgur.com/drIqvV8.jpg")||h(l,"src",r),h(l,"alt",""),h(n,"class","fw4 \u0192-col \u2206-ct"),h(e,"class","bg \u0192 rx10"),h(e,"style",s[1])},m(c,m){g(c,e,m),w(e,l),w(e,t),w(e,n),o.m(n,null),w(e,a)},p(c,m){var v;m&1&&!I(l.src,r=((v=c[2][3])==null?void 0:v.zs)||"https://i.imgur.com/drIqvV8.jpg")&&h(l,"src",r),i===(i=u(c))&&o?o.p(c,m):(o.d(1),o=i(c),o&&(o.c(),o.m(n,null)))},d(c){c&&p(e),o.d()}}}function B(s){let e,l=s[0],r=[];for(let t=0;t<l.length;t+=1)r[t]=L(E(s,l,t));return{c(){e=d("ul");for(let t=0;t<r.length;t+=1)r[t].c();this.h()},l(t){e=_(t,"UL",{id:!0,class:!0});var n=b(e);for(let a=0;a<r.length;a+=1)r[a].l(n);n.forEach(p),this.h()},h(){h(e,"id","autoComplete"),h(e,"class","mx-a w-100 p0 svelte-mv1po")},m(t,n){g(t,e,n);for(let a=0;a<r.length;a+=1)r[a].m(e,null)},p(t,[n]){if(n&3){l=t[0];let a;for(a=0;a<l.length;a+=1){const u=E(t,l,a);r[a]?r[a].p(u,n):(r[a]=L(u),r[a].c(),r[a].m(e,null))}for(;a<r.length;a+=1)r[a].d(1);r.length=l.length}},i:$,o:$,d(t){t&&p(e),N(r,t)}}}function F(s,e,l){let r;O(s,j,n=>l(0,r=n));const t=[["--bg","#ccc"],["margin","10px 0"],["padding","5px 10px"],["color","#000"]].map(n=>n.join(":")).join(";");return[r,t]}class Z extends T{constructor(e){super();V(this,e,F,B,D,{})}}export{Z as S,Y as e,K as p,j as r};
