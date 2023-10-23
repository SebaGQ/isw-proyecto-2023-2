const Joi = require("joi");


const revisionBodySchema = Joi.object({
    Postulacion: Joi.string().required().messages({
        "string.empty": "La postulación no puede estar vacía.",
        "any.required": "La postulación es obligatoria.",
        "string.base": "La postulación debe ser de tipo string.",
    }),
    fechaModificacion: Joi.date().required().messages({
        "date.base": "La fecha de modificación debe ser de tipo date.",
        "any.required": "La fecha de modificación es obligatoria.",
    }),
    comentario: Joi.string().required().messages({
        "string.empty": "El comentario no puede estar vacío.",
        "any.required": "El comentario es obligatorio.",
        "string.base": "El comentario debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = revisionBodySchema;
