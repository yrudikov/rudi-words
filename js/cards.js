console.log("cards.js is loaded");

$(document).ready(function() {
    console.log("Document is ready");

    setTimeout(function() {
        const firstWordContainer = $('.cards__first-word');
        const secondWordContainer = $('.cards__second-word');
        let currentWordIndex = 0;
        let isTranslatedVisible = false;
        let workingDeckData = initializeWorkingDeckData();
        let guessed = [];
        let unguessed = [];

        if (firstWordContainer.length > 0 && secondWordContainer.length > 0) {
            displaySelectedDecks(currentWordIndex, workingDeckData);

            secondWordContainer.on('click', function() {
                if (!isTranslatedVisible && currentWordIndex < workingDeckData.length) {
                    showTranslation(currentWordIndex, workingDeckData);
                    isTranslatedVisible = true;
                }
            });

            $('.cards__button-guessed').on('click', function() {
                if (isTranslatedVisible) {
                    guessed.push(workingDeckData[currentWordIndex]);
                    updateWordCount(guessed, unguessed);
                    isTranslatedVisible = false;
                    currentWordIndex++;
                    moveToNextWord(workingDeckData, guessed, unguessed, currentWordIndex);
                }
            });

            $('.cards__button-unguessed').on('click', function() {
                if (isTranslatedVisible) {
                    unguessed.push(workingDeckData[currentWordIndex]);
                    updateWordCount(guessed, unguessed);
                    isTranslatedVisible = false;
                    currentWordIndex++;
                    moveToNextWord(workingDeckData, guessed, unguessed, currentWordIndex);
                }
            });
        }
    }, 10);
});

function initializeWorkingDeckData() {
    const selectedDeck = getSelectedDeck();
    if (selectedDeck && selectedDeck.data) {
        return Object.entries(selectedDeck.data);
    }
    return [];
}

function displaySelectedDecks(currentIndex = 0, workingDeckData) {
    const selectedDeck = getSelectedDeck();

    if (selectedDeck) {
        $('#deck-title').text(selectedDeck.title);

        if (workingDeckData.length > 0) {
            const [firstWord, translate] = workingDeckData[currentIndex];
            $('.cards__first-word p strong').text(firstWord);
            $('.cards__second-word p strong').text("Translate");
        } else {
            console.log("No data available in the working deck.");
        }
    } else {
        console.log("No deck selected.");
    }
}

function showTranslation(currentIndex, workingDeckData) {
    if (workingDeckData.length > 0 && currentIndex < workingDeckData.length) {
        const [firstWord, translate] = workingDeckData[currentIndex];
        $('.cards__second-word p strong').text(translate);
    }
}

function getSelectedDeck() {
    const selectedDecksArray = JSON.parse(localStorage.getItem("selectedDecks")) || [];
    return selectedDecksArray[selectedDecksArray.length - 1];
}

function moveToNextWord(workingDeckData, guessed, unguessed, currentWordIndex) {
    if (currentWordIndex < workingDeckData.length) {
        const [firstWord, translate] = workingDeckData[currentWordIndex];
        $('.cards__first-word p strong').text(firstWord);
        $('.cards__second-word p strong').text("Translate");
    } else {
        if (unguessed.length > 0) {
            console.log("Restarting with unguessed words...");
            workingDeckData.push(...unguessed);
            unguessed.length = 0;
            updateWordCount(guessed, unguessed);
            currentWordIndex = 0;
            moveToNextWord(workingDeckData, guessed, unguessed, currentWordIndex);
        } else {
            console.log("All words guessed!");
            $('.cards__first-word p strong').text("All words guessed!");
            $('.cards__second-word p strong').html('<a href="#/decks" class="btn btn-primary button-new-deck-select">Select a new deck</a>');
        }
    }
}

function updateWordCount(guessed, unguessed) {
    $('.cards__guessed-words').text(guessed.length);
    $('.cards__unguessed-words').text(unguessed.length);
}
