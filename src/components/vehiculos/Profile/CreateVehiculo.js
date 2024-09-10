import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useActVehiculo } from '../../../hooks/Catalogos/Vehiculos/useVehiculo.js'
import { useNavigate } from 'react-router-dom';

const CreateVehiculo = () => {
    const navigate = useNavigate();
    const { submitVehiculo, response, error, isLoading } = useActVehiculo();
    const [formData, setFormData] = useState({
        ID: '',
        Vehiculo: '',
        Descripcion: '',
        Placas: '',
        Volumen: '',
        Peso: '',
        Agente: '',
        RutaID: '',
        EstatusID: '',
        Proveedor: '',
        Condicion: '',
        Concepto: '',
        serie: '',
        Marca: '',
        NoEco: '',
        Ano: '',
        CapacidadPeso: '',
        CapacidadVol: '',
        EmpresaID: '',
        TipoVehiculo: ''
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
        await submitVehiculo({ data: formData })
    
        console.log(error);

        if (!error) {
            setTimeout(() => {
                navigate('/configuration/vehiculos');
            }, 800);
        }
    };

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <h3 className="text-primary text-center mb-4">Nuevo Vehiculo</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Vehiculo">
                                <Form.Label>Vehiculo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Vehiculo"
                                    value={formData.Vehiculo}
                                    onChange={handleChange}
                                    placeholder="Ingresa un vehiculo"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Descripcion">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Descripcion"
                                    value={formData.Descripcion}
                                    onChange={handleChange}
                                    placeholder="Ingresa la descripcion"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Placas">
                                <Form.Label>Placas</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Placas"
                                    value={formData.Placas}
                                    onChange={handleChange}
                                    placeholder="Ingresa las placas"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Volumen">
                                <Form.Label>Volumen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Volumen"
                                    value={formData.Volumen}
                                    onChange={handleChange}
                                    placeholder="Ingresa el volumen"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={3}>
                            <Form.Group controlId="Peso">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Peso"
                                    value={formData.Peso}
                                    onChange={handleChange}
                                    placeholder="Ingrese el peso"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group controlId="Agente">
                                <Form.Label>Agente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Agente"
                                    value={formData.Agente}
                                    onChange={handleChange}
                                    placeholder="Ingrese el Agente"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="RutaID">
                                <Form.Label>RutaID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="RutaID"
                                    value={formData.RutaID}
                                    onChange={handleChange}
                                    placeholder="Ingresa la ruta"
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="EstatusID">
                                <Form.Label>EstatusID</Form.Label>
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
                            <Form.Group controlId="Proveedor">
                                <Form.Label>Proveedor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Proveedor"
                                    value={formData.Proveedor}
                                    onChange={handleChange}
                                    placeholder="Ingresa el proveedor"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Condicion">
                                <Form.Label>Condicion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Condicion"
                                    value={formData.Condicion}
                                    onChange={handleChange}
                                    placeholder="Ingresa la condicion"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Concepto">
                                <Form.Label>Concepto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Concepto"
                                    value={formData.Concepto}
                                    onChange={handleChange}
                                    placeholder="Ingresa el concepto"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="serie">
                                <Form.Label>Serie</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serie"
                                    value={formData.serie}
                                    onChange={handleChange}
                                    placeholder="Ingresa la serie"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Marca">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Marca"
                                    value={formData.Marca}
                                    onChange={handleChange}
                                    placeholder="Ingresa la marca"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="NoEco">
                                <Form.Label>NoEco</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="NoEco"
                                    value={formData.NoEco}
                                    onChange={handleChange}
                                    placeholder="Ingresa el noEco"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Ano">
                                <Form.Label>Ano</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Ano"
                                    value={formData.Ano}
                                    onChange={handleChange}
                                    placeholder="Ingresa el ano"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="CapacidadPedo">
                                <Form.Label>Capacidad Peso</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CapacidadPeso"
                                    value={formData.CapacidadPeso}
                                    onChange={handleChange}
                                    placeholder="Ingresa la capacidad en peso"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="CapacidadVol">
                                <Form.Label>Capacidad Volumen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CapacidadVol"
                                    value={formData.CapacidadVol}
                                    onChange={handleChange}
                                    placeholder="Ingresa la capacidad en volumen"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
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
                        <Col lg={6}>
                            <Form.Group controlId="TipoVehiculo">
                                <Form.Label>Tipo Vehiculo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TipoVehiculo"
                                    value={formData.TipoVehiculo}
                                    onChange={handleChange}
                                    placeholder="Ingresa el tipo de vehiculo"
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
                            <Button variant="danger" type="submit" onClick={() => { navigate('/configuration/vehiculos') }}>
                                Regresar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateVehiculo;
