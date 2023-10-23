"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos

const mongoose = require("mongoose");

const SubsidioSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Descripcion: {
            type: String,
            required: true,
        },
        Direccion: {
            type: String,
            required: true,
        },
        Monto: {
            type: Number,
            required: true,
        },     
        Tipo: {
            type: String,
            required: true,
         },
        
        pauta:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "pauta", 
         },
      ],       
    }
    
);
// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const Subsidio = mongoose.model("Subsidio", SubsidioSchema);

module.exports = Subsidio;

