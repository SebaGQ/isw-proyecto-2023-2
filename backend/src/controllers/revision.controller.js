/* eslint-disable max-len */
const { respondSuccess, respondError } = require("../utils/resHandler");
const RevisionService = require("../services/revision.service");
const { handleError } = require("../utils/errorHandler");
const { postulacionIdSchema, postulacionBodySchema } = require("../utils/schemas/postulacion.schema");

/**
 * Obtiene las postulaciones en estado pendiente
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulacionesPendientes(req, res) {
    try {
        const [postulaciones, errorPostulaciones] = await RevisionService.getPostulacionesPendientes();
        if (errorPostulaciones) return respondError(req, res, 404, errorPostulaciones);

        postulaciones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, postulaciones);
    } catch (error) {
        handleError(error, "revision.controller -> getPostulacionesPendientes");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Actualiza el estado de postulacion por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateEstadoPostulacion(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = postulacionIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = postulacionBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [postulacion, postulacionError] = await RevisionService
        .updateEstadoPostulacion(params.id, body);

        if (postulacionError) return respondError(req, res, 400, postulacionError);

        respondSuccess(req, res, 200, postulacion);
    } catch (error) {
        handleError(error, "revision.controller -> updateEstadoPostulacion");
        respondError(req, res, 500, "No se pudo actualizar el estado de la postulacion");
    }
}

/**
 * Obtiene una postulación por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulacionById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = postulacionIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const [postulacion, postulacionError] = await RevisionService.getPostulacionById(params.id);
        if (postulacionError) return respondError(req, res, 404, postulacionError);
        respondSuccess(req, res, 200, postulacion);
    } catch (error) {
        handleError(error, "revision.controller -> getPostulacionById");
        respondError(req, res, 500, "No se pudo obtener la postulacion");
    }
}

/**
 * Obtiene todas las postulaciones de un tipo de subsidio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulacionesByTipoSubsidio(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = postulacionIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const [postulaciones, postulacionesError] = await RevisionService.getPostulacionesByTipoSubsidio(params.id);
        if (postulacionesError) return respondError(req, res, 404, postulacionesError);
        respondSuccess(req, res, 200, postulaciones);
    } catch (error) {
        handleError(error, "revision.controller -> getPostulacionesByTipoSubsidio");
        respondError(req, res, 500, "No se pudo obtener las postulaciones");
    }
}

/**
 * Crear una nueva revision
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createRevision(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = postulacionBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [revision, revisionError] = await RevisionService.createRevision(body);
        if (revisionError) return respondError(req, res, 400, revisionError);
        respondSuccess(req, res, 201, revision);
    } catch (error) {
        handleError(error, "revision.controller -> createRevision");
        respondError(req, res, 500, "No se pudo crear la revision");
    }
}


module.exports = {
    getPostulacionesPendientes,
    updateEstadoPostulacion,
    getPostulacionById,
    createRevision,
    getPostulacionesByTipoSubsidio,
};
