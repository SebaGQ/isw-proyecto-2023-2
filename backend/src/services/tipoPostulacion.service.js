const TipoPostulacion = require("../models/tipoPostulacion.model");
const { handleError } = require("../utils/errorHandler");

async function getTipoPostulaciones() {
  try {
    const tipoPostulaciones = await TipoPostulacion.find();
    return [tipoPostulaciones, null];
  } catch (error) {
    handleError(error, "tipoPostulacion.service -> getTipoPostulaciones");
    return [null, error.message];
  }
}

async function getTipoPostulacionById(id) {
  try {
    const tipoPostulacion = await TipoPostulacion.findById(id);
    return [tipoPostulacion, null];
  } catch (error) {
    handleError(error, "tipoPostulacion.service -> getTipoPostulacionById");
    return [null, error.message];
  }
}

async function createTipoPostulacion(tipoPostulacionData) {
  try {
    const tipoPostulacion = new TipoPostulacion(tipoPostulacionData);
    await tipoPostulacion.save();
    return [tipoPostulacion, null];
  } catch (error) {
    handleError(error, "tipoPostulacion.service -> createTipoPostulacion");
    return [null, error.message];
  }
}

async function updateTipoPostulacion(id, tipoPostulacionData) {
  try {
    const tipoPostulacion = await TipoPostulacion.findByIdAndUpdate(id, tipoPostulacionData, { new: true });
    return [tipoPostulacion, null];
  } catch (error) {
    handleError(error, "tipoPostulacion.service -> updateTipoPostulacion");
    return [null, error.message];
  }
}

async function deleteTipoPostulacion(id) {
  try {
    await TipoPostulacion.findByIdAndRemove(id);
    return true;
  } catch (error) {
    handleError(error, "tipoPostulacion.service -> deleteTipoPostulacion");
    return false;
  }
}

module.exports = {
  getTipoPostulaciones,
  getTipoPostulacionById,
  createTipoPostulacion,
  updateTipoPostulacion,
  deleteTipoPostulacion,
};
