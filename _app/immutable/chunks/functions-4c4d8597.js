var S=Object.defineProperty,x=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var g=(s,t,e)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,d=(s,t)=>{for(var e in t||(t={}))C.call(t,e)&&g(s,e,t[e]);if(p)for(var e of p(t))A.call(t,e)&&g(s,e,t[e]);return s},h=(s,t)=>x(s,B(t));import{S as D}from"./index-30071b0e.js";import{_ as E,S as H,i as z,s as F,e as q,$ as I,c as J,a as v,a0 as N,d as f,a1 as b,a2 as _,b as O,g as y,J as T,T as U,a3 as V,z as Z,l as m,E as w,C as $}from"./index-f6cfea4e.js";import{w as G}from"./index-ff9ff7c9.js";const K=s=>fetch(`https://openlibrary.org${s}`).then(t=>t.json()),P=async s=>{let t="q=";return s.author&&(t=`author=${s.author}`),s.default&&(t=`q=${s.default}`),(await K(`/search.json?${t}`)).docs},Q={added:{style:[["background","#0f0a"]]},suggest:{"data-func":"add",style:[["background","#0aff"]]},error:{style:[["background","#f00a"]]},todo:{"data-func":"add",style:[["background","#0cc"]]}},R={error:[{tag:"path",attributes:[["d","M2 30 L30 2 M30 30 L2 2"]]}],added:[{tag:"path",attributes:[["d","M2 20 L12 28 30 4"]]}],suggest:[{tag:"path",attributes:[["d","M16 2 L16 30 M2 16 L30 16"]]}],todo:[{tag:"path",attributes:[["d","M2 20 L12 28 30 4"]]}]};var j={objective:Q,icons:R};const W=s=>s?s.filter(t=>!/[^a-zA-Z]/i.test(t)).map(t=>t.toLowerCase().trim()).slice(0,4).join(", "):[],X=s=>{if(!s)return"Unknown";if(typeof s=="string")return s;if(typeof s=="object"){const t=[...new Set(s.map(e=>e.trim()))];return t.length>3?`${t.slice(0,3).join(", ")} et al.`:t.join(", ")}},Y=s=>{if(s.length===0)return null;if(typeof s=="string")return+s;if(typeof s=="object")return+s[0]},L={basic:s=>{let t="default",e="";return s.split(":").length>1?[t,e]=s.split(":"):e=s,[e,t].map(a=>a.trim().toLowerCase()),{type:t,text:e}},search:s=>{const{type:t,text:e}=L.basic(s);return t==="author"?{author:e}:{default:e}}},tt=s=>{let t="suggest";const e=s.cover_edition_key||s.bk_id||s.id;return E(at).includes(e)&&(t="added"),h(d({},s),{objective:t})},et=s=>{var a;const t=d({},j.objective[s]),e=(a=t.style)==null?void 0:a.map(o=>o.join(":")).join(";");return t.style=e,t},st=s=>{var e;const t=(e=j.icons[s])==null?void 0:e.map(a=>{var i;const o=a.tag,l=(i=a.attributes)==null?void 0:i.map(n=>`${n[0]}="${n[1]}"`).join(" ");return`<${o} ${l}/>`});return t==null?void 0:t.join(" ")},at=G([]),ut={search:P},u={author:X,tags:W,published:Y,results:tt,form:L,attributes:et,icons:st};function k(s){let t,e,a=u.icons(s[0])+"",o,l,i=[u.attributes(s[0]),{viewBox:"0 0 32 32"},{fill:"none"},{stroke:"#fff"}],n={};for(let r=0;r<i.length;r+=1)n=$(n,i[r]);return{c(){t=q("div"),e=I("svg"),this.h()},l(r){t=J(r,"DIV",{class:!0});var c=v(t);e=N(c,"svg",{viewBox:!0,fill:!0,stroke:!0});var M=v(e);M.forEach(f),c.forEach(f),this.h()},h(){b(e,n),_(e,"svelte-1wfwwk",!0),O(t,"class","funcs \u0192 hover \u2206-bw p10 p-abs svelte-1wfwwk")},m(r,c){y(r,t,c),T(t,e),e.innerHTML=a,o||(l=U(t,"click",V(s[1])),o=!0)},p(r,c){c&1&&a!==(a=u.icons(r[0])+"")&&(e.innerHTML=a),b(e,n=Z(i,[c&1&&u.attributes(r[0]),{viewBox:"0 0 32 32"},{fill:"none"},{stroke:"#fff"}])),_(e,"svelte-1wfwwk",!0)},d(r){r&&f(t),o=!1,l()}}}function rt(s){let t,e=s[0]&&k(s);return{c(){e&&e.c(),t=m()},l(a){e&&e.l(a),t=m()},m(a,o){e&&e.m(a,o),y(a,t,o)},p(a,[o]){a[0]?e?e.p(a,o):(e=k(a),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},i:w,o:w,d(a){e&&e.d(a),a&&f(t)}}}function ot(s,t,e){let{objective:a="sugg",data:o={title:"",image:"",tags:"",id:"",published:"",author:""}}=t;const l=n=>D.put("books",Date.now().toString(36),n).then(r=>{console.log(r),r.charAt(0)=='"'?e(0,a="added"):e(0,a="error")}),i=n=>{const{func:r}=n.target.dataset;r==="add"&&l(o)};return s.$$set=n=>{"objective"in n&&e(0,a=n.objective),"data"in n&&e(2,o=n.data)},[a,i,o]}class ft extends H{constructor(t){super(),z(this,t,ot,rt,F,{objective:0,data:2})}}export{ft as F,ut as a,at as b,u as p};