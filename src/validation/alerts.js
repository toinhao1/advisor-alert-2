const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.stock = !isEmpty(data.stock) ? data.stock : '';
  data.currentPrice = !isEmpty(data.currentPrice) ? data.currentPrice : '';
  data.alertPrice = !isEmpty(data.alertPrice) ? data.alertPrice : '';

  if (Validator.isEmpty(data.stock)) {
    errors.stock = 'Stock field is required';
  }
  if (Validator.isEmpty(data.currentPrice)) {
    errors.currentPrice = 'Price field is required';
  }
  if (Validator.isEmpty(data.alertPrice)) {
    errors.alertPrice = 'Price field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
