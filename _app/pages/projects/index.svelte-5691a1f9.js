import{S as ae,i as ne,s as re,w as S,x as k,y as B,E as se,q as w,o as C,B as N,e as u,t as Z,k as E,a5 as le,c as p,a as h,d as o,h as z,m as M,I as oe,b as D,f as K,J as i,g as O,p as ie,Y as ce,n as me}from"../../chunks/index-a063a824.js";import fe from"./nav.svelte-ca15c854.js";import de from"./proj.svelte-963c9f61.js";import ue from"./stats/upcoming.svelte-9f460367.js";import pe from"./stats/clock.svelte-d8691baa.js";var J=[{title:"Goodhart's Academia",description:"Proving Academia is Unsustainable",milestone:{text:"Read Rajan Paper"},eta:"2 April 2022"},{title:"MMod Project",description:"Malaria Infection Modelling w/ Covid-19 & Zombies",milestone:{text:"Abstract Sent"},eta:"15 April 2022"},{title:"Infinite LH: News",description:"Long Holocene News Catchup",milestone:{text:"Well this changes literally 6 hrs"},eta:"31 December 2022"},{title:"Infinite LH: Lang",description:"Long Holocene Languages Catchup",milestone:{text:"\u{1F1EF}\u{1F1F5} | \u{1F1E9}\u{1F1EA} | \u{1F1EA}\u{1F1F8} ||\u{1F1E7}\u{1F1E9} | MR"},eta:"31 December 2022"},{title:"Academic: DL Lab",description:"Deep Learning Lab",milestone:{date:"1 February 2022"},eta:"14 May 2022"},{title:"DL Project",description:"Variational Q Eigensolver vs Deep Q-Learning",milestone:{text:"Paper Printed"},eta:"17 March 2022"},{title:"Quantumania T33",description:"Quantum Tic Tac Toe 3D",milestone:{text:"Backend Algo Done"},eta:"6 June 2022"},{title:"Quantumania+ Games",description:"Tetris, Pacman, Prob: Minesweeper",milestone:{text:"Tetris Layout Done"},eta:"24 July 2022"},{title:"Celestia NBody",description:"NBody Simulation for GLens Box",milestone:{text:"Started"},eta:"25 May 2022"}];function X(f,r,c){const a=f.slice();return a[1]=r[c],a}function ee(f){let r,c;return r=new de({props:{data:f[1]}}),{c(){S(r.$$.fragment)},l(a){k(r.$$.fragment,a)},m(a,I){B(r,a,I),c=!0},p:se,i(a){c||(w(r.$$.fragment,a),c=!0)},o(a){C(r.$$.fragment,a),c=!1},d(a){N(r,a)}}}function he(f){let r,c,a,I,j,l,_,V,v,q,Q,m,L,g,R,b,$,H,x,A;_=new fe({props:{len:J.length}}),g=new pe({}),$=new ue({});let y=J.sort(f[0]),t=[];for(let e=0;e<y.length;e+=1)t[e]=ee(X(f,y,e));const te=e=>C(t[e],1,1,()=>{t[e]=null});return{c(){r=u("script"),a=u("script"),I=Z('Chart.defaults.color = "#fff";'),j=E(),l=u("main"),S(_.$$.fragment),V=E(),v=u("div"),q=Z("\xA0"),Q=E(),m=u("div"),L=u("div"),S(g.$$.fragment),R=E(),b=u("div"),S($.$$.fragment),H=E(),x=u("div");for(let e=0;e<t.length;e+=1)t[e].c();this.h()},l(e){const s=le('[data-svelte="svelte-1acwx1f"]',document.head);r=p(s,"SCRIPT",{src:!0});var n=h(r);n.forEach(o),a=p(s,"SCRIPT",{});var P=h(a);I=z(P,'Chart.defaults.color = "#fff";'),P.forEach(o),s.forEach(o),j=M(e),l=p(e,"MAIN",{class:!0});var d=h(l);k(_.$$.fragment,d),V=M(d),v=p(d,"DIV",{class:!0,style:!0});var U=h(v);q=z(U,"\xA0"),U.forEach(o),Q=M(d),m=p(d,"DIV",{class:!0,style:!0});var T=h(m);L=p(T,"DIV",{class:!0});var F=h(L);k(g.$$.fragment,F),F.forEach(o),R=M(T),b=p(T,"DIV",{class:!0});var W=h(b);k($.$$.fragment,W),W.forEach(o),T.forEach(o),H=M(d),x=p(d,"DIV",{class:!0});var Y=h(x);for(let G=0;G<t.length;G+=1)t[G].l(Y);Y.forEach(o),d.forEach(o),this.h()},h(){oe(r.src,c="https://cdn.jsdelivr.net/npm/chart.js")||D(r,"src",c),D(v,"class","w-100"),K(v,"height","75px"),D(L,"class","h-100 statCont svelte-p37tem"),D(b,"class","h-100 statCont svelte-p37tem"),D(m,"class","\u0192"),K(m,"overflow-x","scroll"),D(x,"class","\u0192 \u0192\u2211 w-100"),D(l,"class"," svelte-p37tem")},m(e,s){i(document.head,r),i(document.head,a),i(a,I),O(e,j,s),O(e,l,s),B(_,l,null),i(l,V),i(l,v),i(v,q),i(l,Q),i(l,m),i(m,L),B(g,L,null),i(m,R),i(m,b),B($,b,null),i(l,H),i(l,x);for(let n=0;n<t.length;n+=1)t[n].m(x,null);A=!0},p(e,[s]){if(s&0){y=J.sort(e[0]);let n;for(n=0;n<y.length;n+=1){const P=X(e,y,n);t[n]?(t[n].p(P,s),w(t[n],1)):(t[n]=ee(P),t[n].c(),w(t[n],1),t[n].m(x,null))}for(me(),n=y.length;n<t.length;n+=1)te(n);ie()}},i(e){if(!A){w(_.$$.fragment,e),w(g.$$.fragment,e),w($.$$.fragment,e);for(let s=0;s<y.length;s+=1)w(t[s]);A=!0}},o(e){C(_.$$.fragment,e),C(g.$$.fragment,e),C($.$$.fragment,e),t=t.filter(Boolean);for(let s=0;s<t.length;s+=1)C(t[s]);A=!1},d(e){o(r),o(a),e&&o(j),e&&o(l),N(_),N(g),N($),ce(t,e)}}}function _e(f){return[(c,a)=>new Date(c.eta)-new Date(a.eta)]}class De extends ae{constructor(r){super(),ne(this,r,_e,he,re,{})}}export{De as default};