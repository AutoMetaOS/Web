import{S as K,i as O,s as Q,j as W,m as X,o as Y,x as Z,u as x,v as ee,A as te,e as $,t as w,k as B,a3 as J,c as v,a as _,g as E,d,n as H,b as g,f as ae,H as s,h as P}from"../../chunks/vendor-7295d73e.js";import{C as se}from"../../chunks/ClickableTile-c89edf25.js";function ne(i){var q,y;let t,n,l,u=i[2](i[0])+"",c,e,a,r,b,p,m=((q=i[0])==null?void 0:q.title)+"",L,T,h,A,S=i[1].time+"",M,V,C,j=((y=i[0])==null?void 0:y.from)+"",N,z;return{c(){t=$("div"),n=$("div"),l=$("span"),c=w(u),e=B(),a=J("svg"),r=J("path"),b=B(),p=$("h1"),L=w(m),T=B(),h=$("div"),A=$("span"),M=w(S),V=w(`
            (`),C=$("span"),N=w(j),z=w(")"),this.h()},l(f){t=v(f,"DIV",{class:!0});var o=_(t);n=v(o,"DIV",{class:!0});var k=_(n);l=v(k,"SPAN",{});var D=_(l);c=E(D,u),D.forEach(d),e=H(k),a=v(k,"svg",{viewBox:!0,width:!0,height:!0,stroke:!0},1);var R=_(a);r=v(R,"path",{d:!0},1),_(r).forEach(d),R.forEach(d),k.forEach(d),b=H(o),p=v(o,"H1",{});var U=_(p);L=E(U,m),U.forEach(d),T=H(o),h=v(o,"DIV",{class:!0});var I=_(h);A=v(I,"SPAN",{});var F=_(A);M=E(F,S),F.forEach(d),V=E(I,`
            (`),C=v(I,"SPAN",{});var G=_(C);N=E(G,j),G.forEach(d),z=E(I,")"),I.forEach(d),o.forEach(d),this.h()},h(){g(r,"d","M2 30 L30 2 M30 30 L2 2"),g(a,"viewBox","0 0 32 32"),g(a,"width","16"),g(a,"height","16"),g(a,"stroke","#fff"),g(n,"class","\u0192 \u2206-bw"),g(h,"class","tile-rec p-abs svelte-tokyn8"),g(t,"class","clearfix p20 w-100 h-100 svelte-tokyn8")},m(f,o){ae(f,t,o),s(t,n),s(n,l),s(l,c),s(n,e),s(n,a),s(a,r),s(t,b),s(t,p),s(p,L),s(t,T),s(t,h),s(h,A),s(A,M),s(h,V),s(h,C),s(C,N),s(h,z)},p(f,o){var k,D;o&1&&u!==(u=f[2](f[0])+"")&&P(c,u),o&1&&m!==(m=((k=f[0])==null?void 0:k.title)+"")&&P(L,m),o&2&&S!==(S=f[1].time+"")&&P(M,S),o&1&&j!==(j=((D=f[0])==null?void 0:D.from)+"")&&P(N,j)},d(f){f&&d(t)}}}function le(i){var l,u,c;let t,n;return t=new se({props:{class:"tile",href:(l=i[0])==null?void 0:l.url,id:(u=i[0])==null?void 0:u.id,style:"background:url("+((c=i[0])==null?void 0:c.image)+") center center no-repeat;background-size: cover;",$$slots:{default:[ne]},$$scope:{ctx:i}}}),{c(){W(t.$$.fragment)},l(e){X(t.$$.fragment,e)},m(e,a){Y(t,e,a),n=!0},p(e,[a]){var b,p,m;const r={};a&1&&(r.href=(b=e[0])==null?void 0:b.url),a&1&&(r.id=(p=e[0])==null?void 0:p.id),a&1&&(r.style="background:url("+((m=e[0])==null?void 0:m.image)+") center center no-repeat;background-size: cover;"),a&11&&(r.$$scope={dirty:a,ctx:e}),t.$set(r)},i(e){n||(Z(t.$$.fragment,e),n=!0)},o(e){x(t.$$.fragment,e),n=!1},d(e){ee(t,e)}}}function re(i,t,n){let{data:l={}}=t;const u=({type:e,url:a})=>{var r;return a=(r=new URL(a||"https://trial.nukes.in"))==null?void 0:r.hostname.replace(/^www\./,""),e==="Article"?e=`Article (${a})`:e};let c={time:""};return te(()=>{n(1,c.time=time.since(l==null?void 0:l.date),c)}),i.$$set=e=>{"data"in e&&n(0,l=e.data)},[l,c,u]}class ce extends K{constructor(t){super();O(this,t,re,le,Q,{data:0})}}export{ce as default};