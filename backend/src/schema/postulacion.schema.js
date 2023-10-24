"use strict";

//Son las importaciones
const Joi = require("joi");
const ROLES = require("../constants/roles.constants");
const rutPattern = /(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])/;

/**
 * Esquema de validacion para el body de la solicitud de postulacion
 * @constant {Object}
 */
const postulacionBodySchema = Joi.object(
    {
        usuario: Joi.string().required().messages({
        "string.empty": "El usuario no puede estar vacío.",
        "any.required": "El usuario es obligatorio.",
        "string.base": "El usuario debe ser de tipo string.",
        }),
        estado: Joi.string().required().messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
        }),
        fecha: Joi.date().required().messages({
        "string.empty": "La fecha no puede estar vacía.",
        "any.required": "La fecha es obligatoria.",
        "string.base": "La fecha debe ser de tipo string.",
        }),
        porcentajeFicha: Joi.string().messages({
        "string.empty": "El porcentaje de la ficha no puede estar vacío.",
        "any.required": "El porcentaje de la ficha es obligatorio.",
        "string.base": "El porcentaje de la ficha debe ser de tipo string.",
        }),
        integrantesHogar: Joi.number().required().messages({
        "string.empty": "Los integrantes del hogar no puede estar vacío.",
        "any.required": "Los integrantes del hogar es obligatorio.",
        "string.base": "Los integrantes del hogar debe ser de tipo string.",
        }),
    },
    {
        versionKey: false,
    },
    ).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    }
);

/**
 * Esquema de validacion para el id de postulacion
 * @constant {Object}
 */
const postulacionIdSchema = Joi.object({
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

module.exports = {postulacionBodySchema, postulacionIdSchema};