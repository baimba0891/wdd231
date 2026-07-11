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
    card.classList.add('card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.tagline}</p>
      <p>Email: ${member.email}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p>Membership Level: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('grid');
  document.getElementById('directory').classList.remove('list');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('list');
  document.getElementById('directory').classList.remove('grid');
});

loadMembers();


