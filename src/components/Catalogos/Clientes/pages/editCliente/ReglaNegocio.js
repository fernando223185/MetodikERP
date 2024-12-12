import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const ReglaNegocio = ({formik, condicion, bloquearM, sucursal}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [ selectedCondicion, setSelectedCondicion ] = useState([]);
    const [ selectedBloquearM, setSelectedBloquearM ] = useState([]);
    const [ selectedSucursal, setSelectedSucursal ] = useState([]);

    useEffect(() => {
        if (condicion.length > 0) {
            const currentCondicion = condicion.find(item => item.Valor === values.CreditoCondiciones.toString());
            setSelectedCondicion(currentCondicion ? { value: currentCondicion.Valor, label: currentCondicion.Dato } : null);
        }
        if (bloquearM.length > 0) {
            const currentBloquearM = bloquearM.find(item => item.Valor === values.BloquearMorosos.toString());
            setSelectedBloquearM(currentBloquearM ? { value: currentBloquearM.Valor, label: currentBloquearM.Dato } : null );
        }
        if (sucursal.length > 0) {
            const currentSucursal = sucursal.find(item => item.Valor === values.SucursalEmpresa.toString());
            setSelectedSucursal(currentSucursal ? { value: currentSucursal.Valor , label: currentSucursal.Dato } : null );
        }
    }, [condicion, bloquearM, sucursal, values]);

    const handleCondicionChange = (selectedOption) => {
        setSelectedCondicion(selectedOption);
        setValues({ ...values, CreditoCondiciones: selectedOption ? selectedOption.value : null });
    }
    const handleBloquearMChange = (selectedOption) => {
        setSelectedBloquearM(selectedOption);
        setValues({ ...values, BloquearMorosos: selectedOption ? selectedOption.value : null });
    }
    const handleSucursalChange = (selectedOption) => {
        setSelectedSucursal(selectedOption);
        setValues({ ...values, SucursalEmpresa: selectedOption ? selectedOption.value : null });
    }


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
                    <Select
                        classNamePrefix='react-select'
                        name='CreditoCondiciones'
                        options={condicion.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedCondicion}
                        onChange={handleCondicionChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.CreditoCondiciones}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="BloquearMorosos">
                    <Form.Label>Bloquear Morosos</Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='BloquearMorosos'
                        options={bloquearM.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedBloquearM}
                        onChange={handleBloquearMChange}
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
                    <Select
                        classNamePrefix='react-select'
                        name='SucursalEmpresa'
                        options={sucursal.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedSucursal}
                        onChange={handleSucursalChange}
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