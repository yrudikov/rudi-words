function loadContentFromHash() {
    const hash = window.location.hash.substring(2);
    const [page] = hash.split('/');

    let targetUrl = '';

    switch (page) {
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

window.addEventListener('hashchange', loadContentFromHash);

$(document).ready(function() {
    if (window.location.hash) {
        loadContentFromHash();
    } else {
        window.location.hash = '#/decks';
    }

    $(document).on('click', '.list-group-item', function(event) {
        event.preventDefault();

        const deckId = $(this).data('deck-id');
        const decksArray = JSON.parse(localStorage.getItem("decks")) || [];
        const selectedDeck = decksArray.find(deck => deck.id === deckId);

        if (selectedDeck) {
            let selectedDecksArray = JSON.parse(localStorage.getItem("selectedDecks")) || [];
            selectedDecksArray.push(selectedDeck);

            localStorage.setItem("selectedDecks", JSON.stringify(selectedDecksArray));

            window.location.hash = '#/cards';

            setTimeout(() => location.reload(), 10);
        }
    });

    $('.navbar-nav .nav-link').on('click', function() {
        if ($('.navbar-toggler').attr('aria-expanded') === "true") {
            $('.navbar-toggler').click();
        }
    });

    $(document).on('click', function(event) {
        if ($(".navbar-collapse").hasClass("show") && !$(event.target).hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});

function populateDeckList() {
    const decksArray = JSON.parse(localStorage.getItem("decks")) || [];
    const $deckListElement = $('#deck-list');
    $deckListElement.empty();

    $.each(decksArray.reverse(), function(index, deck) {
        const $listItem = $('<a>')
            .addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center')
            .text(deck.title)
            .data('deck-id', deck.id);

        const $deleteButton = $('<button>')
            .addClass('btn btn-link delete-button')
            .html('<i class="fas fa-trash" style="color: #419895;"></i>')
            .on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                handleDeleteButtonClick(event, deck.id);
            });

        $listItem.append($deleteButton);
        $deckListElement.append($listItem);
    });
}

function handleDeleteButtonClick(event, deckId) {
    event.preventDefault();
    event.stopPropagation();

    const decksArray = JSON.parse(localStorage.getItem("decks")) || [];
    const updatedDecksArray = decksArray.filter(d => d.id !== deckId);

    localStorage.setItem("decks", JSON.stringify(updatedDecksArray));

    populateDeckList();
}
