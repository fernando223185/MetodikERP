import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableRutaD from '../tables/tableRutaD'


const DetalleRutasCard = ({ rutaD, setUpdateList }) => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <Row className="align-items-center mb-1">
          <Col>
            <h5 className="mb-0">Detalle Rutas</h5>
          </Col>
        </Row>
        <hr />
      </Card.Header>
      <Card.Body>
        <TableRutaD 
          rutaD={rutaD}
          setUpdateList={setUpdateList}
        />
      </Card.Body>
    </Card>
  );
};

export default DetalleRutasCard;
