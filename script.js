// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const currentYear = document.getElementById('currentYear');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const whatsappFloat = document.querySelector('.whatsapp-float');
const instagramFloat = document.querySelector('.instagram-float');

// Set current year in footer
function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile Navigation Toggle
function setupMobileNav() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Back to Top Button
function setupBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Add scroll effect to navbar
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '';
        }
    });
}

// Theme Toggle Functionality
function initTheme() {
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        console.log('Mode malam diaktifkan');
    }
}

function setupThemeToggle() {
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            console.log('Mode malam diaktifkan');
        } else {
            localStorage.setItem('theme', 'light');
            console.log('Mode siang diaktifkan');
        }
    });
}

// Portfolio Filtering
function setupPortfolioFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Submission
function setupContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Harap lengkapi semua field!');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show a success message
        alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda di ${email} segera.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Observe when skills section comes into view
function setupSkillBarAnimation() {
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Typing effect for hero section
function setupTypingEffect() {
    const typedTexts = [
        "",
        "",
        "",
        ""
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetween = 1500;
    
    const typeText = () => {
        const typedField = document.querySelector('.hero-description');
        if (!typedField) return;
        
        const currentText = typedTexts[currentTextIndex];
        
        if (!isDeleting && currentCharIndex < currentText.length) {
            // Typing
            typedField.textContent = `Seorang profesional dengan pengalaman 5+ tahun dalam ${currentText.substring(0, currentCharIndex + 1)}. Passionate dalam menciptakan solusi digital yang inovatif dan efektif.`;
            currentCharIndex++;
            setTimeout(typeText, typingSpeed);
        } else if (isDeleting && currentCharIndex > 0) {
            // Deleting
            typedField.textContent = `Seorang profesional dengan pengalaman 5+ tahun dalam ${currentText.substring(0, currentCharIndex - 1)}. Passionate dalam menciptakan solusi digital yang inovatif dan efektif.`;
            currentCharIndex--;
            setTimeout(typeText, deletingSpeed);
        } else if (!isDeleting && currentCharIndex === currentText.length) {
            // Finished typing, pause then start deleting
            isDeleting = true;
            setTimeout(typeText, pauseBetween);
        } else if (isDeleting && currentCharIndex === 0) {
            // Finished deleting, move to next text
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typedTexts.length;
            setTimeout(typeText, 500);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeText, 1000);
}

// WhatsApp Click Analytics
function setupWhatsAppAnalytics() {
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // In a real application, you would send this data to analytics
            console.log('WhatsApp link clicked:', link.href);
            
            // Optional: You can add Google Analytics or other tracking here
            // gtag('event', 'whatsapp_click', {
            //     'event_category': 'engagement',
            //     'event_label': link.href
            // });
        });
    });
}

// Instagram Click Analytics
function setupInstagramAnalytics() {
    // Track Instagram clicks
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // In a real application, you would send this data to analytics
            console.log('Instagram link clicked:', link.href);
            
            // Optional: You can add Google Analytics or other tracking here
            // gtag('event', 'instagram_click', {
            //     'event_category': 'engagement',
            //     'event_label': link.href
            // });
        });
    });
}

// Float buttons animation
function setupFloatButtons() {
    // Add animation to float buttons on load
    setTimeout(() => {
        if (whatsappFloat) whatsappFloat.style.transform = 'scale(1)';
        if (instagramFloat) instagramFloat.style.transform = 'scale(1)';
    }, 500);
    
    // Initial scale for animation
    if (whatsappFloat) whatsappFloat.style.transform = 'scale(0)';
    if (instagramFloat) instagramFloat.style.transform = 'scale(0)';
}

// Copy WhatsApp number to clipboard
function setupCopyWhatsAppNumber() {
    // Optional: Add copy to clipboard functionality for WhatsApp number
    const whatsappNumber = '+62895365186660';
    const copyBtns = document.querySelectorAll('.copy-whatsapp');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(whatsappNumber)
                .then(() => {
                    alert('Nomor WhatsApp berhasil disalin: ' + whatsappNumber);
                })
                .catch(err => {
                    console.error('Gagal menyalin:', err);
                });
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setupMobileNav();
    setupBackToTop();
    initTheme();
    setupThemeToggle();
    setupPortfolioFilter();
    setupContactForm();
    setupSmoothScroll();
    setupSkillBarAnimation();
    setupTypingEffect();
    setupWhatsAppAnalytics();
    setupInstagramAnalytics();
    setupFloatButtons();
    setupCopyWhatsAppNumber();
    
    console.log('Website Portofolio siap digunakan!');
    console.log('Fitur WhatsApp & Instagram aktif');
    console.log('WhatsApp: https://wa.me/62895365186660');
    console.log('Instagram: https://instagram.com/https://www.instagram.com/subarna55?igsh=ZW52dXF1eWJ0Y3Qw.dev');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }
});

// WhatsApp message template (can be customized)
function sendWhatsAppMessage(message = 'Halo Andi, saya tertarik dengan portofolio Anda') {
    const phoneNumber = '6281234567890';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Optional: Add this function to any button
// Example: <button onclick="sendWhatsAppMessage()">Kirim WhatsApp</button>

// Instagram deep link (for mobile apps)
function openInstagramProfile() {
    const username = 'andiwijaya.dev';
    // Try to open Instagram app first
    window.location.href = `instagram://user?username=${username}`;
    
    // If Instagram app is not installed, open web version after delay
    setTimeout(() => {
        window.open(`https://instagram.com/${username}`, '_blank');
    }, 500);
}

