import{S as t,i as e,s,j as a,m as r,o as i,x as n,u as o,v as l,A as c,e as p,t as d,c as f,a as h,g as m,d as u,f as $,H as g,h as w}from"../../chunks/vendor-86e36fb5.js";import{C as x}from"../../chunks/ClickableTile-f11026d0.js";function j(t){let e,s,a,r=t[0].title+"";return{c(){e=p("p"),s=d(r),a=d(" →")},l(t){e=f(t,"P",{});var i=h(e);s=m(i,r),a=m(i," →"),i.forEach(u)},m(t,r){$(t,e,r),g(e,s),g(e,a)},p(t,e){1&e&&r!==(r=t[0].title+"")&&w(s,r)},d(t){t&&u(e)}}}function v(t){let e,s;return e=new x({props:{href:t[0].href,class:"p0 ƒ-col †j",style:"position: absolute;bottom: 1em;right: 11%;z-index: 10;width:350px;",$$slots:{default:[j]},$$scope:{ctx:t}}}),{c(){a(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,a){i(e,t,a),s=!0},p(t,[s]){const a={};1&s&&(a.href=t[0].href),3&s&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){s||(n(e.$$.fragment,t),s=!0)},o(t){o(e.$$.fragment,t),s=!1},d(t){l(e,t)}}}function b(t,e,s){let a={image:"https://stayhipp.com/wp-content/uploads/2019/10/reddit.png",title:"fetching...",href:"#"};return c((()=>fetch("https://www.reddit.com/r/todayilearned/new/.json?limit=1").then((t=>t.json())).then((t=>{const e=t.data.children[0].data;s(0,a={image:(null==e?void 0:e.preview.images[0].source.url.replaceAll("&amp;","&"))||(null==e?void 0:e.thumbnail)||a.image,title:e.title,href:e.url})})))),[a]}class y extends t{constructor(t){super(),e(this,t,b,v,s,{})}}export{y as default};
