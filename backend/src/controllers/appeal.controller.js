const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const AppealService = require("../services/appeal.service");

/**
 * Crea una nueva apelación.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function createAppeal(req, res) {
  try {
    const userEmail = req.email;
    const [newAppeal, error] = await AppealService.createAppeal(userEmail, req.body);

    if (error) return respondError(req, res, 404, error);
    respondSuccess(req, res, 201, newAppeal);
  } catch (error) {
    handleError(error, "appeal.controller -> createAppeal");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene todas las apelaciones.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function getAppeals(req, res) {
  try {
    const [appeals, error] = await AppealService.getAppeals();

    if (error) return respondError(req, res, 500, error);
    respondSuccess(req, res, 200, appeals);
  } catch (error) {
    handleError(error, "appeal.controller -> getAppeals");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene una apelación por su ID.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function getAppealById(req, res) {
  try {
    const [appeal, error] = await AppealService.getAppealById(req.params.id);
    if (error) return respondError(req, res, 404, error);
    respondSuccess(req, res, 200, appeal);
  } catch (error) {
    handleError(error, "appeal.controller -> getAppealById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene todas las apelaciones realizadas por un usuario específico.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function getAppealsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const [appeals, error] = await AppealService.getAppealsByUserId(userId);
    if (error) return respondError(req, res, 400, error);
    respondSuccess(req, res, 200, appeals);
  } catch (error) {
    handleError(error, "appeal.controller -> getAppealsByUserId");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Actualiza una apelación existente.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function updateAppeal(req, res) {
  try {
    const [updatedAppeal, error] = await AppealService.updateAppeal(req.params.id, req.body);
    if (error) return respondError(req, res, 404, error);
    respondSuccess(req, res, 200, updatedAppeal);
  } catch (error) {
    handleError(error, "appeal.controller -> updateAppeal");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Elimina una apelación existente.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function deleteAppeal(req, res) {
  try {
    const [deletedAppeal, error] = await AppealService.deleteAppeal(req.params.id);
    if (error) return respondError(req, res, 404, error);
    respondSuccess(req, res, 200, deletedAppeal);
  } catch (error) {
    handleError(error, "appeal.controller -> deleteAppeal");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createAppeal,
  getAppeals,
  getAppealById,
  getAppealsByUserId,
  updateAppeal,
  deleteAppeal
};
