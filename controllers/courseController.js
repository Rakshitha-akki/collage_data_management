const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
  try {
    const { department_id, name, code, credits, type } = req.body;
    const course = new Course({ department_id, name, code, credits, type });
    await course.save();
    res.status(201).json({ message: 'Course added', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
