import{S as le,i as ne,s as se,D as ue,B as X,e as p,k as C,t as F,c as T,a as D,n as L,g as U,d as v,b as k,_ as P,$ as ie,f as Z,H as r,M as N,E as fe,F as ce,G as ge,h as q,p as _e,x as G,u as W,O as me,X as oe,a6 as he,Y as re,R as H,Z as be,aa as ve,j as J,m as K,o as Q,ab as ke,v as x,ac as Ee,A as pe}from"../../chunks/vendor-04de4d0b.js";import{E as Te,w as Ae}from"../../chunks/functions-c655ec02.js";import De from"./frame.svelte-076db83e.js";/* empty css                                                       */const Ie=a=>({}),de=a=>({});function ye(a){let l;return{c(){l=F(a[5])},l(t){l=U(t,a[5])},m(t,c){Z(t,l,c)},p(t,c){c&32&&q(l,t[5])},d(t){t&&v(l)}}}function Se(a){let l,t,c,o,A,u,g,_,m,i,h,y,d,S,O;const b=a[11].labelText,E=ue(b,a,a[10],de),f=E||ye(a);let B=[a[8]],z={};for(let n=0;n<B.length;n+=1)z=X(z,B[n]);return{c(){l=p("div"),t=p("input"),c=C(),o=p("label"),f&&f.c(),A=C(),u=p("span"),g=p("span"),_=F(a[3]),m=C(),i=p("span"),h=F(a[4]),this.h()},l(n){l=T(n,"DIV",{});var s=D(l);t=T(s,"INPUT",{type:!0,id:!0,name:!0}),c=L(s),o=T(s,"LABEL",{"aria-label":!0,for:!0});var I=D(o);f&&f.l(I),A=L(I),u=T(I,"SPAN",{});var R=D(u);g=T(R,"SPAN",{"aria-hidden":!0});var M=D(g);_=U(M,a[3]),M.forEach(v),m=L(R),i=T(R,"SPAN",{"aria-hidden":!0});var e=D(i);h=U(e,a[4]),e.forEach(v),R.forEach(v),I.forEach(v),s.forEach(v),this.h()},h(){k(t,"type","checkbox"),t.checked=a[0],t.disabled=a[2],k(t,"id",a[6]),k(t,"name",a[7]),P(t,"bx--toggle-input",!0),P(t,"bx--toggle-input--small",a[1]==="sm"),k(g,"aria-hidden","true"),P(g,"bx--toggle__text--off",!0),k(i,"aria-hidden","true"),P(i,"bx--toggle__text--on",!0),P(u,"bx--toggle__switch",!0),k(o,"aria-label",y=a[5]?void 0:a[9]["aria-label"]||"Toggle"),k(o,"for",a[6]),P(o,"bx--toggle-input__label",!0),ie(l,z),P(l,"bx--form-item",!0)},m(n,s){Z(n,l,s),r(l,t),r(l,c),r(l,o),f&&f.m(o,null),r(o,A),r(o,u),r(u,g),r(g,_),r(u,m),r(u,i),r(i,h),d=!0,S||(O=[N(t,"change",a[16]),N(t,"change",a[20]),N(t,"keyup",a[17]),N(t,"keyup",a[21]),N(t,"focus",a[18]),N(t,"blur",a[19]),N(l,"click",a[12]),N(l,"mouseover",a[13]),N(l,"mouseenter",a[14]),N(l,"mouseleave",a[15])],S=!0)},p(n,[s]){(!d||s&1)&&(t.checked=n[0]),(!d||s&4)&&(t.disabled=n[2]),(!d||s&64)&&k(t,"id",n[6]),(!d||s&128)&&k(t,"name",n[7]),s&2&&P(t,"bx--toggle-input--small",n[1]==="sm"),E?E.p&&(!d||s&1024)&&fe(E,b,n,n[10],d?ge(b,n[10],s,Ie):ce(n[10]),de):f&&f.p&&(!d||s&32)&&f.p(n,d?s:-1),(!d||s&8)&&q(_,n[3]),(!d||s&16)&&q(h,n[4]),(!d||s&544&&y!==(y=n[5]?void 0:n[9]["aria-label"]||"Toggle"))&&k(o,"aria-label",y),(!d||s&64)&&k(o,"for",n[6]),ie(l,z=_e(B,[s&256&&n[8]])),P(l,"bx--form-item",!0)},i(n){d||(G(f,n),d=!0)},o(n){W(f,n),d=!1},d(n){n&&v(l),f&&f.d(n),S=!1,me(O)}}}function Be(a,l,t){const c=["size","toggled","disabled","labelA","labelB","labelText","id","name"];let o=oe(l,c),{$$slots:A={},$$scope:u}=l,{size:g="default"}=l,{toggled:_=!1}=l,{disabled:m=!1}=l,{labelA:i="Off"}=l,{labelB:h="On"}=l,{labelText:y=""}=l,{id:d="ccs-"+Math.random().toString(36)}=l,{name:S=void 0}=l;const O=he();function b(e){H.call(this,a,e)}function E(e){H.call(this,a,e)}function f(e){H.call(this,a,e)}function B(e){H.call(this,a,e)}function z(e){H.call(this,a,e)}function n(e){H.call(this,a,e)}function s(e){H.call(this,a,e)}function I(e){H.call(this,a,e)}const R=()=>{t(0,_=!_)},M=e=>{(e.key===" "||e.key==="Enter")&&(e.preventDefault(),t(0,_=!_))};return a.$$set=e=>{t(9,l=X(X({},l),re(e))),t(8,o=oe(l,c)),"size"in e&&t(1,g=e.size),"toggled"in e&&t(0,_=e.toggled),"disabled"in e&&t(2,m=e.disabled),"labelA"in e&&t(3,i=e.labelA),"labelB"in e&&t(4,h=e.labelB),"labelText"in e&&t(5,y=e.labelText),"id"in e&&t(6,d=e.id),"name"in e&&t(7,S=e.name),"$$scope"in e&&t(10,u=e.$$scope)},a.$$.update=()=>{a.$$.dirty&1&&O("toggle",{toggled:_})},l=re(l),[_,g,m,i,h,y,d,S,o,l,u,A,b,E,f,B,z,n,s,I,R,M]}class ze extends le{constructor(l){super();ne(this,l,Be,Se,se,{size:1,toggled:0,disabled:2,labelA:3,labelB:4,labelText:5,id:6,name:7})}}function Ne(a){let l,t,c,o,A,u,g,_,m,i,h,y,d,S,O,b,E,f,B,z,n,s,I;function R(e){a[3](e)}let M={hideLabel:!0,size:"sm"};return a[0]!==void 0&&(M.toggled=a[0]),i=new ze({props:M}),be.push(()=>ve(i,"toggled",R)),E=new Te({}),E.$on("code",a[2]),s=new De({}),{c(){l=p("section"),t=p("nav"),c=p("div"),o=F("\xA0"),A=C(),u=p("div"),g=F(a[1]),_=C(),m=p("div"),J(i.$$.fragment),y=C(),d=p("style"),S=F(`.bx--toggle__switch {
          margin-top: 0 !important;
        }
        .bx--toggle__switch span {
          display: none !important;
        }`),O=C(),b=p("article"),J(E.$$.fragment),f=C(),B=p("hr"),z=C(),n=p("div"),J(s.$$.fragment),this.h()},l(e){l=T(e,"SECTION",{class:!0});var V=D(l);t=T(V,"NAV",{class:!0});var j=D(t);c=T(j,"DIV",{});var $=D(c);o=U($,"\xA0"),$.forEach(v),A=L(j),u=T(j,"DIV",{});var ee=D(u);g=U(ee,a[1]),ee.forEach(v),_=L(j),m=T(j,"DIV",{});var Y=D(m);K(i.$$.fragment,Y),y=L(Y),d=T(Y,"STYLE",{});var te=D(d);S=U(te,`.bx--toggle__switch {
          margin-top: 0 !important;
        }
        .bx--toggle__switch span {
          display: none !important;
        }`),te.forEach(v),Y.forEach(v),j.forEach(v),O=L(V),b=T(V,"ARTICLE",{class:!0});var w=D(b);K(E.$$.fragment,w),f=L(w),B=T(w,"HR",{class:!0}),z=L(w),n=T(w,"DIV",{class:!0});var ae=D(n);K(s.$$.fragment,ae),ae.forEach(v),w.forEach(v),V.forEach(v),this.h()},h(){k(t,"class","w-100 p10 \u0192 \u2206-bw fade-down svelte-13lak70"),k(B,"class","svelte-13lak70"),k(n,"class","w-50 h-100 fade-left"),k(b,"class","\u0192 w-100 svelte-13lak70"),k(l,"class","svelte-13lak70")},m(e,V){Z(e,l,V),r(l,t),r(t,c),r(c,o),r(t,A),r(t,u),r(u,g),r(t,_),r(t,m),Q(i,m,null),r(m,y),r(m,d),r(d,S),r(l,O),r(l,b),Q(E,b,null),r(b,f),r(b,B),r(b,z),r(b,n),Q(s,n,null),I=!0},p(e,[V]){(!I||V&2)&&q(g,e[1]);const j={};!h&&V&1&&(h=!0,j.toggled=e[0],ke(()=>h=!1)),i.$set(j)},i(e){I||(G(i.$$.fragment,e),G(E.$$.fragment,e),G(s.$$.fragment,e),I=!0)},o(e){W(i.$$.fragment,e),W(E.$$.fragment,e),W(s.$$.fragment,e),I=!1},d(e){e&&v(l),x(i),x(E),x(s)}}}function Ve(a,l,t){const c=new Ee;let o,A=!1,u=0,g="";const _=i=>{const h=A?c.render(i.detail):i.detail;if(g===h)return 0;g=h,o.document.open(),o.document.write(h),o.document.close(),t(1,u=Ae(h))};pe(()=>{var i;o=\u0192("iframe"),o=o.contentWindow||((i=o.contentDocument)==null?void 0:i.document)});function m(i){A=i,t(0,A)}return[A,u,_,m]}class Oe extends le{constructor(l){super();ne(this,l,Ve,Ne,se,{})}}export{Oe as default};