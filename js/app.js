
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
