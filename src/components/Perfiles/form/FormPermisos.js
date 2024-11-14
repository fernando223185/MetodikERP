import React, { useState, useEffect } from "react";
import { Form, Row, Col, Tabs, Tab, Container, Button } from "react-bootstrap";
import Select from "react-select"; // Importamos react-select
import {
  useGetModulosAcceso,
  useActModulosAcceso,
} from "../../../hooks/Catalogos/Perfiles/usePerfiles";
import { useParams } from "react-router-dom";
import {
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/common/IconButton";
import { toast } from "react-toastify";

const FormPermisos = () => {
  const { getModulosAcceso, modulos, isLoading } = useGetModulosAcceso();
  const { actModulosAcceso, response, isLoadingAcc } = useActModulosAcceso();

  const { id } = useParams();

  const [permisosSeleccionados, setPermisosSeleccionados] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    const data = {
      PerfilID: id,
      PersonaID: "",
    };
    getModulosAcceso({ data });
  }, [id]);

  useEffect(() => {
    if (modulos) {
      const permisosIniciales = {};
      modulos.forEach((permiso) => {
        permisosIniciales[permiso.Nombre] = permiso.Acceso === 1;
      });
      setPermisosSeleccionados(permisosIniciales);
    }
  }, [modulos]);

  useEffect(() => {
    if (response && Object.keys(response).length === 0) {
      console.log("result es un array vacío:", response);
    } else if (response && response.status === 200) {
      toast[response.data[0].Tipo](`${response.data[0].Mensaje}`, {
        theme: "colored",
        position: response.data[0].Posicion,
        icon:
          response.data[0].Tipo === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : response.data[0].Tipo === "error" ? (
            <FontAwesomeIcon icon={faExclamationTriangle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          ),
      });

    } else if (response) {
      toast.error(`Error al guardar`, {
        theme: "colored",
        position: "top-right",
      });
    }
  }, [response]);

  const handleSaveClick = () => {
    const ChecksCatalogos = modulos
      .filter(
        (permiso) =>
          permiso.Tipo === "Catalogo" && permisosSeleccionados[permiso.Nombre]
      )
      .map((permiso) => permiso.ID)
      .join(",");

    const ChecksConfiguracion = modulos
      .filter(
        (permiso) =>
          permiso.Tipo === "Configuracion" &&
          permisosSeleccionados[permiso.Nombre]
      )
      .map((permiso) => permiso.ID)
      .join(",");

    const CheckMenu = modulos
      .filter(
        (permiso) =>
          permiso.Tipo === "Menu" && permisosSeleccionados[permiso.Nombre]
      )
      .map((permiso) => permiso.ID)
      .join(",");

    const CheckSubModulo = modulos
      .filter(
        (permiso) =>
          permiso.Tipo === "Modulo" && permisosSeleccionados[permiso.Nombre]
      )
      .map((permiso) => permiso.ID)
      .join(",");

    const data = {
      PerfilID: id,
      ChecksCatalogos,
      ChecksConfiguracion,
      CheckMenu,
      CheckSubModulo,
    };

    actModulosAcceso({ data });
  };
  const handleCheckboxChange = (event) => {
    setPermisosSeleccionados({
      ...permisosSeleccionados,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedMenu(selectedOption ? selectedOption.value : "");
  };

  const modulosFiltrados = modulos.filter(
    (permiso) =>
      permiso.NombreMenu &&
      permiso.NombreMenu.toLowerCase().includes(selectedMenu.toLowerCase())
  );

  const menuOptions = [
    ...new Set(
      modulos.map((permiso) => permiso.NombreMenu).filter((menu) => menu)
    ),
  ].map((menu) => ({ value: menu, label: menu }));

  return (
    <Container style={{ position: "relative", paddingBottom: "4rem" }}>
      <Tabs defaultActiveKey="menus" id="uncontrolled-tab" className="mb-3">
        <Tab eventKey="menus" title="Menus">
          <br />
          <Row>
            {modulos
              .filter((permiso) => permiso.Tipo === "Menu")
              .map((permiso) => (
                <Col key={permiso.ID} md={4}>
                  <Form.Check
                    type="checkbox"
                    id={permiso.ID}
                    label={permiso.Nombre}
                    name={permiso.Nombre}
                    checked={permisosSeleccionados[permiso.Nombre] || false}
                    onChange={handleCheckboxChange}
                  />
                </Col>
              ))}
          </Row>
        </Tab>

        <Tab eventKey="catalogos" title="Catalogos">
          <Row>
            {modulos
              .filter((permiso) => permiso.Tipo === "Catalogo")
              .map((permiso) => (
                <Col key={permiso.ID} md={4}>
                  <Form.Check
                    type="checkbox"
                    id={permiso.ID}
                    label={`${permiso.Nombre} (${permiso.NombreMenu})`}
                    name={permiso.Nombre}
                    checked={permisosSeleccionados[permiso.Nombre] || false}
                    onChange={handleCheckboxChange}
                  />
                </Col>
              ))}
          </Row>
        </Tab>

        <Tab eventKey="modulos" title="Modulos">
          <Form.Group className="mb-3">
            <Form.Label>Filtrar por Menú</Form.Label>
            <Select
              value={menuOptions.find(
                (option) => option.value === selectedMenu
              )}
              onChange={handleSelectChange}
              options={menuOptions}
              placeholder="Seleccione un menú"
              isClearable
              isSearchable
            />
          </Form.Group>
          <Row>
            {modulosFiltrados.map((permiso) => (
              <Col key={permiso.ID} md={4}>
                <Form.Check
                  type="checkbox"
                  id={permiso.ID}
                  label={permiso.Nombre}
                  name={permiso.Nombre}
                  checked={permisosSeleccionados[permiso.Nombre] || false}
                  onChange={handleCheckboxChange}
                />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
      <br></br>
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
        onClick={handleSaveClick}
      >
        <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar
      </IconButton>
    </Container>
  );
};

export default FormPermisos;
