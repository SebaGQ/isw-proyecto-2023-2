/* eslint-disable max-len */
"use strict";

const express = require("express");
const reviewAppealController = require("../controllers/reviewAppeal.controller");

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes q reciben un body
// const validationMiddleware = require("../middlewares/valid.reviewAppeal.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, reviewAppealController.getReviewsAppeal);
router.get("/:id", authorizationMiddleware.isAdmin, reviewAppealController.getReviewAppealById);
router.post("/", authorizationMiddleware.isAdmin, reviewAppealController.createReviewAppeal);
router.put("/:id", authorizationMiddleware.isAdmin, reviewAppealController.updateReviewAppealById);
router.delete("/:id", authorizationMiddleware.isAdmin, reviewAppealController.deleteReviewAppealById);

module.exports = router;
