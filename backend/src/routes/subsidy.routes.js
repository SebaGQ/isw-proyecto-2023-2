const express = require('express');
const { createSubsidy, getSubsidies, getSubsidyById, updateSubsidy, deleteSubsidy } = require('../controllers/subsidy.controller');

const router = express.Router();

/** Middleware de autenticación */
// Se encarga de validar que el JWT sea válido
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de validación */
// Se usa solo en las solicitudes que reciben un body 
const validationMiddleware = require("../middlewares/valid.subsidy.middleware.js");

router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware.isAdmin, getSubsidies);
router.get('/:id', getSubsidyById);
router.post('/', validationMiddleware.validateSubsidyBody, createSubsidy);
router.put('/:id', validationMiddleware.validateSubsidyBody, authorizationMiddleware.isAdmin, updateSubsidy);
router.delete('/:id', authorizationMiddleware.isAdmin, deleteSubsidy);

module.exports = router;