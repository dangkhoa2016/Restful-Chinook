const dbHelpers = require('../../libs/db-helpers');
const associationsMapping = require('../../libs/associations-mapping');
const tablesMapping = require('../../libs/tables-mapping');

const specialCases = {
  'tracks': {
    'type': 'many-to-one',
    'field': 'artist_id',
    'table': 'artists',
    'field_target': 'artist_id',
  },
  'invoices': {
    // has many invoice_lines -> tracks
  },
};

const handleBelongTo = async (model, record, res) => {
  const list = [];

  for (let key in associationsMapping[model]) {
    if (associationsMapping[model][key]['type'] === 'many-to-one') {
      const { field, table, field_target } = associationsMapping[model][key];
      let row = null;
      if (record[field]) {
        const { status, result } = await dbHelpers.getByQuery(key, { [field_target]: record[field] });
        row = status === 200 ? result.rows : null;
      }

      list.push({
        name: key,
        record: row,
      });
    }
  }

  res.status(200).json(list);
};


const handleHasMany = async (model, record, query, res) => {
  // console.log('query', query);
  if (query && Object.keys(query).length > 0) {
    const { target } = query || {};
    if (!target)
      return res.status(400).json({ message: 'Invalid target' });

    const { status, result } = await dbHelpers.getAll(target, query);
    res.status(status).json(result);
    return;
  }


  const list = [];
  for (let key in associationsMapping[model]) {
    if (associationsMapping[model][key]['type'] === 'one-to-many') {
      const { field, table, field_target } = associationsMapping[model][key];

      list.push({
        name: key,
        record: [],
      });
    }
  }

  res.status(200).json(list);
};

const controllers = {
  handleAssociations: async (req, res) => {
    let { model, action = '', id = '' } = req.query;

    model = model.replace(/-/g, '_');
    action = action.toLowerCase();
    const primaryKey = tablesMapping[model] && tablesMapping[model].primaryKey;
    if (!primaryKey) {
      return res.status(400).json({ message: 'Invalid model' });
    }

    const { status, result } = await dbHelpers.getById(model, { [primaryKey]: id });
    console.log('result', result, status);
    if (status !== 200) {
      return res.status(status).json(result);
    } else if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    switch (action) {
      case 'belongto':
        return handleBelongTo(model, result, res);
      case 'hasmany':
        query = req.query;
        delete query['model'];
        delete query['action'];
        delete query['id'];
        return handleHasMany(model, result, query, res);
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
  },
}

module.exports = controllers;
