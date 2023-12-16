"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const SubsidyService = require("../services/subsidy.service");
const { handleError } = require("../utils/errorHandler");

async function createSubsidy(req, res) {
  try {
    const subsidyData = req.body;
    const [newSubsidy, subsidyError] = await SubsidyService.createSubsidy(subsidyData);

    if (subsidyError) return respondError(req, res, 400, subsidyError);
    if (!newSubsidy) {
      return respondError(req, res, 400, "No se pudo crear el subsidio");
    }

    respondSuccess(req, res, 201, newSubsidy);
  } catch (error) {
    handleError(error, "subsidy.controller -> createSubsidy");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getSubsidies(req, res) {
  try {
    const [subsidies, subsidiesError] = await SubsidyService.getSubsidies();
    if (subsidiesError) return respondError(req, res, 404, subsidiesError);

    subsidies.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, subsidies);
  } catch (error) {
    handleError(error, "subsidy.controller -> getSubsidies");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function getSubsidyById(req, res) {
  try {
    const [subsidy, subsidyError] = await SubsidyService.getSubsidyById(req.params.id);
    if (subsidyError) return respondError(req, res, 404, subsidyError);
    respondSuccess(req, res, 200, subsidy);
  } catch (error) {
    handleError(error, "subsidy.controller -> getSubsidyById");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function updateSubsidy(req, res) {
  try {
    const [updatedSubsidy, updateError] = await SubsidyService.updateSubsidy(req.params.id, req.body);
    if (updateError) return respondError(req, res, 404, updateError);
    respondSuccess(req, res, 200, updatedSubsidy);
  } catch (error) {
    handleError(error, "subsidy.controller -> updateSubsidy");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function deleteSubsidy(req, res) {
  try {
    const [deletedSubsidy, deleteError] = await SubsidyService.deleteSubsidy(req.params.id);
    if (deleteError) return respondError(req, res, 404, deleteError);
    respondSuccess(req, res, 200, deletedSubsidy);
  } catch (error) {
    handleError(error, "subsidy.controller -> deleteSubsidy");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

async function archiveSubsidy(req, res) {
  try {
    const [archivedSubsidy, archiveError] = await SubsidyService.archiveSubsidy(req.params.id);
    
    if (archiveError) {
      respondError(req, res, 404, archiveError);
    } else {
      respondSuccess(req, res, 200, archivedSubsidy);
    }
  } catch (error) {
    handleError(error, "subsidy.controller -> archiveSubsidy");
    respondError(req, res, 500, "Error interno del servidor");
  }
}

module.exports = {
  createSubsidy,
  getSubsidies,
  getSubsidyById,
  updateSubsidy,
  deleteSubsidy,
  archiveSubsidy,
};
