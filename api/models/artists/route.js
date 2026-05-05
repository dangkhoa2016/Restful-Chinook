const controller = require('./controller.js');
const express = require('express');
const validate = require('../../libs/validation');
const { artistSchema } = require('../../libs/schemas');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.post('/', validate(artistSchema), controller.create);

router.put('/:id', validate(artistSchema), controller.update);
router.patch('/:id', validate(artistSchema), controller.update);
router.post('/:id', validate(artistSchema), controller.update);

router.delete('/:id', controller.delete);
router.get('/:id/delete', controller.delete);

module.exports = router;
