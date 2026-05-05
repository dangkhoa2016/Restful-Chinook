const controller = require('./controller.js');
const express = require('express');
const validate = require('../../libs/validation');
const { albumSchema } = require('../../libs/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Returns a list of all albums
 *     responses:
 *       200:
 *         description: A list of albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.post('/', validate(albumSchema), controller.create);

router.put('/:id', validate(albumSchema), controller.update);
router.patch('/:id', validate(albumSchema), controller.update);
router.post('/:id', validate(albumSchema), controller.update);

router.delete('/:id', controller.delete);
router.get('/:id/delete', controller.delete);

module.exports = router;
