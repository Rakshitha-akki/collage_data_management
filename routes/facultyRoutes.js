const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { addFaculty, getStudentsByFaculty } = require('../controllers/facultyController');

router.post('/add', auth, roleCheck(['admin']), addFaculty);
router.get('/students', auth, roleCheck(['faculty']), getStudentsByFaculty);

module.exports = router;
