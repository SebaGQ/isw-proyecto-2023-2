"use strict";

const express = require('express');
const applicationsController = require('../controllers/application.controller');

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación, se usa solo en las solicitudes q reciben un body */
const validationMiddleware = require("../middlewares/valid.application.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/", validationMiddleware.validateApplicationBody, applicationsController.createApplication);
router.get("/", authorizationMiddleware.isAdmin, applicationsController.getApplications);
router.get("/:id", applicationsController.getApplicationById);
router.get('/user/:userId',applicationsController.getApplicationsByUserId);
router.put("/:id", validationMiddleware.validateApplicationBody, authorizationMiddleware.isAdmin, applicationsController.updateApplication);
router.delete("/:id", authorizationMiddleware.isAdmin, applicationsController.deleteApplication);

module.exports = router;