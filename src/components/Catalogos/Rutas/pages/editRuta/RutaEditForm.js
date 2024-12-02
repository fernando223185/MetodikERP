import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';

const RutaEditForm = ({formik, estatus, sucursales, destinos}) => {
    const { values, errors, touched, handleChange, hanldeSubmit, getFieldProps, setValues } = formik;
    const [ selectedEstatus, setSelectedEstatus ] = useState([]);
    const [ selectedSucursal, setSelectedSucursal ] = useState([]);
    const [ selectedOrigen, setSelectedOrigen ] = useState([]);
    const [ selectedDestino, setSelectedDestino ] = useState([]);

    useEffect(() => {
        if(estatus.length > 0) {
            const currentEstatus = estatus.find(item => item.Valor === values.EstatusID.toString());
            setSelectedEstatus(currentEstatus ? { value: currentEstatus.Valor, label: currentEstatus.Dato } : null);
        };
        if(sucursales.length > 0) {
            const currentSucursal = sucursales.find(item => item.Valor === values.SucursalID.toString());
            setSelectedSucursal(currentSucursal ? { value: currentSucursal.Valor, label: currentSucursal.Dato } : null);
        };
        if (destinos.length > 0 && values.DestinoDID && values.DestinoAID) {
            const currentOrigen = destinos.find(item => item.Valor === values.DestinoDID.toString());
            setSelectedOrigen(currentOrigen ? { value: currentOrigen.Valor, label: currentOrigen.Dato } : null);
            const currentDestino = destinos.find(item => item.Valor === values.DestinoAID.toString());
            setSelectedDestino(currentDestino ? { value: currentDestino.Valor, label: currentDestino.Dato } : null);
        };
    }, [estatus, sucursales, destinos, values]);

    const handleEstatusChange = (option) => {
        setSelectedEstatus(option);
        setValues({...values, EstatusID: option ? option.value : null });
    };
    const handleSucursalChange = (option) => {
        setSelectedSucursal(option);
        setValues({...values, SucursalID: option ? option.value : null });
    };
    const handleOrigenChange = (option) => {
        setSelectedOrigen(option);
        setValues({...values, DestinoDID: option ? option.value : null });
    };
    const handleDestinoChange = (option) => {
        setSelectedDestino(option);
        setValues({...values, DestinoAID: option ? option.value : null });
    };

    const handleSave = () => {
        setValues({
            ID: values.ID,
            Ruta: values.Ruta,
            Zona: values.Zona,
            Kms: values.Kms,
            Costo: values.Costo,
            SucursalID: selectedSucursal ? selectedSucursal.value : null,
            DestinoDID: selectedOrigen ? selectedOrigen.value : null,
            DestinoAID: selectedDestino ? selectedDestino.value : null,
            Observaciones: values.Observaciones,
            EstatusID: selectedEstatus ? selectedEstatus.value : null,
            Tiempo: values.Tiempo,
        });
        formik.submitForm();
    };


    return (
        <Card className='mb-3'>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                        <Form.Label>Estatus</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={estatus.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona un estatus"
                            onChange={handleEstatusChange}
                            value={selectedEstatus}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.EstatusID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="text"
                            name="Ruta"
                            placeholder='Ingrese un nombre'
                            value={values.Ruta}
                            {...getFieldProps("Ruta")}
                            isInvalid={!!errors.profile?.Ruta && touched.Ruta}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Ruta}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group >
                        <Form.Label>Zona</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="text"
                            name="Zona"
                            placeholder='Ingrese una zona'
                            value={values.Zona}
                            {...getFieldProps("Zona")}
                            isInvalid={!!errors.profile?.Zona && touched.Zona}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Zona}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                        <Form.Label>Kilometros</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="number"
                            name="Kms"
                            placeholder='Ingrese los kilometros'
                            value={values.Kms}
                            {...getFieldProps("Kms")}
                            isInvalid={!!errors.profile?.Kms && touched.Kms}
                            step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Kms}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group >
                        <Form.Label>Costo</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="number"
                            name="Costo"
                            placeholder='Ingrese el costo'
                            value={values.Costo}
                            {...getFieldProps("Costo")}
                            isInvalid={!!errors.profile?.Costo && touched.Costo}
                            step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Costo}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                        <Form.Label>Sucursal</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={sucursales.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona una sucursal"
                            onChange={handleSucursalChange}
                            value={selectedSucursal}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.SucursalID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                        <Form.Label>Origen</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={destinos.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona un origen"
                            onChange={handleOrigenChange}
                            value={selectedOrigen}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.DestinoDID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                        <Form.Label>Destino</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            options={destinos.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                            }))}
                            placeholder="Selecciona un destino"
                            onChange={handleDestinoChange}
                            value={selectedDestino}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.DestinoAID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group >
                        <Form.Label>Tiempo</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="number"
                            name="Tiempo"
                            placeholder='Ingrese el tiempo'
                            value={values.Tiempo}
                            {...getFieldProps("Tiempo")}
                            isInvalid={!!errors.profile?.Tiempo && touched.Tiempo}
                            step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.Tiempo}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group >
                        <Form.Label>Observaciones</Form.Label>
                        <InputGroup>
                            <Form.Control
                            as="textarea"
                            name="Observaciones"
                            placeholder='Observaciones'
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
                    </Col>
                </Row>
                <hr style={{ margin: '10px 0' }} className="mt-4" />
                <div className="d-flex justify-content-end mt-2">
                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        icon={faSave}
                        className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                        onClick={handleSave}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RutaEditForm;