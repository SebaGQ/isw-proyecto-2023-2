//operaciones crud admin
const Subsidio = require ("../models/subsidio.model.js");

async function getSubsidios(req, res) {
    const subsidio = await Subsidio.find();
    res.json(subsidio);
}

async function createSubsidio(req, res) {
    try {
        const newSubsidio = new Subsidio(req.body);
        const subsidioSaved = await newSubsidio.save();
        res.status(201).json(subsidioSaved);
    } catch (error) {
     resHandler.error(res, 'Error al crear el subsidio.', 500);

    }
}

async function getById(req, res) {
    const subsidio = await Subsidio.findById(req.params.id);
    res.json(subsidio);
}


module.exports = {
    createSubsidio,
    getSubsidios,
    getById,
};