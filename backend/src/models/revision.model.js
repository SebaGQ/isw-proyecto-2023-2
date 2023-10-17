const mongoose= require("mongoose");
const RevisionSchema = new mongoose.Schema({
    idPostulacion: { type: mongoose.Schema.Types.ObjectId, ref: "Postulacion" },
    Estado: {
        type: String,
        required: true,
        enum: ["Aprobado", "Rechazado", "En revision", "Pendiente"],
        default: "Pendiente",
    },
    Fecha: {
        type: Date,
        required: true,
        default: Date.now,
    },
    Comentario: {
        type: String,
        required: false,
    },
    Rut: { type: mongoose.Schema.Types.ObjectId, ref: "Rut" },
    
});

module.exports = mongoose.model("Revision", RevisionSchema);

