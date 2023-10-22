"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
const tipoPostulacion = require("../constants/subsidios.constants");


// Crea el esquema de la coleccion 'roles'
const tipoPostSchema = new mongoose.Schema(
  {
    Tipo: {
      type: String,
      enum: tipoPostulacion,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const tipo = mongoose.model("Tipo", tipoPostSchema);

module.exports = tipo;