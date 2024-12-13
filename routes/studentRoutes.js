const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to view the student's schedule
router.get('/schedule', authMiddleware.requireAuth, studentController.viewSchedule);

// Route to add a course to the student's schedule
router.post('/schedule/add', authMiddleware.requireAuth, studentController.addCourse, studentController.viewSchedule);

// Route to drop a course from the student's schedule
router.post('/schedule/drop', authMiddleware.requireAuth, studentController.dropCourse);

module.exports = router;