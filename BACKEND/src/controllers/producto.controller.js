const pool = require('../db');

const getAllProducto = async (req, res, next) => {
    try {
        const allProducto = await pool.query("SELECT * FROM Producto ORDER BY 1");
        res.json(allProducto.rows);
    } catch (error) {
        next(error);
    }
}

const getProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM Producto WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El producto no existe"
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createProducto = async (req, res, next) => {
    const { nombre, descripcion, precio, stock, estado, foto } = req.body;
    try {
        const result = await pool.query("INSERT INTO Producto (nombre, descripcion, precio, stock, estado, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
            nombre,
            descripcion,
            precio,
            stock,
            estado,
            foto
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM Producto WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "El producto no existe"
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const editProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, estado, foto } = req.body;
        const result = await pool.query("UPDATE Producto SET nombre = $1, descripcion = $2, precio = $3, stock = $4, estado = $5, foto = $6 WHERE id = $7 RETURNING *",
            [
                nombre,
                descripcion,
                precio,
                stock,
                estado,
                foto,
                id
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "El producto no existe"
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAllProducto,
    getProducto,
    createProducto,
    deleteProducto,
    editProducto
};