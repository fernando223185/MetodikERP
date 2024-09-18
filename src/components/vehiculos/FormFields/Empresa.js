import React, { useEffect, useState } from 'react';
import { useGetFiltroCatalogo } from '../../../hooks/useFiltros'; // Ajusta la ruta
import { Form } from 'react-bootstrap';


const EmpresaSelect = ({ value, onChange, tipo, modulo }) => {
    const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();
    const [ empresas, setEmpresas] = useState([]);

    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const personaID = parsedData.ID;


    useEffect(() => {
        const fetchEmpresas = async () => {
            const data = {
                Tipo: tipo,
                PersonaID: personaID, 
                Modulo: modulo,
                ModuloID: ''
            };

            const result = await getFiltroCatalogo(data);
            setEmpresas(result);
        };

        fetchEmpresas();
    }, [getFiltroCatalogo]);



    return (
        <Form.Group controlId="EmpresaID">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
                as="select"
                className="form-select"
                name="EmpresaID"
                value={value}
                onChange={onChange}
                required
            >
                <option value=''>Seleccione una Empresa</option>
                {empresas.map(option => (
                    <option key={option.Valor} value={option.Valor}>
                        {option.Dato}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default EmpresaSelect;
