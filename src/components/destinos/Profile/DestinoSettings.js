import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDestinoResumen, useActDestino } from '../../../hooks/Catalogos/Destinos/useDestino';

const DestinoSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getResumen, destinoResumen, isLoading } = useGetDestinoResumen();
    const { submitDestino, response, error, isActLoading } = useActDestino();

    useEffect(() => {
        const data = { ID: id };
        getResumen({ data });
    }, [id, getResumen]);

    const { data = {} } = destinoResumen;
    console.log(data);

    const [formData, setFormData] = useState({
        ID: '',
        Nombre: '',
        Ciudad: '',
        Pais: '',
        CodigoPostal: '',
        Descripcion: '',
        EstatusID: '',
        EmpresaID: ''
    });

    useEffect(() => {
        setFormData({
            ID: parseInt(id, 10),
            Nombre: data.Nombre,
            Ciudad: data.Ciudad,
            Pais: data.Pais,
            CodigoPostal: data.CodigoPostal,
            Descripcion: data.Descripcion,
            EstatusID: data.EstatusID,
            EmpresaID: data.EmpresaID
        });
    }, [data]);

    useEffect(() => {
        if (destinoResumen && destinoResumen.status === 200 && Array.isArray(destinoResumen.data) && destinoResumen.data.length > 0) {
            const [destinoData] = destinoResumen.data;
            setFormData(destinoData);
        }
    }, [destinoResumen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitDestino({ data: formData });

        console.log(error);

        if (!error) {
            setTimeout(() => {
                navigate('/configuration/destinos');
            }, 800);
        }
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

    if (!destinoResumen || destinoResumen.status !== 200) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>No se pudo cargar el destino.</p>
            </div>
        );
    }

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <h3 className="text-primary text-center mb-4">Nuevo Destino</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
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
                        <Col lg={6}>
                            <Form.Group controlId="Ciudad">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Ciudad"
                                    value={formData.Ciudad}
                                    onChange={handleChange}
                                    placeholder="Ingresa la ciudad"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Pais">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Pais"
                                    value={formData.Pais}
                                    onChange={handleChange}
                                    placeholder="Ingresa el pais"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="CodigoPostal">
                                <Form.Label>Codigo Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CodigoPostal"
                                    value={formData.CodigoPostal}
                                    onChange={handleChange}
                                    placeholder="Ingresa el codigo postal"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={12}>
                            <Form.Group controlId="Descripcion">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Descripcion"
                                    value={formData.Descripcion}
                                    onChange={handleChange}
                                    placeholder="Ingresa una descripcion"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
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
                        <Col lg={6}>
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
                            <Button variant="danger" type="submit" onClick={() => { navigate('/configuration/destinos') }}>
                                Regresar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default DestinoSettings;
