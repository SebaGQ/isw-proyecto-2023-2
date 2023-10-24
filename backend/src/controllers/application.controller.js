"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ApplicationService = require("../services/application.service");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea una nueva solicitud de subsidio.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function createApplication(req, res) {
  try {
    const { subsidyId, socialPercentage, applicationDate } = req.body;
    const userEmail = req.email;

    const [newApplication, applicationError] = await ApplicationService.createApplication(subsidyId, userEmail, socialPercentage, applicationDate);

    if (applicationError) return respondError(req, res, 400, applicationError);
    if (!newApplication) {
      return respondError(req, res, 400, "No se pudo crear la postulación");
    }

    respondSuccess(req, res, 201, newApplication);
  } catch (error) {
    handleError(error, "application.controller -> createApplication");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene todas las solicitudes de subsidio.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function getApplications(req, res) {
  try {
    const [applications, applicationsError] = await ApplicationService.getApplications();
    if (applicationsError) return respondError(req, res, 404, applicationsError);

    applications.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, applications);
  } catch (error) {
    handleError(error, "application.controller -> getApplications");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getApplicationById(req, res) {
  try {
    const [application, applicationError] = await ApplicationService.getApplicationById(req.params.id);
    if (applicationError) return respondError(req, res, 404, applicationError);
    respondSuccess(req, res, 200, application);
  } catch (error) {
    handleError(error, "application.controller -> getApplicationById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getApplicationsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const [applications, applicationsError] = await ApplicationService.getApplicationsByUserId(userId);
    if (applicationsError) return respondError(req, res, 404, applicationsError);
    if (applications.length === 0) return respondSuccess(req, res, 204);
    return respondSuccess(req, res, 200, applications);
  } catch (error) {
    handleError(error, "application.controller -> getApplicationsByUserId");
    return respondError(req, res, 500, "Error interno del servidor");
  }
}

async function updateApplication(req, res) {
  try {
    const [updatedApplication, updateError] = await ApplicationService.updateApplication(req.params.id, req.body);
    if (updateError) return respondError(req, res, 404, updateError);
    respondSuccess(req, res, 200, updatedApplication);
  } catch (error) {
    handleError(error, "application.controller -> updateApplication");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function deleteApplication(req, res) {
  try {
    const [deletedApplication, deleteError] = await ApplicationService.deleteApplication(req.params.id);
    if (deleteError) return respondError(req, res, 404, deleteError);
    respondSuccess(req, res, 200, deletedApplication);
  } catch (error) {
    handleError(error, "application.controller -> deleteApplication");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserId,
  updateApplication,
  deleteApplication,
};