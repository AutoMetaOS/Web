import{S as q,i as V,s as B,e as m,k as C,c as d,a as h,d as _,m as D,b as c,G as g,g as b,H as w,q as f,w as S,x as A,y as F,o as p,B as G,p as M,l as y,Y as k,v as H,n as $,O as L}from"../../../chunks/index-ef3d5a38.js";import{p as E,n as N,a as O}from"../../../chunks/index-408cb143.js";import P from"../components/videoCard.svelte-e20a33d3.js";import"../../../chunks/index-99e896be.js";import"../../../chunks/index-5ae5593d.js";function x(l){var n;let r,t,e,s,a,i=((n=l[2])==null?void 0:n.show_next)&&I();return{c(){r=m("div"),t=m("iframe"),s=C(),i&&i.c(),this.h()},l(o){r=d(o,"DIV",{class:!0});var u=h(r);t=d(u,"IFRAME",{title:!0,class:!0,frameborder:!0,src:!0,allow:!0,sandbox:!0}),h(t).forEach(_),s=D(u),i&&i.l(u),u.forEach(_),this.h()},h(){c(t,"title","vid"),c(t,"class","w-100 h-100 p-abs svelte-18t4v55"),c(t,"frameborder","0"),g(t.src,e=l[1].youtube_id)||c(t,"src",e),c(t,"allow","fullscreen; clipboard-write; encrypted-media; picture-in-picture"),c(t,"sandbox","allow-scripts allow-same-origin"),c(r,"class","\u0192 cont p-rel \u2206-ct svelte-18t4v55")},m(o,u){b(o,r,u),w(r,t),l[3](t),w(r,s),i&&i.m(r,null),a=!0},p(o,u){var v;(!a||u&2&&!g(t.src,e=o[1].youtube_id))&&c(t,"src",e),(v=o[2])!=null&&v.show_next?i?u&4&&f(i,1):(i=I(),i.c(),f(i,1),i.m(r,null)):i&&($(),p(i,1,1,()=>{i=null}),M())},i(o){a||(f(i),a=!0)},o(o){p(i),a=!1},d(o){o&&_(r),l[3](null),i&&i.d()}}}function I(l){let r,t,e;return t=new P({props:{get_next:1}}),{c(){r=m("div"),S(t.$$.fragment),this.h()},l(s){r=d(s,"DIV",{id:!0,class:!0});var a=h(r);A(t.$$.fragment,a),a.forEach(_),this.h()},h(){c(r,"id","magicBox"),c(r,"class","fade-left p-abs p0 rx10 svelte-18t4v55")},m(s,a){b(s,r,a),F(t,r,null),e=!0},i(s){e||(f(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){s&&_(r),G(t)}}}function R(l){let r,t,e=l[1].youtube_id&&x(l);return{c(){e&&e.c(),r=y()},l(s){e&&e.l(s),r=y()},m(s,a){e&&e.m(s,a),b(s,r,a),t=!0},p(s,[a]){s[1].youtube_id?e?(e.p(s,a),a&2&&f(e,1)):(e=x(s),e.c(),f(e,1),e.m(r.parentNode,r)):e&&($(),p(e,1,1,()=>{e=null}),M())},i(s){t||(f(e),t=!0)},o(s){p(e),t=!1},d(s){e&&e.d(s),s&&_(r)}}}function Y(l,r,t){let e,s;k(l,N,n=>t(1,e=n)),k(l,O,n=>t(2,s=n));let a;H(()=>{window.addEventListener("message",E.onMessage,!1);const n={event:"listening"};setInterval(()=>E.postMessage(a,n),1e3)});function i(n){L[n?"unshift":"push"](()=>{a=n,t(0,a)})}return[a,e,s,i]}class T extends q{constructor(r){super(),V(this,r,Y,R,B,{})}}export{T as default};
