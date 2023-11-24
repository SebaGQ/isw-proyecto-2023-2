/* eslint-disable max-len */
"use strict";

const Application = require("../models/application.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const Subsidy = require("../models/subsidy.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");
const AVAILABILITY = require("../constants/availability.constants");


    /*
      Cambios solicitados por el profesor después de presentación oral: Sebastián Gutiérrez
      Se creará un objeto de revisión al momento de crear la postulación, en caso de fallar validaciones, 
      se agregarán comentarios a la revisión indicando las fallas, en caso de cumplir se agregará un comentario que lo indique.
    */ 
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

    const applicationDateObj = new Date(applicationDate);
    // Validacion de la flecha de aplicacion con la del subsidio
    if (applicationDateObj > subsidy.dateEnd || applicationDateObj < subsidy.dateStart) {
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

  /* 
      Cambios solicitados por el profesor después de presentación oral: Sebastián Gutiérrez
      Se entregará distinta información en función de si la solicitud fue rechazada o sigue en proceso
  */ 
async function getApplicationsByUserEmail(userEmail) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }
    const applications = await Application.find({ userId: user._id });
    
    const applicationsWithDetails = await Promise.all(applications.map(async (application) => {
      //Si la postulación fue rechazada, la revisión   de por qué fue rechazada
      if (application.status === AVAILABILITY[2]) {
        const review = await Review.findOne({ applicationId: application._id });
        return { application, review };
      }
      //Si la postulación está en Revisión, Pendiente o Apelación entregará los datos con los que está postulando/apelando
      return { application };
    }));

    return [applicationsWithDetails, null];
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