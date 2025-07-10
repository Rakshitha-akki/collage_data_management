const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  head_of_department: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null },
  contact_email: String
});

module.exports = mongoose.model('Department', departmentSchema);
