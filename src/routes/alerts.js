const express = require('express');
const router = express.Router();
const passport = require('passport');
const { sendNewAlertEmail } = require('../emails/alerts');
const getPricesForTicker = require('../apiData/dataAPIFunctions')
const validateAlertInput = require('../validation/alerts');

// Load models
const Client = require('../db/models/Client');
const Alert = require('../db/models/Alert');

// @route POST /alerts/:id
// @desc Create an alert - need clients id
// @access Private route
router.post(
  '/:id',
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
      sendNewAlertEmail(req.user, alert)
      res.json(alert);
    } catch (err) {
      res.status(404).json({ err: err });
    }
  }
);

// @route PATCH /alerts/:id - alert id
// @desc Update an alert
// @access Private route
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateAlertInput(req.body);
    const _id = req.params.id;
    const updates = {
      stock: req.body.stock,
      currentPrice: req.body.currentPrice,
      alertPrice: req.body.alertPrice
    };
    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      let alert = await Alert.findOneAndUpdate(
        { _id: _id },
        { $set: updates },
        { new: true }
      );

      await alert.save();
      res.json(alert);
    } catch (err) {
      res.status(404).json({ err: err });
    }
  }
);

// @route GET /alerts/:id - alert id
// @desc Get individual alert
// @acces Private route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    const _id = req.params.id;
    try {
      const alert = await Alert.findOne({ _id })

      const updates = {
        currentPrice: await getPricesForTicker(alert.stock)
      };
      let alertWithUpdatedPrice = await Alert.findOneAndUpdate(
        { _id: _id },
        { $set: updates },
        { new: true }
      );

      await alertWithUpdatedPrice.save();

      if (!alertWithUpdatedPrice) {
        errors.noalert = 'That alert doesnt exist.';
        return res.status(404).json(errors);
      }
      res.json(alertWithUpdatedPrice);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

// @route GET /alerts/:id - client id
// @desc Get all alerts for a client
// @access Private route
router.get(
  '/all/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    const _id = req.params.id;

    try {
      const allAlerts = await Alert.find({ client: _id }).populate('alerts', [
        'stock',
        'currentPrice',
        'alertPrice'
      ]);
      if (!allAlerts) {
        errors.noalerts = 'There are no alerts for this client';
        return res.status(404).json(errors);
      }
      res.json(allAlerts);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

// @route DELETE /alerts/:id - alert id
// @desc Delete an alert
// @access Private route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await Alert.findOneAndRemove({ _id: req.params.id });
      res.json({ success: true });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = router;
