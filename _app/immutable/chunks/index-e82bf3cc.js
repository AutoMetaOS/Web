import{p as x}from"./index-5303bb93.js";import{d as I,w as S}from"./index-ff9ff7c9.js";import{c as k}from"./_commonjsHelpers-c771f69b.js";const f=e=>{console.log(e);const{type:c,e:i}=e,{message:l,lineNumber:m,columnNumber:o,fileName:s,stack:a}=i;let r=`${s}`;m&&(r=`${m}:${o} in ${s}`),console.log(`Error@${r} 
 ${l} 
${a}`),R.send({title:c,text:l},2e3,{from:window.location.pathname,scale:"danger"})},w=e=>(e instanceof EvalError?f({type:"EvalError",e}):e instanceof RangeError?f({type:"RangeError",e}):e instanceof ReferenceError?f({type:"ReferenceError",e}):e instanceof SyntaxError?f({type:"SyntaxError",e}):e instanceof TypeError?f({type:"TypeError",e}):e instanceof URIError?f({type:"URIError",e}):f({type:"UnknownType",e}),0),d={message:{title:"Internal",text:"Uncaught error"},type:{scale:"info",from:"amos"},time:3e3};function T(e){const c=S([]),i=(o=d.message,s=d.time,a=d.type)=>c.update(r=>[...r,{id:`_${Math.random().toString(36).slice(2,9)}`,type:a.scale,from:a.from,message:o.text,title:o.title,timeout:s%3e3}]),l=I(c,(o,s)=>{if(s(o),o.length>0){const a=setTimeout(()=>{c.update(r=>(r.shift(),r))},o[0].timeout);return()=>clearTimeout(a)}}),{subscribe:m}=l;return{subscribe:m,send:i}}const $=T();var h={exports:{}};(function(e,c){(function(i,l){e.exports=l()})(k,function(){var i={};if(i.isLSAvailable=function(){var t="_";try{return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch{return!1}}(),i.isLSAvailable){var l=100,m=200,o=localStorage,s={},a=!1,r={},E=function(){for(var t in s){var n=o.getItem(t);if(n&&r[t]&&r[t].indexOf(n)===-1){r[t].push(n);try{var u=JSON.parse(n);u&&(n=u)}catch{}for(var p=0;p<s[t].length;p++)s[t][p](n);o.getItem(t+"-removeit")||(o.setItem(t+"-removeit","1"),function(g){setTimeout(function(){o.removeItem(g),o.removeItem(g+"-removeit"),r[t]=[]},m)}(t))}else n||(r[t]=[])}return setTimeout(E,l),!0};i.send=function(t,n){var u="";typeof n=="function"&&(n=n()),u=typeof n=="object"?JSON.stringify(n):n,o.setItem(t,u)},i.subscribe=function(t,n){s[t]||(s[t]=[],r[t]=[]),s[t].push(n),a||(a=E())},i.unsubscribe=function(t){s[t]&&(s[t]=[]),r[t]&&(r[t]=[])},i.getBuffer=function(){return r}}else i.send=i.subscribe=function(){throw new Error("localStorage not supported.")};return i})})(h);var b=h.exports;const v={channel:"internal",callback:function(e){console.log(e)}},N={announce:(e=v.channel,c)=>(console.log(e,c),b.send(e,c),0),listen:(e=c.channel,c=v.callback)=>(b.subscribe(e,c),0),mute:(e=v.channel)=>b.unsubscribe(e)},A=w,y={token:null,getId:()=>(y.token||(y.token=x.exports.math.uuid().split("-")[0]),y.token)},R=$,G=N;export{A as e,G as i,R as n,y as s};
