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

// Feedback form submit handler
function handleSubmit() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
        alert('Please fill in all required fields before submitting.');
        return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show success message
    const successMsg = document.getElementById('successMsg');
    successMsg.classList.add('visible');

    // Disable submit button
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';

    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}