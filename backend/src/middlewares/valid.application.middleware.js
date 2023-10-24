"use strict";

const { applicationBodySchema } = require('../schema/application.schema.js');
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

function validateApplicationBody(req, res, next) {
  try {
    const { error } = applicationBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateApplication.middleware -> validateApplicationBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  validateApplicationBody,
};