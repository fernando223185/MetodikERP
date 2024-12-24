import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import TableGastosRuta from "../tables/tableGastosRuta";

const GastosRuta = ({ gastosRuta, setUpdateList }) => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <Row className="align-items-center mb-1">
          <Col>
            <h5 className="mb-0">Gastos</h5>
          </Col>
        </Row>
        <hr />
      </Card.Header>
      <Card.Body>
        <TableGastosRuta
          gastosRuta={gastosRuta}
          setUpdateList={setUpdateList}
        />
      </Card.Body>
    </Card>
  );
};

export default GastosRuta;
