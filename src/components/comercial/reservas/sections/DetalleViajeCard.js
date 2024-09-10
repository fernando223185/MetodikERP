import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableReservaD from '../tables/tableReservaD'


const DetalleViajeCard = ({ reservaD, setUpdateList }) => {
  console.log(reservaD)
  return (
    <Card className="mb-3">
      <Card.Header>
        <Row className="align-items-center mb-1">
          <Col>
            <h5 className="mb-0">Detalle viaje</h5>
          </Col>
        </Row>
        <hr />
      </Card.Header>
      <Card.Body>
        <TableReservaD 
          reservaD={reservaD}
          setUpdateList={setUpdateList}
        />
      </Card.Body>
    </Card>
  );
};

export default DetalleViajeCard;
