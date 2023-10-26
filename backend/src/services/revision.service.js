/* eslint-disable max-len */
// Importar el modelo de datos 'Revision'
const Revision = require("../models/revision.model.js");
// Importar el modelo de datos 'Postulacion'
const Postulacion = require("../models/postulacion.model.js");

const { handleError } = require("../utils/errorHandler");

/**  Crear revision de postulacion, vincular la id de revision con postulacion
 * @param {Object} revision Objeto de revision
 * @returns {Promise} Promesa con el objeto de revision creado
 */
async function createRevision(revision) {
    try {
        const { postulacion, comentario } = revision;
        const postulacionFound = await Postulacion.findById(postulacion);
        if (!postulacionFound) return [null, "La postulacion no existe"];

        const newRevision = new Revision({
            postulacion,
            comentario,
        });
        await newRevision.save();

        postulacionFound.revisiones.push(newRevision._id);
        await postulacionFound.save();

        return [newRevision, null];
    } catch (error) {
        handleError(error, "revision.service -> createRevision");
    }
}


/**
 * Obtiene todos las postulaciones con estado pendientes de la base de datos
 * @returns {Promise} Promessa con el objeto de las postulaciones
 */
async function getPostulacionesPendientes() {
    try {
        const postulaciones = await Postulacion.find({ estadoPostulacion: "pendiente" })
            .populate("rut")
            .populate("tipoSubsidio")
            .populate("estadoPostulacion")
            .exec();
        if (!postulaciones) return [null, "No hay postulaciones"];

        return [postulaciones, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getPostulacionesPendientes");
    }
}

/**
 * Obtener la postulacion segun su id
 * @param {string} id Id de la postulacion
 * @returns {Promise} Promesa con el objeto de la postulacion
 */
async function getPostulacionById(id) {
    try {
        const postulacion = await Postulacion.findById(id)
            .populate("rut")
            .populate("tipoSubsidio")
            .populate("estadoPostulacion")
            .exec();
        if (!postulacion) return [null, "La postulacion no existe"];

        return [postulacion, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getPostulacionById");
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
    createRevision,
};
