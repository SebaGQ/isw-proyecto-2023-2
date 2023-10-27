"use strict";

// creamos las const de respondSucces, respondError y require en utils/resHandler
const { respondSuccess, respondError } = require("../utils/resHandler");
// const applicationservices
const applicationServices = require("../services/application.services");
// const handleError
const { handleError } = require("../utils/errorHandler");

/**
 * Creamos una nueva postulacion con el rut del usuario, el id del subsidio y los parametros de la postulacion
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta 
 */
async function createPostulation(req,res){
    try {
        const { rut, subsidyId, socialPercentage, applicationDate} = req.body;
        const {userEmail} = req.email;
        //sacar id de usuario con email
        const [idUsuario, usuarioError] = await applicationServices.getUserIdByEmail(userEmail);
        if(usuarioError) return respondError(req, res, 400, usuarioError);
        
        const [newPostulation, postulationError] = await applicationServices.createPostulation(idUsuario, rut, subsidy, socialPercentage, applicationDate);
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!newPostulation){
            return respondError(req, res, 400, "No se pudo crear la solicitud");
        }
        return respondSuccess(req, res, 200, newPostulation);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> createPostulation");
        respondError(req, res, 500, "Error interno");
    }
}


/**
 * Obtener todas las solicitudes de subsidio
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function getAllPostulations(req,res){
    try {
        const [postulations, postulationError] = await applicationServices.getAllPostulations();
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!postulations){
            return respondError(req, res, 400, "No se encontraron solicitudes");
        }
        return respondSuccess(req, res, 200, postulations);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> getAllPostulations");
        respondError(req, res, 500, "Error interno");
    }
}

/**
 * Obtener las solicitudes por id
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta 
 */
async function getPostulationById(req,res){
    try {
        const {id} = req.params;
        const [postulation, postulationError] = await applicationServices.getPostulationById(id);
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!postulation){
            return respondError(req, res, 400, "No se encontraron solicitudes");
        }
        return respondSuccess(req, res, 200, postulation);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> getPostulationById");
        respondError(req, res, 500, "Error interno");
    }
}

/**
 * Obtener las solicitudes por id de usuario
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta 
 */
async function getPostulationByUserId(req,res){
    try {
        const {id} = req.params;
        const [postulation, postulationError] = await applicationServices.getPostulationByUserId(id);
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!postulation){
            return respondError(req, res, 400, "No se encontraron solicitudes");
        }
        return respondSuccess(req, res, 200, postulation);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> getPostulationByUserId");
        respondError(req, res, 500, "Error interno");
    }
}

/**
 * Actualizar una solicitud de subsidio
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta 
 */
async function updatePostulation(req,res){
    try {
        const {id} = req.params;
        const { subsidyId, socialPercentage, applicationDate} = req.body;
        const {userEmail} = req.email;

        const [updatedPostulation, postulationError] = await applicationServices.updatePostulation(id, userEmail, subsidyId, socialPercentage, applicationDate);
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!updatedPostulation){
            return respondError(req, res, 400, "No se pudo actualizar la solicitud");
        }
        return respondSuccess(req, res, 200, updatedPostulation);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> updatePostulation");
        respondError(req, res, 500, "Error interno");
    }
}

/**
 * Eliminar una solicitud de subsidio
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta 
 */
async function deletePostulation(req,res){
    try {
        const {id} = req.params;
        const {userEmail} = req.email;

        const [deletedPostulation, postulationError] = await applicationServices.deletePostulation(id, userEmail);
        if(postulationError) return respondError(req, res, 400, postulationError);
        if(!deletedPostulation){
            return respondError(req, res, 400, "No se pudo eliminar la solicitud");
        }
        return respondSuccess(req, res, 200, deletedPostulation);
    }
    catch (error) {
        handleError(error, "Postulation.controller -> deletePostulation");
        respondError(req, res, 500, "Error interno");
    }
}

module.exports = {
    createPostulation,
    getAllPostulations,
    getPostulationById,
    getPostulationByUserId,
    updatePostulation,
    deletePostulation
};