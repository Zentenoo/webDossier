const pool = require('../db');

const getAllTipoPlatos = async (req, res, next) => {
    try {
        const allTipoPlatos = await pool.query("SELECT * FROM TipoPlato");
        res.json(allTipoPlatos.rows);
    } catch (error) {
        next(error);
    }
}

const getTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM TipoPlato WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createTipoPlato = async (req, res, next) => {
    const { nombre, descripcion, PlatoId } = req.body;
    try {
        const result = await pool.query("INSERT INTO TipoPlato (nombre, descripcion, PlatoId) VALUES ($1, $2, $3) RETURNING *", [
            nombre,
            descripcion,
            PlatoId
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM TipoPlato WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editTipoPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, PlatoId } = req.body;
        const result = await pool.query("UPDATE TipoPlato SET nombre = $1, descripcion = $2, PlatoId = $3 WHERE id = $4 RETURNING *",
            [
                nombre,
                descripcion,
                PlatoId,
                id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El tipo de plato no existe"
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTipoPlatos,
    getTipoPlato,
    createTipoPlato,
    deleteTipoPlato,
    editTipoPlato
};
