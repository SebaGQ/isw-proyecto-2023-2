"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const SubsidioService = require("../services/subsidio.service");
const PautaService = require("../services/pauta.service");
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

    // Extraer los datos del subsidio y de la pauta del cuerpo de la solicitud
    const subsidioData = {
      Name: body.Name,
      Descripcion: body.Descripcion,
      Tipo: body.Tipo,
      Direccion: body.Direccion,
      Monto: body.Monto,
    };

    const pautaData = {
      NombrePauta: body.NombrePauta,
      MaxPorcentajeFichaHogar: body.PorcentajeFichaHogar,
      MinCantidadIntegrantes: body.CantidadIntegrantes,
    };

    // Crear la pauta
    const [newPauta, pautaError] = await PautaService.createPauta(pautaData);
    if (pautaError) return respondError(req, res, 400, pautaError);

    // Asociar la pauta al subsidio
    subsidioData.pauta = newPauta._id;

    // Crear el subsidio
    const [newSubsidio, subsidioError] = await SubsidioService.createSubsidio(subsidioData);
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

    if (subsidio) {
      // Responde solo con el subsidio, sin incluir pauta
      respondSuccess(req, res, 200, subsidio);
    } else {
      // Si el subsidio no existe, devuelve un error
      respondError(req, res, 404, "El subsidio no existe");
    }
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
