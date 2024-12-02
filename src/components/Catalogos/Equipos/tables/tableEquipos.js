import React, { useEffect, useState } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Offcanvas } from 'react-bootstrap';
import AllEquiposHeader from './AllEquiposHeader';
import { useNavigate } from 'react-router-dom';
import TableRowClick from 'components/common/advance-table/TableRowClick';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import EquiposFilterForm from '../sections/EquiposFilterForm';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import { Link } from 'react-router-dom';

const columns = [
    {
        accessor: 'Nombre',
        Header: 'Nombre',
        headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
        cellProps: {
            className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
        },
        Cell: rowData => {
            const { Nombre, avatar } = rowData.row.original;
            return (
              <Flex alignItems="center" className="position-relative py-1">
                {avatar && avatar.img ? (
                  <Avatar src={avatar.img} size="xl" className="me-2" />
                ) : (
                  <Avatar size="xl" name={avatar ? avatar.name : Nombre} className="me-2" />
                )}
                <h6 className="mb-0">
                    <Link
                    to="#"
                    className="stretched-link text-900"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {Nombre}
                    </Link>
                </h6>
              </Flex>
            );
        }
    },
    {
        accessor: 'Descripcion',
        Header: 'Descripcion',
        headerProps: { className: 'text-900'},
        cellProps: {
            className: ' py-2 pe-4'
        }
    },
    {
        accessor: 'Integrantes',
        Header: 'Integrantes',
        headerProps: { className:'text-900' },
        cellProps: {
            className: 'py-2 p3-4'
        }
    },
    {
        accessor: 'Estatus',
        Header: 'Estatus',
        headerProps: { className: 'text-center text-900'},
        cellProps: {
            className: 'text-center py-2 pe-4'
        }
    }
];

function TableEquipos({equipos, layout, estatus, setFilter, filter}) {
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (equipos && equipos.status === 200 && equipos.data.length > 0) {
            const transformedData = equipos.data.map(u => ({
                Nombre: u.Nombre,
                Descripcion: u.Descripcion,
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
                empresa: u.EmpresaID,
                id: u.ID,
                Integrantes: u.Integrantes.split(';').filter(Boolean).join(',')
            }));
            setResult(prevResult => {
                if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult
            });
        }
    }, [equipos])

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

    const handleClick = (id) => {
        navigate(`/catalogo/equipos/actEquipoD/${id}`);
    };

    const handleRowClick = (id) => {
        navigate(`/catalogo/equipos/view-equipo/${id}`);
    };

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
                            <AllEquiposHeader
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
                    <EquiposFilterForm estatus={estatus} setFilter={setFilter} filter={filter} />
                </Offcanvas>
            </Col>
        </Row>
    );
}


export default TableEquipos;