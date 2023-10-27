/* eslint-disable max-len */
"use strict";

const express = require("express");
const applicationsController = require("../controllers/application.controller");

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes q reciben un body
const validationMiddleware = require("../middlewares/valid.application.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, applicationsController.getApplications);
router.get("/:id", authorizationMiddleware.isAdmin, applicationsController.getApplicationById);
router.get("/user/:email", applicationsController.getApplicationsByUserEmail);
router.post("/", validationMiddleware.validateApplicationBody, applicationsController.createApplication);
router.put("/:id", validationMiddleware.validateApplicationBody, authorizationMiddleware.isAdmin, applicationsController.updateApplication);
router.delete("/:id", authorizationMiddleware.isAdmin, applicationsController.deleteApplication);

module.exports = router;
