"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos

const mongoose = require("mongoose");
const { schema } = require("./user.model");
const { number } = require("joi");

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
        Type: {
            type: String,
            required: true,
        },
        PorcentajeFichaHogar: {
            type: String,
            required: false,
        },
        CantidadIntegrantes: {
            type: Number,
            required: false,
        },
        Direccion: {
            type: String,
            required: true,
        },
        Monto: {
            type: Number,
            required: true,
        },       
    }
    
);
// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const Subsidio = mongoose.model("Subsidio", SubsidioSchema);

module.exports = Subsidio;

