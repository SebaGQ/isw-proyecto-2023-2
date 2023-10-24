"use strict";
// Importar el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de postulaciones */
const postulacionController = require("../controllers/postulacion.controller.js");

/** los middleware de autenticacion*/
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
/** Middleware de autorizacion */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** creamos una instancia del servidor con la libreria express*/
const router = express.Router();
// Define las rutas para las postulaciones
router.get("/", postulacionController.getPostulaciones);
router.post("/", postulacionController.createPostulacion);
router.get("/:id", postulacionController.getPostulacionById);
router.put("/:id", postulacionController.updatePostulacionById);
router.delete("/:id", postulacionController.deletePostulacionById);

module.exports = router;