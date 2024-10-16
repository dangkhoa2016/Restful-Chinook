const ControllerBase = require('../../libs/controller-base');
const dbHelpers = require('../../libs/db-helpers');

const tableName = 'playlists';
const controller = new ControllerBase(tableName);
controller.getTracks = async (req, res) => {
  const query = `
    SELECT tracks.* FROM tracks
    INNER JOIN playlist_track ON tracks.TrackId = playlist_track.TrackId
    WHERE playlist_track.PlaylistId = ?
  `;
  const { status, result } = await dbHelpers.getByRawQuery(query, [req.params.id]);

  res.status(status).json(result);
};
module.exports = controller;
