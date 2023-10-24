const Appeal = require('../models/appeal.model');
const User = require('../models/user.model');
const ApplicationService = require('./application.service');
const mongoose = require('mongoose');

async function createAppeal(userEmail, postData) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }

    const [application, applicationError] = await ApplicationService.getApplicationById(postData.postId);
    if (applicationError) return [null, applicationError];
    if (!application) return [null, 'La postulación asociada no existe'];

    const newAppeal = new Appeal({
      postId: postData.postId,
      userId: user._id,
      reason: postData.reason
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

async function getAppealsByUserId(userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [null, "ID de usuario no válido"];
    }
    const appeals = await Appeal.find({ userId });
    return [appeals, null];
  } catch (error) {
    console.error("Error al obtener las apelaciones por ID de usuario:", error);
    return [null, "Error interno del servidor"];
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
  getAppealsByUserId,
  updateAppeal,
  deleteAppeal
};
