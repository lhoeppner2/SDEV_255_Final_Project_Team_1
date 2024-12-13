const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// List all courses
router.get('/courses', courseController.listCourses);

// Show create course form (only accessible by teachers)
router.get('/courses/new', requireAuth, requireRole('teacher'), courseController.showCreateCourseForm);

// Create a new course (only accessible by teachers)
router.post('/courses', requireAuth, requireRole('teacher'), courseController.createCourse);

// Get details for a specific course
router.get('/courses/:id', courseController.getCourseDetails);

// Show edit course form (only accessible by teachers)
router.get('/courses/:id/edit', requireAuth, requireRole('teacher'), courseController.showEditCourseForm);

// Update a specific course (only accessible by teachers)
router.post('/courses/:id', requireAuth, requireRole('teacher'), courseController.updateCourse);

// Delete a specific course (only accessible by teachers)
router.post('/courses/:id/delete', requireAuth, requireRole('teacher'), courseController.deleteCourse);

module.exports = router;
