import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useActAlmacen } from '../../../hooks/Catalogos/Almacenes/useAlmacen.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BackButton, SaveButton, CleanButton } from '../../vehiculos/FormFields/FormButtons.js';
import EmpresaSelect from '../../vehiculos/FormFields/Empresa.js';
import EstatusSelect from '../../vehiculos/FormFields/Estatus.js';
import SucursalSelect from '../../vehiculos/FormFields/Sucursal.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const CreateAlmacen = () => {
    const navigate = useNavigate();
    const { submitAlmacen, response: resultNew, error, isLoading } = useActAlmacen();

    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const empresaID = parsedData.EmpresaID;

    const initialFormState = {
        ID: '',
        Almacen: '',
        Nombre: '',
        GrupoID: '',
        TipoID: '',
        SucursalID: '',
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
        await submitAlmacen({ data: formData });

    };

    useEffect(() => {
        console.log("resultNew received:", resultNew);
        if (resultNew && resultNew.status === 200 && Array.isArray(resultNew.data) && resultNew.data.length > 0) {
            const { Mensaje, Tipo, Titulo, Posicion } = resultNew.data[0]; // Extraer el primer objeto del array 'data'

            // Asegúrate de que los valores existen
            console.log("Mensaje:", Mensaje, "Tipo:", Tipo, "Titulo:", Titulo, "Posicion:", Posicion);

            // Verifica si los valores están definidos
            if (Mensaje && Tipo) {
                toast[Tipo?.toLowerCase() || "success"](`${Titulo || 'Notificación'}: ${Mensaje}`, {
                    position: Posicion || "top-right",
                    theme: "colored",
                    style: {
                        color: "#000000",
                        backgroundColor: Tipo === 'success' ? '#28a745' : Tipo === 'error' ? '#dc3545' : '#007bff',
                        fontSize: '16px',
                        fontWeight: 'bold', 
                    },
                });
            } else if (error) {
                toast.error('Error al guardar', {
                    theme: 'colored',
                    position: 'top-right',
                });
            }
        }
    }, [resultNew]);

    return (
        <>
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
                                <EstatusSelect
                                    tipo="Estatus"
                                    modulo="Almacenes"
                                    value={formData.EstatusID}
                                    onChange={handleChange}
                                />
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
                            <Col lg={6}>
                                <SucursalSelect
                                    tipo="Sucursal"
                                    modulo="Almacenes"
                                    value={formData.SucursalID}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={6}>
                                <EmpresaSelect
                                    tipo="Empresa"
                                    modulo="Almacenes"
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
            <ToastContainer />
        </>
    );
};

export default CreateAlmacen;

