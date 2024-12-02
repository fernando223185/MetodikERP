import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import TableExploradorRutasPasajeros from "../tables/tablePasajerosRuta";

const PasajerosHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Pasajeros</h2>
          <span className="text-muted">Vista de pasajeros de la ruta</span>
        </Col>
      </Row>
    </Container>
  );
};

const ExploradorPasajerosRutas = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formToShow, setFormToShow] = useState("");

  const handleEditClick = (user, formType) => {
    setSelectedUser(user);
    setFormToShow(formType);
    setLgShow(true);
  };

  return (
    <>
      <PasajerosHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <TableExploradorRutasPasajeros onEditClick={handleEditClick} />
        </Col>
      </Row>
    </>
  );
};

export default ExploradorPasajerosRutas;
