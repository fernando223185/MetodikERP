import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import SubtleBadge from "components/common/SubtleBadge";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import AllRutasHeader from "../sections/AllRutasHeader";
import RutasFilterForm from "../sections/RutasFilterForm";


const TableRutas = ({rutas, layout, estatus, sucursal, setFilter, filter}) => {
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (rutas && rutas.status === 200 && rutas.data.length > 0) {
            const transformedData = rutas.data.map(u => ({
                id: u.ID,
                Ruta: u.Ruta,
                Zona: u.Zona,
                Origen: u.Origen,
                Destino: u.Destino,
                Sucursal: u.Sucursal,
                Estatus: (
                    <SubtleBadge pill
                        bg={classNames({
                            success: u.Estatus === 'ALTA',
                            danger: u.Estatus === 'BAJA'
                        })}
                        className='fs--2'
                    >
                        {u.Estatus}
                        <FontAwesomeIcon
                            icon={getStatusIcon(u.Estatus)}
                            transform="shrink-2"
                            className='ms-1'
                        />
                    </SubtleBadge>
                )
            }));
            console.log(transformedData);
            setResult(prevResult => {
                if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult;
            });
        };
    }, [rutas]);

    const getStatusIcon = (estatus) => {
        switch (estatus) {
            case 'ALTA':
                return faCheck;
            case 'BAJA':
                return faBan;
            default:
                return faPaperPlane;
        }
    };

    const handleClick = (id) => {
        navigate(`/catalogo/rutas/actRutaD/${id}`);
    }

    const handleRowClick = (id) => {
        navigate(`/catalogo/rutas/view-ruta/${id}`);
    }

    return (
        <Row className='gx-3'>
            <Col xxl={12} xl={12}>
                <AdvanceTableWrapper
                    columns={columns}
                    data={result}
                    selection
                    selectionColumnWidth={52}
                    sortable
                    pagination
                    perPage={10}
                    rowCount={result.length}
                >
                    <Card>
                        <Card.Header className='border-bottom border-200 px-0'>
                            <AllRutasHeader
                                table
                                layout={layout}
                                handleShow={handleShow}
                                handleClick={(id) => handleClick(id)}
                            />
                        </Card.Header>
                        <Card.Body className='p-0'>
                            <TableRowClick 
                                table
                                headerClassName='bg-body-tertiary align-middle'
                                rowClassName='align-middle white-space-nowrap'
                                onRowClick={(id) => handleRowClick(id)}
                                tableProps={{
                                    bordered: false,
                                    className: 'fs--1 mb-0 overflow-hidden'
                                }}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <AdvanceTablePagination table />
                        </Card.Footer>
                    </Card>
                </AdvanceTableWrapper>
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
                    <RutasFilterForm estatus={estatus} sucursal={sucursal} setFilter={setFilter} filter={filter} />
                </Offcanvas>
            </Col>
        </Row>
    );
};

export default TableRutas;

