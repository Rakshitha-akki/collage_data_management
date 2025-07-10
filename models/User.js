const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: { type: String, enum: ['admin', 'hod', 'faculty', 'student'], required: true }
});
module.exports = mongoose.model('User', userSchema);
