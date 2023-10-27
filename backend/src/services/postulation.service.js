"use strict";

//constante de postulation requiere
const postulation = require("../models/postulation.model");
//constante de subsidio requiere
const subsidy = require("../models/subsidio.model");
//constante de user requiere
const user = require("../models/user.model");
//constante de error handler requiere
const { handleError } = require("../utils/errorHandler");
//constante de mongoose requiere
const mongoose = require("mongoose");
/**
 * Create postulation rut, subsidio, porcentajeFicha, integrantes
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function createPostulation(req, res) {
  try {
    const { rut, subsidio, porcentajeFicha, integrantes } = req.body;
    // Valida si el rut es de un usuario
    let isUserRut = await user.findOne({ rut: rut });
    if (!isUserRut) {
      return res.status(400).json({ message: "Rut no existe" });
    }
    // Valida si el subsidio existe
    let isSubsidy = await subsidy.findById(subsidio);
    if (!isSubsidy) {
      return res.status(400).json({ message: "Subsidio no existe" });
    }
    // Valida si el usuario ya tiene una postulacion a un subsidio con el mismo id
    let isPostulation = await postulation.findOne({
      rut: rut,
      subsidio: subsidio,
    });
    
    if (isPostulation) {
      return res.status(400).json({ message: "Ya existe una postulacion a ese subsidio" });
    }
    // valida si el porcentajeFicha es menor o igual al maxPorcentajeFicha
    if (porcentajeFicha > isSubsidy.maxPorcentajeFicha) {
      return res.status(400).json({ message: "El porcentaje de la ficha es mayor al permitido" });
    }
    const newPostulation = new postulation({
      rut,
      subsidio,
      porcentajeFicha,
      integrantes,
    });
    await newPostulation.save();
    return res.status(200).json(newPostulation);
  } catch (error) {
    handleError(error, "postulation.controller -> createPostulation");
    return res.status(500).json(error);
  }
}



module.exports = {
    createPostulation,
    };