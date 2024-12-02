import useBulkSelect from "hooks/useBulkSelect";
import React, { useEffect, useState } from "react";
import usePagination from 'hooks/usePagination';
import SubtleBadge from "components/common/SubtleBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faBan, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import RutasFilterForm from "../sections/RutasFilterForm";
import { Button, Card, Col, Offcanvas, Row } from "react-bootstrap";
import { CardRutasLayout } from "./CardRutasLayout";
import AllRutasHeader from "../sections/AllRutasHeader";

const TableCardRutas = ({rutas, estatus, sucursal, layout, setFilter}) => {
    const [ show, setShow ] = useState(false);
    const [ result, setResult ] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const rutasIDs = rutas.data.map(ruta => ruta.ID);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(rutasIDs);
    const [ allRutas ] = useState(rutas.data.slice(0,21));
    const [ primaryRutas, setPrimaryRutas ] = useState(allRutas);
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
        goToPage,
    } = usePagination(primaryRutas, 7);

    const handleRutasSearch = text => {
        const filteredRutas = allRutas.filter(
            ruta =>
                ruta.Ruta.toLowerCase().includes(text.toLowerCase()) ||
                ruta.Sucursal.toLowerCase().includes(text.toLowerCase()) ||
                ruta.Origen.toLowerCase().includes(text.toLowerCase()) ||
                ruta.Destino.toLowerCase().includes(text.toLowerCase()) ||
                ruta.Zona.toLowerCase().includes(text.toLowerCase())
        );
        setPrimaryRutas(filteredRutas);
    };

    useEffect(() => {
        if(data.length > 0) {
            const transformedData = data.map(u => ({
                ID: u.ID,
                Ruta: u.Ruta,
                avatar: {
                    name: u.Ruta,
                    size: 'xl',
                    round: 'circle',
                },
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
            setResult(prevResult => {
                if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult;
            });
        };
    }, [data]);

    const getStatusIcon = (estatus) => {
        switch(estatus) {
            case 'ALTA':
                return faCheck;
            case 'BAJA':
                return faBan;
            default:
                return faPaperPlane;
        };
    };

    return (
        <Row className='gx-3'>
            <Col xxl={12} xl={12}>
                <Card style={{ minWidth: '1100px', display: 'flex', flexDirection: 'column' }}>
                    <Card.Header className='border-bottom border-200 px-0'>
                        <AllRutasHeader 
                            layout={layout}
                            handleShow={handleShow}
                            selectedItems={selectedItems}
                            handleTicketsSearch={handleRutasSearch}
                        />
                    </Card.Header>
                    <Card.Body className='bg-body-tertiary'>
                        <CardRutasLayout
                            data={result}
                            isSelectedItem={isSelectedItem}
                            toggleSelectedItem={toggleSelectedItem}
                        />
                    </Card.Body>
                    <Card.Footer className='d-flex justify-content-center'>
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

                        <ul className='pagination mb-0' >
                            {paginationArray.map(page => (
                                <li
                                key={page}
                                className={classNames({ activate: currentPage === page })}
                                >
                                <Button
                                size='sm'
                                variant='falcon-default'
                                className='page me-2'
                                onClick={() => goToPage(page)}
                                >
                                    {page}
                                </Button>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <Button
                            variant='falcon-default'
                            size='sm'
                            className={classNames({ disabled: !canNextPage })}
                            onClick={nextPage}
                            >
                                <FontAwesomeIcon 
                                    icon='chevron-right'
                                />
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
            <Col xxl={2} xl={3}>
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    placement='end'
                    className='dark__bg-card-dark'
                >
                    <Offcanvas.Header closeButton className='bg-body-tertiary'>
                        <h6 className='fs-0 mb-0 fw-semi-bold'>Filtros</h6>
                    </Offcanvas.Header>
                    <RutasFilterForm estatus={estatus} sucursal={sucursal} setFilter={setFilter} />
                </Offcanvas>
            </Col>
        </Row>
    );
};

export default TableCardRutas;