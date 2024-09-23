import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Modal,
  Card,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import FormDatosGenerales from "../form/FormDatosGenerales"; // Importando el formulario
import FormPermisos from "../form/FormPermisos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faReply, faBan } from "@fortawesome/free-solid-svg-icons";

const ProfilerHeader = () => {
  return (
    <Container fluid className="py-3 px-4 border-bottom mb-4">
      <Row className="align-items-center justify-content-between">
        {/* Título y Descripción */}
        <Col xs="auto">
          <h2 className="mb-0 d-inline-block">Configuración de perfil</h2>
          <span className="text-muted ms-2 d-inline-block">
            Administra los accesos del perfil
          </span>
        </Col>

        {/* Botón con icono alineado */}
        <Col xs="auto">
          <Link
            to={`/configuration/profiles/`}
            className="btn btn-outline-primary rounded-pill"
          >
            <FontAwesomeIcon icon={faReply} />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

const Perfiles = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [key, setKey] = useState("datosGenerales"); // Estado para controlar las pestañas

  const handleEditClick = (user, formType) => {
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
          <Card>
            <Card.Body>
              {/* Pestañas para separar las secciones */}
              <Tabs
                id="profile-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="datosGenerales" title="Datos Generales">
                  {/* Aquí se llama al componente FormDatosGenerales */}
                  <Row>
                    <Col>
                      <FormDatosGenerales />
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="permisos" title="Permisos">
                  <Row>
                    <Col>
                      <FormPermisos />
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="acciones" title="Acciones">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
                <Tab eventKey="movimientos" title="Movimientos">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para editar información */}
      <Modal size="lg" show={lgShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Aquí puedes cargar el contenido del formulario según el tipo seleccionado */}
          <p>Formulario para editar la sección seleccionada.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Perfiles;
