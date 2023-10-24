"use strict";

const express = require('express');
const guidelineController = require('../controllers/guideline.controller');

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes que reciben un body 
const validationMiddleware = require("../middlewares/valid.guideline.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, guidelineController.getGuidelines);
router.get("/:id", guidelineController.getGuidelineById);
router.post("/", validationMiddleware.validateGuidelineBody, guidelineController.createGuideline);
router.put("/:id", validationMiddleware.validateGuidelineBody, authorizationMiddleware.isAdmin, guidelineController.updateGuideline);
router.delete("/:id", authorizationMiddleware.isAdmin, guidelineController.deleteGuideline);

module.exports = router;