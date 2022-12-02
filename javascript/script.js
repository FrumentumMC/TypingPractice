function hover_h1() {
    document.getElementById('icon').setAttribute('src', 'media/icon_hover.png');
}

function unhover_h1() {
    document.getElementById('icon').setAttribute('src', 'media/icon.png');
}

const hamburger = document.querySelector('#hamburger-menu');
const navMenu = document.querySelector('.nav-responsive');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
})