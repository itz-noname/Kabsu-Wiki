// ============================================================
// STATS — Firebase Realtime Database (REST, no SDK needed)
// ============================================================
const DB = 'https://kabsu-wiki-default-rtdb.firebaseio.com';

// Format numbers as at least 3 digits: 0→"000", 42→"042", 1500→"1500"
function fmt(n) {
  return n < 1000 ? String(n).padStart(3, '0') : String(n);
}

// Read all stats and update the display
async function loadStats() {
  try {
    const res  = await fetch(`${DB}/stats.json`);
    const data = (await res.json()) || {};
    document.getElementById('statViews').textContent  = fmt(data.views  || 0);
    document.getElementById('statLikes').textContent  = fmt(data.likes  || 0);
    document.getElementById('statShares').textContent = fmt(data.shares || 0);
  } catch (e) {
    console.warn('Stats load failed:', e);
  }
}

// Safely increment one key (reads current value, writes +1)
async function increment(key) {
  const res     = await fetch(`${DB}/stats/${key}.json`);
  const current = (await res.json()) || 0;
  const next    = current + 1;
  await fetch(`${DB}/stats/${key}.json`, {
    method: 'PUT',
    body: JSON.stringify(next)
  });
  return next;
}

// Page view — increments once per browser session (not per page reload)
async function trackView() {
  if (sessionStorage.getItem('kw_viewed')) {
    return; // already counted this session
  }
  sessionStorage.setItem('kw_viewed', '1');
  const next = await increment('views');
  document.getElementById('statViews').textContent = fmt(next);
}

// Like button — one like per device (stored in localStorage)
async function handleLike() {
  if (localStorage.getItem('kw_liked')) return; // already liked
  localStorage.setItem('kw_liked', '1');
  const next = await increment('likes');
  document.getElementById('statLikes').textContent = fmt(next);
  const btn = document.getElementById('likeBtn');
  if (btn) { btn.textContent = '♥ Liked'; btn.style.opacity = '0.5'; btn.style.cursor = 'default'; }
}

// Share button — uses native share sheet on mobile, copies URL on desktop
async function handleShare() {
  try {
    if (navigator.share) {
      await navigator.share({ title: 'KABSU Wiki', url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    const next = await increment('shares');
    document.getElementById('statShares').textContent = fmt(next);
  } catch (e) {
    // User cancelled share — don't count it
  }
}

// Run on page load
loadStats();
trackView();

// Restore liked state on revisit
if (localStorage.getItem('kw_liked')) {
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('likeBtn');
    if (btn) { btn.textContent = '♥ Liked'; btn.style.opacity = '0.5'; btn.style.cursor = 'default'; }
  });
}
// ============================================================

// Core Values Carousel
const values = ['TRUTH', 'EXCELLENCE', 'SERVICE', 'INTEGRITY'];

const valueImages = [
  {
    gradient: 'linear-gradient(135deg, #c8a06a 0%, #a07840 100%)',
    color: '#7a5020',
    label: 'Truth',
    icon: `
      <rect x="8" y="16" width="22" height="32" rx="2" fill="currentColor" opacity="0.35"/>
      <rect x="34" y="16" width="22" height="32" rx="2" fill="currentColor" opacity="0.55"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" stroke-width="2.5" opacity="0.7"/>
      <line x1="14" y1="24" x2="26" y2="24" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="14" y1="30" x2="26" y2="30" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="14" y1="36" x2="26" y2="36" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="38" y1="24" x2="50" y2="24" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="38" y1="30" x2="50" y2="30" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="38" y1="36" x2="50" y2="36" stroke="currentColor" stroke-width="2" opacity="0.6"/>`
  },
  {
    gradient: 'linear-gradient(135deg, #8ab04a 0%, #5a8020 100%)',
    color: '#3a5a10',
    label: 'Excellence',
    icon: `
      <polygon points="32,10 38,26 56,26 42,36 47,52 32,42 17,52 22,36 8,26 26,26" fill="currentColor" opacity="0.5"/>
      <polygon points="32,18 36,28 47,28 38,34 41,45 32,39 23,45 26,34 17,28 28,28" fill="currentColor" opacity="0.8"/>`
  },
  {
    gradient: 'linear-gradient(135deg, #6a90c8 0%, #3a6098 100%)',
    color: '#1a3a70',
    label: 'Service',
    icon: `
      <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.5"/>
      <path d="M14 50 Q14 36 32 36 Q50 36 50 50" fill="currentColor" opacity="0.45"/>
      <path d="M44 28 Q52 20 54 30 Q56 38 46 42" fill="currentColor" opacity="0.35"/>
      <path d="M20 28 Q12 20 10 30 Q8 38 18 42" fill="currentColor" opacity="0.35"/>`
  },
  {
    gradient: 'linear-gradient(135deg, #c87878 0%, #984848 100%)',
    color: '#6a1818',
    label: 'Integrity',
    icon: `
      <path d="M32 10 L48 18 L48 34 Q48 46 32 54 Q16 46 16 34 L16 18 Z" fill="currentColor" opacity="0.4"/>
      <path d="M32 16 L44 22 L44 34 Q44 43 32 49 Q20 43 20 34 L20 22 Z" fill="currentColor" opacity="0.3"/>
      <polyline points="24,32 30,38 40,26" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.9"/>`
  }
];

let currentVal = 0;

function showValue(i) {
  currentVal = (i + values.length) % values.length;
  const v = valueImages[currentVal];

  // Update word (fade out → update → fade in)
  const wordEl = document.getElementById('coreWord');
  wordEl.style.opacity = '0';
  setTimeout(() => {
    wordEl.textContent = values[currentVal];
    wordEl.style.opacity = '1';
  }, 200);

  // Update image placeholder
  const imgEl = document.getElementById('coreImg');
  imgEl.style.background = v.gradient;

  const iconEl = document.getElementById('coreImgIcon');
  iconEl.style.color = v.color;
  iconEl.innerHTML = v.icon;

  document.getElementById('coreImgLabel').textContent = v.label;

  // Update dots
  document.querySelectorAll('.core-dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === currentVal);
  });

  // Crossfade background slides
  document.querySelectorAll('.core-bg-slide').forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentVal);
  });
}

document.getElementById('prevVal').addEventListener('click', () => showValue(currentVal - 1));
document.getElementById('nextVal').addEventListener('click', () => showValue(currentVal + 1));

document.querySelectorAll('.core-dot').forEach(dot => {
  dot.addEventListener('click', () => showValue(parseInt(dot.dataset.i)));
});

// Apply initial image styles on load
showValue(0);

// Auto-advance
setInterval(() => showValue(currentVal + 1), 3500);

// Community Groups — show/hide left arrow based on scroll position
const communityScroll = document.getElementById('communityScroll');
const communityLeftArrow = document.getElementById('communityScrollLeft');

communityScroll.addEventListener('scroll', () => {
  if (communityScroll.scrollLeft > 10) {
    communityLeftArrow.classList.add('is-visible');
  } else {
    communityLeftArrow.classList.remove('is-visible');
  }
});

// Featured Websites — show/hide left arrow based on scroll position
const websitesScroll = document.getElementById('websitesScroll');
const websitesLeftArrow = document.getElementById('websitesScrollLeft');

websitesScroll.addEventListener('scroll', () => {
  if (websitesScroll.scrollLeft > 10) {
    websitesLeftArrow.classList.add('is-visible');
  } else {
    websitesLeftArrow.classList.remove('is-visible');
  }
});
 
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
