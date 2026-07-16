export function setSectionSelection(sections) {
  const selectElement = document.querySelector("#sectionNumber");
  selectElement.innerHTML = "";
  sections.forEach(section => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `Section ${section.sectionNumber}`;
    selectElement.appendChild(option);
  });
}

