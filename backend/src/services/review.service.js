/* eslint-disable max-len */
// Importar el modelo de datos 'Review'
const Review = require("../models/review.model");
// Importar el modelo de datos 'Application'
const Application = require("../models/application.model");
// Importar estados
const AVAILABILITY = require("../constants/availability.constants");
// const RESULT = ["En Revisión", "Aceptado", "Rechazado", "Pendiente"];
//                    0               1           2               3

// Importar el modelo de datos 'User'
const User = require("../models/user.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Crear review de application, vincular la id de review con application
 *  @param {Object} review Objeto de review
 *  @returns {Promise} Promesa con el objeto de review creado
 */
async function createReview(review) {
    try {
        // Verificar que la postulacion existe
        const application = await Application.findById(review.applicationId);
        if (!application) throw new Error("La aplicación no existe");

    // Verificar que la postulacion no tenga una revision
    if (application.reviewId) return [null, "La postulacion ya tiene una revisión"];

    // Verificar el estado de la postulacion
    if (application.status !== AVAILABILITY[3]) {
    return [null, "La postulacion no se encuentra en estado 'Pendiente'"];
    }

    // cambiar estado de application a 'En revision'
    application.status = AVAILABILITY[0];
    await application.save();

    // Validar que el comentario no esté vacío
    if (typeof comment !== "string" || comment.trim() === "") {
    return [null, "El comentario no puede estar vacío"];
    }

    // Crear el review
    const newReview = new Review({
    applicationId,
    comment: comment.trim(),
    });
    // vincula la id de review con application
    application.reviewId = newReview._id;
    // Guardar el review
    await newReview.save();

    // Devolver el review creado
    return [newReview, null];
} catch (error) {
    handleError(error, "review.service -> createReview");
    return [null, "Error al crear la revision"];
}
}

/**
 * Modificar review de application, solo si se encuentra en estado "En revision"
 * @param {Object} updateData objeto de review
 * @returns {Object} Promesa con el review modificado
 */
async function updateReviewById(reviewId, updateData) {
try {
    // Intentar encontrar la revision por su ID y actualizarla
    const review = await Review.findByIdAndUpdate(reviewId, updateData, {
    new: true,
    });

    // Si la revision no se encuentra, devolver un error
    if (!review) return [null, "Revision no encontrada"];

    // Si la revision se actualiza correctamente, devolver la revision actualizada
    return [review, null];
} catch (error) {
    // Si ocurre un error, manejarlo y devolver un mensaje de error
    handleError(error, "review.service -> updateReviewById");
    return [null, "Error al actualizar la revision"];
}
}

/**
 * Eliminar review de application, regresar el estado de application a "Pendiente"
 * @param {Object} review id de review
 * @returns {Object} Promesa con el review eliminado
 */
async function deleteReviewById(reviewId) {
try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return [null, "Revision no encontrada"];

    const application = await Application.findById(review.applicationId);
    if (!application) return [null, "La postulacion no existe"];

    // cambiar estado de application a 'Pendiente'
    application.status = AVAILABILITY[3];
    await application.save();

    return [review, null];
} catch (error) {
    handleError(error, "review.service -> deleteReviewById");
    return [null, "Error al eliminar la revision"];
}
}

/**
 * Obtener la revision segun su id
 * @param {string} id Id de la review
 * @returns {Promise} Promesa con el objeto de review
 */
async function getReviewById(reviewId) {
try {
    const review = await Review.findById(reviewId);
    if (!review) return [null, "revision no encontrada"];
    return [review, null];
} catch (error) {
    handleError(error, "review.service -> getReviewById");
    return [null, "Error al obtener la revision"];
}
}

/**
 * Obtener todas las review
 * @returns {Promise} Promesa con el objeto de las reviews
 */
async function getReviews() {
try {
    // Obtener el objeto de review y la informacion de application
    const reviews = await Review.find().populate("applicationId");
    // Verificar que existen review
    if (!reviews) throw new Error("No hay revisiones");

    // Retornar el objeto de review
    return [reviews, null];
} catch (error) {
    // Retornar el error
    handleError(error, "review.service -> getReviews");
    return [null, "Error al obtener las revisiones"];
}
}

/**
 * Filtrar las reviews segun el estado de application
 * @param {string} status Estado de application
 * @returns {Promise} Promesa con los objetos de review
 */
async function filterReviews(status) {
try {
    // Obtener todas las aplicaciones con el estado deseado
    const applications = await Application.find({ status });

    // Si no hay aplicaciones, devolver un array vacío
    if (applications.length === 0) return [[], null];

    // Obtener los IDs de las aplicaciones
    const applicationIds = applications.map((app) => app._id);

    // Obtener las revisions asociadas a esas aplicaciones
    const reviews = await Review.find({
    applicationId: { $in: applicationIds },
    });

    return [reviews, null];
} catch (error) {
    handleError(error, "review.service -> filterReviewsByStatus");
    return [null, "Error al filtrar las revisions"];
}
}

/**
 * El usuario obtiene la review vinculado al email
 * @param {string} email email del usuario
 * @returns {Promise} Promesa con el objeto de review
 */
async function getReviewByEmail(userEmail) {
try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
    return [null, "Usuario no encontrado"];
    }

    const applications = await Application.find({ userId: user._id });
    if (!applications || applications.length === 0) {
    return [null, "No se encontraron postulaciones para este usuario"];
    }

    const applicationIds = applications.map((app) => app._id);
    const reviews = await Review.find({
    applicationId: { $in: applicationIds },
    });

    return [reviews, null];
} catch (error) {
    handleError(error, "review.service -> getReviewsByEmail");
    return [
    null,
    "Error al obtener las revisions por correo electrónico del usuario",
    ];
}
}

module.exports = {
createReview,
updateReviewById,
deleteReviewById,
getReviewById,
getReviews,
filterReviews,
getReviewByEmail,
};
