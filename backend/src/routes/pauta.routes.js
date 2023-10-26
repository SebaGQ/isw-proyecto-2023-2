// Importa el modulo "express" para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

// importar crud
const pautaController = require("../controllers/pauta.controller.js");

// Middleware para verificar que el usuario es un administrador
const authorization = require("../middlewares/authorization.middleware.js");

// Rutas para los subsidios o beneficios
router.post("/", authorization.isAdmin, pautaController.createPauta);
router.get("/", pautaController.getPautas);
router.get("/:id", pautaController.getPautaById);
router.put("/:id", authorization.isAdmin, pautaController.updatePauta);
router.delete("/:id", authorization.isAdmin, pautaController.deletePauta);

module.exports = router;

