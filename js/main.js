/**
 * Jeffrey Seligson Realtor Website
 * Main JavaScript - Navigation & Interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // Smooth Scroll Navigation
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80; // Account for sticky header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // ==========================================
    // CTA Button Smooth Scroll
    // ==========================================
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('mobile-menu-open');
        mobileMenuToggle.classList.toggle('active');
    }

    function closeMobileMenu() {
        if (navMenu.classList.contains('mobile-menu-open')) {
            navMenu.classList.remove('mobile-menu-open');
            mobileMenuToggle.classList.remove('active');
        }
    }

    // ==========================================
    // Active Navigation Link Highlight
    // ==========================================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', setActiveNavLink);

    // Set initial active link
    setActiveNavLink();

    // ==========================================
    // Fade-in Animation on Scroll
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in
    const sectionsToAnimate = document.querySelectorAll('.about-section, .listings-section, .contact-section');

    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });

    // ==========================================
    // Listing Cards Stagger Animation
    // ==========================================
    const listingCards = document.querySelectorAll('.listing-card');

    listingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    const cardsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    listingCards.forEach(card => {
        cardsObserver.observe(card);
    });

    // ==========================================
    // Form Validation (for future use)
    // ==========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation will be added here when email service is integrated
            console.log('Form submission intercepted - email service not yet configured');

            // Placeholder for future form submission logic:
            // 1. Validate form fields
            // 2. Send to email service (Formspree, EmailJS, etc.)
            // 3. Show success/error message
        });
    }

    // ==========================================
    // Dynamic Year in Footer
    // ==========================================
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.site-footer .footer-content p:first-child');

    if (footerText) {
        footerText.textContent = footerText.textContent.replace('2026', currentYear);
    }

    // ==========================================
    // Performance: Lazy Load Images (future use)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // When listing images are added dynamically, use data-src attribute
        // and this observer will lazy load them
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%c🏡 Jeffrey Seligson Realtor Website', 'font-size: 20px; color: #2d5016; font-weight: bold;');
    console.log('%cGreen Building Expert | Sonoma County Specialist', 'font-size: 12px; color: #8b6f47;');
    console.log('%cWebsite ready for BAREIS IDX integration', 'font-size: 11px; color: #666;');

    // ==========================================
    // Debugging Helper
    // ==========================================
    // Uncomment for development debugging
    // window.debugSite = function() {
    //     console.log('Navigation Links:', navLinks);
    //     console.log('Sections:', document.querySelectorAll('section[id]'));
    //     console.log('Listing Cards:', listingCards);
    // };

});

// ==========================================
// Mobile Menu CSS (inline fallback)
// ==========================================
// Add these styles if mobile menu toggle is used
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 767px) {
        .nav-menu.mobile-menu-open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1rem 1.5rem;
            gap: 0;
        }

        .nav-menu.mobile-menu-open .nav-link {
            padding: 1rem 0;
            border-bottom: 1px solid #d4d4d4;
        }

        .mobile-menu-toggle.active .hamburger {
            background-color: transparent;
        }

        .mobile-menu-toggle.active .hamburger::before {
            transform: rotate(45deg);
            top: 0;
        }

        .mobile-menu-toggle.active .hamburger::after {
            transform: rotate(-45deg);
            top: 0;
        }

        .nav-link.active {
            color: #2d5016;
            border-bottom-color: #9caf88;
        }
    }
`;
document.head.appendChild(style);
