const pool = require('../db');

const getAllPlato = async (req, res, next) => {
    try {
        const allPlatos = await pool.query("SELECT p.*,t.nombre tipoplato FROM plato p, tipoplato t WHERE p.TipoPlatoId=t.id ORDER BY 1");
        res.json(allPlatos.rows);
    } catch (error) {
        next(error);
    }
}

const getPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM plato WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        res.json(result.rows[0]);
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
        const result = await pool.query(
            "INSERT INTO plato (nombre, descripcion, estado, foto, tipoplatoid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, descripcion, estado, foto, tipoPlatoId]
        );
        if (result.rows.length > 0) {
            res.status(201).json(result.rows[0]);
        } else {
            res.status(500).json({ message: "Error al crear el plato" });
        }
    } catch (error) {
        next(error);
    }
};


const deletePlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM Plato WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado, foto, tipoPlatoId } = req.body;
        const result = await pool.query("UPDATE Plato SET nombre = $1, descripcion = $2, estado = $3, foto = $4, tipoPlatoId = $5 WHERE id = $6 RETURNING *",
            [
                nombre,
                descripcion,
                estado,
                foto,
                tipoPlatoId,
                id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        return res.json(result.rows[0]);
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