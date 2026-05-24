// Navbar — hide while banner is on screen, reveal on scroll
const navbar = document.getElementById('navbar');
const banner = document.getElementById('wiki-banner');

function updateNavbar() {
    navbar.classList.toggle('navbar-visible', banner.getBoundingClientRect().bottom <= 0);
}
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

// TOC toggle
function toggleToc() {
    const list = document.getElementById('toc-list');
    const btn = document.querySelector('.toc-toggle');
    const hidden = list.style.display === 'none';
    list.style.display = hidden ? '' : 'none';
    btn.textContent = hidden ? '[hide]' : '[show]';
}

// Smooth scroll for TOC links
document.querySelectorAll('.toc a, .see-also-list a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// Wiki tab switching (cosmetic)
document.querySelectorAll('.wiki-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.wiki-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});