const { camelize, classify, underscore } = require('inflection');
const dbHelpers = require('./db-helpers');

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

const getAllFn = async (tableName, req, res) => {
  const { status, result } = await dbHelpers.getAll(tableName, req.query);

  res.status(status).json(result);
};

const getOneFn = async (tableName, primaryKey, req, res) => {
  const { id } = req.params;
  const { status, result } = await dbHelpers.getById(tableName, { [primaryKey]: id });

  res.status(status).json(result);
};

const createFn = async (tableName, columns, req, res) => {
  const data = extractFields(req.body, columns);
  const { status, result } = await dbHelpers.create(tableName, data);

  res.status(status).json(result);
};

const updateFn = async (tableName, primaryKey, columns, req, res) => {
  const data = extractFields(req.body, columns);
  delete data[primaryKey]; // Can't update this

  const { id } = req.params;
  const { status, result } = await dbHelpers.update(tableName, data, { [primaryKey]: id });

  res.status(status).json(result);
};

const deleteFn = async (tableName, primaryKey, req, res) => {
  const { id } = req.params;
  const { status, result } = await dbHelpers.delete(tableName, { [primaryKey]: id });

  res.status(status).json(result);
};

module.exports = {
  extractFields,
  getAllFn,
  getOneFn,
  createFn,
  updateFn,
  deleteFn,
};
