import{S as H,i as M,s as E,e as _,c as p,a as g,d,b as u,g as v,M as k,k as y,Z as j,m as I,_ as q,J as T,K as L,v as A}from"../../../chunks/vendor-c8cae9c7.js";const C=s=>{var l;const e=c=>c.replace("TIL that","").replace("TIL about","").replace("TIL :","").replace("TIL:","").replace("TIL","").replace("Today I Learned","").trim(),t=s.data.children[0].data;return{desc:e(t.title),href:t.url,image:(l=t.preview)==null?void 0:l.images[0].resolutions[1].url.replaceAll("&amp;","&")}},S=s=>({title:s.titles.display,desc:s.extract_html,image:s.thumbnail.source,href:s.content_urls.desktop.page});function b(s){let e,t=s[0].title+"";return{c(){e=_("h5"),this.h()},l(a){e=p(a,"H5",{class:!0});var l=g(e);l.forEach(d),this.h()},h(){u(e,"class","m0 svelte-3r5clx")},m(a,l){v(a,e,l),e.innerHTML=t},p(a,l){l&1&&t!==(t=a[0].title+"")&&(e.innerHTML=t)},d(a){a&&d(e)}}}function w(s){let e,t,a;return{c(){e=_("img"),this.h()},l(l){e=p(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){k(e.src,t=s[0].image)||u(e,"src",t),u(e,"alt",a=s[0].title),u(e,"class","svelte-3r5clx")},m(l,c){v(l,e,c)},p(l,c){c&1&&!k(e.src,t=l[0].image)&&u(e,"src",t),c&1&&a!==(a=l[0].title)&&u(e,"alt",a)},d(l){l&&d(e)}}}function D(s){let e,t,a,l,c=s[0].desc+"",h,o,i=s[0].title&&b(s),r=s[0].image&&w(s);return{c(){e=_("a"),t=_("div"),i&&i.c(),a=y(),l=new j,h=y(),r&&r.c(),this.h()},l(n){e=p(n,"A",{href:!0,class:!0});var f=g(e);t=p(f,"DIV",{class:!0});var m=g(t);i&&i.l(m),a=I(m),l=q(m),m.forEach(d),h=I(f),r&&r.l(f),f.forEach(d),this.h()},h(){l.a=null,u(t,"class","p10 svelte-3r5clx"),u(e,"href",o=s[0].href),u(e,"class","m10 tile \u0192 \u2020l fade-right svelte-3r5clx")},m(n,f){v(n,e,f),T(e,t),i&&i.m(t,null),T(t,a),l.m(c,t),T(e,h),r&&r.m(e,null)},p(n,[f]){n[0].title?i?i.p(n,f):(i=b(n),i.c(),i.m(t,a)):i&&(i.d(1),i=null),f&1&&c!==(c=n[0].desc+"")&&l.p(c),n[0].image?r?r.p(n,f):(r=w(n),r.c(),r.m(e,null)):r&&(r.d(1),r=null),f&1&&o!==(o=n[0].href)&&u(e,"href",o)},i:L,o:L,d(n){n&&d(e),i&&i.d(),r&&r.d()}}}function G(s,e,t){let{url:a,type:l}=e,c={title:"",desc:"fetching...",image:"",href:""};return A(()=>{const h={reddit:C,wikipedia:S};fetch(a).then(o=>o.json()).then(o=>t(0,c=h[l](o)))}),s.$$set=h=>{"url"in h&&t(1,a=h.url),"type"in h&&t(2,l=h.type)},[c,a,l]}class K extends H{constructor(e){super();M(this,e,G,D,E,{url:1,type:2})}}export{K as default};