const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // 

exports.addStudent = async (req, res) => {
  try {
    const { name, email, enrollment_number, dob, admission_year, department_id, username, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password:hashedPassword, email, role: 'student' });
    await user.save();

    const student = new Student({
      name,
      email,
      enrollment_number,
      dob,
      admission_year,
      department_id,
      user_id: user._id
    });

    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOwnData = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.userId }).populate('department_id');
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
