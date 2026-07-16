const byuiCourse = {
  title: "BYU-Idaho Course",
  sections: [
    { sectionNumber: 1, enrolled: 25, capacity: 30 },
    { sectionNumber: 2, enrolled: 28, capacity: 30 }
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

