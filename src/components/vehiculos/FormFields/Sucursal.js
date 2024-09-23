import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const SucursalSelect = ({ value, onChange, tipo, modulo }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [ sucursales, setSucursales] = useState([]);

    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const personaID = parsedData.ID;


    useEffect(() => {
        const fetchSucursales = async () => {
            const data = {
                Tipo: tipo,
                PersonaID: personaID, 
                Modulo: modulo,
                ModuloID: ''
            };

            const result = await getFiltroCatalogo(data);
            setSucursales(result);
        };

        fetchSucursales();
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
                <option value=''>Seleccione una Sucursal</option>
                {sucursales.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SucursalSelect;
