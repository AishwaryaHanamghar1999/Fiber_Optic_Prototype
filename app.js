
// ===== SYSTEM STATE =====
let currentUser = null;
let currentPanel = 'dashboard';

// Wizards Step States
const wizardSteps = {
  projects: { current: 0, total: 5 },
  inventory: { current: 0, total: 5 },
  maintenance: { current: 0, total: 8 }
};

// Master Records Tab State
let activeRecordsTab = 'projects';

// Role Matrix
const ROLES = {
  ADMIN: 'admin',
  PROJECT_MANAGER: 'pm',
  INVENTORY_MANAGER: 'im',
  MAINTENANCE_MANAGER: 'mm'
};

// Preloaded Mock Data
const defaultMockProjects = [
  { id: "P-1", dateCreated: "2026-06-20", commDate: "2026-06-20", company: "Airtel FTTH", projectType: "ODN", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/Flatbed(G+3)/IBW/19112025/124346", airtelId: "PUN19054", city: "Pune", area: "Wadgaon Budruk", surveyDistance: 150, homePass: 8, siteStatus: "WIP", deploymentEngineer: "Suraj" },
  { id: "P-2", dateCreated: "2026-06-22", commDate: "2026-06-22", company: "Airtel FTTH", projectType: "IBD", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/IBW/20062026/089753", airtelId: "PUN18921", city: "Pune", area: "Ambegaon", surveyDistance: 450, homePass: 48, siteStatus: "Completed", deploymentEngineer: "Ramesh" },
  { id: "P-3", dateCreated: "2026-06-25", commDate: "2026-06-25", company: "Airtel FTTH", projectType: "Transport", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/TR/25062026/112233", airtelId: "PUN17429", city: "Mumbai", area: "Kothrud", surveyDistance: 1200, homePass: 0, siteStatus: "Completed", deploymentEngineer: "Suraj" },
  { id: "P-4", dateCreated: "2026-06-27", commDate: "2026-06-27", company: "Airtel FTTH", projectType: "ODN", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/OD/27062026/445566", airtelId: "PUN19050", city: "Pune", area: "Hadapsar", surveyDistance: 800, homePass: 24, siteStatus: "WIP", deploymentEngineer: "Vijay" }
];

const defaultMockInventory = [
  { id: "I-1", dateCreated: "2026-06-20", receivedDate: "2026-06-20", invoiceDate: "2026-06-19", invoiceNo: "INV-1234", receivedFrom: "Sterlite", city: "Pune", materialType: "Fiber", fiberCompany: "Sterlite", fiberType: "Armoured", quantity: 1600, uom: "Meter", cableIdNo: "CBL-5678", totalCableLength: 1600, cableShort: "No", verifiedBy: "Rahul" },
  { id: "I-2", dateCreated: "2026-06-22", receivedDate: "2026-06-22", invoiceDate: "2026-06-22", invoiceNo: "INV-5678", receivedFrom: "Corning", city: "Pune", materialType: "Closure Box", fiberCompany: "Corning", quantity: 10, uom: "Nos.", cableIdNo: "NA", totalCableLength: 0, cableShort: "No", verifiedBy: "Amit" },
  { id: "I-3", dateCreated: "2026-06-24", receivedDate: "2026-06-24", invoiceDate: "2026-06-23", invoiceNo: "INV-9988", receivedFrom: "HPCL", city: "Mumbai", materialType: "Isopropyl Liquid (Cans)", fiberCompany: "Other", quantity: 5, uom: "Can", cableIdNo: "NA", totalCableLength: 0, cableShort: "No", verifiedBy: "Shyam" }
];

const defaultMockOutwardInventory = [
  { id: "OI-1", srNo: "1", location: "Pune", outwardDate: "2026-06-25", projectMaintenance: "Maintenance", companyName: "Airtel FTTH", evisionsTeamName: "Team 1", vendorName: "Swarad Connect", fptName: "Amrut Rathod", materialTakenBy: "AA", issuedBy: "Rohit", materialType: "Fiber", fiberCore: "6F", quantityTaken: "100", uom: "Meter", cableIdNo: "12345", startReading: "0", endReading: "100", totalCableLength: "100", linkIdNo: "567789", aEnd: "Karve Putla", bEnd: "Shivaji Putla", area: "Kothrud" },
  { id: "OI-2", srNo: "2", location: "Mumbai", outwardDate: "2026-06-26", projectMaintenance: "Project", companyName: "AIRTEL Transport", evisionsTeamName: "Team 2", vendorName: "Anil Enterprises", fptName: "Harilal Rathod", materialTakenBy: "BB", issuedBy: "Rohit", materialType: "Closure Box", fiberCore: "12F", quantityTaken: "5", uom: "Nos.", cableIdNo: "NA", startReading: "", endReading: "", totalCableLength: "", linkIdNo: "", aEnd: "", bEnd: "", area: "" }
];

const defaultMockComplaints = [
  { id: "M-1", dateCreated: "2026-06-20", receivedDate: "2026-06-20", receivedDateTime: "2026-06-20T07:35", type: "Complaint", evisionsComplaintCode: "24047180", companyName: "AIRTEL", linkType: "FTTH", companyComplaintCode: "INC000226909459", linkName: "1ZM TO TCG Panorama Ambegaon", maintainedBy: "Swarad Connect", linkStatus: "RESTORED", evisionsMttr: "03:05:00", evisionsSla: "In", companySla: "In", outageReason: "FIBER CUT DUE TO VEHICLE", remarks: "Restored quickly by splicing team" },
  { id: "M-2", dateCreated: "2026-06-22", receivedDate: "2026-06-22", receivedDateTime: "2026-06-22T08:15", type: "Complaint", evisionsComplaintCode: "24047195", companyName: "VIL", linkType: "BACKBONE", companyComplaintCode: "INC0002271827", linkName: "Hinjewadi Node Link", maintainedBy: "Hyperband Infra", linkStatus: "RESTORED", evisionsMttr: "06:15:00", evisionsSla: "Out", companySla: "Out", outageReason: "DOG BITE", remarks: "Delayed due to forest access permission" },
  { id: "M-3", dateCreated: "2026-06-25", receivedDate: "2026-06-25", receivedDateTime: "2026-06-25T14:00", type: "Complaint", evisionsComplaintCode: "24047211", companyName: "AIRTEL", linkType: "BACKBONE", companyComplaintCode: "INC000228009", linkName: "Katraj Node Link", maintainedBy: "Swarad Connect", linkStatus: "WIP", evisionsMttr: "02:00:00", evisionsSla: "In", companySla: "In", outageReason: "FIBER CUT DUE TO VEHICLE", remarks: "Splicing in progress" },
  { id: "M-4", dateCreated: "2026-06-26", receivedDate: "2026-06-26", receivedDateTime: "2026-06-26T10:30", type: "Complaint", evisionsComplaintCode: "24047225", companyName: "GAZON", linkType: "FTTH", companyComplaintCode: "INC000229188", linkName: "Hadapsar Branch", maintainedBy: "Team 1", linkStatus: "ACCESS ISSUE - OUR SIDE", evisionsMttr: "04:30:00", evisionsSla: "In", companySla: "In", outageReason: "PMC ACTIVITY", remarks: "NOC waiting for permissions" }
];

// Initialize LocalStorage Data
function initLocalStorage() {
  if (!localStorage.getItem('ofp_projects')) {
    localStorage.setItem('ofp_projects', JSON.stringify(defaultMockProjects));
  }
  if (!localStorage.getItem('ofp_inventory')) {
    localStorage.setItem('ofp_inventory', JSON.stringify(defaultMockInventory));
  }
  const existingOutward = localStorage.getItem('ofp_outward_inventory');
  if (!existingOutward || existingOutward === '[]') {
    localStorage.setItem('ofp_outward_inventory', JSON.stringify(defaultMockOutwardInventory));
  }
  if (!localStorage.getItem('ofp_complaints')) {
    localStorage.setItem('ofp_complaints', JSON.stringify(defaultMockComplaints));
  }
}

// Authentication handlers moved to login.js

// ===== NAVIGATION / ROUTING =====
function navigateToRecord(tabId, menuId) {
  activeRecordsTab = tabId;
  document.querySelector('.records-tabs').style.display = 'none';
  navigateTo('records', menuId);
}
function navigateTo(panelId, overrideMenuId = null) {
  // Close mobile sidebar menu if open
  if (typeof window.closeMobileSidebar === 'function') {
    window.closeMobileSidebar();
  }

  // Auth Guard Checks
  if (currentUser) {
    if (currentUser.role === ROLES.ADMIN && ['projects', 'inventory', 'maintenance'].includes(panelId)) {
      panelId = 'dashboard';
    } else if (currentUser.role === ROLES.PROJECT_MANAGER && !['dashboard', 'projects', 'records', 'billing'].includes(panelId)) {
      panelId = 'dashboard';
    } else if (currentUser.role === ROLES.INVENTORY_MANAGER && !['dashboard', 'inventory', 'records'].includes(panelId)) {
      panelId = 'dashboard';
    } else if (currentUser.role === ROLES.MAINTENANCE_MANAGER && !['dashboard', 'maintenance', 'records'].includes(panelId)) {
      panelId = 'dashboard';
    }
  }
  // ===== SYSTEM STATE =====
  let currentUser = null;
  let currentPanel = 'dashboard';

  // Wizards Step States
  const wizardSteps = {
    projects: { current: 0, total: 5 },
    inventory: { current: 0, total: 5 },
    'outward-inventory': { current: 0, total: 5 },
    maintenance: { current: 0, total: 8 }
  };

  // Master Records Tab State
  let activeRecordsTab = 'projects';

  // Role Matrix
  const ROLES = {
    ADMIN: 'admin',
    PROJECT_MANAGER: 'pm',
    INVENTORY_MANAGER: 'im',
    MAINTENANCE_MANAGER: 'mm'
  };

  // Preloaded Mock Data
  const defaultMockProjects = [
    { id: "P-1", dateCreated: "2026-06-20", commDate: "2026-06-20", company: "Airtel FTTH", projectType: "ODN", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/Flatbed(G+3)/IBW/19112025/124346", airtelId: "PUN19054", city: "Pune", area: "Wadgaon Budruk", surveyDistance: 150, homePass: 8, siteStatus: "WIP", deploymentEngineer: "Suraj" },
    { id: "P-2", dateCreated: "2026-06-22", commDate: "2026-06-22", company: "Airtel FTTH", projectType: "IBD", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/IBW/20062026/089753", airtelId: "PUN18921", city: "Pune", area: "Ambegaon", surveyDistance: 450, homePass: 48, siteStatus: "Completed", deploymentEngineer: "Ramesh" },
    { id: "P-3", dateCreated: "2026-06-25", commDate: "2026-06-25", company: "Airtel FTTH", projectType: "Transport", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/TR/25062026/112233", airtelId: "PUN17429", city: "Mumbai", area: "Kothrud", surveyDistance: 1200, homePass: 0, siteStatus: "Completed", deploymentEngineer: "Suraj" },
    { id: "P-4", dateCreated: "2026-06-27", commDate: "2026-06-27", company: "Airtel FTTH", projectType: "ODN", workOrder: "BAL-ANG-UASL-ROM-Maharashtra/PUNE/Capex/FTTH/B2C/New Rollout/OD/27062026/445566", airtelId: "PUN19050", city: "Pune", area: "Hadapsar", surveyDistance: 800, homePass: 24, siteStatus: "WIP", deploymentEngineer: "Vijay" }
  ];

  const defaultMockInventory = [
    { id: "I-1", dateCreated: "2026-06-20", receivedDate: "2026-06-20", invoiceDate: "2026-06-19", invoiceNo: "INV-1234", receivedFrom: "Sterlite", city: "Pune", materialType: "Fiber", fiberCompany: "Sterlite", fiberType: "Armoured", quantity: 1600, uom: "Meter", cableIdNo: "CBL-5678", totalCableLength: 1600, cableShort: "No", verifiedBy: "Rahul" },
    { id: "I-2", dateCreated: "2026-06-22", receivedDate: "2026-06-22", invoiceDate: "2026-06-22", invoiceNo: "INV-5678", receivedFrom: "Corning", city: "Pune", materialType: "Closure Box", fiberCompany: "Corning", quantity: 10, uom: "Nos.", cableIdNo: "NA", totalCableLength: 0, cableShort: "No", verifiedBy: "Amit" },
    { id: "I-3", dateCreated: "2026-06-24", receivedDate: "2026-06-24", invoiceDate: "2026-06-23", invoiceNo: "INV-9988", receivedFrom: "HPCL", city: "Mumbai", materialType: "Isopropyl Liquid (Cans)", fiberCompany: "Other", quantity: 5, uom: "Can", cableIdNo: "NA", totalCableLength: 0, cableShort: "No", verifiedBy: "Shyam" }
  ];

  const defaultMockOutwardInventory = [
    { id: "OI-1", srNo: "1", location: "Pune", outwardDate: "2026-06-25", projectMaintenance: "Maintenance", companyName: "Airtel FTTH", evisionsTeamName: "Team 1", vendorName: "Swarad Connect", fptName: "Amrut Rathod", materialTakenBy: "AA", issuedBy: "Rohit", materialType: "Fiber", fiberCore: "6F", quantityTaken: "100", uom: "Meter", cableIdNo: "12345", startReading: "0", endReading: "100", totalCableLength: "100", linkIdNo: "567789", aEnd: "Karve Putla", bEnd: "Shivaji Putla", area: "Kothrud" },
    { id: "OI-2", srNo: "2", location: "Mumbai", outwardDate: "2026-06-26", projectMaintenance: "Project", companyName: "AIRTEL Transport", evisionsTeamName: "Team 2", vendorName: "Anil Enterprises", fptName: "Harilal Rathod", materialTakenBy: "BB", issuedBy: "Rohit", materialType: "Closure Box", fiberCore: "12F", quantityTaken: "5", uom: "Nos.", cableIdNo: "NA", startReading: "", endReading: "", totalCableLength: "", linkIdNo: "", aEnd: "", bEnd: "", area: "" }
  ];

  const defaultMockComplaints = [
    { id: "M-1", dateCreated: "2026-06-20", receivedDate: "2026-06-20", receivedDateTime: "2026-06-20T07:35", type: "Complaint", evisionsComplaintCode: "24047180", companyName: "AIRTEL", linkType: "FTTH", companyComplaintCode: "INC000226909459", linkName: "1ZM TO TCG Panorama Ambegaon", maintainedBy: "Swarad Connect", linkStatus: "RESTORED", evisionsMttr: "03:05:00", evisionsSla: "In", companySla: "In", outageReason: "FIBER CUT DUE TO VEHICLE", remarks: "Restored quickly by splicing team" },
    { id: "M-2", dateCreated: "2026-06-22", receivedDate: "2026-06-22", receivedDateTime: "2026-06-22T08:15", type: "Complaint", evisionsComplaintCode: "24047195", companyName: "VIL", linkType: "BACKBONE", companyComplaintCode: "INC0002271827", linkName: "Hinjewadi Node Link", maintainedBy: "Hyperband Infra", linkStatus: "RESTORED", evisionsMttr: "06:15:00", evisionsSla: "Out", companySla: "Out", outageReason: "DOG BITE", remarks: "Delayed due to forest access permission" },
    { id: "M-3", dateCreated: "2026-06-25", receivedDate: "2026-06-25", receivedDateTime: "2026-06-25T14:00", type: "Complaint", evisionsComplaintCode: "24047211", companyName: "AIRTEL", linkType: "BACKBONE", companyComplaintCode: "INC000228009", linkName: "Katraj Node Link", maintainedBy: "Swarad Connect", linkStatus: "WIP", evisionsMttr: "02:00:00", evisionsSla: "In", companySla: "In", outageReason: "FIBER CUT DUE TO VEHICLE", remarks: "Splicing in progress" },
    { id: "M-4", dateCreated: "2026-06-26", receivedDate: "2026-06-26", receivedDateTime: "2026-06-26T10:30", type: "Complaint", evisionsComplaintCode: "24047225", companyName: "GAZON", linkType: "FTTH", companyComplaintCode: "INC000229188", linkName: "Hadapsar Branch", maintainedBy: "Team 1", linkStatus: "ACCESS ISSUE - OUR SIDE", evisionsMttr: "04:30:00", evisionsSla: "In", companySla: "In", outageReason: "PMC ACTIVITY", remarks: "NOC waiting for permissions" }
  ];

  // Initialize LocalStorage Data
  function initLocalStorage() {
    if (!localStorage.getItem('ofp_projects')) {
      localStorage.setItem('ofp_projects', JSON.stringify(defaultMockProjects));
    }
    if (!localStorage.getItem('ofp_inventory')) {
      localStorage.setItem('ofp_inventory', JSON.stringify(defaultMockInventory));
    }
    const existingOutward = localStorage.getItem('ofp_outward_inventory');
    if (!existingOutward || existingOutward === '[]') {
      localStorage.setItem('ofp_outward_inventory', JSON.stringify(defaultMockOutwardInventory));
    }
    if (!localStorage.getItem('ofp_complaints')) {
      localStorage.setItem('ofp_complaints', JSON.stringify(defaultMockComplaints));
    }
  }

  // Authentication handlers moved to login.js

  // ===== NAVIGATION / ROUTING =====
  function navigateToRecord(tabId, menuId) {
    activeRecordsTab = tabId;
    document.querySelector('.records-tabs').style.display = 'none';
    navigateTo('records', menuId);
  }
  function navigateTo(panelId, overrideMenuId = null) {
    // Close mobile sidebar menu if open
    if (typeof window.closeMobileSidebar === 'function') {
      window.closeMobileSidebar();
    }

    // Auth Guard Checks
    if (currentUser) {
      if (currentUser.role === ROLES.ADMIN && ['projects', 'inventory', 'maintenance'].includes(panelId)) {
        panelId = 'dashboard';
      } else if (currentUser.role === ROLES.PROJECT_MANAGER && !['dashboard', 'projects', 'records', 'billing'].includes(panelId)) {
        panelId = 'dashboard';
      } else if (currentUser.role === ROLES.INVENTORY_MANAGER && !['dashboard', 'inventory', 'outward-inventory', 'records'].includes(panelId)) {
        panelId = 'dashboard';
      } else if (currentUser.role === ROLES.MAINTENANCE_MANAGER && !['dashboard', 'maintenance', 'records'].includes(panelId)) {
        panelId = 'dashboard';
      }
    }

    currentPanel = panelId;
    // Hide all panels
    document.querySelectorAll('.app-panel').forEach(p => p.classList.add('hidden'));
    // Show active panel
    document.getElementById('panel-' + panelId).classList.remove('hidden');

    // Update sidebar active class
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    const activeMenuItem = document.getElementById(overrideMenuId || ('menu-' + panelId));

    const recordsTabs = document.querySelector('.records-tabs');
    if (recordsTabs) {
      if (panelId === 'records' && !overrideMenuId) {
        recordsTabs.style.display = 'flex';
      }
    }
    if (activeMenuItem) {
      activeMenuItem.classList.add('active');
    }

    // Update Headers
    const title = document.getElementById('current-panel-title');
    const subtitle = document.getElementById('current-panel-subtitle');

    if (panelId === 'dashboard') {
      title.textContent = 'Operations Dashboard';
      subtitle.textContent = `Welcome back! Displaying operations metrics.`;
      renderDashboardData();
    } else if (panelId === 'projects') {
      title.textContent = 'Project Wizard';
      subtitle.textContent = 'Step-by-step rollout and fiber provisioning creator.';
      initWizardState('projects');
    } else if (panelId === 'inventory') {
      title.textContent = 'Inventory Management';
      subtitle.textContent = 'Material receipt registry and cable quality checks.';
      initWizardState('inventory');
    } else if (panelId === 'outward-inventory') {
      title.textContent = 'Outward Inventory';
      subtitle.textContent = 'Manage outward material, cable issuance, and field team tracking.';
      initWizardState('outward-inventory');
    } else if (panelId === 'maintenance') {
      title.textContent = 'NOC Maintenance Wizard';
      subtitle.textContent = 'NOC Complaint registration, assignment, and MTTR log.';
      initWizardState('maintenance');
    } else if (panelId === 'records') {
      title.textContent = 'Master Records Center';
      subtitle.textContent = 'Search, filter, and inspect completed operations sheets.';
      switchRecordsTab(activeRecordsTab);
    } else if (panelId === 'billing') {
      title.textContent = 'Billing & Payments';
      subtitle.textContent = 'Manage multiple invoices against work orders.';
    }
  }

  // ===== CLOCK =====
  function updateClock() {
    const clockEl = document.getElementById('live-clock');
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    if (clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleDateString('en-US', options)}`;
  }
  setInterval(updateClock, 1000);

  // ===== WIZARD MANAGER =====
  function initWizardState(type) {
    wizardSteps[type].current = 0;
    updateWizardUI(type);
  }

  function updateWizardUI(type) {
    const stepState = wizardSteps[type];
    const formEl = document.getElementById(type === 'projects' ? 'projectWizardForm' : (type === 'inventory' ? 'inventoryWizardForm' : (type === 'outward-inventory' ? 'outwardInventoryWizardForm' : 'maintenanceWizardForm')));

    // Toggle hidden content sections
    if (formEl) {
      formEl.querySelectorAll('.step-content').forEach(el => {
        el.classList.add('hidden');
        if (parseInt(el.dataset.step) === stepState.current) {
          el.classList.remove('hidden');
        }
      });
    }

    // Indicators update
    const progressContainer = document.getElementById(type + 'Progress');
    if (progressContainer) {
      progressContainer.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index === stepState.current) {
          indicator.classList.add('active');
        } else if (index < stepState.current) {
          indicator.classList.add('completed');
        }
      });

      // Buttons check
      let prefix;
      if (type === 'projects') prefix = 'proj';
      else if (type === 'inventory') prefix = 'inv';
      else if (type === 'outward-inventory') prefix = 'outwardInv';
      else prefix = 'maint';
      const prevBtn = document.getElementById(prefix + 'PrevBtn');
      const nextBtn = document.getElementById(prefix + 'NextBtn');
      const submitBtn = document.getElementById(prefix + 'SubmitBtn');

      prevBtn.disabled = (stepState.current === 0);

      if (stepState.current === stepState.total - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
      }
    }

    function changeWizardStep(type, delta) {
      const stepState = wizardSteps[type];
      const newStep = stepState.current + delta;
      if (newStep >= 0 && newStep < stepState.total) {
        stepState.current = newStep;
        updateWizardUI(type);
      }
    }

    // Step clicks
    document.querySelectorAll('.wizard-progress').forEach(progressEl => {
      const type = progressEl.id.replace('Progress', '').toLowerCase();
      progressEl.querySelectorAll('.step-indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
          const stepVal = parseInt(indicator.dataset.step);
          wizardSteps[type].current = stepVal;
          updateWizardUI(type);
        });
      });
    });

    // Form submit handlers
    function handleProjectSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Add metadata
      data.id = "P-" + Date.now();
      data.dateCreated = new Date().toISOString().split('T')[0];

      // Retrieve database
      const db = JSON.parse(localStorage.getItem('ofp_projects') || '[]');
      db.unshift(data);
      localStorage.setItem('ofp_projects', JSON.stringify(db));

      alert('✅ Project Sheet successfully submitted and saved!');
      form.reset();
      initWizardState('projects');
      navigateTo('dashboard');
    }

    function handleInventorySubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      data.id = "I-" + Date.now();
      data.dateCreated = new Date().toISOString().split('T')[0];

      const db = JSON.parse(localStorage.getItem('ofp_inventory') || '[]');
      db.unshift(data);
      localStorage.setItem('ofp_inventory', JSON.stringify(db));

      alert('✅ Material Receipt Record saved successfully!');
      form.reset();
      initWizardState('inventory');
      navigateTo('dashboard');
    }

    function handleMaintenanceSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      data.id = "M-" + Date.now();
      data.dateCreated = new Date().toISOString().split('T')[0];

      const db = JSON.parse(localStorage.getItem('ofp_complaints') || '[]');
      db.unshift(data);
      localStorage.setItem('ofp_complaints', JSON.stringify(db));

      alert('✅ NOC Maintenance Ticket successfully recorded!');
      form.reset();
      initWizardState('maintenance');
      navigateTo('dashboard');
    }

    // ===== RECORDS TAB SYSTEM =====
    function switchRecordsTab(tab) {
      activeRecordsTab = tab;

      // Update Tab Headers
      document.querySelectorAll('.record-tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      document.getElementById('tab-btn-' + tab).classList.add('active');

      // Populate filters dropdown
      populateFilters();

      // Render records table
      renderRecordsTable();
    }

    function populateFilters() {
      const filterBox = document.getElementById('filters-container');
      filterBox.innerHTML = ''; // reset

      const select = document.createElement('select');
      select.id = 'records-status-filter';
      select.onchange = handleSearchFilter;

      if (activeRecordsTab === 'projects') {
        select.innerHTML = `
          <option value="all">All Site Statuses</option>
          <option value="WIP">WIP</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
          <option value="Cancelled">Cancelled</option>
        `;
        filterBox.appendChild(select);

        // Add City filter
        const citySelect = document.createElement('select');
        citySelect.id = 'records-city-filter';
        citySelect.onchange = handleSearchFilter;
        citySelect.innerHTML = `
          <option value="all">All Cities</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
        `;
        filterBox.appendChild(citySelect);

      } else if (activeRecordsTab === 'inventory' || activeRecordsTab === 'outward-inventory') {
        select.innerHTML = `
          <option value="all">All Materials</option>
          <option value="Fiber">Fiber</option>
          <option value="Closure Box">Closure Box</option>
          <option value="Bamboo Closure">Bamboo Closure</option>
          <option value="Isopropyl Liquid (Cans)">Isopropyl Liquid (Cans)</option>
        `;
        filterBox.appendChild(select);
      } else if (activeRecordsTab === 'complaints') {
        select.innerHTML = `
          <option value="all">All SLA Statuses</option>
          <option value="In">SLA - In</option>
          <option value="Out">SLA - Out</option>
        `;
        filterBox.appendChild(select);

        const statusSelect = document.createElement('select');
        statusSelect.id = 'records-maint-status';
        statusSelect.onchange = handleSearchFilter;
        statusSelect.innerHTML = `
          <option value="all">All Link Statuses</option>
          <option value="RESTORED">RESTORED</option>
          <option value="WIP">WIP</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="ACCESS ISSUE - OUR SIDE">ACCESS ISSUE</option>
        `;
        filterBox.appendChild(statusSelect);
      }
    }

    function getFilteredData() {
      let data = [];
      if (activeRecordsTab === 'projects') {
        data = JSON.parse(localStorage.getItem('ofp_projects') || '[]');
      } else if (activeRecordsTab === 'inventory') {
        data = JSON.parse(localStorage.getItem('ofp_inventory') || '[]');
      } else if (activeRecordsTab === 'outward-inventory') {
        data = JSON.parse(localStorage.getItem('ofp_outward_inventory') || '[]');
      } else if (activeRecordsTab === 'complaints') {
        data = JSON.parse(localStorage.getItem('ofp_complaints') || '[]');
      }

      const searchQuery = document.getElementById('records-search').value.toLowerCase().trim();
      const statusFilterVal = document.getElementById('records-status-filter')?.value || 'all';
      const cityFilterVal = document.getElementById('records-city-filter')?.value || 'all';
      const maintStatusVal = document.getElementById('records-maint-status')?.value || 'all';

      return data.filter(item => {
        // Search filter
        let matchSearch = true;
        if (searchQuery) {
          matchSearch = Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchQuery)
          );
        }

        // Dropdown filters
        let matchDropdowns = true;
        if (activeRecordsTab === 'projects') {
          if (statusFilterVal !== 'all' && item.siteStatus !== statusFilterVal) matchDropdowns = false;
          if (cityFilterVal !== 'all' && String(item.city).toLowerCase() !== cityFilterVal.toLowerCase()) matchDropdowns = false;
        } else if (activeRecordsTab === 'inventory' || activeRecordsTab === 'outward-inventory') {
          if (statusFilterVal !== 'all' && item.materialType !== statusFilterVal) matchDropdowns = false;
        } else if (activeRecordsTab === 'complaints') {
          if (statusFilterVal !== 'all' && item.evisionsSla !== statusFilterVal) matchDropdowns = false;
          if (maintStatusVal !== 'all' && item.linkStatus !== maintStatusVal) matchDropdowns = false;
        }

        return matchSearch && matchDropdowns;
      });
    }

    function handleSearchFilter() {
      renderRecordsTable();
    }

    function renderRecordsTable() {
      const data = getFilteredData();
      const head = document.getElementById('records-table-head');
      const body = document.getElementById('records-table-body');
      const emptyState = document.getElementById('records-empty-state');

      body.innerHTML = ''; // Reset
      emptyState.classList.add('hidden');

      if (data.length === 0) {
        emptyState.classList.remove('hidden');
        head.innerHTML = '';
        return;
      }

      if (activeRecordsTab === 'projects') {
        head.innerHTML = `
          <tr>
            <th class="dtr-control-th"></th>
            <th>Airtel ID</th>
            <th class="mobile-hide">Company</th>
            <th class="mobile-hide">Type</th>
            <th class="mobile-hide">City / Area</th>
            <th class="mobile-hide">Home Pass</th>
            <th>Status</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        `;

        data.forEach(item => {
          const statusClass = item.siteStatus === 'Completed' ? 'badge-success' : 'badge-warning';
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="dtr-control-td">
              <button type="button" class="dtr-control-btn" onclick="toggleRowDetails(this, '${item.id}', 'projects')" title="Toggle Info">
                <i class="fa-solid fa-plus"></i>
              </button>
            </td>
            <td><strong>${item.airtelId || 'N/A'}</strong></td>
            <td class="mobile-hide">${item.company || 'N/A'}</td>
            <td class="mobile-hide">${item.projectType || 'N/A'}</td>
            <td class="mobile-hide">${item.city || ''} - ${item.area || ''}</td>
            <td class="mobile-hide">${item.homePass || '0'}</td>
            <td><span class="badge ${statusClass}">${item.siteStatus || 'WIP'}</span></td>
            <td style="text-align: right;">
              <div class="action-btn-group" style="justify-content: flex-end;">
                <button class="action-btn" title="View details" onclick="showRecordDetails('projects', '${item.id}')"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn delete-btn" title="Delete record" onclick="deleteRecord('projects', '${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </td>
          `;
          body.appendChild(tr);
        });
      } else if (activeRecordsTab === 'inventory') {
        head.innerHTML = `
          <tr>
            <th class="dtr-control-th"></th>
            <th class="mobile-hide">Invoice Date</th>
            <th>Invoice No.</th>
            <th>Material Type</th>
            <th class="mobile-hide">Vendor</th>
            <th class="mobile-hide">Quantity</th>
            <th class="mobile-hide">Verified By</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        `;

        data.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="dtr-control-td">
              <button type="button" class="dtr-control-btn" onclick="toggleRowDetails(this, '${item.id}', 'inventory')" title="Toggle Info">
                <i class="fa-solid fa-plus"></i>
              </button>
            </td>
            <td class="mobile-hide">${item.invoiceDate || 'N/A'}</td>
            <td><strong>${item.invoiceNo || 'N/A'}</strong></td>
            <td><span class="badge badge-info">${item.materialType || 'N/A'}</span></td>
            <td class="mobile-hide">${item.receivedFrom || 'N/A'}</td>
            <td class="mobile-hide">${item.quantity || '0'} ${item.uom || ''}</td>
            <td class="mobile-hide">${item.verifiedBy || 'N/A'}</td>
            <td style="text-align: right;">
              <div class="action-btn-group" style="justify-content: flex-end;">
                <button class="action-btn" title="View details" onclick="showRecordDetails('inventory', '${item.id}')"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn delete-btn" title="Delete record" onclick="deleteRecord('inventory', '${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </td>
          `;
          body.appendChild(tr);
        });
      } else if (activeRecordsTab === 'outward-inventory') {
        head.innerHTML = `
          <tr>
            <th class="dtr-control-th"></th>
            <th class="mobile-hide">Outward Date</th>
            <th>Location</th>
            <th>Material Type</th>
            <th class="mobile-hide">Company</th>
            <th class="mobile-hide">Quantity</th>
            <th class="mobile-hide">Issued By</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        `;

        data.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="dtr-control-td">
              <button type="button" class="dtr-control-btn" onclick="toggleRowDetails(this, '${item.id}', 'outward-inventory')" title="Toggle Info">
                <i class="fa-solid fa-plus"></i>
              </button>
            </td>
            <td class="mobile-hide">${item.outwardDate || 'N/A'}</td>
            <td><strong>${item.location || 'N/A'}</strong></td>
            <td><span class="badge badge-info">${item.materialType || 'N/A'}</span></td>
            <td class="mobile-hide">${item.companyName || 'N/A'}</td>
            <td class="mobile-hide">${item.quantityTaken || '0'} ${item.uom || ''}</td>
            <td class="mobile-hide">${item.issuedBy || 'N/A'}</td>
            <td style="text-align: right;">
              <div class="action-btn-group" style="justify-content: flex-end;">
                <button class="action-btn" title="View details" onclick="showRecordDetails('outward-inventory', '${item.id}')"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn delete-btn" title="Delete record" onclick="deleteRecord('outward-inventory', '${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </td>
          `;
          body.appendChild(tr);
        });
      } else if (activeRecordsTab === 'complaints') {
        head.innerHTML = `
          <tr>
            <th class="dtr-control-th"></th>
            <th>Code</th>
            <th class="mobile-hide">Created Date/Time</th>
            <th class="mobile-hide">Company</th>
            <th class="mobile-hide">Link Name</th>
            <th class="mobile-hide">Vendor</th>
            <th>Link Status</th>
            <th class="mobile-hide">Resolution Time</th>
            <th class="mobile-hide">Evisions SLA</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        `;

        data.forEach(item => {
          let formattedCreatedDate = item.dateCreated || 'N/A';
          if (item.receivedDateTime) {
            const parts = item.receivedDateTime.split('T');
            if (parts.length === 2) {
              let [hours, minutes] = parts[1].split(':');
              let h = parseInt(hours, 10);
              const ampm = h >= 12 ? 'PM' : 'AM';
              h = h % 12 || 12;
              formattedCreatedDate = `${parts[0]} ${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
            } else {
              formattedCreatedDate = item.receivedDateTime;
            }
          }

          const slaClass = item.evisionsSla === 'In' ? 'badge-success' : 'badge-danger';
          const linkStatusClass = item.linkStatus === 'RESTORED' ? 'badge-success' : (item.linkStatus === 'WIP' ? 'badge-warning' : 'badge-primary');
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="dtr-control-td">
              <button type="button" class="dtr-control-btn" onclick="toggleRowDetails(this, '${item.id}', 'complaints')" title="Toggle Info">
                <i class="fa-solid fa-plus"></i>
              </button>
            </td>
            <td><strong>${item.evisionsComplaintCode || 'N/A'}</strong></td>
            <td class="mobile-hide">${formattedCreatedDate}</td>
            <td class="mobile-hide">${item.companyName || 'N/A'}</td>
            <td class="mobile-hide">${item.linkName || 'N/A'}</td>
            <td class="mobile-hide">${item.maintainedBy || 'N/A'}</td>
            <td><span class="badge ${linkStatusClass}">${item.linkStatus || 'N/A'}</span></td>
            <td class="mobile-hide"><strong>${item.linkStatus === 'RESTORED' ? (item.evisionsMttr || '—') : ''}</strong></td>
            <td class="mobile-hide"><span class="badge ${slaClass}">SLA ${item.evisionsSla || 'In'}</span></td>
            <td style="text-align: right;">
              <div class="action-btn-group" style="justify-content: flex-end;">
                <button class="action-btn" title="View details" onclick="showRecordDetails('complaints', '${item.id}')"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn delete-btn" title="Delete record" onclick="deleteRecord('complaints', '${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </td>
          `;
          body.appendChild(tr);
        });
      }
    }

    window.toggleRowDetails = function (btn, rowId, type) {
      const row = btn.closest('tr');
      const nextRow = row.nextElementSibling;

      if (nextRow && nextRow.classList.contains('child-row')) {
        nextRow.remove();
        btn.classList.remove('expanded');
        btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      } else {
        btn.classList.add('expanded');
        btn.innerHTML = '<i class="fa-solid fa-minus"></i>';

        const dbKey = 'ofp_' + type.replace('-', '_');
        const data = JSON.parse(localStorage.getItem(dbKey) || '[]');
        const item = data.find(x => x.id === rowId);

        if (!item) return;

        const childRow = document.createElement('tr');
        childRow.className = 'child-row';

        let detailsHtml = '';
        if (type === 'projects') {
          detailsHtml = `
            <li><span class="dtr-title">Company</span><span class="dtr-val">${item.company || '—'}</span></li>
            <li><span class="dtr-title">Project Type</span><span class="dtr-val">${item.projectType || '—'}</span></li>
            <li><span class="dtr-title">City  Area</span><span class="dtr-val">${item.city || ''} - ${item.area || ''}</span></li>
            <li><span class="dtr-title">Home Pass</span><span class="dtr-val">${item.homePass || '—'}</span></li>
          `;
        } else if (type === 'inventory') {
          detailsHtml = `
            <li><span class="dtr-title">Invoice Date</span><span class="dtr-val">${item.invoiceDate || '—'}</span></li>
            <li><span class="dtr-title">Vendor</span><span class="dtr-val">${item.receivedFrom || '—'}</span></li>
            <li><span class="dtr-title">Quantity</span><span class="dtr-val">${item.quantity || '0'} ${item.uom || ''}</span></li>
            <li><span class="dtr-title">Verified By</span><span class="dtr-val">${item.verifiedBy || '—'}</span></li>
          `;
        } else if (type === 'outward-inventory') {
          detailsHtml = `
            <li><span class="dtr-title">Location</span><span class="dtr-val">${item.location || '—'}</span></li>
            <li><span class="dtr-title">Outward Date</span><span class="dtr-val">${item.outwardDate || '—'}</span></li>
            <li><span class="dtr-title">Material</span><span class="dtr-val">${item.materialType || '—'}</span></li>
            <li><span class="dtr-title">Qty</span><span class="dtr-val">${item.quantityTaken || '0'}</span></li>
          `;
        } else if (type === 'complaints') {
          detailsHtml = `
            <li><span class="dtr-title">Outage Company</span><span class="dtr-val">${item.companyName || '—'}</span></li>
            <li><span class="dtr-title">Link Name</span><span class="dtr-val">${item.linkName || '—'}</span></li>
            <li><span class="dtr-title">Maintenance Vendor</span><span class="dtr-val">${item.maintainedBy || '—'}</span></li>
            <li><span class="dtr-title">Evisions SLA</span><span class="dtr-val">${item.evisionsSla || '—'}</span></li>
          `;
        }

        const visibleCols = row.querySelectorAll('td').length;

        childRow.innerHTML = `
          <td colspan="${visibleCols}" style="padding:0;">
            <div class="dtr-details">
              <ul class="dtr-details-list">
                ${detailsHtml}
              </ul>
            </div>
          </td>
        `;

        row.parentNode.insertBefore(childRow, row.nextSibling);
      }
    }

    function deleteRecord(tab, id) {
      if (!confirm('Are you sure you want to permanently delete this record?')) return;
      const key = 'ofp_' + tab.replace('-', '_');
      const db = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = db.filter(item => item.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      renderRecordsTable();
      renderDashboardData();
    }

    function showRecordDetails(tab, id) {
      const key = 'ofp_' + tab.replace('-', '_');
      const db = JSON.parse(localStorage.getItem(key) || '[]');
      const record = db.find(item => item.id === id);
      if (!record) return;

      const modal = document.getElementById('detail-modal');
      const content = document.getElementById('modal-body-content');
      document.getElementById('modal-title').textContent = `${tab.substring(0, 1).toUpperCase() + tab.substring(1)} Details (${record.id})`;

      let html = '<div class="detail-grid">';

      const keyLabels = {
        id: "Unique System ID",
        dateCreated: "System Saved Date",
        commDate: "Communication Date",
        commMode: "Communication Mode",
        company: "Company",
        projectType: "Project Type",
        workOrder: "Work Order Code",
        airtelId: "Airtel ID Reference",
        city: "City",
        area: "Geographic Area",
        gisNode: "GIS Node",
        endLatLong: "End Coordinates",
        endSite: "End Site Name",
        startLocation: "Start Location",
        startLatLong: "Start Coordinates",
        linkId: "Link ID Reference",
        surveyStart: "Survey Starting Point",
        woDistance: "WO Distance (meters)",
        surveyDistance: "Surveyed Distance (meters)",
        finalDistance: "Final Outage/Cable Distance",
        fiberCore: "Fiber Cores Count",
        homePass: "Home Pass Provisioned",
        startPermission: "Permission Status",
        buildingAccess: "Building Access Status",
        deploymentEngineer: "Lead Deployment Engineer",
        atEngineer: "Acceptance Test Engineer",
        ownership: "Material Ownership Type",
        teamVendor: "Allocated Vendor Name",
        supervisor: "Evisions Field Supervisor",
        manager: "Evisions Delivery Manager",
        issuesClearedDate: "Issues Cleared Date",
        permanency: "Billing Permanency Level",
        popAccess: "POP Site Access Status",
        siteStatus: "Current Site Status",
        workCompletedDate: "Rollout Completion Date",
        suggestion: "Engineering Suggestions",
        reworkRequired: "Rework Required State",
        reworkDate: "Rework Schedule Date",
        rfsStatus: "Ready For Service Status",
        rfsMonth: "RFS Month Target",
        odfNo: "ODF Rack Number",
        atStatus: "Acceptance Testing Status",
        atPaper: "AT Documentation Status",
        hotoNo: "HOTO Reference Code",
        hotoDate: "Handover To Operations Date",
        hotoDistance: "HOTO Recorded Distance",
        hotoSignature: "HOTO Document Signature",
        billingStatus: "Billing Process Status",
        poDate: "Purchase Order Date",
        poNo: "PO Reference Number",
        invoiceDate: "Invoice Receipt Date",
        invoiceNo: "Invoice Reference Number",
        invoiceSent: "Invoice Dispatched Status",
        baseAmount: "Base Cost Amount (INR)",
        gstAmount: "Tax GST Amount (INR)",
        finalAmount: "Total Billing Cost (INR)",
        arn: "ARN Transaction Code",
        approver: "Authorized Project Approver",
        paymentDueDate: "Payment Due Date",
        paymentStatus: "Invoice Payment Status",
        finalRemark: "Final Operational Remarks",

        // Inventory
        srNo: "Sheet Serial Number",
        receivedDate: "Receipt Date",
        receivedFrom: "Dispatched From Vendor",
        materialType: "Material Categorization",
        fiberCompany: "Manufacturing Brand",
        fiberType: "Fiber Cable Coating",
        coilDrum: "Coil/Drum Format",
        uom: "Unit of Measure",
        quantity: "Delivered Quantity",
        cableIdNo: "Drum ID / Tag Number",
        invoiceCableLength: "Cable Length on Invoice",
        startReading: "Cable Outer Drum Start Reading",
        endReading: "Cable Outer Drum End Reading",
        cableShort: "Is Cable Short?",
        differenceReading: "Discrepancy Meter Delta",
        inspectionRemark: "Quality Control Notes",
        ropeWire: "Allocated Rope Wire (Qty)",
        sleevesPackets: "Allocation Sleeves Packets",
        isopropylCans: "Allocation Alcohol Cans",
        zipTies: "Allocation Zip Ties Packets",
        tissuePackets: "Allocation Cleaning Tissues",
        splicingMachine: "Issued Splicing Machines",
        otdrMachine: "Issued OTDR Machines",
        powerMeter: "Issued Light Power Meters",
        headTorch: "Issued Technical Head Lamps",
        maskingTape: "Issued Heavy Tapes",
        otherRemarks: "Inventory Dispatch Notes",
        readyToSubmit: "Review Checkbox Passed",
        verifiedBy: "Verifying Store Officer",

        // Maintenance
        month: "Registered Month",
        year: "Registered Year",
        registeredNocExecutive: "Registering NOC Operator",
        receivedDateTime: "NOC Trigger Time",
        companyName: "Outage Company Carrier",
        linkType: "Link Topology Class",
        companyComplaintCode: "Carrier Internal Incident ID",
        uniqueCutNo: "Unique Cut Number",
        linkName: "Target Fiber Link Path",
        maintainedBy: "Maintenance Vendor Contractor",
        linkStatus: "Active Outage Ticket Status",
        assignedDateTime: "Contractor Dispatch Time",
        teamLeader: "Evisions Dispatch Lead",
        splicerName: "Field Splicing Engineer",
        riderName: "Field Operations Rider",
        fiberPullingRequired: "Outage Fiber Re-pulling Status",
        pullingTeamName: "Outage Pulling Team Contractor",
        fiberLength: "Pulled Fiber Length (Meters)",
        latitude: "Outage Spot Latitude",
        longitude: "Outage Spot Longitude",
        evisionsClosedDateTime: "Evisions Resolution Timestamp",
        evisionsClosedDate: "Evisions Resolution Date",
        companyClosedDateTime: "Carrier Close Timestamp",
        companyClosedDate: "Carrier Close Date",
        closedNocExecutive: "Closing NOC Operator",
        waitingForConfirmation: "Carrier Confirmation Idle Time",
        companyMttr: "Carrier Incident Ticket MTTR",
        secondSplicerName: "Secondary Splicer Backup",
        secondRiderName: "Secondary Rider Backup",
        outageReason: "Primary Cause of Fiber Outage",
        outageReasonType: "Outage Breakdown Category",
        delayTimeAligning: "Mobilization Delay Duration",
        delayReason: "Mobilization Delay Reason Details",
        aging: "Total Ticket Duration Log",
        newAging: "Adjusted Net Outage Time",
        remarks: "NOC Close Remarks"
      };

      for (const [key, val] of Object.entries(record)) {
        // Exclude fields not relevant to Outward Inventory if we are on that tab
        if (tab === 'outward-inventory') {
          if (['id', 'dateCreated', 'readyToSubmit', 'verifiedBy'].includes(key)) continue;
        } else {
          // Generic exclusions for other tabs if needed
          if (key === 'id') continue;
        }

        const label = keyLabels[key] || key;
        html += `
          <div class="detail-item">
            <div class="detail-label">${label}</div>
            <div class="detail-value">${val || '—'}</div>
          </div>
        `;
      }

      html += '</div>';
      content.innerHTML = html;
      modal.classList.remove('hidden');
    }

    function closeDetailsModal() {
      document.getElementById('detail-modal').classList.add('hidden');
    }

    // ===== DASHBOARD GENERATOR =====
    function renderDashboardData() {
      // 1. Load Data
      const projects = JSON.parse(localStorage.getItem('ofp_projects') || '[]');
      const inventory = JSON.parse(localStorage.getItem('ofp_inventory') || '[]');
      const complaints = JSON.parse(localStorage.getItem('ofp_complaints') || '[]');

      // 2. Render Cards based on Role
      const kpiContainer = document.getElementById('dashboard-kpis');
      kpiContainer.innerHTML = ''; // reset

      // Calculate general metrics
      const totalProjects = projects.length;
      const completedProjects = projects.filter(p => p.siteStatus === 'Completed').length;
      const activeProjects = projects.filter(p => p.siteStatus === 'WIP').length;

      const totalReceipts = inventory.length;
      const totalCableMeters = inventory
        .filter(i => i.materialType === 'Fiber')
        .reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0);

      const totalComplaints = complaints.length;
      const resolvedComplaints = complaints.filter(c => c.linkStatus === 'RESTORED').length;
      const activeComplaints = complaints.filter(c => c.linkStatus === 'WIP' || c.linkStatus === 'ASSIGNED').length;

      const slaInCount = complaints.filter(c => c.evisionsSla === 'In').length;
      const slaPercent = totalComplaints > 0 ? Math.round((slaInCount / totalComplaints) * 100) : 100;

      // Calculate avg MTTR for resolved complaints
      let totalMttrMin = 0;
      let mttrCount = 0;
      complaints.forEach(c => {
        if (c.linkStatus === 'RESTORED' && c.evisionsMttr) {
          const parts = c.evisionsMttr.split(':');
          if (parts.length >= 2) {
            totalMttrMin += (parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10));
            mttrCount++;
          }
        }
      });
      const avgMttrMin = mttrCount > 0 ? Math.round(totalMttrMin / mttrCount) : 0;
      const avgMttrStr = mttrCount > 0 ? `${Math.floor(avgMttrMin / 60)}h ${avgMttrMin % 60}m` : '0h 0m';

      // Construct dynamic boxes
      if (currentUser.role === ROLES.ADMIN) {
        // Admin card list
        kpiContainer.innerHTML = `
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Total Projects</h3>
              <p class="value">${totalProjects}</p>
              <p class="trend trend-up"><i class="fa-solid fa-circle-check"></i> ${completedProjects} Completed</p>
            </div>
            <div class="kpi-icon-box" style="background:#eff6ff; color:#3b82f6;"><i class="fa-solid fa-diagram-project"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Fiber Cable Stock</h3>
              <p class="value">${Math.round(totalCableMeters)} m</p>
              <p class="trend"><i class="fa-solid fa-truck-ramp-box"></i> ${totalReceipts} Delivery Invoices</p>
            </div>
            <div class="kpi-icon-box" style="background:#ecfdf5; color:#10b981;"><i class="fa-solid fa-boxes-stacked"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Active Outages (NOC)</h3>
              <p class="value">${activeComplaints}</p>
              <p class="trend trend-down"><i class="fa-solid fa-triangle-exclamation"></i> ${totalComplaints - resolvedComplaints} Open Tickets</p>
            </div>
            <div class="kpi-icon-box" style="background:#fffbeb; color:#f59e0b;"><i class="fa-solid fa-headset"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>SLA Performance</h3>
              <p class="value">${slaPercent}%</p>
              <p class="trend trend-up"><i class="fa-solid fa-chart-line"></i> Target is >95%</p>
            </div>
            <div class="kpi-icon-box" style="background:#fef2f2; color:#ef4444;"><i class="fa-solid fa-clock-rotate-left"></i></div>
          </div>
        `;
      } else if (currentUser.role === ROLES.PROJECT_MANAGER) {
        kpiContainer.innerHTML = `
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Total Project Sheets</h3>
              <p class="value">${totalProjects}</p>
              <p class="trend trend-up"><i class="fa-solid fa-circle-check"></i> Active PM Session</p>
            </div>
            <div class="kpi-icon-box" style="background:#eff6ff; color:#3b82f6;"><i class="fa-solid fa-diagram-project"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Active Sites (WIP)</h3>
              <p class="value">${activeProjects}</p>
              <p class="trend"><i class="fa-solid fa-person-digging"></i> Rollout Team active</p>
            </div>
            <div class="kpi-icon-box" style="background:#fffbeb; color:#f59e0b;"><i class="fa-solid fa-compass-drafting"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Completed Turnovers</h3>
              <p class="value">${completedProjects}</p>
              <p class="trend trend-up"><i class="fa-solid fa-handshake"></i> HOTO Documents ready</p>
            </div>
            <div class="kpi-icon-box" style="background:#ecfdf5; color:#10b981;"><i class="fa-solid fa-circle-check"></i></div>
          </div>
        `;
      } else if (currentUser.role === ROLES.INVENTORY_MANAGER) {
        kpiContainer.innerHTML = `
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Material Receipts</h3>
              <p class="value">${totalReceipts}</p>
              <p class="trend trend-up"><i class="fa-solid fa-clipboard-list"></i> Storehouse Session</p>
            </div>
            <div class="kpi-icon-box" style="background:#eff6ff; color:#3b82f6;"><i class="fa-solid fa-file-invoice"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Cable Stock In-house</h3>
              <p class="value">${Math.round(totalCableMeters)} m</p>
              <p class="trend"><i class="fa-solid fa-scroll"></i> Armoured & Unarmoured</p>
            </div>
            <div class="kpi-icon-box" style="background:#ecfdf5; color:#10b981;"><i class="fa-solid fa-boxes-stacked"></i></div>
          </div>
        `;
      } else if (currentUser.role === ROLES.MAINTENANCE_MANAGER) {
        kpiContainer.innerHTML = `
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Total NOC Tickets</h3>
              <p class="value">${totalComplaints}</p>
              <p class="trend trend-up"><i class="fa-solid fa-headset"></i> NOC Desk Session</p>
            </div>
            <div class="kpi-icon-box" style="background:#eff6ff; color:#3b82f6;"><i class="fa-solid fa-headset"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Restored Tickets</h3>
              <p class="value">${resolvedComplaints}</p>
              <p class="trend trend-up"><i class="fa-solid fa-shield-halved"></i> Splicing team cleared</p>
            </div>
            <div class="kpi-icon-box" style="background:#ecfdf5; color:#10b981;"><i class="fa-solid fa-circle-check"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>SLA Performance</h3>
              <p class="value">${slaPercent}%</p>
              <p class="trend"><i class="fa-solid fa-stopwatch"></i> Compliance counter</p>
            </div>
            <div class="kpi-icon-box" style="background:#fef2f2; color:#ef4444;"><i class="fa-solid fa-clock-rotate-left"></i></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-info">
              <h3>Avg Resolution Time</h3>
              <p class="value">${avgMttrStr}</p>
              <p class="trend trend-up"><i class="fa-solid fa-clock"></i> Mean Time To Repair</p>
            </div>
            <div class="kpi-icon-box" style="background:#f0fdf4; color:#16a34a;"><i class="fa-solid fa-stopwatch"></i></div>
          </div>
        `;
      }

      // 3. Render Custom SVG Donut SLA
      const circleEl = document.getElementById('donut-compliance-circle');
      const textVal = document.getElementById('donut-compliance-val');

      textVal.textContent = slaPercent + '%';
      // Circle radius is 70, circumference is 2 * PI * 70 = 439.8
      const offset = 439.8 - (slaPercent / 100) * 439.8;
      circleEl.setAttribute('stroke-dashoffset', offset);

      // Render legends box
      const legendsBox = document.getElementById('donut-legends-box');
      legendsBox.innerHTML = `
        <div class="legend-item">
          <div class="legend-label"><span class="legend-dot" style="background:var(--success)"></span> In SLA Duration</div>
          <span class="legend-val">${slaInCount}</span>
        </div>
        <div class="legend-item">
          <div class="legend-label"><span class="legend-dot" style="background:var(--danger)"></span> Breach / Out SLA</div>
          <span class="legend-val">${totalComplaints - slaInCount}</span>
        </div>
      `;

      // 4. Render Monthly Custom CSS Bar Chart
      // Group complaints by Carrier/Company
      const carrierGroup = {};
      complaints.forEach(c => {
        const company = c.companyName || 'OTHER';
        carrierGroup[company] = (carrierGroup[company] || 0) + 1;
      });

      const barChartContainer = document.getElementById('bar-chart-monthly');
      barChartContainer.innerHTML = ''; // reset

      // Find max value to calibrate height percentage
      let maxVal = Math.max(...Object.values(carrierGroup), 1);

      const carriers = Object.keys(carrierGroup).length > 0 ? Object.keys(carrierGroup) : ['AIRTEL', 'VIL', 'GAZON'];

      carriers.forEach(carrier => {
        const count = carrierGroup[carrier] || 0;
        const pctHeight = Math.max((count / maxVal) * 80, 5); // scale between 5% and 80%

        const col = document.createElement('div');
        col.className = 'bar-col';
        col.innerHTML = `
          <span class="bar-value">${count}</span>
          <div class="bar-visual" style="height: ${pctHeight}%;"></div>
          <span class="bar-label" title="${carrier}">${carrier}</span>
        `;
        barChartContainer.appendChild(col);
      });

      // 5. Render Recent Activities Log (Last 5 submittals across all three datasets)
      const recentRows = document.getElementById('recent-activity-rows');
      recentRows.innerHTML = ''; // reset

      const allItems = [];
      projects.forEach(p => {
        allItems.push({
          date: p.dateCreated || '—',
          category: 'Project',
          identifier: p.airtelId || 'PM Record',
          actor: p.deploymentEngineer || 'Suraj',
          status: p.siteStatus || 'WIP',
          statusClass: p.siteStatus === 'Completed' ? 'badge-success' : 'badge-warning'
        });
      });
      inventory.forEach(i => {
        allItems.push({
          date: i.dateCreated || '—',
          category: 'Inventory',
          identifier: i.invoiceNo || 'INV Record',
          actor: i.verifiedBy || 'Storehouse',
          status: i.materialType || 'Receipt',
          statusClass: 'badge-info'
        });
      });
      complaints.forEach(c => {
        allItems.push({
          date: c.dateCreated || '—',
          category: 'Complaint NOC',
          identifier: c.evisionsComplaintCode || 'NOC Ticket',
          actor: c.maintainedBy || 'NOC desk',
          status: c.linkStatus || 'Ticket',
          statusClass: c.linkStatus === 'RESTORED' ? 'badge-success' : 'badge-warning'
        });
      });

      // Sort by date created desc
      allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Append top 5
      const limit = allItems.slice(0, 5);
      if (limit.length === 0) {
        recentRows.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No records registered. Please start by filing a wizard sheet!</td></tr>`;
      } else {
        limit.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${item.date}</td>
            <td><strong>${item.category}</strong></td>
            <td><code>${item.identifier}</code></td>
            <td>${item.actor}</td>
            <td><span class="badge ${item.statusClass}">${item.status}</span></td>
          `;
          recentRows.appendChild(tr);
        });
      }
    }

    // ===== ON LOAD INITIALIZER =====
    window.addEventListener('DOMContentLoaded', () => {
      checkAuthOnLoad();
    });

    // Handle cross page init
    window.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedPanel = urlParams.get('panel');
      if (requestedPanel) {
        // Wait a tick for auth layout to apply
        setTimeout(() => {
          if (typeof navigateTo === 'function') {
            navigateTo(requestedPanel);
          }
        }, 100);
      }
    });

    function saveWizardProgress() {
      alert('✅ Draft Saved successfully!');
    }

    // ===== BILLING MANAGER =====
    let currentBillingWO = '';
    let currentBills = [];

    function loadBillingForWO() {
      const woInput = document.getElementById('billingSearchWO');
      const wo = woInput.value.trim();
      if (!wo) {
        alert('Please enter a Work Order.');
        return;
      }

      currentBillingWO = wo;
      const allBills = JSON.parse(localStorage.getItem('ofp_billing') || '{}');
      currentBills = allBills[wo] || [];

      document.getElementById('billingListContainer').classList.remove('hidden');
      renderBillingCards();
    }

    function renderBillingCards() {
      const container = document.getElementById('billingCardsWrapper');
      container.innerHTML = '';

      if (currentBills.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">No bills found for this Work Order. Add a new bill to begin.</p>';
        return;
      }

      currentBills.forEach((bill, index) => {
        const card = document.createElement('div');
        card.style = 'background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;';
        card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
        <h4 style="font-weight: 700; color: var(--text-main);"><i class="fas fa-file-invoice" style="color:var(--accent);"></i> Bill #${index + 1}</h4>
        <button type="button" style="background: none; border: none; color: var(--danger); cursor: pointer;" onclick="removeBillingCard(${index})"><i class="fas fa-trash"></i> Remove</button>
      </div>
      <div class="form-grid">
        <div class="field-group"><label>Billing Status</label>
          <select onchange="updateBillField(${index}, 'status', this.value)">
            <option value="Done" ${bill.status === 'Done' ? 'selected' : ''}>Done</option>
            <option value="Pending" ${bill.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Not Started" ${bill.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
          </select>
        </div>
        <div class="field-group"><label>PO Date</label><input type="date" value="${bill.poDate || ''}" onchange="updateBillField(${index}, 'poDate', this.value)"></div>
        <div class="field-group"><label>PO No.</label><input type="text" value="${bill.poNo || ''}" onchange="updateBillField(${index}, 'poNo', this.value)"></div>
        <div class="field-group"><label>Invoice Date</label><input type="date" value="${bill.invoiceDate || ''}" onchange="updateBillField(${index}, 'invoiceDate', this.value)"></div>
        <div class="field-group"><label>Invoice No.</label><input type="text" value="${bill.invoiceNo || ''}" onchange="updateBillField(${index}, 'invoiceNo', this.value)"></div>
        <div class="field-group"><label>Base Amount</label><input type="number" placeholder="0.00" value="${bill.baseAmount || ''}" onchange="updateBillField(${index}, 'baseAmount', this.value)"></div>
        <div class="field-group"><label>Final Amount</label><input type="number" placeholder="0.00" value="${bill.finalAmount || ''}" onchange="updateBillField(${index}, 'finalAmount', this.value)"></div>
        <div class="field-group"><label>Payment Status</label>
          <select onchange="updateBillField(${index}, 'paymentStatus', this.value)">
            <option value="Not Received" ${bill.paymentStatus === 'Not Received' ? 'selected' : ''}>Not Received</option>
            <option value="Fully Received" ${bill.paymentStatus === 'Fully Received' ? 'selected' : ''}>Fully Received</option>
            <option value="Overdue" ${bill.paymentStatus === 'Overdue' ? 'selected' : ''}>Overdue</option>
          </select>
        </div>
      </div>
    `;
        container.appendChild(card);
      });
    }

    function updateBillField(index, field, value) {
      currentBills[index][field] = value;
    }

    function addBillingCard() {
      currentBills.push({
        status: 'Not Started',
        poDate: '',
        poNo: '',
        invoiceDate: '',
        invoiceNo: '',
        baseAmount: '',
        finalAmount: '',
        paymentStatus: 'Not Received'
      });
      renderBillingCards();
    }

    function removeBillingCard(index) {
      if (confirm('Are you sure you want to remove this bill?')) {
        currentBills.splice(index, 1);
        renderBillingCards();
      }
    }

    function saveBillingForWO() {
      if (!currentBillingWO) return;
      const allBills = JSON.parse(localStorage.getItem('ofp_billing') || '{}');
      allBills[currentBillingWO] = currentBills;
      localStorage.setItem('ofp_billing', JSON.stringify(allBills));
      alert('Bills saved successfully for Work Order: ' + currentBillingWO);
    }
