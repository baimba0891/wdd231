document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  }

  const yearElement = document.getElementById('currentyear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const lastModElement = document.getElementById('lastModified');
  if (lastModElement) {
    lastModElement.textContent = `Last Modification: ${document.lastModified}`;
  }

  const levelLinks = document.querySelectorAll('.level-card a');
  const levelDetails = {
    'nonprofit-modal': 'NP Membership - Free\n\nBenefits:\n- Networking events\n- Newsletter subscription\n- Free listing in directory\n- Invitation to annual meeting',
    'bronze-modal': 'Bronze Membership - Le200/year\n\nBenefits:\n- All NP benefits\n- Social media mentions\n- 10% discount on events\n- Training workshops',
    'silver-modal': 'Silver Membership - Le400/year\n\nBenefits:\n- All Bronze benefits\n- Homepage spotlight (rotating)\n- 2 luncheon tickets\n- 15% event discount',
    'gold-modal': 'Gold Membership - Le650/year\n\nBenefits:\n- All Silver benefits\n- Homepage spotlight (priority)\n- 5 luncheon tickets + 1 sponsorship\n- Free training for staff\n- Front-page advertising\n- 20% event discount'
  };

  levelLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const detail = levelDetails[targetId];
      if (detail) {
        alert(detail);
      }
    });
  });

  const form = document.querySelector('form');
  if (form) {
    const orgTitle = document.getElementById('orgtitle');
    if (orgTitle) {
      orgTitle.addEventListener('input', () => {
        const pattern = /^[A-Za-z\s\-]{7,}$/;
        if (orgTitle.value && !pattern.test(orgTitle.value)) {
          orgTitle.setCustomValidity('Organization title must be at least 7 characters, letters, hyphens and spaces only');
        } else {
          orgTitle.setCustomValidity('');
        }
      });
    }
  }
});
