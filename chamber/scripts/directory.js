document.addEventListener('DOMContentLoaded', () => {
  const dirContainer = document.getElementById('directory');
  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');
  if (!dirContainer) return;

  async function getDirectory(){
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const members = data.members || data;
      displayDirectory(members);
    } catch (error) {
      console.error('Directory error:', error);
      dirContainer.innerHTML = `<p style="color:red;text-align:center;">Failed to load: ${error.message}<br>Use Live Server and check data/members.json</p>`;
    }
  }

  function displayDirectory(members){
    dirContainer.innerHTML='';
    members.forEach(m=>{
      const card = document.createElement('section');
      card.classList.add('dir-card');
      const levelClass = m.membership.toLowerCase().replace(' ','').replace('-','');
      const letter = m.name.charAt(0);
      card.innerHTML = `
        <img src="${m.image}" alt="${m.name} logo" loading="lazy" width="80" height="80" 
             onerror="this.onerror=null; this.src='https://via.placeholder.com/80?text=${letter}'">
        <h3>${m.name}</h3>
        <p>${m.address || ''}</p>
        <p>${m.phone || ''}</p>
        <a href="${m.website}" target="_blank" rel="noopener">${m.website ? m.website.replace('https://','') : ''}</a>
        <p><span class="level-badge ${levelClass}">${m.membership}</span></p>
      `;
      dirContainer.appendChild(card);
    });
  }

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click',()=>{
      dirContainer.className='grid';
      gridBtn.classList.add('active'); listBtn.classList.remove('active');
    });
    listBtn.addEventListener('click',()=>{
      dirContainer.className='list';
      listBtn.classList.add('active'); gridBtn.classList.remove('active');
    });
  }
  getDirectory();
});

