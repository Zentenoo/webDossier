const pool=require('../db');

class TipoPlatoModel{

    static async getAllTipoPlato(){
        try{
            const allTipoPlato=await pool.query("SELECT * FROM TipoPlato ORDER BY 1");
            return allTipoPlato;
        }catch(error){
            throw error;
        }
    }

    static async getTipoPlato(id){
        try{
            const tipoPlato=await pool.query('SELECT * FROM TipoPlato WHERE id = $1', [id]);
            return tipoPlato;
        }catch(error){
            throw error;
        }
    }

    static async createTipoPlato(nombre,descripcion){
        try{
            const result=await pool.query('INSERT INTO TipoPlato (nombre,descripcion) VALUES ($1,$2) RETURNING *', [nombre,descripcion]);
            return result;
        }catch(error){
            throw error;
        }
    }

    static async deleteTipoPlato(id){
        try{
            const result=await pool.query('DELETE FROM TipoPlato WHERE id = $1', [id]);
            if(result.rowCount===0){
                throw new Error('El tipo de plato no existe');
            }
        }catch(error){
            throw error;
        }
    }

    static async updateTipoPlato(id,nombre,descripcion){
        try{
            const result=await pool.query('UPDATE TipoPlato SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *', [nombre,descripcion,id]);
            return result;
        }catch(error){
            throw error;
        }
    }
}

module.exports=TipoPlatoModel;