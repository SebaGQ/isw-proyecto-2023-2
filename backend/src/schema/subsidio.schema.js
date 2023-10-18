"use strict";
const Joi = require("joi");

// Esquema para validar los campos de un subsidio, faltaria agregar mensajes
const subsidioBodySchema = Joi.object({
  Name: Joi.string().required(),
  Descripcion: Joi.string().required(),
  Type: Joi.string().required(),
  PorcentajeFichaHogar: Joi.string().allow(null).optional(),
  CantidadIntegrantes: Joi.number().allow(null).optional(),
  Direccion: Joi.string().required(),
  Monto: Joi.number().required(),
});

// Esquema para validar el ID de un subsidio
const subsidioIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  subsidioBodySchema,
  subsidioIdSchema,
};
