const { camelize, classify, underscore } = require('inflection');

const getTransformFields = (field) => {
  return [camelize(field, true), underscore(field), classify(field)];
};

const extractFields = (obj, fields) => {
  const result = {};
  let transformFields = [];
  fields.forEach(field => {
    transformFields = getTransformFields(field);

    for (const transformField of transformFields) {
      if (Object.prototype.hasOwnProperty.call(obj, transformField)) {
        result[field] = obj[transformField];
        break;
      }
    }
  });
  return result;
};

module.exports = {
  extractFields,
  getTransformFields,
};
