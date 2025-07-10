const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { addCourse } = require('../controllers/courseController');

router.post('/add', auth, roleCheck(['admin']), addCourse);

module.exports = router;
