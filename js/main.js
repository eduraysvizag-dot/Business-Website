// Simple Slider for Hero Section
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000); // Auto-slide every 5s
}

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Review Slider
const reviewSlides = document.querySelectorAll('.review-slide');
if (reviewSlides.length > 0) {
    let currentReview = 0;

    function showReview(n) {
        reviewSlides.forEach(slide => slide.classList.remove('active'));
        reviewSlides[n].classList.add('active');
    }

    function nextReview() {
        currentReview = (currentReview + 1) % reviewSlides.length;
        showReview(currentReview);
    }

    setInterval(nextReview, 7000); // Auto-slide every 7s
}

// --- Dynamic Footer Links ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const s = data.socials;

        const mailLink = document.getElementById('footer-mail');
        const waLink = document.getElementById('footer-whatsapp');
        const ytLink = document.getElementById('footer-youtube');
        const instaLink = document.getElementById('footer-instagram');

        if (mailLink) mailLink.href = `mailto:${s.email}`;
        if (waLink) waLink.href = `https://wa.me/${s.whatsapp.replace('+', '')}`;
        if (ytLink) ytLink.href = s.youtube;
        if (instaLink) instaLink.href = s.instagram;

    } catch (error) {
        console.error('Error updating footer links:', error);
    }
});

// --- Active Page Highlighting ---
document.addEventListener('DOMContentLoaded', () => {
    // Get current page filename
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'index.html';
    
    // If the page is root or empty, treat it as index.html
    const targetPage = (currentPage === '' || pathname === '/' || pathname === '') ? 'index.html' : currentPage;
    
    // Find and highlight the matching nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match if href is the target page or ends with the target page
        if (href === targetPage || href.endsWith(targetPage)) {
            link.classList.add('active-page');
        }
    });
});

// --- Page Loader ---
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Hide on load (all resources loaded)
window.addEventListener('load', hideLoader);

// Fallback: Hide after 3 seconds max (in case of slow network/broken resources)
setTimeout(hideLoader, 3000);

// Immediate check in case the event already fired
if (document.readyState === 'complete') {
    hideLoader();
}