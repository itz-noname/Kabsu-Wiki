// Navbar — hide while hero is on screen, reveal once hero scrolls out
const navbar = document.getElementById('navbar');
const hero   = document.getElementById('hero');

function updateNavbar() {
    if (hero.getBoundingClientRect().bottom <= 0) {
        navbar.classList.add('navbar-visible');
    } else {
        navbar.classList.remove('navbar-visible');
    }
}

updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });