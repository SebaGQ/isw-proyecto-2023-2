"use strict";
const Subsidio = require("../models/subsidio.model.js");
const Pauta = require("../models/pauta.model.js"); // Importa el modelo de pauta
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");

/**
 * Obtiene todos los subsidios de la base de datos
 * @returns {Promise} Promesa con el objeto de subsidios
 */
async function getSubsidios() {
  try {
    const subsidios = await Subsidio.find();
    if (!subsidios) return [null, "No hay subsidios"];

    return [subsidios, null];
  } catch (error) {
    handleError(error, "subsidio.service -> getSubsidios");
  }
}

/**
 * Crea un nuevo subsidio
 * @param {Object} subsidio - Datos del subsidio a crear
 * @returns {Promise} Promesa con el objeto de subsidio creado o un error
 */
async function createSubsidio(subsidio) {
  try {
    // Verifica si ya existe un subsidio con el mismo nombre
    const existingSubsidio = await Subsidio.findOne({ Name: subsidio.Name });
    if (existingSubsidio) {
      return [null, "Ya existe un subsidio con el mismo nombre."];
    }
    //sino se crea un nuevo subsidio
    const newSubsidio = new Subsidio(subsidio);
    const subsidioCreated = await newSubsidio.save();
    return [subsidioCreated, null];
  } catch (error) {
    handleError(error, "subsidio.service -> createSubsidio");
    return [null, "No se pudo crear el subsidio"];
  }
}

/**
 * Obtiene un subsidio por su id de la base de datos
 * @param {string} Id del subsidio
 * @returns {Promise} Promesa con el objeto de subsidio
 */
async function getSubsidioById(id) {
  try {
    const subsidio = await Subsidio.findById({_id: id}).populate("pauta");
    
    if (!subsidio) return [null, "El subsidio no existe"];

    return [subsidio, null];
  } catch (error) {
    handleError(error, "subsidio.service -> getSubsidioById");
  }
}

/**
 * Actualiza un subsidio por su id en la base de datos
 * @param {string} id Id del subsidio
 * @param {Object} subsidio Objeto de subsidio
 * @returns {Promise} Promesa con el objeto de subsidio actualizado
 */
async function updateSubsidio(id, subsidio) {
  try {
    const subsidioFound = await Subsidio.findById(id);
    if (!subsidioFound) return [null, "El subsidio no existe"];

    const { Name, Descripcion, Tipo, Monto, FechaInicio, FechaTermino} = subsidio;

    subsidioFound.Name = Name;
    subsidioFound.Descripcion = Descripcion;
    subsidioFound.Tipo = Tipo;
    subsidioFound.Monto = Monto;
    subsidioFound.FechaInicio = FechaInicio;
    subsidioFound.FechaTermino = FechaTermino;

    const subsidioUpdated = await subsidioFound.save();

    return [subsidioUpdated, null];
  } catch (error) {
    handleError(error, "subsidio.service -> updateSubsidio");
  }
}

/**
 * Elimina un subsidio por su id de la base de datos
 * @param {string} Id del subsidio
 * @returns {Promise} Promesa con el objeto de subsidio eliminado
 */
async function deleteSubsidio(id) {
  try {
    return await Subsidio.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "subsidio.service -> deleteSubsidio");
  }
}

module.exports = {
  getSubsidios,
  createSubsidio,
  updateSubsidio,
  getSubsidioById,
  deleteSubsidio,
};
