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

router.get("/", applicationsController.getApplications);
router.get("/user/", applicationsController.getApplicationsByUserEmail);
router.get("/:id", authorizationMiddleware.isAdmin, applicationsController.getApplicationById);
router.post("/", validationMiddleware.validateApplicationBody, authorizationMiddleware.isUser, applicationsController.createApplication);
router.put("/:id", validationMiddleware.validateApplicationBody, authorizationMiddleware.isAdmin, applicationsController.updateApplication);
router.delete("/:id", authorizationMiddleware.isAdmin, applicationsController.deleteApplication);

module.exports = router;