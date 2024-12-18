import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';

const UsuarioProfileIntro = ({ usuario }) => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Card className='mb-3'>
            <Card.Header className='bg-body-tertiary'>
                <h5 className='mb-0'>Informacion General</h5>
            </Card.Header>
            <Card.Body className='text-1000'>
                <Row>
                    <Col md={6}>
                        <p><strong>Usuario:  </strong>{usuario.Usuario}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Nombre: </strong>{usuario.Nombre}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Correo: </strong> {usuario.Correo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Apellido Paterno: </strong> {usuario.ApellidoPaterno}</p>
                    </Col>
                    <Col md={4}>
                        <p><strong>Apellido Materno: </strong> {usuario.ApellidoMaterno}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p><strong>Sucursal: </strong>{usuario.Sucursal}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Perfil: </strong>{usuario.Perfil}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p><strong></strong></p>
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
        </Card>
    );
};

export default UsuarioProfileIntro;