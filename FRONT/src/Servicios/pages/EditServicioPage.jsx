import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlato } from "../../Plato/helpers/getPlato";
import { editServicio } from "../helpers/helpereditServicio";
import { getAllPlato } from "../../Plato/helpers/getAllPlato";
import { getAllServPlatosByServId } from "../ServPlato/helpers/helpergetAllServPlatosByServId";
import '@yaireo/tagify/dist/tagify.css';
import Tagify from '@yaireo/tagify';

export const EditServicioPage = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState({});
  const [error, setError] = useState("");
  const [platos, setPlatos] = useState([]);
  const tagifyRef = useRef(null);
  const [isTagifyInitialized, setIsTagifyInitialized] = useState(false);
 
  const getServicioWithFechasById = async (id) => {
    try {
      const servicioResponse = await fetch(`http://localhost:3000/servicio/${id}`);
      const platosResponse = await getAllServPlatosByServId(id);

      console.log("Platos recibidos:", platosResponse);

      if (servicioResponse.ok && Array.isArray(platosResponse)) {
        const servicioData = await servicioResponse.json();
        const platosSeleccionados = platosResponse.map((plato) => plato.platoid);

        console.log("Platos seleccionados (IDs):", platosSeleccionados);

        const platosNombres = await Promise.all(
          platosSeleccionados.map(async (platoId) => {
            const plato = await getPlato(platoId);
            console.log(`Nombre del plato con ID ${platoId}:`, plato ? plato.nombre : 'No encontrado');
            return plato ? plato.nombre : 'No encontrado';
          })
        );

        console.log("Platos seleccionados (nombres):", platosNombres);

        setServicio({
          ...servicioData,
          platos: platosNombres,
        });

        return servicioData;
      } else {
        setError("Error al obtener el servicio o los platos asociados al servicio");
        return "error";
      }
    } catch (error) {
      console.error(`Error al obtener el servicio o los platos asociados al servicio: ${error.message}`);
      setError("Error al obtener el servicio o los platos asociados al servicio");
      return "error";
    }
  };

  
  useEffect(() => {
    getAllPlato()
      .then((platos) => {
        if (Array.isArray(platos)) {
          setPlatos(platos);
          console.log("Platos obtenidos de la base de datos:", platos);
        } else {
          setError("Error al obtener la lista de platos");
        }
      })
      .catch((error) => {
        setError("Error al obtener la lista de platos");
      });
  }, []);

  useEffect(() => {
    if (tagifyRef.current && platos.length > 0 && !tagifyRef.current.tagify) {
      const tagify = new Tagify(tagifyRef.current, {
        whitelist: platos.map((plato) => plato.nombre),
        dropdown: {
          enabled: 1,
        },
        originalInputValue: servicio.platos || [], // Establecer los platos seleccionados como valor inicial
      });
  
      tagifyRef.current.tagify = tagify;
      setIsTagifyInitialized(true);
    }
  }, [platos, tagifyRef, servicio.platos]); // Agrega servicio.platos a la dependencia del efecto
  

  useEffect(() => {
    getServicioWithFechasById(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };
  

  const handleUpdateServicio = async () => {
    const platosSeleccionados = tagifyRef.current.tagify.value.map((platoObj) => {
      const plato = platos.find((p) => p.nombre === platoObj.value);
      return plato ? plato.id : null;
    }).filter(Boolean);

    const success = await editServicio(
      id,
      servicio.nombre,
      servicio.descripcion,
      servicio.fechaInicio,
      servicio.fechaFin,
      servicio.cupo,
      servicio.precio,
      servicio.estado,
      servicio.foto,
      platosSeleccionados
    );

    if (success) {
      window.location.href = "/servicios";
    } else {
      setError("Error al actualizar el servicio");
    }
  };
  console.log("estado fina;",servicio)

  return (
    <div className="container">
      <h1>Editar Servicio</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre" // Agrega el atributo "name" para identificar el campo
          className="form-control"
          value={servicio.nombre || ""} // Usa servicio.nombre o cadena vacía por defecto
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="form-control"
          value={servicio.descripcion || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          className="form-control"
          value={servicio.fechaInicio || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          className="form-control"
          value={servicio.fechaFin || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cupo">Cupo:</label>
        <input
          type="number"
          id="cupo"
          name="cupo"
          className="form-control"
          value={servicio.cupo || 0}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          className="form-control"
          value={servicio.precio || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            className="form-control"
            value={servicio.estado || false}
            onChange={handleChange}
          >
            <option value={false}>No Visible</option>
            <option value={true}>Visible</option>
          </select>
        </div>
      <div className="form-group">
        <label htmlFor="platos">Platos:</label>
        <input
          id="platos"
          className="form-control"
          placeholder="Agregar platos"
          ref={tagifyRef}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleUpdateServicio}>
        Actualizar Servicio
      </button>
      <Link to="/servicios" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};
