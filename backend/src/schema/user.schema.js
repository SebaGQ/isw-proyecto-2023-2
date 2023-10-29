"use strict";

const Joi = require("joi");
const rutPattern = /^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/;

const userBodySchema = Joi.object({
  rut: Joi.string().pattern(rutPattern).required().messages({
    "string.empty": "El RUT no puede estar vacío.",
    "any.required": "El RUT es obligatorio.",
    "string.base": "El RUT debe ser de tipo string.",
    "string.pattern.base": "El RUT proporcionado no es válido.",
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "El nombre del usuario no puede estar vacío.",
    "any.required": "El nombre del usuario es obligatorio.",
    "string.base": "El nombre del usuario debe ser de tipo string.",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "El apellido del usuario no puede estar vacío.",
    "any.required": "El apellido del usuario es obligatorio.",
    "string.base": "El apellido del usuario debe ser de tipo string.",
  }),
  password: Joi.string().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roles: Joi.array()
    .items(Joi.string().hex().length(24))
    .required()
    .messages({
      "array.base": "Los roles deben ser de tipo array.",
      "any.required": "Los roles son obligatorios.",
      "string.base": "El id de rol debe ser de tipo string.",
      "string.hex": "El id de rol debe ser una cadena hexadecimal.",
      "string.length": "El id de rol debe tener 24 caracteres.",
    }),
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La nueva contraseña no puede estar vacía.",
    "string.base": "La nueva contraseña debe ser de tipo string.",
    "string.min": "La nueva contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { userBodySchema, userIdSchema };
