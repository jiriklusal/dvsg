// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        
        this.init();
    }
    
    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (this.themeIcon) {
            this.themeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
        }
        
        // Update Bootstrap's data-bs-theme attribute
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation effect
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        if (this.navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            });
        }
    }
}

// ===== CONTACT FORM HANDLER =====
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            phone: formData.get('phone') || document.getElementById('phone').value,
            subject: formData.get('subject') || document.getElementById('subject').value,
            message: formData.get('message') || document.getElementById('message').value
        };
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="loading"></span> Odesílám...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name.trim()) {
            errors.push('Jméno je povinné pole');
        }
        
        if (!data.email.trim()) {
            errors.push('Email je povinné pole');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Email má neplatný formát');
        }
        
        if (!data.subject.trim()) {
            errors.push('Předmět je povinné pole');
        }
        
        if (!data.message.trim()) {
            errors.push('Zpráva je povinné pole');
        }
        
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showErrors(errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.innerHTML = `
            <strong>Opravte prosím následující chyby:</strong>
            <ul class="mb-0 mt-2">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        // Remove existing error messages
        const existingError = this.form.querySelector('.alert-danger');
        if (existingError) {
            existingError.remove();
        }
        
        this.form.appendChild(errorDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success mt-3';
        successDiv.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            <strong>Zpráva byla úspěšně odeslána!</strong> Odpovíme vám co nejdříve.
        `;
        
        // Remove existing messages
        const existingMessage = this.form.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        this.form.appendChild(successDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// ===== GALLERY MODAL =====
class GalleryModal {
    constructor() {
        this.init();
    }
    
    init() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-overlay h6').textContent;
                this.openModal(img.src, title);
            });
        });
    }
    
    openModal(src, title) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${src}" class="img-fluid rounded" alt="${title}">
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        // Remove modal from DOM after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.observerOptions
            );
            
            // Observe elements
            document.querySelectorAll('.service-card, .timeline-item, .gallery-item').forEach(el => {
                this.observer.observe(el);
            });
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ===== LOADING MANAGER =====
class LoadingManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Show loading spinner while page loads
        window.addEventListener('load', () => {
            this.hideLoadingSpinner();
        });
        
        // Handle image lazy loading
        this.initLazyLoading();
    }
    
    hideLoadingSpinner() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }
    
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
}

// ===== MOBILE MENU HANDLER =====
class MobileMenu {
    constructor() {
        this.init();
    }
    
    init() {
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    }
}

// ===== UTILS =====
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== EMAIL PROTECTION =====
class EmailProtection {
    constructor() {
        this.init();
    }
    
    init() {
        // Najdeme všechny chráněné emaily
        const protectedEmails = document.querySelectorAll('[data-email]');
        protectedEmails.forEach(element => {
            this.decodeEmail(element);
        });
    }
    
    decodeEmail(element) {
        const encoded = element.getAttribute('data-email');
        if (encoded) {
            // Dekódování base64
            const decoded = atob(encoded);
            const email = decoded.split('').reverse().join('');
            
            // Nastavíme správný email
            if (element.tagName.toLowerCase() === 'a') {
                element.href = 'mailto:' + email;
                element.textContent = email;
            } else {
                element.textContent = email;
            }
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const themeManager = new ThemeManager();
    const smoothScroll = new SmoothScroll();
    const navbarScroll = new NavbarScroll();
    const contactForm = new ContactForm();
    const galleryModal = new GalleryModal();
    const scrollAnimations = new ScrollAnimations();
    const loadingManager = new LoadingManager();
    const mobileMenu = new MobileMenu();
    const emailProtection = new EmailProtection();
    
    // Handle hash navigation after page load (e.g., from legal pages)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100); // Small delay to ensure content is loaded
    }
    
    // Add some debugging
    console.log('DVSG website initialized successfully!');
    
    // Performance optimization
    const debouncedResize = Utils.debounce(() => {
        // Handle window resize events
        window.dispatchEvent(new Event('resize'));
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can add error reporting here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+S
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== CUSTOM EVENTS =====
const DVSGEvents = {
    THEME_CHANGED: 'dvsg:theme-changed',
    FORM_SUBMITTED: 'dvsg:form-submitted',
    GALLERY_OPENED: 'dvsg:gallery-opened'
};

// Export for potential use in other scripts
window.DVSGEvents = DVSGEvents;
