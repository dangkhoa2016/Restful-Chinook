const { camelize, classify, underscore } = require('inflection');

const extractFields = (obj, fields) => {
  const result = {};
  let transformFields = [];
  fields.forEach(field => {
    transformFields = getTransformFields(field);

    for (const transformField of transformFields) {
      if (obj.hasOwnProperty(transformField)) {
        result[field] = obj[transformField];
        break;
      }
    }
  });
  return result;
};

const getTransformFields = (field) => {
  return [camelize(field, true), underscore(field), classify(field)];
};

module.exports = {
  extractFields
};
