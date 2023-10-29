/* eslint-disable max-len */
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const ReviewAppealService = require("../services/reviewAppeal.service");

/**
* Obtiene todas las reviews
* @param {Object} res - Objeto de respuesta
* @param {Object} req - Objeto de peticion
*/
async function getReviewsAppeal(req, res) {
    try {
        const [reviewsAppeal, reviewsAppealError] = await ReviewAppealService.getReviewsAppeal();
        if (reviewsAppealError) return respondError(req, res, 404, reviewsAppealError);

        reviewsAppeal.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, reviewsAppeal);
    } catch (error) {
        handleError(error, "reviewAppeal.controller -> getReviewsAppeal");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

/**
* Crea una nueva reviewAppeal
* @param {Object} res - Objeto de respuesta
* @param {Object} req - Objeto de peticion
*/
async function createReviewAppeal(req, res) {
    try {
        const [newReviewAppeal, reviewAppealError] = await ReviewAppealService.createReviewAppeal(req.body);

        if (reviewAppealError) return respondError(req, res, 400, reviewAppealError);
        if (!newReviewAppeal) return respondError(req, res, 400, "No se pudo crear la reviewAppeal");

        // Retornar el objeto de reviewAppeal creado
        return respondSuccess(req, res, 201, newReviewAppeal);
    } catch (error) {
        handleError(error, "reviewAppeal.controller -> createReviewAppeal");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

/**
* Modifica una reviewAppeal
* @param {Object} res - Objeto de respuesta
* @param {Object} req - Objeto de peticion
*/
async function updateReviewAppealById(req, res) {
    try {
        // Obtener el ID de la reseña desde los parámetros de la URL y los datos a actualizar desde el cuerpo de la petición
        const reviewAppealId = req.params.id;
        const updateData = req.body;

        // Llamar al servicio para actualizar la reseña
        const [updatedReviewAppeal, updateError] = await ReviewAppealService.updateReviewAppealById(reviewAppealId, updateData);

        // Verificar si ocurrió un error al actualizar la reseña
        if (updateError) return respondError(req, res, 400, updateError);

        // Verificar si la reseña existe
        if (!updatedReviewAppeal) return respondError(req, res, 404, "La reseña no existe");

        // Retornar el objeto de la reseña actualizada
        return respondSuccess(req, res, 200, updatedReviewAppeal);
    } catch (error) {
        handleError(error, "reviewAppeal.controller -> updateReviewAppealById");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

/** Elimina una reviewAppeal
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function deleteReviewAppealById(req, res) {
    try {
        // Obtener el ID de la reseña desde los parámetros de la URL
        const reviewAppealId = req.params.id;

        // Llamar al servicio para eliminar la reseña
        const [deletedReviewAppeal, deleteError] = await ReviewAppealService.deleteReviewAppealById(reviewAppealId);

        // Verificar si ocurrió un error al eliminar la reseña
        if (deleteError) return respondError(req, res, 404, deleteError);

        // Verificar si la reseña existe
        if (!deletedReviewAppeal) return respondError(req, res, 404, "La reseña no existe");

        // Retornar el objeto de la reseña eliminada
        return respondSuccess(req, res, 200, deletedReviewAppeal);
    } catch (error) {
        handleError(error, "reviewAppeal.controller -> deleteReviewAppealById");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

/**
* Obtiene la reviewAppeal por id
* @param {Object} req
* @param {Object} res
*/
async function getReviewAppealById(req, res) {
    try {
        const [reviewAppeal, reviewAppealError] = await ReviewAppealService.getReviewAppealById(req.params.id);
        if (reviewAppealError) return respondError(req, res, 404, reviewAppealError);
        respondSuccess(req, res, 200, reviewAppeal);
    } catch (error) {
        handleError(error, "reviewAppeal.controller -> getReviewAppealById");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

// exportar

module.exports = {
    createReviewAppeal,
    updateReviewAppealById,
    deleteReviewAppealById,
    getReviewAppealById, 
    getReviewsAppeal,
};


