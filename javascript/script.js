const textApiUrl = "http://api.quotable.io/random";
const textSection = document.getElementById("text-generator");
const userInput = document.getElementById("text-input");
let text = "";

async function getText() {
    const response = await fetch(textApiUrl);
    let data = await response.json();
    text = data.content;
    let textArray = text.split("").map((value) => {
        return "<span class='text-chars'>" + value + "</span>";
    })
    textSection.innerHTML += textArray.join("");
}
getText();

var seconds = 1000 * 60;
var textarea = userInput;
var timer;
textarea.addEventListener("keypress", startTimer);

function startTimer() {
    textarea.removeEventListener("keypress", startTimer);
    if (seconds == 60000)
    timer = setInterval(startTimer, 1000);
    seconds -= 1000;
    document.getElementById("timer").innerHTML = "0:" + seconds/1000;
    if (seconds <= 9000) {
        document.getElementById("timer").innerHTML = "0:0" + seconds/1000;
    }
    if (seconds <= 0) {
        getResults();
   }
}
document.getElementById("timer").innerHTML="1:00";

let mistakes = 0;

userInput.addEventListener("input", () => {
    let textChars = document.querySelectorAll(".text-chars");
    textChars = Array.from(textChars);
    let userInputChars = userInput.value.split("");
    textChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
            userInput.style.backgroundColor = "#ffffff";
        }
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        else {
            if (!char.classList.contains("fail")) { // fix do not forgive mistakes.. and side arrpws disable lol
                mistakes += 1;
                char.classList.add("fail");
                userInput.style.backgroundColor = "#cc7070";
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        let check = textChars.every((element) => {
            return element.classList.contains("success");
        })
        if (check) {
            textSection.innerHTML = "";
            userInput.value = "";
            getText();
        }
    })
})

function resetGame() {
    textSection.innerHTML = "";
    userInput.value = "";
    userInput.disabled = false;
    getText();
    // stop timer
    document.getElementById("result-details").style.display = "none";
}

function getResults() {
    clearInterval(timer);
    userInput.value = "";
    userInput.disabled = true;
    // wpm
    // accuracy
    document.getElementById("result-details").style.display = "block";
}

let keys = document.querySelectorAll(".key");
let shift_left = document.querySelector("#shift-left");
let shift_right = document.querySelector("#shift-right");
let ctrl_left = document.querySelector("#ctrl-left");
let alt_left = document.querySelector("#alt-left");
let space = document.querySelector("#space");
let alt_right = document.querySelector("#alt-right");
let ctrl_right = document.querySelector("#ctrl-right"); // add caps lock <span class="key">`</span>

for (let i = 0; i < keys.length; i++) {
    keys[i].setAttribute("keyname", keys[i].innerText);
    keys[i].setAttribute("lowerCaseName", keys[i].innerText.toLowerCase());
}

window.addEventListener("keydown", function(e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute("keyname") || e.key == keys[i].getAttribute("lowerCaseName")) {
            keys[i].classList.add("active-keys");
        }
        if (e.code == "ShiftLeft") {
            shift_right.classList.remove("active-keys");
        }
        if (e.code == "ShiftRight") {
            shift_left.classList.remove("active-keys");
        }
        if (e.code == "CtrlLeft") {
            ctrl_right.classList.remove("active-keys");
        }
        if (e.code == "AltLeft") {
            alt_right.classList.remove("active-keys");
        }
        if (e.code == "Space") {
            space.classList.add("active-keys");
        }
        if (e.code == "AltRight") {
            alt_left.classList.remove("active-keys");
        }
        if (e.code == "CtrlRight") {
            ctrl_left.classList.remove("active-keys");
        }
    }
})

window.addEventListener("keyup", function(e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute("keyname") || e.key == keys[i].getAttribute("lowerCaseName")) {
            keys[i].classList.remove("active-keys");
            keys[i].classList.add("remove");
        }
        if (e.code == "ShiftLeft") {
            shift_right.classList.remove("active-keys");
            shift_right.classList.remove("remove");
        }
        if (e.code == "ShiftRight") {
            shift_left.classList.remove("active-keys");
            shift_left.classList.remove("remove");
        }
        if (e.code == "CtrlLeft") {
            ctrl_right.classList.remove("active-keys");
            ctrl_right.classList.remove("remove");
        }
        if (e.code == "AltLeft") {
            alt_right.classList.remove("active-keys");
            alt_right.classList.remove("remove");
        }
        if (e.code == "Space") {
            space.classList.remove("active-keys");
            space.classList.add("remove");
        }
        if (e.code == "AltRight") {
            alt_left.classList.remove("active-keys");
            alt_left.classList.remove("remove");
        }
        if (e.code == "CtrlRight") {
            ctrl_left.classList.remove("active-keys");
            ctrl_left.classList.remove("remove");
        }
        setTimeout(()=> {
            keys[i].classList.remove("remove");
        }, 200)
    }
})