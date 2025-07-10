const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { addDepartment, assignHOD } = require('../controllers/departmentController');

router.post('/add', auth, roleCheck(['admin']), addDepartment);
router.put('/assign-hod', auth, roleCheck(['admin']), assignHOD);

module.exports = router;
