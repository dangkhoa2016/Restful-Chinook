const controller = require('./controller.js');
const express = require('express');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.get('/:id/tracks', controller.getTracks);

router.post('/', controller.create);

router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.post('/:id', controller.update);

router.delete('/:id', controller.delete);
router.get('/:id/delete', controller.delete);

module.exports = router;
