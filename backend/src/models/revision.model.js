const mongoose= require("mongoose");
const RevisionSchema = new mongoose.Schema({
    idPostulacion: { type: mongoose.Schema.Types.ObjectId, ref: "Postulacion" },
    estado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Postulacion",
        required: true,
        enum: ["Aprobado", "Rechazado", "En revision", "Pendiente"],
        default: "Pendiente",
    },
    fechaModificacion: {
        type: Date,
        required: true,
        default: Date.now,
    },
    comentario: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Revision", RevisionSchema);

