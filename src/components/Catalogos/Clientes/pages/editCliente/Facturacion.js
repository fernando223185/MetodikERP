import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Facturacion = ({formik}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;

    return (
        <Card>
            <FalconCardHeader title='Facturacion' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="usoCFDI">
                    <Form.Label>Uso CFDI</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Uso CFDI"
                        name="usoCFDI"
                        value={values.usoCFDI}
                        {...getFieldProps('usoCFDI')}
                        isInvalid={!!errors.profile?.usoCFDI && touched.usoCFDI}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.usoCFDI}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="FormaPago">
                    <Form.Label>Forma de Pago</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Forma de Pago"
                        name="FormaPago"
                        value={values.FormaPago}
                        {...getFieldProps('FormaPago')}
                        isInvalid={!!errors.profile?.FormaPago && touched.FormaPago}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.FormaPago}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="MetodoPago">
                    <Form.Label>Metodo de Pago</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Metodo de Pago"
                        name="MetodoPago"
                        value={values.MetodoPago}
                        {...getFieldProps('MetodoPago')}
                        isInvalid={!!errors.profile?.MetodoPago && touched.MetodoPago}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.MetodoPago}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="RegimenFiscal">
                    <Form.Label>Regimen Fiscal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Regimen Fiscal"
                        name="RegimenFiscal"
                        value={values.RegimenFiscal}
                        {...getFieldProps('RegimenFiscal')}
                        isInvalid={!!errors.profile?.RegimenFiscal && touched.RegimenFiscal}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.RegimenFiscal}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Facturacion;