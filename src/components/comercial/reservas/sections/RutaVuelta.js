import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableRutaVuelta from '../tables/tableRutaVuelta'

const RutaVuelta = ({ rutaVuelta }) => {


  return (
    <Card className="mb-3 mt-2">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Rutas Disponibles Vuelta</h5>
          </Col>
        </Row>
        <hr className='mb-0'/>
      </Card.Header>
      <Card.Body>
        <TableRutaVuelta
            rutaVuelta={rutaVuelta}
        />
      </Card.Body>
    </Card>
  );
};

export default RutaVuelta;
