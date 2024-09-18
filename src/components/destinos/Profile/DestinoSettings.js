import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDestinoResumen, useActDestino } from '../../../hooks/Catalogos/Destinos/useDestino';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faEdit } from '@fortawesome/free-solid-svg-icons';
import EmpresaSelect from '../../vehiculos/FormFields/Empresa.js'
import EstatusSelect from '../../vehiculos/FormFields/Estatus.js'
import { SaveButton, CleanButton, BackButton } from '../../vehiculos/FormFields/FormButtons.js';



const DestinoSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getResumen, destinoResumen, isLoading } = useGetDestinoResumen();
    const { submitDestino, response, error, isActLoading } = useActDestino();

    const initialFormState = {
        ID: '',
        Nombre: '',
        Ciudad: '',
        Pais: '',
        CodigoPostal: '',
        Descripcion: '',
        EstatusID: '',
        EmpresaID: ''
    }

    useEffect(() => {
        const data = { ID: id };
        getResumen({ data });
    }, [id, getResumen]);

    const { data = {} } = destinoResumen;
    console.log(data);

    const [formData, setFormData] = useState(initialFormState);

    const resetForm = () => {
        setFormData(initialFormState)
    }

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
                <Row>
                    <Col>
                        <h3 className="text-dark mb-4">Nuevo Destino</h3>
                    </Col>
                    <Col lg={6} className="text-end">
                        <BackButton action={() => navigate('/configuration/destinos')} />
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
                            <SaveButton isLoading={isLoading} />
                            <CleanButton action={resetForm} isLoading={isLoading} />
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );

};

export default DestinoSettings;
