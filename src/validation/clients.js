const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.identifier = !isEmpty(data.identifier) ? data.identifier : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Identifier field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
