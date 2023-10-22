const Joi = require("joi");

const subsidioBodySchema = Joi.object({
  Name: Joi.string().required(),
  Descripcion: Joi.string().required(),
  Direccion: Joi.string().required(),
  Monto: Joi.number().required(),
  // Agrega validaciones para los campos de pauta
  PorcentajeFichaHogar: Joi.string().required(),
  CantidadIntegrantes: Joi.number().required(),
  // Agrega validaciones para el campo de tipoPostulacion
  Tipo: Joi.string().valid("subsidio", "beneficio").required(),
});

const subsidioIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  subsidioBodySchema,
  subsidioIdSchema,
};

