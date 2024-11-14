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
import {
  useGetPerfilID,
  useActProfil,
} from "../../../hooks/Catalogos/Perfiles/usePerfiles";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import IconButton from "components/common/IconButton";

const FormDatosGenerales = () => {
  const [formState, setFormState] = useState({
    estatus: 1, // Valor predeterminado
    perfil: "", // Valor predeterminado
    nombre: "", // Valor predeterminado
    notas: "", // Valor predeterminado
  });

  const { id } = useParams();
  const { getPerfilID, profiles, isLoading } = useGetPerfilID();
  const { actProfiles, result, isLoadingPerfil } = useActProfil();
  const navigate = useNavigate();

  // Obtener perfil al montar el componente
  useEffect(() => {
    getPerfilID(id);
  }, [id]);

  // Actualizar formState solo cuando `profiles` cambie y tenga valores
  useEffect(() => {
    if (profiles) {
      setFormState((prevState) => ({
        ...prevState,
        estatus: profiles.Estatus || 1, // Garantiza que estatus esté siempre presente
        perfil: profiles.Perfil || "", // Garantiza que perfil esté siempre presente
        nombre: profiles.Nombre || "", // Garantiza que nombre esté siempre presente
        notas: profiles.Notas || "", // Garantiza que notas esté siempre presente
      }));
    }
  }, [profiles]);

  useEffect(() => {
    if (result && Object.keys(result).length === 0) {
      console.log("result es un array vacío:", result);
    } else if (result && result.status === 200) {
      toast[result.data[0].Tipo](`${result.data[0].Mensaje}`, {
        theme: "colored",
        position: result.data[0].Posicion,
        icon:
          result.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : result.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });
      if (result.data[0].NID > 0) {
        setTimeout(() => {
          navigate(`/Catalogo/Perfil/${result.data[0].NID}`);
        }, 1000);
      }
    } else if (result) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [result]);

  // Función para obtener el label del estatus
  const getEstatusLabel = (estatus) => {
    return estatus === "1" ? "Alta" : "Baja";
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar datos
  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      ...formState,
      ID: id,
      EmpresaID: user ? user.EmpresaID : null,
    };

    console.log("Datos guardados:", data); // Verificar en la consola

    // Enviar los datos completos a actProfiles
    actProfiles({ data });
  };

  return (
    <Form>
      <Row className="mb-3">
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
                onSelect={(value) =>
                  setFormState({ ...formState, estatus: value })
                }
                className="w-100"
                style={{ textAlign: "center" }}
              >
                <Dropdown.Item eventKey="1">Alta</Dropdown.Item>
                <Dropdown.Item eventKey="0">Baja</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Form.Group>
        </Col>

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
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Col>

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
      <br></br>
      <div className="d-flex justify-content-end mt-4">
        <IconButton
          variant="falcon-default"
          size="sm"
          className="d-flex align-items-center"
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
          }}
          title="Guardar"
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar
        </IconButton>
      </div>
    </Form>
  );
};

export default FormDatosGenerales;
