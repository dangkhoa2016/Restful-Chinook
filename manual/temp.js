var dbHelpers = require('./api/libs/db-helpers');

var result = await dbHelpers.create('albums', {
  title: 'The Colors',
  artist_id: 1
});

console.log(result);

var record = await dbHelpers.getById('albums', { album_id: 1 });

var records = await dbHelpers.getByQuery('tracks', { album_id: 1 }, { limit: 2, offset: 0 });

var record = await dbHelpers.getByRawQuery('SELECT COUNT(*) FROM tracks where album_id = 1;');

