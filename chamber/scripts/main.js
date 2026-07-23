document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      
      // Accessibility: change icon label
      menuToggle.setAttribute('aria-label', !isExpanded ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close menu when a link is clicked (mobile UX)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          menu.classList.add('hidden');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
      });
    });
  }

  // Footer dates - with null checks so Page Audit doesn't error if IDs missing
  const yearEl = document.getElementById('year');
  const lastModEl = document.getElementById('lastModified');
  
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;
});
