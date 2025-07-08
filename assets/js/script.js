// ===== CONTENT LOADER =====
class ContentLoader {
    constructor() {
        this.content = null;
        this.additionalInfo = null;
    }
    
    async loadContent() {
        try {
            const [contentResponse, additionalResponse] = await Promise.all([
                fetch('data/content.json'),
                fetch('data/additional-info.json')
            ]);
            
            this.content = await contentResponse.json();
            this.additionalInfo = await additionalResponse.json();
            
            this.updateContent();
        } catch (error) {
            console.error('Error loading content:', error);
            // Fallback to static content if JSON loading fails
        }
    }
    
    updateContent() {
        if (!this.content) return;
        
        // Update navigation
        this.updateNavigation();
        
        // Update hero section
        this.updateHero();
        
        // Update about section
        this.updateAbout();
        
        // Update services section
        this.updateServices();
        
        // Update history section
        this.updateHistory();
        
        // Update documents section
        this.updateDocuments();
        
        // Update contact section
        this.updateContact();
        
        // Update footer
        this.updateFooter();
        
        // Update meta tags
        this.updateMetaTags();
    }
    
    updateNavigation() {
        const nav = this.content.navigation;
        if (!nav) return;
        
        // Update navigation links text
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navMapping = {
            '#home': nav.home,
            '#about': nav.about,
            '#services': nav.services,
            '#history': nav.history,
            '#gallery': nav.gallery,
            '#documents': nav.documents,
            '#contact': nav.contact
        };
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (navMapping[href]) {
                link.textContent = navMapping[href];
            }
        });
    }
    
    updateHero() {
        const hero = this.content.hero;
        if (!hero) return;
        
        const heroTitle = document.querySelector('.hero-section h1');
        const heroSubtitle = document.querySelector('.hero-section p.lead');
        const heroButton = document.querySelector('.hero-section .btn');
        
        if (heroTitle) heroTitle.textContent = hero.title;
        if (heroSubtitle) heroSubtitle.textContent = hero.subtitle;
        if (heroButton) heroButton.textContent = hero.cta_button;
    }
    
    updateAbout() {
        const about = this.content.about;
        if (!about) return;
        
        const aboutTitle = document.querySelector('#about h2');
        const aboutContent = document.querySelector('#about .about-content');
        const valuesContainer = document.querySelector('#about .values-container');
        
        if (aboutTitle) aboutTitle.textContent = about.title;
        if (aboutContent) aboutContent.textContent = about.content;
        
        if (valuesContainer && about.values) {
            valuesContainer.innerHTML = '';
            about.values.forEach(value => {
                const valueDiv = document.createElement('div');
                valueDiv.className = 'col-md-4';
                valueDiv.innerHTML = `
                    <div class="text-center">
                        <div class="feature-icon mb-3">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <h5>${value.title}</h5>
                        <p class="small">${value.description}</p>
                    </div>
                `;
                valuesContainer.appendChild(valueDiv);
            });
        }
    }
    
    updateServices() {
        const services = this.content.services;
        if (!services) return;
        
        const servicesTitle = document.querySelector('#services h2');
        const servicesSubtitle = document.querySelector('#services .lead');
        const servicesContainer = document.querySelector('#services .services-container');
        
        if (servicesTitle) servicesTitle.textContent = services.title;
        if (servicesSubtitle) servicesSubtitle.textContent = 'Poskytujeme služby výhradně členům družstva';
        
        if (servicesContainer && services.items) {
            servicesContainer.innerHTML = '';
            services.items.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.className = 'col-md-6 col-lg-3';
                serviceDiv.innerHTML = `
                    <div class="service-card h-100">
                        <div class="service-icon">
                            <i class="bi bi-building"></i>
                        </div>
                        <h5>${service.title}</h5>
                        <p>${service.description}</p>
                    </div>
                `;
                servicesContainer.appendChild(serviceDiv);
            });
        }
    }
    
    updateHistory() {
        const history = this.content.history;
        if (!history) return;
        
        const historyTitle = document.querySelector('#history h2');
        const historyContent = document.querySelector('#history .history-content');
        const timelineContainer = document.querySelector('#history .timeline');
        
        if (historyTitle) historyTitle.textContent = history.title;
        if (historyContent) historyContent.textContent = history.content;
        
        if (timelineContainer && history.milestones) {
            timelineContainer.innerHTML = '';
            timelineContainer.className = 'timeline';
            history.milestones.forEach((milestone, index) => {
                const milestoneDiv = document.createElement('div');
                milestoneDiv.className = 'timeline-item';
                milestoneDiv.innerHTML = `
                    <div class="timeline-year">${milestone.year}</div>
                    <div class="timeline-content">
                        <h6>${milestone.title}</h6>
                        <p>${milestone.description}</p>
                    </div>
                `;
                timelineContainer.appendChild(milestoneDiv);
            });
        }
    }
    
    updateDocuments() {
        const documents = this.content.documents;
        if (!documents) return;
        
        const documentsTitle = document.querySelector('#documents h2');
        const documentsDescription = document.querySelector('#documents .documents-description');
        const documentsContainer = document.querySelector('#documents .documents-list');
        const membersSection = document.querySelector('#documents .members-section');
        
        if (documentsTitle) documentsTitle.textContent = documents.title;
        if (documentsDescription) documentsDescription.textContent = documents.description;
        
        if (documentsContainer && documents.items) {
            documentsContainer.innerHTML = '';
            documents.items.forEach(doc => {
                const docDiv = document.createElement('div');
                docDiv.className = 'col-md-6';
                const linkProps = doc.external ? 'target="_blank" rel="noopener noreferrer"' : '';
                const icon = doc.external ? 
                    (doc.title.includes('Sbírka') ? 'bi-file-earmark-pdf' : 'bi-file-earmark-text') : 
                    (doc.title.includes('GDPR') ? 'bi-shield-check' : 'bi-file-earmark-ruled');
                docDiv.innerHTML = `
                    <a href="${doc.link}" class="document-item text-decoration-none" ${linkProps}>
                        <i class="bi ${icon}"></i>
                        <div>
                            <h6>${doc.title}${doc.external ? ' <i class="bi bi-box-arrow-up-right ms-1 small"></i>' : ''}</h6>
                            <p class="small text-muted">${doc.description}</p>
                        </div>
                    </a>
                `;
                documentsContainer.appendChild(docDiv);
            });
        }
        
        if (membersSection && documents.members_section) {
            const membersSectionData = documents.members_section;
            membersSection.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-people me-2"></i>${membersSectionData.title}</h5>
                    </div>
                    <div class="card-body text-center">
                        <i class="bi bi-google display-1 text-primary mb-3"></i>
                        <h4 class="card-title">Přístup k dokumentům členů</h4>
                        <p class="card-text">${membersSectionData.description}</p>
                        <a href="${membersSectionData.drive_url}" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                            <i class="bi bi-box-arrow-up-right me-2"></i>
                            ${membersSectionData.button_text}
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    updateContact() {
        const contact = this.content.contact;
        const company = this.content.company;
        if (!contact || !company) return;
        
        const contactTitle = document.querySelector('#contact h2');
        const mapInfo = document.querySelector('#contact .map-info');
        const paymentInfo = document.querySelector('#contact .payment-info');
        
        if (contactTitle) contactTitle.textContent = contact.title || 'Kontakt';
        if (mapInfo) mapInfo.innerHTML = `<i class="bi bi-geo-alt me-2"></i>${contact.map_info}`;
        if (paymentInfo) paymentInfo.textContent = contact.payment_info;
        
        // Update contact details
        const contactDetails = document.querySelector('#contact .contact-details');
        if (contactDetails) {
            const phoneFormatted = `+420 ${company.phone}`;
            const phoneClean = `+420${company.phone.replace(/\s/g, '')}`;
            contactDetails.innerHTML = `
                <h4 class="mb-4 text-center">Kontaktní informace</h4>
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="contact-item text-center">
                            <i class="bi bi-geo-alt"></i>
                            <div>
                                <h6>Adresa</h6>
                                <p>${company.address}<br>
                                ${company.postal_code} ${company.city}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="contact-item text-center">
                            <i class="bi bi-telephone"></i>
                            <div>
                                <h6>Telefon</h6>
                                <p><a href="tel:${phoneClean}">${phoneFormatted}</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="contact-item text-center">
                            <i class="bi bi-envelope"></i>
                            <div>
                                <h6>Email</h6>
                                <p><a href="mailto:${company.email}">${company.email}</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="contact-item text-center">
                            <i class="bi bi-building"></i>
                            <div>
                                <h6>IČO</h6>
                                <p>${company.ico}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="contact-item text-center">
                            <i class="bi bi-clock"></i>
                            <div>
                                <h6>Úřední hodiny</h6>
                                <p>${company.office_hours}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="contact-item text-center">
                            <i class="bi bi-bank"></i>
                            <div>
                                <h6>Bankovní spojení</h6>
                                <p>${company.bank_name}<br>
                                Číslo účtu: ${company.bank_account}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    updateFooter() {
        const footer = this.content.footer;
        const company = this.content.company;
        if (!footer || !company) return;
        
        const copyright = document.querySelector('footer .row:last-child .col-md-6 p');
        
        if (copyright) copyright.textContent = footer.copyright;
        
        // Update footer contact info
        const footerContact = document.querySelector('footer .col-lg-4:last-child');
        if (footerContact) {
            const phoneFormatted = `+420 ${company.phone}`;
            footerContact.innerHTML = `
                <h6 class="mb-3">Kontakt</h6>
                <p class="mb-1"><i class="bi bi-geo-alt me-2"></i>${company.address}, ${company.postal_code} ${company.city}</p>
                <p class="mb-1"><i class="bi bi-telephone me-2"></i>${phoneFormatted}</p>
                <p class="mb-1"><i class="bi bi-envelope me-2"></i>${company.email}</p>
                <p class="mb-0"><i class="bi bi-building me-2"></i>IČO: ${company.ico}</p>
            `;
        }
    }
    
    updateMetaTags() {
        const hero = this.content.hero;
        const company = this.content.company;
        if (!hero || !company) return;
        
        // Update title
        document.title = company.name;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', hero.subtitle);
        }
    }
}

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
    const contentLoader = new ContentLoader();
    
    // Load content from JSON
    contentLoader.loadContent();
    
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
