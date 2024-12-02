import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import { useGetSucursalID, useGetSucursales } from 'hooks/Catalogos/Sucursales/useSucursal';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SucursalesViewD = () => {
    const { id } = useParams();
    const {getSucursalID, sucursalID, isLoading, error} = useGetSucursalID();
    const {getSucursales, sucursales, isLoading:isLoadingSucursales} = useGetSucursales();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if(id != null && id>0) {
            getSucursalID({ id })
            getSucursales({ id })
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
    
    console.log(sucursalID)

    if (isLoading || isLoadingSucursales ) {
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
                  <h5 className='mb-2 mb-md-0'>Sucursal: {sucursalID.Sucursal} </h5>
                </Col>
                <Col xs="auto">
                        <Link to="/configuration/sucursales/">
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
                        <Link to={`/Catalogos/sucursales/${sucursalID.SucursalID}`}>
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
                  <h2 className='mb-3'>{sucursalID.Nombre}</h2>
                  <h5>{sucursalID.Agente}</h5>
                <SubtleBadge pill
                    bg={classNames({
                    success:  sucursalID.Estatus === 'ALTA',
                    danger: sucursalID.Estatus === 'BAJA',
                })}
                className='fs--2 ms-2'
                >
                    {sucursalID.Estatus}
                    <FontAwesomeIcon
                    icon={getEstatusIcon(sucursalID.Estatus)}
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
                  <h5>{sucursalID.EmpresaNombre}</h5>
                  <p className="fs--1">
                        {sucursalID.EmpresaRFC}
                        <br />
                        {sucursalID.EmpresaDireccion}
                    </p>
                    <p className="fs--1">
                        <a href="#">{sucursalID.EmpresaTelefonos}</a>
                    </p>
                </Col> 
                <Col sm='auto' className='ms-auto'>
                  <div className='table-responsive'>
                    <Table borderless size='sm' className='fs--1'>
                        <tbody>
                            <tr>
                                <th className='text-sm-end'>Direccion:</th>
                                <td>{sucursalID.Direccion}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>Colonia:</th>
                                <td>{sucursalID.Colonia}</td>
                            </tr> 
                            <tr>
                                <th className='text-sm-end'>Delegacion:</th>
                                <td>{sucursalID.Delegacion}</td>
                            </tr> 
                            <tr>
                                <th className='text-sm-end'>Telefono:</th>
                                <td>{sucursalID.Telefonos}</td>
                            </tr>
                            <tr>
                                <th className='text-sm-end'>RFC:</th>
                                <td>{sucursalID.RFC}</td>
                            </tr>  
                            <tr className="alert alert-success fw-bold">
                            <th className="text-success-emphasis text-sm-end">
                                Ultimo Cambio:
                            </th>
                            <td className="text-success-emphasis">{sucursalID.UltimoCambio}</td>
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

export default SucursalesViewD;