import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import { faBan, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useGetEquipoID } from '../../../../hooks/Catalogos/Equipos/useEquipos';
import React, { useEffect, useState } from 'react';
import IconButton from 'components/common/IconButton';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EquiposViewD = () => {
    const { id } = useParams();
    const { getEquipoID, equipoId, isLoading, error } = useGetEquipoID();

    useEffect(() => {
        if(id != null && id > 0) {
            getEquipoID({ id });
        }
    }, [id]);

    const getStatusIcon = (estatus) => {
        switch(estatus) {
            case 1:
                return faCheck;
            case 2:
                return faBan;
            default:
                return faPaperPlane;
        }
    }

    if(isLoading) {
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
                    <h5 className="mb-2 mb-md-0">Equipo: {equipoId.Nombre}</h5>
                    </Col>
                    <Col xs="auto">
                        <Link to="/catalogo/equipos">
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
                        // onClick={}
                    >
                        Descargar (.pdf)
                    </IconButton>
                    <Link to={`/catalogo/equipos/actEquipoD/${equipoId.ID}`}>
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
                    <h2 className="mb-2">{equipoId.Nombre ? equipoId.Nombre : "Sin descripcion"}</h2>
                    <SubtleBadge pill           
                        bg={classNames({
                        success:  equipoId.EstatusID  === 1,
                        danger: equipoId.EstatusID === 2
                    })} 
                    className="fs--2 ms-2 mb-3" 
                    >
                        {equipoId.EstatusID === 1 ? "ALTA" : "BAJA"}
                        <FontAwesomeIcon
                        icon={getStatusIcon(equipoId.EstatusID)}
                        transform="shrink-2"
                        className="ms-1"
                        />
                    </SubtleBadge>
                    <p className='mb-2'>{equipoId.Descripcion ? equipoId.Descripcion : "Sin Descripcion"}</p>
                    <h5>Integrantes: </h5>
                        <ul className="mt-2 ms-3">
                            {(equipoId.Integrantes ? equipoId.Integrantes.split(';') : ["Sin integrantes"])
                            .filter(integrante => integrante.trim() !== '')
                            .map((integrante, index) => (
                                <p key={index} className="mb-1">
                                {integrante}
                                </p>
                            ))}
                        </ul>
                    <br></br>
                </Col>
                    <Col xs={12}>
                    <hr />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col>
                        <h5>{equipoId.EmpresaNombre}</h5>
                        <p className="fs--1">
                            {equipoId.EmpresaRFC}
                            <br />
                            {equipoId.EmpresaDireccion}
                        </p>
                        <p className="fs--1">
                            <a href="#">{equipoId.EmpresaTelefonos}</a>
                        </p>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm="auto" className="ms-auto">
                    <div className="table-responsive">
                        <Table borderless size="sm" className="fs--1">
                        <tbody>
                            <tr>
                            <th className="text-sm-end">Fecha de Creacion:</th>
                            <td>{new Date(equipoId.FechaRegistro).toLocaleDateString("es-MX",{
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })}</td>
                            </tr>
                            <tr>
                            <th className="text-sm-end">Ultima Modificacion:</th>
                            <td>{new Date(equipoId.UltimaModificacion).toLocaleDateString("es-MX",{
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })}</td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default EquiposViewD;