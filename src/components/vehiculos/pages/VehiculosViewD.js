import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import { useGetVehiculoID, useGetVehiculos } from 'hooks/Catalogos/Vehiculos/useVehiculo';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const VehiculosViewD = () => {
    const {id} = useParams();
    const {getVehiculoID, vehiculoID, isLoading, error} = useGetVehiculoID();
    const {getVehiculos, vehiculos, isLoading:isLoadingVehiculos} = useGetVehiculos();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if(id != null && id>0) {
            getVehiculoID({ id })
            getVehiculos({ id })
        }
    },[id, hasFetched])

    const getEstatusIcon = (estatus) => {
        switch(estatus){
            case 'ALTA':
              return faCheck;
            case 'BAJA':
              return faBan;
            default:
              return faPaperPlane;
        }
    }


    if (isLoading || isLoadingVehiculos ) {
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
          <Card className='mb-3'>
            <Card.Body>
              <Row className='justify-content-between align-items-center'>
                <Col md>
                  <h5 className='mb-2 mb-md-0'>Vehículo: {vehiculoID.VehiculoID} </h5>
                </Col>
                <Col xs="auto">
                        <Link to="/Catalogos/vehiculos/">
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
                        <Link to={`/Catalogos/vehiculos/${vehiculoID.VehiculoID}`}>
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
            <Row className='"align-items-center text-center mb-3'>
                <Col sm={6} className='text-sm-start'>
                  <img src={logoInvoice} alt="invoice" width={250}/>
                </Col>
                <Col className='text-sm-end mt-3 mt-sm-0'>
                  <h2 className='mb-3'>{vehiculoID.Vehiculo}</h2>
                  <h5>{vehiculoID.Agente}</h5>
                <SubtleBadge pill
                    bg={classNames({
                    success:  vehiculoID.Estatus === 'ALTA',
                    danger: vehiculoID.Estatus === 'BAJA',
                })}
                className='fs--2 ms-2'
                >
                    {vehiculoID.Estatus}
                    <FontAwesomeIcon
                    icon={getEstatusIcon(vehiculoID.Estatus)}
                    transform='shrink-2'
                    className='ms-1'
                    />
                </SubtleBadge>
                </Col>
                  <Col xs={12}>
                    <hr/>
                  </Col>
                </Row>
                <Row className='align-items-center'>
                <Col>
                  <h5>{vehiculoID.EmpresaNombre}</h5>
                  <p className="fs--1">
                        {vehiculoID.EmpresaRFC}
                        <br />
                        {vehiculoID.EmpresaDireccion}
                    </p>
                    <p className="fs--1">
                        <a href="#">{vehiculoID.EmpresaTelefonos}</a>
                    </p>
                </Col> 
                <Col sm='auto' className='ms-auto'>
                  <div className='table-responsive'>
                    <Table borderless size='sm' className='fs--1'>
                        <tbody>
                            <tr>
                                <th className='text-sm-end'>Placas:</th>
                                <td>{vehiculoID.Placas}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Serie:</th>
                                <td>{vehiculoID.serie}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Marca: </th>
                                <td>{vehiculoID.Marca}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Peso:</th>
                                <td>{vehiculoID.Peso}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>NoEco: </th>
                                <td>{vehiculoID.NoEco}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Descripcion: </th>
                                <td>{vehiculoID.Descripcion}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Capacidad de Peso: </th>
                                <td>{vehiculoID.CapacidadPeso}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Tipo de Vehiculo:</th>
                                <td>{vehiculoID.TipoVehiculo}</td>
                            </tr>                       
                            <tr className="alert alert-success fw-bold">
                            <th className="text-success-emphasis text-sm-end">
                                Ultimo Cambio:
                            </th>
                            <td className="text-success-emphasis">{vehiculoID.UltimoCambio}</td>
                            </tr>
                        </tbody>
                    </Table>
                  </div>
                </Col>
                </Row>
            </Card.Body>
          </Card>
        </>
    )
}

export default VehiculosViewD;