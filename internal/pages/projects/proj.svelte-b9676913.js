import{S as K,i as O,s as X,e as b,t as V,k as P,Q as R,c as g,a as p,h as j,d as v,m as S,R as T,b as f,f as Y,g as U,H as n,j as A,E as J}from"../../chunks/index-ef3d5a38.js";function Z(i){var t;let e,l=((t=i[0].milestone)==null?void 0:t.text)+"",r;return{c(){e=b("span"),r=V(l)},l(s){e=g(s,"SPAN",{});var d=p(e);r=j(d,l),d.forEach(v)},m(s,d){U(s,e,d),n(e,r)},p(s,d){var a;d&1&&l!==(l=((a=s[0].milestone)==null?void 0:a.text)+"")&&A(r,l)},d(s){s&&v(e)}}}function $(i){let e,l=i[2].readable(i[0].milestone.date)+"",r;return{c(){e=b("span"),r=V(l)},l(t){e=g(t,"SPAN",{});var s=p(e);r=j(s,l),s.forEach(v)},m(t,s){U(t,e,s),n(e,r)},p(t,s){s&1&&l!==(l=t[2].readable(t[0].milestone.date)+"")&&A(r,l)},d(t){t&&v(e)}}}function x(i){let e,l,r=i[0].title+"",t,s,d,a=i[0].description+"",u,C,h,E,G,H,m,y,k,w,M,D=i[2].date(i[0].eta)+"",B,N;function z(o,c){var I;return(I=o[0].milestone)!=null&&I.date?$:Z}let L=z(i),_=L(i);return{c(){e=b("div"),l=b("div"),t=V(r),s=P(),d=b("div"),u=V(a),C=P(),h=b("div"),E=b("input"),G=P(),_.c(),H=P(),m=b("div"),y=R("svg"),k=R("circle"),w=R("path"),M=P(),B=V(D),this.h()},l(o){e=g(o,"DIV",{class:!0,style:!0});var c=p(e);l=g(c,"DIV",{class:!0});var I=p(l);t=j(I,r),I.forEach(v),s=S(c),d=g(c,"DIV",{class:!0});var F=p(d);u=j(F,a),F.forEach(v),C=S(c),h=g(c,"DIV",{class:!0});var W=p(h);E=g(W,"INPUT",{type:!0,name:!0}),G=S(W),_.l(W),W.forEach(v),H=S(c),m=g(c,"DIV",{class:!0,style:!0});var q=p(m);y=T(q,"svg",{viewBox:!0,class:!0});var Q=p(y);k=T(Q,"circle",{cx:!0,cy:!0,r:!0}),p(k).forEach(v),w=T(Q,"path",{d:!0}),p(w).forEach(v),Q.forEach(v),M=S(q),B=j(q,D),q.forEach(v),c.forEach(v),this.h()},h(){f(l,"class","title fw3 svelte-1mvnsm6"),f(d,"class","desc svelte-1mvnsm6"),f(E,"type","checkbox"),f(E,"name","blank"),E.checked=!0,E.disabled=!0,f(h,"class","mile fw7"),f(k,"cx","16"),f(k,"cy","16"),f(k,"r","14"),f(w,"d","M16 8 L16 16 20 20"),f(y,"viewBox","0 0 32 32"),f(y,"class","p-rel svelte-1mvnsm6"),f(m,"class","eta p-abs p10 blur svelte-1mvnsm6"),f(m,"style",N=`color:${i[2].color(i[0].eta)};`),f(e,"class","rx5 fw3 m10 p10 cont p-rel svelte-1mvnsm6"),Y(e,"--col",i[1]())},m(o,c){U(o,e,c),n(e,l),n(l,t),n(e,s),n(e,d),n(d,u),n(e,C),n(e,h),n(h,E),n(h,G),_.m(h,null),n(e,H),n(e,m),n(m,y),n(y,k),n(y,w),n(m,M),n(m,B)},p(o,[c]){c&1&&r!==(r=o[0].title+"")&&A(t,r),c&1&&a!==(a=o[0].description+"")&&A(u,a),L===(L=z(o))&&_?_.p(o,c):(_.d(1),_=L(o),_&&(_.c(),_.m(h,null))),c&1&&D!==(D=o[2].date(o[0].eta)+"")&&A(B,D),c&1&&N!==(N=`color:${o[2].color(o[0].eta)};`)&&f(m,"style",N)},i:J,o:J,d(o){o&&v(e),_.d()}}}function ee(i,e,l){let{color:r="linear-gradient(to top, #2af, #08d)",data:t={}}=e;const s=()=>{var a,u;return(a=t==null?void 0:t.title)!=null&&a.startsWith("Academic")?"linear-gradient(to top, #2d2, #0b0)":(u=t==null?void 0:t.title)!=null&&u.startsWith("Infinite")?"linear-gradient(to top, #fa2, #d80)":r},d={date:a=>{const u=-1*(new Date(a)-new Date)/864e5;return u>0?`+${~~u}`:~~u},readable:a=>new Date(a).toLocaleString("en-GB",{weekday:"short",day:"numeric",year:"2-digit",month:"short"}),color:a=>{const u=d.date(a);return u>=0?"#f00":u>=-7?"#ff0":"#fff"}};return i.$$set=a=>{"color"in a&&l(3,r=a.color),"data"in a&&l(0,t=a.data)},[t,s,d,r]}class ae extends K{constructor(e){super(),O(this,e,ee,x,X,{color:3,data:0})}}export{ae as default};
