const pool = require('../db');

const Usuario = {
  async findByEmailAndPassword(correo, contraseña) {
    try {
      const result = await pool.query('SELECT * FROM Usuario WHERE correo = $1 AND contraseña = $2', [correo, contraseña]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async register(nombre, contraseña, apellido, telefono, correo, foto, estado, esadmin, esanfitrion) {
    try {
      const result = await pool.query(
        'INSERT INTO Usuario (Nombre, Contraseña, Apellido, Telefono, Correo, Estado, EsAdmin, EsAnfitrion, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [nombre, contraseña, apellido, telefono, correo, estado, esadmin, esanfitrion, foto]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteById(id) {
    try {
      const result = await pool.query('DELETE FROM Usuario WHERE id=$1 RETURNING *', [id]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  },

  async update(id, nombre, contraseña, apellido, telefono, correo, estado, esadmin, esanfitrion, foto) {
    try {
      const result = await pool.query(
        'UPDATE Usuario SET Nombre=$2, Contraseña=$3, Apellido=$4, Telefono=$5, Correo=$6, Estado=$7, EsAdmin=$8, EsAnfitrion=$9, Foto=$10 WHERE id=$1 RETURNING *',
        [id, nombre, contraseña, apellido, telefono, correo, estado, esadmin, esanfitrion, foto]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getAll() {
    try {
      const allUsuarios = await pool.query('SELECT * FROM Usuario');
      return allUsuarios.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Usuario;