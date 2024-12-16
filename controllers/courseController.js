// controllers/courseController.js
const User = require('../models/User');
const Course = require('../models/Course');

// GET /courses - List all courses
const listCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courses', { courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

// GET /courses/new - Show form to create a course
const showCreateCourseForm = (req, res) => {
    res.render('create-course', { title: 'Create Course' });
};

// POST /courses - Create a new course
const createCourse = async (req, res) => {
    
    try {
        const course = new Course(req.body);
        await course.save();
        
        // Find the logged-in user
        const user = await User.findById(req.user._id);
        if (!user) {
        return res.status(404).send('User not found');
        }
        // Save course to their schedule
        user.schedule.push(course);
        await user.save();
        
        res.redirect('/courses');
    } catch (error) {
        console.error('Error saving the course:', error);
        res.status(500).send('Error saving the course');
    }
};

// GET /courses/:id - Show details for a course
const getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('course-details', { title: course.name, course });
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).send('Internal Server Error');
    }
};

// GET /courses/:id/edit - Show edit form
const showEditCourseForm = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('edit-course', { title: 'Edit Course', course });
    } catch (error) {
        console.error('Error fetching course for editing:', error);
        res.status(500).send('Error fetching course for editing');
    }
};

// POST /courses/:id - Update a course
const updateCourse = async (req, res) => {
    try {
        await Course.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/schedule');
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Error updating course');
    }
};

// POST /courses/:id/delete - Delete a course
const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.redirect('/schedule');
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Error deleting course');
    }
};

module.exports = {
    listCourses,
    showCreateCourseForm,
    createCourse,
    getCourseDetails,
    showEditCourseForm,
    updateCourse,
    deleteCourse,
};
