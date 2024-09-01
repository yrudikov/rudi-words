console.log("index.js is loaded");

function init() {
    import("../js/api.js").then(() => {
        console.log("api.js loaded");
        import("../js/app.js").then(() => {
            console.log("app.js loaded");
            import("../js/add-decks.js").then(() => {
                console.log("add-decks.js loaded");
                import("../js/cards.js").then(() => {
                    console.log("cards.js loaded");
                });
            });
        });
    });
}

document.body.addEventListener("htmx:afterOnLoad", () => {
    init();
});


const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});




