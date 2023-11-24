const Joi = require("joi");
const AVAILABILITY = require("../constants/availability.constants");

const reviewBodySchema = Joi.object({
    applicationId: Joi.string()
        .required()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        .messages({
            "string.empty": "El id de la postulación no puede estar vacío.",
            "any.required": "El id de la postulación es obligatorio.",
<<<<<<< HEAD
            "string.pattern.base": "El id de la postulación debe ser un ObjectId válido de MongoDB."
        }),
    comments: Joi.array().items(
=======
            "string.pattern.base": "El id de la postulación debe ser un ObjectId válido de MongoDB.",
        }),
    comment: Joi.array().items(
>>>>>>> origin/SergioVillenaDev
        Joi.string().required().messages({
            "string.empty": "El comentario no puede estar vacío.",
            "any.required": "El comentario es obligatorio.",
            "string.base": "El comentario debe ser de tipo string.",
<<<<<<< HEAD
        })
    ).required().min(1).messages({
        "array.base": "Los comentarios deben estar en formato de arreglo.",
        "any.required": "Los comentarios son obligatorios.",
        "array.min": "Debe haber al menos un comentario."
=======
        }),
    ).required().min(1).messages({
        "array.base": "Los comentarios deben estar en formato de arreglo.",
        "any.required": "Los comentarios son obligatorios.",
        "array.min": "Debe haber al menos un comentario.",
>>>>>>> origin/SergioVillenaDev
    }),
    status: Joi.string()
        .required()
        .valid(...AVAILABILITY)
        .messages({
            "string.base": "El estado debe ser de tipo string.",
            "any.required": "El estado es obligatorio.",
<<<<<<< HEAD
            "any.only": `El estado debe ser uno de los siguientes: ${AVAILABILITY.join(", ")}.`
=======
            "any.only": "El estado debe ser valido.",
        }),
    statusPercentage: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "El estado de porcentaje debe ser de tipo booleano.",
            "any.required": "El estado de porcentaje es obligatorio.",
        }),
    statusMembers: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "El estado de miembros debe ser de tipo booleano.",
            "any.required": "El estado de miembros es obligatorio.",
        }),
    statusDate: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "El estado de fecha debe ser de tipo booleano.",
            "any.required": "El estado de fecha es obligatorio.",
>>>>>>> origin/SergioVillenaDev
        }),
});

module.exports = { reviewBodySchema };
