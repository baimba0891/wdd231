async function loadInclude(id, file) {
  const response = await fetch(file);
  const content = await response.text();
  document.getElementById(id).innerHTML = content;
}

// Load header and footer
loadInclude("header", "header.html");
loadInclude("footer", "footer.html");

// Footer auto year and last modified
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
