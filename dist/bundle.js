(()=>{"use strict";const e=(t,n)=>{n&&(n.innerHTML="",t.forEach((t=>{new class{constructor(e){this.name=e}render(e){const t=document.createElement("div");t.innerHTML=`\n    <p>${this.name}</p>\n    `,t.addEventListener("click",(()=>this.moveToEmpty())),t.classList.add("tiles"),e.append(t)}moveToEmpty(){const t=JSON.parse(localStorage.getItem("tiles")),n=t.findIndex((e=>e==this.name));if(console.log(`before move ${t}`),""==t[n-1]){const e=t[n-1];t[n-1]=t[n],t[n]=e}if(""==t[n+1]){const e=t[n+1];t[n+1]=t[n],t[n]=e}if(""==t[n-4]){const e=t[n-4];t[n-4]=t[n],t[n]=e}if(""==t[n+4]){const e=t[n+4];t[n+4]=t[n],t[n]=e}const o=document.querySelector(".container");e(t,o),console.log(`after move ${t}`),localStorage.setItem("tiles",JSON.stringify(t)),console.log(t)}}(t).render(n)})),localStorage.setItem("tiles",JSON.stringify(t)))};window.addEventListener("load",(()=>{const t=function(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1)),o=e[n];e[n]=e[t],e[t]=o}return e}([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""]),n=document.querySelector(".game-begin"),o=document.createElement("BUTTON");o.innerHTML="Start new Game",o.classList.add("start-game");const s=document.createElement("DIV");s.classList.add("container"),n.append(o,s),o.addEventListener("click",(()=>e(t,s)))}))})();