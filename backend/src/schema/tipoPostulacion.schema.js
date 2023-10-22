const Joi = require("joi");

const tipoPostulacionBodySchema = Joi.object({
    Tipo: Joi.string().valid("subsidio", "beneficio").required(),
});

const tipoPostulacionIdSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  tipoPostulacionBodySchema,
  tipoPostulacionIdSchema,
};