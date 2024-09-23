import React, { useState, useEffect } from "react";
import { Form, Row, Col, Tabs, Tab, Container } from "react-bootstrap";

// Simulación del JSON de permisos
const permisosJSON = [
  { Acceso: "1", EstatusID: null, FechaRegistro: "Fri, 20 Sep 2024 15:55:53 GMT", ID: 1, MaxMod: 11, Modulo: "1", Nombre: "Catalogos", NombreMenu: null, Ok: 0, Tipo: "Menu" },
  { Acceso: "0", EstatusID: null, FechaRegistro: "Fri, 20 Sep 2024 15:55:53 GMT", ID: 2, MaxMod: 11, Modulo: "2", Nombre: "Comercial", NombreMenu: null, Ok: 0, Tipo: "Menu" },
  { Acceso: "1", EstatusID: null, FechaRegistro: "Fri, 20 Sep 2024 15:55:53 GMT", ID: 3, MaxMod: 11, Modulo: "3", Nombre: "Exploradores", NombreMenu: null, Ok: 0, Tipo: "Menu" },
  { Acceso: "0", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1002, MaxMod: 11, Modulo: "4", Nombre: "Usuarios", NombreMenu: "Catalogos", Ok: 0, Tipo: "Catalogo" },
  { Acceso: "1", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1003, MaxMod: 11, Modulo: "5", Nombre: "Vehiculos", NombreMenu: "Catalogos", Ok: 0, Tipo: "Catalogo" },
  { Acceso: "1", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1004, MaxMod: 11, Modulo: "6", Nombre: "Rutas", NombreMenu: "Catalogos", Ok: 0, Tipo: "Catalogo" },
  { Acceso: "0", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1005, MaxMod: 11, Modulo: "7", Nombre: "Destinos", NombreMenu: "Catalogos", Ok: 0, Tipo: "Catalogo" },
  { Acceso: "0", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1006, MaxMod: 11, Modulo: "8", Nombre: "Perfiles", NombreMenu: "Catalogos", Ok: 0, Tipo: "Catalogo" },
  { Acceso: "1", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1007, MaxMod: 11, Modulo: "9", Nombre: "Comercial.Reservas", NombreMenu: "Comercial", Ok: 0, Tipo: "Modulo" },
  { Acceso: "0", EstatusID: null, FechaRegistro: "Mon, 23 Sep 2024 15:25:42 GMT", ID: 1009, MaxMod: 11, Modulo: "10", Nombre: "Exploradores.Explorador de Rutas", NombreMenu: "Exploradores", Ok: 0, Tipo: "Modulo" }
];

const FormPermisos = () => {
  const [permisosSeleccionados, setPermisosSeleccionados] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");

  // Inicializamos los permisos basados en el valor de Acceso
  useEffect(() => {
    const permisosIniciales = {};
    permisosJSON.forEach((permiso) => {
      permisosIniciales[permiso.Nombre] = permiso.Acceso === "1";
    });
    setPermisosSeleccionados(permisosIniciales);
  }, []);

  const handleCheckboxChange = (event) => {
    setPermisosSeleccionados({
      ...permisosSeleccionados,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (e) => {
    setSelectedMenu(e.target.value);
  };

  // Filtramos los módulos según el filtro de NombreMenu en la pestaña "Modulos"
  const modulosFiltrados = permisosJSON.filter(
    (permiso) => permiso.NombreMenu && permiso.NombreMenu.toLowerCase().includes(selectedMenu.toLowerCase())
  );

  return (
    <Container>
      <Tabs defaultActiveKey="modulos" id="uncontrolled-tab" className="mb-3">
        <Tab eventKey="menus" title="Menus">
          <Row>
            {/* Filtrar por Tipo "Menu" */}
            {permisosJSON.filter(permiso => permiso.Tipo === "Menu").map((permiso) => (
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

        <Tab eventKey="modulos" title="Modulos">
          <Form.Group className="mb-3">
            <Form.Label>Filtrar por Menú</Form.Label>
            <Form.Select value={selectedMenu} onChange={handleSelectChange}>
              <option value="">Todos los Menús</option>
              {[...new Set(permisosJSON.map(permiso => permiso.NombreMenu).filter(menu => menu))].map((menu, index) => (
                <option key={index} value={menu}>{menu}</option>
              ))}
            </Form.Select>
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
    </Container>
  );
};

export default FormPermisos;
