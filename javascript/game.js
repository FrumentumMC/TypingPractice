const textApiUrl = 'https://api.quotable.io/random';
const textSection = document.getElementById('text-generator');
const userInput = document.getElementById('text-input');
const textarea = userInput;
let text = "";
let seconds = 1000 * 60;
let timer;
let mistakes = 0;

const getText = async () => {
    const response = await fetch(textApiUrl);
    let data = await response.json();
    text = data.content;
    let textArray = text.split('').map((value) => {
        return '<span class="text-chars">' + value + '</span>';
    })
    textSection.innerHTML += textArray.join('');
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
            // getResults();
            textSection.innerHTML = '';
            userInput.value = '';
            getText();
        }
    })
})

textarea.addEventListener('keypress', startTimer);

function startTimer() {
    textarea.removeEventListener('keypress', startTimer);
    if (seconds == 60000)
    timer = setInterval(startTimer, 1000);
    seconds -= 1000;
    document.getElementById('timer').innerHTML = '0:' + seconds/1000;
    if (seconds <= 9000) {
        document.getElementById('timer').innerHTML = '0:0' + seconds/1000;
    }
    if (seconds <= 0) {
        getResults();
   }
}
document.getElementById('timer').innerHTML='1:00';

function resetGame() {
    textSection.innerHTML = '';
    userInput.value = '';
    userInput.disabled = false;
    getText();
    // stop timer
    document.getElementById('result-details').style.display = 'none';
}

const getResults = () => {
    clearInterval(timer);
    userInput.value = '';
    userInput.disabled = true;
    userInput.style.backgroundColor = '#ffffff';
    // wpm
    let timeTaken = 1;
    document.getElementById('wpm').innerText = (userInput.value.length  - mistakes / 5 / timeTaken);
    document.getElementById('accuracy').innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + '%';
    // accuracy
    document.getElementById('result-details').style.display = 'block';
}