// Importa el modulo 'express' para crear las rutas
const express = require('express');

/** Instancia del enrutador */
const router = express.Router();
// Middleware para verificar que el usuario es un administrador
const { isAdmin } = require('./middlewares/authorization.middleware.js');

const subsidyController = require('./controllers/subsidyController');
const evaluationController = require('./controllers/evaluationController');

// Rutas para los subsidios o beneficios
router.post('/subsidies', isAdmin, subsidyController.create);
router.get('/subsidies', subsidyController.getAll);
router.get('/subsidies/:id', subsidyController.getById);
router.put('/subsidies/:id', isAdmin, subsidyController.update);
router.delete('/subsidies/:id', isAdmin, subsidyController.delete);

// Rutas para las pautas de evaluación relacionadas con los subsidios o beneficios
router.post('/subsidies/:subsidyId/evaluations', isAdmin, evaluationController.create);
router.get('/subsidies/:subsidyId/evaluations', evaluationController.getAll);
router.get('/subsidies/:subsidyId/evaluations/:id', evaluationController.getById);
router.put('/subsidies/:subsidyId/evaluations/:id', isAdmin, evaluationController.update);
router.delete('/subsidies/:subsidyId/evaluations/:id', isAdmin, evaluationController.delete);

module.exports = router;
