import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getServicioById } from "../helpers/helpergeServicioById";
import { getAllServPlatosByServId } from "../ServPlato/helpers/helpergetAllServPlatosByServId";

export const ServicioInfoPage = () => {
    const [servicio, setServicio] = useState([]);
    const [servPlatos, setServPlatos] = useState([]);
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        const fetchServicio = async () => {
          try {
            const servicioData = await getServicioById(id);
            setServicio(servicioData);
    
            // Llama a getAllServPlatosByServId para obtener los ServPlatos asociados al servicio
            const servPlatosData = await getAllServPlatosByServId(id);
            setServPlatos(servPlatosData);
          } catch (error) {
            console.error("Error fetching servicio:", error);
            // Puedes manejar el error de alguna manera, por ejemplo, redirigiendo a otra página
          }
        };
    
        fetchServicio();
      }, [id]);
      
    
  return (
    <>
      <div className="container">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'5px'}}>
          <h1>Datos del Servicio "{servicio.nombre}"</h1>
          <Link to="/servicios" className="btn btn-primary">
              Volver
          </Link>
        </div>
        <hr></hr>
        <div className="container" style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            <div>
                <img src={servicio.foto} style={{width:"400px"}} />
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <p> <h4>Fecha de Inicio: </h4>{servicio.fechaInicio}</p>
                <p> <h4>Fecha Fin: </h4>{servicio.fechaFin}</p>
                <p> <h4>Descripcion: </h4>{servicio.descripcion}</p>
                <p> <h4>Cupos: </h4>{servicio.cupo}</p>
                <p> <h4>Precio: </h4>{servicio.precio}</p>
                <h4>ServPlatos:</h4>
                {servPlatos !== null && servPlatos.length > 0 && (
              <>
                
                <ul>
                  {servPlatos.map((servPlato) => (
                    <li key={servPlato.id}>
                      {/* Muestra los detalles de cada ServPlato */}
                      Platoid: {servPlato.platoid}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Mensaje si no hay ServPlatos */}
            {(servPlatos === null || servPlatos.length === 0) && (
              <p>No hay ServPlatos asociados a este servicio.</p>
            )}
            </div>
        </div>
      </div>
    </>
  );
};