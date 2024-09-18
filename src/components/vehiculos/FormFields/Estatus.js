import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const EstatusSelect = ({ value, onChange }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            const data = {
                Tipo: 'Estatus',
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
        <Form.Group controlId="EstatusID">
            <Form.Label>Estatus</Form.Label>
            <Form.Control
                as="select"
                name="EstatusID"
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Seleccione un Estatus</option>
                {vehicleTypes.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default EstatusSelect;

