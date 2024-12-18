import { faBan, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useGetRutaID } from "hooks/Catalogos/Rutas/useRutas";
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SimpleBarReact from 'simplebar-react';
import logoInvoice from 'assets/img/illustrations/Logo-RTN-500x500-1.png';
import React, { useEffect, useState } from 'react';
import IconButton from 'components/common/IconButton';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RutaD = () => {
    const { id } = useParams();
    const { getRutaID, ruta, isLoading, error } = useGetRutaID();
    const [ descensos, setDescensos ] = useState([]);

    useEffect(() => {
        if (id != null && id > 0) {
            getRutaID({ id });
        }
    }, [id]);
    
    useEffect(() => {
        if (ruta && ruta.Descensos) {
            try {
                const parsedDescensos = JSON.parse(ruta.Descensos);
                setDescensos(parsedDescensos);
            } catch (error) {
                console.error("Error parsing JSON descensos: ", error);
            }
        }
    }, [ruta]);

    const getStatusIcon = (estatus) => {
        switch(estatus) {
            case 'ALTA':
                return faCheck;
            case 'BAJA':
                return faBan
            default:
                return faPaperPlane;
        };
    };

    if(isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    };

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                <Row className="justify-content-between align-items-center">
                    <Col md>
                    <h5 className="mb-2 mb-md-0">Ruta: {ruta.Ruta}</h5>
                    </Col>
                    <Col xs="auto">
                        <Link to="/catalogo/rutas">
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
                    <Link to={`/catalogo/rutas/actRutaD/${ruta.ID}`}>
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
                    <h2 className="mb-2">{ruta.Ruta ? ruta.Ruta : "Sin nombre"}</h2>
                    <SubtleBadge pill           
                        bg={classNames({
                        success:  ruta.EstatusID  === 1,
                        danger: ruta.EstatusID === 2
                    })} 
                    className="fs--2 ms-2 mb-3" 
                    >
                        {ruta.EstatusID === 1 ? "ALTA" : "BAJA"}
                        <FontAwesomeIcon
                        icon={getStatusIcon(ruta.Estatus)}
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
                        {/* <h5>{reservaId.EmpresaNombre}</h5>
                        <p className="fs--1">
                            {reservaId.EmpresaRFC}
                            <br />
                            {reservaId.EmpresaDireccion}
                        </p>
                        <p className="fs--1">
                            <a href="#">{reservaId.EmpresaTelefonos}</a>
                        </p> */}
                    </Col>
                    <Col sm="auto" className="ms-auto">
                        <div className="table-responsive">
                            <Table borderless size="sm" className="fs--1">
                            <tbody>
                                <tr>
                                <th className="text-sm-end">Zona:</th>
                                <td>{ruta.Zona}</td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Sucursal:</th>
                                <td>{ruta.Sucursal}</td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Observaciones:</th>
                                <td>{ruta.Observaciones}</td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Origen:</th>
                                <td>{ruta.Origen}</td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Destino:</th>
                                <td>{ruta.Destino}</td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Fecha Registro:</th>
                                <td>{new Date(ruta.FechaRegistro).toLocaleDateString("es-MX",{
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </td>
                                </tr>
                                <tr>
                                <th className="text-sm-end">Ultima Modificacion:</th>
                                <td>{new Date(ruta.UltimoCambio).toLocaleDateString("es-MX",{
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </td>
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
                            <th className="text-white border-0">Descenso</th>
                            <th className="text-white border-0 text-center">
                            Kilometros
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {descensos.map((item, index) => (
                                <tr key={index}>
                                    <td className="align-middle">
                                        <h6 className="mb-0 text-nowrap">{item.Descenso}</h6>
                                    </td>
                                    <td className="align-middle text-center">{item.Kms}</td>
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

export default RutaD;