import"./index-acbfbb82.js";import{d,w as g}from"./index-a67a2886.js";import{c as S}from"./_commonjsHelpers-c771f69b.js";const b={type:{scale:"info",from:"amos"},time:3e3};function h(p){const m=g([]),o=(n,i=b.time,s=b.type)=>m.update(r=>[...r,{id:`_${Math.random().toString(36).slice(2,9)}`,type:s.scale,from:s.from,message:n,timeout:i%3e3}]),c=d(m,(n,i)=>{if(i(n),n.length>0){const s=setTimeout(()=>{m.update(r=>(r.shift(),r))},n[0].timeout);return()=>clearTimeout(s)}}),{subscribe:f}=c;return{subscribe:f,send:o}}const I=h();var y={exports:{}};(function(p,m){(function(o,c){p.exports=c()})(S,function(){var o={};if(o.isLSAvailable=function(){var t="_";try{return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch{return!1}}(),o.isLSAvailable){var c=100,f=200,n=localStorage,i={},s=!1,r={},v=function(){for(var t in i){var e=n.getItem(t);if(e&&r[t]&&r[t].indexOf(e)===-1){r[t].push(e);try{var a=JSON.parse(e);a&&(e=a)}catch{}for(var u=0;u<i[t].length;u++)i[t][u](e);n.getItem(t+"-removeit")||(n.setItem(t+"-removeit","1"),function(l){setTimeout(function(){n.removeItem(l),n.removeItem(l+"-removeit"),r[t]=[]},f)}(t))}else e||(r[t]=[])}return setTimeout(v,c),!0};o.send=function(t,e){var a="";typeof e=="function"&&(e=e()),a=typeof e=="object"?JSON.stringify(e):e,n.setItem(t,a)},o.subscribe=function(t,e){i[t]||(i[t]=[],r[t]=[]),i[t].push(e),s||(s=v())},o.unsubscribe=function(t){i[t]&&(i[t]=[]),r[t]&&(r[t]=[])},o.getBuffer=function(){return r}}else o.send=o.subscribe=function(){throw new Error("localStorage not supported.")};return o})})(y);const N=I;export{N as n};