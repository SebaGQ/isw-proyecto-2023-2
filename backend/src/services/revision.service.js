// Importar el modelo de datos 'Revision'
const Revision = require("../models/revision.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos las postulaciones pendientes de la base de datos
 * @returns {Promise} Promessa con el objeto de las postulaciones
 */
async function getPostulacionesPendientes() {
try {
    const postulaciones = await Revision.find({ estado: "pendiente" })
    .populate("postulante")
    .exec();
    if (!postulaciones) return [null, "No hay postulaciones"];

    return [postulaciones, null];
} catch (error) {
    handleError(error, "revision.service -> getPostulacionesPendientes");
}
}

/**
 * Obtener la postulacion segun su id
 * @param {string} id Id de la postulacion
 * @returns {Promise} Promesa con el objeto de la postulacion
 */
async function getPostulacionById(id) {
try {
    const postulacion = await Revision.findById(id)
    .populate("rut")
    .populate("tipoSubsidio")
    .exec();
    if (!postulacion) return [null, "No existe la postulacion"];

    return [postulacion, null];
} catch (error) {
    handleError(error, "revision.service -> getPostulacionById");
}
}

/**
 * Actualiza una postulación existente en la base de datos
 * @param {string} id Id de la postulación a actualizar
 * @param {object} postulacion Objeto con los datos actualizados de la postulación
 * @returns {Promise} Promesa con el objeto de la postulación actualizada o un mensaje de error
 */
async function updatePostulacion(id, postulacion) {
    try {
        const postulacionFound = await Postulacion.findById(id);
        if (!postulacionFound) return [null, "La postulacion no existe"];

        const {
            rut,
            nombre,
            apellido,
            monto,
            fechaPostulacion,
            tipoSubsidio,
            porcentajeFichaHogar,
            estadoPostulacion,
        } = postulacion;

        const postulacionUpdated = await Postulacion.findByIdAndUpdate(
            id,
            {
                rut,
                nombre,
                apellido,
                monto,
                fechaPostulacion,
                tipoSubsidio,
                porcentajeFichaHogar,
                estadoPostulacion,
            },
            { new: true },
        );
        return [postulacionUpdated, null];
    } catch (error) {
        handleError(error, "revision.service -> updatePostulacion");
    }
}

module.exports = {
    getPostulacionesPendientes,
    getPostulacionById,
    updatePostulacion,
};
