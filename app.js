const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express app
const app = express();

//connect to mongodb and listen
const dbURI = 'mongodb+srv://logan:test1234@cluster0.5zi0j.mongodb.net/SDEV_255_Final_Project_Team_1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// routes
app.get('*', checkUser);
app.use(authRoutes);
app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.render('index', { title: 'Login' });
});

app.get('/signup', (req, res) => {
    console.log('Rendering signup page with title:', 'Sign Up');

    res.render('signup', { title: 'Sign Up' });
});


app.get('/schedule', (req, res) => {
    res.render('schedule', { title: 'Schedule' });
});

// GET /courses - List all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses from the database
        res.render('courses', { courses }); // Pass courses to the EJS template
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to display the "Create Course" form
app.get('/courses/new', (req, res) => {
    res.render('create-course', { title: 'Create Course' });
});

// Route to handle form submission
app.post('/courses', (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect('/courses'); // Redirect to the courses list
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving the course');
        });
});

// GET /courses/:id - Show details for a single course
app.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('course-details', { title: course.name, course });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching course details.');
    }
});

// GET /courses/:id/edit - Show form to edit a course
app.get('/courses/:id/edit', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('edit-course', { title: 'Edit Course', course });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching course for editing.');
    }
});

// PUT /courses/:id - Update a course
app.post('/courses/:id', async (req, res) => {
    try {
        await Course.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/courses'); // Redirect to the course list page after update
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating course.');
    }
});

// DELETE /courses/:id - Delete a course
app.post('/courses/:id/delete', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.redirect('/courses'); // Redirect to the course list page after delete
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting course.');
    }
});