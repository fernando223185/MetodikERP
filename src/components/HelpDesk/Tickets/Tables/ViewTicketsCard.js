import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useBreakpoints } from 'hooks/useBreakpoints';
import useBulkSelect from 'hooks/useBulkSelect';
import usePagination from 'hooks/usePagination';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import TicketsFilterForm from '../sections/TicketsFilterForm';
import SubtleBadge from 'components/common/SubtleBadge';
import { faPaperPlane, faExclamation, faBell } from '@fortawesome/free-solid-svg-icons'; 
import { CardLayout } from '../sections/TicketsCardLayout';
import AllTicketsHeader from '../sections/AllTicketsHeader';

const ViewTicketsCard = ({ tickets, estatus, personas, areas, prioridad, layout, setFilter, filter}) => {
    const [show, setShow] = useState(false);
    const { breakpoints } = useBreakpoints();
    const [result, setResult ] = useState([]);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ticketsIds = tickets.data.map(ticket => ticket.id);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(ticketsIds);
    const [allTickets] = useState(tickets.data.slice(0, 21));
    const [primaryTickets, setPrimaryTickets ] = useState(allTickets);
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
      } = usePagination(primaryTickets, 7);

      const handleTicketsSearch = text => {
        console.log("allTickets", allTickets)
        const filteredTickets = allTickets.filter(
          ticket =>
            ticket.Prioridad.toLowerCase().includes(text.toLowerCase())
        );
        setPrimaryTickets(filteredTickets);
      };

      useEffect(() => {
          if (data.length > 0) 
          {
            const transformedData = data.map(u => ({
              User: u.Persona,
              avatar: {
                  name: u.Persona,
                  size: 'xl',
                  round: 'circle'
              },
              Mov: `${u.Nombre}`,
              CreatedAt: u.FechaEmision,
              prioridad: (
                <SubtleBadge pill           
                    bg={classNames({
                    warning: u.Prioridad  === 'MEDIA',
                    secondary: u.Prioridad === 'BAJA',
                    danger: u.Prioridad === 'ALTA'
                })} 
                className="fs--2" 
                >
                    {u.Prioridad}
                    <FontAwesomeIcon
                    icon={getPrioridadIcon(u.Prioridad)}
                    transform="shrink-2"
                    className="ms-1"
                    />
        
                </SubtleBadge>
              ),
              descripcion: u.Descripcion,
              concepto: u.Concepto,
              area: u.Area,
              estatus: {
                title: u.Estatus,
                color: '#'+u.Color,
                data: u.PorcentajeEstatus
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

        const getPrioridadIcon = (prioridad) => {
            switch (prioridad) {
              case 'ALTA':
                return faExclamation;
              case 'MEDIA':
                return faBell;
              case 'BAJA':
                return faBell;
              default:
                return faPaperPlane;
            }
        };

    return (
        <Row className="gx-3">
            <Col>
            <Card style={{ minWidth: '1100px', display: 'flex', flexDirection: 'column' }}>
                <Card.Header className="border-bottom border-200 px-0">
                <AllTicketsHeader
                    layout={layout}
                    handleShow={handleShow}
                    selectedItems={selectedItems}
                    handleTicketsSearch={handleTicketsSearch}
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
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    placement="end"
                    className="dark__bg-card-dark"
                >
                    <Offcanvas.Header closeButton className="bg-body-tertiary">
                    <h6 className="fs-0 mb-0 fw-semi-bold">Filtros</h6>
                    </Offcanvas.Header>
                    <TicketsFilterForm  estatus={estatus} personas={personas} areas={areas} prioridad={prioridad} setFilter={setFilter} filter={filter} />
                </Offcanvas>
            </Col>
        </Row>
    );
}

export default ViewTicketsCard;