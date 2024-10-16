const controller = require('./controller');

const express = require('express');

const router = express.Router();

router.get('/', controller.handleAssociations);

module.exports = router;
