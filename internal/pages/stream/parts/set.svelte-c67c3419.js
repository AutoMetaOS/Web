import{S as M,i as Q,s as R,w as Y,x as G,y as H,q as w,o as N,B as K,e as S,t as j,k as B,c as k,a as A,h as C,d as D,m as O,b as g,f as L,g as W,J as h,N as V,O as T,j as X,p as Z,Y as x,Q as ee,v as te,n as ne,U as se,a2 as ae}from"../../../chunks/vendor-1a0fbb3d.js";import{p as $,y as le}from"../../../chunks/index-dccd124c.js";import ie from"../components/videoCard.svelte-76c72425.js";function z(l,n,i){const e=l.slice();return e[6]=n[i],e[8]=i,e}function F(l){let n,i;return n=new ie({props:{type:"snippet",count:l[8],title:l[6].snippet.title,slug:l[6].snippet.resourceId.videoId,image:l[6].snippet.thumbnails.medium.url,details:[l[6].snippet.channelTitle,$.timeSince(l[6].contentDetails.videoPublishedAt)]}}),{c(){Y(n.$$.fragment)},l(e){G(n.$$.fragment,e)},m(e,c){H(n,e,c),i=!0},p(e,c){const u={};c&3&&(u.title=e[6].snippet.title),c&3&&(u.slug=e[6].snippet.resourceId.videoId),c&3&&(u.image=e[6].snippet.thumbnails.medium.url),c&3&&(u.details=[e[6].snippet.channelTitle,$.timeSince(e[6].contentDetails.videoPublishedAt)]),n.$set(u)},i(e){i||(w(n.$$.fragment,e),i=!0)},o(e){N(n.$$.fragment,e),i=!1},d(e){K(n,e)}}}function oe(l){let n,i,e,c,u=l[1].length+"",f,b,I,p,r,P,m,v,E,U,d=l[1].sort(l[5]).slice(0,l[0]*5),a=[];for(let t=0;t<d.length;t+=1)a[t]=F(z(l,d,t));const J=t=>N(a[t],1,1,()=>{a[t]=null});return{c(){n=S("section"),i=S("div"),e=S("span"),c=j("Updates ("),f=j(u),b=j(")"),I=B(),p=S("span"),r=S("input"),m=B();for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){n=k(t,"SECTION",{class:!0,id:!0});var o=A(n);i=k(o,"DIV",{class:!0});var s=A(i);e=k(s,"SPAN",{});var _=A(e);c=C(_,"Updates ("),f=C(_,u),b=C(_,")"),_.forEach(D),I=O(s),p=k(s,"SPAN",{style:!0});var q=A(p);r=k(q,"INPUT",{type:!0,min:!0,max:!0}),q.forEach(D),s.forEach(D),m=O(o);for(let y=0;y<a.length;y+=1)a[y].l(o);o.forEach(D),this.h()},h(){g(r,"type","range"),g(r,"min",0),g(r,"max",P=l[1].flat().length/5),L(p,"font-size","1.25rem"),g(i,"class","w-100 \u0192 p5 \u2206-bw"),g(n,"class","\u0192 p20 \u0192\u2211"),g(n,"id","updates")},m(t,o){W(t,n,o),h(n,i),h(i,e),h(e,c),h(e,f),h(e,b),h(i,I),h(i,p),h(p,r),V(r,l[0]),h(n,m);for(let s=0;s<a.length;s+=1)a[s].m(n,null);v=!0,E||(U=[T(e,"click",l[2]),T(r,"change",l[4]),T(r,"input",l[4])],E=!0)},p(t,[o]){if((!v||o&2)&&u!==(u=t[1].length+"")&&X(f,u),(!v||o&2&&P!==(P=t[1].flat().length/5))&&g(r,"max",P),o&1&&V(r,t[0]),o&3){d=t[1].sort(t[5]).slice(0,t[0]*5);let s;for(s=0;s<d.length;s+=1){const _=z(t,d,s);a[s]?(a[s].p(_,o),w(a[s],1)):(a[s]=F(_),a[s].c(),w(a[s],1),a[s].m(n,null))}for(ne(),s=d.length;s<a.length;s+=1)J(s);Z()}},i(t){if(!v){for(let o=0;o<d.length;o+=1)w(a[o]);v=!0}},o(t){a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)N(a[o]);v=!1},d(t){t&&D(n),x(a,t),E=!1,ee(U)}}}function re(l,n,i){let e,{set:c}=n;const u=()=>i(1,e=[]);let f=3;te(()=>{Promise.all(c==null?void 0:c.map(r=>le.getRecents(r.channels))).then(r=>{i(1,e=r.flat()),e.map(m=>se.exports.F(`#${m.snippet.channelId}`)).forEach(m=>{m&&m.remove()})})});function b(){f=ae(this.value),i(0,f)}const I=(p,r)=>new Date(r.contentDetails.videoPublishedAt)-new Date(p.contentDetails.videoPublishedAt);return l.$$set=p=>{"set"in p&&i(3,c=p.set)},i(1,e=[]),[f,e,u,c,b,I]}class he extends M{constructor(n){super();Q(this,n,re,oe,R,{set:3})}}export{he as default};