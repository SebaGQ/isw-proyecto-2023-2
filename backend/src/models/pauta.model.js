"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos

const mongoose = require("mongoose");


const pautaSchema = new mongoose.Schema(
    {
        PorcentajeFichaHogar: {
            type: String,
            required: true,
        },
        CantidadIntegrantes: {
            type: Number,
            required: true,
        },
    }
);
// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const pauta = mongoose.model("Pauta", pautaSchema);

module.exports = pauta;