const express = require('express');
const router = express.Router();
const leadershipController = require('../controllers/leadershipController');

// POST /api/leadership/assign-hod
router.post('/assign-hod', leadershipController.assignHOD);

// GET /api/leadership/hods
router.get('/hods', leadershipController.getAllHODs);

module.exports = router;
