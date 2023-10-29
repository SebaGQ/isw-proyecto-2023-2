"use strict";

const Application = require("../models/application.model");
const User = require("../models/user.model");
const Subsidy = require("../models/subsidy.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");
const AVAILABILITY = require("../constants/availability.constants");

async function createApplication(subsidyId, userEmail, socialPercentage, applicationDate, members) {
  try { 
    console.log(subsidyId);
    const user = await User.findOne({ email: userEmail });
    if (!user) return [null, "Usuario no encontrado"];

    // El populate toma subsidy.guidelineId y guarda dentro el objeto guideline completo que tiene esa ID
    // En el fondo hace dos consultas a la base de datos, y una la guarda dentro de la otra.
    const subsidy = await Subsidy.findById(subsidyId).populate("guidelineId");
    if (!subsidy) return [null, "El subsidio asociado no existe"];

    const guideline = subsidy.guidelineId;
    if (!guideline) return [null, "No se encontró la pauta asociada al subsidio"];

    const hasPending = await hasPendingApplication(user._id, subsidyId);
    if (hasPending) {
      return [null, "Ya tiene una postulación pendiente para este subsidio"];
    }

    let status = AVAILABILITY[3];

    // validación porcentaje social
    if (socialPercentage > guideline.maxSocialPercentage) {
      status = AVAILABILITY[2];
    } 
    // validacion de integrantes
    if (members < guideline.minMembers) {
      status = AVAILABILITY[2];
    } 

    const newApplication = new Application({
      subsidyId,
      userId: user._id,
      socialPercentage,
      applicationDate,
      status,
      members,
    });

    await newApplication.save();
    return [newApplication, null];
  } catch (error) {
    handleError(error, "application.service -> createApplication");
    return [null, "Error al crear la postulación"];
  }
}

async function getApplications(filters = {}) {
  try {
    const applications = await Application.find(filters);
    if (!applications) return [null, "No hay postulaciones"];
    return [applications, null];
  } catch (error) {
    handleError(error, "application.service -> getApplications");
    return [null, "Error al obtener las postulaciones"];
  }
}


async function getApplicationById(applicationId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return [null, "ID de postulación no válido"];
    }
    const application = await Application.findById(applicationId);
    if (!application) return [null, "Postulación no encontrada"];
    return [application, null];
  } catch (error) {
    handleError(error, "application.service -> getApplicationById");
    return [null, "Error al obtener la postulación"];
  }
}
async function getApplicationsByUserEmail(userEmail) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }
    const applications = await Application.find({ userId: user._id });
    return [applications, null];
  } catch (error) {
    handleError(error, "application.service -> getApplicationsByUserEmail");
    return [null, "Error al obtener las postulaciones por correo electrónico del usuario"];
  }
}

async function updateApplication(applicationId, updateData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return [null, "ID de postulación no válido"];
    }
    const application = await Application.findByIdAndUpdate(applicationId, updateData, { new: true });
    if (!application) return [null, "Postulación no encontrada"];
    return [application, null];
  } catch (error) {
    handleError(error, "application.service -> updateApplication");
    return [null, "Error al actualizar la postulación"];
  }
}

async function deleteApplication(applicationId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return [null, "ID de postulación no válido"];
    }
    const application = await Application.findByIdAndDelete(applicationId);
    if (!application) return [null, "Postulación no encontrada"];
    return [application, null];
  } catch (error) {
    handleError(error, "application.service -> deleteApplication");
    return [null, "Error al eliminar la postulación"];
  }
}

async function hasPendingApplication(userId, subsidyId) {
  try {
    const pendingApplication = await Application.findOne({
      userId,
      subsidyId,
      status: AVAILABILITY[3]
    });
    return pendingApplication !== null; // Retorna true si existe una aplicación pendiente
  } catch (error) {
    handleError(error, "application.service -> hasPendingApplication");
    throw new Error("Error al comprobar la existencia de postulaciones pendientes");
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserEmail,
  updateApplication,
  deleteApplication,
};