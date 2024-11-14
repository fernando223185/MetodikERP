import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
// import { CardLayout } from 'components/dashboards/support-desk/unsolved-tickets/TicketsLayout';
import { tickets } from 'data/dashboard/support-desk';
import { useBreakpoints } from 'hooks/useBreakpoints';
import useBulkSelect from 'hooks/useBulkSelect';
import usePagination from 'hooks/usePagination';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons'; 
import { active } from 'd3';
import AllEquiposHeader from '../tables/AllEquiposHeader';
import EquiposFilterForm from './EquiposFilterForm';
import { CardEquiposLayout } from './CardEquiposLayout';


const ViewEquiposCard = ({equipos, estatus, layout, setFilter}) => {
    const [show, setShow] = useState(false);
    const { breakpoints } = useBreakpoints();
    const [ result, setResult ] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const equiposIds = equipos.data.map(equipo => equipo.id);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(equiposIds);
    const [allEquipos] = useState(equipos.data.slice(0, 21));
    const [ primaryEquipos, setPrimaryEquipos ] = useState(allEquipos);
    const {
        paginationState: {
            data,
            currentPage,
            canNextPage,
            canPreviousPage,
            paginationArray,
        },
        nextPage,
        prevPage,
        goToPage,
    } = usePagination(primaryEquipos, 7);

    const handleEquiposSearch = text => {
        const filteredEquipos = allEquipos.filter(
            equipo =>
                equipo.Nombre.toLowerCase().includes(text.toLowerCase()) ||
                equipo.Descripcion.toLowerCase().includes(text.toLowerCase()) ||
                equipo.Integrantes.toLowerCase().includes(text.toLowerCase())
        );
        setPrimaryEquipos(filteredEquipos);
    }

    useEffect(() => {
        if(data.length > 0 ){
            const transformedData = data.map(u => ({
                Nombre: u.Nombre,
                avatar: {
                    name: u.Nombre,
                    size: 'xl',
                    round: 'circle'
                },
                Descripcion: `${u.Descripcion}`,
                Integrantes: `${u.Integrantes.split(';').filter(Boolean).join(',')}`,
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
                ),
                ID: u.ID,
                EmpresaID: u.EmpresaID
            }));
            setResult(prevResult => {
                if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult;
            });
        }
    }, [data]);

    const getStatusIcon = (estatus) => {
        switch(estatus) {
            case 'ALTA':
                return faCheck;
            case 'BAJA':
                return faBan;
            default:
                return faPaperPlane;
        }
    };

    return (
        <Row className='gx-3'>
            <Col xxl={12} xl={12}>
                <Card style={{ minWidth: '1100px', display: 'flex', flexDirection: 'column' }}>
                    <Card.Header className='border-bottom border-200 px-0'>
                        <AllEquiposHeader 
                            layout={layout}
                            handleShow={handleShow}
                            selectedItems={selectedItems}
                            handleTicketsSearch={handleEquiposSearch}
                        />
                    </Card.Header>
                    <Card.Body className='bg-body-tertiary'>
                        <CardEquiposLayout 
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
                    <EquiposFilterForm estatus={estatus} setFilter={setFilter} />
                </Offcanvas>
            </Col>
        </Row>
    );
}

export default ViewEquiposCard;