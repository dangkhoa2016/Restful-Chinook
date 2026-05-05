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

module.exports = router;
