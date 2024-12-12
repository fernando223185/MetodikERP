import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { CardLayout } from "components/dashboards/support-desk/unsolved-tickets/TicketsLayout";
import { useBreakpoints } from "hooks/useBreakpoints";
import useBulkSelect from "hooks/useBulkSelect";
import usePagination from "hooks/usePagination";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Offcanvas, Row } from "react-bootstrap";
import PreciosRutasHeader from "../tables/PreciosRutasHeader";
import PreciosRutasFilterForm from "./PreciosRutasFiilterForm";
import SubtleBadge from "components/common/SubtleBadge";
import {
  faPaperPlane,
  faCheck,
  faStream,
  faPen,
  faBan,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ViewPreciosRutasCard = ({
  preciosruta,
  destinos,
  layout,
  setFilter,
}) => {
  const [show, setShow] = useState(false);
  const { breakpoints } = useBreakpoints();
  const [result, setResult] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(preciosruta);
  const reservaIds = preciosruta.data.map((reserva) => reserva.id);
  const { selectedItems, isSelectedItem, toggleSelectedItem } =
    useBulkSelect(reservaIds);
  const [allReservas] = useState(preciosruta.data);
  const [primaryReservas, setPrimaryReservas] = useState(allReservas);
  const {
    paginationState: {
      data,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray,
    },
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(primaryReservas, 7)

  const handleReservaSearch = (text) => {
    console.log("allReservas", allReservas);
    const filteredReservas = allReservas.filter(
      (reserva) =>
        reserva.Usuario.toLowerCase().includes(text.toLowerCase()) ||
        reserva.Situacion.toLowerCase().includes(text.toLowerCase()) ||
        reserva.Movimiento.toLowerCase().includes(text.toLowerCase())
    );
    setPrimaryReservas(filteredReservas);
  };

  useEffect(() => {
    if (data.length > 0) {
      const transformedData = data.map((u) => ({
        User: u.Ruta,
        avatar: {
          name: u.Ruta,
          size: "xl",
          round: "circle",
        },
        Mov: `${u.Movimiento}`,
        CreatedAt: u.FechaEmision,
        estatus: (
          <SubtleBadge
            pill
            bg={classNames({
              success: u.Estatus === "CONCLUIDO",
              primary: u.Estatus === "SINAFECTAR",
              warning: u.Estatus === "PENDIENTE",
              secondary: u.Estatus === "BORRADOR",
              danger: u.Estatus === "CANCELADO",
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
        referencia: u.Referencia,
        observaciones: u.Observaciones,
        importe: u.ImporteTotal,
        priority: {
          title: u.Situacion,
          color: "#" + u.Color,
          data: u.PorcentajeSituacion,
        },
        id: u.ID,
      }));
      setResult((prevResult) => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  }, [data]);

  const getStatusIcon = (estatus) => {
    switch (estatus) {
      case "CONCLUIDO":
        return faCheck;
      case "BORRADOR":
        return faPen;
      case "PENDIENTE":
        return faStream;
      case "CANCELADO":
        return faBan;
      case "SINAFECTAR":
        return faSpinner;
      default:
        return faPaperPlane;
    }
  };

  return (
    <Row className="gx-3">
      <Col>
        <Card
          style={{
            minWidth: "1100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card.Header className="border-bottom border-200 px-0">
            <PreciosRutasHeader
              layout={layout}
              handleShow={handleShow}
              selectedItems={selectedItems}
              handleTicketsSearch={handleReservaSearch}
            />
          </Card.Header>
          <Card.Body className="bg-body-tertiary">
            <CardLayout
              data={result}
              isSelectedItem={isSelectedItem}
              toggleSelectedItem={toggleSelectedItem}
            />
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Button
              variant="falcon-default"
              size="sm"
              className={classNames("me-2", { disabled: !canPreviousPage })}
              onClick={prevPage}
            >
              <FontAwesomeIcon icon="chevron-left" />
            </Button>

            <ul className="pagination mb-0">
              {paginationArray
                .filter(
                  (page) =>
                    page === 1 ||
                    page === allReservas || 
                    Math.abs(page - currentPage) <= 2
                )
                .map((page, index, arr) => {
                  const isEllipsis = index > 0 && page - arr[index - 1] > 1;
                  return (
                    <React.Fragment key={page}>
                      {isEllipsis && (
                        <li className="page-item disabled">...</li>
                      )}
                      <li
                        className={classNames("page-item", {
                          active: currentPage === page,
                        })}
                      >
                        <Button
                          size="sm"
                          variant="falcon-default"
                          className="page mx-1"
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Button>
                      </li>
                    </React.Fragment>
                  );
                })}
            </ul>

            <Button
              variant="falcon-default"
              size="sm"
              className={classNames("ms-2", { disabled: !canNextPage })}
              onClick={nextPage}
            >
              <FontAwesomeIcon icon="chevron-right" />
            </Button>
          </Card.Footer>
        </Card>
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
          <PreciosRutasFilterForm destinos={destinos} setFilter={setFilter} />
        </Offcanvas>
      </Col>
    </Row>
  );
};

export default ViewPreciosRutasCard;
