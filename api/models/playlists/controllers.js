const controllerHelpers = require('../../libs/controller-helpers');
const tablesMapping = require('../../libs/tables-mapping');

const tableName = 'playlists';
const columns = tablesMapping[tableName].columns;
const primaryKey = tablesMapping[tableName].primaryKey;

const controllers = {
  getAll: controllerHelpers.getAllFn.bind(null, tableName),
  getTracks: async (req, res) => {
    const query = `
      SELECT tracks.* FROM tracks
      INNER JOIN playlist_track ON tracks.TrackId = playlist_track.TrackId
      WHERE playlist_track.PlaylistId = ?
    `;
    const { status, result } = await dbHelpers.getByRawQuery(query, [req.params.id]);

    res.status(status).json(result);
  },
  getOne: controllerHelpers.getOneFn.bind(null, tableName, primaryKey),
  create: controllerHelpers.deleteFn.bind(null, tableName, columns),
  update: controllerHelpers.deleteFn.bind(null, tableName, primaryKey, columns),
  delete: controllerHelpers.deleteFn.bind(null, tableName, primaryKey),
}

module.exports = controllers;
