const FacultyCourseAssignment = require('../models/FacultyCourseAssignment');

exports.assignCourseToFaculty = async (req, res) => {
  try {
    const { faculty_id, course_id, academic_year } = req.body;
    const assignment = new FacultyCourseAssignment({ faculty_id, course_id, academic_year });
    await assignment.save();
    res.status(201).json({ message: 'Course assigned to faculty', assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
