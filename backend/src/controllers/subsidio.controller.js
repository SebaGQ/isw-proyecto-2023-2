"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const SubsidioService = require("../services/subsidio.service");
const PautaService = require("../services/pauta.service");
const { subsidioBodySchema, subsidioIdSchema } = require("../schema/subsidio.schema");
const { handleError } = require("../utils/errorHandler");
const moment = require('moment');
const pauta = require("../models/pauta.model");


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

    // Extraer los datos del subsidio y de la pauta del cuerpo de la solicitud
    const subsidioData = {
      Name: body.Name,
      Descripcion: body.Descripcion,
      Tipo: body.Tipo,
      Direccion: body.Direccion,
      Monto: body.Monto,
      FechaInicio: body.FechaInicio, 
      FechaTermino: body.FechaTermino, 
    };
    // Convierte las cadenas de fecha en objetos Date
    const dateInicio = new Date(subsidioData.FechaInicio);
    const dateTermino = new Date(subsidioData.FechaTermino);

    // Verifica que FechaTermino no sea menor que FechaInicio
    if (dateTermino < dateInicio) {
      return respondError(req, res, 400, "La fecha de término no puede ser anterior a la fecha de inicio");
    }
    const pautaData = {
      NombrePauta: body.NombrePauta,
      MaxPorcentajeFichaHogar: body.MaxPorcentajeFichaHogar,
      MinCantidadIntegrantes: body.MinCantidadIntegrantes,
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

    // Obtén el subsidio por ID, incluyendo la pauta asociada
    const [subsidio, error] = await SubsidioService.getSubsidioById(params.id);

    if (error) {
      return respondError(
        req,
        res,
        404,
        "No se encontró el subsidio solicitado",
        "Verifique el ID ingresado"
      );
    }

    // Elimina el subsidio por ID
    const subsidioDeleted = await SubsidioService.deleteSubsidio(params.id);

    if (!subsidioDeleted) {
      return respondError(req, res, 500, "No se pudo eliminar el subsidio");
    }

    // Obtén la ID de la pauta desde la respuesta del subsidio
    const pautaId = subsidio.pauta[0]._id;
    console.log("idpauta " , subsidio.pauta[0]._id);
    console.log("idpauta " , subsidio.pauta);
    console.log("idpauta " ,pautaId);

    // Elimina la pauta por su ID
    const pautaDeleted = await PautaService.deletePauta(pautaId);

    if (!pautaDeleted) {
      return respondError(req, res, 500, "No se pudo eliminar la pauta asociada al subsidio");
    }

    return respondSuccess(req, res, 200, "Subsidio y pauta asociada eliminados correctamente");
  } catch (error) {
    handleError(error, "subsidio.controller -> deleteSubsidioAndPauta");
    respondError(req, res, 500, "No se pudo eliminar el subsidio y la pauta asociada");
  }
}



module.exports = {
  getSubsidios,
  createSubsidio,
  getSubsidioById,
  updateSubsidio,
  deleteSubsidio,
};
