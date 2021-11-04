import Pardubice from './pardubice.js';

let timer;

document.addEventListener("DOMContentLoaded", () => {
    const pce = new Pardubice(1.3);
    timer = setInterval(() => {
        if (pce.Render()) clearInterval(timer);
    }, 1);
    // pce.Render();
})
