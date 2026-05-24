// Navbar — hide while hero is on screen, reveal once hero scrolls out of view
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');

function updateNavbar() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom <= 0) {
        navbar.classList.add('navbar-visible');
    } else {
        navbar.classList.remove('navbar-visible');
    }
}

updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });