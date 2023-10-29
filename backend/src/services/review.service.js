/* eslint-disable max-len */
// Importar el modelo de datos 'Review'
const Review = require("../models/review.model");
// Importar el modelo de datos 'Application'
const Application = require("../models/application.model");

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

        // Verificar que la postulacion no tenga una review
        const reviewExists = await Review.findOne({ applicationId: review.applicationId });
        if (reviewExists) throw new Error("La aplicación ya tiene una revisión");
        
        // vincular id de review con application
        review.applicationId = application._id; // esto no se si dejarlo asi, o colocar la misma id de postulacion a la revision

        // Crear el objeto de review
        const createdReview = await Review.create(review);
        // Actualizar la aplicación
        await Application.findByIdAndUpdate(review.applicationId, { status: "En Revisión" });
        // Retornar el objeto de review creado
        return createdReview;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}

/**
 * Modificar review de application, solo si se encuentra en estado "En revision"
 * @param {Object} review objeto de review
 * @returns {Object} Promesa con el review modificado
 */
async function updateReviewById(review) {
    try {
        // Validaciones
        // Verificar que la review existe
        const reviewExists = await Review.findById(review._id);
        if (!reviewExists) throw new Error("La revisión no existe");
        // Verificar que la aplicación existe
        const applicationExists = await Application.findById(review.applicationId);
        if (!applicationExists) throw new Error("La aplicación no existe");
        // Verificar que la aplicación se encuentre en estado "En Revisión"
        if (applicationExists.status != "En Revisión") throw new Error("La aplicación no se encuentra en estado 'En Revisión'");
        // Modificar el objeto de review
        const updatedReview = await Review.findByIdAndUpdate(review._id, review, { new: true });
        // Retornar el objeto de review modificado
        return updatedReview;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}

/**
 * Eliminar review de application, regresar el estado de application a "Pendiente"
 * @param {Object} review id de review
 * @returns {Object} Promesa con el review eliminado
 */
async function deleteReviewById(reviewId) {
    try {
        // Validaciones
        // Verificar que la review existe
        const reviewExists = await Review.findById(reviewId);
        if (!reviewExists) throw new Error("La revisión no existe");
        // Verificar que la aplicación existe
        const applicationExists = await Application.findById(reviewExists.applicationId);
        if (!applicationExists) throw new Error("La aplicación no existe");
        // Verificar que la aplicación se encuentre en estado "En Revisión"
        if (applicationExists.status != "En Revisión") throw new Error("La aplicación no se encuentra en estado 'En Revisión'");
        // Eliminar el objeto de review
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        // Actualizar la aplicación
        await Application.findByIdAndUpdate(reviewExists.applicationId, { status: "Pendiente" });
        // Retornar el objeto de review eliminado
        return deletedReview;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}

/**
 * Obtener la review segun su id
 * @param {string} id Id de la review
 * @returns {Promise} Promesa con el objeto de review
 */
async function getReviewById(id) {
    try {
        // Obtener el objeto de review y la informacion de application
        const review = await Review.findById(id).populate("applicationId");
        // Verificar que la review existe
        if (!review) throw new Error("La revisión no existe");
        // Verificar que la postulacion existe
        if (!review.applicationId) throw new Error("La postulacion no existe");

        // Retornar el objeto de review
        return review;
    } catch (error) {
        // Retornar el error
        return handleError(error);
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
        return reviews;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}

/**
 * Filtrar las reviews segun el estado de application
 * @param {string} status Estado de application
 * @returns {Promise} Promesa con los objetos de review
 */
async function filterReviews(status) {
    try {
        // Obtener el objeto de review y la informacion de application
        const reviews = await Review.find().populate("applicationId");
        // Verificar que existen review
        if (!reviews) throw new Error("No hay revisiones");
        // validacion
        if (status != "En Revisión" 
        && status != "Aceptado" 
        && status != "Rechazado" 
        && status != "Pendiente") throw new Error("El estado no es válido");
        // Filtrar las reviews segun el estado de application
        const filteredReviews = reviews.filter((review) => review.applicationId.status == status);

        // Retornar el objeto de review
        return filteredReviews;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}

/**
 * El usuario obtiene la review vinculado al email 
 * @param {string} email email del usuario
 * @returns {Promise} Promesa con el objeto de review
 */
async function getReviewByLogin(email) {
    try {
        // Obtener usuario con el email
        const user = await User.findOne({ email: userEmail });
        // Obtener el objeto de review y la informacion de application
        const reviews = await Review.find().populate("applicationId");
        // Verificar que existen review
        if (!reviews) throw new Error("No hay revisiones");
        // Filtrar las reviews segun el id
        const filteredReviews = reviews.filter((review) => review.applicationId.userId == user._id);

        // Retornar el objeto de review
        return filteredReviews;
    } catch (error) {
        // Retornar el error
        return handleError(error);
    }
}


module.exports = {
    createReview,
    updateReviewById,
    deleteReviewById,
    getReviewById,
    getReviews,
    filterReviews,
    getReviewByLogin,
};
