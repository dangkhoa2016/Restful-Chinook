'use strict';

const Joi = require('joi');

/**
 * Validation middleware factory
 * @param {Joi.Schema} schema
 * @returns {Function} middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      const err = new Error(errorMessage);
      err.status = 422;
      return next(err);
    }
    next();
  };
};

module.exports = validate;
