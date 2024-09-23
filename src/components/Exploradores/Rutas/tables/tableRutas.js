import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import { useGetExploradorRutas } from "../../../../hooks/Exploradores/Rutas/useRutasExplorador";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import SubtleBadge from "components/common/SubtleBadge";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formToShow, setFormToShow] = useState("");
  const [EmpresaID, setEmpresaID] = useState(0);

  const handleEditUserClick = (user) => {
    setFormToShow("EditUser");
    setSelectedUser(user); // Selecciona el usuario para editar
    setLgShow(true); // Abre el modal
  };

  useEffect(() => {
    getProfiles();
  }, []);

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
        <Row className="justify-content-start mb-3">
          <Col xs="auto">
            <AdvanceTableSearchBox table />
          </Col>
          <Col xs="auto" sm={6} lg={4} className="ms-auto text-end"></Col>
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
    </>
  );
}

export default TableExploradorRutas;
