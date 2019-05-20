const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.stock = !isEmpty(data.stock) ? data.stock : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.stock)) {
    errors.stock = 'Stock field is required';
  }
  if (Validator.isEmpty(data.price) || data.price !== Number) {
    errors.price = 'Price field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
