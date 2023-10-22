// Importa el modulo 'express' para crear las rutas
const express = require('express');

/** Instancia del enrutador */
const router = express.Router();

//importar crud
const tipoPostControllers = require ('../controllers/tipoPostulacion.controller.js');

// Middleware para verificar que el usuario es un administrador
const authorization = require('../middlewares/authorization.middleware.js');



// Rutas para los subsidios o beneficios
router.post('/', authorization.isAdmin, tipoPostControllers.createTipoPostulacion);
router.get('/', tipoPostControllers.getTipoPostulaciones);
router.get('/:id', tipoPostControllers.getTipoPostulacionById);
router.put('/:id', authorization.isAdmin, tipoPostControllers.updateTipoPostulacion);
router.delete('/:id',authorization.isAdmin, tipoPostControllers.deleteTipoPostulacion);

module.exports = router;