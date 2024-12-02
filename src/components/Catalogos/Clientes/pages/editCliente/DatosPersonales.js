import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const DatosPersonales = ({formik}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;

    return (
        <Card>
            <FalconCardHeader title='Datos Personales' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="RFC">
                    <Form.Label>RFC</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="RFC"
                        name="RFC"
                        value={values.RFC}
                        {...getFieldProps('RFC')}
                        isInvalid={!!errors.profile?.RFC && touched.RFC}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.RFC}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="CURP">
                    <Form.Label>CURP</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="CURP"
                        name="CURP"
                        value={values.CURP}
                        {...getFieldProps('CURP')}
                        isInvalid={!!errors.profile?.CURP && touched.CURP}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CURP}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Telefonos">
                    <Form.Label>Telefonos</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Telefonos"
                        name="Telefonos"
                        value={values.Telefonos}
                        {...getFieldProps('Telefonos')}
                        isInvalid={!!errors.profile?.Telefonos && touched.Telefonos}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Telefonos}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="FechaNacimiento">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="FechaNacimiento"
                        name="FechaNacimiento"
                        value={values.FechaNacimiento}
                        {...getFieldProps('FechaNacimiento')}
                        isInvalid={!!errors.profile?.FechaNacimiento && touched.FechaNacimiento}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.FechaNacimiento}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Sexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Sexo"
                        name="Sexo"
                        value={values.Sexo}
                        {...getFieldProps('Sexo')}
                        isInvalid={!!errors.profile?.Sexo && touched.Sexo}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Sexo}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="Email"
                        value={values.Email}
                        {...getFieldProps('Email')}
                        isInvalid={!!errors.profile?.Email && touched.Email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Email}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default DatosPersonales;