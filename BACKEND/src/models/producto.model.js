const pool = require('../db');

class ProdcutoModel {
  static async getAllPlatos() {
    try {
      const allPlatos = await pool.query("SELECT p.*,t.nombre tipoplato FROM plato p, tipoplato t WHERE p.TipoPlatoId=t.id ORDER BY 1");
      return allPlatos;
    } catch (error) {
      throw error;
    }
  }

  static async getPlatoById(id) {
    try {
      const plato = await pool.query('SELECT * FROM Plato WHERE id = $1', [id]);
      return plato;
    } catch (error) {
      throw error;
    }
  }

  static async createPlato(nombre, descripcion, estado, foto, tipoPlatoId) {
    try {
      const result = await pool.query(
        'INSERT INTO Plato (nombre, descripcion, estado, foto, tipoPlatoId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, descripcion, estado, foto, tipoPlatoId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deletePlatoById(id) {
    try {
      const result = await pool.query('DELETE FROM Plato WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        throw new Error('El plato no existe');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updatePlatoById(id, nombre, descripcion, estado, foto, tipoPlatoId) {
    try {
      const result = await pool.query(
        'UPDATE Plato SET nombre = $1, descripcion = $2, estado = $3, foto = $4, tipoPlatoId = $5 WHERE id = $6 RETURNING *',
        [nombre, descripcion, estado, foto, tipoPlatoId, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PlatoModel;
