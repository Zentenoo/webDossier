const ReservaModel = require('../models/reserva.model');

const getAllReserva = async (req, res, next) => {
    try {
        const allReserva = await ReservaModel.getAllReservas();
        res.json(allReserva.rows);
    } catch (error) {
        next(error);
    }
}

const getReserva = async (req, res, next) => {
    try {
        const { id } = req.params;
        const reserva = await ReservaModel.getReservaById(id);
        if (!reserva) {
            return res.status(404).json({
                message: "La reserva no existe"
            });
        }
        res.json(reserva);
    } catch (error) {
        next(error);
    }
}

const createReserva = async (req, res, next) => {
    try {
        const { fechareserva, fechaservicio, cupo, observacion, estado, total, usuarioid, servicioid } = req.body;
        if (!fechareserva || !fechaservicio || !cupo || !observacion || !estado || !total || !usuarioid || !servicioid) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const nuevaReserva = await ReservaModel.createReserva(fechareserva, fechaservicio, cupo, observacion, estado, total, usuarioid, servicioid);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        next(error);
    }
};

const editEstadoReserva = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { estado} = req.body;
        const reservaEditada = await ReservaModel.updateEstadoReserva(id,estado);
        if (!reservaEditada) {
            return res.status(404).json({
                message: "La Reserva no existe"
            });
        }
        res.json(platoEditado);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllReserva,
    getReserva,
    createReserva,
    editEstadoReserva
};
