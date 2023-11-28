import React, { useState} from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createServicio } from "../helpers/helpercreateServicio";
import { getAllPlato } from "../../Plato/helpers/getAllPlato";
import {createServPlato} from "../ServPlato/helpers/helpercreateServPlato"
import '@yaireo/tagify/dist/tagify.css';
import Tagify from '@yaireo/tagify';

export const CreateServicioPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [cupo, setCupo] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState(true);;
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");
  const [platos, setPlatos] = useState([]);
  const tagifyRef = useRef(null);
  const [isTagifyInitialized, setIsTagifyInitialized] = useState(false);

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
      });

      tagifyRef.current.tagify = tagify;
      setIsTagifyInitialized(true);
    }
  }, [platos, tagifyRef]);

  const handleCrearServicio = async () => {
    if (nombre.trim() === "" || descripcion.trim() === "") {
      setError("Nombre y descripción son campos obligatorios");
      return;
    }
    try{
      const servicio = {
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        cupo,
        precio,
        estado,
        foto: foto ? await convertToBase64(foto) : null,
      };
      // Obtener los platos seleccionados desde la instancia de Tagify
      const platosSeleccionados = tagifyRef.current.tagify.value.map((platoObj) => {
        const plato = platos.find((p) => p.nombre === platoObj.value);
        console.log('Plato nombre:', platoObj.value);
        console.log('Plato encontrado:', plato);
        return plato ? plato.id : null;
      }).filter(Boolean);      
      
      console.log("IDs de los platos seleccionados:", platosSeleccionados);

      const listaPlatos = Array.from(platosSeleccionados); // Convert the object to an array
      console.log("IDs de los platos seleccionados:", listaPlatos);

      const exitoServicio = await createServicio(servicio, listaPlatos);

      if (exitoServicio) {
        window.location.href = "/servicios";
      } else {
        setError("Error al crear el servicio");
      }
    } catch (error) {
      setError("Error al crear el servicio");
    }

  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container">
      <h1>Crear Nuevo Servicio</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          className="form-control"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="fechaFin"
          className="form-control"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cupo">Cupo:</label>
        <input
          type="number"
          id="cupo"
          className="form-control"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          className="form-control"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          >
          <option value={false}>No Visible</option>
          <option value={true}>Visible</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="foto">Foto:</label>
        <input
          type="file"
          id="foto"
          className="form-control"
          onChange={(e) => setFoto(e.target.files[0])}
        />
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
      <button className="btn btn-primary" onClick={handleCrearServicio}>
        Crear Servicio
      </button>
      <Link to="/servicios" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};