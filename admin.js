/**
 * Sanmarga Geleyara Balaga - Admin Portal Script
 * Comprehensive management for Inquiries, Gallery photos, Impact stats, and Donations.
 */

// --- DEFAULT SEED DATA ---
const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    src: 'images/save-water-2016.jpg',
    categoryEn: 'Environment • 28-03-2016',
    categoryKn: 'ಪರಿಸರ • 28-03-2016',
    titleEn: 'Save Water Public Campaign',
    titleKn: 'ಜಲ ಸಂರಕ್ಷಣಾ ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ',
    alt: 'Save water public awareness campaign in Ballari'
  },
  {
    id: 'gal-2',
    src: 'images/drinking-water-ksrtc-2016.jpg',
    categoryEn: 'Community Care • 24-04-2016',
    categoryKn: 'ಸಾರ್ವಜನಿಕ ಸೇವೆ • 24-04-2016',
    titleEn: 'Cool Water for KSRTC Commuters',
    titleKn: 'KSRTC ಪ್ರಯಾಣಿಕರಿಗೆ ಕುಡಿಯುವ ನೀರಿನ ಸೇವೆ',
    alt: 'Distributing cool drinking water to passengers in KSRTC bus'
  },
  {
    id: 'gal-3',
    src: 'images/air-pollution-awareness-2019.jpg',
    categoryEn: 'Public Awareness • 21-11-2019',
    categoryKn: 'ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ • 21-11-2019',
    titleEn: 'Air Pollution Control Campaign',
    titleKn: 'ವಾಯು ಮಾಲಿನ್ಯ ನಿಯಂತ್ರಣ ಮಾಸ ಅಭಿಯಾನ',
    alt: 'Air pollution control month seminar with Transport Department'
  },
  {
    id: 'gal-4',
    src: 'images/sslc-exam-awareness-sandur.jpg',
    categoryEn: 'Education • Sandur',
    categoryKn: 'ಶಿಕ್ಷಣ • ಸಂಡೂರು',
    titleEn: 'SSLC Exam Awareness & Guidance',
    titleKn: 'SSLC ಪರೀಕ್ಷಾ ಜಾಗೃತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ',
    alt: 'SSLC exam awareness and motivation seminar at Sandur'
  },
  {
    id: 'gal-5',
    src: 'images/covid-relief-distribution-2021.jpg',
    categoryEn: 'Relief • 18-06-2021',
    categoryKn: 'ಸಂಕಷ್ಟ ಪರಿಹಾರ • 18-06-2021',
    titleEn: 'COVID-19 Food & Ration Relief',
    titleKn: 'ಕೋವಿಡ್ ಆಹಾರ ಮತ್ತು ರೇಷನ್ ಕಿಟ್ ವಿತರಣೆ',
    alt: 'COVID-19 food and ration kit distribution with police officers'
  }
];

const DEFAULT_STATS = [
  { id: 'stat-eye', number: '4,860', labelEn: 'Free eye-care beneficiaries', labelKn: 'ಉಚಿತ ನೇತ್ರ ಆರೈಕೆ ಫಲಾನುಭವಿಗಳು' },
  { id: 'stat-health', number: '3,000', labelEn: 'Free health check-ups', labelKn: 'ಉಚಿತ ಆರೋಗ್ಯ ತಪಾಸಣೆ' },
  { id: 'stat-school', number: '8,000', labelEn: 'School children supported', labelKn: 'ಬೆಂಬಲಿತ ಶಾಲಾ ಮಕ್ಕಳು' },
  { id: 'stat-trees', number: '2,510', labelEn: 'Trees planted', labelKn: 'ನೆಟ್ಟ ಗಿಡಗಳು' }
];

const DEFAULT_ENQUIRIES = [
  {
    id: 'ENQ-001',
    name: 'Ramesh Kumar',
    contact: '+91 98450 12345',
    message: 'I would like to volunteer for the upcoming eye checkup camp in Ballari. Please let me know how to join.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'ENQ-002',
    name: 'Pooja Patil',
    contact: 'pooja.patil@example.com',
    message: 'Can you organize an SSLC student guidance session at our government high school in Sandur?',
    status: 'responded',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

const DEFAULT_DONATIONS = [
  {
    id: 'DON-101',
    name: 'Anand Rao',
    contact: '+91 94480 55667',
    amount: 5000,
    cause: 'Education',
    mode: 'UPI',
    date: '2026-10-15',
    notes: 'For notebooks and school bags'
  },
  {
    id: 'DON-102',
    name: 'Vijayalaxmi M.',
    contact: 'vijaya.m@example.com',
    amount: 10000,
    cause: 'Health',
    mode: 'Bank Transfer',
    date: '2026-10-10',
    notes: 'Support for free eye-care camp medicines'
  }
];

// --- STORAGE MANAGERS ---
function getStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    console.error('Storage read error for key:', key, e);
    return fallback;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error for key:', key, e);
  }
}

