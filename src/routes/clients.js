const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateClientInput = require('../validation/clients');
const validateAlertInput = require('../validation/alerts');

// Load models
const Client = require('../db/models/Client');
const Alert = require('../db/models/Alert');

// @route POST /clients
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
    const client = new Client({ ...req.body, user: req.user.id });

    client
      .save()
      .then(client => res.json(client))
      .catch(err => {
        console.log(err);
      });
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
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET /clients
// @desc   Get select client
// @access Private route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const _id = req.params.id;
    Client.findOne({ _id, user: req.user._id })
      .populate('client', ['name', 'identifier'])
      .then(client => {
        if (!client) {
          errors.noclient = 'That client doesnt exist.';
          return res.status(404).json(errors);
        }
        res.json(client);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE /clients
// @desc   Delete client
// @access Private route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Client.findOneAndRemove({ _id: req.params.id, user: req.user._id }).then(
      () => {
        res.json({ success: true });
      }
    );
  }
);

// @route POST /clients/alerts/:id
// @desc Create an alert
// @access Private route
router.post(
  '/alerts/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateAlertInput(req.body);
    const _id = req.params.id;

    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const clientId = await Client.findOne({ _id, user: req.user.id });

      const alert = await new Alert({ ...req.body, client: clientId._id });

      await alert.save();
      res.json(alert);
    } catch (err) {
      res.status(404).json({ err: err });
    }
  }
);

module.exports = router;
