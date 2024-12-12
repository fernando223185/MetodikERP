import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const Facturacion = ({ cliente }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Facturacion</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>Uso CFDI:</strong> {cliente.usoCFDI}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Forma de Pago:</strong> {cliente.FormaPago}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Metodo de Pago:</strong> {cliente.MetodoPago}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Regimen Fiscal:</strong> {cliente.RegimenFiscal}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Facturacion;