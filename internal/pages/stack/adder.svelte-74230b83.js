import{S as X,i as Y,s as W,e as y,t as Z,c as b,a as L,h as x,d as A,g as B,J as p,K as D,k as I,m as N,b as r,M as H,f as $,a8 as ee,a9 as J,N as E,O as P,P as te,Y as le,Q as se,U as ae,aa as ie}from"../../chunks/vendor-c8cae9c7.js";import{a as G,g as re,s as ne}from"../../chunks/index-103846bb.js";function K(a,i,t){const g=a.slice();return g[10]=i[t],g}function Q(a){let i,t=a[10]+"",g,w;return{c(){i=y("option"),g=Z(t),this.h()},l(d){i=b(d,"OPTION",{});var e=L(i);g=x(e,t),e.forEach(A),this.h()},h(){i.__value=w=a[10],i.value=i.__value},m(d,e){B(d,i,e),p(i,g)},p:D,d(d){d&&A(i)}}}function oe(a){let i,t,g,w,d,e,n,v,U,z,O,m,f,h,T,o,k,c,F,R,M,j,V,C=G,_=[];for(let s=0;s<C.length;s+=1)_[s]=Q(K(a,C,s));return{c(){i=y("div"),t=y("img"),e=I(),n=y("form"),v=y("select");for(let s=0;s<_.length;s+=1)_[s].c();U=I(),z=y("br"),O=I(),m=y("input"),f=I(),h=y("input"),T=I(),o=y("input"),k=I(),c=y("textarea"),F=I(),R=y("input"),this.h()},l(s){i=b(s,"DIV",{class:!0,style:!0});var u=L(i);t=b(u,"IMG",{class:!0,src:!0,width:!0,height:!0,alt:!0,style:!0}),e=N(u),n=b(u,"FORM",{class:!0});var l=L(n);v=b(l,"SELECT",{});var S=L(v);for(let q=0;q<_.length;q+=1)_[q].l(S);S.forEach(A),U=N(l),z=b(l,"BR",{}),O=N(l),m=b(l,"INPUT",{type:!0,placeholder:!0,class:!0}),f=N(l),h=b(l,"INPUT",{type:!0,placeholder:!0,class:!0}),T=N(l),o=b(l,"INPUT",{type:!0,placeholder:!0,class:!0}),k=N(l),c=b(l,"TEXTAREA",{name:!0,rows:!0,placeholder:!0,class:!0}),L(c).forEach(A),F=N(l),R=b(l,"INPUT",{class:!0,type:!0}),l.forEach(A),u.forEach(A),this.h()},h(){r(t,"class","p-abs svelte-m7gyp5"),H(t.src,g=a[1].image)||r(t,"src",g),r(t,"width",w=a[0].width),r(t,"height",d=a[0].height),r(t,"alt","Placeholder"),$(t,"z-index","0"),a[1].type===void 0&&ee(()=>a[4].call(v)),r(m,"type","text"),r(m,"placeholder","URL"),r(m,"class","svelte-m7gyp5"),r(h,"type","text"),r(h,"placeholder","Title"),r(h,"class","svelte-m7gyp5"),r(o,"type","text"),r(o,"placeholder","Image"),r(o,"class","svelte-m7gyp5"),r(c,"name","notes"),r(c,"rows","5"),r(c,"placeholder","Notes"),r(c,"class","svelte-m7gyp5"),r(R,"class","o-0 svelte-m7gyp5"),r(R,"type","submit"),R.value="Go",r(n,"class","p-abs p20 svelte-m7gyp5"),r(i,"class","tile p-rel"),r(i,"style",M=`width:${a[0].width};height:${a[0].height};`)},m(s,u){B(s,i,u),p(i,t),p(i,e),p(i,n),p(n,v);for(let l=0;l<_.length;l+=1)_[l].m(v,null);J(v,a[1].type),p(n,U),p(n,z),p(n,O),p(n,m),E(m,a[1].url),p(n,f),p(n,h),E(h,a[1].title),p(n,T),p(n,o),E(o,a[1].image),p(n,k),p(n,c),E(c,a[1].notes),p(n,F),p(n,R),j||(V=[P(v,"change",a[4]),P(m,"blur",a[2]),P(m,"input",a[5]),P(h,"input",a[6]),P(o,"input",a[7]),P(c,"input",a[8]),P(n,"submit",te(a[3]))],j=!0)},p(s,[u]){if(u&2&&!H(t.src,g=s[1].image)&&r(t,"src",g),u&1&&w!==(w=s[0].width)&&r(t,"width",w),u&1&&d!==(d=s[0].height)&&r(t,"height",d),u&0){C=G;let l;for(l=0;l<C.length;l+=1){const S=K(s,C,l);_[l]?_[l].p(S,u):(_[l]=Q(S),_[l].c(),_[l].m(v,null))}for(;l<_.length;l+=1)_[l].d(1);_.length=C.length}u&2&&J(v,s[1].type),u&2&&m.value!==s[1].url&&E(m,s[1].url),u&2&&h.value!==s[1].title&&E(h,s[1].title),u&2&&o.value!==s[1].image&&E(o,s[1].image),u&2&&E(c,s[1].notes),u&1&&M!==(M=`width:${s[0].width};height:${s[0].height};`)&&r(i,"style",M)},i:D,o:D,d(s){s&&A(i),le(_,s),j=!1,se(V)}}}function ue(a,i,t){const g=f=>f.charAt(0).toUpperCase()+f.slice(1);let{size:w={width:0,height:0}}=i;const d=f=>{t(1,e.title="Fetching...",e),t(1,e.image="Fetching...",e);const h=[f.target.value,f.target.value.split("/")[0].split("?")[0]].map(re);Promise.all(h).then(T=>{const[o,k]=T;o.title&&t(1,e.title=o.title||"No Title Recieved",e),o.image&&t(1,e.image=o.image||k.image||"No Image Available",e),o.type&&(G.map(c=>c.toLowerCase()).includes(o.type.toLowerCase())||t(1,e.notes=o.type,e),t(1,e.type=g(o.type)||"Article",e))})};let e={title:"",type:"Video",url:"",image:"",notes:""};const n=f=>{const h=e,T=ae.exports.crypt.uuid().split("-")[0],k=`${(+new Date).toString(36)}-${T}`;h.type||(h.type="Article"),ne.put("amos",k,h).then(c=>{c.charAt(0)==='"'?(console.log(200),t(1,e={title:"",type:"Article",url:"",image:"",notes:""})):(t(1,e.title="ERROR Sending!",e),t(1,e.image="Check console",e),console.log(c))})};function v(){e.type=ie(this),t(1,e)}function U(){e.url=this.value,t(1,e)}function z(){e.title=this.value,t(1,e)}function O(){e.image=this.value,t(1,e)}function m(){e.notes=this.value,t(1,e)}return a.$$set=f=>{"size"in f&&t(0,w=f.size)},[w,e,d,n,v,U,z,O,m]}class ce extends X{constructor(i){super();Y(this,i,ue,oe,W,{size:0})}}export{ce as default};