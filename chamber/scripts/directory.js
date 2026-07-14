async function loadMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  const container = document.getElementById('directory');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.tagline || ''}</p>
      <p>Email: ${member.email}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p>Membership Level: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

// Toggle buttons
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const directory = document.getElementById('directory');

gridBtn.addEventListener('click', () => {
  directory.classList.add('grid');
  directory.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list');
  directory.classList.remove('grid');
});

loadMembers();
