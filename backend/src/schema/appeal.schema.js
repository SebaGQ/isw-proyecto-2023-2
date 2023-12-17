"use strict";

const Joi = require("joi");
const AVAILABILITY = require("../constants/availability.constants");

const appealBodySchema = Joi.object({
  postId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      "string.length": "El id de la postulación debe tener 24 caracteres.",
      "string.hex": "El id de la postulación debe ser un string hexadecimal.",
      "any.required": "El id de la postulación es obligatorio.",
    }),

  userId: Joi.string()
    .length(24)
    .hex()
    .messages({
      "string.length": "El id del usuario debe tener 24 caracteres.",
      "string.hex": "El id del usuario debe ser un string hexadecimal.",
      "any.required": "El id del usuario es obligatorio.",
    }),

  status: Joi.string()
    .valid(...AVAILABILITY)
    .messages({
      "string.base": "El estado debe ser de tipo string.",
      "any.only": `El estado debe ser uno de los siguientes: ${AVAILABILITY.join(", ")}.`,
      "any.required": "El estado es obligatorio.",
    }),
    newMemberRUTs: Joi.array().items(
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
  newSocialPercentage: Joi.number()
    .min(0)
    .max(100)
    .messages({
      "number.base": "El porcentaje social debe ser un número.",
      "number.min": "El porcentaje social no puede ser menor a 0.",
      "number.max": "El porcentaje social no puede ser mayor a 100.",
    }),

  newMembers: Joi.number()
    .min(1)
    .messages({
      "number.base": "Los nuevos miembros deben ser un número.",
      "number.min": "Debe haber al menos un miembro.",
    }),

  comments: Joi.array().items(
    Joi.string().allow('').messages({
      "string.base": "El comentario debe ser de tipo string.",
    })
  ).messages({
    "array.base": "Los comentarios deben estar en formato de arreglo.",
    "any.required": "Los comentarios son obligatorios."
  }),

  result: Joi.array().items(
    Joi.string().allow('').messages({
      "string.base": "El resultado debe ser de tipo string.",
    })
  ),

}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { appealBodySchema };
