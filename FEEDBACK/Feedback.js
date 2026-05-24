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

async function handleSubmit() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
        alert('Please fill in all required fields before submitting.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Collect checked feedback types
    const types = [...document.querySelectorAll('.checkbox-group input:checked')]
        .map(cb => cb.value).join(', ');

    const rating = document.querySelector('input[name="rating"]:checked')?.value || 'Not rated';
    const role = document.getElementById('role').value || 'Not specified';

    const formData = {
        firstName, lastName, email, role,
        feedbackTypes: types || 'None selected',
        subject, message, rating
    };

    try {
        const res = await fetch('https://formspree.io/f/xqejdbwl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            document.getElementById('successMsg').classList.add('visible');
            document.getElementById('successMsg').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            alert('Submission failed. Please try again.');
            btn.disabled = false;
            btn.innerHTML = '<span>&#10003;</span> Submit Feedback';
        }
    } catch {
        alert('Network error. Please check your connection and try again.');
        btn.disabled = false;
        btn.innerHTML = '<span>&#10003;</span> Submit Feedback';
    }
}
