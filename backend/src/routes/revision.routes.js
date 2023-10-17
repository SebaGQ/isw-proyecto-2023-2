// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de revisiones */
const revisionController = require("../controllers/revision.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las revisiones
router.get("/", authorizationMiddleware.isAdmin, revisionController.getPostulacionesPendientes);
router.get("/:id", authorizationMiddleware.isAdmin, revisionController.getPostulacionById);
router.put("/:id", authorizationMiddleware.isAdmin, revisionController.updateEstadoPostulacion);


// Exporta el enrutador
module.exports = router;
