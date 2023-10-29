"use strict";

const Joi = require("joi");
const rutPattern = /^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/;
const ROLES =  require("../constants/roles.constants");
const userBodySchema = Joi.object({
  rut: Joi.string().pattern(rutPattern).required().messages({
    "string.empty": "El RUT no puede estar vacío.",
    "any.required": "El RUT es obligatorio.",
    "string.base": "El RUT debe ser de tipo string.",
    "string.pattern.base": "El RUT proporcionado no es válido.",
  }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido de usuario no puede estar vacío.",
    "any.required": "El apellido de usuario es obligatorio.",
    "string.base": "El apellido de usuario debe ser de tipo string.",
  }),
  edad: Joi.number().positive().required().messages({
    "number.base": "La edad debe ser de tipo número.",
    "any.required": "La edad es obligatoria.",
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
    .items(Joi.string().valid(...ROLES))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
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
