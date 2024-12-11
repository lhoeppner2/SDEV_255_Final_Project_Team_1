const express = require('express');
const router = express.Router();
const { getAllCourses, getCourse } = require('./controllers/getCourses');


/*
  GET REQUESTS
*/
// Home
router.get('/', (req, res) => {
  res.render(`${__dirname}/views/home.ejs`);
});
router.get('/getAllCourses', (req, res) => {
  getAllCourses()
  .then( data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  });
});

// Add
router.get('/add', (req, res) => {
  res.render(`${__dirname}/views/add.ejs`);
});

router.get('/create', (req, res) => {
  res.render(`${__dirname}/views/create.ejs`);
});

// Course Page
router.get('/course/:id', (req, res) => {
  getCourse(req.params.id)
  .then( data => {
    console.log(data);
    res.render('course.ejs', { Course: data});
  })
  .catch( err => {
    console.log(err); -
    res.sendStatus(500);
  });
});

// Login
router.get('/login', (req, res) => {
  res.render(`${__dirname}/views/login.ejs`);
});

// Sign Up



// 404
router.get('*', (req, res) => {
  res.sendFile(`${__dirname}/views/404.html`);
});

/*
  POST REQUESTS
*/
// TODO: router.post('/add', (req, res) => { addNewCourse() });

// TODO: router.post('/login', (req, res) =>{
router.post('/login', (req, res) => {
   console.log(`username: ${req.body.username} password: ${req.body.password}`);
  });
//   console.log(Object.keys(res));
//   //console.log(res);
// });


module.exports = router;