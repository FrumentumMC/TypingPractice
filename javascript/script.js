var seconds = 1000 * 60;
var textarea = document.getElementById("text-input");
var timer;
textarea.addEventListener("keypress", startTimer)

function startTimer() {
    textarea.removeEventListener("keypress", startTimer);
    if (seconds == 60000)
    timer = setInterval(startTimer, 1000)
    seconds -= 1000;
    document.getElementById("timer").innerHTML = "0:" + seconds/1000;
    if (seconds <= 9000) {
        document.getElementById("timer").innerHTML = "0:0" + seconds/1000;
    }
    if (seconds <= 0) {
        clearInterval(timer);
        getResults();
   }
}
document.getElementById("timer").innerHTML="1:00";


const text = document.getElementById("text-generator");

function getText() {
    fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {text.innerHTML = `${data.content}`})
}
getText();


function resetGame() {
    document.getElementById("text-input").value = "";
    getText();
    textarea.addEventListener("keypress", startTimer)
}

function getResults() {
    document.getElementById("result-details").style.display = "block";
}