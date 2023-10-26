"use strict";
// Importar el modulo 'express' para crear las rutas
const express = require("express");

// Middleware de autenticacion
const auth = require("../middlewares/auth.middleware.js");
// Middleware de autorizacion
const authz = require("../middlewares/authz.middleware.js");
// Middleware de validacion
const validate = require("../middlewares/validate.middleware.js");

// constatnte router express
const router = express.Router();

// router usa middleware autenticacion
router.use(auth);
// Ruta principal del controlador
router.get("/", authz(["admin"]), getAllSubsidies);
// Ruta para crear un subsidio
router.post("/", authz(["admin"]), validate(createSubsidySchema), createSubsidy);
// Ruta para obtener un subsidio por id
router.get("/:id", authz(["admin"]), getSubsidyById);
// Ruta para obtener un subsidio por id de usuario
router.get("/user/:id", authz(["admin"]), getSubsidyByUserId);
// Ruta para actualizar un subsidio por id
router.put("/:id", authz(["admin"]), validate(updateSubsidySchema), updateSubsidy);
// Ruta para eliminar un subsidio por id
router.delete("/:id", authz(["admin"]), deleteSubsidy);
module.exports = router;