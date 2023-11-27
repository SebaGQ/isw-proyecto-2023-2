"use strict";

const Joi = require("joi");
const AVAILABILITY = require("../constants/availability.constants");

const applicationBodySchema = Joi.object({
  userId: Joi.string()
    // Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del usuario no puede estar vacío.",
      "string.base": "El id del usuario debe ser de tipo string.",
      "string.pattern.base": "El id del usuario proporcionado no es un ObjectId válido.",
    }),
    // Cambios solicitados, validacion de rut, por cada valor en el array se verifica que cumpla con el pattern.
    rut: Joi.array().items(
      Joi.string().pattern(/^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/).required().messages({
          "string.empty": "El rut no puede estar vacío.",
          "any.required": "El rut es obligatorio.",
          "string.base": "El rut debe ser de tipo string.",
    })
    ).required().min(1).messages(
      {
        "array.base": "Los rut deben estar en formato de arreglo.",
        "any.required": "Los rut son obligatorios.",
        "array.min": "Debe haber al menos un rut."
    }),
  subsidyId: Joi.string()
    // Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del subsidio no puede estar vacío.",
      "string.base": "El id del subsidio debe ser de tipo string.",
      "string.pattern.base": "El id del subsidio proporcionado no es un ObjectId válido.",
    }),
  status: Joi.string()
    .valid(...AVAILABILITY)
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
    members: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "La cantidad de miembros debe ser de tipo número.",
      "number.min": "La cantidad de miembros no puede ser menor que 0.",
      "any.required": "La cantidad de miembros es obligatoria.",
    }),
  applicationDate: Joi.date()
    .messages({
      "date.base": "La fecha de postulación debe ser de tipo fecha.",
    }),
}).messages({
  "object.unknown": "No se permiten propiagees adicionales.",
});

module.exports = { applicationBodySchema };
