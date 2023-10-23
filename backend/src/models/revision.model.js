const mongoose= require("mongoose");
const RevisionSchema = new mongoose.Schema({
    Postulacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Postulacion",
        required: true,
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

