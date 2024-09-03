import React, { useState } from 'react';
import { Col, Row, Container, Modal, Card } from 'react-bootstrap';
import TableReservas from '../tables/tableReservas';
import IconButton from 'components/common/IconButton';




const ReservasHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Reservas</h2>
          <span className="text-muted">Tablero de control</span>
        </Col>
      </Row>
    </Container>
  );
};

const Reservas = () => {

  return (
    <>
      <ReservasHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <IconButton           
                  variant="primary"
                  icon="plus"
                  size="sm"
                  onClick={() => {

                  }}
              >
              </IconButton>
              <hr style={{ margin: '10px 0' }} />
            </Card.Header>
            <Card.Body>
              <TableReservas/>
            </Card.Body>
          </Card>        
        </Col>
      </Row>
    </>
  );
};

export default Reservas;
