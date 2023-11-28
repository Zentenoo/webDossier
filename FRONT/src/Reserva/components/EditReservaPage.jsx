import { useEffect, useState } from "react";
import axios from 'axios';
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";

export const EditReservaPage = ({ reserva }) => {
    const [formData, setFormData] = useState({
        boolEstado: true,
    });

    const getPlatoData = async () => {
        try {
            const data = await reserva;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error al obtener los datos de la reserva:", error);
        }
    };
    useEffect(() => {
        getPlatoData().then((data) => {
            setFormData({
                boolEstado: data.estado,
            });
        });
    }, [reserva]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar datos al servidor
            await axios.put(`http://localhost:3000/reserva/${reserva.id}`, {
                estado: formData.boolEstado,
            });
            window.location.href = "/reserva";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    const handleCancelar = () => {
        window.location.href = "/reserva";
    }

    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor='boolEstado' className="form-label">Estado: </label>
                                <select
                                    id='boolEstado'
                                    name='boolEstado'
                                    value={formData.boolEstado}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value={true}>Confirmar</option>
                                    <option value={false}>Cancelar</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Editar</button>
                                <button onClick={handleCancelar} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
