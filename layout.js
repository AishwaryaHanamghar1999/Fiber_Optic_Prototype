
// Shared UI layout injector
const sharedLayout = {
  login: `<div id="login-screen">
    <div class="login-card">
      <div style="margin-bottom: 1.5rem;">
        <i class="fa-solid fa-network-wired" style="font-size: 2.5rem; color: var(--accent);"></i>
      </div>
      <h2>OFP Operations Portal</h2>
      <p class="subtitle">Unified Access & Real-time Resource Hub</p>

      <div class="login-form">
        <div class="login-group">
          <label for="username">Username / Role</label>
          <div class="login-input-wrapper">
            <i class="fa-solid fa-user"></i>
            <input type="text" id="username" placeholder="Enter username">
          </div>
        </div>`,
  sidebar: `<!-- Sidebar Overlay Backdrop -->
    <div id="sidebar-overlay" class="sidebar-overlay hidden"></div>

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        <i class="fa-solid fa-circle-nodes logo-icon"></i>
        <span class="logo-text">OFP Portal</span>
        <button id="mobile-sidebar-close" class="btn-sidebar-close" title="Close Menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <ul class="sidebar-menu">
        <li class="menu-item active" id="menu-dashboard">
          <a onclick="navigateTo('dashboard')">
            <i class="fa-solid fa-chart-pie"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="menu-item" id="menu-projects">
          <a onclick="navigateTo(\'projects\')">
            <i class="fa-solid fa-circle-plus"></i>
            <span>Project Wizard</span>
          </a>
        </li>

        <li class="menu-item" id="menu-inventory">
          <a onclick="navigateTo(\'inventory\')">
            <i class="fa-solid fa-dolly"></i>
            <span>Inventory Wizard</span>
          </a>
        </li>

        <li class="menu-item" id="menu-maintenance">
          <a onclick="navigateTo(\'maintenance\')">
            <i class="fa-solid fa-headset"></i>
            <span>NOC Wizard</span>
          </a>
        </li>
        
        <li class="menu-item role-pm" id="menu-billing">
          <a onclick="navigateTo('billing')">
            <i class="fa-solid fa-file-invoice-dollar"></i>
            <span>Billing</span>
          </a>
        </li>
        <li class="menu-item" id="menu-records">
          <a onclick="navigateTo('records')">
            <i class="fa-solid fa-file-invoice"></i>
            <span>All Records</span>
          </a>
        </li>
      </ul>

      <div class="user-profile">
        <div class="user-avatar" id="profile-avatar">A</div>
        <div class="user-details">
          <div class="user-name" id="profile-name">Administrator</div>
          <div class="user-role-pill" id="profile-role">Admin</div>
        </div>
      </div>

      <button class="btn-logout" onclick="handleLogout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </button>
    </aside>`,
  header: `<!-- HEADER -->
      <header class="app-header">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
          <button id="mobile-sidebar-toggle" class="btn-mobile-toggle" title="Toggle Navigation Menu">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div>
            <h2 id="current-panel-title">Operations Dashboard</h2>
            <p id="current-panel-subtitle">Welcome back! Real-time operations feed is live.</p>
          </div>
        </div>
        <div class="header-right">
          <div class="current-date" id="live-clock">
            <i class="fa-regular fa-clock"></i> Loading...
          </div>
        </div>
      </header>`,
  modal: `<div id="detail-modal" class="modal-overlay hidden">
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="modal-title">Record Details</h3>
        <button class="btn-close-modal" onclick="closeDetailsModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body" id="modal-body-content">
        <!-- Key value breakdown -->
      </div>
    </div>
  </div>`
};

function injectLayout() {
  // Inject Login Screen at the start of body
  if (!document.getElementById('login-screen')) {
    document.body.insertAdjacentHTML('afterbegin', sharedLayout.login);
  }
  
  // Inject App Container if missing
  let appContainer = document.getElementById('app-container');
  if (!appContainer) {
    appContainer = document.createElement('div');
    appContainer.id = 'app-container';
    appContainer.className = 'hidden';
    
    // We move nodes to preserve events and avoid innerHTML reset.
    const nodesToMove = [];
    Array.from(document.body.children).forEach(node => {
      if (node.id !== 'login-screen' && node.tagName !== 'SCRIPT') {
        nodesToMove.push(node);
      }
    });
    
    document.body.appendChild(appContainer);
    appContainer.insertAdjacentHTML('beforeend', sharedLayout.sidebar);
    
    const mainWorkspace = document.createElement('main');
    mainWorkspace.className = 'main-workspace';
    mainWorkspace.innerHTML = sharedLayout.header;
    
    const contentBody = document.createElement('div');
    contentBody.className = 'content-body';
    
    nodesToMove.forEach(node => contentBody.appendChild(node));
    mainWorkspace.appendChild(contentBody);
    
    appContainer.appendChild(mainWorkspace);
    appContainer.insertAdjacentHTML('beforeend', sharedLayout.modal);
  }
}

// Run immediately
injectLayout();
