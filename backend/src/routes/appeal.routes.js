/* eslint-disable max-len */
const express = require("express");
const appealController = require("../controllers/appeal.controller");

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes q reciben un body
const validationMiddleware = require("../middlewares/valid.appeal.middleware.js");


const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, appealController.getAppeals);
router.get("/user/", appealController.getAppealsByUserEmail);
router.get("/:id", authorizationMiddleware.isAdmin, appealController.getAppealById);
router.post("/", validationMiddleware.validateAppealBody, appealController.createAppeal);
router.put("/:id", validationMiddleware.validateAppealBody, authorizationMiddleware.isAdmin, appealController.updateAppeal);
router.delete("/:id", authorizationMiddleware.isAdmin, appealController.deleteAppeal);

module.exports = router;
