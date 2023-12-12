const pool = require('../db');

class ServicioModel {
    static async getAllServicios() {
        try {
            const allServicios = await pool.query('SELECT * FROM Servicio');
            return allServicios;
        } catch (error) {
            throw error;
        }
    }

    static async getServicioById(id) {
        try {
            const servicio = await pool.query('SELECT * FROM Servicio WHERE id = $1', [id]);
            return servicio;
        } catch (error) {
            throw error;
        }
    }

    static async createServicio(nombre, descripcion, fechaInicio, fechaFin, cupo, precio, foto) {
        try {
            const result = await pool.query(
                'INSERT INTO servicio (nombre, descripcion, fechainicio, fechafin, cupo,precio, fotos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [nombre, descripcion, fechaInicio, fechaFin, cupo,precio, foto]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async deleteServicioById(id) {
        try {
            const result = await pool.query('DELETE FROM Servicio WHERE id = $1', [id]);
            if (result.rowCount === 0) {
                throw new Error('El servicio no existe');
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateServicioById(id,nombre, descripcion, fechaInicio, fechaFin, cupo, precio, foto) {
        try {
            const result = await pool.query(
                'UPDATE Servicio SET nombre = $1, descripcion = $2, fechainicio = $3, fechafin = $4, cupo = $5, precio = $6, fotos = $7 WHERE id = $8 RETURNING *',
                [nombre, descripcion, fechaInicio, fechaFin, cupo,precio, fotos, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ServicioModel;
