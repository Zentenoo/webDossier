import { editarTipoPlato } from "../helpers/editTipoPlato"; 
import React, { useEffect, useState } from "react";
import { useParams, navigate } from "@reach/router"; // Asegúrate de importar useParams y navigate

export const EditarTipoPlato = () => {
  const { id } = useParams(); 
  const [tipoPlato, setTipoPlato] = useState({});
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {

  }, [id]);

  const handleGuardarCambios = async () => {
    const exito = await editarTipoPlato(id, { nombre, descripcion });
    if (exito) {
      navigate("/tipo_plato"); // Cambia esto a la URL correcta de la lista
    } else {
      // Maneja el fallo de edición (por ejemplo, muestra un mensaje de error)
      console.error("Error al editar Tipo de Plato con ID: ", id);
    }
  };

  return (
    <div className="container">
      <h1>Editar Tipo de Plato</h1>
      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button onClick={handleGuardarCambios}>Guardar Cambios</button>
    </div>
  );
};
