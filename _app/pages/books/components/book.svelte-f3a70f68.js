import{S as Q,i as R,s as T,t as V,h as w,g as F,j as U,d as h,e as j,k as B,w as W,c as I,a as y,m as S,x as X,b as _,J as c,y as Z,q as x,o as $,B as ee,I as O}from"../../../chunks/index-132e5a0e.js";import{p as v,F as te}from"../../../chunks/functions-2e752beb.js";import"../../../chunks/index-cfd1276c.js";import"../../../chunks/index-50aceac0.js";function ie(r){let e,t=r[1].trim()+"",s;return{c(){e=j("div"),s=V(t),this.h()},l(i){e=I(i,"DIV",{class:!0});var l=y(e);s=w(l,t),l.forEach(h),this.h()},h(){_(e,"class","dummy \u2020c \u0192 w-100 h-100 svelte-7ntagh")},m(i,l){F(i,e,l),c(e,s)},p(i,l){l&2&&t!==(t=i[1].trim()+"")&&U(s,t)},d(i){i&&h(e)}}}function le(r){let e,t;return{c(){e=j("img"),this.h()},l(s){e=I(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){_(e,"class","w-100 h-100 svelte-7ntagh"),O(e.src,t=`https://covers.openlibrary.org/b/id/${r[2]}-M.jpg`)||_(e,"src",t),_(e,"alt",r[1])},m(s,i){F(s,e,i)},p(s,i){i&4&&!O(e.src,t=`https://covers.openlibrary.org/b/id/${s[2]}-M.jpg`)&&_(e,"src",t),i&2&&_(e,"alt",s[1])},d(s){s&&h(e)}}}function P(r){let e,t=v.published(r[5])+"",s,i;return{c(){e=V("("),s=V(t),i=V(")")},l(l){e=w(l,"("),s=w(l,t),i=w(l,")")},m(l,f){F(l,e,f),F(l,s,f),F(l,i,f)},p(l,f){f&32&&t!==(t=v.published(l[5])+"")&&U(s,t)},d(l){l&&h(e),l&&h(s),l&&h(i)}}}function se(r){let e,t,s,i,l,f=v.author(r[6])+"",g,D,E,m,n=v.tags(r[3])+"",G,z,q,M=r[1].toUpperCase()+"",H,A,b,p;function K(a,u){return a[2]?le:ie}let J=K(r),d=J(r),o=r[5]&&P(r);return b=new te({props:{objective:r[0],data:r[7]}}),{c(){e=j("div"),t=j("div"),d.c(),s=B(),i=j("div"),l=j("div"),g=V(f),D=B(),o&&o.c(),E=B(),m=j("div"),G=V(n),z=B(),q=j("h5"),H=V(M),A=B(),W(b.$$.fragment),this.h()},l(a){e=I(a,"DIV",{id:!0,class:!0});var u=y(e);t=I(u,"DIV",{class:!0});var C=y(t);d.l(C),C.forEach(h),s=S(u),i=I(u,"DIV",{class:!0});var k=y(i);l=I(k,"DIV",{});var Y=y(l);g=w(Y,f),D=S(Y),o&&o.l(Y),Y.forEach(h),E=S(k),m=I(k,"DIV",{class:!0});var L=y(m);G=w(L,n),L.forEach(h),z=S(k),q=I(k,"H5",{class:!0});var N=y(q);H=w(N,M),N.forEach(h),A=S(k),X(b.$$.fragment,k),k.forEach(h),u.forEach(h),this.h()},h(){_(t,"class","p-rel"),_(m,"class","tags svelte-7ntagh"),_(q,"class","title"),_(i,"class","body p-rel svelte-7ntagh"),_(e,"id",r[4]),_(e,"class","book \u0192 m10 svelte-7ntagh")},m(a,u){F(a,e,u),c(e,t),d.m(t,null),c(e,s),c(e,i),c(i,l),c(l,g),c(l,D),o&&o.m(l,null),c(i,E),c(i,m),c(m,G),c(i,z),c(i,q),c(q,H),c(i,A),Z(b,i,null),p=!0},p(a,[u]){J===(J=K(a))&&d?d.p(a,u):(d.d(1),d=J(a),d&&(d.c(),d.m(t,null))),(!p||u&64)&&f!==(f=v.author(a[6])+"")&&U(g,f),a[5]?o?o.p(a,u):(o=P(a),o.c(),o.m(l,null)):o&&(o.d(1),o=null),(!p||u&8)&&n!==(n=v.tags(a[3])+"")&&U(G,n),(!p||u&2)&&M!==(M=a[1].toUpperCase()+"")&&U(H,M);const C={};u&1&&(C.objective=a[0]),u&128&&(C.data=a[7]),b.$set(C),(!p||u&16)&&_(e,"id",a[4])},i(a){p||(x(b.$$.fragment,a),p=!0)},o(a){$(b.$$.fragment,a),p=!1},d(a){a&&h(e),d.d(),o&&o.d(),ee(b)}}}function ae(r,e,t){let s,{objective:i="sugg",title:l="",image:f="",tags:g=[],id:D,published:E=new Date().getFullYear(),author:m=""}=e;return r.$$set=n=>{"objective"in n&&t(0,i=n.objective),"title"in n&&t(1,l=n.title),"image"in n&&t(2,f=n.image),"tags"in n&&t(3,g=n.tags),"id"in n&&t(4,D=n.id),"published"in n&&t(5,E=n.published),"author"in n&&t(6,m=n.author)},r.$$.update=()=>{r.$$.dirty&126&&t(7,s={title:l,image:f||null,tags:v.tags(g),bk_id:D,published:v.published(E),author:v.author(m)})},[i,l,f,g,D,E,m,s]}class fe extends Q{constructor(e){super(),R(this,e,ae,se,T,{objective:0,title:1,image:2,tags:3,id:4,published:5,author:6})}}export{fe as default};
