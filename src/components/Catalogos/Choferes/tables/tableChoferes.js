import React, { useEffect, useState } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import SubtleBadge from 'components/common/SubtleBadge';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TableRowClick from 'components/common/advance-table/TableRowClick';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AllChoferesHeader from './AllChoferesHeader';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import { Link } from 'react-router-dom';
import ChoferesFilterForm from '../sections/ChoferesFilterForm';

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
        accessor: 'Sucursal',
        Header: 'Sucursal',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'Vehiculo',
        Header: 'Vehiculo',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'Estatus',
        Header: 'Estatus',
        headerProps: { className: 'text-center text-900' },
        cellProps: {
            className: 'text-center py-2 pe-4'
        }
    }
];

function TableChoferes({choferes, layout, estatus, sucursal, empresa, setFilter, filter}) {
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (choferes && choferes.status === 200 && choferes.data.length > 0) {
            const transformedData = choferes.data.map(u => ({
                Nombre: u.Nombre,
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
                ),
                Empresa: u.EmpresaID,
                id: u.ID,
                Vehiculo: u.Vehiculo
            }));
            setResult(prevResult => {
                if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                    return transformedData;
                }
                return prevResult
            });
        }
    }, [choferes])

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
        navigate(`/catalogo/choferes/actChoferD/${id}`);
    };

    const handleRowClick = (id) => {
        navigate(`/catalogo/choferes/view-profile/${id}`);
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
                            <AllChoferesHeader
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
                    <ChoferesFilterForm estatus={estatus} sucursal={sucursal} empresa={empresa} setFilter={setFilter} filter={filter} />
                </Offcanvas>
            </Col>
        </Row>
    );
}

export default TableChoferes;

