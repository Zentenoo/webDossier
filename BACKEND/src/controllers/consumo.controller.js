const ConsumoModel = require('../models/consumo.model');

const getAllConsumos = async (req, res, next) => {
    try {
        const allConsumos = await ConsumoModel.getAllConsumos();
        res.json(allConsumos.rows);
    } catch (error) {
        next(error);
    }
}
const getConsumoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const consumo = await ConsumoModel.getConsumoById(id);
        res.json(consumo.rows);
    } catch (error) {
        next(error);
    }
}

const createConsumo = async (req, res, next) => {
    try {
        const { fecha, estado, total, reservaid } = req.body;
        const newConsumo = await ConsumoModel.createConsumo(fecha, estado, total, reservaid);
        res.status(201).json(newConsumo.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteConsumoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ConsumoModel.deleteConsumoById(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
const updateConsumoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fecha, estado, total, reservaid } = req.body;
        const updatedConsumo = await ConsumoModel.updateConsumoById(id, fecha, estado, total, reservaid);
        res.json(updatedConsumo.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllConsumos,
    getConsumoById,
    createConsumo,
    deleteConsumoById,
    updateConsumoById
}