"use strict";

const Joi = require("joi");
const TYPE_SUBSIDY = require("./typeSubsidy.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const subsidyBodySchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "El nombre debe ser de tipo texto.",
      "string.empty": "El nombre no puede estar vacío.",
      "any.required": "El nombre es obligatorio."
    }),
  description: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "La descripción debe ser de tipo texto.",
      "string.empty": "La descripción no puede estar vacía.",
      "any.required": "La descripción es obligatoria."
    }),
  amount: Joi.number()
    .required()
    .positive()
    .messages({
      "number.base": "El monto debe ser de tipo número.",
      "number.positive": "El monto debe ser un número positivo.",
      "any.required": "El monto es obligatorio."
    }),
  dateStart: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha de inicio debe ser de tipo fecha.",
      "any.required": "La fecha de inicio es obligatoria."
    }),
  dateEnd: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha límite debe ser de tipo fecha.",
      "any.required": "La fecha límite es obligatoria."
    }),
  typeSubsidy: Joi.string()
    .required()
    .valid(TYPE_SUBSIDY)
    .messages({
      "string.base": "El tipo debe ser de tipo texto.",
      "any.required": "El tipo es obligatorio.",
      "any.only": "El tipo debe ser uno de los siguientes: Tipo1, Tipo2, Tipo3"
    }),
  guidelineId: Joi.string()
    .required()
    //Patrón que tienen los id de mongo, 24 caracteres hexadecimales
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id de la pauta no puede estar vacío.",
      "any.required": "El id de la pauta es obligatorio.",
      "string.base": "El id de la pauta debe ser de tipo string.",
      "string.pattern.base": "El id de la pauta proporcionado no es un ObjectId válido.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { subsidyBodySchema };
