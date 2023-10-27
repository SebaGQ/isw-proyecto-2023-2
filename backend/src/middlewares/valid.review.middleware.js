const { reviewBodySchema } = require("../schema/review.schema");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

/** Valida el body de las peticiones según las reglas establecidas en el schema */
function validateReviewBody(req, res, next) {
  try {
    const { error } = reviewBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }
    next();
  } catch (error) {
    handleError(error, "validateReview.middleware -> validateReviewBody");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
    validateReviewBody,
    };
