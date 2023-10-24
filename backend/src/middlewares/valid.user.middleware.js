const { userBodySchema } = require('../schema/user.schema.js');
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/** Valida el body de las peticiones según las reglas establecidas en el schema */
function validateUserBody(req, res, next) {
  try {
    const { error } = userBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateUser.middleware -> validateUserBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  validateUserBody,
};