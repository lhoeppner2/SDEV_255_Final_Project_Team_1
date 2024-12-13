const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT asynchronously
      const decodedToken = jwt.verify(token, 'sdev255');
      console.log("Decoded Token:", decodedToken);

      // Ensure the user is set correctly in req.user
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.redirect('/index'); // In case user is not found
      }
      req.user = user; // Set user for later use
      next(); // Proceed to the next middleware/route handler
    } catch (err) {
      console.log(err.message);
      res.redirect('/index'); // Handle verification failure
    }
  } else {
    res.redirect('/index'); // Redirect if no token
  }
};

// student and teach roles
const requireRole = (role) => (req, res, next) => {
  if (req.user && req.user.studentOrTeacher === role) {
    next();
  } else {
    res.status(403).send('Access Denied: Insufficient Permissions');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'sdev255', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, requireRole };