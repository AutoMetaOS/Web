import{S as G,i as J,s as N,e as y,ad as Q,k,t as E,c as w,a as b,ae as T,m as j,h as V,d as v,f as D,b as f,g as M,J as h,j as C,I as H,U,E as S,Q as z,v as A}from"../../../chunks/index-132e5a0e.js";import{g as B,n as F,p as K}from"../../../chunks/index-71102d8f.js";import"../../../chunks/notifs-708c8c3d.js";import"../../../chunks/index-cfd1276c.js";import"../../../chunks/index-99e896be.js";function q(n){var p;let l,t,c,d=((p=n[0])==null?void 0:p.slice(0,60))+"",u,r=n[0].length>60?"...":"",i,a,s,_=n[3].join(" \u2022 ")+"",g;return{c(){l=y("div"),t=y("div"),c=new Q,u=k(),i=E(r),a=k(),s=y("div"),g=E(_),this.h()},l(m){l=w(m,"DIV",{class:!0});var o=b(l);t=w(o,"DIV",{style:!0});var e=b(t);c=T(e),u=j(e),i=V(e,r),e.forEach(v),a=j(o),s=w(o,"DIV",{style:!0});var I=b(s);g=V(I,_),I.forEach(v),o.forEach(v),this.h()},h(){c.a=u,D(t,"padding-bottom","5px"),D(s,"color","#888"),f(l,"class","\u2020c fw3 w-100 deets blur p-abs p5 svelte-1fwn7j2")},m(m,o){M(m,l,o),h(l,t),c.m(d,t),h(t,u),h(t,i),h(l,a),h(l,s),h(s,g)},p(m,o){var e;o&1&&d!==(d=((e=m[0])==null?void 0:e.slice(0,60))+"")&&c.p(d),o&1&&r!==(r=m[0].length>60?"...":"")&&C(i,r),o&8&&_!==(_=m[3].join(" \u2022 ")+"")&&C(g,_)},d(m){m&&v(l)}}}function L(n){let l,t,c,d,u,r,i=n[3].length&&q(n);return{c(){l=y("div"),t=y("img"),d=k(),i&&i.c(),this.h()},l(a){l=w(a,"DIV",{class:!0,id:!0,"data-title":!0,"data-slug":!0});var s=b(l);t=w(s,"IMG",{id:!0,src:!0,class:!0,alt:!0}),d=j(s),i&&i.l(s),s.forEach(v),this.h()},h(){f(t,"id","img_"+n[4]()),H(t.src,c=n[2])||f(t,"src",c),f(t,"class","w-100 svelte-1fwn7j2"),f(t,"alt","thubmnail"),f(l,"class","recom p-rel fade-right m5 rx10 \u0192-col svelte-1fwn7j2"),f(l,"id",n[4]()),f(l,"data-title",n[0]),f(l,"data-slug",n[1])},m(a,s){M(a,l,s),h(l,t),h(l,d),i&&i.m(l,null),u||(r=U(l,"click",n[5]),u=!0)},p(a,[s]){s&4&&!H(t.src,c=a[2])&&f(t,"src",c),a[3].length?i?i.p(a,s):(i=q(a),i.c(),i.m(l,null)):i&&(i.d(1),i=null),s&1&&f(l,"data-title",a[0]),s&2&&f(l,"data-slug",a[1])},i:S,o:S,d(a){a&&v(l),i&&i.d(),u=!1,r()}}}function O(n,l,t){var o;let c,d;z(n,F,e=>t(10,d=e));let{get_next:u=0,title:r="",details:i=[],type:a="",count:s=+((o=d.local_id)==null?void 0:o.split("-")[1])||0,slug:_="",image:g="https://wallpaperaccess.com/full/2404603.png"}=l;const p=()=>{let e;return a==="snippet"&&(e="yt-"+s),a==="stack"?e="kv-"+s:e="yt-"+s,e},m=()=>K.videoSet(c);return A(()=>{if(u){const e=B();t(0,[r,_,g,s,a]=[e.title,e.slug,e.image,e.count,e.type],r,t(1,_),t(2,g),t(7,s),t(6,a))}}),n.$$set=e=>{"get_next"in e&&t(8,u=e.get_next),"title"in e&&t(0,r=e.title),"details"in e&&t(3,i=e.details),"type"in e&&t(6,a=e.type),"count"in e&&t(7,s=e.count),"slug"in e&&t(1,_=e.slug),"image"in e&&t(2,g=e.image)},n.$$.update=()=>{n.$$.dirty&207&&(c={title:r,details:i,type:a,count:s,slug:_,image:g,id:p()})},[r,_,g,i,p,m,a,s,u]}class Z extends G{constructor(l){super(),J(this,l,O,L,N,{get_next:8,title:0,details:3,type:6,count:7,slug:1,image:2})}}export{Z as default};
