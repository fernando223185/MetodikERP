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
import AllUsuariosHeader from '../sections/AllUsuariosHeader';
import UsuariosFilterForm from './UsuariosFilterForm';
import  {CardUsuariosLayout} from './CardUsuariosLayout';


const ViewChoferesCard = ({users, estatus, empresa, sucursal, layout, setFilter, }) => {

    const [show, setShow] = useState(false);
    const { breakpoints } = useBreakpoints();
    const [ result, setResult ] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const usersIds = users.map(user => user.ID);
    const { selectedItems, isSelectedItem, toggleSelectedItem } = useBulkSelect(usersIds);
    const [allUsers] = useState(users.slice(0, 21));
    const [ primaryUsers, setPrimaryUsers ] = useState(allUsers);
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
    } = usePagination(primaryUsers, 7);

    const handleUsuariosSearch = text => {
        const filteredChoferes = allUsers.filter(
            user =>
                user.Nombre.toLowerCase().includes(text.toLowerCase()) ||
                user.Sucursal.toLowerCase().includes(text.toLowerCase()) 
        );
        setPrimaryUsers(filteredChoferes);
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
                Correo: `${u.Correo}`,
                Estatus: (
                    <SubtleBadge pill
                    bg={classNames({
                        success: u.EstatusID === 1,
                        danger: u.EstatusID === 2
                    })}
                    className='fs--2'
                    >
                    {u.EstatusID === 1 ? 'ALTA' : 'BAJA'}
                    <FontAwesomeIcon 
                        icon={getStatusIcon(u.EstatusID === 1 ? 'ALTA' : 'BAJA')}
                        transform="shrink-2"
                        className='ms-1'
                    />
                    </SubtleBadge>
                ),
                ID: u.ID,
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
                        <AllUsuariosHeader 
                            layout={layout}
                            handleShow={handleShow}
                            selectedItems={selectedItems}
                            handleTicketsSearch={handleUsuariosSearch}
                        />
                    </Card.Header>
                    <Card.Body className='bg-body-tertiary'>
                        <CardUsuariosLayout 
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
                    <UsuariosFilterForm estatus={estatus} sucursal={sucursal} empresa={empresa} setFilter={setFilter} />
                </Offcanvas>
            </Col>
        </Row>
    );
}

export default ViewChoferesCard;