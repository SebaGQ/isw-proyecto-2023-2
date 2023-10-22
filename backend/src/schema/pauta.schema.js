const Joi = require("joi");

const pautaBodySchema = Joi.object({
    PorcentajeFichaHogar: Joi.string().required(),
    CantidadIntegrantes: Joi.number().required(),
});

const pautaIdSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  pautaBodySchema,
  pautaIdSchema,
};