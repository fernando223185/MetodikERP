import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useActAlmacen } from '../../../hooks/Catalogos/Almacenes/useAlmacen.js'
import { useNavigate } from 'react-router-dom';

const CreateAlmacen = () => {
    const navigate = useNavigate();
    const { submitAlmacen, response, error, isLoading } = useActAlmacen();
    const [formData, setFormData] = useState({
        ID: '',
        Almacen: '',
        Nombre: '',
        GrupoID: '',
        TipoID: '',
        SucursalID: '',
        EstatusID: '',
        EmpresaID: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await submitAlmacen({ data: formData })
    
        console.log(error);

        if (!error) {
            setTimeout(() => {
                navigate('/configuration/almacenes');
            }, 800);
        }
    };

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <h3 className="text-primary text-center mb-4">Nuevo Almacen</h3>
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
                        <Col className="text-center">
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button variant="danger" type="submit" onClick={() => { navigate('/configuration/almacenes') }}>
                                Regresar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateAlmacen;