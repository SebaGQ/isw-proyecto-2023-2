"use strict";
//Importar el modelo de postulacion 'postulacion'
const Postulacion = require("../models/Postulacion.model.js");
const { handleError } = require("../utils/errorHandler.js");
const user = require("../models/user.model.js");




/**
 * Obtiene todas las postulaciones de la base de datos
 * @returns {Promise} Promesa con el objeto de las postulaciones
 */
async function getPostulaciones() {
  try {
    const postulaciones = await Postulacion.find()
      .populate("usuario")
      .populate("subsidio")
      .populate("estado")
      .exec();
    if (!postulaciones) return [null, "No hay postulaciones"];

    return [postulaciones, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulaciones");
  }
  }

  /**
   * Crea una postulacion en la base de datos, recibiendo el id del usuario y los datos de postulacion
   * @param {Object} postulacion objeto de postulacion
   * @returns {Promise} promesa con el objeto postulacion creado
   */
  async function createPostulacion(postulacion) {
    try {
      const { usuario, subsidio, porcentajeFicha, integrantesHogar } = postulacion;

      // el porcentajeFicha debe ser menor al MaxporcentajeFicha
      
      const postulacionCreated = await Postulacion.create({
        usuario,
        estado: "pendiente",
        subsidio,
        porcentajeFicha,
        integrantesHogar,
      });

      return [postulacionCreated, null];
    } catch (error) {
      handleError(error, "postulacion.service -> createPostulacion");
    }
  }
  
/**
 * Obtiene una postulacion por su id de la base de datos
 * @param {string} Id de la postulacion
 * @returns {Promise} Promesa con el objeto de postulacion
 */
async function getPostulacionById(id) {
  try {
    const postulacion = await Postulacion.findById(id)
      .populate("usuario")
      .populate("subsidio")
      .populate("estado")
      .exec();
    if (!postulacion) return [null, "La postulacion no existe"];

    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulacionById");
  }
}
/**
 * Actualiza una postulacion por su id en la base de datos
 * @param {string} id id de la postulacion
 * @param {Object} postulaicon objeto de postulacion
 * @returns {Promise} promesa con el objeto de postulacion actualizado
 */
async function updatePostulacionById(id, postulacion) {
  try {
    const { usuario, estado, subsidio, porcentajeFicha, integrantesHogar } = postulacion;

    const postulacionFound = await Postulacion.findById(id);
    if (!postulacionFound) return [null, "La postulacion no existe"];

    const postulacionUpdated = await Postulacion.findByIdAndUpdate(
      id,
      {
        usuario,
        estado,
        subsidio,
        porcentajeFicha,
        integrantesHogar,
      },
      {
        new: true,
      },
    );

    return [postulacionUpdated, null];
  } catch (error) {
    handleError(error, "postulacion.service -> updatePostulacionById");
  }
}

/**
 * Elimina una postulacion por su id de la base de datos
 * @param {string} Id de la postulacion
 * @returns {Promise} Promesa con el objeto de postulacion eliminado
 */ 
async function deletePostulacionById(id) {
  try {
    const postulacionFound = await Postulacion.findById(id);
    if (!postulacionFound) return [null, "La postulacion no existe"];

    const postulacionDeleted = await Postulacion.findByIdAndDelete(id);

    return [postulacionDeleted, null];
  } catch (error) {
    handleError(error, "postulacion.service -> deletePostulacionById");
  }
}

module.exports = {
  getPostulaciones,
  createPostulacion,
  getPostulacionById,
  updatePostulacionById,
  deletePostulacionById,
};
