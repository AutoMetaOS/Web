import{S as v,i as j,s as k,w as o,k as l,x as p,m as c,y as f,g as w,K as x,q as $,o as u,B as d,d as _}from"../../chunks/vendor-4b89dd0c.js";import q from"./micro/twitter.svelte-1f737e15.js";import g from"./micro/card.svelte-25d53830.js";function C(y){let e,s,r,m,n,i;return e=new g({props:{type:"reddit",url:"https://www.reddit.com/r/todayilearned/new/.json?limit=1"}}),r=new q({}),n=new g({props:{type:"wikipedia",url:"https://en.wikipedia.org/api/rest_v1/page/random/summary"}}),{c(){o(e.$$.fragment),s=l(),o(r.$$.fragment),m=l(),o(n.$$.fragment)},l(t){p(e.$$.fragment,t),s=c(t),p(r.$$.fragment,t),m=c(t),p(n.$$.fragment,t)},m(t,a){f(e,t,a),w(t,s,a),f(r,t,a),w(t,m,a),f(n,t,a),i=!0},p:x,i(t){i||($(e.$$.fragment,t),$(r.$$.fragment,t),$(n.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),u(r.$$.fragment,t),u(n.$$.fragment,t),i=!1},d(t){d(e,t),t&&_(s),d(r,t),t&&_(m),d(n,t)}}}class B extends v{constructor(e){super();j(this,e,null,C,k,{})}}export{B as default};
