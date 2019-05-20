const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateClientInput = require('../validation/clients');

// Load models
const Client = require('../db/models/Client');

// @route POST /client
// @desc Create or edit a client
// @access Private route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClientInput(req.body);

    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Client.findOne({ client: req.client.id }).then(client => {
      if (client) {
        // Update
        Client.findOneAndUpdate(
          { client: req.client.id },
          { $set: client },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        const client = new Client(req.body);

        client
          .save()
          .then(client => res.json(client))
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
);

// @route  GET /client
// @desc   Get current users clients
// @access Private route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Client.find({ user: req.user.id })
      .populate('client', ['name', 'stock'])
      .then(client => {
        if (!client) {
          errors.noclient = 'There are no clients for this user';
          return res.status(404).json(errors);
        }
        res.json(client);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET /client
// @desc   Get select client
// @access Private route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Client.findOne({ client: req.client.id })
      .populate('client', ['name', 'stock'])
      .then(client => {
        if (!client) {
          errors.noclient = 'That client doesnt exist.';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE /client
// @desc   Delete client
// @access Private route
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Client.findOneAndRemove({ client: req.client.id }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
