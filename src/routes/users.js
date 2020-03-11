const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { sendCancelEmail, sendWelcomeEmail } = require('../emails/account');
const keys = require('../../config/keys');

const User = require('../db/models/User');

// Load input validation
const validateRegisterInput = require('../validation/registration');
const validateLoginInput = require('../validation/login');

// @route  GET api/users/register
// @desc   Register user
// @access Public route
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      sendWelcomeEmail(newUser.email, newUser.name);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Login user / Returning JwT Token
// @access Public route
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = { id: user.id, name: user.name }; // Create Jwt payload

        // Sign Token
        jwt.sign(
          payload,
          keys.JWT_SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET /users/current
// @desc   Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route  DELETE /users
// @desc   Delete user
// @access Private route
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await User.findOneAndRemove({ _id: req.user.id });

      sendCancelEmail(req.user.email, req.user.name);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
