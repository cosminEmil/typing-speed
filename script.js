let words = [
    ["car ", "table ", "water ", "book ", "door ", "apple ", "street ", "light ", "morning ", "river ", "garden"],
    ["bread ", "road ", "family ", "flower ", "morning ", "river ", "garden ", "note ", "hand ", "wall "],
    ["sun ", "moon ", "bag ", "train ", "voice ", "note ", "hand ", "wall ", "floor ", "car ", "table ", "water "],
    ["tree ", "cloud ", "river ", "stone ", "paper ", "glass ", "light ", "field ", "road ", "chair ", "window ", "door "],
    ["house ", "ship ", "bird ", "flower ", "shadow ", "path ", "bridge ", "rain ", "wind ", "book ", "star ", "leaf "],
    ["mountain ", "forest ", "storm ", "fire ", "snow ", "sand ", "coffee ", "music ", "letter ", "street ", "camera ", "clock "]
];

let index = 0;

function generateSentences() {
    for (let row = 1; row <= words.length; ++row) {
        for (let word of words[row - 1]) {
            for (let character of word) {
                let letter = document.createElement('div');
                letter.id = index;
                letter.innerText = character;
                let sentence = document.getElementById('letters' + row);
                sentence.appendChild(letter);
                ++index;
            }
        }
    }
}

function timer(currentTime) {
    let time = document.getElementById('timer');
    time.innerText = "TIME LEFT: " + currentTime;
    if (currentTime == 0) {
        let message = document.getElementById('message');
        message.innerText = "SCORE:" + wordCounter;
        setTimeout(() => {
            window.location.reload();
        }, 2 * 1000);
    }
}

function start() {
    let currentTime = 60;
    setInterval(() => {
        timer(currentTime);
        --currentTime;
    }, 1000);
    generateSentences();
}

let currentLetterIndex = 0, isCorrect = 1, wordCounter = 0;

function checkLettersEquality(inTextLetter, typedLetter, textLetterColor) {
    if (inTextLetter != ' ') {
        if (inTextLetter == typedLetter) {
            textLetterColor.style.color = 'green';
        } else {
            isCorrect = 0;
            if (backspaceClicked == 0 && textLetterColor.style.color != 'green') {
                textLetterColor.style.color = 'red';   
            } else {
                textLetterColor.style.color = 'black';
            }
        }
    } else {
        if (isCorrect) {
            ++wordCounter;
        }
        isCorrect = 1;
    }

}

let inpKey = document.getElementById('typedLetters');
let backspaceClicked = 0;

inpKey.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key == 'Backspace') {
        backspaceClicked = 1;
    }
})

function getInput() {
    let typedInput = document.getElementById('typedLetters').value;
    let typedLetter = typedInput[typedInput.length - 1];
    for (let row = 1; row <= 6; ++row) {
        let sentence = document.getElementById('letters' + row);
        for (let i = 0; i < sentence.childNodes.length; ++i) {
            let currElement = sentence.childNodes[i];
            let letterIndex = currElement.getAttribute('id');
            if (letterIndex == currentLetterIndex && backspaceClicked == 0) {
                inTextLetter = currElement.innerText;
                checkLettersEquality(inTextLetter, typedLetter, currElement);
            } else if (backspaceClicked && letterIndex == currentLetterIndex) {
                currElement = sentence.childNodes[i - 1];
                checkLettersEquality(inTextLetter, typedLetter, currElement);
                backspaceClicked = 0;
                currentLetterIndex -= 2;
            }
        }
        if (currentLetterIndex > sentence.childNodes[sentence.childNodes.length - 1].getAttribute('id') && row == 6) {
            let message = document.getElementById('message');
            message.innerText = "SCORE:" + wordCounter;
            setTimeout(() => {
                window.location.reload();
            }, 20 * 1000);
        }
    }
    ++currentLetterIndex;
}