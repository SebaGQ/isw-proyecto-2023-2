const { respondSuccess, respondError } = require("../utils/resHandler");
const RevisionService = require("../services/revision.service");
const { handleError } = require("../utils/errorHandler");
// eslint-disable-next-line max-len
const { postulacionIdSchema, postulacionBodySchema } = require("../utils/schemas/postulacion.schema");
/**
 * Obtiene las postulaciones en estado pendiente
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulacionesPendientes(req, res) {
    try {
        // eslint-disable-next-line max-len
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

module.exports = {
    getPostulacionesPendientes,
    updateEstadoPostulacion,
    getPostulacionById,
};
