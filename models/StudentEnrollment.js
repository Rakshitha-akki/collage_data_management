const mongoose = require('mongoose');

const studentEnrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  academic_year: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentEnrollment', studentEnrollmentSchema);
