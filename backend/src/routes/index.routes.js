"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de postulaciones */
const applicationRoutes = require("./application.routes.js");

/** Enrutador de subsidios */
const subsidyRoutes = require("./subsidy.routes.js");

/** Enrutador de revisiones */
const reviewRoutes = require("./review.routes.js");

/** Enrutador de apelaciones */
const appealRoutes = require("./appeal.routes.js");

/** Enrutador de pautas */
const guidelineRoutes = require("./guideline.routes.js");
/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/user
router.use("/users", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las postulaciones /api/applications
router.use("/applications", applicationRoutes);
// Define las rutas para los subsidios /api/subsidies
router.use("/subsidies", subsidyRoutes);
// Define las rutas para las apelaciones /api/appeals
router.use("/appeals", appealRoutes);
// Define las rutas para las pautas /api/guidelines
router.use("/guidelines", guidelineRoutes);
// Define las rutas para las revisiones /api/reviews
router.use("/reviews", reviewRoutes);


// Exporta el enrutador
module.exports = router;
