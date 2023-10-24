// appeal.schema.js

"use strict";

const Joi = require("joi");

const appealBodySchema = Joi.object({
  postId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24})$/)
    .messages({
      "string.empty": "El id de la postulación no puede estar vacío.",
      "any.required": "El id de la postulación es obligatorio.",
      "string.pattern.base": "El id de la postulación proporcionado no es un ObjectId válido.",
    }),
  userId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24})$/)
    .messages({
      "string.empty": "El id del usuario no puede estar vacío.",
      "any.required": "El id del usuario es obligatorio.",
      "string.pattern.base": "El id del usuario proporcionado no es un ObjectId válido.",
    }),
  reason: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "La razón no puede estar vacía.",
      "any.required": "La razón es obligatoria.",
      "string.base": "La razón debe ser de tipo string.",
    }),
  status: Joi.string()
    .valid('Pending', 'Approved', 'Denied')
    .default('Pending')
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser 'Pending', 'Approved' o 'Denied'.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { appealBodySchema };
