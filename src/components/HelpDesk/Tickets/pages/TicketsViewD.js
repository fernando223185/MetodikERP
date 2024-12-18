import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';
import { useGetTicketID } from 'hooks/HelpDesk/Tickets/useTicketD';
import { useGetTickets } from 'hooks/HelpDesk/Tickets/useTickets';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faExclamation, faBell,faStar } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TicketsViewD = () => {
    const {id} = useParams();
    const {getTicketID, ticketID, isLoading, error} = useGetTicketID();
    const {getTickets,tickets,isLoading:isLoadingTickets} = useGetTickets();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() =>{
        if (id != null && id > 0) {
            getTicketID({ id })
            getTickets({ id })

        }
    }, [id, hasFetched])

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

    if (isLoading || isLoadingTickets ) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        );
    }

    return (
        <>
          <Card className="mb-3">
            <Card.Body>
              <Row className="justify-content-between align-items-center">
                <Col md>
                  <h5 className="mb-2 mb-md-0">Ticket: {ticketID.NumeroTicket}</h5>
                </Col>
                <Col xs="auto">
                    <Link to="/HelpDesk/tickets">
                        <IconButton
                            variant="falcon-default"
                            size="sm"
                            icon="reply"
                            className="me-1 mb-2 mb-sm-0"
                            iconClassName="me-1"
                        >
                            Regresar
                        </IconButton>
                    </Link>
                  <Link to={`/HelpDesk/ticket/${ticketID.ID}`}>
                    <IconButton
                        variant="falcon-primary"
                        size="sm"
                        icon="edit"
                        className="mb-2 mb-sm-0"
                    >
                        Editar
                    </IconButton>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
    
          <Card>
            <Card.Body>
              <Row className="align-items-center text-center mb-3">
                <Col sm={6} className="text-sm-start">
                  <img src={logoInvoice} alt="invoice" width={250} />
                </Col>
                <Col className="text-sm-end mt-3 mt-sm-0">
                  <h2 className="mb-3">{ticketID.Nombre}</h2>
                  <h5>{ticketID.Agente}</h5>
                <SubtleBadge pill           
                    bg={classNames({
                    success:  ticketID.Estatus === 'CONCLUIDO',
                    warning: ticketID.Estatus  === 'PENDIENTE',
                    secondary: ticketID.Estatus === 'EN PROCESO',
                    danger: ticketID.Estatus === 'CANCELADO'
                })} 
                className="fs--2 ms-2 " 
                >
                    {ticketID.Estatus}
                    <FontAwesomeIcon
                    transform="shrink-2"
                    className="ms-1"
                    />
    
                </SubtleBadge> 
                <br></br>
                <SubtleBadge pill           
                    bg={classNames({
                    secondary:  ticketID.Prioridad === 'BAJA',
                    warning: ticketID.Prioridad  === 'MEDIA',
                    danger: ticketID.Prioridad === 'ALTA'
                })}
                className="fs--2 ms-2 mt-2" 
                >
                    {ticketID.Prioridad}
                    <FontAwesomeIcon
                    icon={getPrioridadIcon(ticketID.Prioridad)}
                    transform="shrink-2"
                    className="ms-1"
                    />
                </SubtleBadge>             
              </Col>
                <Col xs={12}>
                  <hr />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <h5>{ticketID.EmpresaNombre}</h5>
                  <p className="fs--1">
                    {ticketID.EmpresaRFC}
                    <br />
                    {ticketID.EmpresaDireccion}
                  </p>
                  <p className="fs--1">
                    <a href="#">{ticketID.EmpresaTelefonos}</a>
                  </p>
                </Col>
                <Col sm="auto" className="ms-auto">
                  <div className="table-responsive">
                    <Table borderless size="sm" className="fs--1">
                      <tbody>
                        <tr>
                          <th className="text-sm-end">Descripcion:</th>
                          <td>{ticketID.Descripcion}</td>
                        </tr>
                        {ticketID.Estatus === 'CONCLUIDO' && (
                          <tr>
                            <th className="text-sm-end">Fecha de Conclusion:</th>
                            <td>{ticketID.UltimoCambio}</td>
                          </tr>
                        )}
                        {(ticketID.Estatus === 'EN PROCESO' || ticketID.Estatus === 'CONCLUIDO') && (
                          <tr>
                            <th className="text-sm-end">Fecha de Inicio:</th>
                            <td>{ticketID.FechaInicioProceso} </td>
                          </tr>
                        )}
                        <tr>
                          <th className="text-sm-end">Concepto:</th>
                          <td>{ticketID.Concepto}</td>
                        </tr>
                        <tr>
                          <th className="text-sm-end">Area:</th>
                          <td>{ticketID.Area}</td>
                        </tr>
                        <tr>
                          <th className="text-sm-end">Fecha Emision:</th>
                          <td>{ticketID.FechaEmision}</td>
                        </tr>
                        {(ticketID.Estatus === 'EN PROCESO' || ticketID.Estatus === 'CONCLUIDO') && (
                          <tr>
                            <th className="text-sm-end">Ultimo Cambio:</th>
                            <td>{ticketID.UltimoCambio}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
    
              {/*<div className="mt-4 fs--1">
                <SimpleBarReact>
                  <Table striped className="border-bottom">
                    <thead data-bs-theme="light">
                      <tr className="dark__bg-1000" style={{ backgroundColor: '#A66595' }}>
                        <th className="text-white border-0">Viaje</th>
                        <th className="text-white border-0 text-center">
                          Cantidad
                        </th>
                        <th className="text-white border-0 text-end">Asientos</th>
                        <th className="text-white border-0 text-end">Importe total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {reservaD.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle">
                            <h6 className="mb-0 text-nowrap">{item.Descripcion}</h6>
                            </td>
                            <td className="align-middle text-center">{item.Cantidad}</td>
                            <td className="align-middle text-end">{item.Asientos}</td>
                            <td className="align-middle text-end">{item.PrecioTotal}</td>
                        </tr>
                    ))}
                    </tbody>
                  </Table>
                </SimpleBarReact>
              </div>*/}
            </Card.Body>
          </Card>
        </>
      );
}
export default TicketsViewD;