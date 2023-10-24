"use strict";

const Guideline = require("../models/guideline.model");
const mongoose = require('mongoose');
const { handleError } = require("../utils/errorHandler");

async function createGuideline(data) {
  try {
    const newGuideline = new Guideline(data);
    await newGuideline.save();
    return [newGuideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> createGuideline");
    return [null, "Error al crear la directriz"];
  }
}

async function getGuidelines() {
  try {
    const guidelines = await Guideline.find();
    return [guidelines, null];
  } catch (error) {
    handleError(error, "guideline.service -> getGuidelines");
    return [null, "Error al obtener las directrices"];
  }
}

async function getGuidelineById(guidelineId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de directriz no válido"];
    }
    const guideline = await Guideline.findById(guidelineId);
    if (!guideline) return [null, "Directriz no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> getGuidelineById");
    return [null, "Error al obtener la directriz"];
  }
}

async function updateGuideline(guidelineId, updateData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de directriz no válido"];
    }
    const guideline = await Guideline.findByIdAndUpdate(guidelineId, updateData, { new: true });
    if (!guideline) return [null, "Directriz no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> updateGuideline");
    return [null, "Error al actualizar la directriz"];
  }
}

async function deleteGuideline(guidelineId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de directriz no válido"];
    }
    const guideline = await Guideline.findByIdAndDelete(guidelineId);
    if (!guideline) return [null, "Directriz no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> deleteGuideline");
    return [null, "Error al eliminar la directriz"];
  }
}

module.exports = {
  createGuideline,
  getGuidelines,
  getGuidelineById,
  updateGuideline,
  deleteGuideline,
};
