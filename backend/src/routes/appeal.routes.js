const express = require('express');
const { createAppeal, getAppeals, getAppealById, getAppealsByUserId, updateAppeal, deleteAppeal } = require('../controllers/appeal.controller');

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.post('/', createAppeal);
router.get('/', authorizationMiddleware.isAdmin, getAppeals);
router.get('/:id', getAppealById);
router.get('/user/:userId', getAppealsByUserId);
router.put('/:id', authorizationMiddleware.isAdmin, updateAppeal);
router.delete('/:id', authorizationMiddleware.isAdmin, deleteAppeal);

module.exports = router;