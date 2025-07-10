const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  name: String,
  email: String,
  designation: String,
  joining_date: Date
});

module.exports = mongoose.model('Faculty', facultySchema);
