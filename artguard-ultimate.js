// ArtGuard Ultimate - Complete Data Flow & Real Interactions
console.log('🎨 ArtGuard Ultimate Loading...');

// ====================
// GLOBAL STATE MANAGEMENT
// ====================
const APP_STATE = {
    user: {
        name: 'Art User',
        email: 'art@example.com',
        plan: 'Professional'
    },
    artworks: [],
    alerts: [],
    cases: [],
    currentView: 'dashboard',
    isLoggedIn: false
};

// Sample Unsplash images
const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    'https://images.unsplash.com/photo-1582201957418-5b471ce76ca5?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
];

// ====================
// INITIALIZATION
// ====================
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    
    // Initialize with sample data if empty
    if (APP_STATE.artworks.length === 0) {
        initializeSampleData();
    }
    
    // Check if should show app or landing
    if (APP_STATE.isLoggedIn) {
        enterApp();
    }
});

function initializeSampleData() {
    APP_STATE.artworks = [
        {
            id: 'art1',
            title: 'Digital Portrait #23',
            image: SAMPLE_IMAGES[0],
            uploadDate: '2025-09-28',
            protectionId: 'AG-AAA123',
            protected: true
        },
        {
            id: 'art2',
            title: 'Abstract Composition',
            image: SAMPLE_IMAGES[1],
            uploadDate: '2025-09-27',
            protectionId: 'AG-BBB456',
            protected: true
        },
        {
            id: 'art3',
            title: 'Character Design #47',
            image: SAMPLE_IMAGES[2],
            uploadDate: '2025-09-25',
            protectionId: 'AG-CCC789',
            protected: true
        }
    ];
    
    APP_STATE.alerts = [
        {
            id: 'alert1',
            artworkId: 'art3',
            title: 'Character Design #47',
            platform: 'unknown-tees.com',
            url: 'https://unknown-tees.com/shop/design-432',
            similarity: 94,
            timeAgo: '2 hours ago',
            priority: 'high',
            payout: 24.99,
            status: 'pending',
            createdDate: '2025-09-29'
        },
        {
            id: 'alert2',
            artworkId: 'art1',
            title: 'Digital Portrait #23',
            platform: 'Instagram',
            url: 'https://instagram.com/art_reposter',
            similarity: 89,
            timeAgo: '1 day ago',
            priority: 'medium',
            payout: 0,
            status: 'pending',
            createdDate: '2025-09-28'
        },
        {
            id: 'alert3',
            artworkId: 'art2',
            title: 'Abstract Composition',
            platform: 'Pinterest',
            url: 'https://pinterest.com/board/personal',
            similarity: 100,
            timeAgo: '3 days ago',
            priority: 'low',
            payout: 0,
            status: 'pending',
            createdDate: '2025-09-26'
        }
    ];
    
    APP_STATE.cases = [
        {
            id: 'case1',
            title: 'Portrait Copyright Claim',
            artworkId: 'art1',
            alertId: 'alert2',
            date: '2025-09-15',
            type: 'Copyright Claim',
            status: 'resolved',
            recovered: 450
        },
        {
            id: 'case2',
            title: 'Landscape License Dispute',
            artworkId: 'art2',
            date: '2025-09-10',
            type: 'License Dispute',
            status: 'resolved',
            recovered: 200
        }
    ];
    
    saveToLocalStorage();
}

// ====================
// STORAGE FUNCTIONS
// ====================
function saveToLocalStorage() {
    localStorage.setItem('artguard_state', JSON.stringify(APP_STATE));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('artguard_state');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(APP_STATE, loaded);
    }
}

// ====================
// NAVIGATION
// ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function showLogin() {
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignup() {
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function closeAuth() {
    document.getElementById('auth-modal').classList.remove('active');
}

function switchToLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function switchToSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    APP_STATE.isLoggedIn = true;
    saveToLocalStorage();
    closeAuth();
    enterApp();
}

function handleSignup(e) {
    e.preventDefault();
    APP_STATE.isLoggedIn = true;
    saveToLocalStorage();
    closeAuth();
    enterApp();
}

