const Joi = require("joi");

const pautaBodySchema = Joi.object({
    NombrePauta: Joi.string().required().messages({
      "string.empty": "El nombre de la pauta no puede estar vacío.",
      "any.required": "El nombre de la pauta es obligatorio.",
      "string.base": "El nombre de la pauta debe ser de tipo string.",
    }),
    MaxPorcentajeFichaHogar: Joi.string().required().messages({
      "string.empty": "El porcentaje maximo de la ficha hogar no puede estar vacío.",
      "any.required": "El porcentaje maximo de la ficha hogar es obligatorio.",
      "string.base": "El porcentaje maximo de la ficha hogar debe ser de tipo string.",
    }),
    MinCantidadIntegrantes: Joi.number().positive().required().messages({
      "number.base": "La cantidad minima de integrantes debe ser un número.",
      "number.positive": "La cantidad minima de integrantes debe ser un número positivo.",
      "any.required": "La cantidad minima de integrantes es obligatorio.",
    }),
});

const pautaIdSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  pautaBodySchema,
  pautaIdSchema,
};
