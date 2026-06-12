// ============ Dark mode toggle ============
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function applyTheme(theme) {
    if (theme === 'dark') {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = icon;
    if (themeToggleMobile) themeToggleMobile.textContent = icon;
}

// Respect saved preference, fallback to system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

function toggleTheme() {
    const isDark = htmlEl.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);


// ============ Mobile menu ============
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');

function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    if (mobileMenuIcon) mobileMenuIcon.textContent = '☰';
    mobileMenuButton?.setAttribute('aria-expanded', 'false');
}

mobileMenuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('open');
    if (mobileMenuIcon) mobileMenuIcon.textContent = isOpen ? '✕' : '☰';
    mobileMenuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


// ============ Scroll reveal animations ============
const revealTargets = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealTargets.forEach(target => revealObserver.observe(target));


// ============ Scroll to top button ============
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn?.classList.remove('hidden');
    } else {
        scrollTopBtn?.classList.add('hidden');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============ Active nav link highlight ============
const navLinks = document.querySelectorAll('nav a.underline-grow');
const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = `#${entry.target.id}`;
        const link = document.querySelector(`nav a.underline-grow[href="${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(section => navObserver.observe(section));