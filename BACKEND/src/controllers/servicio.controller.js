const pool = require('../db')

const getAllServicios = async (req, res, next) => {
    try {
        const allServicios = await pool.query("Select * from servicio ORDER BY 1");

        // Formatear las fechas en un formato adecuado antes de enviar la respuesta
        const serviciosWithFormattedDates = allServicios.rows.map((servicio) => ({
            id: servicio.id,
            nombre: servicio.nombre,
            descripcion: servicio.descripcion,
            fechaInicio: servicio.fechainicio.toISOString().split('T')[0],
            fechaFin: servicio.fechafin.toISOString().split('T')[0],
            cupo: servicio.cupo,
            precio: servicio.precio,
            foto: servicio.foto,
        }));

        // Agregar un registro de impresión para verificar las fechas formateadas
        console.log("Servicios con fechas formateadas:", serviciosWithFormattedDates);

        res.json(serviciosWithFormattedDates);
    } catch (error) {
        next(error);
    }
}


const getServicio = async(req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM servicio WHERE id=$1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El servicio no existe"
            });
        }
        res.json(result.rows[0]);
    } catch(error) {
        next(error)
    }
}

const createServicio = async (req, res, next) => {
    const { nombre, descripcion, fechaInicio, fechaFin, cupo, precio, foto } = req.body
    try {
        const result = await pool.query("INSERT INTO servicio (nombre, descripcion, fechainicio, fechafin, cupo, precio, foto) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            cupo,
            precio,
            foto
        ]);
        res.json(result.rows[0]);
    } catch(error) {
        next(error)
    }
}

const deleteServicio = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM servicio WHERE id=$1 RETURNING *", [id])
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El servicio no existe"
            });
        }
        return res.sendStatus(204);
    } catch(error) {
        next(error)
    }
}

const editServicio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, fechaInicio, fechaFin, cupo, precio, foto } = req.body;
        const result = await pool.query("UPDATE servicio SET nombre=$1, descripcion=$2, fechainicio=$3, fechafin=$4, cupo=$5, precio=$6, foto=$7 WHERE id=$8 RETURNING *",
        [
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            cupo,
            precio,
            foto,
            id
        ])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El servicio no existe"
            });
        }
        return res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getAllServicios,
    getServicio,
    createServicio,
    deleteServicio,
    editServicio
}
