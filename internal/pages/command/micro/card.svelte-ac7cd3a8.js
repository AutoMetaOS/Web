import{S as w,i as M,s as j,e as _,c as p,a as g,d,b as u,f as v,K as T,j as b,X as E,l as y,Y as q,H as I,I as L,u as A}from"../../../chunks/vendor-858ab733.js";const C=s=>{var l;const e=n=>n.replace("TIL that","").replace("TIL about","").replace("TIL :","").replace("TIL:","").replace("TIL","").replace("Today I Learned","").trim(),t=s.data.children[0].data;return{desc:e(t.title),href:t.url,image:(l=t.preview)==null?void 0:l.images[0].resolutions[1].url.replaceAll("&amp;","&")}},S=s=>({title:s.titles.display,desc:s.extract_html,image:s.thumbnail.source,href:s.content_urls.desktop.page});function k(s){let e,t=s[0].title+"";return{c(){e=_("h5"),this.h()},l(a){e=p(a,"H5",{class:!0});var l=g(e);l.forEach(d),this.h()},h(){u(e,"class","m0 svelte-3r5clx")},m(a,l){v(a,e,l),e.innerHTML=t},p(a,l){l&1&&t!==(t=a[0].title+"")&&(e.innerHTML=t)},d(a){a&&d(e)}}}function H(s){let e,t,a;return{c(){e=_("img"),this.h()},l(l){e=p(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){T(e.src,t=s[0].image)||u(e,"src",t),u(e,"alt",a=s[0].title),u(e,"class","svelte-3r5clx")},m(l,n){v(l,e,n)},p(l,n){n&1&&!T(e.src,t=l[0].image)&&u(e,"src",t),n&1&&a!==(a=l[0].title)&&u(e,"alt",a)},d(l){l&&d(e)}}}function D(s){let e,t,a,l,n=s[0].desc+"",h,o,i=s[0].title&&k(s),r=s[0].image&&H(s);return{c(){e=_("a"),t=_("div"),i&&i.c(),a=b(),l=new E,h=b(),r&&r.c(),this.h()},l(c){e=p(c,"A",{href:!0,class:!0});var f=g(e);t=p(f,"DIV",{class:!0});var m=g(t);i&&i.l(m),a=y(m),l=q(m),m.forEach(d),h=y(f),r&&r.l(f),f.forEach(d),this.h()},h(){l.a=null,u(t,"class","p10 svelte-3r5clx"),u(e,"href",o=s[0].href),u(e,"class","m10 tile \u0192 \u2020l fade-right svelte-3r5clx")},m(c,f){v(c,e,f),I(e,t),i&&i.m(t,null),I(t,a),l.m(n,t),I(e,h),r&&r.m(e,null)},p(c,[f]){c[0].title?i?i.p(c,f):(i=k(c),i.c(),i.m(t,a)):i&&(i.d(1),i=null),f&1&&n!==(n=c[0].desc+"")&&l.p(n),c[0].image?r?r.p(c,f):(r=H(c),r.c(),r.m(e,null)):r&&(r.d(1),r=null),f&1&&o!==(o=c[0].href)&&u(e,"href",o)},i:L,o:L,d(c){c&&d(e),i&&i.d(),r&&r.d()}}}function G(s,e,t){let{url:a,type:l}=e,n={title:"",desc:"fetching...",image:"",href:""};return A(()=>{const h={reddit:C,wikipedia:S};fetch(a).then(o=>o.json()).then(o=>t(0,n=h[l](o)))}),s.$$set=h=>{"url"in h&&t(1,a=h.url),"type"in h&&t(2,l=h.type)},[n,a,l]}class V extends w{constructor(e){super();M(this,e,G,D,j,{url:1,type:2})}}export{V as default};
