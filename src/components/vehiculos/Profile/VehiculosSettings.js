import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetVehiculoResumen, useActVehiculo } from '../../../hooks/Catalogos/Vehiculos/useVehiculo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faEdit } from '@fortawesome/free-solid-svg-icons';
import TipoVehiculoSelect from '../FormFields/TipoVehiculo.js';
import RutaSelect from '../FormFields/Ruta.js';
import EstatusSelect from '../FormFields/Estatus.js'
import EmpresaSelect from '../FormFields/Empresa.js'




const VehiculoSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getResumen, vehiculoResumen, isLoading } = useGetVehiculoResumen();
    const { submitVehiculo, response, error, isActLoading } = useActVehiculo();

    useEffect(() => {
        const data = { ID: id };
        getResumen({ data });
    }, [id, getResumen]);

    const initialFormStatus = {
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
    }

    const { data = {} } = vehiculoResumen;
    console.log(data);

    const [formData, setFormData] = useState(initialFormStatus);

    const resetForm = () => {
        setFormData(initialFormStatus);
    }


    useEffect(() => {
        setFormData({
            ID: parseInt(id, 10),
            Vehiculo: data.Vehiculo,
            Descripcion: data.Descripcion,
            Placas: data.Placas,
            Volumen: data.Volumen,
            Peso: data.Peso,
            Agente: data.Agente,
            RutaID: data.RutaID,
            EstatusID: data.EstatusID,
            Proveedor: data.Proveedor,
            Condicion: data.Condicion,
            Concepto: data.Concepto,
            serie: data.serie,
            Marca: data.Marca,
            NoEco: data.NoEco,
            Ano: data.Ano,
            CapacidadPeso: data.CapacidadPeso,
            CapacidadVol: data.CapacidadVol,
            EmpresaID: data.EmpresaID,
            TipoVehiculo: data.TipoVehiculo
        });
    }, [data]);

    useEffect(() => {
        if (vehiculoResumen && vehiculoResumen.status === 200 && Array.isArray(vehiculoResumen.data) && vehiculoResumen.data.length > 0) {
            const [vehiculoData] = vehiculoResumen.data;
            setFormData(vehiculoData);
        }
    }, [vehiculoResumen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.TipoVehiculo = parseInt(formData.TipoVehiculo);
        formData.EstatusID = parseInt(formData.EstatusID);
        formData.RutaID = parseInt(formData.RutaID);
        formData.EmpresaID = parseInt(formData.EmpresaID);
        formData.Ano = parseInt(formData.Ano);
        formData.CapacidadPeso = parseInt(formData.CapacidadPeso);
        formData.CapacidadVol = parseInt(formData.CapacidadVol);
        formData.Peso = parseFloat(formData.Peso);
        formData.Volumen = parseFloat(formData.Volumen);
        formData.NoEco = parseInt(formData.NoEco);
        
        await submitVehiculo({ data: formData });
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

    if (!vehiculoResumen || vehiculoResumen.status !== 200) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>No se pudo cargar el vehiculo.</p>
            </div>
        );
    }

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <Row className="mb-3">
                    <Col lg={6}>
                        <h3 className="text-dark mb-4">Actualizar Vehiculo</h3>
                    </Col>
                    <Col lg={6} className="text-end">
                        <Button className="btn btn-secondary rounded-pill me-1" type="submit" onClick={() => { navigate('/configuration/vehiculos') }}>
                            <FontAwesomeIcon icon={faReply} />
                        </Button>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <TipoVehiculoSelect 
                                value={formData.TipoVehiculo}
                                onChange={handleChange}
                            />
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
                            <EstatusSelect 
                                value={formData.EstatusID}
                                onChange={handleChange}
                            />
                        </Col>
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
                            <RutaSelect 
                                value={formData.RutaID}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
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
                                <Form.Label>Año</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Ano"
                                    value={formData.Ano}
                                    onChange={handleChange}
                                    placeholder="Ingresa el año"
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

export default VehiculoSettings;

