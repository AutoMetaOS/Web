import{S as O,i as Q,s as R,e as b,t as j,k as S,$ as M,c as y,a as p,h as A,d as m,m as V,a0 as T,b as v,f as X,g as U,J as n,j as B,E as K}from"../../../chunks/index-f6cfea4e.js";function Y(i){var t;let e,s=((t=i[0].milestone)==null?void 0:t.text)+"",r;return{c(){e=b("span"),r=j(s)},l(a){e=y(a,"SPAN",{});var d=p(e);r=A(d,s),d.forEach(m)},m(a,d){U(a,e,d),n(e,r)},p(a,d){var l;d&1&&s!==(s=((l=a[0].milestone)==null?void 0:l.text)+"")&&B(r,s)},d(a){a&&m(e)}}}function Z(i){let e,s=i[2].readable(i[0].milestone.date)+"",r;return{c(){e=b("span"),r=j(s)},l(t){e=y(t,"SPAN",{});var a=p(e);r=A(a,s),a.forEach(m)},m(t,a){U(t,e,a),n(e,r)},p(t,a){a&1&&s!==(s=t[2].readable(t[0].milestone.date)+"")&&B(r,s)},d(t){t&&m(e)}}}function $(i){let e,s,r=i[0].title+"",t,a,d,l=i[0].description+"",f,E,_,k,z,C,h,g,w,D,G,I=i[2].date(i[0].eta)+"",L,N;function F(o,c){var P;return(P=o[0].milestone)!=null&&P.date?Z:Y}let W=F(i),u=W(i);return{c(){e=b("div"),s=b("div"),t=j(r),a=S(),d=b("div"),f=j(l),E=S(),_=b("div"),k=b("input"),z=S(),u.c(),C=S(),h=b("div"),g=M("svg"),w=M("circle"),D=M("path"),G=S(),L=j(I),this.h()},l(o){e=y(o,"DIV",{class:!0,style:!0});var c=p(e);s=y(c,"DIV",{class:!0});var P=p(s);t=A(P,r),P.forEach(m),a=V(c),d=y(c,"DIV",{class:!0});var H=p(d);f=A(H,l),H.forEach(m),E=V(c),_=y(c,"DIV",{class:!0});var q=p(_);k=y(q,"INPUT",{type:!0,name:!0}),z=V(q),u.l(q),q.forEach(m),C=V(c),h=y(c,"DIV",{class:!0,style:!0});var x=p(h);g=T(x,"svg",{viewBox:!0,class:!0});var J=p(g);w=T(J,"circle",{cx:!0,cy:!0,r:!0}),p(w).forEach(m),D=T(J,"path",{d:!0}),p(D).forEach(m),J.forEach(m),G=V(x),L=A(x,I),x.forEach(m),c.forEach(m),this.h()},h(){v(s,"class","title fw3 svelte-1mvnsm6"),v(d,"class","desc svelte-1mvnsm6"),v(k,"type","checkbox"),v(k,"name","blank"),k.checked=!0,k.disabled=!0,v(_,"class","mile fw7"),v(w,"cx","16"),v(w,"cy","16"),v(w,"r","14"),v(D,"d","M16 8 L16 16 20 20"),v(g,"viewBox","0 0 32 32"),v(g,"class","p-rel svelte-1mvnsm6"),v(h,"class","eta p-abs p10 blur svelte-1mvnsm6"),v(h,"style",N=`color:${i[2].color(i[0].eta)};`),v(e,"class","rx5 fw3 m10 p10 cont p-rel svelte-1mvnsm6"),X(e,"--col",i[1]())},m(o,c){U(o,e,c),n(e,s),n(s,t),n(e,a),n(e,d),n(d,f),n(e,E),n(e,_),n(_,k),n(_,z),u.m(_,null),n(e,C),n(e,h),n(h,g),n(g,w),n(g,D),n(h,G),n(h,L)},p(o,[c]){c&1&&r!==(r=o[0].title+"")&&B(t,r),c&1&&l!==(l=o[0].description+"")&&B(f,l),W===(W=F(o))&&u?u.p(o,c):(u.d(1),u=W(o),u&&(u.c(),u.m(_,null))),c&1&&I!==(I=o[2].date(o[0].eta)+"")&&B(L,I),c&1&&N!==(N=`color:${o[2].color(o[0].eta)};`)&&v(h,"style",N)},i:K,o:K,d(o){o&&m(e),u.d()}}}function ee(i,e,s){let{color:r="linear-gradient(to top, #2af, #08d)",data:t={}}=e;const a=()=>{var l,f,E;return(l=t==null?void 0:t.title)!=null&&l.startsWith("Academic")?"linear-gradient(to top, #2d2, #0b0)":((f=t==null?void 0:t.title)==null?void 0:f.startsWith("Infinite"))||((E=t==null?void 0:t.title)==null?void 0:E.startsWith("Long"))?"linear-gradient(to top, #fa2, #d80)":r},d={date:l=>{const f=-1*(new Date(l)-new Date)/864e5;return f>0?`+${~~f}`:~~f},readable:l=>new Date(l).toLocaleString("en-GB",{weekday:"short",day:"numeric",year:"2-digit",month:"short"}),color:l=>{const f=d.date(l);return f>=0?"#f00":f>=-7?"#ff0":"#fff"}};return i.$$set=l=>{"color"in l&&s(3,r=l.color),"data"in l&&s(0,t=l.data)},[t,a,d,r]}class le extends O{constructor(e){super(),Q(this,e,ee,$,R,{color:3,data:0})}}export{le as default};