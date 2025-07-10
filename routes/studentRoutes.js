const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { addStudent, getOwnData } = require('../controllers/studentController');

router.post('/add', auth, roleCheck(['admin']), addStudent);
router.get('/me', auth, roleCheck(['student']), getOwnData);

module.exports = router;
