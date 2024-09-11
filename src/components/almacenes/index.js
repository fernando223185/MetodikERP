import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import TableUsers from './tables/tableAlmacenes';


const AlmacenesHeader = () => {
    return (
      <Container fluid className="py-3 px-4 border-bottom mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0">Almacenes</h2>
            <span className="text-muted">Módulo de administración de almacenes</span>
          </Col>
        </Row>
      </Container>
    );
  };
  
const Almacenes = () => {

    return (
        <>
            <AlmacenesHeader />
            <Row className="g-3 mb-3">
                <Col lg={12}>
                    <TableUsers />
                </Col>
            </Row>
        </>
    );
}

export default Almacenes;
