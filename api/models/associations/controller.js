const dbHelpers = require('../../libs/db-helpers');
const associationsMapping = require('../../libs/associations-mapping');
const tablesMapping = require('../../libs/tables-mapping');

const specialCases = {
  tracks: [
    {
      table: 'playlists',
      query: 'SELECT * FROM playlists WHERE playlist_id IN (SELECT playlist_id FROM playlists_tracks WHERE track_id = ?)',
      field_target: 'track_id',
    },
  ],
  playlists: [
    {
      table: 'tracks',
      query: 'SELECT * FROM tracks WHERE track_id IN (SELECT track_id FROM playlists_tracks WHERE playlist_id = ?)',
      field_target: 'playlist_id',
    },
  ],
  invoices: [
    {
      table: 'tracks',
      query: 'SELECT * FROM tracks WHERE track_id IN (SELECT track_id FROM invoice_lines WHERE invoice_id = ?)',
      field_target: 'invoice_id',
    },
  ],
  artists: [
    {
      table: 'tracks',
      query: 'SELECT * FROM tracks WHERE album_id IN (SELECT album_id FROM albums WHERE artist_id = ?)',
      field_target: 'artist_id',
    },
  ],
};

const fetchAssociatedRecord = async (key, field, record) => {
  if (record[field]) {
    const { status, result } = await dbHelpers.getByQuery(key, { [field]: record[field] }, { count: false });
    return status === 200 ? result.rows[0] : null;
  }
  return null;
};

const handleBelongTo = async (model, record, res) => {
  const list = await Promise.all(
    Object.entries(associationsMapping[model]).map(async ([key, { type, field }]) => {
      if (type === 'many-to-one') {
        const associatedRecord = await fetchAssociatedRecord(key, field, record);
        return { name: key, record: associatedRecord };
      }
      return null;
    })
  );

  res.status(200).json(list.filter(Boolean));
};

const handleSpecialCase = async (model, record, target, limit, offset, res) => {
  const specialCase = specialCases[model]?.find(item => item.table === target);
  if (specialCase) {
    const { status, result } = await dbHelpers.getByRawQuery(specialCase.query, [record[specialCase.field_target]], { limit, offset });
    res.status(status).json(result);
    return true;
  }

  return false;
};

const handleHasMany = async (model, record, query, res) => {
  const { target, limit, offset, ...restQuery } = query;

  if (!target) {
    res.status(400).json({ message: 'Invalid target' });
    return;
  }

  if (await handleSpecialCase(model, record, target, limit, offset, res))
    return;

  if (!associationsMapping[model][target]) {
    res.status(400).json({ message: 'Invalid target' });
    return;
  }

  const filterField = associationsMapping[model][target].field_target;
  restQuery[filterField] = record[associationsMapping[model][target].field];

  const { status, result } = await dbHelpers.getByQuery(target, restQuery, { limit, offset });
  res.status(status).json(result);
};

/*
const getAssociationsList = (model) => {
  const list = Object.entries(associationsMapping[model]).map(([key, { type }]) => {
    if (type === 'one-to-many') return { name: key, record: [] };
    return null;
  }).filter(Boolean);

  if (specialCases[model]) {
    specialCases[model].forEach(item => {
      list.push({ name: item.table, record: [] });
    });
  }

  return list;
};
*/

const controllers = {
  handleAssociations: async (req, res) => {
    let { model, action = '', id = '' } = req.query;

    model = model.replace(/-/g, '_');
    action = action.toLowerCase();
    
    const primaryKey = tablesMapping[model]?.primaryKey;
    if (!primaryKey) return res.status(400).json({ message: 'Invalid model' });

    const { status, result } = await dbHelpers.getById(model, { [primaryKey]: id });
    if (status !== 200) return res.status(status).json(result);
    if (!result) return res.status(404).json({ message: 'Not found' });

    let query = null;
    switch (action) {
      case 'belongto':
        return handleBelongTo(model, result, res);
      case 'hasmany':
        query = { ...req.query };
        delete query.model;
        delete query.action;
        delete query.id;
        return handleHasMany(model, result, query, res);
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
  },
};

module.exports = controllers;
