import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useActDestino } from '../../../hooks/Catalogos/Destinos/useDestino.js'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faEdit } from '@fortawesome/free-solid-svg-icons';
import EmpresaSelect from '../../vehiculos/FormFields/Empresa.js'
import EstatusSelect from '../../vehiculos/FormFields/Estatus.js'

const CreateDestino = () => {
    const navigate = useNavigate();
    const { submitDestino, response, error, isLoading } = useActDestino();
    
    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const empresaID = parsedData.EmpresaID;


    const initialFormState = {
        ID: '',
        Nombre: '',
        Ciudad: '',
        Pais: '',
        CodigoPostal: '',
        Descripcion: '',
        EstatusID: 1,
        EmpresaID: empresaID
    }

    const [formData, setFormData] = useState(initialFormState);

    const resetForm = () => {
        setFormData(initialFormState);
    }


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
        await submitDestino({ data: formData })
        
        resetForm();
    };

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <Row>
                    <Col>
                        <h3 className="text-dark mb-4">Nuevo Destino</h3>
                    </Col>
                    <Col lg={6} className="text-end">
                        <Button className="btn btn-secondary rounded-pill me-1" type="submit" onClick={() => { navigate('/configuration/destinos') }}>
                            <FontAwesomeIcon icon={faReply} />
                        </Button>
                    </Col>
                </Row>
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
                            <EstatusSelect 
                                value={formData.EstatusID}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col lg={6}>
                            <EmpresaSelect 
                                value={formData.EmpresaID}
                                onChange={handleChange}
                            />
                        </Col>

                    </Row>

                    <Row className="mt-4">
                        <Col className="text-end">
                            <Button variant="primary" type="submit" className="rounded-pill me-2" disabled={isLoading}>
                                {isLoading ? 'Guardando...' : <FontAwesomeIcon icon={faSave} /> }
                            </Button>
                            <Button variant="secondary" onClick={resetForm} className="rounded-pill" disabled={isLoading}>
                                {isLoading ? 'Limpiando...' : <FontAwesomeIcon icon={faEdit} /> }
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateDestino;
