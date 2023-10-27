"use strict";

// conectamos mongoose
const mongoose = require("mongoose");
// constante availibity
const availability = require("../constants/avalibility.constants.js");
// constante postulationSchema
const postulationSchema = new mongoose.Schema({
    subsidyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsidy",
        required: true,
    },
    socialPercentage: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: availability,
        default: "Pendiente",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    integrantes: {
        type: Number,
        required: true,
    }

},{
    timestamps: true
});

const postulation = mongoose.model('Postulation', postulationSchema);
module.exports = postulation;