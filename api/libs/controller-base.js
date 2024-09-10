const dbHelpers = require('./db-helpers');
const controllerHelpers = require('./controller-helpers');
const tablesMapping = require('./tables-mapping');

const fetchSettings = (tableName, field) => {
  if (!tablesMapping[tableName])
    return null;

  return tablesMapping[tableName][field];
};

class ControllerBase {
  constructor(tableName) {
    this.tableName = tableName;
    this.columns = fetchSettings(tableName, 'columns');
    this.primaryKey = fetchSettings(tableName, 'primaryKey');
  }

  getAll = async (req, res) => {
    const { status, result } = await dbHelpers.getAll(this.tableName, req.query);

    res.status(status).json(result);
  }

  getOne = (req, res) => {
    return this.baseAction('getById', req, res);
  }
  
  create = async (req, res) => {
    const data = controllerHelpers.extractFields(req.body, this.columns);
    const { status, result } = await dbHelpers.create(this.tableName, data);

    res.status(status).json(result);
  }

  update = async (req, res) => {
    const data = controllerHelpers.extractFields(req.body, this.columns);
    delete data[this.primaryKey]; // Can't update this

    const { id } = req.params;
    const { status, result } = await dbHelpers.update(this.tableName, data, { [this.primaryKey]: id });

    res.status(status).json(result);
  }

  delete = (req, res) => {
    return this.baseAction('delete', req, res);
  }

  baseAction = async (action, req, res) => {
    const { id } = req.params;
    const { status, result } = await dbHelpers[action](this.tableName, { [this.primaryKey]: id });

    res.status(status).json(result);
  }
}

module.exports = ControllerBase;
