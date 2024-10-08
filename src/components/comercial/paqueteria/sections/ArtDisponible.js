import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TableArtDisponible from '../tables/tableArtDisponible'

const ArtDisponible = ({ Art, setUpdateList, id }) => {


  return (
    <Card className="mb-3 mt-2">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Articulos Disponibles </h5>
          </Col>
        </Row>
        <hr className='mb-0'/>
      </Card.Header>
      <Card.Body>
        <TableArtDisponible
            Art={Art}
            setUpdateList={setUpdateList}
            id={id}
        />
      </Card.Body>
    </Card>
  );
};

export default ArtDisponible;
