"use strict";

const Subsidy = require("../models/subsidy.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");

async function createSubsidy(subsidyData) {
  try {
    const newSubsidy = new Subsidy(subsidyData);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 2);
    const currentDateUTC = new Date(currentDate.toISOString());

    console.log(currentDate);
    console.log(newSubsidy.dateStart);
    //Esto se comentó para poder probar el añadir subsidios vencidos
    if(new Date(newSubsidy.dateStart) < currentDateUTC){
      return  [null, "La fecha de inicio debe ser igual o mayor a la fecha actual."]
    }

    await newSubsidy.save();
    return [newSubsidy, null];
  } catch (error) {
    handleError(error, "subsidy.service -> createSubsidy");
    return [null, "Error al crear el subsidio"];
  }
}

async function getSubsidies() {
  try {
    const subsidies = await Subsidy.find().populate('guidelineId');
    return [subsidies, null];
  } catch (error) {
    handleError(error, "subsidy.service -> getSubsidies");
    return [null, "Error al obtener los subsidios"];
  }
}

async function getSubsidyById(subsidyId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(subsidyId)) {
      return [null, "ID de subsidio no válido"];
    }
    const subsidy = await Subsidy.findById(subsidyId);
    if (!subsidy) return [null, "Subsidio no encontrado"];
    return [subsidy, null];
  } catch (error) {
    handleError(error, "subsidy.service -> getSubsidyById");
    return [null, "Error al obtener el subsidio"];
  }
}

async function updateSubsidy(subsidyId, updateData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(subsidyId)) {
      return [null, "ID de subsidio no válido"];
    }
    const subsidy = await Subsidy.findByIdAndUpdate(subsidyId, updateData, { new: true });
    if (!subsidy) return [null, "Subsidio no encontrado"];
    return [subsidy, null];
  } catch (error) {
    handleError(error, "subsidy.service -> updateSubsidy");
    return [null, "Error al actualizar el subsidio"];
  }
}

async function deleteSubsidy(subsidyId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(subsidyId)) {
      return [null, "ID de subsidio no válido"];
    }
    const subsidy = await Subsidy.findByIdAndDelete(subsidyId);
    if (!subsidy) return [null, "Subsidio no encontrado"];
    return [subsidy, null];
  } catch (error) {
    handleError(error, "subsidy.service -> deleteSubsidy");
    return [null, "Error al eliminar el subsidio"];
  }
}

module.exports = {
  createSubsidy,
  getSubsidies,
  getSubsidyById,
  updateSubsidy,
  deleteSubsidy,
};
