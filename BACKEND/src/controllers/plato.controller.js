const pool = require('../db')
const getAllPlatos = async (req, res) => {
    try {
        const allPlatos=await pool.query("Select * from plato")
        res.json(allPlatos.rows)
    } catch {
        res.status(404).send({ error: "Error" })
    }
}
const getPlato = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM plato WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        res.json(result.rows[0]);
    } catch {
        res.status(404).send({ error: "Error" })
    }
}

const createPlato =async (req, res) => {
    const { nombre, descripcion } = req.body
    try {
        const result = await pool.query("INSERT INTO plato (nombre,descripcion) VALUES ($1,$2) RETURNING *", [
            nombre, 
            descripcion
        ]);
        res.json(result.rows[0]);
    } catch {
        res.status(404).send({ error: "Error" })
    }
}

const deletePlato = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM plato WHERE id=$1 RETURNING *", [id])
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        return res.sendStatus(204);
    } catch {
        res.status(404).send({ error: "Error" })
    }
}

const editPlato = async(req, res) => {
    try {
        const { id } = req.params;
        const {nombre,descripcion} = req.body;
        const result=await pool.query("UPDATE plato SET nombre=$1,descripcion=$2 WHERE id=$3 RETURNING *", 
        [
           nombre,descripcion,id
        ])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        return res.json(result.rows[0])
    } catch {
        res.status(404).send({ error: "Error" })
    }
}

module.exports = {
    getAllPlatos,
    getPlato,
    createPlato,
    deletePlato,
    editPlato
}