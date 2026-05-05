'use strict';

const Joi = require('joi');

const albumSchema = Joi.object({
  title: Joi.string().required().max(160),
  artist_id: Joi.number().integer().required(),
  artistId: Joi.number().integer() // Handle camelCase as well
});

const artistSchema = Joi.object({
  name: Joi.string().required().max(120)
});

const trackSchema = Joi.object({
  name: Joi.string().required().max(200),
  album_id: Joi.number().integer(),
  media_type_id: Joi.number().integer().required(),
  genre_id: Joi.number().integer(),
  composer: Joi.string().max(220),
  milliseconds: Joi.number().integer().required(),
  bytes: Joi.number().integer(),
  unit_price: Joi.number().precision(2).required()
});

module.exports = {
  albumSchema,
  artistSchema,
  trackSchema
};