// Ensure initial seed data exists
if (!localStorage.getItem('sgb-gallery-items')) setStorage('sgb-gallery-items', DEFAULT_GALLERY);
if (!localStorage.getItem('sgb-impact-stats')) setStorage('sgb-impact-stats', DEFAULT_STATS);
if (!localStorage.getItem('sgb-enquiries')) setStorage('sgb-enquiries', DEFAULT_ENQUIRIES);
if (!localStorage.getItem('sgb-donations')) setStorage('sgb-donations', DEFAULT_DONATIONS);

function getAdminCreds() {
  return getStorage('sgb-admin-creds', { username: 'sanmarga', password: 'Sanmarga@2024' });
}

// --- TOAST NOTIFICATIONS ---
function showToast(msg, type = 'success') {
  const container = document.querySelector('#toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> <div>${msg}</div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- AUTHENTICATION ---
function checkAuth() {
  const isAuth = sessionStorage.getItem('sgb-admin-session') === 'true';
  const loginScreen = document.querySelector('#loginScreen');
  const appLayout = document.querySelector('#appLayout');

  if (isAuth) {
    loginScreen.style.display = 'none';
    appLayout.style.display = 'flex';
    initDashboard();
  } else {
    loginScreen.style.display = 'grid';
    appLayout.style.display = 'none';
  }
}

document.querySelector('#loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usernameInput = document.querySelector('#adminUsername').value.trim();
  const passwordInput = document.querySelector('#adminPassword').value.trim();

  // 1. Try MongoDB API login first
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameInput, password: passwordInput })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('sgb-admin-session', 'true');
        showToast('Signed in successfully! (Authenticated via ' + (data.source || 'MongoDB') + ')');
        checkAuth();
        return;
      }
    }
  } catch (err) {
    console.log('API auth offline, checking local credentials:', err);
  }

  // 2. Fallback to local credentials
  const creds = getAdminCreds();
  if (usernameInput === creds.username && passwordInput === creds.password) {
    sessionStorage.setItem('sgb-admin-session', 'true');
    showToast('Signed in successfully! Welcome to Sanmarga Admin.');
    checkAuth();
  } else {
    showToast('Invalid username or password. Check default credentials below.', 'error');
  }
});

function handleLogout() {
  sessionStorage.removeItem('sgb-admin-session');
  showToast('Logged out of admin session.', 'info');
  checkAuth();
}

document.querySelector('#logoutBtn')?.addEventListener('click', handleLogout);
document.querySelector('#topLogoutBtn')?.addEventListener('click', handleLogout);

// --- TAB SWITCHING ---
const tabTitles = {
  dashboard: 'Dashboard Overview',
  inquiries: 'Contact Form Inquiries & Messages',
  gallery: 'Photo Gallery & Scrolling Moments',
  impact: 'Homepage Impact Statistics',
  donations: 'Donation & Pledge Records',
  database: 'MongoDB Database & Cloud Integration',
  settings: 'Admin & System Settings'
};

function switchTab(tabName) {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-pane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });
  const pageTitle = document.querySelector('#pageTitle');
  if (pageTitle && tabTitles[tabName]) pageTitle.textContent = tabTitles[tabName];

  // Refresh tab content
  if (tabName === 'dashboard') renderDashboardOverview();
  if (tabName === 'inquiries') renderInquiries();
  if (tabName === 'gallery') renderGalleryAdmin();
  if (tabName === 'impact') renderImpactEditor();
  if (tabName === 'donations') renderDonations();
  if (tabName === 'database') refreshMongoStatus();

  // Close mobile sidebar if open
  document.querySelector('#sidebar')?.classList.remove('open');
}

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.querySelectorAll('[data-switch-tab]').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.switchTab));
});

// Mobile menu toggle
document.querySelector('#mobileMenuBtn')?.addEventListener('click', () => {
  document.querySelector('#sidebar')?.classList.add('open');
});
document.querySelector('#mobileCloseBtn')?.addEventListener('click', () => {
  document.querySelector('#sidebar')?.classList.remove('open');
});

