import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';
import { useGetRutaID, useGetRutaD } from '../../../../hooks/Logistica/Ruta/useRutaD';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const RutasViewD = () => {

    const { id } = useParams();
    const { getRutaID, rutaId, isLoading, error } = useGetRutaID();
    const { getRutaD, rutaD, isLoading: isLoadingD } = useGetRutaD();
    const [hasFetched, setHasFetched] = useState(false); 


    useEffect(() =>{
        if (id != null && id > 0) {
          getRutaID({ id })
          getRutaD({ id })

        }
      }, [id, hasFetched])
    
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
    
      const handleClickPDF = async () => {
          var data = {
            ID: id
          }
          //verPDF({data})
      }

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
              <h5 className="mb-2 mb-md-0">Orden: {rutaId.Folio}</h5>
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
                onClick={handleClickPDF}
              >
                Descargar (.pdf)
              </IconButton>
             {/*  <IconButton
                variant="falcon-default"
                size="sm"
                icon="print"
                iconClassName="me-1"
                className="me-1 mb-2 mb-sm-0"
              >
                Imprimir
              </IconButton>  */}
              <Link to={`/logistica/rutas/rutasD/${rutaId.ID}`}>
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
              <h2 className="mb-3">{rutaId.Folio}</h2>
              <h5>{rutaId.Agente}</h5>
            <SubtleBadge pill           
                bg={classNames({
                success:  rutaId.Estatus === 'CONCLUIDO',
                primary:  rutaId.Estatus  === 'SINAFECTAR',
                warning: rutaId.Estatus  === 'PENDIENTE',
                secondary: rutaId.Estatus === 'BORRADOR',
                danger: rutaId.Estatus === 'CANCELADO'
            })} 
            className="fs--2 ms-2 " 
            >
                {rutaId.Estatus}
                <FontAwesomeIcon
                icon={getStatusIcon(rutaId.Estatus)}
                transform="shrink-2"
                className="ms-1"
                />

            </SubtleBadge> 
            <br></br>
            <SubtleBadge pill           
                bg={classNames({
                success:  rutaId.Situacion === 'Finalizada',
                warning: rutaId.Situacion  === 'Transito' || rutaId.Situacion === 'Descenso',
                primary: rutaId.Situacion === 'Programda' || rutaId.Situacion === 'Check de Limpieza' || rutaId.Situacion === 'Abordando'
            })}
            className="fs--2 ms-2 mt-2" 
            >
                {rutaId.Situacion} 
            </SubtleBadge>             
          </Col>
            <Col xs={12}>
              <hr />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <h5>{rutaId.EmpresaNombre}</h5>
              <p className="fs--1">
                {rutaId.EmpresaRFC}
                <br />
                {rutaId.EmpresaDireccion}
              </p>
              <p className="fs--1">
                <a href="#">{rutaId.EmpresaTelefonos}</a>
              </p>
            </Col>
            <Col sm="auto" className="ms-auto">
              <div className="table-responsive">
                <Table borderless size="sm" className="fs--1">
                  <tbody>
                    <tr>
                      <th className="text-sm-end">Ruta:</th>
                      <td>{rutaId.RutaNombre}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Fecha de Inicio:</th>
                      <td>{rutaId.FechaInicioF}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Hora de Salida:</th>
                      <td>{rutaId.HoraSalidaF}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Equipo:</th>
                      <td>{rutaId.EquipoNombre}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Vehiculo:</th>
                      <td>{rutaId.VehiculoNombre}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Observaciones:</th>
                      <td>{rutaId.Observaciones}</td>
                    </tr>
                    <tr>
                      <th className="text-sm-end">Referencia:</th>
                      <td>{rutaId.Referencia}</td>
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
                    <th className="text-white border-0 text-center">No. Parada</th>
                    <th className="text-white border-0 text-center">
                      Hora Abordaje
                    </th>
                    <th className="text-white border-0 text-center">Destino</th>
                    <th className="text-white border-0 text-center">Descripcion</th>
                    <th className="text-white border-0 text-center">Hora descenso</th>
                    <th className="text-white border-0 text-center">Plazas disponibles</th>
                  </tr>
                </thead>
                <tbody>
                {rutaD.map((item, index) => (
                    <tr key={index}>
                        <td className="align-middle">
                        <h6 className="mb-0 text-nowrap text-center">{item.RenglonID}</h6>
                        </td>
                        <td className="align-middle text-center">{item.HoraAbordajeFormat}</td>
                        <td className="align-middle text-center">{item.DestinoNombre}</td>
                        <td className="align-middle text-center">{item.Descripcion}</td>
                        <td className="align-middle text-center">{item.HoraDescensoFormat}</td>
                        <td className="align-middle text-center">{item.PlazasDisponible}</td>

                    </tr>
                ))}
                </tbody>
              </Table>
            </SimpleBarReact>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RutasViewD;
