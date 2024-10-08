import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TablePaqueteriaD from '../tables/tablePaqueteriaD'


const DetalleCard = ({ paqueteriaD, setUpdateList }) => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <Row className="align-items-center mb-1">
          <Col>
            <h5 className="mb-0">Detalle Articulos</h5>
          </Col>
        </Row>
        <hr />
      </Card.Header>
      <Card.Body>
        <TablePaqueteriaD 
          paqueteriaD={paqueteriaD}
          setUpdateList={setUpdateList}
        />
      </Card.Body>
    </Card>
  );
};

export default DetalleCard;
