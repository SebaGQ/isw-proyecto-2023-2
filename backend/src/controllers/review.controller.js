const { respondSucess, respondError } = require("../utils/resHandler")
const { handleError } = require("../utils/errorHandler")
const ReviewService = require("../services/review.service")


/** Obtiene todas las reviews
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getReviews(req, res) {
    try {
        // Obtener las reviews
        const reviews = await ReviewService.getReviews();
        // Retornar las reviews
        return respondSucess(res, reviews);
    } catch (error) {
        // Retornar el error
        return respondError(res, error);
    }
}

/** Crea una nueva review
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function createReview(req, res) {
    try {
        const { body } = req.body;

        const [newReview, reviewError] = await ReviewService.createReview(body)

        if (reviewError) return respondError(res, reviewError);
        if (!newReview) return respondError(res, "No se pudo crear la review");

        // Actualizar la aplicación
        // await Application.findByIdAndUpdate(req.body.applicationId, { status: "En Revisión" });
        //no se realiza porque la valiadcion se hace en el service

        // Retornar el objeto de review creado
        return respondSucess(res, newReview, "Revisión creada");
    } catch (error) {

        handleError(error, "review.controller -> createReview")
        respondError(req,res,500,"Error interno del servidor")
    }
}

/** Modifica una review 
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
*/
async function updateReviewById(req, res) {
    try{
        const { body } = req.body;
        const [updatedReview, reviewError] = await ReviewService.updateReviewById(req.params.id, body);
        if (reviewError) return respondError(res, reviewError);
        if (!updatedReview) return respondError(res, "No se pudo modificar la review");
        // Retornar el objeto de review modificado
        return respondSucess(res, updatedReview, "Revisión modificada");
} catch (error) {
        handleError(error, "review.controller -> updateReviewById")
        respondError(req,res,500,"Error interno del servidor")
    }
}

/** Elimina una review 
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
*/
async function deleteReviewById(req, res) {
    try{
        const [deletedReview, reviewError] = await ReviewService.deleteReviewById(req.params.id);
        if (reviewError) return respondError(res, reviewError);
        if (!deletedReview) return respondError(res, "No se pudo eliminar la review");
        // Retornar el objeto de review eliminado
        return respondSucess(res, deletedReview, "Revisión eliminada");
} catch (error) {
        handleError(error, "review.controller -> deleteReviewById")
        respondError(req,res,500,"Error interno del servidor")
    }
}

/**
 *  Obtiene la review por id
 * @param {Object} req 
 * @param {Object} res 
 */
async function getReviewById(req, res) {
    try{
        const [review, reviewError] = await ReviewService.getReviewById(req.params.id);
        if (reviewError) return respondError(res, reviewError);
        if (!review) return respondError(res, "No se pudo obtener la review");
        // Retornar el objeto de review 
        return respondSucess(res, review, "Revisión obtenida");
} catch (error) {
        handleError(error, "review.controller -> getReviewById")
        respondError(req,res,500,"Error interno del servidor")
    }
}


/**
 *  Obtiene las reviews segun el status
 * @param {Object} req 
 * @param {Object} res 
 */
async function filterReviews(req, res) {
    try{
        const [reviews, reviewError] = await ReviewService.filterReviews(req.query);
        if (reviewError) return respondError(res, reviewError);
        if (!reviews) return respondError(res, "No se pudo obtener la review");
        // Retornar el objeto de review eliminado
        return respondSucess(res, reviews, "Revisión obtenida");
} catch (error) {
        handleError(error, "review.controller -> filterReviews")
        respondError(req,res,500,"Error interno del servidor")
    }
}

/**
 * Obtiene review con email vinculado con inicio de sesion
 * @param {Object} req 
 * @param {Object} res
 */
async function getReviewByEmail(req, res) {
    try{
        const [review, reviewError] = await ReviewService.getReviewByEmail(req.email);
        if (reviewError) return respondError(res, reviewError);
        if (!review) return respondError(res, "No se pudo obtener la review");

        return respondSucess(res, review, "Revisión obtenida");
} catch (error) {
        handleError(error, "review.controller -> getReviewByEmail")
        respondError(req,res,500,"Error interno del servidor")
    }
}

module.exports = {
    createReview,
    updateReviewById,
    deleteReviewById,
    getReviewById,
    getReviews,
    filterReviews,
    getReviewByEmail
}