import{$ as p,D as i}from"./vendor-88a0371f.js";const l={AES_KEY:"Punam@2601",YT_KEY:"AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8",db:{pub:"hmwaoksv",priv:"8894c311-8da2-46ed-b961-ab8102398a72",user:"AMOSdb",pass:"kyCpor-3punqi-pyfryr"}},{url_params:r}=p,o=t=>fetch("https://youtube.googleapis.com/youtube/v3"+t,{method:"GET",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer"}).then(e=>e.json()),n=l.YT_KEY,c=i(""),d=i([0,0]),h=t=>o(`/search?part=snippet&key=${n}&q=${t}&type=video&maxResults=10`),y=(t,e)=>{r.get().id||r.set("id",t);const a=`www.youtube-nocookie.com/embed/${t}?autoplay=1&enablejsapi=1`;return window.history.pushState("","",`?id=${t}`),d.set(e.split(",")),c.set("https://"+a),0},v=t=>{const e=t.target.parentElement.dataset;console.log(e),y(e.slug,e.count),window.scrollTo(0,0),document.title=e.title},u=(t,e=3)=>o(`/playlistItems?part=snippet&playlistId=${t}&key=${n}&maxResults=${e}`),k=async t=>{const e=`/channels?part=snippet%2CcontentDetails&id=${t.map(s=>s.id).join("%2C")}&key=${n}`,a=await o(e);return(await Promise.all(a.items.map(s=>s.contentDetails.relatedPlaylists.uploads).map(async s=>(await u(s+"&order=date",4)).items))).flat().filter(s=>(new Date-new Date(s.snippet.publishedAt))/864e5<7)};export{c as a,v as b,k as g,h as s,d as t,y as v};
