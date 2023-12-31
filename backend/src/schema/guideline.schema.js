"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const guidelineBodySchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z0-9\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "any.required": "El nombre es obligatorio.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.pattern.base": "El nombre no puede contener caracteres especiales.",
    }),
  maxSocialPercentage: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": "El porcentaje social máximo debe ser de tipo número.",
      "number.min": "El porcentaje social máximo no puede ser menor que 0.",
      "number.max": "El porcentaje social máximo no puede ser mayor que 100.",
      "number.positive": "El monto debe ser un número positivo.",
      "any.required": "El porcentaje social máximo es obligatorio.",
    }),
  minMembers: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "El mínimo de miembros debe ser de tipo número.",
      "number.min": "El mínimo de miembros no puede ser menor que 1.",
      "number.positive": "El monto debe ser un número positivo.",
      "any.required": "El mínimo de miembros es obligatorio.",
    }),
}).messages({
  "object.unknown": "No se permiten propiagees adicionales.",
});

module.exports = { guidelineBodySchema };
