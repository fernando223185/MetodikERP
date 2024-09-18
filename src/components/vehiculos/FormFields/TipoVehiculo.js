import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const TipoVehiculoSelect = ({ value, onChange }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [vehicleTypes, setVehicleTypes] = useState([]);

    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const personaID = parsedData.ID;


    useEffect(() => {
        const fetchVehicleTypes = async () => {
            const data = {
                Tipo: 'TipoVehiculo',
                PersonaID: personaID,
                Modulo: 'Vehiculos',
                ModuloID: ''
            };

            const result = await getFiltroCatalogo(data);
            setVehicleTypes(result);
        };

        fetchVehicleTypes();
    }, [getFiltroCatalogo]);



    return (
        <Form.Group controlId="TipoVehiculo">
            <Form.Label>Tipo Vehiculo</Form.Label>
            <Form.Control
                as="select"
                name="TipoVehiculo"
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Seleccione el tipo de vehículo</option>
                {vehicleTypes.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default TipoVehiculoSelect;