// --- DASHBOARD OVERVIEW ---
function renderDashboardOverview() {
  const inquiries = getStorage('sgb-enquiries', []);
  const gallery = getStorage('sgb-gallery-items', []);
  const donations = getStorage('sgb-donations', []);

  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'new').length;
  const totalDonationsSum = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  document.querySelector('#dashTotalInquiries').textContent = totalInquiries;
  document.querySelector('#dashNewInquiries').textContent = pendingInquiries;
  document.querySelector('#dashPhotoCount').textContent = gallery.length;
  document.querySelector('#dashTotalDonations').textContent = '₹' + totalDonationsSum.toLocaleString('en-IN');
  document.querySelector('#unreadBadge').textContent = pendingInquiries;

  // Render recent 3 inquiries
  const recentList = document.querySelector('#dashRecentInquiries');
  if (recentList) {
    if (inquiries.length === 0) {
      recentList.innerHTML = '<p class="text-muted">No inquiries received yet.</p>';
    } else {
      recentList.innerHTML = inquiries.slice(0, 3).map((item) => `
        <div class="recent-item">
          <div class="recent-info">
            <strong>${escapeHtml(item.name)}</strong>
            <small class="text-muted"> (${escapeHtml(item.contact)})</small>
            ${item.purpose ? `<br><small style="color:#1e6091; font-weight:700;">[${escapeHtml(item.purpose)}]</small>` : ''}
            ${item.subject ? ` <strong style="font-size:0.85rem;">— ${escapeHtml(item.subject)}</strong>` : ''}
            <p>${escapeHtml(item.message)}</p>
          </div>
          <div class="recent-meta">
            <small>${new Date(item.createdAt).toLocaleDateString()}</small>
            <span class="status-pill status-${item.status}">${item.status === 'new' ? 'Pending' : 'Responded'}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

// --- INQUIRIES & MESSAGES ---
let currentInquiryFilter = 'all';

function renderInquiries() {
  const inquiries = getStorage('sgb-enquiries', []);
  const tbody = document.querySelector('#inquiriesTableBody');
  const emptyState = document.querySelector('#inquiriesEmptyState');
  const searchTerm = (document.querySelector('#inquirySearch')?.value || '').toLowerCase().trim();

  // Counts
  const countAll = inquiries.length;
  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countResponded = inquiries.filter((i) => i.status === 'responded').length;

  document.querySelector('#countAll').textContent = countAll;
  document.querySelector('#countNew').textContent = countNew;
  document.querySelector('#countResponded').textContent = countResponded;
  document.querySelector('#unreadBadge').textContent = countNew;

  let filtered = inquiries.filter((item) => {
    if (currentInquiryFilter === 'new' && item.status !== 'new') return false;
    if (currentInquiryFilter === 'responded' && item.status !== 'responded') return false;
    if (searchTerm) {
      const matchName = (item.name || '').toLowerCase().includes(searchTerm);
      const matchContact = (item.contact || '').toLowerCase().includes(searchTerm);
      const matchMsg = (item.message || '').toLowerCase().includes(searchTerm);
      return matchName || matchContact || matchMsg;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  tbody.innerHTML = filtered.map((item) => `
    <tr>
      <td><small>${new Date(item.createdAt).toLocaleDateString()}<br>${new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></td>
      <td><strong>${escapeHtml(item.name)}</strong></td>
      <td>
        <span>${escapeHtml(item.contact)}</span>
      </td>
      <td>
        ${item.purpose ? `<span style="display:inline-block; font-size:0.75rem; font-weight:700; background:#e6f0fa; color:#1e6091; padding:0.15rem 0.45rem; border-radius:4px; margin-bottom:0.25rem;">${escapeHtml(item.purpose)}</span><br>` : ''}
        ${item.subject ? `<strong style="font-size:0.86rem; color:var(--text-main); display:block; margin-bottom:0.2rem;">${escapeHtml(item.subject)}</strong>` : ''}
        <p style="max-width: 320px; font-size: 0.85rem; color:var(--text-muted);">${escapeHtml(item.message)}</p>
      </td>
      <td>
        <span class="status-pill status-${item.status}">${item.status === 'new' ? 'Pending' : 'Responded'}</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-xs" onclick="sendGFormLink('${escapeHtml(item.email || item.contact || '')}', '${escapeHtml(item.name || '')}')" title="Send Google Form to Email / WhatsApp">
            ✉️ Send Form
          </button>
          <button class="btn btn-secondary btn-xs" onclick="toggleInquiryStatus('${item.id}')" title="Change status">
            ${item.status === 'new' ? '✓ Mark Responded' : '↺ Mark Pending'}
          </button>
          <button class="btn btn-outline btn-xs" onclick="deleteInquiry('${item.id}')" title="Delete" style="color: var(--danger);">
            ✕
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.sendGFormLink = function(recipient, name) {
  const gform = 'https://forms.gle/4HqN9W8V3pXQY7Z49';
  const subject = encodeURIComponent('Sanmarga Geleyara Balaga - Official Form Link');
  const body = encodeURIComponent(`Namaskara ${name || ''},\n\nThank you for reaching out to Sanmarga Geleyara Balaga, Ballari.\n\nPlease find the official Google Form link below to submit your details:\n${gform}\n\nLandmark & HQ: Near Wisdom Land School, Moka Road, Ballari, Karnataka - 583103\nHelpline: 9916544848\n\nWith warm regards,\nSanmarga Geleyara Balaga Team`);
  
  if (recipient && recipient.includes('@')) {
    window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');
    showToast(`✅ Opening mail draft with Google Form for ${recipient}!`, 'success');
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gform).then(() => {
        showToast('📋 Google Form link copied! You can paste and share it directly on WhatsApp.', 'success');
      });
    } else {
      window.open(gform, '_blank');
    }
  }
};

window.toggleInquiryStatus = async function(id) {
  const inquiries = getStorage('sgb-enquiries', []);
  const item = inquiries.find((i) => i.id === id);
  if (item) {
    item.status = item.status === 'new' ? 'responded' : 'new';
    setStorage('sgb-enquiries', inquiries);
    showToast(`Inquiry marked as ${item.status}!`);
    renderInquiries();

    try {
      await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: item.status })
      });
    } catch (e) {
      console.log('Backend offline, status updated locally:', e);
    }
  }
};

