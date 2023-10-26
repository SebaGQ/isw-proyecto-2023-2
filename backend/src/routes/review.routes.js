"use strict";

const express = require('express');
const reviewController = require('../controllers/review.controller');

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes q reciben un body
const validationMiddleware = require("../middlewares/valid.review.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, reviewController.getReviews);
router.get("/:id", authorizationMiddleware.isAdmin, reviewController.getReviewById);
router.post("/", validationMiddleware.validateReviewBody, reviewController.createReview);
router.put("/:id", validationMiddleware.validateReviewBody, authorizationMiddleware.isAdmin, reviewController.updateReviewById);
router.delete("/:id", authorizationMiddleware.isAdmin, reviewController.deleteReviewById);
router.get('/filter', reviewController.filterReviews);

//faltaria por hacer en el service uno para que revise el estado de la revision quien realizo la postulacion

module.exports = router;
