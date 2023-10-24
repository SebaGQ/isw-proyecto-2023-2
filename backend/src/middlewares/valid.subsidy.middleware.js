const { subsidyBodySchema } = require('../schema/subsidy.schema.js');
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

function validateSubsidyBody(req, res, next) {
  try {
    const { error } = subsidyBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateSubsidy.middleware -> validateSubsidyBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  validateSubsidyBody,
};
