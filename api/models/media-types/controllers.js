const controllerHelpers = require('../../libs/controller-helpers');
const tablesMapping = require('../../libs/tables-mapping');

const tableName = 'media_types';
const columns = tablesMapping[tableName].columns;
const primaryKey = tablesMapping[tableName].primaryKey;

const controllers = {
  getAll: controllerHelpers.getAllFn.bind(null, tableName),
  getOne: controllerHelpers.getOneFn.bind(null, tableName, primaryKey),
  create: controllerHelpers.deleteFn.bind(null, tableName, columns),
  update: controllerHelpers.deleteFn.bind(null, tableName, primaryKey, columns),
  delete: controllerHelpers.deleteFn.bind(null, tableName, primaryKey),
}

module.exports = controllers;
