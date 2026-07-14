async function loadInclude(id, file) {
  const response = await fetch(file);
  const content = await response.text();
  document.getElementById(id).innerHTML = content;


  if (id === "header") {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  }


  if (id === "footer") {
    const yearEl = document.getElementById("year");
    const modifiedEl = document.getElementById("lastModified");

    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    if (modifiedEl) {
      const lastMod = new Date(document.lastModified);
      modifiedEl.textContent = lastMod.toLocaleString(); // shows date + time
    }
  }
}

loadInclude("header", "header.html");
loadInclude("footer", "footer.html");

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("link[rel='icon']")) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "favicon.ico"; 
    favicon.type = "image/x-icon";
    document.head.appendChild(favicon);
  }
});

