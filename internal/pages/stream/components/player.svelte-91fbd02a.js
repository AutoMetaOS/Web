import{S as v,i as b,s as w,e as m,j,c as p,a as _,m as k,d as n,b as l,f as u,o as g,x as c,u as f,v as y,l as d,w as A,P as I,K as h,r as x}from"../../../chunks/vendor-04de4d0b.js";import{a as E}from"../../../chunks/store-c6993e83.js";import{A as R}from"../../../chunks/AspectRatio-161036b6.js";import"../../../chunks/molecular-e392fe60.js";function $(o){let t,r,e;return r=new R({props:{class:"\u2020c w-100 h-100",ratio:"16x10",$$slots:{default:[q]},$$scope:{ctx:o}}}),{c(){t=m("div"),j(r.$$.fragment),this.h()},l(s){t=p(s,"DIV",{class:!0});var a=_(t);k(r.$$.fragment,a),a.forEach(n),this.h()},h(){l(t,"class","\u0192 cont \u2206-ct svelte-vddjx")},m(s,a){u(s,t,a),g(r,t,null),e=!0},p(s,a){const i={};a&9&&(i.$$scope={dirty:a,ctx:s}),r.$set(i)},i(s){e||(c(r.$$.fragment,s),e=!0)},o(s){f(r.$$.fragment,s),e=!1},d(s){s&&n(t),y(r)}}}function q(o){let t,r;return{c(){t=m("iframe"),this.h()},l(e){t=p(e,"IFRAME",{title:!0,class:!0,framebor:!0,der:!0,src:!0,allow:!0,sandbox:!0}),_(t).forEach(n),this.h()},h(){l(t,"title","vid"),l(t,"class","w-100 h-100"),l(t,"framebor",""),l(t,"der","0"),h(t.src,r=o[0])||l(t,"src",r),l(t,"allow",o[1]),l(t,"sandbox",o[2])},m(e,s){u(e,t,s)},p(e,s){s&1&&!h(t.src,r=e[0])&&l(t,"src",r)},d(e){e&&n(t)}}}function P(o){let t,r,e=o[0]&&$(o);return{c(){e&&e.c(),t=d()},l(s){e&&e.l(s),t=d()},m(s,a){e&&e.m(s,a),u(s,t,a),r=!0},p(s,[a]){s[0]?e?(e.p(s,a),a&1&&c(e,1)):(e=$(s),e.c(),c(e,1),e.m(t.parentNode,t)):e&&(x(),f(e,1,1,()=>{e=null}),A())},i(s){r||(c(e),r=!0)},o(s){f(e),r=!1},d(s){e&&e.d(s),s&&n(t)}}}function S(o,t,r){let e;I(o,E,i=>r(0,e=i));const s=["fullscreen","clipboard-write","encrypted-media","picture-in-picture"].join(";"),a=["allow-scripts","allow-same-origin"].join(" ");return[e,s,a]}class M extends v{constructor(t){super();b(this,t,S,P,w,{})}}export{M as default};