import{S as H,i as O,s as Q,e as w,t as z,k as P,W as M,c as b,a as p,h as S,d as v,m as V,X as T,b as f,f as R,g as U,J as i,j,K as F}from"../../chunks/vendor-a193541a.js";function Y(n){var t;let e,a=((t=n[0].milestone)==null?void 0:t.text)+"",r;return{c(){e=w("span"),r=z(a)},l(s){e=b(s,"SPAN",{});var d=p(e);r=S(d,a),d.forEach(v)},m(s,d){U(s,e,d),i(e,r)},p(s,d){var l;d&1&&a!==(a=((l=s[0].milestone)==null?void 0:l.text)+"")&&j(r,a)},d(s){s&&v(e)}}}function Z(n){let e,a=n[2].readable(n[0].milestone.date)+"",r;return{c(){e=w("span"),r=z(a)},l(t){e=b(t,"SPAN",{});var s=p(e);r=S(s,a),s.forEach(v)},m(t,s){U(t,e,s),i(e,r)},p(t,s){s&1&&a!==(a=t[2].readable(t[0].milestone.date)+"")&&j(r,a)},d(t){t&&v(e)}}}function $(n){let e,a,r=n[0].title+"",t,s,d,l=n[0].description+"",u,q,m,g,C,G,h,y,k,E,J,D=n[2].date(n[0].eta)+"",A,B;function X(o,c){var I;return((I=o[0].milestone)==null?void 0:I.date)?Z:Y}let N=X(n),_=N(n);return{c(){e=w("div"),a=w("div"),t=z(r),s=P(),d=w("div"),u=z(l),q=P(),m=w("div"),g=w("input"),C=P(),_.c(),G=P(),h=w("div"),y=M("svg"),k=M("circle"),E=M("path"),J=P(),A=z(D),this.h()},l(o){e=b(o,"DIV",{class:!0,style:!0});var c=p(e);a=b(c,"DIV",{class:!0});var I=p(a);t=S(I,r),I.forEach(v),s=V(c),d=b(c,"DIV",{class:!0});var x=p(d);u=S(x,l),x.forEach(v),q=V(c),m=b(c,"DIV",{class:!0});var W=p(m);g=b(W,"INPUT",{type:!0,name:!0}),C=V(W),_.l(W),W.forEach(v),G=V(c),h=b(c,"DIV",{class:!0,style:!0});var L=p(h);y=T(L,"svg",{viewBox:!0,class:!0});var K=p(y);k=T(K,"circle",{cx:!0,cy:!0,r:!0}),p(k).forEach(v),E=T(K,"path",{d:!0}),p(E).forEach(v),K.forEach(v),J=V(L),A=S(L,D),L.forEach(v),c.forEach(v),this.h()},h(){f(a,"class","title fw3 svelte-ixwz2l"),f(d,"class","desc svelte-ixwz2l"),f(g,"type","checkbox"),f(g,"name","blank"),g.checked=!0,g.disabled=!0,f(m,"class","mile fw7"),f(k,"cx","16"),f(k,"cy","16"),f(k,"r","14"),f(E,"d","M16 8 L16 16 20 20"),f(y,"viewBox","0 0 32 32"),f(y,"class","p-rel svelte-ixwz2l"),f(h,"class","eta p-abs p10 rx5 svelte-ixwz2l"),f(h,"style",B=`color:${n[2].color(n[0].eta)};`),f(e,"class","rx5 fw3 m10 p10 cont p-rel svelte-ixwz2l"),R(e,"--col",n[1]())},m(o,c){U(o,e,c),i(e,a),i(a,t),i(e,s),i(e,d),i(d,u),i(e,q),i(e,m),i(m,g),i(m,C),_.m(m,null),i(e,G),i(e,h),i(h,y),i(y,k),i(y,E),i(h,J),i(h,A)},p(o,[c]){c&1&&r!==(r=o[0].title+"")&&j(t,r),c&1&&l!==(l=o[0].description+"")&&j(u,l),N===(N=X(o))&&_?_.p(o,c):(_.d(1),_=N(o),_&&(_.c(),_.m(m,null))),c&1&&D!==(D=o[2].date(o[0].eta)+"")&&j(A,D),c&1&&B!==(B=`color:${o[2].color(o[0].eta)};`)&&f(h,"style",B)},i:F,o:F,d(o){o&&v(e),_.d()}}}function ee(n,e,a){let{color:r="#22f4",data:t={}}=e;const s=()=>{var l,u;return((l=t==null?void 0:t.title)==null?void 0:l.startsWith("Academic"))?"#2f24":((u=t==null?void 0:t.title)==null?void 0:u.startsWith("Infinite"))?"#f224":r},d={date:l=>{const u=-1*(new Date(l)-new Date)/864e5;return u>0?`+${~~u}`:~~u},readable:l=>new Date(l).toLocaleString("en-GB",{weekday:"short",day:"numeric",year:"2-digit",month:"short"}),color:l=>{const u=d.date(l);return u>=0?"#f00":u>=-7?"#ff0":"#fff"}};return n.$$set=l=>{"color"in l&&a(3,r=l.color),"data"in l&&a(0,t=l.data)},[t,s,d,r]}class le extends H{constructor(e){super();O(this,e,ee,$,Q,{color:3,data:0})}}export{le as default};
