const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateClientInput = require('../validation/clients');

// Load models
const Client = require('../db/models/Client');

// @route POST /clients
// @desc Create or edit a client
// @access Private route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateClientInput(req.body);

    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const client = await new Client({ ...req.body, user: req.user.id });

      await client.save();

      res.json(client);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

// @route  GET /clients/all
// @desc   Get current users clients
// @access Private route
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Client.find({ user: req.user.id })
      .populate('client', ['name', 'identifier'])
      .then(clients => {
        if (!clients) {
          errors.noclient = 'There are no clients for this user';
          return res.status(404).json(errors);
        }
        res.json(clients);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route  GET /clients
// @desc   Get select client
// @access Private route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    const _id = req.params.id;

    try {
      const client = await Client.findOne({ _id, user: req.user._id }).populate(
        'client',
        ['name', 'identifier']
      );
      if (!client) {
        errors.noclient = 'That client doesnt exist.';
        return res.status(404).json(errors);
      }
      res.json(client);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

// @route  DELETE /clients/:id
// @desc   Delete client
// @access Private route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;
    try {
      await Client.findByIdAndDelete({ _id: id });
      res.json({ success: true });
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

module.exports = router;
