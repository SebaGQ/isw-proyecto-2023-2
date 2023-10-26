"use strict";

// conectamos mongoose
const mongoose = require("mongoose");
// constante availibity
const availability = require("../constants/avalibility.constants.js");
// constante postulationSchema
const postulationSchema = new mongoose.Schema({
    subsidy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsidy",
        required: true,
    },
    ],
    socialPercentage: {
        type: Number,
        required: true,
    },
    applicationDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: availability,
        default: "Pendiente",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true
});

const postulation = mongoose.model('Postulation', postulationSchema);
module.exports = postulation;