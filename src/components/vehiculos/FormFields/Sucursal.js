import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const SucursalSelect = ({ value, onChange, tipo, modulo }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [sucursal, setSucursal] = useState([]);

    useEffect(() => {
        const fetchEstatus = async () => {
            const data = {
                Tipo: tipo,
                PersonaID: localStorage.getItem("ID"), // Ajusta este valor según sea necesario
                Modulo: modulo,
                ModuloID: ''
            };

            const result = await getFiltroCatalogo(data);
            setSucursal(result);
        };

        fetchEstatus();
    }, [getFiltroCatalogo]);



    return (
        <Form.Group controlId="SucursalID">
            <Form.Label>Sucursal</Form.Label>
            <Form.Control
                as="select"
                className="form-select"
                name="SucursalID"
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Seleccione una sucursal</option>
                {sucursal.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SucursalSelect;

