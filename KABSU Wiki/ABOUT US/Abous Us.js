// Navbar — reveal once hero scrolls out of view (same as Index.js)
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');

function updateNavbar() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    navbar.classList.toggle('navbar-visible', heroBottom <= 0);
}

updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });