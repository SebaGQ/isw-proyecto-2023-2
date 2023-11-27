/* eslint-disable max-len */
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const ReviewService = require("../services/review.service");

// funciona
/** Obtiene todas las reviews
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getReviews(req, res) {
  try {
    const [reviews, reviewsError] = await ReviewService.getReviews();
    if (reviewsError) return respondError(req, res, 404, reviewsError);

    reviews.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, reviews);
  } catch (error) {
    handleError(error, "review.controller -> getReviews");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

// funciona
/** Crea una nueva review
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function createReview(req, res) {
  try {
    const [newReview, reviewError] = await ReviewService.createReview(req.body);

    if (reviewError) return respondError(req, res, 400, reviewError);
    if (!newReview) return respondError(req, res, 400, "No se pudo crear la review");

    // Retornar el objeto de review creado
    return respondSuccess(req, res, 201, newReview);
  } catch (error) {
    handleError(error, "review.controller -> createReview");
    respondError(req, res, 500, "Error interno del servidor");
  }
}
// funciona
/** Modifica una review
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function updateReviewById(req, res) {
    try {
      // Obtener el ID de la reseña desde los parámetros de la URL y los datos a actualizar desde el cuerpo de la petición
      const reviewId = req.params.id;
      const updateData = req.body;
  
      // Llamar al servicio para actualizar la reseña
      const [updatedReview, updateError] = await ReviewService.updateReviewById(reviewId, updateData);
  
      // Si hay un error, responder con un error
      if (updateError) return respondError(req, res, 404, updateError);
  
      // Si la actualización fue exitosa, responder con la reseña actualizada
      respondSuccess(req, res, 200, updatedReview);
    } catch (error) {
      // Si ocurre un error en el proceso, capturarlo y responder con un error 500
      handleError(error, "review.controller -> updateReviewById");
      respondError(req, res, 500, "Error interno del servidor");
    }
  }
  
// funciona
/** Elimina una review
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function deleteReviewById(req, res) {
try {
    const [deletedReview, deleteError] = await ReviewService.deleteReviewById(
    req.params.id,
    );
    if (deleteError) return respondError(req, res, 404, deleteError);
    respondSuccess(req, res, 200, deletedReview);
} catch (error) {
    handleError(error, "review.controller -> deleteReview");
    respondError(req, res, 500, "Error interno del servidor");
}
}
// funciona
/**
 *  Obtiene la review por id
 * @param {Object} req
 * @param {Object} res
 */
async function getReviewById(req, res) {
    try {
      const [review, reviewError] = await ReviewService.getReviewById(req.params.id);
      if (reviewError) return respondError(req, res, 404, reviewError);
      respondSuccess(req, res, 200, review);
    } catch (error) {
      handleError(error, "review.controller -> getReviewById");
      respondError(req, res, 500, "Error interno del servidor");
    }
  }
  

/**
 *  Obtiene las reviews segun el status
 * @param {Object} req
 * @param {Object} res
 */
async function filterReviews(req, res) {
    try {
      // Obtener el estado de la ruta
      const { status } = req.query;
      console.log(status);
  
      // Llamar al servicio para obtener las reseñas
      const [reviews, error] = await ReviewService.filterReviews(status);
      if (error) return res.status(500).json({ error });
  
      // Devolver las reseñas
      res.status(200).json(reviews);
    } catch (error) {
        handleError(error, "review.controller -> filterReviews");
        respondError(req, res, 500, "Error interno del servidor");
    }
  }
// funciona
/**
 * Obtiene review con email vinculado con inicio de sesion
 * @param {Object} req
 * @param {Object} res
 */
async function getReviewByEmail(req, res) {
  try {
    const [review, reviewError] = await ReviewService.getReviewByEmail(req.email);
    if (reviewError) return respondError(res, reviewError);
    if (!review) return respondError(res, "No se pudo obtener la review");

    return respondSuccess(req, res, 200, review);
  } catch (error) {
    handleError(error, "review.controller -> getReviewByEmail");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createReview,
  updateReviewById,
  deleteReviewById,
  getReviewById,
  getReviews,
  filterReviews,
  getReviewByEmail,
};
