import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';

const ProfileIntro = ({ agenteId }) => {
  const [collapsed, setCollapsed] = useState(false);
  console.log("Usuario llega", agenteId)
  return (
    <Card className="mb-3">
      <Card.Header className="bg-body-tertiary">
        <h5 className="mb-0">Información General</h5>
      </Card.Header>

      <Card.Body className="text-1000">
        <Row>
          <Col md={4}>
            <p><strong>Nombre:</strong> {agenteId?.Nombre}</p>
          </Col>
          <Col md={4}>
            <p><strong>Telefono:</strong> {agenteId.Telefono}</p>
          </Col>
          <Col md={4}>
            <p><strong>Sucursal:</strong> {agenteId.SucursalID}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <p><strong>Email:</strong> {agenteId.Correo}</p>
          </Col>
          <Col md={4}>
            <p><strong>Puesto:</strong> {agenteId.Puesto} </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p><strong>Notas: </strong>{agenteId.Notas}</p>
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
