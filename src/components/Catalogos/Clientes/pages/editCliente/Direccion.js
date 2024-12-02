import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Direccion = ({formik}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;

    return (
        <Card>
            <FalconCardHeader title='Direccion' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="CodigoPostal">
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Codigo postal"
                        name="CodigoPostal"
                        value={values.CodigoPostal}
                        {...getFieldProps('CodigoPostal')}
                        isInvalid={!!errors.profile?.CodigoPostal && touched.CodigoPostal}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CodigoPostal}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="Direccion">
                    <Form.Label>Direccion</Form.Label>
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
                    <Form.Label>Numero</Form.Label>
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
                    <Form.Label>Delegacion</Form.Label>
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
                    <Form.Label>Colonia</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Colonia"
                        name="Colonia"
                        value={values.Colonia}
                        {...getFieldProps('Colonia')}
                        isInvalid={!!errors.profile?.Colonia && touched.Colonia}
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
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Estado"
                        name="Estado"
                        value={values.Estado}
                        {...getFieldProps('Estado')}
                        isInvalid={!!errors.profile?.Estado && touched.Estado}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Estado}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Pais">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Pais"
                        name="Pais"
                        value={values.Pais}
                        {...getFieldProps('Pais')}
                        isInvalid={!!errors.profile?.Pais && touched.Pais}
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