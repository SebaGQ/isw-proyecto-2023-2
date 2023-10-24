"use strict";

const { appealBodySchema } = require('../schema/appeal.schema.js');
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

function validateAppealBody(req, res, next) {
  try {
    const { error } = appealBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateAppeal.middleware -> validateAppealBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  validateAppealBody,
};