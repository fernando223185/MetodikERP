import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useGetPaisEstado } from 'hooks/Catalogos/Clientes/useClientes';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';

const Direccion = ({formik, pais, estados}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [ selectedPais, setSelectedPais ] = useState([]);
    const [ selectedEstado, setSelectedEstado ] = useState([]);
    const [ colonia, setColonia ] = useState([]);
    const [ selectedColonia, setSelectedColonia ] = useState([]);
    const { getFiltroCatalogo, isLoading: isLoadingFiltro } = useGetFiltroCatalogo();
    const { getPaisEstado, result, isLoading, error } = useGetPaisEstado();

    const fetchColonias = async (CodigoPostal) => {
        const data = { Tipo: 'Colonias', PersonaID: 1, Modulo: 'Choferes', ModuloID: CodigoPostal };
        const result = await getFiltroCatalogo(data);
        setColonia(result);
    }

    useEffect(() => {
        if (pais.length > 0 && values.Pais) {
            const currentPais = pais.find(item => item.Valor === (values.Pais?.toString() || ''));
            setSelectedPais(currentPais ? { value: currentPais.Valor, label: currentPais.Dato } : null);
        }
        if (estados.length > 0 && values.Estado) {
            const currentEstado = estados.find(item => item.Valor === (values.Estado?.toString() || ''));
            setSelectedEstado(currentEstado ? { value: currentEstado.Valor, label: currentEstado.Dato } : null);
        }
        if (values.Colonia && values.ColoniaText) {
            setSelectedColonia({ value: values.Colonia, label: values.ColoniaText });
        }
    }, [pais, estados, values]);

    useEffect(() => {
        if (result) {
            const { Estado, Pais } = result;
            const codigoPostalInt = parseInt(values.CodigoPostal, 10);

            const currentPais = pais.find(item => item.Valor === (Pais?.toString() || ''));
            setSelectedPais(currentPais ? { value: currentPais.Valor, label: currentPais.Dato } : null);
    
            const currentEstado = estados.find(item => item.Valor === (Estado?.toString() || ''));
            setSelectedEstado(currentEstado ? { value: currentEstado.Valor, label: currentEstado.Dato } : null);

            setValues({
                ...values,
                Pais: Pais || null,
                Estado: Estado || null
            });

            fetchColonias(codigoPostalInt);
        }
    }, [result]);

    const handlePaisChange = (selectedOption)  => {
        setSelectedPais(selectedOption);
        setValues({ ...values, Pais: selectedOption ? selectedOption.value : null });
    }
    const handleEstadoChange = (selectedOption) => {
        setSelectedEstado(selectedOption);
        setValues({ ...values, Estado: selectedOption ? selectedOption.value : null });
    }
    const handleColoniaChange = (selectedOption) => {
        setSelectedColonia(selectedOption);
        setValues({ ...values, Colonia: selectedOption ? selectedOption.value : null });
    }

    const handleCodigoPostalEnter = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!values.CodigoPostal) return;
    
            try {
                await getPaisEstado(values.CodigoPostal.toString());
            } catch (err) {
                console.error('Error al obtener datos del Código Postal:', err);
                alert('No se encontraron datos para el Código Postal ingresado.');
            }
        }
    };

    return (
        <Card>
            <FalconCardHeader title='Direccion' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="CodigoPostal">
                    <Form.Label>Codigo Postal<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Codigo postal"
                        name="CodigoPostal"
                        value={values.CodigoPostal}
                        {...getFieldProps('CodigoPostal')}
                        isInvalid={!!errors.profile?.CodigoPostal && touched.CodigoPostal}
                        onKeyDown={(e) => handleCodigoPostalEnter(e)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CodigoPostal}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Direccion">
                    <Form.Label>Direccion<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Direccion"
                        name="Direccion"
                        value={values.Direccion}
                        {...getFieldProps('Direccion')}
                        isInvalid={!!errors.profile?.Direccion && touched.Direccion}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Direccion}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="DireccionNumero">
                    <Form.Label>Numero<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Numero"
                        name="DireccionNumero"
                        value={values.DireccionNumero}
                        {...getFieldProps('DireccionNumero')}
                        isInvalid={!!errors.profile?.DireccionNumero && touched.DireccionNumero}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.DireccionNumero}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="DireccionNumeroInt">
                    <Form.Label>Numero Interior</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Numero interior"
                        name="DireccionNumeroInt"
                        value={values.DireccionNumeroInt}
                        {...getFieldProps('DireccionNumeroInt')}
                        isInvalid={!!errors.profile?.DireccionNumeroInt && touched.DireccionNumeroInt}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.DireccionNumeroInt}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Delegacion">
                    <Form.Label>Delegacion<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Delegacion"
                        name="Delegacion"
                        value={values.Delegacion}
                        {...getFieldProps('Delegacion')}
                        isInvalid={!!errors.profile?.Delegacion && touched.Delegacion}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Delegacion}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Colonia">
                    <Form.Label>Colonia<span style={{ color: "red" }}>*</span></Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='Colonia'
                        options={colonia.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedColonia}
                        onChange={handleColoniaChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Colonia}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Poblacion">
                    <Form.Label>Poblacion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Poblacion"
                        name="Poblacion"
                        value={values.Poblacion}
                        {...getFieldProps('Poblacion')}
                        isInvalid={!!errors.profile?.Poblacion && touched.Poblacion}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Poblacion}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Estado">
                    <Form.Label>Estado<span style={{ color: "red" }}>*</span></Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='Estado'
                        options={estados.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedEstado}
                        onChange={handleEstadoChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Estado}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Pais">
                    <Form.Label>Pais<span style={{ color: "red" }}>*</span></Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='Pais'
                        options={pais.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedPais}
                        onChange={handlePaisChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Pais}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default Direccion;