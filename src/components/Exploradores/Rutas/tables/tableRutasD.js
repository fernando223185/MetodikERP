import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import {
  useGetExploradorRutas,
  useGetExploradorRutasID,
} from "../../../../hooks/Exploradores/Rutas/useRutasExplorador";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import SubtleBadge from "components/common/SubtleBadge";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faReply, faBan } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    accessor: "lugar",
    Header: "Lugar",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "pasajero",
    Header: "Pasajero",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "telefono",
    Header: "Telefono",
    headerProps: { className: "text-900" },
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
    accessor: "importe",
    Header: "Importe",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "agente",
    Header: "Agente",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "estatus",
    Header: "Estatus",
    headerProps: { className: "text-900" },
  },
];

function TableExploradorRutasD(ID) {
  const Id = ID.ID;
  const { getRutesID, rutesID, isLoading } = useGetExploradorRutasID(Id);

  const [result, setResult] = useState([]);

  useEffect(() => {
    getRutesID();
  }, []);

  useEffect(() => {
    if (rutesID.status === 200) {
      const transformedData = rutesID.data.map((u) => ({
        lugar: `${u.Lugar}`,
        pasajero: u.Pasajero,
        telefono: u.Telefono,
        origen: u.Origen,
        destino: u.Destino,
        importe: u.Importe,
        agente: u.Agente,
        estatus: (() => {
          if (u.Estatus === "Por Confirmar") {
            return (
              <SubtleBadge pill bg="warning" className="fs--2">
                {u.Estatus}
              </SubtleBadge>
            );
          } else if (u.Estatus === "Confirmado") {
            return (
              <SubtleBadge pill bg="success" className="fs--2">
                Inactive
              </SubtleBadge>
            );
          } else if (u.Estatus === "Pagado") {
            return (
              <SubtleBadge pill bg="success" className="fs--2">
                Pending
              </SubtleBadge>
            );
          } else if (u.Estatus === "No confirmado") {
            return (
              <SubtleBadge pill bg="danger" className="fs--2">
                Pending
              </SubtleBadge>
            );
          }
        })(),
      }));
      setResult(transformedData);
    }
  }, [rutesID]);

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
        perPage={30}
      >
        <Row className="justify-content-start mb-3">
          <Col xs="auto">
            <AdvanceTableSearchBox table />
          </Col>
          <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
            <Link
              to={`/Explorador/ExploradorRutas/`}
              className="btn btn-outline-primary rounded-pill me-1 mb-1"
            >
              <FontAwesomeIcon icon={faReply} />
            </Link>
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
    </>
  );
}

export default TableExploradorRutasD;
