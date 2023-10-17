const Joi = require("joi");
const rutPattern = /^[0-9]+-[0-9kK]{1}$/;  

const revisionBodySchema = Joi.object({
    idPostulacion: Joi.string().required().messages({
        "string.empty": "El id de la postulacion no puede estar vacío.",
        "any.required": "El id de la postulacion es obligatorio.",
        "string.base": "El id de la postulacion debe ser de tipo string.",
    }),
    Estado: Joi.string().valid("Aprobado", "Rechazado", "En revisión", "Pendiente")
        .required().messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
        
    }),
    comentario: Joi.string().required().messages({
        "string.empty": "El comentario no puede estar vacío.",
        "any.required": "El comentario es obligatorio.",
        "string.base": "El comentario debe ser de tipo string.",
    }),
    rut: Joi.string()
        .required()
        .pattern(rutPattern)
        .messages({
            "string.empty": "El rut no puede estar vacío.",
            "any.required": "El rut es obligatorio.",
            "string.base": "El rut debe ser de tipo string.",
            "string.pattern.base": "El rut no tiene un formato válido.",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = revisionBodySchema;
