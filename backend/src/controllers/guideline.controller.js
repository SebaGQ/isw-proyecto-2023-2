"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const GuidelineService = require("../services/guideline.service");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea nueva pauta
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly created guideline.
 */
async function createGuideline(req, res) {
  try {
    const { name, maxSocialPercentage, minMembers } = req.body;
    const [newGuideline, guidelineError] = await GuidelineService.createGuideline({
      name,
      maxSocialPercentage,
      minMembers,
    });

    if (guidelineError) return respondError(req, res, 400, guidelineError);
    respondSuccess(req, res, 201, newGuideline);
  } catch (error) {
    handleError(error, "guideline.controller -> createGuideline");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene todas las pautas
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The list of guidelines.
 */
async function getGuidelines(req, res) {
  try {
    const [guidelines, guidelinesError] = await GuidelineService.getGuidelines();
    if (guidelinesError) return respondError(req, res, 404, guidelinesError);
    
    guidelines.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, guidelines);
  } catch (error) {
    handleError(error, "guideline.controller -> getGuidelines");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Obtiene pauta por id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The guideline with the specified ID.
 */
async function getGuidelineById(req, res) {
  try {
    const [guideline, guidelineError] = await GuidelineService.getGuidelineById(req.params.id);
    if (guidelineError) return respondError(req, res, 404, guidelineError);
    respondSuccess(req, res, 200, guideline);
  } catch (error) {
    handleError(error, "guideline.controller -> getGuidelineById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}


/**
 * Actualiza una pauta existente
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated guideline.
 */
async function updateGuideline(req, res) {
  try {
    const [updatedGuideline, updateError] = await GuidelineService.updateGuideline(
      req.params.id,
      req.body,
    );
    if (updateError) return respondError(req, res, 404, updateError);
    respondSuccess(req, res, 200, updatedGuideline);
  } catch (error) {
    handleError(error, "guideline.controller -> updateGuideline");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

/**
 * Elimina una pauta existente
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The deleted guideline.
 */
async function deleteGuideline(req, res) {
  try {
    const [deletedGuideline, deleteError] = await GuidelineService.deleteGuideline(req.params.id);
    if (deleteError) return respondError(req, res, 404, deleteError);
    respondSuccess(req, res, 200, deletedGuideline);
  } catch (error) {
    handleError(error, "guideline.controller -> deleteGuideline");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createGuideline,
  getGuidelines,
  getGuidelineById,
  updateGuideline,
  deleteGuideline,
};
