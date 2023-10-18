"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const SubsidioService = require("../services/subsidio.service");
const { subsidioBodySchema, subsidioIdSchema } = require("../schema/subsidio.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los subsidios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getSubsidios(req, res) {
  try {
    const [subsidios, errorSubsidios] = await SubsidioService.getSubsidios();
    if (errorSubsidios) return respondError(req, res, 404, errorSubsidios);

    subsidios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, subsidios);
  } catch (error) {
    handleError(error, "subsidio.controller -> getSubsidios");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo subsidio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createSubsidio(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = subsidioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newSubsidio, subsidioError] = await SubsidioService.createSubsidio(body);

    if (subsidioError) return respondError(req, res, 400, subsidioError);
    if (!newSubsidio) {
      return respondError(req, res, 400, "No se creó el subsidio");
    }

    respondSuccess(req, res, 201, newSubsidio);
  } catch (error) {
    handleError(error, "subsidio.controller -> createSubsidio");
    respondError(req, res, 500, "No se creó el subsidio");
  }
}

/**
 * Obtiene un subsidio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getSubsidioById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = subsidioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [subsidio, errorSubsidio] = await SubsidioService.getSubsidioById(params.id);

    if (errorSubsidio) return respondError(req, res, 404, errorSubsidio);

    respondSuccess(req, res, 200, subsidio);
  } catch (error) {
    handleError(error, "subsidio.controller -> getSubsidioById");
    respondError(req, res, 500, "No se pudo obtener el subsidio");
  }
}

/**
 * Actualiza un subsidio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateSubsidio(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = subsidioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = subsidioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [subsidio, subsidioError] = await SubsidioService.updateSubsidio(params.id, body);

    if (subsidioError) return respondError(req, res, 400, subsidioError);

    respondSuccess(req, res, 200, subsidio);
  } catch (error) {
    handleError(error, "subsidio.controller -> updateSubsidio");
    respondError(req, res, 500, "No se pudo actualizar el subsidio");
  }
}

/**
 * Elimina un subsidio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteSubsidio(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = subsidioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const subsidio = await SubsidioService.deleteSubsidio(params.id);
    !subsidio
      ? respondError(
          req,
          res,
          404,
          "No se encontró el subsidio solicitado",
          "Verifique el ID ingresado"
        )
      : respondSuccess(req, res, 200, subsidio);
  } catch (error) {
    handleError(error, "subsidio.controller -> deleteSubsidio");
    respondError(req, res, 500, "No se pudo eliminar el subsidio");
  }
}

module.exports = {
  getSubsidios,
  createSubsidio,
  getSubsidioById,
  updateSubsidio,
  deleteSubsidio,
};
