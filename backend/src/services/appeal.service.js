/* eslint-disable max-len */
const Appeal = require("../models/appeal.model");
const User = require("../models/user.model");
const ApplicationService = require("./application.service");
const mongoose = require("mongoose");
const AVAILIBILITY = require("../constants/availability.constants");

async function createAppeal(userEmail, postData) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }

    const [application, applicationError] = await ApplicationService.getApplicationById(postData.postId);
    if (applicationError) return [null, applicationError];
    if (!application) return [null, "La postulación asociada no existe"];
    if (application.status !== AVAILIBILITY[2]) return [null, "La postulación debe estar Rechazada para postular."];

    const newAppeal = new Appeal({
      postId: postData.postId,
      userId: user._id,
      reason: postData.reason,
      status: "Pendiente",
    });

    await newAppeal.save();
    return [newAppeal, null];
  } catch (error) {
    console.error("Error al crear la apelación:", error);
    return [null, "Error interno del servidor"];
  }
}

async function getAppeals() {
  try {
    const appeals = await Appeal.find();
    return [appeals, null];
  } catch (error) {
    console.error("Error al obtener las apelaciones:", error);
    return [null, "Error interno del servidor"];
  }
}

async function getAppealById(appealId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(appealId)) {
      return [null, "ID de apelación no válido"];
    }
    const appeal = await Appeal.findById(appealId);
    if (!appeal) {
      return [null, "Apelación no encontrada"];
    }
    return [appeal, null];
  } catch (error) {
    console.error("Error al obtener la apelación:", error);
    return [null, "Error interno del servidor"];
  }
}

async function getAppealsByUserEmail(userEmail) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }
    const appeals = await Appeal.find({ userId: user._id });
    return [appeals, null];
  } catch (error) {
    handleError(error, "appeal.service -> getAppealsByUserEmail");
    return [null, "Error al obtener las apelaciones por correo electrónico del usuario"];
  }
}


async function updateAppeal(appealId, appealData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(appealId)) {
      return [null, "ID de apelación no válido"];
    }
    const updatedAppeal = await Appeal.findByIdAndUpdate(appealId, appealData, { new: true });
    if (!updatedAppeal) {
      return [null, "Apelación no encontrada"];
    }
    return [updatedAppeal, null];
  } catch (error) {
    console.error("Error al actualizar la apelación:", error);
    return [null, "Error interno del servidor"];
  }
}

async function deleteAppeal(appealId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(appealId)) {
      return [null, "ID de apelación no válido"];
    }
    const deletedAppeal = await Appeal.findByIdAndDelete(appealId);
    if (!deletedAppeal) {
      return [null, "Apelación no encontrada"];
    }
    return [deletedAppeal, null];
  } catch (error) {
    console.error("Error al eliminar la apelación:", error);
    return [null, "Error interno del servidor"];
  }
}

module.exports = {
  createAppeal,
  getAppeals,
  getAppealById,
  getAppealsByUserEmail,
  updateAppeal,
  deleteAppeal,
};
