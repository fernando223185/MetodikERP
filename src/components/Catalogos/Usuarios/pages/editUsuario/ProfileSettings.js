import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Select from 'react-select';
import IconButton from 'components/common/IconButton';
import { faSave, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useParams} from 'react-router-dom';

const ProfileSettings = ({formik, sucursal, estatus, empresa, perfil}) => {

    console.log(empresa);
    console.log(formik.values);
    const { id } = useParams();
    const { values, errors, touched, getFieldProps, setValues } = formik;
    const [selectedEstatus, setSelectedEstatus] = useState(null);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [selectedPerfil, setSelectedPerfil] = useState(null);
    const [selectedEmpresas, setSelectedEmpresas] = useState([]);
    const [showPassword, setShowPassword] = useState(false); 
    const [showMultiEmpresa, setShowMultiEmpresa] = useState(values?.MultiEmpresa == 1 ? true : false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    useEffect(() => {
        // Configurar valores iniciales en los dropdowns usando los valores actuales del usuario
        if (estatus.length > 0) {
            const currentEstatus = estatus.find(item => item.Valor === values.EstatusID?.toString());
            setSelectedEstatus(currentEstatus ? { value: currentEstatus.Valor, label: currentEstatus.Dato } : null);
        }

        if (empresa.length > 0) {
            const currentEmpresa = empresa.find(item => item.Valor === values.EmpresaID?.toString());
            setSelectedEmpresa(currentEmpresa ? { value: currentEmpresa.Valor, label: currentEmpresa.Dato } : null);
        }

        if (sucursal.length > 0) {
            const currentSucursal = sucursal.find(item => item.Valor === values.SucursalID?.toString());
            setSelectedSucursal(currentSucursal ? { value: currentSucursal.Valor, label: currentSucursal.Dato } : null);
        }

        if (perfil.length > 0) {
            const currentPerfil = perfil.find(item => item.Valor === values.PerfilID);
            setSelectedPerfil(currentPerfil ? { value: currentPerfil.Valor, label: currentPerfil.Dato } : null);
        }


    }, [estatus, empresa, sucursal,perfil, values]);


    useEffect(() => {
        if (values.MultiEmpresa == 1 && empresa.length > 0) {
          const currentEmpresas =
            values.EmpresasIDs?.split(',').map((id) => {
              const matchedEmpresa = empresa.find((e) => e.Valor === id);
              return matchedEmpresa
                ? { value: matchedEmpresa.Valor, label: matchedEmpresa.Dato }
                : null;
            }).filter(Boolean) || []; // Filter out null values
          setSelectedEmpresas(currentEmpresas);
        } else {
          setSelectedEmpresas([]);
        }
      }, [empresa, values.EmpresasIDs, values.MultiEmpresa]);
      
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

    const handlePerfilChange = (selectedOption) => {
        setSelectedPerfil(selectedOption);
        setValues({ ...values, PerfilID: selectedOption ? selectedOption.value : null });
    };

    const handleEmpresasChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedEmpresas(selectedOption || []); // Ensure it is an array
        setValues({
          ...values,
          EmpresasID: selectedOption
            ? selectedOption.map((item) => item.value).join(',')
            : null,
        });
      };

    const handleSave = () => {
        setValues({...values,
            PersonaID: id,
            Usuario: values.Usuario,
            Correo: values.Correo,
            Contra: values.Contra,
            Contra2: values.Contra2,
            Nombre: values.Nombre,
            ApellidoMaterno: values.ApellidoMaterno,
            ApellidoPaterno: values.ApellidoPaterno,
            Notas: values.Notas,
            EmpresaID: selectedEmpresa ? selectedEmpresa.value : null,
            EstatusID: selectedEstatus ? selectedEstatus.value : null,
            SucursalID: selectedSucursal ? selectedSucursal.value : null,
            PerfilID: selectedPerfil ? selectedPerfil.value : null,
            EmpresasIDs: selectedEmpresas ? selectedEmpresas.map(item => item.value).join(',') : null
        });

        console.log(values);
    };

    return (
        <Card>
            <FalconCardHeader title='Informacion general' />
            <Card.Body>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="Usuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Usuario"
                        name="Usuario"
                        value={values.Nombre}
                        {...getFieldProps('Usuario')}
                        isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Nombre}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Correo"
                        name="Correo"
                        value={values.Correo}
                        {...getFieldProps('Correo')}
                        isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Correo}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="Contra" style={{ position: 'relative' , cursor:'pointer'}}>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            {...getFieldProps('Contra')}
                            isInvalid={!!errors.Contra && touched.Contra}
                            style={{
                                paddingRight: '40px', // Ensure space for the icon 
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Contra}
                        </Form.Control.Feedback>
                        {/* Icon */}
                        <FontAwesomeIcon
                            icon={'eye'}
                            style={{
                                position: 'absolute',
                                grid: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                right: '20px', // Position at the end of the input
                                top: '72%', // Center vertically
                                transform: 'translateY(-50%)', // Adjust for exact center alignment
                                cursor: 'pointer', // Enable pointer cursor for interaction
                                color: '#6c757d', // Optional muted color
                                backgroundColor: 'transparent', 
                                border: 'none' 
                            }}
                            onClick={togglePasswordVisibility} // Toggle password visibility
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="Contra2" style={{ position: 'relative' , cursor:'pointer'}}>
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Repetir Contraseña"
                            {...getFieldProps('Contra2')}
                            isInvalid={!!errors.Contra && touched.Contra}
                            style={{
                                paddingRight: '40px', // Ensure space for the icon
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Contra2}
                        </Form.Control.Feedback>
                        {/* Icon */}
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            style={{
                                position: 'absolute',
                                grid: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                right: '20px', // Position at the end of the input
                                top: '72%', // Center vertically
                                backgroundColor: 'transparent', 
                                border: 'none',
                                transform: 'translateY(-50%)', // Adjust for exact center alignment
                                cursor: 'pointer', // Enable pointer cursor for interaction
                            }}
                            onClick={togglePasswordVisibility} // Toggle password visibility
                        />
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-3'>
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
                    <Form.Group as={Col} lg={6} controlId="ApellidoPaterno">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido Paterno"
                        name="ApellidoPaterno"
                        value={values.ApellidoPaterno}
                        {...getFieldProps('ApellidoPaterno')}
                        isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Nombre}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-3'>
                    <Form.Group as={Col} lg={6} controlId="ApellidoMaterno">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido Materno"
                        name="ApellidoMaterno"
                        value={values.ApellidoMaterno}
                        {...getFieldProps('ApellidoMaterno')}
                        isInvalid={!!errors.profile?.Nombre && touched.Nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Nombre}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="EstatusID">
                    <Form.Label>Estatus</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name="EstatusID"
                        options={estatus.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedEstatus}
                        onChange={handleEstatusChange}
                        placeholder="Seleccione una empresa"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.EstatusID}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-3 g-3'>

                    {!showMultiEmpresa ? (
                    <Form.Group as={Col} lg={6} controlId="EmpresaID">
                    <Form.Label className="mb-1 mt-2 fs--1">Empresa</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name='EmpresaID'
                        options={empresa?.map(item => ({
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
                    ) : (
                        <Form.Group as={Col} lg={6} controlId="EmpresasID">
                        <Form.Label className="mb-1 mt-2 fs--1">Empresas</Form.Label>
                        <Select
                            classNamePrefix="react-select"
                            name='EmpresasID'
                            options={empresa?.map(item => ({
                                value: item.Valor,
                                label: item.Dato
                            }))}
                            value={selectedEmpresas}
                            onChange={handleEmpresasChange}
                            placeholder="Selecciona"
                            isMulti
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.EmpresasID}
                        </Form.Control.Feedback>
                        </Form.Group>
                    )}
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
                </Row>
                <Row className='mb-3 g-3'>
                    <Form.Group as={Col} lg={6} controlId="PerfilID">
                    <Form.Label className="mb-1 mt-2 fs--1">Perfil</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        name='PerfilID'
                        options={perfil.map(item => ({
                            value: item.Valor,
                            label: item.Dato
                        }))}
                        value={selectedPerfil}
                        onChange={handlePerfilChange}
                        placeholder="Selecciona"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.PerfilID}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <div className='d-flex justify-content-end'>
                    <IconButton
                        type='submit'
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