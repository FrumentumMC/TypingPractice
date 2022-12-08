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

function languageDropdown() {
    document.getElementById('dropdown-id').classList.toggle('show-dropdown');
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-dropdown')) {
                openDropdown.classList.remove('show-dropdown');
            }
        }
    }
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}