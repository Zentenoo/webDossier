const pool = require('../db');

const estado = true; 
const esadmin = false; 
const esanfitrion = false; 

const getAllUsuarios = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('SELECT * FROM Usuario');
        res.json(allUsuarios.rows);
    } catch (error) {
        next(error);
    }
};

const getUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM Usuario WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createUsuario = async (req, res, next) => {
    const {
        nombre,
        contraseña,
        apellido,
        telefono,
        correo,
        foto
    } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Usuario (Nombre, Contraseña, Apellido, Telefono, Correo, Estado, EsAdmin, EsAnfitrion, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [
                nombre,
                contraseña,
                apellido,
                telefono,
                correo,
                estado, 
                esadmin,
                esanfitrion, 
                foto
            ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Usuario WHERE id=$1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const editUsuario = async (req, res, next) => {
    const { id } = req.params;
    const {
        nombre,
        contraseña,
        apellido,
        telefono,
        correo,
        estado,
        esadmin,
        esanfitrion,
        foto
    } = req.body;

    try {
        const result = await pool.query(
            'UPDATE Usuario SET Nombre=$1, Contraseña=$2, Apellido=$3, Telefono=$4, Correo=$5, Estado=$6, EsAdmin=$7, EsAnfitrion=$8, Foto=$9 WHERE id=$10 RETURNING *',
            [
                nombre,
                contraseña,
                apellido,
                telefono,
                correo,
                estado,
                esadmin,
                esanfitrion,
                foto,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsuarios,
    getUsuario,
    createUsuario,
    deleteUsuario,
    editUsuario
};
