"use strict";
const Pauta = require("../models/pauta.model");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las pautas de la base de datos
 * @returns {Promise} Promesa con el objeto de pautas
 */
async function getPautas() {
  try {
    const pautas = await Pauta.find();
    if (!pautas) return [null, "No hay pautas"];

    return [pautas, null];
  } catch (error) {
    handleError(error, "pauta.service -> getPautas");
  }
}

/**
 * Crea una nueva pauta en la base de datos
 * @param {Object} pauta - Objeto de pauta
 * @returns {Promise} Promesa con el objeto de pauta creado
 */
async function createPauta(pauta) {
  try {
    const newPauta = new Pauta(pauta);
    await newPauta.save();

    return [newPauta, null];
  } catch (error) {
    handleError(error, "pauta.service -> createPauta");
  }
}

/**
 * Obtiene una pauta por su ID de la base de datos
 * @param {string} id - ID de la pauta
 * @returns {Promise} Promesa con el objeto de pauta
 */
async function getPautaById(id) {
  try {
    const pauta = await Pauta.findById(id);

    if (!pauta) return [null, "La pauta no existe"];

    return [pauta, null];
  } catch (error) {
    handleError(error, "pauta.service -> getPautaById");
  }
}

/**
 * Actualiza una pauta por su ID en la base de datos
 * @param {string} id - ID de la pauta
 * @param {Object} pauta - Objeto de pauta
 * @returns {Promise} Promesa con el objeto de pauta actualizada
 */
async function updatePauta(id, pauta) {
  try {
    const updatedPauta = await Pauta.findByIdAndUpdate(id, pauta, { new: true });

    if (!updatedPauta) return [null, "La pauta no existe"];

    return [updatedPauta, null];
  } catch (error) {
    handleError(error, "pauta.service -> updatePauta");
  }
}

/**
 * Elimina una pauta por su ID de la base de datos
 * @param {string} id - ID de la pauta
 * @returns {Promise} Promesa con el objeto de pauta eliminada
 */
async function deletePauta(id) {
  try {
    return await Pauta.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "pauta.service -> deletePauta");
  }
}

module.exports = {
  getPautas,
  createPauta,
  getPautaById,
  updatePauta,
  deletePauta,
};
