// Salone Discover - Green White Blue Flag Theme - Uses places.json
import { getPlaces } from './data.js';
import { saveFavorite } from './storage.js';
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.textContent = isOpen ? 'X' : '\u2630';
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
    const data = await getPlaces();
    container.innerHTML = '';
    data.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.category = item.category.toLowerCase();
      card.innerHTML = '<img src="'+item.image+'" alt="'+item.name+'" loading="lazy" width="400" height="250" class="card-img"><div class="card-body"><span class="badge">'+item.category+'</span><h3 class="card-title">'+item.name+'</h3><p class="card-text">'+item.description+'</p><p class="card-meta"><strong>Location:</strong> '+(item.location||item.region||'Sierra Leone')+'</p><button class="btn card-btn" data-index="'+index+'">Learn More</button></div>';
      container.appendChild(card);
    });
    const dialog = document.getElementById('details-dialog');
    const closeBtn = document.getElementById('close-dialog');
    container.addEventListener('click', (e) => {
      if (e.target.matches('button[data-index]')) {
        const idx = e.target.dataset.index;
        const item = data[idx];
        document.getElementById('dialog-title').textContent = item.name;
        const imgEl = document.getElementById('dialog-image');
        if (imgEl) { imgEl.src = item.image; imgEl.alt = item.name; }
        document.getElementById('dialog-location').textContent = item.location || item.region || 'Sierra Leone';
        document.getElementById('dialog-desc').textContent = item.longDescription || item.description;
        document.getElementById('dialog-best').textContent = item.bestTime || 'Year-round';
        if (dialog) dialog.showModal();
        saveFavorite(item.id);
      }
    });
    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    }
    const filterAll = document.getElementById('filter-all');
    const filterBeach = document.getElementById('filter-beach');
    const filterHistory = document.getElementById('filter-history');
    const filterWildlife = document.getElementById('filter-wildlife');
    function filterPlaces(cat) {
      const cards = document.querySelectorAll('#destinations-container .card');
      cards.forEach(card => {
        const badge = card.querySelector('.badge').textContent.toLowerCase();
        const category = card.dataset.category;
        if (cat === 'all' || badge.includes(cat) || category.includes(cat)) { card.style.display = 'block'; } else { card.style.display = 'none'; }
      });
    }
    if (filterAll) filterAll.addEventListener('click', () => filterPlaces('all'));
    if (filterBeach) filterBeach.addEventListener('click', () => filterPlaces('beach'));
    if (filterHistory) filterHistory.addEventListener('click', () => filterPlaces('history'));
    if (filterWildlife) filterWildlife.addEventListener('click', () => {
      const cards = document.querySelectorAll('#destinations-container .card');
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (cat.includes('wildlife') || cat.includes('nature') || cat.includes('culture')) { card.style.display = 'block'; } else { card.style.display = 'none'; }
      });
    });
  } catch (err) {
    container.innerHTML = '<p class="loading-msg">Unable to load places. Check data/places.json exists</p>';
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
  thankYouContainer.innerHTML = '<div class="card thankyou-card"><h3 class="green-title">Thank you, '+name+'! SL</h3><p>We received your inquiry about <strong class="label-blue">'+(interest || 'Sierra Leone travel')+'</strong></p>'+(email ? '<p><strong>Email:</strong> '+email+'</p>' : '')+(message ? '<p><strong>Your Message:</strong> '+message+'</p>' : '')+'<p class="thankyou-highlight">We will respond within 24 hours!</p></div>';
}
