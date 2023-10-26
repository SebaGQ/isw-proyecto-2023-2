"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos

const mongoose = require("mongoose");


const pautaSchema = new mongoose.Schema(
    {
        NombrePauta: {
            type: String,
            required: true,
        },
        MaxPorcentajeFichaHogar: {
            type: String,
            required: true,
        },
        MinCantidadIntegrantes: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);
// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const pauta = mongoose.model("pauta", pautaSchema);

module.exports = pauta;
