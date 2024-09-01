console.log("index.js is loaded");

function init() {
    const loadModules = Promise.all([
        import("../js/api.js"),
        import("../js/app.js"),
        import("../js/add-decks.js"),
        import("../js/cards.js")
    ]);

    loadModules.then(() => {
        console.log("All modules loaded");
    }).catch(err => console.error("Error loading modules:", err));
}

document.body.addEventListener("htmx:afterOnLoad", init);


const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});




