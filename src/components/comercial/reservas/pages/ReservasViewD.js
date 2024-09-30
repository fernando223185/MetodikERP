import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';
import { useGetReservaID, useGetReservaD } from '../../../../hooks/Comercial/Reserva/useReservaD';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const ReservasViewD = () => {

    const { id } = useParams();
    const { getReservaID, reservaId, isLoading, error } = useGetReservaID();
    const { getReservaD, reservaD, isLoading: isLoadingD } = useGetReservaD();
    const [hasFetched, setHasFetched] = useState(false); 


    useEffect(() =>{
        if (id != null && id > 0) {
          getReservaID({ id })
          getReservaD({ id })

        }
      }, [id, hasFetched])
    
    console.log(reservaId)

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

    if (isLoading || isLoadingD ) {
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
              <h5 className="mb-2 mb-md-0">Orden: {reservaId.Folio}</h5>
            </Col>
            <Col xs="auto">
                <Link to="/comercial/reservas">
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

              <IconButton
                variant="falcon-default"
                size="sm"
                icon="arrow-down"
                className="me-1 mb-2 mb-sm-0"
                iconClassName="me-1"
              >
                Descargar (.pdf)
              </IconButton>
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="print"
                iconClassName="me-1"
                className="me-1 mb-2 mb-sm-0"
              >
                Imprimir
              </IconButton>
              <Link to={`/comercial/reservas/reservaD/${reservaId.ID}`}>
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
              <h2 className="mb-3">{reservaId.Movimiento}</h2>
              <h5>{reservaId.Agente}</h5>
            <SubtleBadge pill           
                bg={classNames({
                success:  reservaId.Estatus === 'CONCLUIDO',
                primary:  reservaId.Estatus  === 'SINAFECTAR',
                warning: reservaId.Estatus  === 'PENDIENTE',
                secondary: reservaId.Estatus === 'BORRADOR',
                danger: reservaId.Estatus === 'CANCELADO'
            })} 
            className="fs--2 ms-2 " 
            >
                {reservaId.Estatus}
                <FontAwesomeIcon
                icon={getStatusIcon(reservaId.Estatus)}
                transform="shrink-2"
                className="ms-1"
                />

            </SubtleBadge> 
            <br></br>
            <SubtleBadge pill           
                bg={classNames({
                success:  reservaId.Situacion === 'Confirmado' || reservaId.Situacion === 'Pagado' || reservaId.Situacion === 'Abordado',
                warning: reservaId.Situacion  === 'Por Confirmar',
                danger: reservaId.Situacion === 'No confirmado'
            })}
            className="fs--2 ms-2 mt-2" 
            >
                {reservaId.Situacion} 
            </SubtleBadge>             
          </Col>
            <Col xs={12}>
              <hr />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <h5>{reservaId.EmpresaNombre}</h5>
              <p className="fs--1">
                {reservaId.EmpresaRFC}
                <br />
                {reservaId.EmpresaDireccion}
              </p>
              <p className="fs--1">
                <a href="#">{reservaId.EmpresaTelefonos}</a>
              </p>
            </Col>
            <Col sm="auto" className="ms-auto">
              <div className="table-responsive">
                <Table borderless size="sm" className="fs--1">
                  <tbody>
                    <tr>
                      <th className="text-sm-end">Referencia:</th>
                      <td>{reservaId.Referencia}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Observaciones:</th>
                      <td>{reservaId.Observaciones}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Fecha Emision:</th>
                      <td>{reservaId.FechaEmision}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Ruta:</th>
                      <td>{reservaId.RutaNombre}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Forma de Pago:</th>
                      <td>{reservaId.FormaPago}</td>
                    </tr>
                    <tr className="alert alert-success fw-bold">
                      <th className="text-success-emphasis text-sm-end">
                        Importe Total:
                      </th>
                      <td className="text-success-emphasis">{reservaId.ImporteTotal}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          <div className="mt-4 fs--1">
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
          </div>

          <Row className="justify-content-end">
            <Col xs="auto">
              <Table borderless size="sm" className="fs--1 text-end">
                <tbody>
                  <tr>
                    <th className="text-900">Subtotal:</th>
                    <td className="fw-semi-bold">{reservaId.SubTotal}</td>
                  </tr>
                  <tr>
                    <th className="text-900">Impuestos:</th>
                    <td className="fw-semi-bold">{reservaId.Impuestos}</td>
                  </tr>
                  <tr className="border-top border-top-2 fw-bolder text-900">
                    <th className="text-900">Importe total:</th>
                    <td className="text-900">{reservaId.ImporteTotal}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReservasViewD;
