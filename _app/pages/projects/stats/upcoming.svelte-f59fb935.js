import{S as h,i as d,s as u,e as f,c as p,a as m,d as o,b,g as _,E as s,v as g,_ as C}from"../../../chunks/index-132e5a0e.js";function v(n){let e;return{c(){e=f("canvas"),this.h()},l(t){e=p(t,"CANVAS",{id:!0}),m(e).forEach(o),this.h()},h(){b(e,"id","myChart")},m(t,r){_(t,e,r),n[1](e)},p:s,i:s,o:s,d(t){t&&o(e),n[1](null)}}}function x(n,e,t){const c={type:"line",data:{labels:["Next 7","Next 30","Then 60","Then 90","Then 120","Then 150"],datasets:[{label:"Frequency Pressure",data:[1,2,3,4,12,7],borderColor:"#f00",backgroundColor:"#f00",fill:!1,stepped:!0}]},options:{responsive:!0,interaction:{intersect:!1,axis:"x"}}};let a;g(()=>{new Chart(a,c)});function l(i){C[i?"unshift":"push"](()=>{a=i,t(0,a)})}return[a,l]}class T extends h{constructor(e){super(),d(this,e,x,v,u,{})}}export{T as default};
