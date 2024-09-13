import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSucursalResumen, useActSucursal } from '../../../hooks/Catalogos/Sucursales/useSucursal';

const SucursalesSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getResumen, sucursalResumen, isLoading } = useGetSucursalResumen();
    const { submitSucursal, response, error, isActLoading } = useActSucursal();

    useEffect(() => {
        const data = { ID: id };
        getResumen({ data });
    }, [id, getResumen]);

    // Destructuración segura con valores predeterminados
    const { data = {} } = sucursalResumen;
    console.log(data);

    // Estado inicial con valores vacíos
    const [formData, setFormData] = useState({
        ID: '',
        Sucursal: '',
        Nombre: '',
        Prefijo: '',
        Direccion: '',
        DireccionNumero: '',
        DireccionNumeroInt: '',
        Delegacion: '',
        Colonia: '',
        Poblacion: '',
        Estado: '',
        Pais: '',
        CodigoPostal: '',
        Telefonos: '',
        EstatusID: '',
        RFC: '',
        EmpresaID: '',
        ZonaImpuestoID: '',
    });

    useEffect(() => {
        setFormData({
            ID: parseInt(id, 10) || '',
            Sucursal: data.Sucursal || '',
            Nombre: data.Nombre || '',
            Prefijo: data.Prefijo || '',
            Direccion: data.Direccion || '',
            DireccionNumero: data.DireccionNumero || '',
            DireccionNumeroInt: data.DireccionNumeroInt || '',
            Delegacion: data.Delegacion || '',
            Colonia: data.Colonia || '',
            Poblacion: data.Poblacion || '',
            Estado: data.Estado || '',
            Pais: data.Pais || '',
            CodigoPostal: data.CodigoPostal || '',
            Telefonos: data.Telefonos || '',
            EstatusID: data.EstatusID || '',
            RFC: data.RFC || '',
            EmpresaID: data.EmpresaID || '',
            ZonaImpuestoID: data.ZonaImpuestoID || '',
        });
    }, [data]);

    useEffect(() => {
        if (sucursalResumen && sucursalResumen.status === 200 && Array.isArray(sucursalResumen.data) && sucursalResumen.data.length > 0) {
            const [sucursalData] = sucursalResumen.data;
            setFormData(sucursalData);
        }
    }, [sucursalResumen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitSucursal({ data: formData });

        console.log(error);

        if (!error) {
            setTimeout(() => {
                navigate('/configuration/sucursales');
            }, 800);
        }
    };

    // Manejo de estado de carga
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
    if (!sucursalResumen || sucursalResumen.status !== 200) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>No se pudo cargar la sucursal.</p>
            </div>
        );
    }

    return (
        <Card>
            <Card.Body className="p-lg-6">
                <h3 className="text-primary text-center mb-4">Actualizar Sucursal</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Sucursal">
                                <Form.Label>Sucursal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Sucursal"
                                    value={formData.Sucursal}
                                    onChange={handleChange}
                                    placeholder="Ingresa la sucursal"
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
                            <Form.Group controlId="Prefijo">
                                <Form.Label>Prefijo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Prefijo"
                                    value={formData.Prefijo}
                                    onChange={handleChange}
                                    placeholder="Ingresa el prefijo"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Direccion"
                                    value={formData.Direccion}
                                    onChange={handleChange}
                                    placeholder="Ingresa la dirección"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={3}>
                            <Form.Group controlId="DireccionNumero">
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DireccionNumero"
                                    value={formData.DireccionNumero}
                                    onChange={handleChange}
                                    placeholder="No. Ext."
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group controlId="DireccionNumeroInt">
                                <Form.Label>Número Interior</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DireccionNumeroInt"
                                    value={formData.DireccionNumeroInt}
                                    onChange={handleChange}
                                    placeholder="No. Int."
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Delegacion">
                                <Form.Label>Delegación</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Delegacion"
                                    value={formData.Delegacion}
                                    onChange={handleChange}
                                    placeholder="Ingresa la delegación"
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Colonia">
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Colonia"
                                    value={formData.Colonia}
                                    onChange={handleChange}
                                    placeholder="Ingresa la colonia"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Poblacion">
                                <Form.Label>Poblacion</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Poblacion"
                                    value={formData.Poblacion}
                                    onChange={handleChange}
                                    placeholder="Ingresa la poblacion"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="Estado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Estado"
                                    value={formData.Estado}
                                    onChange={handleChange}
                                    placeholder="Ingresa el estado"
                                    required
                                />
                            </Form.Group>
                        </Col>
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
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6}>
                            <Form.Group controlId="CodigoPostal">
                                <Form.Label>Codigo Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CodigoPostal"
                                    value={formData.CodigoPostal}
                                    onChange={handleChange}
                                    placeholder="Ingresa el codigo postal"
                                    pattern="[0-9]*"
                                    maxLength="10"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="Telefonos">
                                <Form.Label>Telefonos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Telefonos"
                                    value={formData.Telefonos}
                                    onChange={handleChange}
                                    placeholder="Ingresa los telefonos"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
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
                            <Form.Group controlId="RFC">
                                <Form.Label>RFC</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="RFC"
                                    value={formData.RFC}
                                    onChange={handleChange}
                                    placeholder="Ingresa el RFC"
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
                            <Form.Group controlId="ZonaImpuestoID">
                                <Form.Label>Zona Impuesto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ZonaImpuestoID"
                                    value={formData.ZonaImpuestoID}
                                    onChange={handleChange}
                                    placeholder="Ingresa la Zona de Impuesto"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col className="text-center">
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Actualizando...' : 'Actualizar'}
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button variant="danger" type="submit" onClick={() => { navigate('/configuration/sucursales') }}>
                                Regresar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SucursalesSettings;

