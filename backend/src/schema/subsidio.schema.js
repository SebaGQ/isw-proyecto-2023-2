const Joi = require("joi");

const subsidioBodySchema = Joi.object({
  Name: Joi.string().required(),
  Descripcion: Joi.string().required(),
  Monto: Joi.number().required(),
  Tipo: Joi.string().valid("subsidio", "beneficio").required(),
  Direccion: Joi.string().required(),
  PorcentajeFichaHogar: Joi.string().required(),
  CantidadIntegrantes: Joi.number().required(),
});


const subsidioIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  subsidioBodySchema,
  subsidioIdSchema,
};

