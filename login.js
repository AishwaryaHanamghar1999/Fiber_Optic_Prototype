/* ==========================================================================
   OFP PORTAL - AUTHENTICATION & LOGIN PROCESSOR
   ========================================================================== */

function quickLogin(username, password) {
  const userField = document.getElementById('username');
  const passField = document.getElementById('password');
  if (userField && passField) {
    userField.value = username;
    passField.value = password;
  }
}

function handleFormLogin() {
  const usernameInput = document.getElementById('username').value.trim().toLowerCase();
  const passwordInput = document.getElementById('password').value.trim();

  const errorMsg = document.getElementById('login-error-msg');
  if (errorMsg) {
    errorMsg.classList.add('hidden');
  }

  let matchedRole = null;
  let matchedName = '';

  if (usernameInput === 'admin' && passwordInput === 'admin') {
    matchedRole = ROLES.ADMIN;
    matchedName = 'Operations Director';
  } else if (usernameInput === 'pm' && passwordInput === 'pm') {
    matchedRole = ROLES.PROJECT_MANAGER;
    matchedName = 'Project Operations Manager';
  } else if (usernameInput === 'im' && passwordInput === 'im') {
    matchedRole = ROLES.INVENTORY_MANAGER;
    matchedName = 'Storehouse Lead';
  } else if (usernameInput === 'mm' && passwordInput === 'mm') {
    matchedRole = ROLES.MAINTENANCE_MANAGER;
    matchedName = 'NOC Maintenance Desk';
  }

  if (matchedRole) {
    currentUser = {
      username: usernameInput,
      role: matchedRole,
      name: matchedName
    };
    localStorage.setItem('ofp_logged_in_user', JSON.stringify(currentUser));
    applyAuthLayout();
    
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    
    if (loginScreen) {
      loginScreen.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        loginScreen.classList.add('hidden');
        if (appContainer) {
          appContainer.classList.remove('hidden');
        }
      }, 500);
    }
  } else {
    if (errorMsg) {
      errorMsg.classList.remove('hidden');
    }
  }
}

function checkAuthOnLoad() {
  if (typeof initLocalStorage === 'function') {
    initLocalStorage();
  }
  const savedUser = localStorage.getItem('ofp_logged_in_user');
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app-container');

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    applyAuthLayout();
    if (loginScreen) {
      loginScreen.style.transform = 'translateY(-100%)';
      loginScreen.classList.add('hidden');
    }
    if (appContainer) {
      appContainer.classList.remove('hidden');
    }
  } else {
    if (loginScreen) {
      loginScreen.classList.remove('hidden');
    }
    if (appContainer) {
      appContainer.classList.add('hidden');
    }
  }
}

function applyAuthLayout() {
  if (!currentUser) return;

  // Update profile info
  const nameEl = document.getElementById('profile-name');
  const roleEl = document.getElementById('profile-role');
  const avatarEl = document.getElementById('profile-avatar');

  if (nameEl) nameEl.textContent = currentUser.name;
  if (roleEl) roleEl.textContent = currentUser.role;
  if (avatarEl) avatarEl.textContent = currentUser.role.charAt(0).toUpperCase();

  // Show/Hide menu items based on role
  const menuDashboard = document.getElementById('menu-dashboard');
  const menuProjects = document.getElementById('menu-projects');
  const menuInventory = document.getElementById('menu-inventory');
  const menuMaintenance = document.getElementById('menu-maintenance');
  const menuRecords = document.getElementById('menu-records');

  // Reset menu defaults
  if (menuDashboard) menuDashboard.classList.remove('hidden');
  if (menuProjects) menuProjects.classList.remove('hidden');
  if (menuInventory) menuInventory.classList.remove('hidden');
  if (menuMaintenance) menuMaintenance.classList.remove('hidden');
  if (menuRecords) menuRecords.classList.remove('hidden');

  if (currentUser.role === ROLES.ADMIN) {
    // Admin - can only see reports (Dashboard & Records)
    if (menuProjects) menuProjects.classList.add('hidden');
    if (menuInventory) menuInventory.classList.add('hidden');
    if (menuMaintenance) menuMaintenance.classList.add('hidden');
    
    const tabProj = document.getElementById('tab-btn-projects');
    const tabInv = document.getElementById('tab-btn-inventory');
    const tabComp = document.getElementById('tab-btn-complaints');
    
    if (tabProj) tabProj.classList.remove('hidden');
    if (tabInv) tabInv.classList.remove('hidden');
    if (tabComp) tabComp.classList.remove('hidden');
    
    activeRecordsTab = 'projects';
    navigateTo('dashboard');
  } else if (currentUser.role === ROLES.PROJECT_MANAGER) {
    if (menuInventory) menuInventory.classList.add('hidden');
    if (menuMaintenance) menuMaintenance.classList.add('hidden');
    
    const tabInv = document.getElementById('tab-btn-inventory');
    const tabComp = document.getElementById('tab-btn-complaints');
    
    if (tabInv) tabInv.classList.add('hidden');
    if (tabComp) tabComp.classList.add('hidden');
    
    activeRecordsTab = 'projects';
    navigateTo('dashboard');
  } else if (currentUser.role === ROLES.INVENTORY_MANAGER) {
    if (menuProjects) menuProjects.classList.add('hidden');
    if (menuMaintenance) menuMaintenance.classList.add('hidden');
    
    const tabProj = document.getElementById('tab-btn-projects');
    const tabComp = document.getElementById('tab-btn-complaints');
    
    if (tabProj) tabProj.classList.add('hidden');
    if (tabComp) tabComp.classList.add('hidden');
    
    activeRecordsTab = 'inventory';
    navigateTo('dashboard');
  } else if (currentUser.role === ROLES.MAINTENANCE_MANAGER) {
    if (menuProjects) menuProjects.classList.add('hidden');
    if (menuInventory) menuInventory.classList.add('hidden');
    
    const tabProj = document.getElementById('tab-btn-projects');
    const tabInv = document.getElementById('tab-btn-inventory');
    
    if (tabProj) tabProj.classList.add('hidden');
    if (tabInv) tabInv.classList.add('hidden');
    
    activeRecordsTab = 'complaints';
    navigateTo('dashboard');
  }
}

function handleLogout() {
  localStorage.removeItem('ofp_logged_in_user');
  currentUser = null;
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app-container');
  
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
    setTimeout(() => {
      loginScreen.style.transform = 'translateY(0)';
      if (appContainer) {
        appContainer.classList.add('hidden');
      }
    }, 50);
  }
}

// Bind password visibility toggle actions on load
document.addEventListener('DOMContentLoaded', () => {
  const togglePassBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      const icon = togglePassBtn.querySelector('i');
      if (icon) {
        if (isPassword) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  }
});
