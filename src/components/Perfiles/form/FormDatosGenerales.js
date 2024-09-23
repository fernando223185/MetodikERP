import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetPerfilID } from "../../../hooks/Catalogos/Perfiles/usePerfiles";

const FormDatosGenerales = () => {
  const [formState, setFormState] = useState({
    estatus: 1, 
    perfil: "",
    nombre: "",
    notas: "",
  });

  const { id } = useParams();

  const { getPerfilID, profiles, isLoading } = useGetPerfilID();

  useEffect(() => {
    getPerfilID(id);
  }, []);

  useEffect(() => {
    if (profiles) {
      const perfil = profiles;
      const { Nombre, Notas, Estatus, Perfil } = perfil;
      setFormState({
        estatus: Estatus,
        perfil: Perfil,
        nombre: Nombre,
        notas: Notas,
      });
    }
  }, [profiles]);

  // Función para obtener el label a partir del valor del estatus
  const getEstatusLabel = (estatus) => {
    return estatus === "1" ? "Alta" : "Baja";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Datos guardados:", formState);
  };

  return (
    <Form>
      <Row className="mb-3">
        {/* Estatus */}
        <Col md={3}>
          <Form.Group controlId="estatus">
            <Form.Label>Estatus</Form.Label>
            <InputGroup className="d-flex w-100">
              <InputGroup.Text>
                <FaPencilAlt />
              </InputGroup.Text>
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={getEstatusLabel(formState.estatus)}
                id="dropdown-estatus"
                onSelect={(value) => setFormState({ ...formState, estatus: value })}
                className="w-100"
                style={{ textAlign: "center" }} 
              >
                <Dropdown.Item eventKey="1">Alta</Dropdown.Item>
                <Dropdown.Item eventKey="0">Baja</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Perfil */}
        <Col md={4}>
          <Form.Group controlId="perfil">
            <Form.Label>Perfil</Form.Label>
            <InputGroup className="w-100">
              <InputGroup.Text>
                <FaPencilAlt />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="perfil"
                value={formState.perfil}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Nombre */}
        <Col md={5}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <InputGroup className="w-100">
              <InputGroup.Text>
                <FaPencilAlt />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="nombre"
                value={formState.nombre}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        {/* Notas */}
        <Col md={12}>
          <Form.Group controlId="notas">
            <Form.Label>Notas</Form.Label>
            <InputGroup className="w-100">
              <InputGroup.Text>
                <FaPencilAlt />
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                rows={3}
                name="notas"
                value={formState.notas}
                onChange={handleChange}
                placeholder="Notas adicionales"
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      {/* Botones */}
      <div className="d-flex justify-content-end mt-4">
        <Button variant="outline-primary" className="mr-2" onClick={handleSave}>
          <FaSave /> Guardar
        </Button>
      </div>
    </Form>
  );
};

export default FormDatosGenerales;
