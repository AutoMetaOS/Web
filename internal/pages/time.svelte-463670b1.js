var $=Object.defineProperty;var tt=(i,t,e)=>t in i?$(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Q=(i,t,e)=>(tt(i,typeof t!="symbol"?t+"":t,e),e);import{S as et,i as st,s as it,e as L,t as rt,k as O,U as H,J as at,c as f,a as g,g as lt,d as l,n as S,b as s,L as nt,a7 as ot,H as n,f as V,M as W,N as B,I as X,P as ut,R as ht}from"../chunks/vendor-05f61b45.js";import{K as Z}from"../chunks/molecular-e392fe60.js";class ct{constructor(t=""){Q(this,"measureStop",t=>+new Date-this._.measures[t||""]);this.defaultOptions={tick:1,onstart:null,ontick:null,onpause:null,onstop:null,onend:null},this._={id:+new Date,options:{},duration:0,status:"initialized",start:0,measures:[]};for(let e in this.defaultOptions)this._.options[e]=this.defaultOptions[e];this.options(t)}start(t){return!+t&&!this._.duration?this:(t&&(t*=1e3),this._.timeout&&this._.status==="started"?this:(this._.duration=t||this._.duration,this._.timeout=setTimeout(this.end.bind(this),this._.duration),typeof this._.options.ontick=="function"&&(this._.interval=setInterval(function(){this.trigger.call(this,"ontick",this.getDuration())}.bind(this),+this._.options.tick*1e3)),this._.start=+new Date,this._.status="started",this.trigger.call(this,"onstart",this.getDuration()),this))}pause(){return this._.status!=="started"?this:(this._.duration-=+new Date-this._.start,this.clear.call(this,!1),this._.status="paused",this.trigger.call(this,"onpause"),this)}stop(){return/started|paused/.test(this._.status)?(this.clear.call(this,!0),this._.status="stopped",this.trigger.call(this,"onstop"),this):this}getDuration(){return this._.status==="started"?this._.duration-(+new Date-this._.start):this._.status==="paused"?this._.duration:0}getStatus(){return this._.status}options(t,e){if(t&&e&&(this._.options[t]=e),!e&&typeof t=="object")for(let r in t)this._.options.hasOwnProperty(r)&&(this._.options[r]=t[r]);return this}on(t,e){return typeof t!="string"||typeof e!="function"?this:(/^on/.test(t)||(t="on"+t),this._.options.hasOwnProperty(t)&&(this._.options[t]=e),this)}off(t){return typeof t!="string"?this:(t=t.toLowerCase(),t==="all"?(this._.options=this.defaultOptions,this):(/^on/.test(t)||(t="on"+t),this._.options.hasOwnProperty(t)&&(this._.options[t]=this.defaultOptions[t]),this))}measureStart(t){return this._.measures[t||""]=+new Date,this}end(){this.clear.call(this),this._.status="stopped",this.trigger.call(this,"onend")}trigger(t){let e=this._.options[t],r=[].slice.call(arguments,1);typeof e=="function"&&e.apply(this,r)}clear(t){clearTimeout(this._.timeout),clearInterval(this._.interval),t===!0&&(this._.duration=0)}}const{document:x}=ht;function ft(i){let t;return{c(){t=H("polygon"),this.h()},l(e){t=f(e,"polygon",{points:!0,fill:!0},1),g(t).forEach(l),this.h()},h(){s(t,"points","0,0 32,16 0,32"),s(t,"fill","var(--primary)")},m(e,r){V(e,t,r)},d(e){e&&l(t)}}}function dt(i){let t;return{c(){t=H("path"),this.h()},l(e){t=f(e,"path",{d:!0,fill:!0},1),g(t).forEach(l),this.h()},h(){s(t,"d","M23 2 L23 28 M9 2 L9 28"),s(t,"fill","none")},m(e,r){V(e,t,r)},d(e){e&&l(t)}}}function pt(i){let t,e,r,u,h,c,_,y,m,w,M,d,E,C,p,P,o,v,K,b,D,z,A;function J(a,k){return a[2]?dt:ft}let N=J(i),T=N(i);return{c(){t=L("style"),e=rt(`body {
            background: #f52;
        }`),r=O(),u=L("section"),h=L("div"),c=L("input"),_=O(),y=L("label"),m=H("svg"),w=H("path"),M=O(),d=L("input"),C=O(),p=L("div"),P=O(),o=L("div"),v=H("svg"),T.c(),K=O(),b=H("svg"),D=H("rect"),this.h()},l(a){const k=at('[data-svelte="svelte-17qyo1u"]',x.head);t=f(k,"STYLE",{});var R=g(t);e=lt(R,`body {
            background: #f52;
        }`),R.forEach(l),k.forEach(l),r=S(a),u=f(a,"SECTION",{class:!0});var I=g(u);h=f(I,"DIV",{class:!0,id:!0});var j=g(h);c=f(j,"INPUT",{type:!0,name:!0,id:!0,style:!0}),_=S(j),y=f(j,"LABEL",{for:!0,class:!0});var q=g(y);m=f(q,"svg",{id:!0,viewBox:!0,class:!0},1);var Y=g(m);w=f(Y,"path",{fill:!0,d:!0},1),g(w).forEach(l),Y.forEach(l),M=S(q),d=f(q,"INPUT",{id:!0,class:!0,type:!0}),q.forEach(l),j.forEach(l),C=S(I),p=f(I,"DIV",{class:!0,contenteditable:!0,id:!0}),g(p).forEach(l),P=S(I),o=f(I,"DIV",{class:!0,id:!0});var U=g(o);v=f(U,"svg",{id:!0,viewBox:!0,class:!0},1);var F=g(v);T.l(F),F.forEach(l),K=S(U),b=f(U,"svg",{id:!0,viewBox:!0,fill:!0,class:!0},1);var G=g(b);D=f(G,"rect",{x:!0,y:!0,width:!0,height:!0},1),g(D).forEach(l),G.forEach(l),U.forEach(l),I.forEach(l),this.h()},h(){s(c,"type","checkbox"),s(c,"name","v2"),s(c,"id","v2"),nt(c,"display","none"),s(w,"fill","none"),s(w,"d","M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"),s(m,"id","loop"),s(m,"viewBox","0 0 32 32"),s(m,"class","svelte-fc7yva"),s(d,"id","looptime"),s(d,"class","p-rel svelte-fc7yva"),s(d,"type","text"),d.disabled=E=!i[0],s(y,"for","v2"),s(y,"class","svelte-fc7yva"),s(h,"class","w-100 p-fix svelte-fc7yva"),s(h,"id","top"),s(p,"class","\u2020c svelte-fc7yva"),s(p,"contenteditable",""),s(p,"id","timer"),i[3]===void 0&&ot(()=>i[7].call(p)),s(v,"id","playpause"),s(v,"viewBox","0 0 32 32"),s(v,"class","svelte-fc7yva"),s(D,"x","0"),s(D,"y","0"),s(D,"width","32"),s(D,"height","32"),s(b,"id","fullstop"),s(b,"viewBox","0 0 32 32"),s(b,"fill","var(--primary)"),s(b,"class","svelte-fc7yva"),s(o,"class","\u2020c o-75"),s(o,"id","controls"),s(u,"class","h-1vh \u0192-col \u0192\u2211 svelte-fc7yva")},m(a,k){n(x.head,t),n(t,e),V(a,r,k),V(a,u,k),n(u,h),n(h,c),c.checked=i[0],n(h,_),n(h,y),n(y,m),n(m,w),n(y,M),n(y,d),W(d,i[1]),n(u,C),n(u,p),i[3]!==void 0&&(p.innerHTML=i[3]),n(u,P),n(u,o),n(o,v),T.m(v,null),n(o,K),n(o,b),n(b,D),z||(A=[B(c,"change",i[5]),B(m,"click",i[4]),B(d,"input",i[6]),B(p,"input",i[7]),B(v,"click",i[4]),B(b,"click",i[4])],z=!0)},p(a,[k]){k&1&&(c.checked=a[0]),k&1&&E!==(E=!a[0])&&(d.disabled=E),k&2&&d.value!==a[1]&&W(d,a[1]),k&8&&a[3]!==p.innerHTML&&(p.innerHTML=a[3]),N!==(N=J(a))&&(T.d(1),T=N(a),T&&(T.c(),T.m(v,null)))},i:X,o:X,d(a){l(t),a&&l(r),a&&l(u),T.d(),z=!1,ut(A)}}}function _t(i,t,e){let r=!1,u="00:00:10",h=!0,c=!1,_="00:00:10";const y=()=>{r?M(u):w()},m=o=>{e(3,_=new Z().secondsToClock(Math.round(o/1e3))),document.title=_},w=()=>{E.stop(),e(3,_="00:00:00"),e(2,h=!1),c=!0},M=o=>{e(2,h=!0),c=!1,c?E.start():(e(3,_=o),E.start(new Z().clockToSeconds(o)))},d=o=>{const v=o.target.id||o.target.parentElement.id;v==="playpause"&&(h?(E.pause(),c=!0,e(2,h=!1)):M(_)),v==="fullstop"&&w()};let E=new ct({tick:1,ontick:m,onend:y});M(_);function C(){r=this.checked,e(0,r)}function p(){u=this.value,e(1,u)}function P(){_=this.innerHTML,e(3,_)}return[r,u,h,_,d,C,p,P]}class mt extends et{constructor(t){super();st(this,t,_t,pt,it,{})}}export{mt as default};
