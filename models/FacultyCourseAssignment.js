// models/FacultyCourseAssignment.js
const mongoose = require('mongoose');

const facultyCourseAssignmentSchema = new mongoose.Schema({
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  academic_year: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FacultyCourseAssignment', facultyCourseAssignmentSchema);
