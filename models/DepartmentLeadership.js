const mongoose = require('mongoose');

const departmentLeadershipSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  position: {
    type: String,
    enum: ['HOD'],
    required: true
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('DepartmentLeadership', departmentLeadershipSchema);
