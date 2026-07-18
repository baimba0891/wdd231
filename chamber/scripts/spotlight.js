const membersUrl = 'data/members.json';
const spotlightContainer = document.getElementById('spotlight-container');

async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    const data = await response.json();
    displaySpotlights(data.members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displaySpotlights(members) {
  // 1. Filter for Gold and Silver only - W03 requirement
  const qualifiedMembers = members.filter(member => 
    member.membership === 'Gold' || member.membership === 'Silver'
  );

  // 2. Randomize order
  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

  // 3. Select 2 or 3
  const selected = shuffled.slice(0, 3);

  selected.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="80" height="80">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website.replace('https://','')}</a></p>
      <p class="level">${member.membership} Member</p>
    `;
    spotlightContainer.appendChild(card);
  });
}

getMembers();
