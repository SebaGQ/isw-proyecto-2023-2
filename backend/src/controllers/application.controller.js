/* eslint-disable max-len */
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ApplicationService = require("../services/application.service");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea una nueva solicitud de subsidio.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta.
 */
async function createApplication(req, res) {
  try {
    const { firstName, lastName1, lastName2, rutUser,subsidyId, socialPercentage, applicationDate, members, rutsMembers } = req.body;
    const userEmail = req.email;

    const [newApplication, applicationError] = await ApplicationService.createApplication(
      firstName,
      lastName1,
      lastName2,
      rutUser,
      subsidyId,
      socialPercentage,
      applicationDate,
      members,
      rutsMembers,
      userEmail,);

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
    const filters = req.query;
    const [applications, applicationsError] = await ApplicationService.getApplications(filters);
    if (applicationsError) return respondError(req, res, 404, applicationsError);

    applications.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, applications);
  } catch (error) {
    handleError(error, "application.controller -> getApplications");
    respondError(req, res, 500, "Error interno del servidor");
  }
}



/**
 * Obtiene una solicitud de subsidio por su ID.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function getApplicationById(req, res) {
  try {
    const [application, applicationError] = await ApplicationService.getApplicationById(req.params.id);
    if (applicationError) {
      return respondError(req, res, 404, applicationError);
    }
    respondSuccess(req, res, 200, application);
  } catch (error) {
    handleError(error, "application.controller -> getApplicationById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene todas las solicitudes de subsidio de un usuario.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
//Esto resuelve el requerimiento número 4
//La gracia es que no se le pasa parámetro, solo necesita que la petición la haga un
//user logeado, a partir del token saca el email, y a partir del email el userId para hacer la consulta
async function getApplicationsByUserEmail(req, res) {
  try {
    const userEmail = req.email;
    const [applications, applicationsError] = await ApplicationService.getApplicationsByUserEmail(userEmail);
    if (applicationsError) {
      return respondError(req, res, 404, applicationsError);
    }
    if (applications.length === 0) {
      return respondSuccess(req, res, 204);
    }
    return respondSuccess(req, res, 200, applications);
  } catch (error) {
    handleError(error, "application.controller -> getApplicationsByUserEmail");
    respondError(req, res, 500, "Error interno del servidor");
  }
}



/**
 * Actualiza una solicitud de subsidio por su ID.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function updateApplication(req, res) {
  try {
    const [updatedApplication, updateError] = await ApplicationService.updateApplication(
      req.params.id,
      req.body,
    );
    if (updateError) return respondError(req, res, 404, updateError);
    respondSuccess(req, res, 200, updatedApplication);
  } catch (error) {
    handleError(error, "application.controller -> updateApplication");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Actualiza el estado de una solicitud de subsidio y crea una revisión relacionada.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function updateApplicationStatus(req, res) {
  try {
    const applicationId = req.params.id;
    const { newStatus, comments } = req.body;

    // Llama a la función del servicio para actualizar el estado y crear la revisión
    const [updatedApplication, updateError] = await ApplicationService.updateApplicationStatus(
      applicationId,
      newStatus,
      comments
    );

    if (updateError) return respondError(req, res, 404, updateError);
    respondSuccess(req, res, 200, updatedApplication);
  } catch (error) {
    handleError(error, "application.controller -> updateApplicationStatus");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Elimina una solicitud de subsidio por su ID.
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 */
async function deleteApplication(req, res) {
  try {
    const [deletedApplication, deleteError] = await ApplicationService.deleteApplication(
      req.params.id,
    );
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
  getApplicationsByUserEmail,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};
