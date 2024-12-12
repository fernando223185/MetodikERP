import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const ReglaNegocio = ({formik}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;

    return (
        <Card>
            <FalconCardHeader title='Regla de Negocio' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="CreditoLimite">
                    <Form.Label>Limite de Credito</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.04"
                        placeholder="Limite de Credito"
                        name="CreditoLimite"
                        value={values.CreditoLimite}
                        {...getFieldProps('CreditoLimite')}
                        isInvalid={!!errors.profile?.CreditoLimite && touched.CreditoLimite}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CreditoLimite}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="CreditoCondiciones">
                    <Form.Label>Condiciones</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Condiciones"
                        name="CreditoCondiciones"
                        value={values.CreditoCondiciones}
                        {...getFieldProps('CreditoCondiciones')}
                        isInvalid={!!errors.profile?.CreditoCondiciones && touched.CreditoCondiciones}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CreditoCondiciones}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="BloquearMorosos">
                    <Form.Label>Bloquear Morosos</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Bloquear Morosos"
                        name="BloquearMorosos"
                        value={values.BloquearMorosos}
                        {...getFieldProps('BloquearMorosos')}
                        isInvalid={!!errors.profile?.BloquearMorosos && touched.BloquearMorosos}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.BloquearMorosos}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Descuento">
                    <Form.Label>Descuento</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Descuento"
                        name="Descuento"
                        value={values.Descuento}
                        {...getFieldProps('Descuento')}
                        isInvalid={!!errors.profile?.Descuento && touched.Descuento}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Descuento}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="SucursalEmpresa">
                    <Form.Label>Sucursal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Sucursal"
                        name="SucursalEmpresa"
                        value={values.SucursalEmpresa}
                        {...getFieldProps('SucursalEmpresa')}
                        isInvalid={!!errors.profile?.SucursalEmpresa && touched.SucursalEmpresa}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.SucursalEmpresa}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <div className='d-flex justify-content-end'>
                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        icon={faSave}
                        className="me-1 mb-2 mb-sm-0"
                        type="submit"
                    >
                        Guardar
                    </IconButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ReglaNegocio;