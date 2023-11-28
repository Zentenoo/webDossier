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
            estado:servicio.estado,
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

const createServicio = async (req, res) => {
    const servicio = req.body.servicio;
    const listaPlatos = req.body.listaPlatos;
    let servicioId;
    console.log('Lista platos: ', listaPlatos);
  
    // Obtener los datos de los platos de la lista
    const platos = listaPlatos.map((platoid) => {
      return {
        platoid,
      };
    });
    console.log('Platos: ', platos);
  
    // Crear el servicio
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Inicio de la transacción
  
      // Insertar el servicio
      const servicioQuery = `
        INSERT INTO servicio (nombre, descripcion, fechainicio, fechafin, cupo, precio, estado, foto)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`;
      const servicioValues = [
        servicio.nombre,
        servicio.descripcion,
        servicio.fechaInicio,
        servicio.fechaFin,
        servicio.cupo,
        servicio.precio,
        servicio.estado,
        servicio.foto
      ];
      const servicioResult = await client.query(servicioQuery, servicioValues);
      servicioId = servicioResult.rows[0].id; // Asignar el ID del servicio a la variable
  
      // Insertar los platos del servicio
      for (const plato of platos) {
        const insertServPlatoQuery = `
          INSERT INTO servplato (platoid, servicioid)
          VALUES ($1, $2)`;
        const insertServPlatoValues = [plato.platoid, servicioId];
        await client.query(insertServPlatoQuery, insertServPlatoValues);
      }
  
      await client.query("COMMIT"); // Confirmar la transacción
    } catch (error) {
      await client.query("ROLLBACK"); // Revertir la transacción en caso de error
      throw error;
    } finally {
      client.release(); // Liberar el cliente de la conexión
    }
  
    res.status(200).json({
      success: true,
      servicioId
    });
  };
    
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

const editServicio = async (req, res) => {
    const servicioId = req.params.servicioId; // Obtener el ID del servicio a editar desde los parámetros
    const servicio = req.body.servicio;
    const listaPlatos = req.body.listaPlatos;
  
    // Comienza una transacción para editar el servicio
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Inicio de la transacción
  
      // Actualizar la información del servicio
      const updateServicioQuery = `
        UPDATE servicio
        SET nombre = $1, descripcion = $2, fechainicio = $3, fechafin = $4, cupo = $5, precio = $6, estado = $7, foto = $8
        WHERE id = $9`;
      const updateServicioValues = [
        servicio.nombre,
        servicio.descripcion,
        servicio.fechaInicio,
        servicio.fechaFin,
        servicio.cupo,
        servicio.precio,
        servicio.estado,
        servicio.foto,
        servicioId
      ];
      await client.query(updateServicioQuery, updateServicioValues);
  
      // Eliminar la relación actual entre el servicio y los platos
      const deleteServPlatoQuery = `
        DELETE FROM servplato
        WHERE servicioid = $1`;
      await client.query(deleteServPlatoQuery, [servicioId]);
  
      // Insertar las nuevas relaciones entre el servicio y los platos actualizados
      for (const platoid of listaPlatos) {
        const insertServPlatoQuery = `
          INSERT INTO servplato (platoid, servicioid)
          VALUES ($1, $2)`;
        const insertServPlatoValues = [platoid, servicioId];
        await client.query(insertServPlatoQuery, insertServPlatoValues);
      }
  
      await client.query("COMMIT"); // Confirmar la transacción
    } catch (error) {
      await client.query("ROLLBACK"); // Revertir la transacción en caso de error
      throw error;
    } finally {
      client.release(); // Liberar el cliente de la conexión
    }
  
    res.status(200).json({
      success: true,
      message: `Servicio con ID ${servicioId} editado exitosamente`
    });
  };
  
  const getPlatosPorServicio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT platoid
            FROM ServPlato
            WHERE servicioid = $1
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron platos para este servicio"
            });
        }

        // Extraer los IDs de los platos de los resultados
        const platosIds = result.rows.map(row => row.platoid);

        res.json(platosIds);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllServicios,
    getServicio,
    createServicio,
    deleteServicio,
    editServicio
}
