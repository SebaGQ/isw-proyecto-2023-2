"use strict";

const Guideline = require("../models/guideline.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");

async function createGuideline(data) {
  try {
    const newGuideline = new Guideline(data);
    await newGuideline.save();
    return [newGuideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> createGuideline");
    return [null, "Error al crear la pauta"];
  }
}

async function getGuidelines() {
  try {
    const guidelines = await Guideline.find();
    return [guidelines, null];
  } catch (error) {
    handleError(error, "guideline.service -> getGuidelines");
    return [null, "Error al obtener las pautas"];
  }
}

async function getGuidelineById(guidelineId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de pauta no válido"];
    }
    const guideline = await Guideline.findById(guidelineId);
    if (!guideline) return [null, "Pauta no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> getGuidelineById");
    return [null, "Error al obtener la pauta"];
  }
}

async function updateGuideline(guidelineId, updateData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de pauta no válido"];
    }
    const guideline = await Guideline.findByIdAndUpdate(guidelineId, updateData, { new: true });
    if (!guideline) return [null, "Pauta no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> updateGuideline");
    return [null, "Error al actualizar la pauta"];
  }
}

async function deleteGuideline(guidelineId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(guidelineId)) {
      return [null, "ID de pauta no válido"];
    }
    const guideline = await Guideline.findByIdAndDelete(guidelineId);
    if (!guideline) return [null, "Pauta no encontrada"];
    return [guideline, null];
  } catch (error) {
    handleError(error, "guideline.service -> deleteGuideline");
    return [null, "Error al eliminar la pauta"];
  }
}

module.exports = {
  createGuideline,
  getGuidelines,
  getGuidelineById,
  updateGuideline,
  deleteGuideline,
};
