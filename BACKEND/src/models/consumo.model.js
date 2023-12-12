const pool = require('../db');

class ConsumoModel {
  static async getAllConsumos() {
    try {
      const allConsumos = await pool.query("SELECT c.*, s.nombre AS nombre_servicio, u.correo AS correo_usuario FROM consumo c JOIN reserva r ON c.reservaid = r.id JOIN servicio s ON r.servicioid = s.id JOIN usuario u ON r.usuarioid = u.id ORDER BY c.id");
      return allConsumos;                  
    } catch (error) {
      throw error;
    }
  }

  static async getConsumoById(id) {
    try {
      const consumo = await pool.query('SELECT * FROM Consumo WHERE id = $1', [id]);
      return consumo;
    } catch (error) {
      throw error;
    }
  }

  static async createConsumo(fecha, estado, total, reservaid) {
    try {
      const result = await pool.query(
        'INSERT INTO Consumo (fecha, estado, total, reservaid) VALUES ($1, $2, $3, $4) RETURNING *',
        [fecha, estado, total, reservaid]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteConsumoById(id) {
    try {
      const result = await pool.query('DELETE FROM Consumo WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        throw new Error('El consumo no existe');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateConsumoById(id, fecha, estado, total, reservaid) {
    try {
      const result = await pool.query(
        'UPDATE Consumo SET fecha = $1, estado = $2, total = $3, reservaid = $4 WHERE id = $5 RETURNING *',
        [fecha, estado, total, reservaid, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConsumoModel;
