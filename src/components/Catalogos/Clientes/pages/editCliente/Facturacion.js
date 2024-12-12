import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';

const Facturacion = ({formik, cfdi, metodoPago, regimen, formaPago}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [ selectedRegimen, setSelectedRegimen ] = useState([]);
    const [ selectedFormaPago, setSelectedFormaPago ] = useState([]);
    const [ selectedCfdi, setSelectedCfdi ] = useState([]);
    const [ selectedMetodoPago, setSelectedMetodoPago ] = useState([]);

    useEffect(() => {
        if (regimen.length > 0) {
            const currentRegimen = regimen.find(item => item.Valor === values.RegimenFiscal.toString());
            setSelectedRegimen(currentRegimen ? { value: currentRegimen.Valor, label: currentRegimen.Dato } : null);
        }
        if (formaPago.length > 0) {
            const currentFormaPago = formaPago.find(item => item.Valor === values.FormaPago.toString());
            setSelectedFormaPago(currentFormaPago ? { value: currentFormaPago.Valor, label: currentFormaPago.Dato } : null);
        }
        if (cfdi.length > 0) {
            const currentCfdi = cfdi.find(item => item.Valor === values.usoCFDI.toString());
            setSelectedCfdi(currentCfdi ? { value: currentCfdi.Valor, label: currentCfdi.Dato } : null);
        }
        if (metodoPago > 0) {
            const currentMetodoPago = metodoPago.find(item => item.Valor === values.MetodoPago.toString());
            setSelectedMetodoPago(currentMetodoPago ? { value: currentMetodoPago.Value, label: currentMetodoPago.Dato } : null);
        }
    }, [regimen, formaPago, cfdi, metodoPago, values]);

    const handleRegimenChange = (selectedOption) => {
        setSelectedRegimen(selectedOption);
        setValues({ ...values, RegimenFiscal: selectedOption ? selectedOption.value : null });
    }
    const handleFormaPagoChange = (selectedOption) => {
        setSelectedFormaPago(selectedOption);
        setValues({ ...values, usoCFDI: selectedOption ? selectedOption.value : null});
    }
    const handleCfdiChange = (selectedOption) => {
        setSelectedCfdi(selectedOption);
        setValues({ ...values, usoCFDI: selectedOption ? selectedOption.value : null });
    }
    const handleMetodoPago = (selectedOption) => {
        setSelectedMetodoPago(selectedOption);
        setValues({ ...values, MetodoPago: selectedOption ? selectedOption.value : null});
    }

    return (
        <Card>
            <FalconCardHeader title='Facturacion' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="usoCFDI">
                    <Form.Label>Uso CFDI</Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='usoCFDI'
                        options={cfdi.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedCfdi}
                        onChange={handleCfdiChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.usoCFDI}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="FormaPago">
                    <Form.Label>Forma de Pago</Form.Label>
                    <Select 
                        classNamePrefix='react-select'
                        name='FormaPago'
                        options={formaPago.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedFormaPago}
                        onChange={handleFormaPagoChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.FormaPago}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} lg={6} controlId="MetodoPago">
                    <Form.Label>Metodo de Pago</Form.Label>
                    <Select
                        classNamePrefix='react-select'
                        name='MetodoPago'
                        options={metodoPago.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedMetodoPago}
                        onChange={handleMetodoPago}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.MetodoPago}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="RegimenFiscal">
                    <Form.Label>Regimen Fiscal</Form.Label>
                    <Select 
                        classNamePrefix='react-select'
                        name="RegimenFiscal"
                        options={regimen.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedRegimen}
                        onChange={handleRegimenChange}
                        placeholder="Seleccione..."
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