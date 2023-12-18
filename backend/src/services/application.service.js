"use strict";

const Application = require("../models/application.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const Subsidy = require("../models/subsidy.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");
const AVAILABILITY = require("../constants/availability.constants");

/* Cambios solicitados por el profesor. Hecho por Patricio Villalón */
function validarRUT(rut) {
  // Separar el R.U.T. y el dígito verificador
  const cleanRUT = rut.replace(/\./g, '').replace(/-/i, '').toUpperCase();
  const rutNumeros = cleanRUT.slice(0, -1);
  const digitoVerificador = cleanRUT.slice(-1);

  // Calcular el dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  for (let i = rutNumeros.length - 1; i >= 0; i--) {
    suma += parseInt(rutNumeros[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const digitoEsperado = 11 - (suma % 11);
  const digitoCalculado = digitoEsperado === 11 ? '0' : digitoEsperado.toString();

  // Comparar el dígito verificador calculado con el proporcionado
  return digitoCalculado === digitoVerificador;
}

    /*
      Cambios solicitados por el profesor después de presentación oral: Sebastián Gutiérrez
      Se creará un objeto de revisión al momento de crear la postulación, en caso de fallar validaciones, 
      se agregarán comentarios a la revisión indicando las fallas, en caso de cumplir se agregará un comentario que lo indique.
    */ 
async function createApplication(firstName, lastName1, lastName2, rutUser,subsidyId, socialPercentage, applicationDate, members, rutsMembers,userEmail) {
  try {   
    //El usuario no se debe buscar por el primer rut ingresado
    //const user = await User.findOne({ rut: rut[0] });

    //como debe ser el usuario q está postulando se saca del token
    const user = await User.findOne({ email:userEmail});
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

    const hasPrevious = await hasPreviousApplication(user._id, subsidyId);
    if (hasPrevious) {
      return [null, "Ya ha realizado una postulación previa para este subsidio"];
    }
    
    // Verificar que el rutUser ingresado sea un rut valido, a través de un calculo matematico
    if(!validarRUT(rutUser)){
      return [null, "El rut ingresado es invalido"];
    }
    // Se verifica por cada item en el arreglo, que el rut sea valido, a traves de un calculo matematico.      
    for(const ruts of rutsMembers){
      if(!validarRUT(ruts)){
        return [null, "Uno o más rut es invalido"];
      }
    }
    // Se agrega validacion de cantidad de rut igual a la cantidad de miembros.
    //console.log(rut.length);
    //console.log(members);
    if (rutsMembers.length !== members) {
      return [null, "Los ruts y miembros ingresados deben ser iguales"];
      }

    //Se define el estado de postulación en 'Pendiente'
    let status = AVAILABILITY[3];
    let comments = [];
        // Se define por defectos los estados de la revision, asi si esta correcto todas seran true
        let statusPercentage = true;
        let statusMembers = true;
        let statusDate = true;
    
    // validación porcentaje social
    if (socialPercentage > guideline.maxSocialPercentage) {
      status = AVAILABILITY[2];
      comments.push("El porcentaje social excede el máximo permitido por las pautas del subsidio.");
      statusPercentage = false;
    } 
    // validacion de integrantes
    if (members < guideline.minMembers) {
      status = AVAILABILITY[2];
      comments.push("La cantidad de integrantes es menor al mínimo requerido por las pautas del subsidio.");
      statusMembers = false;
    }

    const applicationDateObj = new Date(applicationDate);
    // Validacion de la flecha de aplicacion con la del subsidio
    if (applicationDateObj > subsidy.dateEnd || applicationDateObj < subsidy.dateStart) {
      status = AVAILABILITY[2];
      comments.push("La fecha de postulación no está dentro del rango permitido por el subsidio.");
      statusDate = false;
    }

    const newApplication = new Application({
      firstName,
      lastName1,
      lastName2,
      rutUser,
      subsidyId,
      userId: user._id,
      socialPercentage,
      applicationDate,
      status,
      members,
    });

    await newApplication.save();

    //Se define el estado de revisión en 'En Revisión'
    let statusReview = AVAILABILITY[0];

    if (comments.length === 0) {
      comments.push("La postulación cumple con los requisitos de la pauta.");
      //Se define el estado de revisión en 'Aceptado'
      statusReview = AVAILABILITY[3];
    }

    const newReview = new Review({
      applicationId: newApplication._id,
      comments,
      statusReview,
      origin: "Postulación",
      statusPercentage,
      statusMembers,
      statusDate,
    });

    await newReview.save();

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
    const applications = await Application.find({ userId: user._id }).populate("subsidyId");
    
    const applicationsWithDetails = await Promise.all(applications.map(async (application) => {
      //Si la postulación fue rechazada, la revisión de por qué fue rechazada
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

async function updateApplicationStatus(applicationId, newStatus) {
  try {

    if (newStatus !== "Aprobado" && newStatus !== "Rechazado") {
      return [null, "Estado de postulación no válido"];
    }

    const application = await Application.findByIdAndUpdate(applicationId, { status: newStatus }, { new: true });
    if (!application) return [null, "Postulación no encontrada"];

    return [application, null];
  } catch (error) {
    handleError(error, "application.service -> updateApplicationStatus");
    return [null, "Error al actualizar el estado de la postulación"];
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

async function hasPreviousApplication(userId, subsidyId) {
  try {
    const previousApplication = await Application.findOne({
      userId,
      subsidyId,
      status: { $ne: AVAILABILITY[4] } // Excluye el estado "Rechazado"
    });
    return previousApplication !== null; // Retorna true si existe una aplicación previa
  } catch (error) {
    handleError(error, "application.service -> hasPreviousApplication");
    throw new Error("Error al comprobar la existencia de postulaciones previas");
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserEmail,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  hasPendingApplication,
  hasPreviousApplication,
};