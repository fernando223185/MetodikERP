import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { faPaperPlane, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'; 
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useGetAreaID, useGetAreas } from 'hooks/Catalogos/Areas/useAreas';

const AreasViewD = () => {
    const { id } = useParams();
    const {getAreaID, areaID, isLoading} = useGetAreaID();
    const {getAreas, areas, isLoading:isLoadingAreas} = useGetAreas();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if(id!= null && id>0) {
            getAreaID({ id })
            getAreas({ id })
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

    if (isLoading || isLoadingAreas ) {
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
                  <h5 className='mb-2 mb-md-0'>Areas: {areaID.NumeroArea} </h5>
                </Col>
                <Col xs="auto">
                        <Link to="/Catalogos/areas/">
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
                        <Link to={`/Catalogos/areas/${areaID.ID}`}>
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
                  <h2 className='mb-3'>{areaID.Nombre}</h2>
                  <h5>{areaID.Agente}</h5>
                <SubtleBadge pill
                    bg={classNames({
                    success:  areaID.Estatus === 'ALTA',
                    danger: areaID.Estatus === 'BAJA',
                })}
                className='fs--2 ms-2'
                >
                    {areaID.Estatus}
                    <FontAwesomeIcon
                    icon={getEstatusIcon(areaID.Estatus)}
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
                  <h5>{areaID.EmpresaNombre}</h5>
                  <p className="fs--1">
                        {areaID.EmpresaRFC}
                        <br />
                        {areaID.EmpresaDireccion}
                    </p>
                    <p className="fs--1">
                        <a href="#">{areaID.EmpresaTelefonos}</a>
                    </p>
                </Col> 
                <Col sm='auto' className='ms-auto'>
                  <div className='table-responsive'>
                    <Table borderless size='sm' className='fs--1'>
                        <tbody> 
                            <tr>
                                <th className='text-sm-end'>Descripcion:</th>
                                <td>{areaID.Descripcion}</td>
                            </tr>  
                            <tr className="alert alert-success fw-bold">
                            <th className="text-success-emphasis text-sm-end">
                                Ultimo Cambio:
                            </th>
                            <td className="text-success-emphasis">{areaID.UltimoCambio}</td>
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

export default AreasViewD;