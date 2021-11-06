import Pardubice from './pardubice.js';

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js', { scope: '/' })
    .then((reg) => console.log("serviceWorker registered", reg))
    .catch((err) => console.log("serviceWorker not registered", err))
}

let timer;

document.addEventListener("DOMContentLoaded", () => {
    const pce = new Pardubice(1.3);
    timer = setInterval(() => {
        if (pce.Render()) clearInterval(timer);
    }, 1);
    // pce.Render();
})
