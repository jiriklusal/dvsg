// ===== SERVICE WORKER PRO OFFLINE PODPORA =====
const CACHE_NAME = 'dvsg-v1.0.0';
const STATIC_CACHE = 'dvsg-static-v1';
const DYNAMIC_CACHE = 'dvsg-dynamic-v1';

// Kritické zdroje pro offline funkčnost
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/modern-script.js',
    '/assets/images/favicon.svg',
    '/assets/images/favicon.png',
    '/assets/images/garaz_cernobila.jpg',
    '/legal/legal-info.html',
    '/legal/gdpr.html',
    '/legal/terms.html'
];

// Externí zdroje (CDN)
const EXTERNAL_ASSETS = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('SW: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache core assets
            caches.open(STATIC_CACHE).then(cache => {
                return cache.addAll(CORE_ASSETS);
            }),
            // Cache external assets
            caches.open(DYNAMIC_CACHE).then(cache => {
                return Promise.allSettled(
                    EXTERNAL_ASSETS.map(url => cache.add(url))
                );
            })
        ])
    );
    
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('SW: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('SW: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim();
});

// Fetch event - Smart caching strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Handle different types of requests
    if (CORE_ASSETS.some(asset => url.pathname.endsWith(asset))) {
        // Core assets - Cache First strategy
        event.respondWith(cacheFirst(request));
    } else if (url.origin === location.origin) {
        // Same origin - Network First strategy
        event.respondWith(networkFirst(request));
    } else {
        // External resources - Stale While Revalidate
        event.respondWith(staleWhileRevalidate(request));
    }
});

// Cache First strategy (pro kritické zdroje)
async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return getOfflinePage();
    }
}

// Network First strategy (pro HTML stránky)
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }
        
        return getOfflinePage();
    }
}

// Stale While Revalidate (pro externí zdroje)
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    // Fetch in background
    const fetchPromise = fetch(request).then(response => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => cached);
    
    // Return cached version immediately or wait for network
    return cached || fetchPromise;
}

// Offline fallback page
function getOfflinePage() {
    return new Response(`
        <!DOCTYPE html>
        <html lang="cs">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - DVSG</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    text-align: center; 
                    padding: 2rem;
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    color: white;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
                h1 { color: #60a5fa; margin-bottom: 1rem; }
                p { color: #cbd5e1; margin-bottom: 2rem; }
                button { 
                    background: #0891b2; 
                    color: white; 
                    border: none; 
                    padding: 0.75rem 1.5rem; 
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button:hover { background: #0e7490; }
            </style>
        </head>
        <body>
            <div>
                <div class="offline-icon">📡</div>
                <h1>Jste offline</h1>
                <p>Připojení k internetu není k dispozici.<br>Zkuste to znovu, až budete online.</p>
                <button onclick="window.location.reload()">Zkusit znovu</button>
            </div>
        </body>
        </html>
    `, {
        headers: { 'Content-Type': 'text/html' }
    });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Handle offline form submissions when back online
    const formData = await getStoredFormData();
    if (formData) {
        try {
            // Submit form data
            await submitContactForm(formData);
            await clearStoredFormData();
        } catch (error) {
            console.log('Failed to sync contact form:', error);
        }
    }
}

// Push notifications (pro budoucí rozšíření)
self.addEventListener('push', (event) => {
    const options = {
        body: 'Nová zpráva od DVSG',
        icon: '/assets/images/favicon.png',
        badge: '/assets/images/favicon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('DVSG', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll().then(clientList => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});

// Performance monitoring
self.addEventListener('message', (event) => {
    if (event.data.type === 'PERFORMANCE_METRICS') {
        console.log('Performance metrics:', event.data.metrics);
        // Send to analytics if needed
    }
});

console.log('🚀 DVSG Service Worker loaded successfully!');
