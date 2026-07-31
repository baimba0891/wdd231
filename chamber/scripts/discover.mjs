import { interests } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const messageDiv = document.querySelector("#visit-message");
const dialog = document.querySelector("#learn-more-dialog");

const dialogImg = document.querySelector("#dialog-img");
const dialogName = document.querySelector("#dialog-name");
const dialogAddress = document.querySelector("#dialog-address");
const dialogLongDesc = document.querySelector("#dialog-longDesc");
const dialogHours = document.querySelector("#dialog-hours");
const dialogWebsite = document.querySelector("#dialog-website");
const closeBtn = document.querySelector("#close-dialog");

closeBtn.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if(e.target === dialog) dialog.close(); });

interests.forEach(item => {
  const card = document.createElement("section");
  card.classList.add("discover-card", "card");
  card.style.gridArea = item.id;

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure><img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200"></figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    // NEW information, not the same as card
    dialogImg.src = item.detailImage || item.image;
    dialogImg.alt = item.name;
    dialogName.textContent = item.name;
    dialogAddress.textContent = `📍 ${item.address}`;
    dialogLongDesc.textContent = item.longDesc;
    dialogHours.textContent = item.hours;
    dialogWebsite.href = item.website;
    dialogWebsite.textContent = `Visit ${item.name} Official Site ↗`;
    dialog.showModal();
  });

  grid.appendChild(card);
});

// Visit message
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();
if (!lastVisit) {
  messageDiv.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffDays = Math.floor((now - Number(lastVisit)) / 86400000);
  messageDiv.textContent = diffDays < 1? "Back so soon! Awesome!" : `You last visited ${diffDays} ${diffDays === 1? "day" : "days"} ago.`;
}
localStorage.setItem("lastVisit", now.toString());
