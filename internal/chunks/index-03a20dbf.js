import{$ as b,D as y,a5 as h}from"./vendor-a193541a.js";const $={AES_KEY:"Punam@2601",YT_KEY:"AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8",RSS2JSON:"irrofo19vgtxw0zab9e6qdnswybwxf18cks2pn3j",db:{pub:"hmwaoksv",priv:"8894c311-8da2-46ed-b961-ab8102398a72",user:"AMOSdb",pass:"kyCpor-3punqi-pyfryr"}},l=$.YT_KEY,r=t=>fetch("https://youtube.googleapis.com/youtube/v3"+t,{method:"GET",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer"}).then(e=>e.json()),x=(t,e=3)=>r(`/playlistItems?part=snippet%2CcontentDetails&playlistId=${t}&key=${l}&maxResults=${e}`),k=t=>r(`/search?part=snippet&key=${l}&q=${t}&type=video&maxResults=10`),D=t=>r(`/search?channelId=${t}&part=snippet&order=date&maxResults=5&key=${l}`),S=t=>{const e=t.items.map(s=>({id:s.id,title:s.snippet.title,image:s.snippet.thumbnails.medium.url||s.snippet.thumbnails.default.url}));console.log(e)},E=async t=>{const e=`/channels?part=snippet%2CcontentDetails&id=${t.map(a=>a.id).join("%2C")}&key=${l}`,s=await r(e);s.error&&alert("QUOTA EXCEEDED");let n=await Promise.all(s.items.map(a=>a.contentDetails.relatedPlaylists.uploads).map(async a=>(await x(a+"&order=date",5)).items));return S(s),n.flat().filter(a=>(new Date-new Date(a.contentDetails.videoPublishedAt))/864e5<4)},{F:m}=b,u=y({local_id:"yt-"+1e11,youtube_id:null}),i=y({show_next:!1}),w=t=>{console.log(t);const{slug:e,title:s,id:n}=t,o=`https://www.youtube-nocookie.com/embed/${e}?autoplay=1&enablejsapi=1&local=${n}`;return window.history.pushState("","",`?id=${e}`),u.set({local_id:n,youtube_id:o}),window.scrollTo(0,0),document.title=s,0},g=t=>{var d,f;t||(t=(f=(d=m("iframe"))==null?void 0:d.src)==null?void 0:f.split("local=")[1].split("&")[0]);const e=t==null?void 0:t.split("-"),[s,n]=[e[0]||"yt",+e[1]||0];if(n===0)return null;const o=m(`#${s}-${n-1}`)||null,{title:a,slug:p}=(o==null?void 0:o.dataset)||{};return{id:`#${s}-${n-1}`,next:o,type:s==="yt"?"snippet":"stack",count:n-1,image:o==null?void 0:o.querySelector("img").src,title:a,slug:p}},_=t=>{g(t)&&w(g(t))};let c=0;const A=t=>{t.length>=8?(t.timeLeft<=90?i.set({show_next:!0}):i.set({show_next:!1}),t.timeLeft<=30&&(_(h(u).local_id),i.set({show_next:!1}))):(t.timeLeft<=30?i.set({show_next:!0}):i.set({show_next:!1}),t.timeLeft<=5&&(_(h(u).local_id),i.set({show_next:!1})))},L=t=>{if(t.data.charAt(0)!=="{")return;const{duration:e,currentTime:s}=JSON.parse(t.data).info||{};e&&(c=e);const n=~~(c-s),o={length:e/60,timeLeft:n||c,fracLeft:n?n/c:1};return A(o),0},T=(t,e)=>{const s=JSON.stringify(e);(t==null?void 0:t.contentWindow)&&t.contentWindow.postMessage(s,"*")},j=t=>{t=0|(Date.now()-new Date(t))/1e3;let e,s={second:60,minute:60,hour:24,day:7,week:4.35,month:12,year:1e4},n;for(e in s)if(n=t%s[e],!(t=0|t/s[e]))return n+" "+(n-1?e+"s":e)},C={search:k,channel:D,getRecents:E},R={videoSet:w,onMessage:L,postMessage:T,timeSince:j};export{i as a,g,u as n,R as p,w as v,C as y};
