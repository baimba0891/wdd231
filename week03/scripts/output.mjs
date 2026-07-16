export function setTitle(course) {
  document.querySelector("#courseTitle").textContent = course.title;
}

export function renderSections(sections) {
  const output = document.querySelector("#sections");
  output.innerHTML = "";
  sections.forEach(section => {
    const div = document.createElement("div");
    div.textContent = `Section ${section.sectionNumber}: ${section.enrolled}/${section.capacity}`;
    output.appendChild(div);
  });
}

