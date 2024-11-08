import React, { useEffect, useState } from "react";
import {
  Spinner,
  Offcanvas,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import {
  useGetExploradorRutas,
  useGetParadasRutasExp,
} from "../../../../hooks/Exploradores/Rutas/useRutasExplorador";
import "react-datepicker/dist/react-datepicker.css";
import { useGetFiltroModulo } from "../../../../hooks/useFiltros";
import AllParadasRutasHeader from "./ParadasRutasHeader";
import { toast } from "react-toastify";
import TableRowClick from "components/common/advance-table/TableRowClick";
import { useNavigate, useParams } from "react-router-dom";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import RutasFilterForm from "../sections/RutasFilterForm";

const columns = [
  {
    accessor: "noAbordaje",
    Header: "No Abordaje",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "origen",
    Header: "Destino",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "horaAbordaje",
    Header: "Hora de Abordaje",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "horaDescenso",
    Header: "Hora de Descenso",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "capacidadPasajeros",
    Header: "Capacidad Pasajeros",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "reservados",
    Header: "Reservados",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "disponibles",
    Header: "Disponibles",
    headerProps: { className: "text-900" },
  },
];

function TableExploradorRutasParadas({
  reservas,
  movimientos,
  estatus,
  layout,
  setFilter,
  situaciones,
  usuarios,
  filter,
}, ID) {

  const [result, setResult] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { getFiltroModulo, isLoading: isLoadingFiltro } = useGetFiltroModulo();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Estado para los filtros
  const [selectedRuta, setSelectedRuta] = useState(0);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedHora, setSelectedHora] = useState(null);
  const [filters, setFilters] = useState({
    ruta: 0,
    fecha: "",
    hora: "",
  });
  const { id } = useParams(); 
  const idValue = id; 
  const navigate = useNavigate();
  const { getParadasRutes, rutes, isLoading } = useGetParadasRutasExp(idValue);

  const [rutasOptions, setRutasOptions] = useState([]);

  const handleOpenFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      EmpresaID: user.EmpresaID,
      PersonaID: user.ID,
    };

    try {
      //await newReserva({ data });
    } catch (error) {
      toast.error("Hubo un error al crear la reserva", { theme: "colored" });
    }
  };

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
  const handleRowClick = (RutaID, ParadaID) => {
    navigate(`/Explorador/ExploradorRutas/Pasajeros/${RutaID}/${ParadaID}`);
  };
  useEffect(() => {
    if (showFilterModal) {
      fetchRutasOptions();
    }
  }, [showFilterModal]);

  useEffect(() => {
    getParadasRutes();
  }, []);

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
    console.log(rutes);
    if (rutes.status === 200) {
      const transformedData = rutes.data.map((u) => ({
        noAbordaje: `${u.NoParada}`,
        origen: u.Destino,
        horaAbordaje: u.HoraAbordaje,
        horaDescenso: u.HoraDescenso,
        capacidadPasajeros: u.CapacidadPasajeros,
        reservados: u.NumeroDeOcupados,
        disponibles: u.NumeroDeDisponibles,
        id: u.ID,
      }));
      setResult((prevResult) => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
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
      <Row className="gx-3">
        <Col xxl={12} xl={12}>
          <AdvanceTableWrapper
            columns={columns}
            data={result}
            selection
            selectionColumnWidth={52}
            sortable
            pagination
            perPage={10}
            rowCount={result.length}
          >
            <Card>
              <Card.Header className="border-bottom border-200 px-0">
                <AllParadasRutasHeader
                  table
                  layout={layout}
                  handleShow={handleShow}
                  handleClick={handleClick}
                  isLoading={isLoading}
                />
              </Card.Header>
              <Card.Body className="p-0">
                <TableRowClick
                  table
                  headerClassName="bg-body-tertiary align-middle"
                  rowClassName="align-middle white-space-nowrap"
                  onRowClick={(id, noAbordaje) =>
                    handleRowClick(id, noAbordaje)
                  }
                  tableProps={{
                    bordered: false,
                    className: "fs--1 mb-0 overflow-hidden",
                  }}
                />
              </Card.Body>
              <Card.Footer>
                <AdvanceTablePagination table />
              </Card.Footer>
            </Card>
          </AdvanceTableWrapper>
        </Col>
        <Col xxl={2} xl={3}>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            className="dark__bg-card-dark"
          >
            <Offcanvas.Header closeButton className="bg-body-tertiary">
              <h6 className="fs-0 mb-0 fw-semi-bold">Filtros</h6>
            </Offcanvas.Header>
            <RutasFilterForm
              movimientos={movimientos}
              estatus={estatus}
              setFilter={setFilter}
              usuarios={usuarios}
              situaciones={situaciones}
              filter={filter}
            />
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
}

export default TableExploradorRutasParadas;
