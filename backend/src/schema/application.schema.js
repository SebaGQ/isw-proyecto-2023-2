"use strict";

const Joi = require("joi");
const AVAILIBILITY = require("../constants/availability.constants");

const applicationBodySchema = Joi.object({
  userId: Joi.string()
    .required()
    // Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del usuario no puede estar vacío.",
      "any.required": "El id del usuario es obligatorio.",
      "string.base": "El id del usuario debe ser de tipo string.",
      "string.pattern.base": "El id del usuario proporcionado no es un ObjectId válido.",
    }),
  subsidyId: Joi.string()
    .required()
    // Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del subsidio no puede estar vacío.",
      "any.required": "El id del subsidio es obligatorio.",
      "string.base": "El id del subsidio debe ser de tipo string.",
      "string.pattern.base": "El id del subsidio proporcionado no es un ObjectId válido.",
    }),
  status: Joi.string()
    .valid(...AVAILIBILITY)
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser 'En Revisión', 'Aceptado' o 'Rechazado'.",
    }),
  socialPercentage: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": "El porcentaje social debe ser de tipo número.",
      "number.min": "El porcentaje social no puede ser menor que 0.",
      "number.max": "El porcentaje social no puede ser mayor que 100.",
      "any.required": "El porcentaje social es obligatorio.",
    }),
  applicationDate: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha de postulación debe ser de tipo fecha.",
      "any.required": "La fecha de postulación es obligatoria.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { applicationBodySchema };
