const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello from API' });
});

router.use('/albums', require('./models/albums'));
router.use('/artists', require('./models/artists'));
router.use('/customers', require('./models/customers'));
router.use('/employees', require('./models/employees'));
router.use('/genres', require('./models/genres'));
router.use('/invoice-lines', require('./models/invoice-lines'));
router.use('/invoices', require('./models/invoices'));
router.use('/media-types', require('./models/media-types'));
router.use('/playlists', require('./models/playlists'));
router.use('/tracks', require('./models/tracks'));
router.use('/associations', require('./models/associations'));

// router.use('/user-playlists', require('./models/user-playlists'));
// router.use('/user-tracks', require('./models/user-tracks'));
// router.use('/user-albums', require('./models/user-albums'));
// router.use('/user-artists', require('./models/user-artists'));
// router.use('/user-genres', require('./models/user-genres'));
// router.use('/user-media-types', require('./models/user-media-types'));
// router.use('/user-playlist-tracks', require('./models/user-playlist-tracks'));
// router.use('/user-track-history', require('./models/user-track-history'));
// router.use('/user-track-likes', require('./models/user-track-likes'));
// router.use('/user-track-recently-played', require('./models/user-track-recently-played'));
// router.use('/user-track-starred', require('./models/user-track-starred'));
// router.use('/user-track-top-played', require('./models/user-track-top-played'));
// router.use('/user-track-top-rated', require('./models/user-track-top-rated'));
// router.use('/user-track-top-skipped', require('./models/user-track-top-skipped'));
// router.use('/user-track-top-starred', require('./models/user-track-top-starred'));
// router.use('/user-track-top-unrated', require('./models/user-track-top-unrated'));
// router.use('/user-track-top-unskipped', require('./models/user-track-top-unskipped'));
// router.use('/user-track-top-unstarred', require('./models/user-track-top-unstarred'));
// router.use('/user-track-top-user-rated', require('./models/user-track-top-user-rated'));
// router.use('/user-track-top-user-skipped', require('./models/user-track-top-user-skipped'));
// router.use('/user-track-top-user-starred', require('./models/user-track-top-user-starred'));
// router.use('/user-track-top-user-unrated', require('./models/user-track-top-user-unrated'));
router.use('/customers', require('./models/customers'));


module.exports = router;
