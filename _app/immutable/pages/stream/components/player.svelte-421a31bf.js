import{S as R,i as j,s as F,e as w,k as V,$ as E,c as y,a as v,d,m as A,a0 as B,b as a,I as H,g as z,J as f,T as C,l as L,a3 as J,E as N,a5 as K,v as T,Z}from"../../../chunks/index-f6cfea4e.js";import{g as P}from"../../../chunks/index-28ec6f34.js";import{n as G}from"../../../chunks/store-e55811e1.js";import"../../../chunks/index-ff9ff7c9.js";function q(c){let l,s,n,t,e,i,p,_,g,r,o,u,b,k;return{c(){l=w("div"),s=w("iframe"),t=V(),e=w("div"),i=w("div"),p=E("svg"),_=E("path"),g=V(),r=w("div"),o=E("svg"),u=E("path"),this.h()},l(m){l=y(m,"DIV",{class:!0});var h=v(l);s=y(h,"IFRAME",{title:!0,class:!0,frameborder:!0,src:!0,allow:!0,sandbox:!0}),v(s).forEach(d),t=A(h),e=y(h,"DIV",{id:!0,class:!0});var x=v(e);i=y(x,"DIV",{class:!0,id:!0});var I=v(i);p=B(I,"svg",{viewBox:!0,class:!0});var D=v(p);_=B(D,"path",{d:!0}),v(_).forEach(d),D.forEach(d),I.forEach(d),g=A(x),r=y(x,"DIV",{class:!0,id:!0});var M=v(r);o=B(M,"svg",{viewBox:!0,class:!0});var S=v(o);u=B(S,"path",{d:!0}),v(u).forEach(d),S.forEach(d),M.forEach(d),x.forEach(d),h.forEach(d),this.h()},h(){a(s,"title","vid"),a(s,"class","w-100 h-100 p-abs svelte-f9epuh"),a(s,"frameborder","0"),H(s.src,n=c[1].youtube_id)||a(s,"src",n),a(s,"allow","fullscreen; clipboard-write; encrypted-media; picture-in-picture"),a(s,"sandbox","allow-scripts allow-same-origin"),a(_,"d","M20 30 L8 16 20 2"),a(p,"viewBox","0 0 32 32"),a(p,"class","svelte-f9epuh"),a(i,"class","btn p10 \u2020c h-100 w-100 svelte-f9epuh"),a(i,"id","up"),a(u,"d","M12 30 L24 16 12 2"),a(o,"viewBox","0 0 32 32"),a(o,"class","svelte-f9epuh"),a(r,"class","btn p10 \u2020c h-100 w-100 svelte-f9epuh"),a(r,"id","down"),a(e,"id","magicBox"),a(e,"class","\u0192 \u2206-ar p-abs svelte-f9epuh"),a(l,"class","\u0192 cont p-rel \u2206-ct svelte-f9epuh")},m(m,h){z(m,l,h),f(l,s),c[4](s),f(l,t),f(l,e),f(e,i),f(i,p),f(p,_),f(e,g),f(e,r),f(r,o),f(o,u),b||(k=C(e,"click",c[2]),b=!0)},p(m,h){h&2&&!H(s.src,n=m[1].youtube_id)&&a(s,"src",n)},d(m){m&&d(l),c[4](null),b=!1,k()}}}function O(c){let l,s,n,t=c[1].youtube_id&&q(c);return{c(){t&&t.c(),l=L()},l(e){t&&t.l(e),l=L()},m(e,i){t&&t.m(e,i),z(e,l,i),s||(n=C(window,"keydown",J(c[3])),s=!0)},p(e,[i]){e[1].youtube_id?t?t.p(e,i):(t=q(e),t.c(),t.m(l.parentNode,l)):t&&(t.d(1),t=null)},i:N,o:N,d(e){t&&t.d(e),e&&d(l),s=!1,n()}}}function Q(c,l,s){let n;K(c,G,r=>s(1,n=r));let t,e,i;T(()=>{e=()=>P.getNext(n.local_id),i=()=>P.getPrev(n.local_id)});const p=({target:r})=>{const{id:o}=r;console.log(o);let u={};o==="up"&&e(),o==="down"&&i(),console.log(u)},_=r=>{r.preventDefault();const{shiftKey:o,key:u}=r;o&&console.log("ShowCarousel");const[b,k]=["ArrowLeft","ArrowRight"];o&&u===b?e():o&&u===k&&i()};function g(r){Z[r?"unshift":"push"](()=>{t=r,s(0,t)})}return[t,n,p,_,g]}class $ extends R{constructor(l){super(),j(this,l,Q,O,F,{})}}export{$ as default};
