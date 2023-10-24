"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/**Enrutador de subsidios */
const subsidioRoutes = require("./subsidio.routes.js");

/**Enrutador de pautas */
const pautaRoutes = require("./pauta.routes.js");

/** Enrutador de postulacion */
const postulacionRoutes = require("./postulacion.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para la postulacion /api/postulacion
router.use("/postulacion", authenticationMiddleware, postulacionRoutes);
//define las rutas para los subsidios
router.use("/subsidio", authenticationMiddleware, subsidioRoutes);
//define las rutas para las pautas
router.use("/pauta", authenticationMiddleware, pautaRoutes);

// Exporta el enrutador
module.exports = router;
