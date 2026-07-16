const byuiCourse = {
  title: "BYU-Idaho Course",
  sections: [
    { sectionNumber: 1, enrolled: 25, capacity: 88, instructor: "Brother Bingham" },
    { sectionNumber: 2, enrolled: 28, capacity: 81, instructor: "Sister Shultz" },
    { sectionNumber: 3, enrolled: 20, capacity: 95, instructor: "Sister Smith" }
  ],
  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find(s => s.sectionNumber === sectionNum);
    if (section) {
      if (enroll && section.enrolled < section.capacity) {
        section.enrolled++;
      } else if (!enroll && section.enrolled > 0) {
        section.enrolled--;
      }
    }
  }
};

export default byuiCourse;


