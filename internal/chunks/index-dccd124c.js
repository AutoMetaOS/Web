import{$ as b,D as d,a5 as h}from"./vendor-1a0fbb3d.js";const $={AES_KEY:"Punam@2601",YT_KEY:"AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8",db:{pub:"hmwaoksv",priv:"8894c311-8da2-46ed-b961-ab8102398a72",user:"AMOSdb",pass:"kyCpor-3punqi-pyfryr"}},l=$.YT_KEY,c=t=>fetch("https://youtube.googleapis.com/youtube/v3"+t,{method:"GET",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer"}).then(e=>e.json()),D=(t,e=3)=>c(`/playlistItems?part=snippet%2CcontentDetails&playlistId=${t}&key=${l}&maxResults=${e}`),k=t=>c(`/search?part=snippet&key=${l}&q=${t}&type=video&maxResults=10`),x=t=>c(`/search?channelId=${t}&part=snippet&order=date&maxResults=5&key=${l}`),E=async t=>{const e=`/channels?part=snippet%2CcontentDetails&id=${t.map(a=>a.id).join("%2C")}&key=${l}`,o=await c(e);return o.error&&alert("QUOTA EXCEEDED"),(await Promise.all(o.items.map(a=>a.contentDetails.relatedPlaylists.uploads).map(async a=>(await D(a+"&order=date",5)).items))).flat().filter(a=>(new Date-new Date(a.contentDetails.videoPublishedAt))/864e5<4)},{F:w}=b,u=d({local_id:"yt-"+1e11,youtube_id:null}),i=d({show_next:!1}),m=t=>{console.log(t);const{slug:e,title:o,id:s}=t,n=`https://www.youtube-nocookie.com/embed/${e}?autoplay=1&enablejsapi=1&local=${s}`;return window.history.pushState("","",`?id=${e}`),u.set({local_id:s,youtube_id:n}),window.scrollTo(0,0),document.title=o,0},g=t=>{var y,f;t||(t=(f=(y=w("iframe"))==null?void 0:y.src)==null?void 0:f.split("local=")[1].split("&")[0]);const e=t==null?void 0:t.split("-"),[o,s]=[e[0]||yt,+e[1]||0];if(s===0)return null;const n=w(`#${o}-${s-1}`)||null,{title:a,slug:p}=(n==null?void 0:n.dataset)||{};return{id:t,next:n,type:o==="yt"?"snippet":"stack",count:s-1,image:n==null?void 0:n.querySelector("img").src,title:a,slug:p}},_=t=>{g(t)&&m(g(t))};let r=0;const L=t=>{t.length>=8?(t.timeLeft<=90?i.set({show_next:!0}):i.set({show_next:!1}),t.timeLeft<=30&&(_(h(u).local_id),i.set({show_next:!1}))):(t.timeLeft<=30?i.set({show_next:!0}):i.set({show_next:!1}),t.timeLeft<=5&&(_(h(u).local_id),i.set({show_next:!1})))},A=t=>{if(t.data.charAt(0)!=="{")return;const{duration:e,currentTime:o}=JSON.parse(t.data).info||{};e&&(r=e);const s=~~(r-o),n={length:e/60,timeLeft:s||r,fracLeft:s?s/r:1};return L(n),0},S=(t,e)=>{const o=JSON.stringify(e);(t==null?void 0:t.contentWindow)&&t.contentWindow.postMessage(o,"*")},T=t=>{t=0|(Date.now()-new Date(t))/1e3;let e,o={second:60,minute:60,hour:24,day:7,week:4.35,month:12,year:1e4},s;for(e in o)if(s=t%o[e],!(t=0|t/o[e]))return s+" "+(s-1?e+"s":e)},v={search:k,channel:x,getRecents:E},C={videoSet:m,onMessage:A,postMessage:S,timeSince:T};export{i as a,g,u as n,C as p,v as y};