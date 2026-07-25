document.addEventListener('DOMContentLoaded', () => {
  // Footer dates
  const yearEl = document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  const lastModEl = document.getElementById('lastModified');
  if (lastModEl) lastModEl.textContent = `Last Modification: ${document.lastModified}`;

  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // Parse URL params from form method="get"
  const params = new URLSearchParams(window.location.search);
  const resultsDiv = document.getElementById('results');

  if (resultsDiv && params.toString()) {
    let html = '<h3>Your Submitted Information:</h3><ul>';
    
    const firstname = params.get('firstname');
    const lastname = params.get('lastname');
    const email = params.get('email');
    const phone = params.get('phone');
    const orgname = params.get('orgname');
    const orgtitle = params.get('orgtitle');
    const membership = params.get('membership');
    const timestamp = params.get('timestamp');

    if (firstname) html += `<li><strong>First Name:</strong> ${firstname}</li>`;
    if (lastname) html += `<li><strong>Last Name:</strong> ${lastname}</li>`;
    if (email) html += `<li><strong>Email:</strong> ${email}</li>`;
    if (phone) html += `<li><strong>Phone:</strong> ${phone}</li>`;
    if (orgname) html += `<li><strong>Organization:</strong> ${orgname}</li>`;
    if (orgtitle) html += `<li><strong>Title:</strong> ${orgtitle}</li>`;
    if (membership) html += `<li><strong>Membership:</strong> ${membership}</li>`;
    if (timestamp) {
      const date = new Date(timestamp);
      html += `<li><strong>Submitted:</strong> ${date.toLocaleString()}</li>`;
    }

    html += '</ul>';
    resultsDiv.innerHTML = html;
  }
});
