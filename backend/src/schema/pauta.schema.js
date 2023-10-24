const Joi = require("joi");

const pautaBodySchema = Joi.object({
    NombrePauta: Joi.string().required(),
    MaxPorcentajeFichaHogar: Joi.string().required(),
    MinCantidadIntegrantes: Joi.number().required(),
});

const pautaIdSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  pautaBodySchema,
  pautaIdSchema,
};