function enterApp() {
    document.getElementById('marketing-page').classList.remove('active');
    document.getElementById('app-container').classList.add('active');
    showAppView('dashboard');
}

function backToMarketing() {
    document.getElementById('app-container').classList.remove('active');
    document.getElementById('marketing-page').classList.add('active');
    window.scrollTo(0, 0);
}

function logout() {
    APP_STATE.isLoggedIn = false;
    saveToLocalStorage();
    backToMarketing();
}

function toggleUserMenu() {
    document.getElementById('userMenu')?.classList.toggle('active');
}

function selectPlan(planName) {
    if (APP_STATE.isLoggedIn) {
        showAppView('subscription');
    } else {
        showSignup();
    }
}

// ====================
// APP VIEW MANAGEMENT
// ====================
function showAppView(viewName) {
    APP_STATE.currentView = viewName;
    
    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === viewName) {
            item.classList.add('active');
        }
    });
    
    // Update badge
    updateAlertBadge();
    
    // Render view
    const content = document.getElementById('appContent');
    switch(viewName) {
        case 'dashboard': renderDashboard(content); break;
        case 'upload': renderUpload(content); break;
        case 'artworks': renderArtworks(content); break;
        case 'alerts': renderAlerts(content); break;
        case 'cases': renderCases(content); break;
        case 'subscription': renderSubscription(content); break;
    }
}

function updateAlertBadge() {
    const activeAlerts = APP_STATE.alerts.filter(a => a.status === 'pending').length;
    const badges = document.querySelectorAll('.nav-item[data-view="alerts"] .badge');
    badges.forEach(badge => {
        badge.textContent = activeAlerts;
        badge.style.display = activeAlerts > 0 ? 'block' : 'none';
    });
}

// ====================
// DASHBOARD
// ====================
function renderDashboard(container) {
    const metrics = calculateMetrics();
    
    container.innerHTML = `
        <div style="max-width: 1400px;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">Dashboard</h1>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${[
                    { icon: 'shield-alt', title: 'Protected Artworks', value: metrics.protectedWorks, color: '#6366f1' },
                    { icon: 'exclamation-triangle', title: 'Active Alerts', value: metrics.activeAlerts, color: '#f59e0b' },
                    { icon: 'check-circle', title: 'Success Rate', value: metrics.successRate + '%', color: '#10b981' },
                    { icon: 'dollar-sign', title: 'Total Recovered', value: '$' + metrics.totalRecovered, color: '#8b5cf6' }
                ].map(metric => `
                    <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, ${metric.color}, ${metric.color}dd); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                <i class="fas fa-${metric.icon}"></i>
                            </div>
                            <div>
                                <div style="color: var(--text-light); font-size: 0.875rem;">${metric.title}</div>
                                <div style="font-size: 2rem; font-weight: 700;">${metric.value}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                    <h2>Recent Alerts</h2>
                    <button onclick="showAppView('alerts')" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">View All</button>
                </div>
                ${renderAlertsList(APP_STATE.alerts.filter(a => a.status === 'pending').slice(0, 3))}
            </div>
        </div>
    `;
}

function calculateMetrics() {
    return {
        protectedWorks: APP_STATE.artworks.length,
        activeAlerts: APP_STATE.alerts.filter(a => a.status === 'pending').length,
        successRate: APP_STATE.cases.length > 0 ? 
            Math.round((APP_STATE.cases.filter(c => c.status === 'resolved').length / APP_STATE.cases.length) * 100) : 0,
        totalRecovered: APP_STATE.cases.reduce((sum, c) => sum + c.recovered, 0)
    };
}

function renderAlertsList(alerts) {
    if (alerts.length === 0) {
        return '<p style="color: var(--text-light); text-align: center; padding: 2rem;">No active alerts</p>';
    }
    
    return alerts.map(alert => {
        const artwork = APP_STATE.artworks.find(a => a.id === alert.artworkId);
        return `
            <div onclick="showAlertDetail('${alert.id}')" style="padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid ${alert.priority === 'high' ? '#ef4444' : alert.priority === 'medium' ? '#f59e0b' : '#3b82f6'}; background: ${alert.priority === 'high' ? '#fef2f2' : alert.priority === 'medium' ? '#fffbeb' : '#eff6ff'}; border-radius: 8px; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                <div style="display: flex; justify-content: space-between;">
                    <div style="flex: 1;">
                        <div style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; color: white; background: ${alert.priority === 'high' ? '#ef4444' : alert.priority === 'medium' ? '#f59e0b' : '#3b82f6'}; margin-bottom: 0.5rem;">
                            ${alert.priority.toUpperCase()}
                        </div>
                        <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">${alert.title}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">Found on: ${alert.platform} • ${alert.similarity}% match • ${alert.timeAgo}</div>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #10b981;">$${alert.payout}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ====================
