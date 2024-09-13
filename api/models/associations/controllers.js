const dbHelpers = require('../../libs/db-helpers');
const associationsMapping = require('../../libs/associations-mapping');
const tablesMapping = require('../../libs/tables-mapping');

const specialCases = {
  'tracks': [
    {
      'table': 'playlists',
      'query': 'SELECT * FROM playlists WHERE playlist_id in (SELECT playlist_id FROM playlists_tracks WHERE track_id = ?)',
      'field_target': 'track_id',
    }
  ],
  'playlists': [
    {
      'table': 'tracks',
      'query': 'SELECT * FROM tracks WHERE track_id in (SELECT track_id FROM playlists_tracks WHERE playlist_id = ?)',
      'field_target': 'playlist_id',
    }
  ],
  'invoices': [
    {
      'table': 'tracks',
      'query': 'SELECT * FROM tracks WHERE track_id in (SELECT track_id FROM invoice_lines WHERE invoice_id = ?)',
      'field_target': 'invoice_id',
    }
  ],
  'artists': [{
    'table': 'tracks',
    'query': 'SELECT * FROM tracks WHERE album_id in (SELECT album_id FROM albums WHERE artist_id = ?)',
    'field_target': 'artist_id',
  }],
};

const handleBelongTo = async (model, record, res) => {
  const list = [];

  for (let key in associationsMapping[model]) {
    if (associationsMapping[model][key]['type'] === 'many-to-one') {
      const { field, table, field_target } = associationsMapping[model][key];
      let row = null;
      if (record[field]) {
        const { status, result } = await dbHelpers.getByQuery(key, { [field_target]: record[field] });
        row = status === 200 ? result.rows[0] : null;
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
  if (query && Object.keys(query).length > 0) {
    const { target } = query || {};
    if (!target)
      return res.status(400).json({ message: 'Invalid target' });

    delete query['target'];
    const { limit, offset } = query;
    delete query['limit'];
    delete query['offset'];

    if (specialCases[model]) {
      var specialCase = specialCases[model].find(item => item.table === target);
      if (specialCase) {
        const { status, result } = await dbHelpers.getByRawQuery(specialCase.query, [record[specialCase.field_target]], { limit, offset });
        res.status(status).json(result);
        return;
      }
    }

    filter_field = associationsMapping[model][target]['field_target'];
    query[filter_field] = record[associationsMapping[model][target]['field']];

    const { status, result } = await dbHelpers.getByQuery(target, query, { limit, offset });
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

  if (specialCases[model]) {
    for (let item of specialCases[model]) {
      list.push({
        name: item.table,
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