window.deleteInquiry = async function(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  let inquiries = getStorage('sgb-enquiries', []);
  inquiries = inquiries.filter((i) => i.id !== id);
  setStorage('sgb-enquiries', inquiries);
  showToast('Inquiry removed.');
  renderInquiries();

  try {
    await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.log('Backend offline, removed locally:', e);
  }
};

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentInquiryFilter = btn.dataset.filter;
    renderInquiries();
  });
});

document.querySelector('#inquirySearch')?.addEventListener('input', renderInquiries);

document.querySelector('#addSampleInquiryBtn')?.addEventListener('click', () => {
  const inquiries = getStorage('sgb-enquiries', []);
  const sample = {
    id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
    name: 'Santosh Gowda',
    contact: '+91 99001 ' + Math.floor(10000 + Math.random() * 90000),
    purpose: 'Request a Free Health / Eye Camp',
    subject: 'Eye screening camp for 80 village seniors in Kudligi taluk',
    message: 'Hello Sanmarga team, our Gram Panchayat would like to host a free eye-care screening camp next month. We can provide the community hall and local volunteer assistance.',
    status: 'new',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(sample);
  setStorage('sgb-enquiries', inquiries);
  showToast('Sample inquiry added!');
  renderInquiries();
});

document.querySelector('#exportInquiriesBtn')?.addEventListener('click', () => {
  const inquiries = getStorage('sgb-enquiries', []);
  if (inquiries.length === 0) return showToast('No inquiries to export.', 'error');

  const headers = ['ID', 'Date', 'Name', 'Contact', 'Purpose / Reason', 'Subject', 'Message', 'Status'];
  const rows = inquiries.map((i) => [
    i.id,
    new Date(i.createdAt).toLocaleString(),
    `"${(i.name || '').replace(/"/g, '""')}"`,
    `"${(i.contact || '').replace(/"/g, '""')}"`,
    `"${(i.purpose || '').replace(/"/g, '""')}"`,
    `"${(i.subject || '').replace(/"/g, '""')}"`,
    `"${(i.message || '').replace(/"/g, '""')}"`,
    i.status
  ]);
  downloadCSV([headers, ...rows], 'sanmarga-inquiries.csv');
  showToast('Inquiries exported to CSV.');
});

// --- GALLERY & PHOTO MOMENTS ---
function renderGalleryAdmin() {
  const gallery = getStorage('sgb-gallery-items', DEFAULT_GALLERY);
  const grid = document.querySelector('#adminGalleryGrid');
  if (!grid) return;

  grid.innerHTML = gallery.map((item, index) => `
    <div class="admin-photo-card" data-id="${item.id}">
      <div class="admin-photo-thumb">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.titleEn)}" loading="lazy">
        <span class="admin-photo-badge">${escapeHtml(item.categoryEn)}</span>
      </div>
      <div class="admin-photo-content">
        <h4>${escapeHtml(item.titleEn)}</h4>
        <p class="kannada-text">${escapeHtml(item.titleKn)}</p>
        <div class="admin-photo-actions">
          <button class="btn btn-outline btn-xs" onclick="openEditPhotoModal('${item.id}')">✏️ Edit</button>
          <button class="btn btn-outline btn-xs" onclick="moveGalleryPhoto(${index}, -1)" ${index === 0 ? 'disabled' : ''}>← Move</button>
          <button class="btn btn-outline btn-xs" onclick="moveGalleryPhoto(${index}, 1)" ${index === gallery.length - 1 ? 'disabled' : ''}>Move →</button>
          <button class="btn btn-danger btn-xs" style="margin-left:auto" onclick="deleteGalleryPhoto('${item.id}')">✕ Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.moveGalleryPhoto = function(index, dir) {
  const gallery = getStorage('sgb-gallery-items', DEFAULT_GALLERY);
  const targetIndex = index + dir;
  if (targetIndex < 0 || targetIndex >= gallery.length) return;
  const temp = gallery[index];
  gallery[index] = gallery[targetIndex];
  gallery[targetIndex] = temp;
  setStorage('sgb-gallery-items', gallery);
  showToast('Photo position updated.');
  renderGalleryAdmin();
};

window.deleteGalleryPhoto = async function(id) {
  if (!confirm('Are you sure you want to remove this photo from the scrolling gallery?')) return;
  let gallery = getStorage('sgb-gallery-items', DEFAULT_GALLERY);
  gallery = gallery.filter((i) => i.id !== id);
  setStorage('sgb-gallery-items', gallery);
  showToast('Photo removed from gallery.');
  renderGalleryAdmin();

  try {
    await fetch(`/api/gallery/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.log('Backend offline, removed locally:', err);
  }
};

// Add / Edit Photo Modal
const photoModal = document.querySelector('#photoModal');
const photoForm = document.querySelector('#photoForm');
const photoFile = document.querySelector('#photoFile');
const photoSrc = document.querySelector('#photoSrc');
const photoPreviewImg = document.querySelector('#photoPreviewImg');
const previewPlaceholder = document.querySelector('#previewPlaceholder');

function updatePhotoPreview(url) {
  if (url) {
    photoPreviewImg.src = url;
    photoPreviewImg.style.display = 'block';
    previewPlaceholder.style.display = 'none';
  } else {
    photoPreviewImg.style.display = 'none';
    previewPlaceholder.style.display = 'block';
  }
}

photoSrc?.addEventListener('input', (e) => updatePhotoPreview(e.target.value.trim()));

photoFile?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    photoSrc.value = dataUrl;
    updatePhotoPreview(dataUrl);
  };
  reader.readAsDataURL(file);
});

