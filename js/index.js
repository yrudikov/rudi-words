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

function loadContent(url) {
    let targetUrl = '';

    switch (url) {
        case '/decks':
            targetUrl = 'partials/decks.partial.html';
            break;
        case '/add-cards':
            targetUrl = 'partials/add-decks.partial.html';
            break;
        case '/cards':
            targetUrl = 'partials/cards.partial.html';
            break;
        default:
            targetUrl = 'partials/decks.partial.html';
    }

    if (targetUrl) {
        $.get(targetUrl, function(data) {
            $('#main').html(data);
            if ($('#deck-list').length) {
                populateDeckList();
            }
            if ($('#add-deck-form').length) {
                const event = new Event('htmx:afterOnLoad');
                document.dispatchEvent(event);
            }
        });
    }
}

window.addEventListener('popstate', function(event) {
    loadContent(window.location.pathname);
});

$(document).ready(function() {
    // Initial load
    loadContent(window.location.pathname);

    $('.navbar-nav .nav-link').on('click', function(event) {
        event.preventDefault();
        const url = $(this).attr('href');
        window.history.pushState({}, '', url);
        loadContent(url);
    });
});


