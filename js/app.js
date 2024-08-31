console.log("app.js is loaded");

function loadContentFromHash() {
    const hash = window.location.hash.substring(2);

    let targetUrl = '';

    switch (hash) {
        case 'decks':
            targetUrl = 'partials/decks.partial.html';
            break;
        case 'add-cards':
            targetUrl = 'partials/add-decks.partial.html';
            break;
        case 'cards':
            targetUrl = 'partials/cards.partial.html';
            break;
        default:
            targetUrl = 'partials/decks.partial.html';
    }
    if (targetUrl) {
        htmx.ajax("GET", targetUrl, "#main");
    }
}

window.addEventListener('hashchange', loadContentFromHash);

$(document).ready(function() {
    if (window.location.hash) {
        loadContentFromHash();
    } else {
        window.location.hash = '#/decks';
    }
});


$(document).ready(function() {
    $('.navbar-nav .nav-link').on('click', function() {
        if ($('.navbar-toggler').attr('aria-expanded') === "true") {
            $('.navbar-toggler').click();
        }
    });
});
$(document).ready(function() {
    $(document).on('click', function(event) {
        const clickOver = $(event.target);
        const _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickOver.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});
