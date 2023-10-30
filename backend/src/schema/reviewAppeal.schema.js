"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de revisión de apelación.
 * @constant {Object}
 */
const reviewAppealBodySchema = Joi.object({
  appealId: Joi.string()
    // Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24})$/)
    .required()
    .messages({
      "string.empty": "El id de la apelación no puede estar vacío.",
      "string.pattern.base": "El id de la apelación proporcionado no es un ObjectId válido.",
      "any.required": "El id de la apelación es obligatorio.",
    }),
  comment: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "El comentario no puede estar vacío.",
      "any.required": "El comentario es obligatorio.",
      "string.base": "El comentario debe ser de tipo string.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { reviewAppealBodySchema };
