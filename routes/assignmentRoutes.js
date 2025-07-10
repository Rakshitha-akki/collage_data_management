// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { assignCourseToFaculty } = require('../controllers/assignmentController');

// Only HOD or Admin can assign courses
router.post('/assign', auth, roleCheck(['admin', 'hod']), assignCourseToFaculty);

module.exports = router;
