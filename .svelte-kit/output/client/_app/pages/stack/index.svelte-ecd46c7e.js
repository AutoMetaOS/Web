import{S as t,i as e,s as a,j as s,m as i,o as n,I as r,x as o,u as c,v as f,e as l,k as m,t as d,c as h,a as p,n as u,d as g,g as b,b as y,f as v,H as w,w as j,a1 as k,r as E}from"../../chunks/vendor-86e36fb5.js";import $ from"./tile.svelte-b169df12.js";import x from"./adder.svelte-fe1f12eb.js";import"../../chunks/ClickableTile-f11026d0.js";import"../../chunks/TextInput-d2a5af56.js";import"../../chunks/Tile-ee89b887.js";import"../../chunks/molecular-c58642ff.js";var I=[{id:"71df707b-6eec-4b21-a0a0-0a3183f0faba",url:"https://scientificamerican.com/article/ai-designs-quantum-physics-experiments-beyond-what-any-human-has-conceived/",title:"AI does Quantum",type:"Article",from:"Subscription",image:"https://static.scientificamerican.com/sciam/cache/file/0820F6BA-1235-45C5-AD7EB379E058A13C.jpg",date:16251642e5,rank:"2"},{id:"c0c40fe5-f9fe-491c-83d1-4c605fef672e",url:"https://quantamagazine.org/mathematicians-identify-threshold-at-which-shapes-give-way-20210603/",title:"Threshold when Shapes Give Way",type:"Article",from:"Subscription",image:"https://d2r55xnwy6nx47.cloudfront.net/uploads/2021/06/Sphere-Twists_1200_social.gif",date:16226586e5,rank:"1"},{id:"6032c4e6-722d-40f1-9bcd-53e42cff118b",url:"https://youtube.com/watch?v=XW0QZmtbjvs",title:"Lex Fridman Vitalik Buterin",type:"Video",from:"Auto",image:"https://i.ytimg.com/vi/XW0QZmtbjvs/maxresdefault.jpg",date:1622745e6,rank:"0"},{id:"81038e38-9c95-4a39-b018-f2b020217192",url:"https://github.com/IndiQ-Meetups/Events/tree/main/collaborations/IISc-IEEE-ComSoc/qComm-workshop-2021",title:"IEEE Quantum Tuts",type:"Repository",from:"Email",image:"https://opengraph.githubassets.com/0c22db1194bd8b1a313e990f32792c4d8341e8c3d219fc6416b18fe217b00d20/IndiQ-Meetups/Events",date:16307802e5,rank:"4"},{id:"694945db-c749-4fad-84bf-211f62ef36d5",url:"https://github.com/tensorflow/tfjs-models/tree/master/toxicity",title:"Tensorflow Toxicity JS Model",type:"Repository",from:"Auto",image:"https://opengraph.githubassets.com/a874a01b4fd4f611a78761f5658cfd89c4930ce00fa2d14ab083ec89f0d338ef/tensorflow/tfjs-models",date:16273242e5,rank:"5"},{id:"3a0fbcae-a376-4752-af6d-7c6bc733dd1f",url:"https://github.com/tensorflow/tfjs-models/tree/master/toxicity",title:"Brython: Python Web",type:"Website",from:"Auto",image:"https://i.ytimg.com/vi/VJj-H4we71g/maxresdefault.jpg",date:16269786e5,rank:"6"}];function S(t,e,a){const s=t.slice();return s[1]=e[a],s}function T(t){let e,a;return e=new $({props:{data:t[1]}}),{c(){s(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){n(e,t,s),a=!0},p:r,i(t){a||(o(e.$$.fragment,t),a=!0)},o(t){c(e.$$.fragment,t),a=!1},d(t){f(e,t)}}}function A(t){let e,a,r,$,A,C,Q,B;r=new x({});let W=I.sort(t[0]),V=[];for(let s=0;s<W.length;s+=1)V[s]=T(S(t,W,s));const q=t=>c(V[t],1,1,(()=>{V[t]=null}));return{c(){e=l("section"),a=l("div"),s(r.$$.fragment),$=m();for(let t=0;t<V.length;t+=1)V[t].c();A=m(),C=l("style"),Q=d(".tile {\n            padding: 0;\n            width: 25%;\n            height: 300px;\n        }"),this.h()},l(t){e=h(t,"SECTION",{class:!0});var s=p(e);a=h(s,"DIV",{class:!0});var n=p(a);i(r.$$.fragment,n),$=u(n);for(let e=0;e<V.length;e+=1)V[e].l(n);n.forEach(g),A=u(s),C=h(s,"STYLE",{});var o=p(C);Q=b(o,".tile {\n            padding: 0;\n            width: 25%;\n            height: 300px;\n        }"),o.forEach(g),s.forEach(g),this.h()},h(){y(a,"class","ƒ ƒ∑"),y(e,"class","p5")},m(t,s){v(t,e,s),w(e,a),n(r,a,null),w(a,$);for(let e=0;e<V.length;e+=1)V[e].m(a,null);w(e,A),w(e,C),w(C,Q),B=!0},p(t,[e]){if(1&e){let s;for(W=I.sort(t[0]),s=0;s<W.length;s+=1){const i=S(t,W,s);V[s]?(V[s].p(i,e),o(V[s],1)):(V[s]=T(i),V[s].c(),o(V[s],1),V[s].m(a,null))}for(E(),s=W.length;s<V.length;s+=1)q(s);j()}},i(t){if(!B){o(r.$$.fragment,t);for(let t=0;t<W.length;t+=1)o(V[t]);B=!0}},o(t){c(r.$$.fragment,t),V=V.filter(Boolean);for(let e=0;e<V.length;e+=1)c(V[e]);B=!1},d(t){t&&g(e),f(r),k(V,t)}}}function C(t){return[(t,e)=>t.rank>e.rank?1:-1]}class Q extends t{constructor(t){super(),e(this,t,C,A,a,{})}}export{Q as default};
