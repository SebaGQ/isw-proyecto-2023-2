const { reviewAppealBodySchema } = require("../schema/reviewAppeal.schema");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

/** Valida el body de las peticiones de revisión de apelaciones según las reglas establecidas en el schema */
function validateReviewAppealBody(req, res, next) {
  try {
    const { error } = reviewAppealBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateReviewAppeal.middleware -> validateReviewAppealBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  validateReviewAppealBody,
};
