import React, { useState } from "react";
import { Col, Row, Container, Modal, Card, Button } from "react-bootstrap";
import FormDatosGenerales from "../form/FormDatosGenerales"; // Importando el formulario
import FormPermisos from "../form/FormPermisos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faReply, faBan } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";

const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center justify-content-between">

        <Col xs="auto">
          <h2 className="mb-0 d-inline-block">Configuración de perfil</h2>
          <span className="text-muted ms-2 d-inline-block">
            Administra los accesos del perfil
          </span>
        </Col>


        <Col xs="auto">
          <Link to={`/configuration/profiles/`}>
            <IconButton
              variant="falcon-default"
              size="sm"
              className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
              title="Regresar"
            >
              <FontAwesomeIcon icon={faReply} className="me-1" /> Regresar
            </IconButton>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

const Perfiles = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setLgShow(true);
  };

  const handleCloseModal = () => {
    setLgShow(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios
    console.log("Usuario actualizado:", selectedUser);
    setLgShow(false);
  };

  return (
    <>
      <ProfilerHeader />

      <Row className="g-3 mb-3">
        <Col lg={12}>
          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-3">Datos Generales</h5>
              <Row>
                <Col>
                  <FormDatosGenerales />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-3">Permisos</h5>
              <Row>
                <Col>
                  <FormPermisos />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Perfiles;
