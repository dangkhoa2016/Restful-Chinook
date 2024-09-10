var dbHelpers = require('./api/libs/db-helpers');

var result = await dbHelpers.create('albums', {
  title: 'The Colors',
  artist_id: 1
});

console.log(result);

var record = await dbHelpers.getById('albums', { album_id: 1 });
