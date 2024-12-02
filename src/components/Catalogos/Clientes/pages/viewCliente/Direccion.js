import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const Direccion = ({ cliente }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Direccion</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>Codigo Postal:</strong> {cliente.CodigoPostal}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Direccion:</strong> {cliente.Direccion}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Numero:</strong> {cliente.DireccionNumero}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Numero Interno:</strong> {cliente.DireccionNumeroInt}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Delegacion:</strong> {cliente.Delegacion}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Colonia:</strong> {cliente.Colonia}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Poblacion:</strong> {cliente.Poblacion}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Estado:</strong> {cliente.Estado}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Pais:</strong> {cliente.Pais}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Direccion;