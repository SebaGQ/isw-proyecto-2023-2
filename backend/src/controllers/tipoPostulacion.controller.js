"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const TipoPostulacionService = require("../services/tipoPostulacion.service");
const { tipoPostulacionBodySchema, tipoPostulacionIdSchema } = require("../schema/tipoPostulacion.schema");

/**
 * Obtiene todos los tipos de postulación
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getTipoPostulaciones(req, res) {
  try {
    const [tipoPostulaciones, error] = await TipoPostulacionService.getTipoPostulaciones();
    if (error) {
      return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, tipoPostulaciones);
  } catch (error) {
    respondError(req, res, 500, "No se pudieron obtener los tipos de postulación");
  }
}

/**
 * Crea un nuevo tipo de postulación
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createTipoPostulacion(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = tipoPostulacionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newTipoPostulacion, error] = await TipoPostulacionService.createTipoPostulacion(body);

    if (error) {
      return respondError(req, res, 400, error);
    }
    if (!newTipoPostulacion) {
      return respondError(req, res, 400, "No se creó el tipo de postulación");
    }

    respondSuccess(req, res, 201, newTipoPostulacion);
  } catch (error) {
    respondError(req, res, 500, "No se creó el tipo de postulación");
  }
}

/**
 * Obtiene un tipo de postulación por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getTipoPostulacionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = tipoPostulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [tipoPostulacion, error] = await TipoPostulacionService.getTipoPostulacionById(params.id);

    if (error) {
      return respondError(req, res, 400, error);
    }

    if (!tipoPostulacion) {
      return respondError(req, res, 404, "Tipo de postulación no encontrado");
    }

    respondSuccess(req, res, 200, tipoPostulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo obtener el tipo de postulación");
  }
}

/**
 * Actualiza un tipo de postulación por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateTipoPostulacion(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = tipoPostulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = tipoPostulacionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [updatedTipoPostulacion, error] = await TipoPostulacionService.updateTipoPostulacion(params.id, body);

    if (error) {
      return respondError(req, res, 400, error);
    }

    if (!updatedTipoPostulacion) {
      return respondError(req, res, 404, "Tipo de postulación no encontrado");
    }

    respondSuccess(req, res, 200, updatedTipoPostulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo actualizar el tipo de postulación");
  }
}

/**
 * Elimina un tipo de postulación por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteTipoPostulacion(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = tipoPostulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const success = await TipoPostulacionService.deleteTipoPostulacion(params.id);

    if (success) {
      return respondSuccess(req, res, 200, "Tipo de postulación eliminado");
    } else {
      return respondError(req, res, 404, "Tipo de postulación no encontrado");
    }
  } catch (error) {
    respondError(req, res, 500, "No se pudo eliminar el tipo de postulación");
  }
}

module.exports = {
  getTipoPostulaciones,
  createTipoPostulacion,
  getTipoPostulacionById,
  updateTipoPostulacion,
  deleteTipoPostulacion,
};

