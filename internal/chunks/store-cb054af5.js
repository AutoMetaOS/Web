import{a9 as p,C as o}from"./vendor-ac8bda04.js";import{R as l,c as U}from"./molecular-e392fe60.js";const w={AES_KEY:"Punam@2601",YT_KEY:"AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8",db:{pub:"hmwaoksv",priv:"8894c311-8da2-46ed-b961-ab8102398a72",user:"AMOSdb",pass:"kyCpor-3punqi-pyfryr"}};var C=[{name:"3Blue1Brown",id:"UCYO_jab_esuFRV4b17AJtAw"},{name:"Atomic Frontier",id:"UCbCq5Y0WPGimG2jNXhoQxGw"},{name:"PBS Space Time",id:"UC7_gcs09iThXybpVgjHZ_7g"},{name:"Minute Earth",id:"UCeiYXex_fwgYDonaTcSIk6w"},{name:"Paolo fromTOKYO",id:"UCixD9UbKvDxzGNiPC_fgHyA"},{name:"Lesics",id:"UCqZQJ4600a9wIfMPbYc60OQ"},{name:"Tomorrow's Build",id:"UCN3aYbtQ7yCqk9DM56B0kEw"},{name:"TED-Ed",id:"UCsooa4yRKGN_zEE8iknghZA"},{name:"Kurzgesagt \u2013 In a Nutshell",id:"UCsXVk37bltHxD1rDPwtNM8Q"},{name:"Casual Navigation",id:"UC5_HIscbiDZM0dMX-nCksuA"},{name:"Stand Up Maths",id:"UCSju5G2aFaWMqn-_0YBtq5A"},{name:"Top Gear",id:"UCjOl2AUblVmg2rA_cRgZkFg"},{name:"History Scope",id:"UCYb6v1AlX6prKl83DswM5iw"},{name:"B1M",id:"UC6n8I1UDTKP1IWjQMg6_TwA"},{name:"Nobita from Japan",id:"UCcIsxujzLRO5qY5f9buahCQ"},{name:"Tom Scott",id:"UCBa659QWEk1AI4Tg--mrJ2A"},{name:"Tom Scott Plus",id:"UCHC4G4X-OR5WkY-IquRGa3Q"},{name:"Numberphile",id:"UCoxcjq-8xIDTYp3uz647V5A"},{name:"Computerphile",id:"UC9-y-6csu5WGm29I7JiwpnA"},{name:"Donut Media",id:"UCL6JmiMXKoXS6bpP1D3bk8g"},{name:"Veritasium",id:"UCHnyfMqiRRG1u-2MsSQLbXA"},{name:"Steve Mould",id:"UCEIwxahdLz7bap-VDs9h35A"},{name:"Mark Rober",id:"UCY1kMZp36IQSyNx_9h4mpCg"},{name:"SmarterEveryDay",id:"UC6107grRI4m0o2-emgoDnAA"},{name:"Its okay to be Smart",id:"UCH4BNI0-FOK2dMXoFtViWHw"},{name:"SciShow Psych",id:"UCUdettijNYvLAm4AixZv4RA"},{name:"OverSimplified",id:"UCNIuvl7V8zACPpTmmNIqP2A"},{name:"SciShow",id:"UCZYTClx2T1of7BRZ86-8fow"},{name:"SciShow Space",id:"UCrMePiHCWG4Vwqv3t7W9EFg"},{name:"Domain of Science",id:"UCxqAWLTk1CmBvZFPzeZMd9A"},{name:"Techquickie",id:"UC0vBXGSyV14uvJ4hECDOl0Q"},{name:"ColdFusion",id:"UC4QZ_LsYcvcq7qOsOhpAX4A"},{name:"Think Twice",id:"UC9yt3wz-6j19RwD5m5f6HSg"},{name:"Business Casual",id:"UC_E4px0RST-qFwXLJWBav8Q"},{name:"Mathologer",id:"UC1_uAIS3r8Vu6JjXWvastJg"},{name:"Desitny",id:"UCIFtADcWrOApqrsinzPoOfA"},{name:"60 Symbols",id:"UCvBqzzvUBLCs8Y7Axb-jZew"},{name:"NileRed",id:"UCFhXFikryT4aFcLkLw2LBLA"},{name:"Bill Gates",id:"UCnEiGCE13SUI7ZvojTAVBKw"},{name:"NASA Goddard",id:"UCAY-SMFNfynqz1bdoaV8BeQ"},{name:"Looking Glass Universe",id:"UCFk__1iexL3T5gvGcMpeHNA"},{name:"Seeker",id:"UCzWQYUVCpZqtN93H8RR44Qw"},{name:"Jordan Peterson",id:"UCL_f53ZEJxp8TtlOkHwMV9Q"},{name:"Quanta Magazine",id:"UCTpmmkp1E4nmZqWPS-dl5bg"},{name:"LiveOverflow",id:"UClcE-kVhqyiHCcjYwcpfj9w"},{name:"Linfamy",id:"UCBkqDNqao03ldC3u78-Pp8g"},{name:"TechLinked",id:"UCeeFfhMcJa1kjtfZAGskOCA"},{name:"Scientia Plus",id:"UC6_clxPYNS_BstewLKjyA9g"},{name:"NASA JPL",id:"UCryGec9PdUCLjpJW2mgCuLw"},{name:"Physics Girl",id:"UC7DdEm33SyaTDtWYGO2CwdA"}];const A=new l(U,"json"),d=new l("https://youtube.googleapis.com/youtube/v3","json"),m=w.YT_KEY,y=o([]),b=o(""),u=o([]),f=e=>d.get(`/search?part=snippet&key=${m}&q=${e}&type=video&maxResults=10`),T=async()=>{const e=await A.get("/nebula/subs");return y.set(e),0},S=(e,a,i=null)=>{get\u00B5().id||(set\u00B5("id",a),set\u00B5("type",e),set\u00B5("token",i));const[n,c]=["?autoplay=1","www.youtube-nocookie.com/embed/"],[t,r]=["content.watchnebula.com/video/","/iframe/"+(i||"")];let s;return e==="Youtube"&&(s=c+a+n),e==="Nebula"&&(s=t+a+r),b.set("https://"+s),0},q=e=>{const a=e.currentTarget.querySelector("a").dataset;S(a.type,a.slug,a.token),window.scrollTo(0,0),document.title=a.title},g=(e,a=10)=>d.get(`/playlistItems?part=snippet&playlistId=${e}&key=${m}&maxResults=${a}`),h=async e=>{const a=`/channels?part=snippet%2CcontentDetails&id=${e.map(t=>t.id).join("%2C")}&key=${m}`,i=await d.get(a);return(await Promise.all(i.items.map(t=>t.contentDetails.relatedPlaylists.uploads).map(async t=>(await g(t+"&order=date",4)).items))).flat()},M=async()=>{const e=49;let a=new Array(Math.ceil(C.length/e));for(let i=0,n=a.length;i<n;i++)a[i]=C.splice(0,e);return a.forEach(i=>{h(i).then(n=>u.set([...p(u),...n||{}]))}),0};export{b as a,u as b,M as c,y as d,q as e,T as n,f as s,S as v};
