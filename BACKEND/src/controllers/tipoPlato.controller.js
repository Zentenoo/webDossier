const pool = require('../db');
const TipoPlatoModel = require('../models/tipoPlato.model');

const getAllTipoPlato = async (req, res, next) => {
    try {
        const allTipoPlatos = await TipoPlatoModel.getAllTipoPlato();
        res.json(allTipoPlatos.rows);
    } catch (error) {
        next(error);
    }
}

const getTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tipoPlato = await TipoPlatoModel.getTipoPlato(id);
        if (tipoPlato.rowCount === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        res.json(tipoPlato.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createTipoPlato = async (req, res, next) => {
    try {
        const { nombre, descripcion } = req.body;
        const result = await TipoPlatoModel.createTipoPlato(nombre, descripcion);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await TipoPlatoModel.deleteTipoPlato(id);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const result = await TipoPlatoModel.updateTipoPlato(id, nombre, descripcion);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAllTipoPlato,
    getTipoPlato,
    createTipoPlato,
    deleteTipoPlato,
    editTipoPlato
};