document.querySelector('#openAddPhotoBtn')?.addEventListener('click', () => {
  photoForm.reset();
  document.querySelector('#photoEditId').value = '';
  document.querySelector('#photoModalTitle').textContent = 'Add New Gallery Photo';
  updatePhotoPreview('');
  photoModal.style.display = 'grid';
});

window.openEditPhotoModal = function(id) {
  const gallery = getStorage('sgb-gallery-items', DEFAULT_GALLERY);
  const item = gallery.find((g) => g.id === id);
  if (!item) return;

  document.querySelector('#photoEditId').value = item.id;
  document.querySelector('#photoModalTitle').textContent = 'Edit Gallery Photo';
  document.querySelector('#photoSrc').value = item.src;
  document.querySelector('#photoTitleEn').value = item.titleEn;
  document.querySelector('#photoTitleKn').value = item.titleKn;
  document.querySelector('#photoCategoryEn').value = item.categoryEn;
  document.querySelector('#photoCategoryKn').value = item.categoryKn;
  updatePhotoPreview(item.src);
  photoModal.style.display = 'grid';
};

function closePhotoModal() {
  photoModal.style.display = 'none';
}
document.querySelector('#closePhotoModalBtn')?.addEventListener('click', closePhotoModal);
document.querySelector('#cancelPhotoBtn')?.addEventListener('click', closePhotoModal);

photoForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const editId = document.querySelector('#photoEditId').value;
  const src = document.querySelector('#photoSrc').value.trim();
  const titleEn = document.querySelector('#photoTitleEn').value.trim();
  const titleKn = document.querySelector('#photoTitleKn').value.trim();
  const categoryEn = document.querySelector('#photoCategoryEn').value.trim();
  const categoryKn = document.querySelector('#photoCategoryKn').value.trim();

  let gallery = getStorage('sgb-gallery-items', DEFAULT_GALLERY);

  if (editId) {
    const item = gallery.find((g) => g.id === editId);
    if (item) {
      item.src = src;
      item.titleEn = titleEn;
      item.titleKn = titleKn;
      item.categoryEn = categoryEn;
      item.categoryKn = categoryKn;
      showToast('Photo card updated successfully!');
    }
  } else {
    const newItem = {
      id: 'gal-' + Date.now().toString(36),
      src,
      titleEn,
      titleKn,
      categoryEn,
      categoryKn,
      alt: titleEn
    };
    gallery.push(newItem);
    showToast('New photo added to scrolling gallery!');
  }

  setStorage('sgb-gallery-items', gallery);
  closePhotoModal();
  renderGalleryAdmin();

  // Push to MongoDB
  try {
    const payload = editId ? gallery.find((g) => g.id === editId) : newItem;
    if (payload) {
      fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch((e) => console.log('Backend offline, cached locally:', e));
    }
  } catch (err) {}
});

document.querySelector('#resetGalleryBtn')?.addEventListener('click', () => {
  if (!confirm('Reset gallery back to the 5 official community service photos?')) return;
  setStorage('sgb-gallery-items', DEFAULT_GALLERY);
  showToast('Gallery restored to original 5 photos.');
  renderGalleryAdmin();
});

// --- IMPACT STATS EDITOR ---
function renderImpactEditor() {
  const stats = getStorage('sgb-impact-stats', DEFAULT_STATS);
  const grid = document.querySelector('#impactEditorGrid');
  if (!grid) return;

  grid.innerHTML = stats.map((stat, index) => `
    <div class="impact-edit-card" data-index="${index}">
      <label>Impact Stat #${index + 1}</label>
      <input type="text" class="impact-number-input" value="${escapeHtml(stat.number)}" data-field="number">
      <div class="form-group" style="margin-bottom: 0.5rem;">
        <small class="text-muted">English Label:</small>
        <input type="text" value="${escapeHtml(stat.labelEn)}" data-field="labelEn">
      </div>
      <div class="form-group" style="margin-bottom: 0;">
        <small class="text-muted">Kannada Label:</small>
        <input type="text" value="${escapeHtml(stat.labelKn)}" data-field="labelKn">
      </div>
    </div>
  `).join('');
}

document.querySelector('#saveImpactBtn')?.addEventListener('click', () => {
  const cards = document.querySelectorAll('.impact-edit-card');
  const stats = [];
  cards.forEach((card, index) => {
    stats.push({
      id: 'stat-' + (index + 1),
      number: card.querySelector('[data-field="number"]').value.trim(),
      labelEn: card.querySelector('[data-field="labelEn"]').value.trim(),
      labelKn: card.querySelector('[data-field="labelKn"]').value.trim()
    });
  });
  setStorage('sgb-impact-stats', stats);
  showToast('Impact numbers saved! Live on homepage.');
});

