"use strict";

const Application = require("../models/application.model");
const User = require("../models/user.model");
const Subsidy = require("../models/subsidy.model");
const mongoose = require('mongoose');
const { handleError } = require("../utils/errorHandler");

async function createApplication(subsidyId, userEmail, socialPercentage, applicationDate) {
  try { 
    const user = await User.findOne({ email: userEmail }); //preguntar al prodowner si dejamos el correo lo cambiamos el rut
    if (!user) return [null, "Usuario no encontrado"];

    //El populate toma subsidy.guidelineId y guarda dentro el objeto guideline completo que tiene esa ID
    //En el fondo hace dos consultas a la base de datos, y una la guarda dentro de la otra.
    const subsidy = await Subsidy.findById(subsidyId).populate('guidelineId');
    if (!subsidy) return [null, 'El subsidio asociado no existe'];

    const guideline = subsidy.guidelineId;
    if (!guideline) return [null, "No se encontró la pauta asociada al subsidio"];

    let status = 'Pendiente';

    if (socialPercentage > guideline.maxSocialPercentage) {
      status = 'Rechazado';
    } else {
      // Agregar más lógica para validar postulacion
    }
    // validacion de integrantes
    if (members < guideline.minMembers) {
      status = 'Rechazado';
    } else {
      // Agregar más lógica para validar postulacion
    }

    const newApplication = new Application({
      subsidyId,
      userId: user._id,
      socialPercentage,
      applicationDate,
      status
    });

    await newApplication.save();
    return [newApplication, null];
  } catch (error) {
    handleError(error, "application.service -> createApplication");
    return [null, "Error al crear la postulación"];
  }
}

async function getApplications() {
  try {
    const applications = await Application.find();
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

async function getApplicationsByUserId(userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [null, "ID de usuario no válido"];
    }
    const applications = await Application.find({ userId });
    return [applications, null];
  } catch (error) {
    handleError(error, "application.service -> getApplicationsByUserId");
    return [null, "Error al obtener las postulaciones por ID de usuario"];
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

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserId,
  updateApplication,
  deleteApplication,
};  