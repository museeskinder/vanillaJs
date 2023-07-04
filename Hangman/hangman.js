//hangman body parts
const hangParts = document.getElementById('figs-parent');
const parts = hangParts.querySelectorAll('.figs');

//other needed dom elements
const correct = document.querySelector('.container .main .correct')
const errorWords = document.getElementById('error-words');
const container = document.querySelector('.container');
const won = document.querySelector('.message-won');
const lost = document.querySelector('.message-word');
const populatedWords = correct.childNodes;
const continueBtn = document.querySelector('button');

let words = ["message", "television", "anthropology",
             "hacker", "javascript", "m", "world", "marcon", "code", "html"];
let prev = 3;

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

    wordP.id = `${letter}`;
    wordP.className = 'letter';
    lineDiv.className = 'line';
    return wordDiv;
}

const setErrorWord = (letter) => {
    let temp = errorWords.innerText;
    if(temp === '')
        errorWords.innerText = letter;
    else {
        temp += `, ${letter}`;
        errorWords.innerText = temp;
    }
}

const checkStatus = () => {
    let numberOfVisibleWords = [...populatedWords].filter((e) => e.firstChild.innerText !== '').length;
    let numberOfErrorWords = [...parts].filter((e) => e.classList.contains('show')).length;
    if(numberOfErrorWords === 6)
        youLost();
    if(numberOfVisibleWords === word.length)
        youWon();
}


let word = getWord(prev);
console.log(word);

[...word].forEach((e) => {
    correct.appendChild(prepareWord(e));
})

const youWon = () => {
    container.className = 'container hide';
    won.className = 'message-won show';
}

const youLost = () => {
    lost.querySelector('p').innerText = word;
    lost.className = 'message-word show';

    /* if there is a key press after the word is displayed, it
    hides  the word for anouther trial  */
    document.addEventListener('keypress', e => {
        if(e.key)
            lost.className = 'message-word';
    });
}

//reloads the page when continue button is clicked
continueBtn.addEventListener('click', e => {
    location.reload();
})

//main event listener for keyobord key press
document.addEventListener('keypress', e => {
    let collection = [...populatedWords].filter((f) => 
        f.firstChild.id === e.key && !f.firstChild.className.includes('set')
    )
    if(collection.length !== 0) {
        collection.forEach((g) => {
            g.firstChild.innerText = e.key;
        })
    }
    else {
        setErrorWord(e.key);
        [...parts].find((e) => !e.classList.contains('show')).classList = 'figs show';
    }
    checkStatus();
}); 