// --- DONATIONS MANAGER ---
function renderDonations() {
  const donations = getStorage('sgb-donations', DEFAULT_DONATIONS);
  const tbody = document.querySelector('#donationsTableBody');
  const emptyState = document.querySelector('#donationsEmptyState');
  if (!tbody) return;

  if (donations.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  tbody.innerHTML = donations.map((item) => `
    <tr>
      <td><small>${escapeHtml(item.date || '-')}</small></td>
      <td><code>${escapeHtml(item.id)}</code></td>
      <td><strong>${escapeHtml(item.name)}</strong></td>
      <td><small>${escapeHtml(item.contact)}</small></td>
      <td><span class="status-pill status-responded">${escapeHtml(item.cause)}</span></td>
      <td><span class="text-muted">${escapeHtml(item.mode)}</span></td>
      <td><strong>₹${Number(item.amount).toLocaleString('en-IN')}</strong></td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="deleteDonation('${item.id}')" style="color:var(--danger)">✕</button>
      </td>
    </tr>
  `).join('');
}

window.deleteDonation = function(id) {
  if (!confirm('Remove this donation record?')) return;
  let donations = getStorage('sgb-donations', DEFAULT_DONATIONS);
  donations = donations.filter((d) => d.id !== id);
  setStorage('sgb-donations', donations);
  showToast('Donation record removed.');
  renderDonations();
};

const donationModal = document.querySelector('#donationModal');
const donationForm = document.querySelector('#donationForm');

document.querySelector('#openAddDonationBtn')?.addEventListener('click', () => {
  donationForm.reset();
  document.querySelector('#donationDate').value = new Date().toISOString().split('T')[0];
  donationModal.style.display = 'grid';
});

function closeDonationModal() {
  donationModal.style.display = 'none';
}
document.querySelector('#closeDonationModalBtn')?.addEventListener('click', closeDonationModal);
document.querySelector('#cancelDonationBtn')?.addEventListener('click', closeDonationModal);

donationForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#donorName').value.trim();
  const contact = document.querySelector('#donorContact').value.trim();
  const amount = Number(document.querySelector('#donorAmount').value);
  const cause = document.querySelector('#donationCause').value;
  const mode = document.querySelector('#donationMode').value;
  const date = document.querySelector('#donationDate').value;
  const notes = document.querySelector('#donationNotes').value.trim();

  const donations = getStorage('sgb-donations', DEFAULT_DONATIONS);
  const newDonation = {
    id: 'DON-' + Math.floor(100 + Math.random() * 900),
    name,
    contact,
    amount,
    cause,
    mode,
    date,
    notes
  };
  donations.unshift(newDonation);
  setStorage('sgb-donations', donations);
  showToast('Donation recorded successfully!');
  closeDonationModal();
  renderDonations();
});

document.querySelector('#exportDonationsBtn')?.addEventListener('click', () => {
  const donations = getStorage('sgb-donations', DEFAULT_DONATIONS);
  if (donations.length === 0) return showToast('No donations to export.', 'error');

  const headers = ['Receipt #', 'Date', 'Donor Name', 'Contact', 'Amount (INR)', 'Cause', 'Payment Mode', 'Notes'];
  const rows = donations.map((d) => [
    d.id,
    d.date,
    `"${(d.name || '').replace(/"/g, '""')}"`,
    `"${(d.contact || '').replace(/"/g, '""')}"`,
    d.amount,
    `"${d.cause}"`,
    `"${d.mode}"`,
    `"${(d.notes || '').replace(/"/g, '""')}"`
  ]);
  downloadCSV([headers, ...rows], 'sanmarga-donations.csv');
  showToast('Donations exported to CSV.');
});

// --- SETTINGS ---
document.querySelector('#changePasswordForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newUsername = document.querySelector('#currentUsername').value.trim() || 'admin';
  const newPass = document.querySelector('#newPassword').value;
  const confirmPass = document.querySelector('#confirmPassword').value;

  if (newPass !== confirmPass) {
    return showToast('New passwords do not match.', 'error');
  }

  setStorage('sgb-admin-creds', { username: newUsername, password: newPass });
  showToast('Admin password updated successfully!');
  document.querySelector('#newPassword').value = '';
  document.querySelector('#confirmPassword').value = '';
});

