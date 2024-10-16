import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Row, Col } from 'react-bootstrap';

const ProfileIntro = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Header className="bg-body-tertiary">
        <h5 className="mb-0">Información General</h5>
      </Card.Header>

      <Card.Body className="text-1000">
        <Row>
          <Col md={4}>
            <p><strong>Nombre:</strong> John</p>
          </Col>
          <Col md={4}>
            <p><strong>Apellido Paterno:</strong> Doe</p>
          </Col>
          <Col md={4}>
            <p><strong>Apellido Materno:</strong> Smith</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <p><strong>Email:</strong> john.doe@example.com</p>
          </Col>
          <Col md={4}>
            <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
          </Col>
          <Col md={4}>
            <p><strong>Dirección:</strong> 123 Calle Principal, Ciudad, País</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p><strong>Descripción:</strong> Dedicated, passionate, and accomplished Full Stack Developer with 9+ years of progressive experience working as an Independent Contractor...</p>
          </Col>
        </Row>
        <Collapse in={collapsed}>
          <div>
            <Row>
              <Col md={12}>
                <p>I've acquired a wide depth of knowledge and expertise in using my technical skills in programming, computer science, software development, and mobile app development to developing solutions to help organizations increase productivity, and accelerate business performance.</p>
                <p>It's great that we live in an age where we can share so much with technology but I'm ready for the next phase of my career, with a healthy balance between the virtual world and a workplace where I help others face-to-face.</p>
                <p>There's always something new to learn, especially in IT-related fields. People like working with me because I can explain technology to everyone, from staff to executives who need me to tie together the details and the big picture. I can also implement the technologies that successful projects need.</p>
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
