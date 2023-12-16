const AVAILABILITY = require("../constants/availability.constants");
const Appeal = require("../models/appeal.model");
const User = require("../models/user.model");
const Guideline = require("../models/guideline.model");
const ApplicationService = require("./application.service");
const mongoose = require("mongoose");
const Subsidy = require("../models/subsidy.model");
const Review = require("../models/review.model");



/*  
Cambios solicitados por el profesor después de presentación oral: Sebastián Gutiérrez
Se actualiza la postulación existente en función de los parametros de la apelación.

Se verifica si existen los valores new, en caso de que sí, se reemplazan en la postulación y se agrega
un comentario indicando que se actualizó el campo, mostrando el valor nuevo y el antiguo. De lo cual queda registro en la BD.
 
Finalmente en el campo result de la apelación se indica si la apelación cumplió con la pauta de subsidio o no.
En función de ese resultado se marca la postulación como aceptada o rechazada.
*/
async function createAppeal(userEmail, postData) {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return [null, "Usuario no encontrado"];
    }
    const [application, applicationError] = await ApplicationService.getApplicationById(postData.postId);
    if (applicationError) return [null, applicationError];
    if (!application) return [null, "La postulación asociada no existe"];

    if (application.status !== AVAILABILITY[2]) return [null, "La postulación debe estar Rechazada para apelar."];
    if (application.userId.toString() !== user._id.toString()) return [null, "La postulación a la que se está apelando debe pertenecer al usuario."];

    const newAppeal = new Appeal({
      postId: postData.postId,
      userId: user._id,
      status: AVAILABILITY[1],
      newSocialPercentage: postData.newSocialPercentage,
      newMembers: postData.newMembers,
      newMemberRUTs: postData.newMemberRUTs
    });

    //Se actualiza la postulación con los valores nuevos
    application.socialPercentage = newAppeal.newSocialPercentage;
    application.members = newAppeal.newMembers;

    let comments = [];
    const subsidy = await Subsidy.findById(application.subsidyId);
    const guideline = await Guideline.findById(subsidy.guidelineId);

    const newReview = new Review({
      applicationId: postData.postId,
      comments: [],
      status: AVAILABILITY[1],
      origin: "Apelación",
    });

    if (postData.newSocialPercentage > guideline.maxSocialPercentage) {
      newReview.status = AVAILABILITY[2];
      comments.push("El porcentaje social excede el máximo permitido por las pautas del subsidio.");
    }

    if (postData.newMembers < guideline.minMembers) {
      newReview.status = AVAILABILITY[2];
      comments.push("La cantidad de integrantes es menor al mínimo requerido por las pautas del subsidio.");
    }

    if (comments.length === 0) {
      comments.push("La apelación cumple con los requisitos de la pauta.");
    }

    newReview.comments = comments;

    application.status = newReview.status;

    await newAppeal.save();
    await application.save();
    await newReview.save();

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
