// ArtGuard Ultimate - Part 2: Alert Details, Cases, DMCA Flow

// ====================
// ALERT DETAIL - WITH REAL DATA
// ====================
function showAlertDetail(alertId) {
    const alert = APP_STATE.alerts.find(a => a.id === alertId);
    if (!alert) return;
    
    const artwork = APP_STATE.artworks.find(a => a.id === alert.artworkId);
    const container = document.getElementById('appContent');
    
    container.innerHTML = `
        <div style="max-width: 1400px;">
            <button onclick="showAppView('alerts')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back to Alerts
            </button>
            
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                <div>
                    <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Alert Investigation</h1>
                    <p style="color: var(--text-light);">Detailed analysis for ${alert.title}</p>
                </div>
                <div style="padding: 0.5rem 1rem; border-radius: 12px; font-weight: 700; font-size: 1rem; background: ${alert.priority === 'high' ? '#ef4444' : alert.priority === 'medium' ? '#f59e0b' : '#3b82f6'}; color: white;">
                    ${alert.priority.toUpperCase()} PRIORITY
                </div>
            </div>
            
            <!-- Comparison -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Your Original Artwork</h3>
                    <img src="${artwork ? artwork.image : SAMPLE_IMAGES[0]}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 1px solid #bbf7d0;">
                        <div style="margin-bottom: 0.5rem;"><strong>Protection ID:</strong> ${artwork ? artwork.protectionId : 'AG-XXX000'}</div>
                        <div style="margin-bottom: 0.5rem;"><strong>Upload Date:</strong> ${artwork ? new Date(artwork.uploadDate).toLocaleDateString() : '9/25/2025'}</div>
                        <div><strong>Watermark:</strong> <span style="color: #10b981;">✓ Verified</span></div>
                    </div>
                </div>
                
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Detected Copy</h3>
                    <img src="${artwork ? artwork.image : SAMPLE_IMAGES[0]}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem; filter: brightness(0.95) contrast(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <div style="background: #fef2f2; padding: 1rem; border-radius: 8px; border: 1px solid #fecaca;">
                        <div style="margin-bottom: 0.5rem;"><strong>Platform:</strong> ${alert.platform}</div>
                        <div style="margin-bottom: 0.5rem;"><strong>URL:</strong> <a href="${alert.url}" target="_blank" style="color: var(--primary); text-decoration: underline;">${alert.platform}</a></div>
                        <div style="margin-bottom: 0.5rem;"><strong>Posted:</strong> ${alert.timeAgo}</div>
                        ${alert.payout > 0 ? `<div><strong>Price:</strong> <span style="color: #ef4444; font-weight: 700;">$${alert.payout}</span></div>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Match Analysis -->
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.25rem;">Match Analysis</h3>
                    <div style="padding: 0.75rem 1.5rem; background: #ef4444; color: white; border-radius: 12px; font-weight: 700; font-size: 1.5rem;">
                        ${alert.similarity}% MATCH
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                    <div style="text-align: center; padding: 1.5rem; background: var(--light); border-radius: 8px;">
                        <i class="fas fa-fingerprint" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 0.75rem;"></i>
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">Watermark Detected</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">99.8% confidence</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">Matches your protection ID</div>
                    </div>
                    <div style="text-align: center; padding: 1.5rem; background: var(--light); border-radius: 8px;">
                        <i class="fas fa-brain" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 0.75rem;"></i>
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">AI Analysis</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">15/17 features match</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">High confidence match</div>
                    </div>
                    <div style="text-align: center; padding: 1.5rem; background: var(--light); border-radius: 8px;">
                        <i class="fas fa-store" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 0.75rem;"></i>
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">${alert.payout > 0 ? 'Commercial Use' : 'Non-Commercial'}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">${alert.payout > 0 ? 'Selling for $' + alert.payout : 'Personal repost'}</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">${alert.payout > 0 ? 'Potential revenue loss' : 'Attribution missing'}</div>
                    </div>
                </div>
            </div>
            
            <!-- Evidence Package -->
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Evidence Package</h3>
                ${['Original Upload Timestamp', 'Watermark Verification Report', 'Screenshot Evidence', 'Platform & Seller Information'].map(item => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--light); border-radius: 8px; margin-bottom: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-file-alt" style="color: var(--primary);"></i>
                            <strong>${item}</strong>
                        </div>
                        <button onclick="downloadEvidence('${item}')" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                `).join('')}
                <button onclick="downloadAllEvidence('${alert.id}')" style="width: 100%; padding: 1rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 1rem;">
                    <i class="fas fa-download"></i> Download Complete Evidence Package
                </button>
            </div>
            
            <!-- Actions -->
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem;">
                <button onclick="startDMCAWizard('${alert.id}')" style="padding: 1.25rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; font-size: 1.125rem; cursor: pointer;">
                    <i class="fas fa-gavel"></i> Send DMCA Takedown
                </button>
                <button onclick="contactLawyer('${alert.id}')" style="padding: 1.25rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-user-tie"></i> Contact Lawyer
                </button>
                <button onclick="negotiateSettlement('${alert.id}')" style="padding: 1.25rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-handshake"></i> Negotiate
                </button>
            </div>
        </div>
    `;
}

function downloadEvidence(type) {
    showNotification(`Downloading ${type}...`, 'success');
}

function downloadAllEvidence(alertId) {
    showNotification('Downloading complete evidence package...', 'success');
}

// ====================
// DMCA WIZARD - CREATES REAL CASE
// ====================
let currentDMCAAlert = null;
let dmcaStep = 1;

function startDMCAWizard(alertId) {
    currentDMCAAlert = alertId;
    dmcaStep = 1;
    renderDMCAWizard(document.getElementById('appContent'));
}

function renderDMCAWizard(container) {
    const alert = APP_STATE.alerts.find(a => a.id === currentDMCAAlert);
    const artwork = APP_STATE.artworks.find(a => a.id === alert.artworkId);
    
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">DMCA Takedown Wizard</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Complete this 3-step process to file a DMCA takedown</p>
            
            <!-- Progress Bar -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 3rem; position: relative;">
                ${[1, 2, 3].map(step => `
                    <div style="flex: 1; text-align: center; position: relative;">
                        ${step < 3 ? `<div style="position: absolute; top: 20px; left: 50%; width: 100%; height: 2px; background: ${dmcaStep > step ? '#10b981' : 'var(--border)'}; z-index: 0;"></div>` : ''}
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${dmcaStep > step ? '#10b981' : dmcaStep === step ? 'var(--primary)' : 'var(--border)'}; color: white; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 0.5rem; position: relative; z-index: 1;">
                            ${dmcaStep > step ? '✓' : step}
                        </div>
                        <div style="font-size: 0.875rem; color: ${dmcaStep >= step ? 'var(--primary)' : 'var(--text-light)'}; font-weight: ${dmcaStep === step ? '600' : '400'};">
                            ${step === 1 ? 'Verify Info' : step === 2 ? 'Review Notice' : 'Submit'}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                ${renderDMCAStep(alert, artwork)}
            </div>
        </div>
    `;
}

function renderDMCAStep(alert, artwork) {
    switch(dmcaStep) {
        case 1:
            return `
                <h2 style="margin-bottom: 1.5rem;">Step 1: Verify Your Information</h2>
                <form id="dmcaForm1" onsubmit="nextDMCAStep(event)">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Legal Name *</label>
                        <input type="text" id="dmcaName" required value="${APP_STATE.user.name}" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address *</label>
                        <input type="email" id="dmcaEmail" required value="${APP_STATE.user.email}" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Physical Address *</label>
                        <textarea id="dmcaAddress" rows="3" required style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem; font-family: inherit;">123 Artist Street
Creative City, ST 12345
United States</textarea>
                    </div>
                    <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                        <label style="display: flex; align-items: start; gap: 0.75rem; cursor: pointer;">
                            <input type="checkbox" required checked style="margin-top: 0.25rem;">
                            <span>I swear, under penalty of perjury, that I am the copyright owner or authorized to act on behalf of the owner</span>
                        </label>
                    </div>
                    <div style="margin-bottom: 2rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                        <label style="display: flex; align-items: start; gap: 0.75rem; cursor: pointer;">
                            <input type="checkbox" required checked style="margin-top: 0.25rem;">
                            <span>I have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law</span>
                        </label>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" onclick="showAlertDetail('${alert.id}')" style="flex: 1; padding: 1rem; background: white; color: var(--text); border: 2px solid var(--border); border-radius: 12px; font-weight: 600; cursor: pointer;">
                            Cancel
                        </button>
                        <button type="submit" style="flex: 1; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                            Next Step →
                        </button>
                    </div>
                </form>
            `;
        case 2:
            return `
                <h2 style="margin-bottom: 1.5rem;">Step 2: Review DMCA Notice</h2>
                <div style="background: var(--light); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; font-family: 'Courier New', monospace; font-size: 0.9rem; line-height: 1.8; max-height: 400px; overflow-y: auto; border: 1px solid var(--border);">
<strong>Subject:</strong> DMCA Takedown Notice - ${alert.title}

<strong>To:</strong> ${alert.platform} Legal Department

<strong>Date:</strong> ${new Date().toLocaleDateString()}

Dear Sir/Madam,

I am the copyright owner of the following work:

<strong>Original Work Information:</strong>
- Title: "${artwork ? artwork.title : alert.title}"
- Protection ID: ${artwork ? artwork.protectionId : 'AG-XXX000'}
- Upload Date: ${artwork ? new Date(artwork.uploadDate).toLocaleDateString() : '9/25/2025'}
- Watermark Verification: Confirmed

<strong>Infringing Content:</strong>
- Platform: ${alert.platform}
- Infringing URL: ${alert.url}
- Similarity Analysis: ${alert.similarity}% match
- Detection Date: ${alert.createdDate}
${alert.payout > 0 ? `- Commercial Use: Yes (selling for $${alert.payout})` : '- Commercial Use: No'}

<strong>Evidence Attached:</strong>
✓ Original upload timestamp
✓ Watermark verification report
✓ AI similarity analysis (${alert.similarity}% match)
✓ Screenshot documentation
✓ Platform seller information

<strong>Request:</strong>
I hereby request immediate removal of the infringing content identified above. The unauthorized use violates my exclusive rights under copyright law.

I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner.

<strong>Contact Information:</strong>
Name: ${APP_STATE.user.name}
Email: ${APP_STATE.user.email}
Address: 123 Artist Street, Creative City, ST 12345, United States

I look forward to your prompt response.

Sincerely,
${APP_STATE.user.name}
                </div>
                
                <div style="background: #fff7ed; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #fed7aa;">
                    <div style="display: flex; gap: 1rem; align-items: start;">
                        <i class="fas fa-info-circle" style="color: #f59e0b; font-size: 1.25rem; margin-top: 0.25rem;"></i>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">Review Carefully</div>
                            <div style="color: var(--text-light); font-size: 0.875rem;">This legal notice will be sent to ${alert.platform}. Make sure all information is accurate before submitting.</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button onclick="prevDMCAStep()" style="flex: 1; padding: 1rem; background: white; color: var(--text); border: 2px solid var(--border); border-radius: 12px; font-weight: 600; cursor: pointer;">
                        ← Back
                    </button>
                    <button onclick="nextDMCAStep(event)" style="flex: 2; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                        Submit DMCA Notice →
                    </button>
                </div>
            `;
        case 3:
            const trackingId = 'DMCA-' + Date.now().toString().slice(-8);
            return `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;"></i>
                    <h2 style="color: #10b981; margin-bottom: 0.5rem; font-size: 2rem;">DMCA Notice Submitted Successfully!</h2>
                    <p style="color: var(--text-light); margin-bottom: 2rem;">Your takedown notice has been sent to ${alert.platform}</p>
                    
                    <div style="background: var(--light); padding: 2rem; border-radius: 12px; max-width: 500px; margin: 0 auto 2rem; border: 1px solid var(--border);">
                        <h3 style="margin-bottom: 1.5rem; color: var(--dark);">Case Created</h3>
                        <div style="display: grid; gap: 1rem; text-align: left;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Tracking ID:</span>
                                <strong>${trackingId}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Artwork:</span>
                                <strong>${alert.title}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Platform:</span>
                                <strong>${alert.platform}</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Expected Response:</span>
                                <strong>24-48 hours</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Status:</span>
                                <strong style="color: #f59e0b;">⏳ Pending Review</strong>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #eff6ff; padding: 1.5rem; border-radius: 12px; text-align: left; margin-bottom: 2rem; border: 1px solid #bfdbfe;">
                        <h4 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-info-circle" style="color: #3b82f6;"></i>
                            What Happens Next?
                        </h4>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <div style="display: flex; gap: 0.75rem; align-items: start;">
                                <i class="fas fa-check-circle" style="color: #10b981; margin-top: 0.25rem;"></i>
                                <span>Platform receives your notice (Complete)</span>
                            </div>
                            <div style="display: flex; gap: 0.75rem; align-items: start;">
                                <i class="fas fa-spinner fa-spin" style="color: #f59e0b; margin-top: 0.25rem;"></i>
                                <span>Content is reviewed (In Progress)</span>
                            </div>
                            <div style="display: flex; gap: 0.75rem; align-items: start;">
                                <i class="fas fa-circle" style="color: var(--border); margin-top: 0.25rem; font-size: 0.5rem;"></i>
                                <span style="color: var(--text-light);">Infringer is notified</span>
                            </div>
                            <div style="display: flex; gap: 0.75rem; align-items: start;">
                                <i class="fas fa-circle" style="color: var(--border); margin-top: 0.25rem; font-size: 0.5rem;"></i>
                                <span style="color: var(--text-light);">Content removed or counter-notice filed</span>
                            </div>
                            <div style="display: flex; gap: 0.75rem; align-items: start;">
                                <i class="fas fa-circle" style="color: var(--border); margin-top: 0.25rem; font-size: 0.5rem;"></i>
                                <span style="color: var(--text-light);">You receive email updates</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="completeDMCA('${trackingId}')" style="padding: 1rem 2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-gavel"></i> View in Legal Cases
                        </button>
                        <button onclick="showAppView('dashboard')" style="padding: 1rem 2rem; background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 12px; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-home"></i> Back to Dashboard
                        </button>
                    </div>
                </div>
            `;
    }
}

function nextDMCAStep(e) {
    if (e) e.preventDefault();
    
    if (dmcaStep < 3) {
        dmcaStep++;
        renderDMCAWizard(document.getElementById('appContent'));
    }
}

function prevDMCAStep() {
    if (dmcaStep > 1) {
        dmcaStep--;
        renderDMCAWizard(document.getElementById('appContent'));
    }
}

function completeDMCA(trackingId) {
    const alert = APP_STATE.alerts.find(a => a.id === currentDMCAAlert);
    
    // Create new case
    const newCase = {
        id: 'case_' + Date.now(),
        title: alert.title + ' DMCA',
        artworkId: alert.artworkId,
        alertId: alert.id,
        date: new Date().toISOString().split('T')[0],
        type: 'DMCA Takedown',
        status: 'pending',
        recovered: 0,
        trackingId: trackingId,
        platform: alert.platform
    };
    
    APP_STATE.cases.unshift(newCase);
    
    // Update alert status
    alert.status = 'in_progress';
    alert.caseId = newCase.id;
    
    saveToLocalStorage();
    updateAlertBadge();
    
    showAppView('cases');
}

// ====================
// LEGAL CASES - WITH REAL DATA
// ====================
function renderCases(container) {
    const metrics = {
        total: APP_STATE.cases.length,
        pending: APP_STATE.cases.filter(c => c.status === 'pending').length,
        resolved: APP_STATE.cases.filter(c => c.status === 'resolved').length,
        winRate: APP_STATE.cases.length > 0 ? 
            Math.round((APP_STATE.cases.filter(c => c.status === 'resolved').length / APP_STATE.cases.length) * 100) : 0,
        totalRecovered: APP_STATE.cases.reduce((sum, c) => sum + c.recovered, 0)
    };
    
    container.innerHTML = `
        <div style="max-width: 1200px;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Legal Cases</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Track and manage all your copyright cases</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${[
                    { label: 'Total Cases', value: metrics.total, color: '#6366f1' },
                    { label: 'Pending', value: metrics.pending, color: '#f59e0b' },
                    { label: 'Win Rate', value: metrics.winRate + '%', color: '#10b981' },
                    { label: 'Total Recovered', value: '$' + metrics.totalRecovered, color: '#10b981' }
                ].map(stat => `
                    <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: ${stat.color}; margin-bottom: 0.5rem;">${stat.value}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                    <h2>All Cases</h2>
                    <button onclick="showAppView('alerts')" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-plus"></i> New Case from Alert
                    </button>
                </div>
                
                ${APP_STATE.cases.length === 0 ? `
                    <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                        <i class="fas fa-gavel" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>No cases yet. File your first DMCA from alerts.</p>
                    </div>
                ` : APP_STATE.cases.map(case_ => `
                    <div onclick="showCaseDetail('${case_.id}')" style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; cursor: pointer; transition: transform 0.2s; border: 1px solid var(--border);" onmouseover="this.style.transform='translateX(5px)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform='translateX(0)'; this.style.borderColor='var(--border)'">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <div style="font-weight: 600; font-size: 1.1rem; color: var(--dark);">${case_.title}</div>
                            <span style="padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: ${case_.status === 'pending' ? '#f59e0b' : '#10b981'}; color: white;">
                                ${case_.status}
                            </span>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: var(--text-light); font-size: 0.875rem;">
                            <div><strong style="color: var(--text);">Date:</strong> ${new Date(case_.date).toLocaleDateString()}</div>
                            <div><strong style="color: var(--text);">Type:</strong> ${case_.type}</div>
                            <div><strong style="color: var(--text);">Platform:</strong> ${case_.platform || 'N/A'}</div>
                            <div><strong style="color: var(--text);">Recovered:</strong> <span style="color: ${case_.recovered > 0 ? '#10b981' : 'var(--text-light)'}; font-weight: 600;">$${case_.recovered}</span></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showCaseDetail(caseId) {
    const case_ = APP_STATE.cases.find(c => c.id === caseId);
    if (!case_) return;
    
    const artwork = APP_STATE.artworks.find(a => a.id === case_.artworkId);
    const alert = APP_STATE.alerts.find(a => a.id === case_.alertId);
    const container = document.getElementById('appContent');
    
    container.innerHTML = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <button onclick="showAppView('cases')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back to Cases
            </button>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                    <div>
                        <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">${case_.title}</h1>
                        <p style="color: var(--text-light);">${case_.type}</p>
                    </div>
                    <span style="padding: 0.5rem 1rem; border-radius: 12px; font-weight: 700; text-transform: uppercase; background: ${case_.status === 'pending' ? '#f59e0b' : '#10b981'}; color: white; font-size: 1rem;">
                        ${case_.status}
                    </span>
                </div>
                
                ${artwork ? `
                    <div style="margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Related Artwork</h3>
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: var(--light); border-radius: 8px;">
                            <img src="${artwork.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600;">${artwork.title}</div>
                                <div style="color: var(--text-light); font-size: 0.875rem;">Protection ID: ${artwork.protectionId}</div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--border);">
                    <h3 style="margin-bottom: 1rem;">Case Information</h3>
                    <div style="display: grid; gap: 0.75rem;">
                        ${case_.trackingId ? `<div style="display: flex; justify-content: space-between;"><span>Tracking ID:</span><strong>${case_.trackingId}</strong></div>` : ''}
                        <div style="display: flex; justify-content: space-between;"><span>Date Filed:</span><strong>${new Date(case_.date).toLocaleDateString()}</strong></div>
                        <div style="display: flex; justify-content: space-between;"><span>Case Type:</span><strong>${case_.type}</strong></div>
                        ${case_.platform ? `<div style="display: flex; justify-content: space-between;"><span>Platform:</span><strong>${case_.platform}</strong></div>` : ''}
                        <div style="display: flex; justify-content: space-between;"><span>Amount Recovered:</span><strong style="color: ${case_.recovered > 0 ? '#10b981' : 'var(--text-light)'}; font-size: 1.25rem;">$${case_.recovered}</strong></div>
                    </div>
                </div>
                
                <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--border);">
                    <h3 style="margin-bottom: 1.5rem;">Case Timeline</h3>
                    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; margin-top: 0.25rem; flex-shrink: 0;"></div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; color: var(--dark);">Case Filed</div>
                                <div style="color: var(--text-light); font-size: 0.875rem;">${new Date(case_.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <div style="width: 12px; height: 12px; background: ${case_.status === 'resolved' ? '#10b981' : '#f59e0b'}; border-radius: 50%; margin-top: 0.25rem; flex-shrink: 0;"></div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; color: var(--dark);">Evidence Submitted</div>
                                <div style="color: var(--text-light); font-size: 0.875rem;">${new Date(case_.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                        ${case_.status === 'resolved' ? `
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; margin-top: 0.25rem; flex-shrink: 0;"></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--dark);">Settlement Reached</div>
                                    <div style="color: var(--text-light); font-size: 0.875rem;">Amount: $${case_.recovered}</div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; margin-top: 0.25rem; flex-shrink: 0;"></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--dark);">Payment Received</div>
                                    <div style="color: var(--text-light); font-size: 0.875rem;">Completed</div>
                                </div>
                            </div>
                        ` : `
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="width: 12px; height: 12px; background: var(--border); border-radius: 50%; margin-top: 0.25rem; flex-shrink: 0;"></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--text-light);">Awaiting Response</div>
                                    <div style="color: var(--text-light); font-size: 0.875rem;">Expected within 24-48 hours</div>
                                </div>
                            </div>
                        `}
                    </div>
                </div>
                
                <button onclick="downloadCaseEvidence('${case_.id}')" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-download"></i> Download Complete Evidence Package
                </button>
            </div>
        </div>
    `;
}

function downloadCaseEvidence(caseId) {
    showNotification('Evidence package downloaded successfully!', 'success');
}

// ====================
// CONTACT LAWYER
// ====================
function contactLawyer(alertId) {
    const container = document.getElementById('appContent');
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <button onclick="showAlertDetail('${alertId}')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Connect with Legal Counsel</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Our network of specialized IP lawyers is ready to help</p>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <form onsubmit="submitLawyerRequest(event, '${alertId}')">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Your Name *</label>
                        <input type="text" required value="${APP_STATE.user.name}" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
                        <input type="email" required value="${APP_STATE.user.email}" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 123-4567" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Case Description *</label>
                        <textarea rows="5" required style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-family: inherit;">I need legal assistance with a copyright infringement case involving my artwork. The work is being used without authorization on ${APP_STATE.alerts.find(a => a.id === alertId)?.platform}.</textarea>
                    </div>
                    <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i> Request Consultation
                    </button>
                </form>
            </div>
        </div>
    `;
}

function submitLawyerRequest(e, alertId) {
    e.preventDefault();
    showNotification('Lawyer consultation request sent! You will receive a response within 24 hours.', 'success');
    setTimeout(() => showAppView('cases'), 2000);
}

// ====================
// SETTLEMENT NEGOTIATION
// ====================
function negotiateSettlement(alertId) {
    const alert = APP_STATE.alerts.find(a => a.id === alertId);
    const container = document.getElementById('appContent');
    
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <button onclick="showAlertDetail('${alertId}')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Settlement Negotiation</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Calculate fair compensation and send settlement offer</p>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1.5rem;">Compensation Calculator</h3>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Match Similarity: <span id="simValue">${alert.similarity}</span>%</label>
                    <input type="range" min="50" max="100" value="${alert.similarity}" oninput="updateCompensation(this.value)" style="width: 100%; accent-color: var(--primary);">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Use Type</label>
                    <select onchange="updateCompensation()" id="platformType" style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px;">
                        <option value="commercial" ${alert.payout > 0 ? 'selected' : ''}>Commercial Sale</option>
                        <option value="social">Social Media Repost</option>
                        <option value="personal">Personal Use</option>
                    </select>
                </div>
                <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 2rem; border-radius: 12px; text-align: center;">
                    <div style="font-size: 0.875rem; margin-bottom: 0.5rem; opacity: 0.9;">Estimated Fair Compensation</div>
                    <div id="compensationAmount" style="font-size: 3rem; font-weight: 700;">$800 - $1,200</div>
                </div>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-bottom: 1.5rem;">Send Settlement Offer</h3>
                <form onsubmit="sendSettlement(event, '${alertId}')">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Proposed Amount *</label>
                        <input type="number" id="settlementAmount" value="1000" required style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message to Infringer *</label>
                        <textarea rows="5" required style="width: 100%; padding: 0.875rem; border: 2px solid var(--border); border-radius: 8px; font-family: inherit;">I've detected unauthorized use of my copyrighted artwork "${alert.title}" on ${alert.platform}.

To avoid legal action, I'm offering to settle this matter for the amount specified above. This offer includes a license for the current use.

Please respond within 7 business days. If I don't hear back, I will proceed with formal DMCA takedown and potential litigation.

Best regards,
${APP_STATE.user.name}</textarea>
                    </div>
                    <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i> Send Settlement Offer
                    </button>
                </form>
            </div>
        </div>
    `;
    
    updateCompensation(alert.similarity);
}

function updateCompensation(similarity) {
    if (similarity) {
        const el = document.getElementById('simValue');
        if (el) el.textContent = similarity;
    }
    
    const sim = parseInt(document.getElementById('simValue')?.textContent || 94);
    const platform = document.getElementById('platformType')?.value || 'commercial';
    
    let base = platform === 'commercial' ? 2000 : platform === 'social' ? 500 : 200;
    let min = Math.floor(base * (sim / 100) * 0.8);
    let max = Math.floor(base * (sim / 100) * 1.2);
    
    const amountEl = document.getElementById('compensationAmount');
    if (amountEl) {
        amountEl.textContent = `$${min} - $${max}`;
    }
    
    const settlementInput = document.getElementById('settlementAmount');
    if (settlementInput) {
        settlementInput.value = Math.floor((min + max) / 2);
    }
}

function sendSettlement(e, alertId) {
    e.preventDefault();
    
    const alert = APP_STATE.alerts.find(a => a.id === alertId);
    const amount = parseInt(document.getElementById('settlementAmount').value);
    
    // Create settlement case
    const newCase = {
        id: 'case_' + Date.now(),
        title: alert.title + ' Settlement',
        artworkId: alert.artworkId,
        alertId: alert.id,
        date: new Date().toISOString().split('T')[0],
        type: 'Settlement Negotiation',
        status: 'pending',
        recovered: 0,
        proposedAmount: amount,
        platform: alert.platform
    };
    
    APP_STATE.cases.unshift(newCase);
    alert.status = 'negotiating';
    
    saveToLocalStorage();
    
    showNotification('Settlement offer sent successfully!', 'success');
    setTimeout(() => showAppView('cases'), 2000);
}

// ====================
// SUBSCRIPTION
// ====================
function renderSubscription(container) {
    const totalRecovered = APP_STATE.cases.reduce((sum, c) => sum + c.recovered, 0);
    
    container.innerHTML = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">Subscription</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Manage your ArtGuard subscription and billing</p>
            
            <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 2.5rem; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 10px 40px rgba(99,102,241,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem; font-weight: 700;">${APP_STATE.user.plan} Plan</h2>
                        <p style="opacity: 0.9;">Active since September 29, 2025</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 3.5rem; font-weight: 800; line-height: 1;">$29</div>
                        <div style="opacity: 0.9; font-size: 1.125rem;">/month</div>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Your Usage This Month</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--light); border-radius: 8px;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">${APP_STATE.artworks.length}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">Protected Works</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">Limit: 100</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--light); border-radius: 8px;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">${APP_STATE.alerts.length}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">Alerts Detected</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">Unlimited</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--light); border-radius: 8px;">
                        <div style="font-size: 2rem; font-weight: 700; color: #10b981; margin-bottom: 0.25rem;">$${totalRecovered}</div>
                        <div style="color: var(--text-light); font-size: 0.875rem;">Recovered</div>
                        <div style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem;">All time</div>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Plan Features</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    ${['Up to 100 protected works', 'Advanced AI monitoring', 'Instant push alerts', 'Automated DMCA filing', 'Legal network access', 'Priority support'].map(feature => `
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-check-circle" style="color: #10b981;"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Billing Information</h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <span style="color: var(--text-light);">Payment Method</span>
                        <span style="font-weight: 600;">Visa •••• 4242</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <span style="color: var(--text-light);">Next Billing Date</span>
                        <span style="font-weight: 600;">October 29, 2025</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 1rem 0;">
                        <span style="color: var(--text-light);">Billing Amount</span>
                        <span style="font-weight: 600; font-size: 1.25rem; color: var(--primary);">$29.00</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="updatePaymentMethod()" style="flex: 1; padding: 1rem; border: 2px solid var(--primary); background: white; color: var(--primary); border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-credit-card"></i> Update Payment
                </button>
                <button onclick="changePlan()" style="flex: 1; padding: 1rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-sync"></i> Change Plan
                </button>
            </div>
        </div>
    `;
}

function updatePaymentMethod() {
    showNotification('Payment method update would open here', 'info');
}

function changePlan() {
    const container = document.getElementById('appContent');
    container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto;">
            <button onclick="showAppView('subscription')" style="padding: 0.5rem 1rem; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">Choose Your Plan</h1>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
                ${[
                    { name: 'Starter', price: 9, features: ['10 protected works', 'Basic monitoring', 'Email alerts', 'Manual DMCA', 'Email support'] },
                    { name: 'Professional', price: 29, features: ['100 protected works', 'Advanced monitoring', 'Push alerts', 'Auto DMCA', 'Legal network', 'Priority support'], current: true },
                    { name: 'Enterprise', price: 99, features: ['Unlimited works', 'Real-time monitoring', 'Custom alerts', 'Legal counsel', 'API access', '24/7 support'] }
                ].map(plan => `
                    <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); ${plan.current ? 'border: 3px solid var(--primary);' : 'border: 1px solid var(--border);'}; position: relative;">
                        ${plan.current ? '<div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; padding: 0.5rem 1.5rem; border-radius: 20px; font-weight: 600; font-size: 0.875rem;">Current Plan</div>' : ''}
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">${plan.name}</h3>
                        <div style="margin-bottom: 2rem;">
                            <span style="font-size: 3rem; font-weight: 800; color: var(--primary);">$${plan.price}</span>
                            <span style="color: var(--text-light); font-size: 1.125rem;">/month</span>
                        </div>
                        <ul style="list-style: none; margin-bottom: 2rem;">
                            ${plan.features.map(f => `<li style="padding: 0.5rem 0; display: flex; align-items: center; gap: 0.75rem;"><i class="fas fa-check" style="color: #10b981;"></i>${f}</li>`).join('')}
                        </ul>
                        <button onclick="${plan.current ? 'showAppView(\'subscription\')' : 'confirmPlanChange(\'' + plan.name + '\')'}" style="width: 100%; padding: 1rem; ${plan.current ? 'background: var(--border); color: var(--text-light); cursor: not-allowed;' : 'background: var(--primary); color: white; cursor: pointer;'} border: none; border-radius: 12px; font-weight: 600;">
                            ${plan.current ? 'Current Plan' : 'Switch to ' + plan.name}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function confirmPlanChange(planName) {
    APP_STATE.user.plan = planName;
    saveToLocalStorage();
    showNotification(`Successfully switched to ${planName} plan!`, 'success');
    setTimeout(() => showAppView('subscription'), 1500);
}

// ====================
// NOTIFICATION SYSTEM
// ====================
function showNotification(message, type = 'success') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `position: fixed; bottom: 2rem; right: 2rem; background: ${colors[type]}; color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 10000; display: flex; align-items: center; gap: 0.75rem; max-width: 400px; animation: slideIn 0.3s ease;`;
    notification.innerHTML = `<i class="fas fa-${icons[type]}"></i> <span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

console.log('✅ ArtGuard Ultimate Part 2 Loaded!');
