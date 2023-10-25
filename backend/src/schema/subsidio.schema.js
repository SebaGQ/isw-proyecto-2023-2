const Joi = require("joi");

const subsidioBodySchema = Joi.object({
  Name: Joi.string().required().messages({
    "string.empty": "El nombre del subsidio no puede estar vacío.",
    "any.required": "El nombre del subsidio es obligatorio.",
    "string.base": "El nombre del subsidio debe ser de tipo string."
  }),
  Descripcion: Joi.string().required().messages({
    "string.empty": "La descripcion del subsidio no puede estar vacío.",
    "any.required": "La descripcion del subsidio es obligatorio.",
    "string.base": "La descripcion del subsidio debe ser de tipo string."
  }),
  Monto: Joi.number().positive().required().messages({
    "number.base": "El monto debe ser un número.",
    "number.positive": "El monto debe ser un número positivo.",
    "any.required": "El monto es obligatorio.",
  }),
  Tipo: Joi.string().valid("subsidio", "beneficio").required(),
  FechaInicio: Joi.string()
  .required()
  .pattern(/^((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4})$/)
  .messages({
    "string.empty": "FechaInicio no puede estar vacío.",
    "any.required": "FechaInicio es obligatorio.",
    "string.base": "FechaInicio debe ser de tipo string.",
    "string.pattern.base": "FechaInicio debe tener el formato 'DD/MM/YYYY'.",
  }),
  FechaTermino: Joi.string()
  .required()
  .pattern(/^((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4})$/)
  .messages({
    "string.empty": "FechaTermino no puede estar vacío.",
    "any.required": "FechaTermino es obligatorio.",
    "string.base": "FechaTermino debe ser de tipo string.",
    "string.pattern.base": "FechaTermino debe tener el formato 'DD/MM/YYYY'.",
  }),
  NombrePauta: Joi.string().required(),
  MaxPorcentajeFichaHogar: Joi.string().required(),
  MinCantidadIntegrantes: Joi.number().required(),
});


const subsidioIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  subsidioBodySchema,
  subsidioIdSchema,
};

