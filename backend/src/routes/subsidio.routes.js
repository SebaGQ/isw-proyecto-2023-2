// Importa el modulo 'express' para crear las rutas
const express = require('express');

/** Instancia del enrutador */
const router = express.Router();

//importar crud
const subsidioControllers = require ('../controllers/subsidio.controller.js');

//importar crud de pauta
const pautaController = require ('../controllers/pauta.controller.js');

// Middleware para verificar que el usuario es un administrador
const authorization = require('../middlewares/authorization.middleware.js');



// Rutas para los subsidios o beneficios
router.post('/', authorization.isAdmin, subsidioControllers.createSubsidio);
router.get('/', subsidioControllers.getSubsidios);
router.get('/:id', subsidioControllers.getSubsidioById);
router.put('/:id', authorization.isAdmin, subsidioControllers.updateSubsidio);
router.delete('/:id',authorization.isAdmin, subsidioControllers.deleteSubsidio);

module.exports = router;
