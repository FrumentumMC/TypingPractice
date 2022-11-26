const textApiUrl = 'https://api.quotable.io/random';
const textGenerator = document.getElementById('text-generator');
const userInput = document.getElementById('text-input');
userInput.addEventListener('keypress', startTimer);
let displayTime = document.getElementById('timer');
let seconds = 60000;
let mistakes = 0;
let userInputScore = [];
displayTime.innerHTML='1:00';

const getText = async () => {
    const response = await fetch(textApiUrl);
    let data = await response.json();
    text = data.content;
    let textArray = text.split('').map((value) => {
        return '<span class="text-chars">' + value + '</span>';
    })
    textGenerator.innerHTML += textArray.join('');
}
getText();

userInput.addEventListener('input', () => {
    let textChars = document.querySelectorAll('.text-chars');
    textChars = Array.from(textChars);
    let userInputChars = userInput.value.split('');
    textChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add('success');
            userInput.style.backgroundColor = '#ffffff';
        }
        else if (userInputChars[index] == null) {
            if (char.classList.contains('success')) {
                char.classList.remove('success');
            } else {
                char.classList.remove('fail');
            }
        }
        else {
            if (!char.classList.contains('fail')) {
                mistakes += 1;
                char.classList.add('fail');
                userInput.style.backgroundColor = '#cc7070';
            }
            document.getElementById('mistakes').innerText = mistakes;
        }
        let check = textChars.every((element) => {
            return element.classList.contains('success');
        })
        if (check) {
            textGenerator.innerHTML = '';
            addUserInputToScore();
            userInput.value = '';
            getText();
        }
    })
})

function startTimer() {
    userInput.removeEventListener('keypress', startTimer);
    if (seconds == 60000)
    timer = setInterval(startTimer, 1000);
    seconds -= 1000;
    displayTime.innerHTML = '0:' + seconds/1000;
    if (seconds <= 9000) {
        displayTime.innerHTML = '0:0' + seconds/1000;
    }
    if (seconds <= 0) {
        getResults();
   }
}

function resetTimer() {
    clearInterval(timer);
    seconds = 60000;
    displayTime.innerHTML='1:00';
    userInput.addEventListener('keypress', startTimer);
}

function addUserInputToScore() {
    userInputChars = userInput.value.split('');
    userInputScore.push(userInputChars.length);
}

function resetGame() {
    textGenerator.innerHTML = '';
    userInput.value = '';
    userInput.disabled = false;
    userInput.style.backgroundColor = '#ffffff';
    getText();
    resetTimer();
    mistakes = 0;
    userInputScore = [];
    document.getElementById('mistakes').innerText = mistakes;
    document.getElementById('result-details').style.display = 'none';
}

const getResults = (userInputSum) => {
    clearInterval(timer);
    userInput.value = '';
    userInput.disabled = true;
    userInput.style.backgroundColor = '#ffffff';
    addUserInputToScore();
    userInputSum = userInputScore.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById('wpm').innerText = (userInputSum / 4.7).toFixed(0);
    document.getElementById('accuracy').innerText = Math.round(((userInputSum - mistakes) / userInputSum) * 100) + '%';
    document.getElementById('result-details').style.display = 'block';
}