const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// listen for requests
app.listen(8000);


// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.render('index', { title: 'Login' });
});

app.get('/courses', (req, res) => {
    res.render('courses', { title: 'Courses' });
});

app.get('/schedule', (req, res) => {
    res.render('schedule', { title: 'Schedule' });
});