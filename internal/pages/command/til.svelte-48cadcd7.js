import{S as q,i as x,s as C,e as _,W as P,t as k,k as L,c as v,a as y,X as D,g as $,d as o,n as A,b as r,K as F,f as b,H as d,I as H,A as K}from"../../chunks/vendor-05f61b45.js";function M(f){let s,l,n,h=f[3](f[0].title)+"",p,u,m,e,a,j,g,c,I;return{c(){s=_("a"),l=_("p"),n=new P,p=k(" \u2192"),m=L(),e=_("div"),a=_("a"),j=k("Tweets by elonmusk"),g=L(),c=_("script"),this.h()},l(t){s=v(t,"A",{href:!0,class:!0,style:!0});var i=y(s);l=v(i,"P",{class:!0});var T=y(l);n=D(T),p=$(T," \u2192"),T.forEach(o),i.forEach(o),m=A(t),e=v(t,"DIV",{class:!0,style:!0});var w=y(e);a=v(w,"A",{class:!0,href:!0});var E=y(a);j=$(E,"Tweets by elonmusk"),E.forEach(o),g=A(w),c=v(w,"SCRIPT",{src:!0,charset:!0});var S=y(c);S.forEach(o),w.forEach(o),this.h()},h(){n.a=p,r(l,"class","svelte-1maojtx"),r(s,"href",u=f[0].href),r(s,"class","rpm-10 tile \u0192-col \u2020j fade-right bg svelte-1maojtx"),r(s,"style",f[1]),r(a,"class","twitter-timeline "),r(a,"href","https://twitter.com/elonmusk?ref_src=twsrc%5Etfw"),c.async=!0,F(c.src,I="https://platform.twitter.com/widgets.js")||r(c,"src",I),r(c,"charset","utf-8"),r(e,"class","rpm-10 tile svelte-1maojtx"),r(e,"style",f[2])},m(t,i){b(t,s,i),d(s,l),n.m(h,l),d(l,p),b(t,m,i),b(t,e,i),d(e,a),d(a,j),d(e,g),d(e,c)},p(t,[i]){i&1&&h!==(h=t[3](t[0].title)+"")&&n.p(h),i&1&&u!==(u=t[0].href)&&r(s,"href",u)},i:H,o:H,d(t){t&&o(s),t&&o(m),t&&o(e)}}}function R(f,s,l){let n={title:"fetching...",href:"#"};K(()=>fetch("https://www.reddit.com/r/todayilearned/new/.json?limit=1").then(e=>e.json()).then(e=>{const a=e.data.children[0].data;l(0,n={title:a.title,href:a.url})}));const h=e=>e.map(a=>a.join(":")).join(";"),p=h([["--bg","linear-gradient(135deg, #30a, #90F)"]]),u=h([["border","1px solid #2af"]]);return[n,p,u,e=>e.replace("TIL that","").replace("TIL about","").replace("TIL","").replace("Today I Learned","").trim()]}class W extends q{constructor(s){super();x(this,s,R,M,C,{})}}export{W as default};
