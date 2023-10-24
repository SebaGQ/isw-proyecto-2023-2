"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const PautaService = require("../services/pauta.service");
const { pautaBodySchema, pautaIdSchema } = require("../schema/pauta.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las pautas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPautas(req, res) {
  try {
    const [pautas, errorPautas] = await PautaService.getPautas();
    if (errorPautas) return respondError(req, res, 404, errorPautas);

    pautas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, pautas);
  } catch (error) {
    handleError(error, "pauta.controller -> getPautas");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva pauta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createPauta(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = pautaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newPauta, pautaError] = await PautaService.createPauta(body);

    if (pautaError) return respondError(req, res, 400, pautaError);
    if (!newPauta) {
      return respondError(req, res, 400, "No se creó la pauta");
    }

    respondSuccess(req, res, 201, newPauta);
  } catch (error) {
    handleError(error, "pauta.controller -> createPauta");
    respondError(req, res, 500, "No se creó la pauta");
  }
}

/**
 * Obtiene una pauta por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPautaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = pautaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [pauta, errorPauta] = await PautaService.getPautaById(params.id);

    if (errorPauta) return respondError(req, res, 404, errorPauta);

    respondSuccess(req, res, 200, pauta);
  } catch (error) {
    handleError(error, "pauta.controller -> getPautaById");
    respondError(req, res, 500, "No se pudo obtener la pauta");
  }
}

/**
 * Actualiza una pauta por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updatePauta(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = pautaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = pautaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [pauta, pautaError] = await PautaService.updatePauta(params.id, body);

    if (pautaError) return respondError(req, res, 400, pautaError);

    respondSuccess(req, res, 200, pauta);
  } catch (error) {
    handleError(error, "pauta.controller -> updatePauta");
    respondError(req, res, 500, "No se pudo actualizar la pauta");
  }
}

/**
 * Elimina una pauta por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deletePauta(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = pautaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const pauta = await PautaService.deletePauta(params.id);
    !pauta
      ? respondError(
          req,
          res,
          404,
          "No se encontró la pauta solicitada",
          "Verifique el ID ingresado",
        )
      : respondSuccess(req, res, 200, pauta);
  } catch (error) {
    handleError(error, "pauta.controller -> deletePauta");
    respondError(req, res, 500, "No se pudo eliminar la pauta");
  }
}

module.exports = {
  getPautas,
  createPauta,
  getPautaById,
  updatePauta,
  deletePauta,
};
