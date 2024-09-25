import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { CardLayout } from 'components/dashboards/support-desk/unsolved-tickets/TicketsLayout';
import { tickets } from 'data/dashboard/support-desk';
import { useBreakpoints } from 'hooks/useBreakpoints';
import useBulkSelect from 'hooks/useBulkSelect';
import usePagination from 'hooks/usePagination';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import AllReservasHeader from '../tables/AllReservasHeader'
import ReservaFilterForm from './ReservasFilterForm';
import SubtleBadge from 'components/common/SubtleBadge';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 


const ViewReservasCard = ({reservas, movimientos, estatus, layout}) => {
  const [show, setShow] = useState(false);
  const { breakpoints } = useBreakpoints();
  const [result, setResult] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(reservas)
  const reservaIds = reservas.data.map(reserva => reserva.id);
  const { selectedItems, isSelectedItem, toggleSelectedItem } =
    useBulkSelect(reservaIds);
  const [allReservas] = useState(reservas.data.slice(0, 21));
  const [primaryReservas, setPrimaryReservas] = useState(allReservas);
  const {
    paginationState: {
      data,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray
    },
    nextPage,
    prevPage,
    goToPage
  } = usePagination(primaryReservas, 7);

  const handleReservaSearch = text => {
    console.log("allReservas",allReservas)
    const filteredReservas = allReservas.filter(
      reserva =>
        reserva.Usuario.toLowerCase().includes(text.toLowerCase()) ||
        reserva.Situacion.toLowerCase().includes(text.toLowerCase()) ||
        reserva.Movimiento.toLowerCase().includes(text.toLowerCase())
    );
    setPrimaryReservas(filteredReservas);
  };

  useEffect(() => {
    if (data.length > 0) 
    {
      const transformedData = data.map(u => ({
        User: u.Usuario,
        avatar: {
            name: u.Usuario,
            size: 'xl',
            round: 'circle'
        },
        Mov: `${u.Movimiento}`,
        CreatedAt: u.FechaEmision,
        estatus: (
          <SubtleBadge pill           
            bg={classNames({
            success:  u.Estatus === 'CONCLUIDO',
            primary:  u.Estatus  === 'SINAFECTAR',
            warning: u.Estatus  === 'PENDIENTE',
            secondary: u.Estatus === 'BORRADOR',
            danger: u.Estatus === 'CANCELADO'
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
            color: '#'+u.Color,
            data: u.PorcentajeSituacion
        },
        id: u.ID
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[data])

  const getStatusIcon = (estatus) => {
    switch (estatus) {
      case 'CONCLUIDO':
        return faCheck;
      case 'BORRADOR':
        return faPen;
      case 'PENDIENTE':
        return faStream;
      case 'CANCELADO':
        return faBan;
      case 'SINAFECTAR':
        return faSpinner;
      default:
        return faPaperPlane;
    }
  };

  return (
    <Row className="gx-3">
      <Col xxl={10} xl={9}>
        <Card>
          <Card.Header className="border-bottom border-200 px-0">
            <AllReservasHeader
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
            <div>
              <Button
                variant="falcon-default"
                size="sm"
                className={classNames('me-2', { disabled: !canPreviousPage })}
                onClick={prevPage}
              >
                <FontAwesomeIcon icon="chevron-left" />
              </Button>
            </div>

            <ul className="pagination mb-0">
              {paginationArray.map(page => (
                <li
                  key={page}
                  className={classNames({ active: currentPage === page })}
                >
                  <Button
                    size="sm"
                    variant="falcon-default"
                    className="page me-2"
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                </li>
              ))}
            </ul>
            <div>
              <Button
                variant="falcon-default"
                size="sm"
                className={classNames({ disabled: !canNextPage })}
                onClick={nextPage}
              >
                <FontAwesomeIcon icon="chevron-right" />
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Col>
      <Col xxl={2} xl={3}>
        {breakpoints.down('xl') ? (
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            className="dark__bg-card-dark"
          >
            <Offcanvas.Header closeButton className="bg-body-tertiary">
              <h6 className="fs-0 mb-0 fw-semi-bold">Filtros</h6>
            </Offcanvas.Header>
            <ReservaFilterForm movimientos={movimientos} estatus={estatus}/>
          </Offcanvas>
        ) : (
            <ReservaFilterForm movimientos={movimientos} estatus={estatus}/>
            )}
      </Col>
    </Row>
  );
};

export default ViewReservasCard;
