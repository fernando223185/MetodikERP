import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const DatosPersonales = ({ cliente }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Datos Personales</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>RFC:</strong> {cliente.RFC}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>CURP:</strong> {cliente.CURP}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Telefonos:</strong> {cliente.Telefonos}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Fecha Nacimiento:</strong> {new Date(cliente.FechaNacimiento).toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        })}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Sexo:</strong> {cliente.SexoText}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Correo Electronico:</strong> {cliente.Email}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DatosPersonales;