// Salone Discover - Green White Blue Flag Theme - Uses places.json
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}

const yearSpan = document.getElementById('currentyear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
const lastMod = document.getElementById('lastModified');
if (lastMod) lastMod.textContent = 'Last Modified: ' + document.lastModified;

async function loadDestinations() {
  const container = document.getElementById('destinations-container');
  if (!container) return;
  try {
    const response = await fetch('data/places.json');
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    container.innerHTML = '';
    data.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250" style="width:100%; height:220px; object-fit:cover; border-bottom:4px solid #1EB53A;">
        <div style="padding:1.2rem;">
          <span style="background:#0072C6; color:white; padding:3px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">${item.category}</span>
          <h3 style="margin:0.6rem 0 0.3rem; color:#0E7A2A;">${item.name}</h3>
          <p style="font-size:0.95rem; margin-bottom:0.8rem;">${item.description}</p>
          <p style="font-size:0.85rem;"><strong>Location:</strong> ${item.location}</p>
          <button class="btn" style="margin-top:0.8rem; width:100%;" data-index="${index}">Learn More</button>
        </div>
      `;
      container.appendChild(card);
    });
    const dialog = document.getElementById('details-dialog');
    const closeBtn = document.getElementById('close-dialog');
    container.addEventListener('click', (e) => {
      if (e.target.matches('button[data-index]')) {
        const idx = e.target.dataset.index;
        const item = data[idx];
        document.getElementById('dialog-title').textContent = item.name;
        document.getElementById('dialog-image').src = item.image;
        document.getElementById('dialog-location').textContent = item.location;
        document.getElementById('dialog-desc').textContent = item.longDescription || item.description;
        document.getElementById('dialog-best').textContent = item.bestTime || 'Year-round';
        if (dialog) dialog.showModal();
      }
    });
    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    }
  } catch (err) {
    container.innerHTML = '<p style="color:#0072C6; padding:2rem; text-align:center; border:2px dashed #1EB53A;">Unable to load places. Check data/places.json exists</p>';
  }
}
loadDestinations();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const params = new URLSearchParams(formData).toString();
    window.location.href = 'thankyou.html?' + params;
  });
}

const thankYouContainer = document.getElementById('thankyou-info');
if (thankYouContainer) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Traveler';
  const email = params.get('email') || '';
  const interest = params.get('interest') || '';
  const message = params.get('message') || '';
  thankYouContainer.innerHTML = `
    <div class="card" style="padding:1.5rem; max-width:600px; margin:0 auto;">
      <h3 style="color:#0E7A2A;">Thank you, ${name}! 🇸🇱</h3>
      <p>We received your inquiry about <strong style="color:#0072C6;">${interest || 'Sierra Leone travel'}</strong></p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ''}
      <p style="margin-top:1rem; padding:1rem; background:#E6F2FF; border-left:4px solid #1EB53A; border-radius:4px;">We will respond within 24 hours!</p>
    </div>
  `;
}

