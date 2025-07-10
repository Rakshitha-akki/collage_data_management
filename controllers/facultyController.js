const Faculty = require('../models/Faculty');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // 

exports.addFaculty = async (req, res) => {
  try {
    const {
      name,
      email,
      designation,
      joining_date,
      department_id,
      username,
      password
    } = req.body;

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create the User with hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'faculty'
    });
    await user.save();

    //  Create Faculty linked to the user
    const faculty = new Faculty({
      name,
      email,
      designation,
      joining_date,
      department_id,
      user_id: user._id
    });

    await faculty.save();

    res.status(201).json({
      message: 'Faculty added successfully',
      faculty
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentsByFaculty = async (req, res) => {
  try {
    const facultyId = req.user.userId;

    const facultyCourses = await require('../models/FacultyCourseAssignment')
      .find({ faculty_id: facultyId })
      .select('course_id');

    const courseIds = facultyCourses.map(c => c.course_id);

    const students = await require('../models/StudentEnrollment')
      .find({ course_id: { $in: courseIds } })
      .populate('student_id');

    res.status(200).json({
      students: students.map(s => s.student_id)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
