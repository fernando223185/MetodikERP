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
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import { Link } from 'react-router-dom';
import AllUsuariosHeader from '../sections/AllUsuariosHeader';
import UsuariosFilterForm from '../sections/UsuariosFilterForm';

const columns = [
    {
        accessor: 'Usuario',
        Header: 'Usuario',
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
        accessor: 'Nombre',
        Header: 'Nombre',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'Correo',
        Header: 'Correo',
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

const TableUsuarios = ( {users, estatus, sucursal, empresa, setFilter, layout, filter,show, setShow} ) => {
    console.log("users", users)
    console.log(layout);
    const [result, setResult] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/catalogo/usuarios/actUsuarios/0');
    }

    const handleRowClick = (id) => {
        console.log("row", id);
        navigate(`/catalogo/usuarios/view-usuario/${id}`);
    }

    useEffect(() => {
        if (users.length > 0) {
            const transformedData = users.map(u => ({
                id: u.ID,
                Nombre: u.Nombre,
                Usuario: u.Usuario,
                Correo: u.Correo,
                Estatus: (
                    <SubtleBadge pill
                        bg={classNames({
                            success: u.EstatusID === 1,
                            danger: u.EstatusID === 2,
                        })}
                        className='fs--2'
                    >
                        {u.EstatusID === 1 ? 'Alta' : 'Baja'}
                        <FontAwesomeIcon
                            icon={u.EstatusID === 1 ? faCheck : faBan}
                            transform="shrink-2"
                            className='ms-1'
                        />
                    </SubtleBadge>
                ),
                id: u.ID,
            }));
            console.log("transformedData", transformedData);
            setResult(transformedData);
        }
    }, [users]);

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
                            <AllUsuariosHeader
                                table
                                layout={layout}
                                handleShow={handleShow}
                                handleClick={handleClick}    
                            />
                        </Card.Header>
                        <Card.Body className='p-0'>
                            <TableRowClick 
                                table
                                headerClassName='bg-body-tertiary align-middle'
                                rowClassName='align-middle white-space-nowrap'
                                tableProps={{
                                    bordered: false,
                                    className: 'fs--1 mb-0 overflow-hidden'
                                }}
                                onRowClick={(id) => handleRowClick(id)}
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
                    <UsuariosFilterForm estatus={estatus} sucursal={sucursal} empresa={empresa} setFilter={setFilter} filter={filter} />
                </Offcanvas>
            </Col>
        </Row>
    )
}

export default TableUsuarios;