const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { checkUser } = require('./middleware/authMiddleware');
const studentRoutes = require('./routes/studentRoutes');

// express app
const app = express();

// Connect to MongoDB and start server
const dbURI = 'mongodb+srv://logan:test1234@cluster0.5zi0j.mongodb.net/SDEV_255_Final_Project_Team_1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then(() => app.listen(8000))
    .catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('*', checkUser); // Apply checkUser middleware to all routes
app.use(authRoutes); // Authentication routes
app.use(courseRoutes); // Course-related routes
app.use('/student', studentRoutes); // Student and schedule routes
app.get('/', (req, res) => res.redirect('/index'));
app.get('/index', (req, res) => res.render('index', { title: 'Login' }));
app.get('/signup', (req, res) => res.render('signup', { title: 'Sign Up' }));
app.get('/schedule', (req, res) => res.render('schedule', { title: 'Schedule' }));

module.exports = app;