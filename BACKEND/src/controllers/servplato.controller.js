const pool = require('../db');

const getAllServPlato = async (req, res, next) => {
    try {
        const allServPlato = await pool.query("SELECT * FROM ServPlato ORDER BY id");
        res.json(allServPlato.rows);
    } catch (error) {
        next(error);
    }
}

const getServPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM ServPlato WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El ServPlato no existe"
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createServPlato = async (req, res, next) => {
    const { platoid, servicioid } = req.body;
    try {
        const result = await pool.query("INSERT INTO ServPlato (platoid, servicioid) VALUES ($1, $2) RETURNING *", [
            platoid,
            servicioid
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteServPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM ServPlato WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El ServPlato no existe"
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editServPlato = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { platoid, servicioid } = req.body;
        const result = await pool.query("UPDATE ServPlato SET platoid = $1, servicioid = $2 WHERE id = $3 RETURNING *",
            [
                platoid,
                servicioid,
                id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El ServPlato no existe"
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllServPlato,
    getServPlato,
    createServPlato,
    deleteServPlato,
    editServPlato
};
