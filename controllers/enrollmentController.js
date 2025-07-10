const StudentEnrollment = require('../models/StudentEnrollment');

exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id, academic_year } = req.body;

    const alreadyEnrolled = await StudentEnrollment.findOne({ student_id, course_id, academic_year });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Student already enrolled in this course' });
    }

    const enrollment = new StudentEnrollment({ student_id, course_id, academic_year });
    await enrollment.save();

    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
