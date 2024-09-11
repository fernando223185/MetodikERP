import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableRutaIda from '../tables/tableRutasIda'

const RutaIda = ({ rutaIda }) => {


  return (
    <Card className="mb-3 mt-2">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Rutas Disponibles Ida</h5>
          </Col>
        </Row>
        <hr className='mb-0'/>
      </Card.Header>
      <Card.Body>
        <TableRutaIda
            rutaIda={rutaIda}
        />
      </Card.Body>
    </Card>
  );
};

export default RutaIda;
