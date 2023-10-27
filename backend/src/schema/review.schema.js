"use strict";

const Joi = require("joi");

/**
 * Esquema de validacion para el cuerpo de la solicitu de review
 * @constant {Object}
 */
const reviewBodySchema = Joi.object({
    applicationIdd: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El id de la solicitud no puede estar vacío.",
        "any.required": "El id de la solicitud es obligatorio.",
        }),
    modificationDate: Joi.date().required().messages({
        "date.base": "La fecha de modificación debe ser de tipo date.",
        "any.required": "La fecha de modificación es obligatoria.",
    }),
    comment: Joi.string().required().messages({
        "string.empty": "El comentario no puede estar vacío.",
        "any.required": "El comentario es obligatorio.",
        "string.base": "El comentario debe ser de tipo string.",
    }),
});

module.exports = reviewBodySchema;
