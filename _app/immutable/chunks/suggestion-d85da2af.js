import{S as C,i as H,s as M,e as d,k as w,c as g,a as v,m as q,d as h,b as u,I as y,g as _,J as k,E as I,X as V,a5 as x}from"./index-f6cfea4e.js";import{w as $}from"./index-ff9ff7c9.js";import{p as j}from"./index-5303bb93.js";const z=$([]),f=JSON.parse(`{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`),D=JSON.parse(`{
    "yt": { "url": "/stream" },
    "math": { "url": "/math" },
    "books": { "url": "/books" },
    "debug": { "url": "/debug" },
    "stack": { "url": "/stack" }
}`),A=r=>fetch(`https://api.nukes.in/quick/suggest?q=${r}`).then(e=>e.json()).then(z.set).catch(console.warn),S=r=>{var l;const e=j.exports.F("#engineImage");return e&&(e.src=`/icons/${((l=f[r])==null?void 0:l.name)||r}.svg`),0},F=r=>{var l;let e=D[r]||null;if(e)return e;if((r==null?void 0:r.charAt(0))==="!"){let s=r.replace("!",""),t=(l=s.split(" ")[0])==null?void 0:l.toLowerCase(),n=s.replace(t+" ","");if(f.hasOwnProperty(t))return S(t),A(n||""),{key:t,query:n,url:f[t].prelink+encodeURIComponent(n)+(f[t].postlink||"")}}else return A(r),S("Basic"),{key:"s",query:r,url:f.s.prelink+encodeURIComponent(r)+(f.s.postlink||"")}},E={r:(r,e)=>r.charAt(0)==="/"?f.r.base+"r"+r:e,y:(r,e)=>r.charAt(0)==="@"?f.y.prelink+"&id="+r.replace("@",""):e},G=({key:r,query:e,url:l})=>E.hasOwnProperty(r)?E[r](e,l):l;function L(r,e,l){const s=r.slice();return s[2]=e[l],s}function N(r){let e,l=r[1](r[2][0])+"";return{c(){e=d("div"),this.h()},l(s){e=g(s,"DIV",{class:!0});var t=v(e);t.forEach(h),this.h()},h(){u(e,"class","\u0192")},m(s,t){_(s,e,t),e.innerHTML=l},p(s,t){t&1&&l!==(l=s[1](s[2][0])+"")&&(e.innerHTML=l)},d(s){s&&h(e)}}}function O(r){var i,m;let e,l=r[1](((i=r[2][3])==null?void 0:i.zh)||r[2][0])+"",s,t,n=r[1](((m=r[2][3])==null?void 0:m.zi)||"")+"";return{c(){e=d("div"),s=w(),t=d("span"),this.h()},l(a){e=g(a,"DIV",{class:!0});var o=v(e);o.forEach(h),s=q(a),t=g(a,"SPAN",{});var c=v(t);c.forEach(h),this.h()},h(){u(e,"class","\u0192")},m(a,o){_(a,e,o),e.innerHTML=l,_(a,s,o),_(a,t,o),t.innerHTML=n},p(a,o){var c,p;o&1&&l!==(l=a[1](((c=a[2][3])==null?void 0:c.zh)||a[2][0])+"")&&(e.innerHTML=l),o&1&&n!==(n=a[1](((p=a[2][3])==null?void 0:p.zi)||"")+"")&&(t.innerHTML=n)},d(a){a&&h(e),a&&h(s),a&&h(t)}}}function T(r){let e,l,s,t,n,i;function m(c,p){return c[2][3]?O:N}let a=m(r),o=a(r);return{c(){e=d("div"),l=d("img"),t=w(),n=d("div"),o.c(),i=w(),this.h()},l(c){e=g(c,"DIV",{class:!0});var p=v(e);l=g(p,"IMG",{class:!0,src:!0,alt:!0}),t=q(p),n=g(p,"DIV",{class:!0});var b=v(n);o.l(b),b.forEach(h),i=q(p),p.forEach(h),this.h()},h(){var c;u(l,"class","rx2 svelte-7qns5g"),y(l.src,s=((c=r[2][3])==null?void 0:c.zs)||"https://i.imgur.com/drIqvV8.jpg")||u(l,"src",s),u(l,"alt",""),u(n,"class","fw4 \u0192-col \u2206-ct"),u(e,"class","blur \u0192 rx10 svelte-7qns5g")},m(c,p){_(c,e,p),k(e,l),k(e,t),k(e,n),o.m(n,null),k(e,i)},p(c,p){var b;p&1&&!y(l.src,s=((b=c[2][3])==null?void 0:b.zs)||"https://i.imgur.com/drIqvV8.jpg")&&u(l,"src",s),a===(a=m(c))&&o?o.p(c,p):(o.d(1),o=a(c),o&&(o.c(),o.m(n,null)))},d(c){c&&h(e),o.d()}}}function P(r){let e,l=r[0],s=[];for(let t=0;t<l.length;t+=1)s[t]=T(L(r,l,t));return{c(){e=d("ul");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=g(t,"UL",{id:!0,class:!0});var n=v(e);for(let i=0;i<s.length;i+=1)s[i].l(n);n.forEach(h),this.h()},h(){u(e,"id","autoComplete"),u(e,"class","mx-a w-100 p0 svelte-7qns5g")},m(t,n){_(t,e,n);for(let i=0;i<s.length;i+=1)s[i].m(e,null)},p(t,[n]){if(n&3){l=t[0];let i;for(i=0;i<l.length;i+=1){const m=L(t,l,i);s[i]?s[i].p(m,n):(s[i]=T(m),s[i].c(),s[i].m(e,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=l.length}},i:I,o:I,d(t){t&&h(e),V(s,t)}}}function J(r,e,l){let s;return x(r,z,n=>l(0,s=n)),[s,n=>n.replaceAll("<b>","&nbsp;<span class='fw6'>").replaceAll("</b>","</span>&nbsp;").replaceAll(`
`,"").replaceAll("<br>","").replaceAll("<br/>","").trim()]}class W extends C{constructor(e){super(),H(this,e,J,P,M,{})}}export{W as S,F as e,G as p,z as r};
