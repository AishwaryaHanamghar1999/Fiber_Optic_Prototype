/* ==========================================================================
   OFP PORTAL - SIDEBAR DYNAMIC DRAWER CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('mobile-sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (toggleBtn && sidebar && overlay) {
    // Open menu drawer
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.add('open');
      overlay.classList.add('visible');
      overlay.classList.remove('hidden');
    });

    // Close menu drawer
    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      setTimeout(() => {
        // Double check it hasn't been reopened during animation
        if (!sidebar.classList.contains('open')) {
          overlay.classList.add('hidden');
        }
      }, 300);
    };

    // Close when overlay is clicked
    overlay.addEventListener('click', closeSidebar);

    // Close when close button is clicked
    const closeBtn = document.getElementById('mobile-sidebar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSidebar);
    }

    // Close when escape key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    });

    // Bind close action globally so routing can trigger it on navigation
    window.closeMobileSidebar = closeSidebar;
  }
});
