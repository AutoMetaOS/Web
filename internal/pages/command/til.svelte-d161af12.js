import{S as v,i as j,s as k,w as o,k as c,x as p,m as l,y as f,g as w,K as x,q as $,o as d,B as u,d as _}from"../../chunks/vendor-c4bd8a8d.js";import q from"./micro/twitter.svelte-3e03dc17.js";import g from"./micro/card.svelte-9acf2ad8.js";function C(y){let e,s,r,m,a,i;return e=new g({props:{type:"reddit",url:"https://www.reddit.com/r/todayilearned/new/.json?limit=1"}}),r=new q({}),a=new g({props:{type:"wikipedia",url:"https://en.wikipedia.org/api/rest_v1/page/random/summary"}}),{c(){o(e.$$.fragment),s=c(),o(r.$$.fragment),m=c(),o(a.$$.fragment)},l(t){p(e.$$.fragment,t),s=l(t),p(r.$$.fragment,t),m=l(t),p(a.$$.fragment,t)},m(t,n){f(e,t,n),w(t,s,n),f(r,t,n),w(t,m,n),f(a,t,n),i=!0},p:x,i(t){i||($(e.$$.fragment,t),$(r.$$.fragment,t),$(a.$$.fragment,t),i=!0)},o(t){d(e.$$.fragment,t),d(r.$$.fragment,t),d(a.$$.fragment,t),i=!1},d(t){u(e,t),t&&_(s),u(r,t),t&&_(m),u(a,t)}}}class B extends v{constructor(e){super();j(this,e,null,C,k,{})}}export{B as default};
