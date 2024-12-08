const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('views')); // middleware to serve static files from /pages directory
app.use(router);  // all routes are sent through ./router.js

app.listen(3000, () => {
  console.log(`app listening on port ${port}`);
})