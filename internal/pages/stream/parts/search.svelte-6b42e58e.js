import{S as A,i as B,s as D,e as g,t as N,k as O,l as I,c as b,a as k,h as J,d as u,m as Y,b as S,g as _,J as j,O as z,q as h,w as F,x as G,y as H,o as d,B as K,p as C,Y as L,n as E}from"../../../chunks/vendor-1a0fbb3d.js";import{p as y}from"../../../chunks/index-dccd124c.js";import M from"../components/videoCard.svelte-76c72425.js";function T(c,t,o){const e=c.slice();return e[2]=t[o],e}function V(c){let t,o,e,l,i,m,v,$,f=c[0],n=[];for(let s=0;s<f.length;s+=1)n[s]=q(T(c,f,s));const w=s=>d(n[s],1,1,()=>{n[s]=null});return{c(){t=g("div"),o=g("div"),e=N("Search"),l=O();for(let s=0;s<n.length;s+=1)n[s].c();i=I(),this.h()},l(s){t=b(s,"DIV",{class:!0});var r=k(t);o=b(r,"DIV",{});var a=k(o);e=J(a,"Search"),a.forEach(u),r.forEach(u),l=Y(s);for(let p=0;p<n.length;p+=1)n[p].l(s);i=I(),this.h()},h(){S(t,"class","p5 svelte-j0cveg")},m(s,r){_(s,t,r),j(t,o),j(o,e),_(s,l,r);for(let a=0;a<n.length;a+=1)n[a].m(s,r);_(s,i,r),m=!0,v||($=z(o,"click",c[1]),v=!0)},p(s,r){if(r&1){f=s[0];let a;for(a=0;a<f.length;a+=1){const p=T(s,f,a);n[a]?(n[a].p(p,r),h(n[a],1)):(n[a]=q(p),n[a].c(),h(n[a],1),n[a].m(i.parentNode,i))}for(E(),a=f.length;a<n.length;a+=1)w(a);C()}},i(s){if(!m){for(let r=0;r<f.length;r+=1)h(n[r]);m=!0}},o(s){n=n.filter(Boolean);for(let r=0;r<n.length;r+=1)d(n[r]);m=!1},d(s){s&&u(t),s&&u(l),L(n,s),s&&u(i),v=!1,$()}}}function q(c){let t,o;return t=new M({props:{title:c[2].snippet.title,image:c[2].snippet.thumbnails.medium.url,slug:c[2].id.videoId,details:[c[2].snippet.channelTitle,y.timeSince(c[2].snippet.publishedAt)]}}),{c(){F(t.$$.fragment)},l(e){G(t.$$.fragment,e)},m(e,l){H(t,e,l),o=!0},p(e,l){const i={};l&1&&(i.title=e[2].snippet.title),l&1&&(i.image=e[2].snippet.thumbnails.medium.url),l&1&&(i.slug=e[2].id.videoId),l&1&&(i.details=[e[2].snippet.channelTitle,y.timeSince(e[2].snippet.publishedAt)]),t.$set(i)},i(e){o||(h(t.$$.fragment,e),o=!0)},o(e){d(t.$$.fragment,e),o=!1},d(e){K(t,e)}}}function P(c){let t,o,e=c[0].length&&V(c);return{c(){t=g("section"),e&&e.c(),this.h()},l(l){t=b(l,"SECTION",{class:!0,id:!0});var i=k(t);e&&e.l(i),i.forEach(u),this.h()},h(){S(t,"class","p20 \u0192 \u0192\u2211"),S(t,"id","search")},m(l,i){_(l,t,i),e&&e.m(t,null),o=!0},p(l,[i]){l[0].length?e?(e.p(l,i),i&1&&h(e,1)):(e=V(l),e.c(),h(e,1),e.m(t,null)):e&&(E(),d(e,1,1,()=>{e=null}),C())},i(l){o||(h(e),o=!0)},o(l){d(e),o=!1},d(l){l&&u(t),e&&e.d()}}}function Q(c,t,o){let{videos:e=[]}=t;const l=()=>o(0,e=[]);return c.$$set=i=>{"videos"in i&&o(0,e=i.videos)},[e,l]}class X extends A{constructor(t){super();B(this,t,Q,P,D,{videos:0})}}export{X as default};