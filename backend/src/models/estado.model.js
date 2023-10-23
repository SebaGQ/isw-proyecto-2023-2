"use strict";
// importa modulo de mongoose para conectar a bd
const mongoose = require("mongoose");
// importa constantes de estado
const ESTADOS = require("../constants/estados.constants");
// crea esquema de la coleccion 'estados'
const estadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      enum: ESTADOS,
    },
  },
  {
    versionKey: false,
  },
);
// crea modelo de datos 'Estado' a partir del esquema 'estadoSchema'
const Estado = mongoose.model("Estado", estadoSchema);
// exporta modelo de datos 'Estado'
module.exports = Estado;
