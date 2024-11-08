import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import TableExploradorRutasParadas from "../tables/tableParadasRutas";

const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-0">Paradas</h2>
          <span className="text-muted">Paradas de la Ruta</span>
        </Col>
      </Row>
    </Container>
  );
};

const ExploradorParadasRutas = () => {
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
      <ProfilerHeader />
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <TableExploradorRutasParadas onEditClick={handleEditClick} />
        </Col>
      </Row>
    </>
  );
};

export default ExploradorParadasRutas;
