console.log("add-decks.js is loaded");

document.addEventListener("htmx:afterOnLoad", function(evt) {
    const addDeckForm = document.getElementById('add-deck-form');

    if (addDeckForm) {
        const $addButton = $('#add-button');
        const $textarea = $('#add-deck-textarea');
        const $titleInput = $('#add-deck-title');

        if ($addButton.length && $textarea.length && $titleInput.length) {
            $addButton.on('click', function() {
                const textValue = $textarea.val();
                const titleValue = $titleInput.val();

                if (!textValue || !titleValue) {
                    console.error("Textarea or title is empty!");
                    return;
                }

                function stringToJSON(inputString) {
                    let result = {};
                    let sourceType = '';

                    if (inputString.includes(' - ') || inputString.includes('-')) {
                        sourceType = 'local';
                        inputString.split('\n').forEach(pair => {
                            let match = pair.match(/^(.*?)\s*-\s*(.*?)$/);
                            if (match) {
                                let key = match[1].trim();
                                let value = match[2].trim();
                                if (key && value) {
                                    result[key] = value;
                                }
                            }
                        });
                    } else {
                        sourceType = 'deepl';
                        inputString.split(' ').forEach(key => {
                            result[key.trim()] = key.trim();
                        });
                    }

                    return {
                        json: JSON.stringify(result, null, 4),
                        sourceType: sourceType,
                    };
                }

                const {json: jsonResult, sourceType} = stringToJSON(textValue);

                const deckObject = {
                    id: Date.now(),
                    title: titleValue,
                    data: JSON.parse(jsonResult),
                    source: sourceType,
                };

                let decksArray = JSON.parse(localStorage.getItem("decks")) || [];
                decksArray.push(deckObject);
                localStorage.setItem("decks", JSON.stringify(decksArray));

                console.log("New deck added:", deckObject);
                alert("New deck added successfully!");

                window.location.hash = '#/decks';
            });
        } else {
            console.error("Elements not found after content load!");
        }
    }
});

$(document).ready(function() {
    if (document.getElementById('add-deck-form')) {
        const event = new Event('htmx:afterOnLoad');
        document.dispatchEvent(event);
    }
});
