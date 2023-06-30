//hangman bodyparts
const head = document.querySelector('.container .main .fig .fig-x');
const neck = document.querySelector('.container .main .fig .fig-y');
const leftHand = document.querySelector('.container .main .fig .fig-a');
const rightHand = document.querySelector('.container .main .fig .fig-b');
const leftLeg = document.querySelector('.container .main .fig .fig-c');
const rightLeg = document.querySelector('.container .main .fig fig-d');

const correct = document.querySelector('.container .main .correct')
const errorWords = document.getElementById('error-words');
const won = document.querySelector('.message-won');
const lost = document.querySelector('.message-word');
const pLetters = document.querySelectorAll('.correct .word');
console.log(pLetters);

let words = ["message", "programming", "anthropology",
             "hacker", "javascript", "java", "world", "google", "code", "html"];
let prev = 3;
// console.log(String((Math.random() * 10)).slice(0,1))

const getWord = (prev) => { 
    let randNum = Number(String(Math.random() * 10).slice(0, 1));
    if(randNum === prev || randNum === undefined) getWord(prev);
    else {
        prev = randNum;
        return words[randNum];
    }
}

const prepareWord = (letter) => {
    const wordDiv = document.createElement('div');
    const wordP = document.createElement('p');
    const lineDiv = document.createElement('div');

    wordDiv.className = 'word';
    wordDiv.appendChild(wordP);
    wordDiv.appendChild(lineDiv);

    wordP.className = `letter ${letter}`;
    lineDiv.className = 'line';
    return wordDiv;
}

let word = getWord(prev);

[...word].forEach((e) => {
    correct.appendChild(prepareWord(e));
})

document.addEventListener('keypress', (e) => {
    [...word].forEach((w) => {
        if(e.key === w);

    })
})




