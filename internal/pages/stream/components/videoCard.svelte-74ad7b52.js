import{S as A,i as B,s as F,e as w,k as S,Z as L,t as J,c as b,a as D,m as q,_ as N,h as K,d as j,M as O,b as i,f as T,g as P,J as d,O as Q,j as Z,K as z}from"../../../chunks/vendor-58b3727c.js";import{b as R}from"../../../chunks/store-9ab43c17.js";function U(c){var H,M;let e,t,o,f,n,u,r,a=((H=c[0])==null?void 0:H.slice(0,60))+"",k,v=(c[0].length>60?"...":"")+"",p,E,g,h=((M=c[1])==null?void 0:M.join(" \u2022 "))+"",I,V,C,y;return{c(){e=w("div"),t=w("img"),f=S(),n=w("div"),u=w("div"),r=new L,k=S(),p=J(v),E=S(),g=w("div"),I=J(h),this.h()},l(l){e=b(l,"DIV",{class:!0,"data-count":!0,"data-title":!0,"data-slug":!0});var s=D(e);t=b(s,"IMG",{src:!0,class:!0,alt:!0}),f=q(s),n=b(s,"DIV",{class:!0});var m=D(n);u=b(m,"DIV",{style:!0});var _=D(u);r=N(_),k=q(_),p=K(_,v),_.forEach(j),E=q(m),g=b(m,"DIV",{style:!0});var G=D(g);I=K(G,h),G.forEach(j),m.forEach(j),s.forEach(j),this.h()},h(){O(t.src,o=c[4])||i(t,"src",o),i(t,"class","w-100 svelte-w2kimg"),i(t,"alt","thubmnail"),r.a=k,T(u,"padding-bottom","5px"),T(g,"color","#888"),i(n,"class","\u2020c w-100 deets p-abs p5 svelte-w2kimg"),i(e,"class","recom p-rel fade-right rx5 m5 p0 \u0192-col svelte-w2kimg"),i(e,"data-count",V=c[2].join(",")),i(e,"data-title",c[0]),i(e,"data-slug",c[3])},m(l,s){P(l,e,s),d(e,t),d(e,f),d(e,n),d(n,u),r.m(a,u),d(u,k),d(u,p),d(n,E),d(n,g),d(g,I),C||(y=Q(e,"click",R),C=!0)},p(l,[s]){var m,_;s&16&&!O(t.src,o=l[4])&&i(t,"src",o),s&1&&a!==(a=((m=l[0])==null?void 0:m.slice(0,60))+"")&&r.p(a),s&1&&v!==(v=(l[0].length>60?"...":"")+"")&&Z(p,v),s&2&&h!==(h=((_=l[1])==null?void 0:_.join(" \u2022 "))+"")&&Z(I,h),s&4&&V!==(V=l[2].join(","))&&i(e,"data-count",V),s&1&&i(e,"data-title",l[0]),s&8&&i(e,"data-slug",l[3])},i:z,o:z,d(l){l&&j(e),C=!1,y()}}}function W(c,e,t){let{title:o="",details:f=[],count:n=[0,0],slug:u="",image:r="https://wallpaperaccess.com/full/2404603.png"}=e;return c.$$set=a=>{"title"in a&&t(0,o=a.title),"details"in a&&t(1,f=a.details),"count"in a&&t(2,n=a.count),"slug"in a&&t(3,u=a.slug),"image"in a&&t(4,r=a.image)},[o,f,n,u,r]}class x extends A{constructor(e){super();B(this,e,W,U,F,{title:0,details:1,count:2,slug:3,image:4})}}export{x as default};
