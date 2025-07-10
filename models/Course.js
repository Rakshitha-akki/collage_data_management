const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  name: { type: String, required: true },
  code: { type: String, unique: true },
  credits: Number,
  type: String // theory, practical, etc.
});

module.exports = mongoose.model('Course', courseSchema);
