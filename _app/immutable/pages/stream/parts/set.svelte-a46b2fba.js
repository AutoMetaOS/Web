import{S as R,i as X,s as $,w as F,x as H,y as K,q as A,o as M,B as L,e as P,t as T,k as B,c as S,a as w,h as N,d as D,m as V,b as _,f as Q,g as W,J as m,a4 as j,T as C,j as Y,p as Z,X as x,G as ee,v as te,n as se,ad as ne}from"../../../chunks/index-f6cfea4e.js";import{p as z,y as ae}from"../../../chunks/index-6a811cd9.js";import le from"../components/videoCard.svelte-7d7d0e19.js";import"../../../chunks/index-6aef288e.js";import"../../../chunks/index-5303bb93.js";import"../../../chunks/index-ff9ff7c9.js";import"../../../chunks/_commonjsHelpers-c771f69b.js";function G(l,s,i){const e=l.slice();return e[6]=s[i],e[8]=i,e}function J(l){let s,i;return s=new le({props:{type:"snippet",count:l[8],title:l[6].snippet.title,slug:l[6].snippet.resourceId.videoId,image:l[6].snippet.thumbnails.medium.url,details:[l[6].snippet.channelTitle,z.timeSince(l[6].contentDetails.videoPublishedAt)]}}),{c(){F(s.$$.fragment)},l(e){H(s.$$.fragment,e)},m(e,u){K(s,e,u),i=!0},p(e,u){const c={};u&3&&(c.title=e[6].snippet.title),u&3&&(c.slug=e[6].snippet.resourceId.videoId),u&3&&(c.image=e[6].snippet.thumbnails.medium.url),u&3&&(c.details=[e[6].snippet.channelTitle,z.timeSince(e[6].contentDetails.videoPublishedAt)]),s.$set(c)},i(e){i||(A(s.$$.fragment,e),i=!0)},o(e){M(s.$$.fragment,e),i=!1},d(e){L(s,e)}}}function ie(l){let s,i,e,u,c=l[1].length+"",h,v,b,p,r,I,k,g,y,U,f=l[1].sort(l[5]).slice(0,l[0]*4),a=[];for(let t=0;t<f.length;t+=1)a[t]=J(G(l,f,t));const O=t=>M(a[t],1,1,()=>{a[t]=null});return{c(){s=P("section"),i=P("div"),e=P("span"),u=T("Updates ("),h=T(c),v=T(")"),b=B(),p=P("span"),r=P("input"),k=B();for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){s=S(t,"SECTION",{class:!0,id:!0});var o=w(s);i=S(o,"DIV",{class:!0});var n=w(i);e=S(n,"SPAN",{});var d=w(e);u=N(d,"Updates ("),h=N(d,c),v=N(d,")"),d.forEach(D),b=V(n),p=S(n,"SPAN",{style:!0});var q=w(p);r=S(q,"INPUT",{type:!0,min:!0,max:!0}),q.forEach(D),n.forEach(D),k=V(o);for(let E=0;E<a.length;E+=1)a[E].l(o);o.forEach(D),this.h()},h(){_(r,"type","range"),_(r,"min",0),_(r,"max",I=Math.ceil(l[1].flat().length/4)),Q(p,"font-size","1.25rem"),_(i,"class","w-100 \u0192 p5 \u2206-bw"),_(s,"class","\u0192 p20 \u0192\u2211"),_(s,"id","updates")},m(t,o){W(t,s,o),m(s,i),m(i,e),m(e,u),m(e,h),m(e,v),m(i,b),m(i,p),m(p,r),j(r,l[0]),m(s,k);for(let n=0;n<a.length;n+=1)a[n].m(s,null);g=!0,y||(U=[C(e,"click",l[2]),C(r,"change",l[4]),C(r,"input",l[4])],y=!0)},p(t,[o]){if((!g||o&2)&&c!==(c=t[1].length+"")&&Y(h,c),(!g||o&2&&I!==(I=Math.ceil(t[1].flat().length/4)))&&_(r,"max",I),o&1&&j(r,t[0]),o&3){f=t[1].sort(t[5]).slice(0,t[0]*4);let n;for(n=0;n<f.length;n+=1){const d=G(t,f,n);a[n]?(a[n].p(d,o),A(a[n],1)):(a[n]=J(d),a[n].c(),A(a[n],1),a[n].m(s,null))}for(se(),n=f.length;n<a.length;n+=1)O(n);Z()}},i(t){if(!g){for(let o=0;o<f.length;o+=1)A(a[o]);g=!0}},o(t){a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)M(a[o]);g=!1},d(t){t&&D(s),x(a,t),y=!1,ee(U)}}}function oe(l,s,i){let e,{set:u}=s;const c=()=>i(1,e=[]);let h=4;te(()=>{Promise.all(u==null?void 0:u.map(r=>ae.getRecents(r.channels))).then(r=>i(1,e=r.flat()))});function v(){h=ne(this.value),i(0,h)}const b=(p,r)=>new Date(r.contentDetails.videoPublishedAt)-new Date(p.contentDetails.videoPublishedAt);return l.$$set=p=>{"set"in p&&i(3,u=p.set)},i(1,e=[]),[h,e,c,u,v,b]}class de extends R{constructor(s){super(),X(this,s,oe,ie,$,{set:3})}}export{de as default};
