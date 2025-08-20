import{a as h,S as p}from"./assets/vendor-D3cdi7O1.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",g="51739132-2493f22fabb11ebba5692bb32",b=15;async function L(i,n=1){const a={key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:b};return(await h.get(y,{params:a})).data}const m=document.querySelector(".gallery"),l=document.querySelector(".loader-container"),d=document.querySelector(".load-more"),v=new p(".gallery a",{captionsData:"alt",captionDelay:250});function w(i){const n=i.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:s,comments:r,downloads:u})=>`
    <li class="gallery-item">
      <a href="${o}">
        <img src="${a}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${r}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",n),v.refresh()}function S(){m.innerHTML=""}function f(){l&&l.classList.remove("hidden")}function q(){l&&l.classList.add("hidden")}function B(){d&&d.classList.remove("hidden")}function c(){d&&d.classList.add("hidden")}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector(".form"),n=document.querySelector(".load-more");let a="",o=1,e=0;i.addEventListener("submit",async r=>{r.preventDefault(),a=r.currentTarget.elements["search-text"].value.trim(),a&&(o=1,S(),c(),await t())}),n.addEventListener("click",async()=>{c(),f(),await t()});async function t(){try{f();const r=await L(a,o);if(!r.hits||r.hits.length===0){alert("We're sorry, but you've reached the end of search results.");return}w(r.hits),e=r.totalHits,o+=1,o*15<=e?B():(c(),o===2&&alert("We're sorry, but you've reached the end of search results.")),s()}catch(r){console.error(r),c()}finally{q()}}function s(){const r=document.querySelector(".gallery li");if(!r)return;const{height:u}=r.getBoundingClientRect();window.scrollBy({top:u*2,behavior:"smooth"})}});
//# sourceMappingURL=index.js.map
