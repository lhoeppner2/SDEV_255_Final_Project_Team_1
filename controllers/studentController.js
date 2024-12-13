const User = require('../models/User');
const Course = require('../models/Course');

// Controller to view the student's schedule
exports.viewSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courses = await Course.find({}); // Fetch all available courses
    
    // Fetch courses from the schedule based on course IDs
    const userCourses = user.schedule.map(courseId => {
      return courses.find(course => course._id.toString() === courseId.toString());
    }).filter(course => course);  // Filter out any invalid course entries

    res.render('schedule', { user, courses, userCourses });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching schedule');
  }
};

// Controller to add a course to the student's schedule
exports.addCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    // Check if the course is already in the student's schedule
    if (user.schedule.includes(courseId)) {
      return res.status(400).send('Course already added');
    }

    user.schedule.push(courseId);
    await user.save();

    res.redirect('/schedule');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding course');
  }
};

// Controller to drop a course from the student's schedule
exports.dropCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const user = await User.findById(req.user._id);

    // Check if the course exists in the student's schedule
    if (!user.schedule.includes(courseId)) {
      return res.status(400).send('Course not found in your schedule');
    }

    // Remove the course from the student's schedule
    user.schedule = user.schedule.filter(id => id.toString() !== courseId.toString());
    await user.save();

    res.redirect('/schedule');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error dropping course');
  }
};
