import Pardubice from './pardubice.js';

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js', { scope: '/' })
    .then((reg) => console.log("serviceWorker registered", reg))
    .catch((err) => console.log("serviceWorker not registered", err))
}

let timer;

document.addEventListener("DOMContentLoaded", async () => {
    const pce = new Pardubice(1.3);
    await pce.DownloadData();
    pce.Render();
    
    const sidebarToggle = document.querySelector("#sidebar .toggle-btn");
    sidebarToggle.addEventListener("click", () => {
        document.querySelector("#sidebar").classList.toggle("open");
        document.querySelector("#page").classList.toggle("open");
    })
})