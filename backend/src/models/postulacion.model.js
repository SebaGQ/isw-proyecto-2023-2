"use strict";
// importar el modulo moongose para conectar a la bd
const mongoose = require("mongoose");

// crear el esquema de la coleccion 'postulaciones'`
const postulacionSchema = new mongoose.Schema(
  {
    usuario:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    estado:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estado",//falta agregarlo
      default: "pendiente",
      required: true,
    },
    fecha:
    {
      type: Date,
      default: Date.now,
      required: true,
    },
    porcentajeFicha:
    {
      type: String,
      
    },
    integrantesHogar:
    {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
  
);

// crear el modelo de datos 'Postulacion' a partir del esquema 'postulacionSchema'
const Postulacion = mongoose.model("Postulacion", postulacionSchema);
module.exports=Postulacion;
