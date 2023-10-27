/* eslint-disable max-len */
const express = require("express");
const { createAppeal, getAppeals, getAppealById, getAppealsByUserId, updateAppeal, deleteAppeal } = require("../controllers/appeal.controller");

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

router.get("/", authorizationMiddleware.isAdmin, getAppeals);
router.get("/:id", authorizationMiddleware.isAdmin, getAppealById);
router.get("/user/:userId", getAppealsByUserId);
router.post("/", validationMiddleware.validateAppealBody, createAppeal);
router.put("/:id", validationMiddleware.validateAppealBody, authorizationMiddleware.isAdmin, updateAppeal);
router.delete("/:id", authorizationMiddleware.isAdmin, deleteAppeal);

module.exports = router;