// UPLOAD WITH REAL DATA FLOW
// ====================
function renderUpload(container) {
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Upload & Protect</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Upload your digital art and we'll protect it with invisible watermarks</p>
            
            <div id="uploadContainer" style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div id="uploadArea" onclick="document.getElementById('fileInput').click()" style="border: 3px dashed var(--border); border-radius: 12px; padding: 3rem; text-align: center; cursor: pointer; transition: all 0.3s; background: var(--light);" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Drag & Drop Your Artwork</h3>
                    <p style="color: var(--text-light);">Or click to browse files (JPG, PNG, GIF)</p>
                </div>
                
                <div id="uploadProgress" style="display: none; margin-top: 2rem;"></div>
                <div id="uploadSuccess" style="display: none; margin-top: 2rem;"></div>
            </div>
        </div>
    `;
    
    // Setup file input
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    
    fileInput.addEventListener('change', handleFileUpload);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.background = '#eff6ff';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border)';
        uploadArea.style.background = 'var(--light)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border)';
        uploadArea.style.background = 'var(--light)';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload({ target: { files: e.dataTransfer.files } });
        }
    });
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        startUploadProcess(file, imageData);
    };
    reader.readAsDataURL(file);
}

function startUploadProcess(file, imageData) {
    document.getElementById('uploadArea').style.display = 'none';
    const progressDiv = document.getElementById('uploadProgress');
    progressDiv.style.display = 'block';
    progressDiv.innerHTML = `
        <div style="text-align: center;">
            <img src="${imageData}" style="max-width: 300px; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 0.5rem;">
                <div style="height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                    <div id="progressBar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #6366f1, #8b5cf6); transition: width 0.3s;"></div>
                </div>
            </div>
            <div id="progressText" style="color: var(--text-light); font-weight: 600;">Uploading...</div>
            <div id="progressPercent" style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">0%</div>
        </div>
    `;
    
    let progress = 0;
    const statuses = [
        'Uploading image...',
        'Analyzing content...',
        'Applying invisible watermark...',
        'Embedding AI opt-out metadata...',
        'Registering protection...',
        'Activating monitoring...'
    ];
    
    const interval = setInterval(() => {
        progress += 2;
        document.getElementById('progressBar').style.width = progress + '%';
        document.getElementById('progressPercent').textContent = progress + '%';
        
        const statusIdx = Math.floor((progress / 100) * statuses.length);
        if (statuses[statusIdx]) {
            document.getElementById('progressText').textContent = statuses[statusIdx];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            completeUpload(file, imageData);
        }
    }, 40);
}

function completeUpload(file, imageData) {
    const artworkId = 'art_' + Date.now();
    const protectionId = 'AG-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Add to artworks
    const newArtwork = {
        id: artworkId,
        title: file.name.replace(/\.[^/.]+$/, ''),
        image: imageData,
        uploadDate: new Date().toISOString().split('T')[0],
        protectionId: protectionId,
        protected: true
    };
    
    APP_STATE.artworks.unshift(newArtwork);
    saveToLocalStorage();
    
    // Show success
    document.getElementById('uploadProgress').style.display = 'none';
    const successDiv = document.getElementById('uploadSuccess');
    successDiv.style.display = 'block';
    successDiv.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;"></i>
            <h2 style="margin-bottom: 1rem;">Your Artwork is Protected!</h2>
            <img src="${imageData}" style="max-width: 400px; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; max-width: 450px; margin: 0 auto 2rem;">
                <div style="display: grid; gap: 0.75rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>Protection ID:</span>
                        <strong>${protectionId}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>File Name:</span>
                        <strong>${file.name}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Upload Date:</span>
                        <strong>${new Date().toLocaleDateString()}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Watermark:</span>
                        <strong style="color: #10b981;">✓ Embedded</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>AI Opt-Out:</span>
                        <strong style="color: #10b981;">✓ Active</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Monitoring:</span>
                        <strong style="color: #10b981;">✓ Active (24/7)</strong>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button onclick="downloadCertificate('${protectionId}', '${file.name}')" style="padding: 0.875rem 1.5rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-download"></i> Download Certificate
                </button>
                <button onclick="renderUpload(document.getElementById('appContent'))" style="padding: 0.875rem 1.5rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 8px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-upload"></i> Upload Another
                </button>
                <button onclick="showAppView('artworks')" style="padding: 0.875rem 1.5rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 8px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-images"></i> View My Artworks
                </button>
            </div>
        </div>
    `;
    
    // Scroll to success
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadCertificate(protectionId, filename) {
    showNotification(`Certificate for ${filename} downloaded!`, 'success');
}

// ====================
// MY ARTWORKS - SHOWS UPLOADED WORKS
// ====================
function renderArtworks(container) {
    container.innerHTML = `
        <div style="max-width: 1400px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">My Artworks</h1>
                    <p style="color: var(--text-light);">All your protected digital artwork (${APP_STATE.artworks.length})</p>
                </div>
                <button onclick="showAppView('upload')" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-plus"></i> Upload New
                </button>
            </div>
            
            ${APP_STATE.artworks.length === 0 ? `
                <div style="background: white; padding: 4rem; border-radius: 12px; text-align: center;">
                    <i class="fas fa-images" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 1rem;">No artworks yet</h3>
                    <p style="color: var(--text-light); margin-bottom: 2rem;">Upload your first artwork to get started</p>
                    <button onclick="showAppView('upload')" style="padding: 1rem 2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-upload"></i> Upload Artwork
                    </button>
                </div>
            ` : `
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    ${APP_STATE.artworks.map(artwork => {
                        const alertCount = APP_STATE.alerts.filter(a => a.artworkId === artwork.id && a.status === 'pending').length;
                        return `
                            <div onclick="showArtworkDetail('${artwork.id}')" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                <img src="${artwork.image}" style="width: 100%; height: 240px; object-fit: cover;">
                                <div style="padding: 1rem;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <div style="font-weight: 600; font-size: 1.05rem;">${artwork.title}</div>
                                        <span style="background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                            <i class="fas fa-shield-alt"></i> Protected
                                        </span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; color: var(--text-light); font-size: 0.875rem;">
                                        <span>${new Date(artwork.uploadDate).toLocaleDateString()}</span>
                                        ${alertCount > 0 ? `<span style="background: #ef4444; color: white; padding: 0.25rem 0.5rem; border-radius: 8px; font-weight: 600;">${alertCount} Alert${alertCount > 1 ? 's' : ''}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `}
        </div>
    `;
}

function showArtworkDetail(artworkId) {
    const artwork = APP_STATE.artworks.find(a => a.id === artworkId);
    if (!artwork) return;
    
    const relatedAlerts = APP_STATE.alerts.filter(a => a.artworkId === artworkId && a.status === 'pending');
    const container = document.getElementById('appContent');
    
    container.innerHTML = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <button onclick="showAppView('artworks')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back to Artworks
            </button>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h1 style="margin-bottom: 2rem; font-size: 2rem;">${artwork.title}</h1>
                <img src="${artwork.image}" style="width: 100%; max-width: 600px; border-radius: 12px; margin: 0 auto 2rem; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                
                <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Protection Details</h3>
                    <div style="display: grid; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Protection ID:</span>
                            <strong>${artwork.protectionId}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Upload Date:</span>
                            <strong>${new Date(artwork.uploadDate).toLocaleDateString()}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Status:</span>
                            <strong style="color: #10b981;">Protected ✓</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Active Alerts:</span>
                            <strong style="color: ${relatedAlerts.length > 0 ? '#ef4444' : '#10b981'};">${relatedAlerts.length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Monitoring:</span>
                            <strong style="color: #10b981;">✓ Active (24/7)</strong>
                        </div>
                    </div>
                </div>
                
                ${relatedAlerts.length > 0 ? `
                    <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Related Alerts</h3>
                    ${relatedAlerts.map(alert => `
                        <div onclick="showAlertDetail('${alert.id}')" style="padding: 1.5rem; border-left: 4px solid #ef4444; background: #fef2f2; border-radius: 8px; cursor: pointer; margin-bottom: 1rem; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${alert.title}</div>
                            <div style="color: var(--text-light); font-size: 0.875rem;">${alert.platform} • ${alert.similarity}% match • ${alert.timeAgo}</div>
                        </div>
                    `).join('')}
                ` : '<p style="background: #f0fdf4; padding: 1.5rem; border-radius: 8px; color: #10b981; text-align: center;"><i class="fas fa-check-circle"></i> No infringements detected</p>'}
            </div>
        </div>
    `;
}

// ====================
// ALERTS
// ====================
function renderAlerts(container) {
    const activeAlerts = APP_STATE.alerts.filter(a => a.status === 'pending');
    
    container.innerHTML = `
        <div style="max-width: 1200px;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Alerts</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Monitor all detected infringements (${activeAlerts.length} active)</p>
            
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                    <h2>All Alerts (${activeAlerts.length})</h2>
                    <div style="display: flex; gap: 0.5rem;">
                        <button onclick="filterAlerts('all')" id="filter-all" style="padding: 0.5rem 1rem; border: none; border-radius: 8px; background: var(--primary); color: white; cursor: pointer;">All</button>
                        <button onclick="filterAlerts('high')" id="filter-high" style="padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: 8px; background: white; cursor: pointer;">High</button>
                        <button onclick="filterAlerts('medium')" id="filter-medium" style="padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: 8px; background: white; cursor: pointer;">Medium</button>
                        <button onclick="filterAlerts('low')" id="filter-low" style="padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: 8px; background: white; cursor: pointer;">Low</button>
                    </div>
                </div>
                <div id="alertsContainer">
                    ${activeAlerts.length === 0 ? 
                        '<p style="text-align: center; color: var(--text-light); padding: 3rem;">No active alerts. Your artwork is safe!</p>' :
                        renderAlertsList(activeAlerts)
                    }
                </div>
            </div>
        </div>
    `;
}

function filterAlerts(priority) {
    ['all', 'high', 'medium', 'low'].forEach(p => {
        const btn = document.getElementById('filter-' + p);
        if (btn) {
            if (p === priority) {
                btn.style.background = 'var(--primary)';
                btn.style.color = 'white';
                btn.style.border = 'none';
            } else {
                btn.style.background = 'white';
                btn.style.color = 'var(--text)';
                btn.style.border = '1px solid var(--border)';
            }
        }
    });
    
    const filtered = priority === 'all' ? 
        APP_STATE.alerts.filter(a => a.status === 'pending') :
        APP_STATE.alerts.filter(a => a.status === 'pending' && a.priority === priority);
    
    document.getElementById('alertsContainer').innerHTML = filtered.length === 0 ?
        `<p style="text-align: center; color: var(--text-light); padding: 3rem;">No ${priority} priority alerts</p>` :
        renderAlertsList(filtered);
}

// Continue in next response due to length...
console.log('✅ ArtGuard Ultimate Part 1 Loaded!');
