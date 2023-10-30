"use strict";

const Joi = require("joi");

/**
 * Esquema de validacion para el cuerpo de la solicitu de review
 * @constant {Object}
 */
const reviewBodySchema = Joi.object({
    applicationId: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24})$/)
        .messages({
            "string.empty": "El id de la postulacion no puede estar vacío.",
            "any.required": "El id de la postulacion es obligatorio.",
        }),
    comment: Joi.string().required().messages({
        "string.empty": "El comentario no puede estar vacío.",
        "any.required": "El comentario es obligatorio.",
        "string.base": "El comentario debe ser de tipo string.",
    }),
});

module.exports = reviewBodySchema;
