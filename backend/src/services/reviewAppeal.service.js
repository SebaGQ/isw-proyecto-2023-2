// Importar el modelo de datos de la revision de la apelacion
const ReviewAppeal = require("../models/reviewAppeal.model");
// Importar el modelo de datos de la apelacion
const Appeal = require("../models/appeal.model");
// Importar el modelo de datos de la postulacion
const Application = require("../models/application.model");
// Importar estados
const AVAILABILITY = require("../constants/availability.constants");
// const RESULT = ["En Revisión", "Aceptado", "Rechazado", "Pendiente", "Apelacion"];
//                    0               1           2               3         4

const { handleError } = require("../utils/errorHandler");

/**
 * Crear review de appeal, vincular la id de review con appeal
 * @param {Object} reviewAppeal Objeto de la revision de la apelacion
 * @returns {Object} Promesa con el objeto de review creado
 */
async function createReviewAppeal(reviewAppeal) {
  try {
    const { appealId, comment } = reviewAppeal;

    // Validar que el objeto reviewAppeal tenga las propiagees necesarias
    if (!appealId || !comment) {
        return [null, "Faltan datos obligatorios en el objeto reviewAppeal"];
    }

    // Verificar que la apelacion existe
    const appeal = await Appeal.findById(appealId);
    if (!appeal) return [null, "La apelación no existe"];

    // Verificar que la apelacion no tenga una revision
    if (appeal.reviewAppealId) return [null, "La apelación ya tiene una revisión"];


    // cambiar estado de application a 'En revision'
    appeal.status = AVAILABILITY[0];
    await appeal.save();

    // Validar que el comentario no esté vacío
    if (typeof comment !== "string" || comment.trim() === "") {
        return [null, "El comentario no puede estar vacío"];
    }

    // Crear el review
    const newReviewAppeal = new ReviewAppeal({
        appealId,
        comment: comment.trim(),
    });
    // vincula la id de review con application
    appeal.reviewId = newReviewAppeal._id;
    // Guardar el review
    await newReviewAppeal.save();

    // Devolver el review creado
    return [newReviewAppeal, null];
    } catch (error) {
    handleError(error, "reviewAppeal.service -> createReviewAppeal");
    return [null, "Error al crear la revisión de la apelación"];
    }
}

/**
 * Modificar review de apelacion, solo si se encuentra en estado "Apelacion"
 * @param {Object} reviewAppeal objeto de reviewAppeal
 * @returns {Object} Promesa con el reviewAppeal modificado
 */
async function updateReviewAppealById(reviewAppealId, updateData) {
  try {
    // Validar que el objeto reviewAppeal tenga las propiagees necesarias
    if (!reviewAppealId || !updateData) {
        return [null, "Faltan datos obligatorios en el objeto reviewAppeal"];
    }

    // Verificar que la apelacion existe
    const reviewAppeal = await ReviewAppeal.findById(reviewAppealId);
    if (!reviewAppeal) return [null, "La revisión de la apelación no existe"];

    // Validar que el comentario no esté vacío
    if (typeof updateData.comment !== "string" || updateData.comment.trim() === "") {
        return [null, "El comentario no puede estar vacío"];
    }

    // Modificar el review
    reviewAppeal.comment = updateData.comment.trim();
    await reviewAppeal.save();

    // Devolver el review creado
    return [reviewAppeal, null];
    } catch (error) {
    handleError(error, "reviewAppeal.service -> updateReviewAppealById");
    return [null, "Error al modificar la revisión de la apelación"];
    }
}

/**
 * Eliminar review de appeal, regresar el estado de application a "Apelacion"
 * @param {Object} reviewAppeal id de reviewAppeal
 * @returns {Object} Promesa con el reviewAppeal eliminado
 */
async function deleteReviewAppealById(reviewAppealId) {
    try {
    // Verificar que la apelacion existe
    const reviewAppeal = await ReviewAppeal.findByIdAndDelete(reviewAppealId);
    if (!reviewAppeal) return [null, "La revisión de la apelación no existe"];

    // Obtener la id de appeal vinculada a review
    const appealId = reviewAppeal.appealId;
    const appeal = await Appeal.findById(appealId);
    
    // Obtener postId con appeal
    const postId = appeal.postId;
    const application = await Application.findById(postId);


    // cambiar estado de application a 'Apelacion'
    application.status = AVAILABILITY[4];
    await application.save();


    // Devolver el review eliminado
    return [reviewAppeal, null];
  } catch (error) {
    handleError(error, "reviewAppeal.service -> deleteReviewAppealById");
    return [null, "Error al eliminar la revisión de la apelación"];
  }
}

/**
 * Obtener la revision de las apelaciones segun su id
 * @param {Object} id Id de reviewAppeal
 * @returns {Promise} Promesa con el objeto de reviewAppeal
 */
async function getReviewAppealById(reviewAppealId) {
    try {
    // Verificar que la apelacion existe
    const reviewAppeal = await ReviewAppeal.findById(reviewAppealId);
    if (!reviewAppeal) return [null, "La revisión de la apelación no existe"];

    // Devolver el review
    return [reviewAppeal, null];
  } catch (error) {
    handleError(error, "reviewAppeal.service -> getReviewAppealById");
    return [null, "Error al obtener la revisión de la apelación"];
  }
}

/** 
 * Obtener todas las reviewAppeal
 * @returns {Promise} Promesa con el objeto de las reviewAppeal
*/
async function getReviewsAppeal() {
    try {
    // Obtener el objeto de reviewAppeal y la informacion de appeal
    const reviewsAppeal = await ReviewAppeal.find().populate("appealId");
    // Verificar que existen reviewAppeal
    if (!reviewsAppeal) throw new Error("No hay revisiones de apelaciones");

    // Retornar el objeto de reviewAppeal
    return [reviewsAppeal, null];
  } catch (error) {
    // Retornar el error
    handleError(error, "reviewAppeal.service -> getReviewsAppeal");
    return [null, "Error al obtener las revisiones de apelaciones"];
  }
}

module.exports = {
    createReviewAppeal,
    updateReviewAppealById,
    deleteReviewAppealById,
    getReviewAppealById,
    getReviewsAppeal,
    };
