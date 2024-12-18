import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const ProfileSettings = ({formik, sucursal, estatus, empresa, vehiculo}) => {
    const { values, errors, touched, handleChange, handleSubmit, getFieldProps, setValues } = formik;
    const [selectedEstatus, setSelectedEstatus] = useState(null);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);

    useEffect(() => {
        if (estatus.length > 0) {
            const currentEstatus = estatus.find(item => item.Valor === values.EstatusID.toString());
            setSelectedEstatus(currentEstatus ? { value: currentEstatus.Valor, label: currentEstatus.Dato } : null);
        }

        if (empresa.length > 0) {
            const currentEmpresa = empresa.find(item => item.Valor === values.EmpresaID.toString());
            setSelectedEmpresa(currentEmpresa ? { value: currentEmpresa.Valor, label: currentEmpresa.Dato } : null);
        }

        if (sucursal.length > 0) {
            const currentSucursal = sucursal.find(item => item.Valor === values.SucursalID.toString());
            setSelectedSucursal(currentSucursal ? { value: currentSucursal.Valor, label: currentSucursal.Dato } : null);
        }

        if (vehiculo.length > 0) {
            const currentVehiculo = vehiculo.find(item => item.Valor === values.VehiculoID.toString());
            setSelectedVehiculo(currentVehiculo ? { value: currentVehiculo.Valor, label: currentVehiculo.Dato } : null);
        }
    }, [estatus, empresa, sucursal, vehiculo, values]);


    const handleEstatusChange = (selectedOption) => {
        setSelectedEstatus(selectedOption);
        setValues({ ...values, EstatusID: selectedOption ? selectedOption.value : null });
    };

    const handleEmpresaChange = (selectedOption) => {
        setSelectedEmpresa(selectedOption);
        setValues({ ...values, EmpresaID: selectedOption ? selectedOption.value : null });
    };

    const handleSucursalChange = (selectedOption) => {
        setSelectedSucursal(selectedOption);
        setValues({ ...values, SucursalID: selectedOption ? selectedOption.value : null });
    };

    const handleVehiculoChange = (selectedOption) => {
        setSelectedVehiculo(selectedOption);
        setValues({ ...values, VehiculoID: selectedOption ? selectedOption.value : null });
    };

    const handleSave = () => {
        setValues({
            ID: values.ID,
            Nombre: values.Nombre,
            Observaciones: values.Observaciones,
            EmpresaID: selectedEmpresa ? selectedEmpresa.value : null,
            EstatusID: selectedEstatus ? selectedEstatus.value : null,
            SucursalID: selectedSucursal ? selectedSucursal.value : null,
            VehiculoID: selectedVehiculo ? selectedVehiculo.value : null,
        });
        
        formik.submitForm();
    };

    return (
        <Card>
            <FalconCardHeader title='Informacion general' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="Nombre">
                    <Form.Label>Nombre</Form.Label>
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
                    <Form.Group as={Col} lg={6} controlId="EstatusID">
                    <Form.Label className="mb-1 mt-2 fs--1">Estatus</Form.Label>
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
                <Row className='mb-3 g-3'>
                    <Form.Group as={Col} lg={6} controlId="VehiculoID">
                    <Form.Label className="mb-1 mt-2 fs--1">Vehiculo</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name='VehiculoID'
                        options={vehiculo.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedVehiculo}
                        onChange={handleVehiculoChange}
                        placeholder="Selecciona"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.VehiculoID}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="EmpresaID">
                    <Form.Label className="mb-1 mt-2 fs--1">Empresa</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name='EmpresaID'
                        options={empresa.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedEmpresa}
                        onChange={handleEmpresaChange}
                        placeholder="Selecciona"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.EmpresaID}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-3'>
                    <Form.Group as={Col} lg={6} controlId="SucursalID">
                    <Form.Label className="mb-1 mt-2 fs--1">Sucursal</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name='SucursalID'
                        options={sucursal.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedSucursal}
                        onChange={handleSucursalChange}
                        placeholder="Selecciona"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.SucursalID}
                    </Form.Control.Feedback>
                    </Form.Group>
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
                <div className='d-flex justify-content-end'>
                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        icon={faSave}
                        className="me-1 mb-2 mb-sm-0"
                        onClick={handleSave}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Card.Body>
        </Card>

    );
};

export default ProfileSettings;