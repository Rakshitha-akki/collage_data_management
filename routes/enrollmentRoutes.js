const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { enrollStudent } = require('../controllers/enrollmentController');

// Only admin can enroll students
router.post('/enroll', auth, roleCheck(['admin']), enrollStudent);

module.exports = router;
