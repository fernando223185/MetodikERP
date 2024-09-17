import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const RutaSelect = ({ value, onChange }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            const data = {
                Tipo: 'Rutas',
                PersonaID: localStorage.getItem("ID"), // Ajusta este valor según sea necesario
                Modulo: 'Vehiculos',
                ModuloID: ''
            };

            const result = await getFiltroCatalogo(data);
            setVehicleTypes(result);
        };

        fetchVehicleTypes();
    }, [getFiltroCatalogo]);



    return (
        <Form.Group controlId="RutaID">
            <Form.Label>Ruta</Form.Label>
            <Form.Control
                as="select"
                name="RutaID"
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Seleccione una ruta</option>
                {vehicleTypes.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default RutaSelect;

