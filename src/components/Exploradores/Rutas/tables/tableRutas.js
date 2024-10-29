import React, { useEffect, useState } from "react";
import { Spinner, Button, Modal, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import { useGetExploradorRutas } from "../../../../hooks/Exploradores/Rutas/useRutasExplorador";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de que los estilos de DatePicker estén incluidos
import Select from "react-select";
import { useGetFiltroModulo } from "../../../../hooks/useFiltros";

const columns = [
  {
    accessor: "acciones",
    Header: "",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "ruta",
    Header: "Ruta",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "origen",
    Header: "Origen",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "destino",
    Header: "Destino",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "fecha",
    Header: "Fecha",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "horaSalida",
    Header: "Hora de salida",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "noPasajeros",
    Header: "No Pasajeros",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "noReservados",
    Header: "Reservados",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "noConfirmados",
    Header: "Confirmados",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "noDisponible",
    Header: "Disponible",
    headerProps: { className: "text-900" },
  },
];

function TableExploradorRutas() {
  const { getProfiles, rutes, isLoading } = useGetExploradorRutas();
  const [result, setResult] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();

  // Estado para los filtros
  const [selectedRuta, setSelectedRuta] = useState(0);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedHora, setSelectedHora] = useState(null);
  const [filters, setFilters] = useState({
    ruta: 0,
    fecha: "",
    hora: "",
  });
  const [rutasOptions, setRutasOptions] = useState([]);

  const handleOpenFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

  const fetchRutasOptions = async () => {
    const data = {
      Tipo: "RutaFiltro",
      PersonaID: 1,
      Modulo: "Rutas",
      ModuloID: null,
    };
    const resultFiltro = await getFiltroModulo(data);
    const options = resultFiltro.map((item) => ({
      value: item.Valor,
      label: item.Dato,
    }));
    console.log(options);
    setRutasOptions(options);
  };

  useEffect(() => {
    if (showFilterModal) {
      fetchRutasOptions();
    }
  }, [showFilterModal]);

  useEffect(() => {
    console.log(filters);
    getProfiles(filters);
  }, [filters]);

  const applyFilters = () => {
    setFilters({
      ruta: selectedRuta ? selectedRuta.value : "",
      fecha: selectedFecha
        ? new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(selectedFecha)
        : "",
      hora: selectedHora
        ? new Intl.DateTimeFormat("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(selectedHora)
        : "",
    });

    handleCloseFilterModal();
  };

  useEffect(() => {
    if (rutes.status === 200) {
      const transformedData = rutes.data.map((u) => ({
        acciones: (
          <>
            <Link
              to={`/Explorador/ExploradorRutas/${u.ID}`}
              className="btn btn-outline-primary rounded-pill me-1 mb-1"
            >
              <FontAwesomeIcon icon="eye" />
            </Link>
          </>
        ),
        ruta: `${u.Ruta}`,
        origen: u.Origen,
        destino: u.Destino,
        fecha: u.Fecha,
        horaSalida: u.Hora,
        noPasajeros: u.NoAsientos,
        noReservados: u.Reservados,
        noConfirmados: u.Confirmados,
        noDisponible: u.Disponible,
      }));
      setResult(transformedData);
    }
  }, [rutes]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          marginTop: "100px",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={result}
        sortable
        pagination
        perPage={10}
      >
        <Row className="justify-content-between mb-3">
          <Col xs="auto">
            <AdvanceTableSearchBox table />
          </Col>
          <Col xs="auto">
            {/* Botón para abrir el modal de filtros */}
            <Button variant="outline-primary" onClick={handleOpenFilterModal}>
              Filtrar
            </Button>
          </Col>
        </Row>
        <hr style={{ margin: "10px 0" }} />
        <AdvanceTable
          table
          headerClassName="bg-200 text-nowrap align-middle"
          rowClassName="align-middle white-space-nowrap"
          tableProps={{
            bordered: true,
            striped: true,
            className: "fs--1 mb-0 overflow-hidden",
          }}
        />
        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={result.length}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>

      {/* Modal de filtros */}
      <Modal
        show={showFilterModal}
        onHide={handleCloseFilterModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="filtroRuta">
              <Form.Label>Ruta</Form.Label>
              <Select
                options={rutasOptions}
                value={selectedRuta}
                onChange={setSelectedRuta}
                placeholder="Todos"
              />
            </Form.Group>

            <Form.Group controlId="filtroFecha" className="mt-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={
                  selectedFecha
                    ? selectedFecha.toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) => setSelectedFecha(new Date(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="filtroHora" className="mt-3">
              <Form.Label>Hora</Form.Label>
              <DatePicker
                selected={selectedHora}
                onChange={(date) => setSelectedHora(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                className="form-control"
                placeholderText="Selecciona una hora"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={applyFilters}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableExploradorRutas;
