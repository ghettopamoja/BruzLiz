document.addEventListener("DOMContentLoaded",(()=>{const t=[{src:"vid9.mp4",start:0,duration:6},{src:"vid7.mp4",start:7,duration:21},{src:"vid3.mp4",start:27,duration:21},{src:"vid2.mp4",start:48,duration:20},{src:"vid4.mp4",start:68,duration:35},{src:"vid6.mp4",start:102,duration:24},{src:"vid8.mp4",start:126,duration:25}];let e=0;const n=document.querySelectorAll(".controls span")[0],r=document.querySelector(".video-item"),a=document.querySelector(".song-list ul");let c=null,o=null;function i(t){n.innerHTML=t?'<i class="fas fa-pause"></i>':'<i class="fas fa-play"></i>'}function s(){if(e>=t.length)return;const n=t[e];o||(o=document.createElement("video"),r.appendChild(o)),o.src=n.src,o.currentTime=0,o.muted=!0,o.play(),o.ontimeupdate=()=>{o.currentTime>=n.duration&&(o.pause(),e++,e>=t.length?c&&(c.pause(),c.currentTime=0,i(!1),e=0):s())},o.onended=()=>{e++,s()}}["music4.mp3","music2.mp3","music3.mp3"].sort().forEach((t=>{const n=document.createElement("li");a.appendChild(n),n.textContent=t.replace(".mp3",""),n.addEventListener("click",(()=>function(t,n,r){r.querySelectorAll("li").forEach((t=>{t.classList.remove("active")})),e=0,void(o&&(o.pause(),o.currentTime=0)),n.classList.add("active"),c&&(c.pause(),c.currentTime=0,i(!1));c=new Audio(t),c.play(),i(!0),c.ontimeupdate=()=>{document.querySelector(".name h2").style.color=function(){const t=Math.floor(16777215*Math.random());return`#${t.toString(16).padStart(6,"0")}`}()},c.onpause=()=>{o&&o.pause()},c.onplay=()=>{o&&o.play()},s()}(t,n,a)))})),n.onclick=()=>{c&&!c.paused?(c.pause(),i(!1)):c&&(c.play(),i(!0))}}));
