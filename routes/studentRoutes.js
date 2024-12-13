const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to view the student's schedule
router.get('/schedule', studentController.viewSchedule);

// Route to add a course to the student's schedule
router.post('/schedule/add', studentController.addCourse);

// Route to drop a course from the student's schedule
router.post('/schedule/drop', studentController.dropCourse);

module.exports = router;