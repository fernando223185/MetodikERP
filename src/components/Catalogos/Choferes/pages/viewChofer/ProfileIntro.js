import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const ProfileIntro = ({ chofer }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Informacion General</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>Nombre:</strong> {chofer.Nombre}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Sucursal:</strong> {chofer.Sucursal}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Vehiculo:</strong> {chofer.Vehiculo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Fecha Registro:</strong> {chofer.FechaRegistro}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Ultima Modificacion:</strong> {chofer.UltimaModificacion}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p><strong>Observaciones:</strong> {chofer.Observaciones}</p>
                    </Col>
                </Row>
                <Collapse in={collapsed}>
                    <div>
                        <Row>
                        <Col md={12}>

                        </Col>
                        </Row>
                    </div>
                </Collapse>
            </Card.Body>
            <Card.Footer className="bg-body-tertiary p-0 border-top d-grid">
                <Button
                variant="link"
                onClick={() => setCollapsed(!collapsed)}
                >
                Mostrar {collapsed ? 'menos' : 'más'}
                <FontAwesomeIcon
                    icon="chevron-down"
                    className="ms-2 fs--2"
                    transform={collapsed ? 'rotate-180' : ''}
                />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ProfileIntro;