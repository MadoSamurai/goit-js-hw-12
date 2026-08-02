import{a as h,S as p,i as n}from"./assets/vendor-CucEYOFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d="56868862-3dcc84f72f876530e5630b5a4",g="https://pixabay.com/api/";async function y(i){const r={key:d,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await h.get(g,{params:r})).data}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),L=new p(".gallery a",{captionsData:"alt",captionDelay:250});function P(i){const r=i.map(({webformatURL:s,largeImageURL:o,tags:e,likes:t,views:a,comments:f,downloads:m})=>`
                <li class="gallery-item">
                    <a class="gallery-link" href="${o}">
                        <img class="gallery-image" src="${s}" alt="${e}" />
                    </a>
                    <ul class="info-container">
                        <li class="info-item"><h3>Likes</h3> <p>${t}</p></li>
                        <li class="info-item"><h3>Views</h3> <p>${a}</p></li>
                        <li class="info-item"><h3>Comments</h3> <p>${f}</p></li>
                        <li class="info-item"><h3>Downloads</h3> <p>${m}</p></li>
                    </ul>
                </li>
                `).join(" ");l.innerHTML=r,L.refresh()}function w(){l.innerHTML=""}function S(){c.classList.remove("hidden")}function u(){c.classList.add("hidden")}u();const b=document.querySelector(".form");b.addEventListener("submit",$);async function $(i){i.preventDefault();const r=i.currentTarget,s=r.elements["search-text"].value.trim();if(s===""){n.warning({title:"Caution",message:"Please enter a search term!",position:"topRight"});return}w(),S(),y(s).then(o=>{if(o.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}P(o.hits)}).catch(o=>{n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{r.reset(),u()})}
//# sourceMappingURL=index.js.map
