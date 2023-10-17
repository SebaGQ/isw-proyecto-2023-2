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
 * Actualiza el estado de la postulacion por su id en la base de datos
 * @param {string} id Id de la postulacion
 * @param {Object} postulacion Objeto de postulacion con solo el campo estadoPostulacion
 * @returns {Promise} Promesa con el objeto de postulacion actualizado
 */
async function updateEstadoPostulacion(id, postulacion) {
    try {
        // Verificar que solo el campo estadoPostulacion esté presente
        const keys = Object.keys(postulacion);
        if (keys.length !== 1 || !keys.includes("estadoPostulacion")) {
            return [null, "Solo se puede actualizar el campo estadoPostulacion"];
        }

        const postulacionFound = await Postulacion.findById(id);
        if (!postulacionFound) return [null, "La postulacion no existe"];

        const postulacionUpdated = await Postulacion.findByIdAndUpdate(
            id,
            { estadoPostulacion: postulacion.estadoPostulacion },
            { new: true },
        );
        return [postulacionUpdated, null];
    } catch (error) {
        handleError(error, "postulacion.service -> updateEstadoPostulacion");
    }
}


module.exports = {
    getPostulacionesPendientes,
    getPostulacionById,
    updateEstadoPostulacion,
};
