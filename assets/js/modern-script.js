// ===== MODERN WEB PERFORMANCE & UX ENHANCEMENTS =====

// ===== INTERSECTION OBSERVER API - MODERN LAZY LOADING =====
class ModernImageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        // Enhanced Intersection Observer with multiple thresholds
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: [0, 0.1, 0.5, 1]
        });

        // Observe all images with loading="lazy"
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    async loadImage(img) {
        try {
            // Use modern async/await for image loading
            await new Promise((resolve, reject) => {
                const newImg = new Image();
                newImg.onload = resolve;
                newImg.onerror = reject;
                newImg.src = img.src;
            });
            
            img.classList.add('loaded');
        } catch (error) {
            console.warn('Failed to load image:', img.src);
            img.alt = 'Obrázek se nepodařilo načíst';
        }
    }
}

// ===== MODERN WEB VITALS MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.vitals = {};
        this.init();
    }
    
    init() {
        // Core Web Vitals tracking
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
        this.measureFCP();
    }
    
    measureLCP() {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    measureFID() {
        // First Input Delay
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                this.vitals.fid = entry.processingStart - entry.startTime;
            });
        }).observe({ entryTypes: ['first-input'] });
    }
    
    measureCLS() {
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            this.vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    measureFCP() {
        // First Contentful Paint
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    this.vitals.fcp = entry.startTime;
                }
            });
        }).observe({ entryTypes: ['paint'] });
    }
    
    getVitals() {
        return this.vitals;
    }
}

// ===== MODERN THEME MANAGER WITH CSS CUSTOM PROPERTIES =====
class ModernThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() ?? 'dark';
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }
    
    init() {
        this.setTheme(this.theme);
        this.bindEvents();
        this.observeSystemTheme();
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcons();
        this.broadcastThemeChange();
    }
    
    broadcastThemeChange() {
        // Broadcast theme change to other tabs/windows
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: this.theme } 
        }));
    }
    
    observeSystemTheme() {
        // Observe system theme changes
        this.mediaQuery.addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    updateThemeIcons() {
        const icons = document.querySelectorAll('[id^="theme-icon"]');
        const iconClass = this.theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill';
        icons.forEach(icon => icon.className = iconClass);
    }
    
    toggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        this.animateToggle();
    }
    
    animateToggle() {
        const buttons = document.querySelectorAll('.theme-toggle');
        buttons.forEach(button => {
            button.style.transform = 'scale(0.8)';
            button.addEventListener('transitionend', () => {
                button.style.transform = 'scale(1)';
            }, { once: true });
        });
    }
    
    bindEvents() {
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.addEventListener('click', () => this.toggle());
        });
    }
}

// ===== MODERN SERVICE WORKER FOR OFFLINE SUPPORT =====
class OfflineManager {
    constructor() {
        this.init();
    }
    
    async init() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('SW registered:', registration);
            } catch (error) {
                console.log('SW registration failed:', error);
            }
        }
    }
}

// ===== MODERN CONTACT FORM WITH VALIDATION =====
class ModernContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearErrors(field));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Toto pole je povinné';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Zadejte platnou e-mailovou adresu';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^(\+420)?\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Zadejte platné telefonní číslo';
            }
        }
        
        this.showValidation(field, isValid, message);
        return isValid;
    }
    
    showValidation(field, isValid, message) {
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            if (feedback) feedback.textContent = message;
        }
    }
    
    clearErrors(field) {
        field.classList.remove('is-invalid', 'is-valid');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFormValid = Array.from(this.form.elements)
            .filter(field => field.type !== 'submit')
            .every(field => this.validateField(field));
        
        if (!isFormValid) return;
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Odesílám...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showSuccess('Zpráva byla úspěšně odeslána!');
            this.form.reset();
        } catch (error) {
            this.showError('Došlo k chybě při odesílání zprávy.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showSuccess(message) {
        this.showAlert(message, 'success');
    }
    
    showError(message) {
        this.showAlert(message, 'danger');
    }
    
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        this.form.insertBefore(alertDiv, this.form.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    setupValidation() {
        // Add required validation markup
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!field.parentNode.querySelector('.invalid-feedback')) {
                const feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                field.parentNode.appendChild(feedback);
            }
        });
    }
}

// ===== INITIALIZATION WITH MODERN PATTERNS =====
class App {
    constructor() {
        this.components = new Map();
        this.init();
    }
    
    async init() {
        // Initialize components
        this.components.set('theme', new ModernThemeManager());
        this.components.set('images', new ModernImageLoader());
        this.components.set('performance', new PerformanceMonitor());
        this.components.set('contact', new ModernContactForm());
        this.components.set('offline', new OfflineManager());
        
        // Legacy components
        this.initLegacyComponents();
        
        // Setup error handling
        this.setupErrorHandling();
        
        console.log('🚀 DVSG Modern App initialized!');
    }
    
    initLegacyComponents() {
        // Keep existing components for backward compatibility
        const smoothScroll = new SmoothScroll();
        const navbarScroll = new NavbarScroll();
        const galleryModal = new GalleryModal();
        const scrollAnimations = new ScrollAnimations();
        const mobileMenu = new MobileMenu();
        const emailProtection = new EmailProtection();
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    getComponent(name) {
        return this.components.get(name);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dvsgApp = new App();
});

export { App, ModernThemeManager, PerformanceMonitor };
