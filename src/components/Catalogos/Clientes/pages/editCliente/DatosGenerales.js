import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const DatosGenerales = ({formik, estatus}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [selectedEstatus, setSelectedEstatus] = useState(null);

    useEffect(() => {
        if (estatus.length > 0) {
            const currentEstatus = estatus.find(item => item.Valor === values.EstatusID.toString());
            setSelectedEstatus(currentEstatus ? { value: currentEstatus.Valor, label: currentEstatus.Dato } : null);
        }
    }, [estatus, values]);


    const handleEstatusChange = (selectedOption) => {
        setSelectedEstatus(selectedOption);
        setValues({ ...values, EstatusID: selectedOption ? selectedOption.value : null });
    };

    return (
        <Card>
            <FalconCardHeader title='Datos Generales' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="Cliente">
                    <Form.Label>Cliente<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cliente"
                        name="Cliente"
                        value={values.Cliente}
                        {...getFieldProps('Cliente')}
                        isInvalid={!!errors.profile?.Cliente && touched.Cliente}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Cliente}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="EstatusID">
                    <Form.Label className="mb-1 mt-2 fs--1">Estatus<span style={{ color: "red" }}>*</span></Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name="EstatusID"
                        options={estatus.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedEstatus}
                        onChange={handleEstatusChange}
                        placeholder="Selecciona"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.EstatusID}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Nombre">
                    <Form.Label>Nombre<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="Nombre"
                        value={values.Nombre}
                        {...getFieldProps('Nombre')}
                        isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Nombre}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="NombreCorto">
                    <Form.Label>Nombre Corto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre corto"
                        name="NombreCorto"
                        value={values.NombreCorto}
                        {...getFieldProps('NombreCorto')}
                        isInvalid={!!errors.profile?.NombreCorto && touched.NombreCorto}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.NombreCorto}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group >
                    <Form.Label>Observaciones</Form.Label>
                    <InputGroup>
                        <Form.Control
                        as="textarea"
                        name="Observaciones"
                        placeholder='Ingrese una observacion'
                        value={values.Observaciones}
                        onChange={handleChange}
                        isInvalid={!!errors.Observaciones}
                        rows={4}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.Observaciones}
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default DatosGenerales;