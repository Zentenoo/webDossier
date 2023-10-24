import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editTipoPlato } from "../helpers/helpereditTipoPlato";
import { getTipoPlatoById } from "../helpers/helpergetTipoPlatoById";

export const EditTipoPlatoPage = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTipoPlatoData = async () => {
      try {
        const tipoPlato = await getTipoPlatoById(id);

        if (tipoPlato) {
          setNombre(tipoPlato.nombre);
          setDescripcion(tipoPlato.descripcion);
        } else {
          setError("Tipo de plato no encontrado");
        }
      } catch (error) {
        setError("Error en la solicitud");
      } finally {
        setLoading(false);
      }
    };

    loadTipoPlatoData();
  }, [id]);

  const handleGuardarCambios = async () => {
    if (nombre.trim() === "" || descripcion.trim() === "") {
      setError("Nombre y descripción son campos obligatorios");
      return;
    }

    try {
      await editTipoPlato(id, nombre, descripcion);
      // Navegar de regreso a la página de lista de tipos de plato
      window.location.href = "/tipo_plato";
    } catch (error) {
      setError("Error al guardar los cambios");
    }
  };

  const handleCancelar = () => {
    // Navegar de regreso a la página de lista de tipos de plato sin guardar cambios
    window.location.href = "/tipo_plato";
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Editar Tipo de Plato: {nombre}</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
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
              <button className="btn btn-primary" onClick={handleGuardarCambios}>
                Guardar Cambios
              </button>
              <button className="btn btn-secondary" onClick={handleCancelar}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
