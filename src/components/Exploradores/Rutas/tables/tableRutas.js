import React, { useEffect, useState } from "react";
import {
  Spinner,
  Button,
  Modal,
  Form,
  Offcanvas,
  Card,
  Row,
  Col,
} from "react-bootstrap";
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
import AllRutasHeader from "./AllRutasHeader";
import { toast } from "react-toastify";
import TableRowClick from "components/common/advance-table/TableRowClick";
import { useNavigate } from "react-router-dom";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import RutasFilterForm from "../sections/RutasFilterForm";

const columns = [
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
];

function TableExploradorRutas({
  rutes,
  movimientos,
  estatus,
  layout,
  setFilter,
  situaciones,
  filter,
}) {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Estado para los filtros

  const [filters, setFilters] = useState({
    ruta: 0,
    fecha: "",
    hora: "",
  });
  const navigate = useNavigate();

  const handleRowClick = (ID) => {
    navigate(`/Explorador/ExploradorRutas/ParadasRuta/${ID}`);
  };


  useEffect(() => {
    if (rutes.status === 200) {
      const transformedData = rutes.data.map((u) => ({
        ruta: `${u.Ruta}`,
        origen: u.Origen,
        destino: u.Destino,
        fecha: u.FechaSalida,
        horaSalida: u.HoraSalida,
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
                <AllRutasHeader
                  table
                  layout={layout}
                  handleShow={handleShow}
                />
              </Card.Header>
              <Card.Body className="p-0">
                <TableRowClick
                  table
                  headerClassName="bg-body-tertiary align-middle"
                  rowClassName="align-middle white-space-nowrap"
                  onRowClick={(id) => handleRowClick(id)}
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
              filter={filter}
            />
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
}

export default TableExploradorRutas;
