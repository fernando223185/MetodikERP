import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Spinner,
  Card,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import SubtleBadge from "components/common/SubtleBadge";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  faPaperPlane,
  faCheck,
  faStream,
  faPen,
  faBan,
  faSpinner,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  useActPreciosRuta,
  useAfectarPreciosRuta,
} from "../../../../hooks/Logistica/PreciosRutas/usePreciosRutas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PreciosRutasHeader from "./PreciosRutasHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import PropTypes from "prop-types";
import { useBreakpoints } from "hooks/useBreakpoints";
import PreciosRutasFilterForm from "../sections/PreciosRutasFiilterForm";
import Flex from "components/common/Flex";
import Avatar from "components/common/Avatar";
import IconButton from "components/common/IconButton";

function TablePreciosRutas({
  preciosruta,
  destinos,
  layout,
  setFilter,
  filter,
}) {
  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState("");

  const { ActPreciosRuta, result: response, isLoading } = useActPreciosRuta();
  const {
    AfectarPreciosRuta,
    result: responseAfectar,
    isLoading: isLoadingAfectar,
  } = useAfectarPreciosRuta();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { breakpoints } = useBreakpoints();

  const handleInputChange = (id, field, value) => {
    setResult((prevResult) =>
      prevResult.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleButtonClick = async (row) => {
    const data = {
      ID: row.id,
      PrecioAdulto: row.adulto === "" ? 0 : row.adulto,
      PrecioInfantil: row.infantil === "" ? 0 : row.infantil,
      PrecioInapam: row.inapam === "" ? 0 : row.inapam,
      PrecioRedondo: row.redondo === "" ? 0 : row.redondo,
    };

    console.log(data);
    ActPreciosRuta({ data });
  };

  useEffect(() => {
    if (
      preciosruta &&
      preciosruta.status === 200 &&
      preciosruta.data.length > 0
    ) {
      const transformedData = preciosruta.data.map((u) => ({
        avatar: {
          name: u.Ruta,
          size: "xl",
          round: "circle",
        },
        ruta: u.Ruta,
        adulto: u.PrecioAdulto || "",
        infantil: u.PrecioInfantil || "",
        inapam: u.PrecioInapam || "",
        redondo: u.PrecioRedondo || "",
        ulimocambio: u.UltimoCambio,
        id: u.ID,
      }));
      setResult(transformedData);
    }
  }, [preciosruta]);

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      EmpresaID: user.EmpresaID,
    };
    console.log(data);
    AfectarPreciosRuta({ data });
  };

  useEffect(() => {
    if (responseAfectar && responseAfectar.status === 200) {
      toast[responseAfectar.data[0].Tipo](responseAfectar.data[0].Mensaje, {
        theme: "colored",
      });
    }
  }, [responseAfectar]);

  useEffect(() => {
    if (response && response.status === 200) {
      toast[response.data[0].Tipo](response.data[0].Mensaje, {
        theme: "colored",
      });
    }
  }, [response]);

  const handleRowClick = (id) => {
    //navigate(/logistica/rutas/view-rutas/${id});
  };

  // Definir `columns` después de las funciones
  const columns = [
    {
      accessor: "acciones",
      Header: "Acciones",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-5",
      },
      Cell: (rowData) => (
        <IconButton
          variant="falcon-default"
          size="sm"
          icon={faSave}
          transform="shrink-3"
          iconAlign="middle"
          onClick={() => handleButtonClick(rowData.row.original)} // Pasa la fila completa a la función
        >
          <span className="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">
            Guardar
          </span>
        </IconButton>
      ),
    },
    {
      accessor: "ruta",
      Header: "Ruta",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-7",
      },
      Cell: (rowData) => {
        const { ruta, avatar } = rowData.row.original;
        return (
          <Flex alignItems="center" className="position-relative py-1">
            {avatar && avatar.img ? (
              <Avatar src={avatar.img} size="xl" className="me-2" />
            ) : (
              <Avatar
                size="xl"
                name={avatar ? avatar.name : ruta}
                className="me-2"
              />
            )}
            <h6 className="mb-0">
              <Link
                to="#"
                className="stretched-link text-900"
                onClick={(e) => e.stopPropagation()}
              >
                {ruta}
              </Link>
            </h6>
          </Flex>
        );
      },
    },
    {
      accessor: "adulto",
      Header: "(ADULTO)",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-6",
      },
      Cell: (rowData) => (
        <Form.Control
          type="number"
          value={rowData.row.original.adulto}
          onChange={(e) =>
            handleInputChange(rowData.row.original.id, "adulto", e.target.value)
          }
          className="w-100"
          style={{
            minWidth: "100px", // ancho mínimo para que el valor se vea
            padding: "8px 12px", // padding interno para el input
            textAlign: "righ", // opcional: centra el texto en el input
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      accessor: "infantil",
      Header: "(NIÑO)",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-6",
      },
      Cell: (rowData) => (
        <Form.Control
          type="number"
          value={rowData.row.original.infantil}
          onChange={(e) =>
            handleInputChange(
              rowData.row.original.id,
              "infantil",
              e.target.value
            )
          }
          className="w-100"
          style={{
            minWidth: "100px", // ancho mínimo para que el valor se vea
            padding: "8px 12px", // padding interno para el input
            textAlign: "righ", // opcional: centra el texto en el input
          }}
        />
      ),
    },
    {
      accessor: "inapam",
      Header: "(INAPAM)",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-6",
      },
      Cell: (rowData) => (
        <Form.Control
          type="number"
          value={rowData.row.original.inapam || ""}
          onChange={(e) =>
            handleInputChange(rowData.row.original.id, "inapam", e.target.value)
          }
          className="w-100"
          style={{
            minWidth: "100px", // ancho mínimo para que el valor se vea
            padding: "8px 12px", // padding interno para el input
            textAlign: "righ", // opcional: centra el texto en el input
          }}
        />
      ),
    },
    {
      accessor: "redondo",
      Header: "(REDONDO)",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-1 pe-6",
      },
      Cell: (rowData) => (
        <Form.Control
          type="number"
          value={rowData.row.original.redondo}
          onChange={(e) =>
            handleInputChange(
              rowData.row.original.id,
              "redondo",
              e.target.value
            )
          }
          className="w-100"
          style={{
            minWidth: "100px", // ancho mínimo para que el valor se vea
            padding: "8px 12px", // padding interno para el input
            textAlign: "righ", // opcional: centra el texto en el input
          }}
        />
      ),
    },
    {
      accessor: "ulimocambio",
      Header: "Ultimo Cambio",
      headerProps: { className: "text-1300" },
      cellProps: {
        className: "py-2 pe-7",
      },
    },
  ];

  return (
    <Row className="gx-3">
      <Col>
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
              <PreciosRutasHeader
                table
                layout={layout}
                handleShow={handleShow}
                handleClick={handleClick}
                isLoadingAfectar={isLoadingAfectar}
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
          <PreciosRutasFilterForm
            destinos={destinos}
            setFilter={setFilter}
            filter={filter}
          />
        </Offcanvas>
      </Col>
    </Row>
  );
}

export default TablePreciosRutas;
