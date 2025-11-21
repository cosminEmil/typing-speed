let words1 = [ "car ", "table ", "water ", "book ", "door ", "apple ", "street ", "light ", "morning ", "river ", "garden" ];
let words2 = ["bread ", "road ", "family ", "flower ", "morning ", "river ", "garden ","note ", "hand ", "wall "];
let words3 = ["sun ", "moon ", "bag ", "train ", "voice ","note ", "hand ", "wall ", "floor ", "car ", "table ", "water "];

let firstSentence = document.getElementById('letters1');
let secondSentence = document.getElementById('letters2');
let thirdSentence = document.getElementById('letters3');
let cnt = 0;

function generateSentence(sentence, id) {
    for (let word of sentence) {
        for (let character of word) {
            let letter = document.createElement('div');
            letter.innerText = character;
            if (id == 1) {
                firstSentence.appendChild(letter);
            } else if (id == 2) {
                secondSentence.appendChild(letter);
            } else if (id == 3) {
                thirdSentence.appendChild(letter);
            }
        }
    }
}

function start() {
    let time = 60;
    let timer = document.getElementById('timer');
    setInterval(() => {
        timer.innerText = "TIME LEFT: " + time;
        --time;
        if (time == 0) {
            let message = document.getElementById('message');
            message.innerText = "SCORE:" + wordCounter;
            setTimeout(() => {
                window.location.reload();
            }, 2 * 1000);
        }
    }, 1000);
    // displaying the sentences in the page 
    generateSentence(words1, 1);
    generateSentence(words2, 2);
    generateSentence(words3, 3);
}

let firstIndex = 0, secondIndex = 0, thirdIndex = 0, isCorrect = 1, wordCounter = 0;

function checkLetter(typedLetter, inTextLetter, index, sentence, sentenceLength) {
    if (inTextLetter != ' ') {
        if (typedLetter == inTextLetter) {
            sentence[index].style.color = 'green';
        } else {
            isCorrect = 0;
            sentence[index].style.color = 'red';
        }
    } else if (inTextLetter == ' ') {
        if (isCorrect) {
            ++wordCounter;
        } else {
            isCorrect = 1;
        }
    }
    return index + 1;
}

function getInput() {
    let typedInput = document.getElementById('typedLetters').value;
    let typedLetter = typedInput[typedInput.length - 1];
    if (firstIndex < firstSentence.childNodes.length) {
        let firstInTextLetter = firstSentence.childNodes[firstIndex].innerText;
        firstIndex = checkLetter( typedLetter, firstInTextLetter, firstIndex, firstSentence.childNodes, firstSentence.childNodes.length);
    } else if (secondIndex < secondSentence.childNodes.length) {
        let secondInTextLetter = secondSentence.childNodes[secondIndex].innerText;
        secondIndex = checkLetter(typedLetter, secondInTextLetter, secondIndex, secondSentence.childNodes, secondSentence.childNodes.length);
    } else if (thirdIndex < thirdSentence.childNodes.length) {
        thirdInTextLetter = thirdSentence.childNodes[thirdIndex].innerText;
        thirdIndex = checkLetter(typedLetter, thirdInTextLetter, thirdIndex, thirdSentence.childNodes, thirdSentence.childNodes.length);
    } else  {
        let message = document.getElementById('message');
        message.innerText = "SCORE:" + wordCounter;
        setTimeout(() => {
            window.location.reload();
        }, 20 * 1000);
    }
}