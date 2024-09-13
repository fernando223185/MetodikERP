import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import TableUsers from './tables/tableDestinos';


const DestinosHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Destinos</h2>
            <span className="text-muted">Módulo de administración de destinos</span>
          </Col>
        </Row>
      </Container>
    );
  };
  
const Destinos = () => {

    return (
        <>
            <DestinosHeader />
            <Row className="g-3 mb-3">
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <TableUsers />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Destinos;
