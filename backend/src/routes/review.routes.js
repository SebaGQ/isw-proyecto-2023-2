/* eslint-disable max-len */
"use strict";

const express = require("express");
const reviewController = require("../controllers/review.controller");

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes q reciben un body
// const validationMiddleware = require("../middlewares/valid.review.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, reviewController.getReviews);
router.get("/filter", reviewController.filterReviews);
router.get("/userReview", authorizationMiddleware.isUser, reviewController.getReviewByEmail);
router.get("/:id", authorizationMiddleware.isAdmin, reviewController.getReviewById);
router.post("/", authorizationMiddleware.isAdmin, reviewController.createReview);
router.put("/:id", authorizationMiddleware.isAdmin, reviewController.updateReviewById);
router.delete("/:id", authorizationMiddleware.isAdmin, reviewController.deleteReviewById);

module.exports = router;
