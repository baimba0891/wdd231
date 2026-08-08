const params = new URLSearchParams(window.location.search);
const results = document.getElementById('results');
let output = '<ul>';
params.forEach((value, key) => {
  output += `<li><strong>${key}:</strong> ${value}</li>`;
});
output += '</ul>';
results.innerHTML = output;
