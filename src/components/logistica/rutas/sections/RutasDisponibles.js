import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableRutaDisp from '../tables/tableRutaDisp'

const RutasDisponibles = ({ rutasDisponibles, setUpdateList, id }) => {


  return (
    <Card className="mb-3 mt-2">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Rutas Disponibles</h5>
          </Col>
        </Row>
        <hr className='mb-0'/>
      </Card.Header>
      <Card.Body>
        <TableRutaDisp
            rutasDisponibles={rutasDisponibles}
            setUpdateList={setUpdateList}
            id={id}
        />
      </Card.Body>
    </Card>
  );
};

export default RutasDisponibles;
