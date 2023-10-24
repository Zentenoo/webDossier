const pool = require('../db')
const getAllPlato = async (req, res,next) => {
    try {
        const allPlatos=await pool.query("Select * from plato")
        res.json(allPlatos.rows)
    } catch (error){
        next(error)
    }
}
const getPlato = async(req, res,next) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM plato WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        res.json(result.rows[0]);
    } catch(error) {
        next(error)
    }
}

const createPlato =async (req, res,next) => {
    const { nombre, descripcion } = req.body
    try {
        const result = await pool.query("INSERT INTO plato (nombre,descripcion) VALUES ($1,$2) RETURNING *", [
            nombre, 
            descripcion
        ]);
        res.json(result.rows[0]);
    } catch(error) {
        next(error)
    }
}

const deletePlato = async(req, res,next) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM plato WHERE id=$1 RETURNING *", [id])
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El plato no existe"
            });
        }
        return res.sendStatus(204);
    } catch(error) {
        next(error)
    }
}

const editPlato = async(req, res,next) => {
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
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getAllPlato,
    getPlato,
    createPlato,
    deletePlato,
    editPlato
}