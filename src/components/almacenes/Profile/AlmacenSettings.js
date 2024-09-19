import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAlmacenResumen, useActAlmacen } from '../../../hooks/Catalogos/Almacenes/useAlmacen';
import { SaveButton, BackButton, CleanButton } from '../../vehiculos/FormFields/FormButtons.js';


const AlmacenSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getResumen, almacenResumen, isLoading } = useGetAlmacenResumen();
    const { submitAlmacen, response, error, isActLoading } = useActAlmacen();

    useEffect(() => {
        const data = { ID: id };
        getResumen({ data });
    }, [id, getResumen]);

    const { data = {} } = almacenResumen;

    const initialFormState = {
        ID: '',
        Almacen: '',
        Nombre: '',
        GrupoID: '',
        TipoID: '',
        SucursalID: '',
        EstatusID: '',
        EmpresaID: ''
    }

    const [formData, setFormData] = useState(initialFormState);

    const resetForm = () => {
        setFormData(initialFormState);
    }

    useEffect(() => {
        setFormData({
            ID: parseInt(id, 10),
            Almacen: data.Almacen,
            Nombre: data.Nombre,
            GrupoID: data.GrupoID,
            TipoID: data.TipoID,
            SucursalID: data.SucursalID,
            EstatusID: data.EstatusID,
            EmpresaID: data.EmpresaID
        });
    }, [data]);

    useEffect(() => {
        if (almacenResumen && almacenResumen.status === 200 && Array.isArray(almacenResumen.data) && almacenResumen.data.length > 0) {
            const [almacenData] = almacenResumen.data;
            setFormData(almacenData);
        }
    }, [almacenResumen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitAlmacen({ data: formData });
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    // Manejo de errores en la carga de datos
    if (!almacenResumen || almacenResumen.status !== 200) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>No se pudo cargar el almacen.</p>
            </div>
        );
    }

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <Row>
                    <Col>
                        <h3 className="text-dark mb-4">Nuevo Almacen</h3>
                    </Col>
                    <Col lg={6} className="text-end">
                        <BackButton action={() => navigate('/configuration/almacenes')} />
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Almacen">
                                <Form.Label>Almacen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Almacen"
                                    value={formData.Almacen}
                                    onChange={handleChange}
                                    placeholder="Ingresa la almacen"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Nombre"
                                    value={formData.Nombre}
                                    onChange={handleChange}
                                    placeholder="Ingresa el nombre"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="GrupoID">
                                <Form.Label>GrupoID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="GrupoID"
                                    value={formData.GrupoID}
                                    onChange={handleChange}
                                    placeholder="Ingresa un grupo"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="TipoID">
                                <Form.Label>TipoID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TipoID"
                                    value={formData.TipoID}
                                    onChange={handleChange}
                                    placeholder="Ingresa el tipo id"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={4}>
                            <Form.Group controlId="SucursalID">
                                <Form.Label>SucursalID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SucursalID"
                                    value={formData.SucursalID}
                                    onChange={handleChange}
                                    placeholder="Ingresa el sucursal id"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group controlId="EstatusID">
                                <Form.Label>Estatus</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EstatusID"
                                    value={formData.EstatusID}
                                    onChange={handleChange}
                                    placeholder="Ingresa el estatus"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group controlId="EmpresaID">
                                <Form.Label>Empresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EmpresaID"
                                    value={formData.EmpresaID}
                                    onChange={handleChange}
                                    placeholder="Ingresa la empresa"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>                       

                    <Row className="mt-4">
                        <Col className="text-end">
                            <SaveButton isLoading={isLoading}/>
                            <CleanButton action={resetForm} isLoading={isLoading} />
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );

};

export default AlmacenSettings;
