const pool = require('../db');

class ReservaModel {
    static async getAllReservas() {
      try {
        const allReservas = await pool.query("SELECT r.*, u.correo AS nombre_usuario, s.nombre AS nombre_servicio FROM reserva AS r JOIN usuario AS u ON r.UsuarioId = u.id JOIN servicio AS s ON r.ServicioId = s.id ORDER BY r.fechareserva");
        return allReservas;
      } catch (error) {
        throw error;
      }
    }
  
    static async getReservaById(id) {
      try {
        const reserva = await pool.query('SELECT * FROM Reserva WHERE id = $1', [id]);
        return reserva;
      } catch (error) {
        throw error;
      }
    }
  
    static async createReserva(fechareserva, fechaservicio, cupo, observacion, estado, total, usuarioid, servicioid) {
      try {
        const result = await pool.query(
          'INSERT INTO Reserva (fechareserva, fechaservicio, cupo, observacion, estado,total,usuarioid,servicioid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [fechareserva, fechaservicio, cupo, observacion, estado, total, usuarioid, servicioid]
        );
        return result;
      } catch (error) {
        throw error;
      }
    }
  
    static async updateEstadoReserva(id, estado) {
      try {
        const result = await pool.query(
          'UPDATE reserva SET estado = $1 WHERE id = $2 RETURNING *',
          [estado,id]
        );
        return result;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = ReservaModel;