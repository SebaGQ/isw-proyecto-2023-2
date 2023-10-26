"use strict";

// const con el joi
const Joi = require("joi");
// constante availability
const availability = require("../constants/avalibility.constants.js");

// constante postulationBodySchema
const postulationBodySchema = Joi.object({
    userId: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.pattern.base": "El id del usuario proporcionado no es un ObjectId válido",
        "any.required": "El id del usuario es requerido",
        "String.base": "El id del usuario debe ser de tipo string.",
        "string.empty": "El id de usuario no puede estar vacío.",
    }),
    subsidyId: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.pattern.base": "El id del subsidio proporcionado no es un ObjectId válido",
        "any.required": "El id del subsidio es requerido",
        "String.base": "El id del subsidio debe ser de tipo string.",
        "string.empty": "El id del subsidio no puede estar vacío.",
    }),
    socialPercentage: Joi.number().required().min(0).max(100).messages({
        "number.base": "El porcentaje social debe ser de tipo numérico",
        "number.empty": "El porcentaje social no puede estar vacío",
        "number.min": "El porcentaje social debe ser mayor o igual a 0",
        "number.max": "El porcentaje social debe ser menor o igual a 100",
        "any.required": "El porcentaje social es requerido",
    }),
    applicationDate: Joi.date().required().messages({
        "date.base": "La fecha de postulación debe ser de tipo date",
        "date.empty": "La fecha de postulación no puede estar vacía",
        "any.required": "La fecha de postulación es requerida",
    }),
    status: Joi.string().valid(...availability).messages({
        "string.base": "El estado de la postulación debe ser de tipo string",
        "string.empty": "El estado de la postulación no puede estar vacío",
        "any.required": "El estado de la postulación es requerido",
        "any.only": "El estado de la postulación debe ser uno de los siguientes: Pendiente, Aprobado, Rechazado",
    }),
}).messages({
    "object.unknown": "El objeto no puede tener propiedades desconocidas",
});

module.exports = {postulationBodySchema};