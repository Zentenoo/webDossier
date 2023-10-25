const pool = require('../db');

const getAllTipoPlato = async (req, res, next) => {
    try {
        const allTipoPlatos = await pool.query("SELECT * FROM TipoPlato ORDER BY 1");
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
    const { nombre, descripcion } = req.body;
    try {
        const result = await pool.query("INSERT INTO TipoPlato (nombre, descripcion) VALUES ($1, $2) RETURNING *", [
            nombre,
            descripcion,
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
        const { nombre, descripcion } = req.body;
        const result = await pool.query("UPDATE TipoPlato SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
            [
                nombre,
                descripcion,
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
    getAllTipoPlato,
    getTipoPlato,
    createTipoPlato,
    deleteTipoPlato,
    editTipoPlato
};