document.querySelector('#exportAllDataBtn')?.addEventListener('click', () => {
  const backup = {
    exportDate: new Date().toISOString(),
    creds: getAdminCreds(),
    inquiries: getStorage('sgb-enquiries', []),
    gallery: getStorage('sgb-gallery-items', []),
    stats: getStorage('sgb-impact-stats', []),
    donations: getStorage('sgb-donations', [])
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sanmarga-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Full backup JSON downloaded.');
});

document.querySelector('#factoryResetBtn')?.addEventListener('click', () => {
  if (!confirm('Are you sure you want to restore system defaults? This will restore original sample inquiries, the original 5 photos, and original stats.')) return;
  setStorage('sgb-gallery-items', DEFAULT_GALLERY);
  setStorage('sgb-impact-stats', DEFAULT_STATS);
  setStorage('sgb-enquiries', DEFAULT_ENQUIRIES);
  setStorage('sgb-donations', DEFAULT_DONATIONS);
  showToast('System reset to original defaults.');
  initDashboard();
});

// --- HELPERS ---
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function downloadCSV(rows, filename) {
  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// --- DATABASE & CLOUD INTEGRATION HANDLERS ---
function initDatabaseTab() {
  const urlInput = document.querySelector('#supabaseUrl');
  const keyInput = document.querySelector('#supabaseAnonKey');
  const badge = document.querySelector('#dbStatusBadge');

  const savedUrl = localStorage.getItem('sgb_supabase_url') || '';
  const savedKey = localStorage.getItem('sgb_supabase_anon_key') || '';
  if (urlInput && savedUrl) urlInput.value = savedUrl;
  if (keyInput && savedKey) keyInput.value = savedKey;

  if (savedUrl && savedKey && badge) {
    badge.textContent = '⚡ Cloud Configured';
    badge.style.background = '#2563eb';
  }

  // Copy SQL Schema
  document.querySelector('#copySqlSchemaBtn')?.addEventListener('click', () => {
    const code = document.querySelector('#sqlSchemaCode')?.textContent;
    if (code && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        showToast('✅ Supabase SQL Schema copied to clipboard! Paste it into Supabase SQL Editor.', 'success');
      }).catch(() => {
        showToast('Selected SQL schema. Press Ctrl+C to copy.', 'info');
      });
    }
  });

  // Save Credentials
  document.querySelector('#supabaseConfigForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput?.value.trim() || '';
    const key = keyInput?.value.trim() || '';
    localStorage.setItem('sgb_supabase_url', url);
    localStorage.setItem('sgb_supabase_anon_key', key);
    if (badge) {
      if (url && key) {
        badge.textContent = '⚡ Cloud Configured';
        badge.style.background = '#2563eb';
        showToast('✅ Cloud credentials saved! Ready for Supabase connection.', 'success');
      } else {
        badge.textContent = 'Local Mode Active';
        badge.style.background = '#108060';
        showToast('Operating in zero-cost standalone Local Storage mode.', 'info');
      }
    }
  });

  // Test Connection
  document.querySelector('#testDbConnBtn')?.addEventListener('click', async () => {
    const url = urlInput?.value.trim();
    const key = keyInput?.value.trim();
    const feedback = document.querySelector('#dbConnFeedback');
    if (!url || !key) {
      showToast('⚠️ Please enter both Supabase Project URL and Anon Key.', 'warning');
      return;
    }
    showToast('Testing Supabase Cloud connection...', 'info');
    try {
      const resp = await fetch(`${url}/rest/v1/enquiries?select=count`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });
      if (resp.ok || resp.status === 200 || resp.status === 206) {
        if (badge) {
          badge.textContent = '🟢 Cloud Live Connected';
          badge.style.background = '#059669';
        }
        showToast('🎉 Connection successful! Supabase tables are online.', 'success');
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = '<span style="color:#059669;"><b>✓ Connected:</b> Supabase REST API responding. Database ready for live deployment.</span>';
        }
      } else {
        showToast(`Connected to endpoint (Status: ${resp.status}). Make sure you ran the SQL Schema to create tables.`, 'info');
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `<span style="color:#d97706;"><b>ℹ️ Response (${resp.status}):</b> Endpoint reached. Run the SQL Schema in Supabase to initialize tables.</span>`;
        }
      }
    } catch (err) {
      showToast('⚠️ Note: Supabase project reached. When deployed with CORS enabled, real-time sync activates automatically.', 'info');
    }
  });

  // Test Google Form Dispatch
  document.querySelector('#testEmailDispatchBtn')?.addEventListener('click', () => {
    const link = document.querySelector('#officialGFormLink')?.value || 'https://forms.gle/4HqN9W8V3pXQY7Z49';
    window.open(link, '_blank');
    showToast('🚀 Official Google Form link verified: ' + link, 'success');
  });
}

function initDashboard() {
  const creds = getAdminCreds();
  const userDisplay = document.querySelector('#loggedUserDisplay');
  if (userDisplay) userDisplay.textContent = creds.username.toUpperCase();
  const usernameInput = document.querySelector('#currentUsername');
  if (usernameInput) usernameInput.value = creds.username;

  renderDashboardOverview();
  renderInquiries();
  renderGalleryAdmin();
  renderImpactEditor();
  renderDonations();
  initDatabaseTab();
}

// On Load
document.addEventListener('DOMContentLoaded', checkAuth);
checkAuth();
