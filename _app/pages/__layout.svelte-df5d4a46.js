import{H as K,S as H,i as N,s as R,e as k,k as x,t as M,c as w,a as I,m as E,h as D,d as v,I as S,b as p,g as q,J as b,j as U,K as Q,L as W,M as X,N as Y,O as j,n as Z,P as z,p as ee,q as V,o as C,Q as te,E as F,R as se,T as ae,w as le,x as ne,y as ie,U as re,V as oe,W as ce,X as fe,B as ue,Y as _e,v as he,Z as de}from"../chunks/index-a063a824.js";import{n as me}from"../chunks/index-3e8a5f17.js";import"../chunks/index-acbfbb82.js";import"../chunks/index-a67a2886.js";import"../chunks/_commonjsHelpers-c771f69b.js";function J(o){const t=o-1;return t*t*t+1}function pe(o,{from:t,to:e},i={}){const u=getComputedStyle(o),r=u.transform==="none"?"":u.transform,[c,a]=u.transformOrigin.split(" ").map(parseFloat),l=t.left+t.width*c/e.width-(e.left+c),n=t.top+t.height*a/e.height-(e.top+a),{delay:_=0,duration:m=s=>Math.sqrt(s)*120,easing:f=J}=i;return{delay:_,duration:K(m)?m(Math.sqrt(l*l+n*n)):m,easing:f,css:(s,h)=>{const d=h*l,g=h*n,$=s+h*t.width/e.width,y=s+h*t.height/e.height;return`transform: ${r} translate(${d}px, ${g}px) scale(${$}, ${y});`}}}function A(o,{delay:t=0,duration:e=400,easing:i=J,x:u=0,y:r=0,opacity:c=0}={}){const a=getComputedStyle(o),l=+a.opacity,n=a.transform==="none"?"":a.transform,_=l*(1-c);return{delay:t,duration:e,easing:i,css:(m,f)=>`
			transform: ${n} translate(${(1-m)*u}px, ${(1-m)*r}px);
			opacity: ${l-_*f}`}}function B(o,t,e){const i=o.slice();return i[2]=t[e],i}function L(o,t){let e,i,u,r,c,a=t[0][t[2].type]+"",l,n,_=t[2].message+"",m,f,s,h,d=F,g;return{key:o,first:null,c(){e=k("div"),i=k("img"),r=x(),c=k("div"),l=M(a),n=M(":"),m=M(_),f=x(),this.h()},l($){e=w($,"DIV",{class:!0});var y=I(e);i=w(y,"IMG",{src:!0,height:!0,width:!0,alt:!0}),r=E(y),c=w(y,"DIV",{class:!0});var O=I(c);l=D(O,a),n=D(O,":"),m=D(O,_),O.forEach(v),f=E(y),y.forEach(v),this.h()},h(){S(i.src,u=`/OUI/icons/${t[2].from}.svg`)||p(i,"src",u),p(i,"height","36px"),p(i,"width","36px"),p(i,"alt","logo"),p(c,"class","content p10 fw5"),p(e,"class","toast mx-a p10 rx5 blur \u0192 svelte-96aryn"),this.first=e},m($,y){q($,e,y),b(e,i),b(e,r),b(e,c),b(c,l),b(c,n),b(c,m),b(e,f),g=!0},p($,y){t=$,(!g||y&2&&!S(i.src,u=`/OUI/icons/${t[2].from}.svg`))&&p(i,"src",u),(!g||y&3)&&a!==(a=t[0][t[2].type]+"")&&U(l,a),(!g||y&2)&&_!==(_=t[2].message+"")&&U(m,_)},r(){h=e.getBoundingClientRect()},f(){Q(e),d(),W(e,h)},a(){d(),d=X(e,h,pe,{})},i($){g||(Y(()=>{s||(s=j(e,A,{x:30},!0)),s.run(1)}),g=!0)},o($){s||(s=j(e,A,{x:30},!1)),s.run(0),g=!1},d($){$&&v(e),$&&s&&s.end()}}}function ge(o){let t,e=[],i=new Map,u,r=o[1];const c=a=>a[2].id;for(let a=0;a<r.length;a+=1){let l=B(o,r,a),n=c(l);i.set(n,e[a]=L(n,l))}return{c(){t=k("div");for(let a=0;a<e.length;a+=1)e[a].c();this.h()},l(a){t=w(a,"DIV",{class:!0});var l=I(t);for(let n=0;n<e.length;n+=1)e[n].l(l);l.forEach(v),this.h()},h(){p(t,"class","notifs p-fix m5 svelte-96aryn")},m(a,l){q(a,t,l);for(let n=0;n<e.length;n+=1)e[n].m(t,null);u=!0},p(a,[l]){if(l&3){r=a[1],Z();for(let n=0;n<e.length;n+=1)e[n].r();e=z(e,l,c,1,a,r,i,t,se,L,null,B);for(let n=0;n<e.length;n+=1)e[n].a();ee()}},i(a){if(!u){for(let l=0;l<r.length;l+=1)V(e[l]);u=!0}},o(a){for(let l=0;l<e.length;l+=1)C(e[l]);u=!1},d(a){a&&v(t);for(let l=0;l<e.length;l+=1)e[l].d()}}}function ve(o,t,e){let i;te(o,me,r=>e(1,i=r));let{themes:u={danger:"#E26D69",success:"#84C991",warning:"#f0ad4e",info:"#5bc0de",default:"#aaaaaa"}}=t;return o.$$set=r=>{"themes"in r&&e(0,u=r.themes)},[u,i]}class ye extends H{constructor(t){super(),N(this,t,ve,ge,R,{themes:0})}}const P=[{name:"Home",href:"/",icon:"amos"},{name:"Stream",href:"/stream",icon:"stream"},{name:"Debug",href:"/debug",icon:"debug"},{name:"Books",href:"/books",icon:"books"},{name:"Projects",href:"/projects",icon:"worker"},{name:"Plutonium",href:"/plutonium",icon:"pluto"},{name:"Stack",href:"/stack",icon:"stack"}];function T(o,t,e){const i=o.slice();return i[6]=t[e],i}function G(o){let t,e,i,u=o[6].name+"",r,c,a,l,n,_,m;return{c(){t=k("a"),e=k("div"),i=M("\xA0"),r=M(u),c=x(),a=k("img"),_=x(),this.h()},l(f){t=w(f,"A",{class:!0,href:!0});var s=I(t);e=w(s,"DIV",{class:!0});var h=I(e);i=D(h,"\xA0"),r=D(h,u),h.forEach(v),c=E(s),a=w(s,"IMG",{height:!0,width:!0,src:!0,alt:!0,class:!0}),_=E(s),s.forEach(v),this.h()},h(){p(e,"class","p-abs name fw2 svelte-184nq5d"),p(a,"height","150px"),p(a,"width","150px"),S(a.src,l="/OUI/icons/web/"+o[6].icon+".svg")||p(a,"src",l),p(a,"alt",n=o[6].name),p(a,"class","svelte-184nq5d"),p(t,"class","m10 p5 tile \u2020r p-rel blur svelte-184nq5d"),p(t,"href",m=o[6].href)},m(f,s){q(f,t,s),b(t,e),b(e,i),b(e,r),b(t,c),b(t,a),b(t,_)},p:F,d(f){f&&v(t)}}}function be(o){let t,e,i,u,r,c,a,l;const n=o[3].default,_=ae(n,o,o[2],null);i=new ye({});let m=P,f=[];for(let s=0;s<m.length;s+=1)f[s]=G(T(o,m,s));return{c(){t=k("div"),_&&_.c(),e=x(),le(i.$$.fragment),u=x(),r=k("div");for(let s=0;s<f.length;s+=1)f[s].c();this.h()},l(s){t=w(s,"DIV",{id:!0,class:!0});var h=I(t);_&&_.l(h),h.forEach(v),e=E(s),ne(i.$$.fragment,s),u=E(s),r=w(s,"DIV",{id:!0,class:!0});var d=I(r);for(let g=0;g<f.length;g+=1)f[g].l(d);d.forEach(v),this.h()},h(){p(t,"id","AMOS"),p(t,"class","svelte-184nq5d"),p(r,"id","AMOS-Nav"),p(r,"class","p-fix fade-right active \u0192-col svelte-184nq5d")},m(s,h){q(s,t,h),_&&_.m(t,null),q(s,e,h),ie(i,s,h),q(s,u,h),q(s,r,h);for(let d=0;d<f.length;d+=1)f[d].m(r,null);o[4](r),c=!0,a||(l=re(window,"keyup",o[1]),a=!0)},p(s,[h]){if(_&&_.p&&(!c||h&4)&&oe(_,n,s,s[2],c?fe(n,s[2],h,null):ce(s[2]),null),h&0){m=P;let d;for(d=0;d<m.length;d+=1){const g=T(s,m,d);f[d]?f[d].p(g,h):(f[d]=G(g),f[d].c(),f[d].m(r,null))}for(;d<f.length;d+=1)f[d].d(1);f.length=m.length}},i(s){c||(V(_,s),V(i.$$.fragment,s),c=!0)},o(s){C(_,s),C(i.$$.fragment,s),c=!1},d(s){s&&v(t),_&&_.d(s),s&&v(e),ue(i,s),s&&v(u),s&&v(r),_e(f,s),o[4](null),a=!1,l()}}}function $e(o,t,e){let{$$slots:i={},$$scope:u}=t,r;const c={q:!1},a=n=>{n.keyCode===81?c.q?(r.classList.toggle("active"),c.q=0):c.q=1:c.q=0};he(()=>{r.classList.toggle("active")});function l(n){de[n?"unshift":"push"](()=>{r=n,e(0,r)})}return o.$$set=n=>{"$$scope"in n&&e(2,u=n.$$scope)},[r,a,u,i,l]}class Ee extends H{constructor(t){super(),N(this,t,$e,be,R,{})}}export{Ee as default};