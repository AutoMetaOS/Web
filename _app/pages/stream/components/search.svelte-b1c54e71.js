import{S as e,i as t,s,e as n,t as i,k as l,l as a,c as r,a as o,g as c,d as h,n as p,b as u,f as d,H as f,N as m,x as g,j as v,m as $,o as b,u as j,v as k,w as S,a1 as I,r as w}from"../../../chunks/vendor-20995007.js";import E from"../shared/videoCard.svelte-e06b2b0f.js";import{K as x}from"../../../chunks/molecular-fb8f2536.js";import"../../../chunks/store-8a552d09.js";import"../../../chunks/AspectRatio-f7a0b2fd.js";function A(e,t,s){const n=e.slice();return n[2]=t[s],n}function N(e){let t,s,v,$,b,k,E,x,N=e[0],C=[];for(let n=0;n<N.length;n+=1)C[n]=T(A(e,N,n));const D=e=>j(C[e],1,1,(()=>{C[e]=null}));return{c(){t=n("div"),s=n("div"),v=i("Search"),$=l();for(let e=0;e<C.length;e+=1)C[e].c();b=a(),this.h()},l(e){t=r(e,"DIV",{class:!0});var n=o(t);s=r(n,"DIV",{});var i=o(s);v=c(i,"Search"),i.forEach(h),n.forEach(h),$=p(e);for(let t=0;t<C.length;t+=1)C[t].l(e);b=a(),this.h()},h(){u(t,"class","p5 svelte-j0cveg")},m(n,i){d(n,t,i),f(t,s),f(s,v),d(n,$,i);for(let e=0;e<C.length;e+=1)C[e].m(n,i);d(n,b,i),k=!0,E||(x=m(s,"click",e[1]),E=!0)},p(e,t){if(1&t){let s;for(N=e[0],s=0;s<N.length;s+=1){const n=A(e,N,s);C[s]?(C[s].p(n,t),g(C[s],1)):(C[s]=T(n),C[s].c(),g(C[s],1),C[s].m(b.parentNode,b))}for(w(),s=N.length;s<C.length;s+=1)D(s);S()}},i(e){if(!k){for(let e=0;e<N.length;e+=1)g(C[e]);k=!0}},o(e){C=C.filter(Boolean);for(let t=0;t<C.length;t+=1)j(C[t]);k=!1},d(e){e&&h(t),e&&h($),I(C,e),e&&h(b),E=!1,x()}}}function T(e){let t,s;return t=new E({props:{title:e[2].snippet.title,type:"Youtube",image:e[2].snippet.thumbnails.medium.url,slug:e[2].id.videoId,details:[e[2].snippet.channelTitle,new x(e[2].snippet.publishedAt).timeSince()]}}),{c(){v(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,n){b(t,e,n),s=!0},p(e,s){const n={};1&s&&(n.title=e[2].snippet.title),1&s&&(n.image=e[2].snippet.thumbnails.medium.url),1&s&&(n.slug=e[2].id.videoId),1&s&&(n.details=[e[2].snippet.channelTitle,new x(e[2].snippet.publishedAt).timeSince()]),t.$set(n)},i(e){s||(g(t.$$.fragment,e),s=!0)},o(e){j(t.$$.fragment,e),s=!1},d(e){k(t,e)}}}function C(e){let t,s,i=e[0].length&&N(e);return{c(){t=n("section"),i&&i.c(),this.h()},l(e){t=r(e,"SECTION",{class:!0,id:!0});var s=o(t);i&&i.l(s),s.forEach(h),this.h()},h(){u(t,"class","p20 ƒ ƒ∑"),u(t,"id","search")},m(e,n){d(e,t,n),i&&i.m(t,null),s=!0},p(e,[s]){e[0].length?i?(i.p(e,s),1&s&&g(i,1)):(i=N(e),i.c(),g(i,1),i.m(t,null)):i&&(w(),j(i,1,1,(()=>{i=null})),S())},i(e){s||(g(i),s=!0)},o(e){j(i),s=!1},d(e){e&&h(t),i&&i.d()}}}function D(e,t,s){let{videos:n=[]}=t;return e.$$set=e=>{"videos"in e&&s(0,n=e.videos)},[n,()=>s(0,n=[])]}class V extends e{constructor(e){super(),t(this,e,D,C,s,{videos:0})}}export{V as default};
