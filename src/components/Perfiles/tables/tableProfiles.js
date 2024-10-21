import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import { useGetProfiles } from "../../../hooks/Catalogos/Perfiles/usePerfiles";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Offcanvas, Spinner } from "react-bootstrap";

import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import SubtleBadge from "components/common/SubtleBadge";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfilesHeader from './PerfilesHeader'
import TableRowClick from 'components/common/advance-table/TableRowClick';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { useBreakpoints } from 'hooks/useBreakpoints';
import PerfilesFilterForm from '../sections/PerfilesFilterForm'
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import classNames from 'classnames';





const columns = [
  {
    accessor: "estatus",
    Header: "Estatus",
    headerProps: { className: "text-900" },
    cellProps: { className: "text-center" },
  },
  {
    accessor: "nombre",
    Header: "Nombre",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "notas",
    Header: "Notas",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "empresa",
    Header: "Empresa",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "fechaRegistro",
    Header: "Fecha de Registro",
    headerProps: { className: "text-900" },
  },
  {
    accessor: "fechaModificacion",
    Header: "Ultima Modificacion",
    headerProps: { className: "text-900" },
  },
];

function TableProfiles({ reservas, movimientos }) {
  const { getProfiles, profiles, isLoading } = useGetProfiles();
  const [result, setResult] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formToShow, setFormToShow] = useState("");
  const [EmpresaID, setEmpresaID] = useState(0);
  const [reload, setReload] = useState(false); // Estado para controlar la recarga de la tabla
  const [filters, setFilters] = useState({
    searchText: "",
    startDate: "",
    endDate: "",
    searchEstatus: "",
  }); // Estado para los filtros

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { breakpoints } = useBreakpoints();
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    console.log("This is ID", id);
    navigate(`/Catalogo/Perfil/${id}`);
  };


  // Actualizar el useEffect para utilizar los filtros
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    setEmpresaID(user.EmpresaID);
    console.log(user);
    const data = {
      EmpresaID: user.EmpresaID,
      EstatusID: filters.searchEstatus || 1, // Utilizar el estatus seleccionado
      searchText: filters.searchText  || '', // Buscar texto si está presente
      startDate: filters.startDate, // Fecha de inicio
      endDate: filters.endDate,     // Fecha de fin
    };
    getProfiles({ data });
  }, [reload, filters]); // Ejecutar cuando `reload` o `filters` cambian

  useEffect(() => {
    if (profiles.status === 200) {
      const transformedData = profiles.data.map((u) => ({
        nombre: `${u.Nombre}`,
        notas: u.Notas,
        empresa: u.EmpresaNombre,
        estatus: (
          <SubtleBadge
            pill
            bg={classNames({
              success: u.EstatusID === 1,
              danger: u.EstatusID === 2,
            })}
            className="fs--2"
          >
            {u.Estatus}
            <FontAwesomeIcon
              icon={getStatusIcon(u.Estatus)}
              transform="shrink-2"
              className="ms-1"
            />
          </SubtleBadge>
        ),
        rfc: u.RFC,
        id: u.ID,
      }));
      setResult((prevResult) => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  }, [profiles]);

  const getStatusIcon = (estatus) => {
    switch (estatus) {
      case "ALTA":
        return faCheck;
      case "BAJA":
        return faBan;
      default:
        return faPaperPlane;
    }
  };

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
        <Col xxl={9} xl={5}>
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
                <PerfilesHeader
                  table
                  layout="table-view"
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
        <Col xxl={3} xl={5}>
          {breakpoints.down("xl") ? (
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement="end"
              className="dark__bg-card-dark"
            >
              <Offcanvas.Header closeButton className="bg-body-tertiary">
                <h6 className="fs-0 mb-0 fw-semi-bold">Filter</h6>
              </Offcanvas.Header>
              <PerfilesFilterForm
                movimientos={movimientos}
                setReload={setReload} // Pasamos el setReload como prop
                setFilters={setFilters} // Pasar la función para actualizar los filtros
              />
            </Offcanvas>
          ) : (
            <PerfilesFilterForm
              movimientos={movimientos}
              setReload={setReload} // Pasamos el setReload como prop
              setFilters={setFilters} // Pasar la función para actualizar los filtros

            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default TableProfiles;

