let keys = document.querySelectorAll('.key');
let shift_left = document.querySelector('#shift-left');
let shift_right = document.querySelector('#shift-right');
let ctrl_left = document.querySelector('#ctrl-left');
let alt_left = document.querySelector('#alt-left');
let space = document.querySelector('#space');
let alt_right = document.querySelector('#alt-right');
let ctrl_right = document.querySelector('#ctrl-right');

for (let i = 0; i < keys.length; i++) {
    keys[i].setAttribute('keyname', keys[i].innerText);
    keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());
}

window.addEventListener('keydown', function(e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.add('active-keys');
        }
        if (e.code == 'ShiftLeft') {
            shift_right.classList.remove('active-keys');
        }
        if (e.code == 'ShiftRight') {
            shift_left.classList.remove('active-keys');
        }
        if (e.code == 'CtrlLeft') {
            ctrl_right.classList.remove('active-keys');
        }
        if (e.code == 'AltLeft') {
            alt_right.classList.remove('active-keys');
        }
        if (e.code == 'Space') {
            space.classList.add('active-keys');
        }
        if (e.code == 'AltRight') {
            alt_left.classList.remove('active-keys');
        }
        if (e.code == 'CtrlRight') {
            ctrl_left.classList.remove('active-keys');
        }
    }
})

window.addEventListener('keyup', function(e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.remove('active-keys');
            keys[i].classList.add('remove');
        }
        if (e.code == 'ShiftLeft') {
            shift_right.classList.remove('active-keys');
            shift_right.classList.remove('remove');
        }
        if (e.code == 'ShiftRight') {
            shift_left.classList.remove('active-keys');
            shift_left.classList.remove('remove');
        }
        if (e.code == 'CtrlLeft') {
            ctrl_right.classList.remove('active-keys');
            ctrl_right.classList.remove('remove');
        }
        if (e.code == 'AltLeft') {
            alt_right.classList.remove('active-keys');
            alt_right.classList.remove('remove');
        }
        if (e.code == 'Space') {
            space.classList.remove('active-keys');
            space.classList.add('remove');
        }
        if (e.code == 'AltRight') {
            alt_left.classList.remove('active-keys');
            alt_left.classList.remove('remove');
        }
        if (e.code == 'CtrlRight') {
            ctrl_left.classList.remove('active-keys');
            ctrl_left.classList.remove('remove');
        }
        setTimeout(()=> {
            keys[i].classList.remove('remove');
        }, 200)
    }
})