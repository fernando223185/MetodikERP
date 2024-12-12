import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const ReglaNegocio = ({ cliente }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Regla de Negocio</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>Limite de credito:</strong> {cliente.CreditoLimite}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Condicion:</strong> {cliente.CreditoCondiciones}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Bloquear Morosos:</strong> {cliente.BloquearMorosos}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Descuento:</strong> {cliente.Descuento}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Sucursal:</strong> {cliente.SucursalEmpresa}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ReglaNegocio;