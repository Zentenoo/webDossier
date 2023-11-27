const PlatoModel = require('../models/plato.model');

const getAllPlato = async (req, res, next) => {
    try {
        const allPlatos = await PlatoModel.getAllPlatos();
        res.json(allPlatos.rows);
    } catch (error) {
        next(error);
    }
}

const getPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const plato = await PlatoModel.getPlatoById(id);
        if (!plato) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        res.json(plato);
    } catch (error) {
        next(error);
    }
}

const createPlato = async (req, res, next) => {
    try {
        const { nombre, descripcion, estado, foto, tipoPlatoId } = req.body;
        if (!nombre || !descripcion || !foto || !tipoPlatoId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const nuevoPlato = await PlatoModel.createPlato(nombre, descripcion, estado, foto, tipoPlatoId);
        res.status(201).json(nuevoPlato);
    } catch (error) {
        next(error);
    }
};

const deletePlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        await PlatoModel.deletePlatoById(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado, foto, tipoPlatoId } = req.body;
        const platoEditado = await PlatoModel.updatePlatoById(id, nombre, descripcion, estado, foto, tipoPlatoId);
        if (!platoEditado) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        res.json(platoEditado);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPlato,
    getPlato,
    createPlato,
    deletePlato,
    editPlato
};
