import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Offcanvas } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { useBreakpoints } from 'hooks/useBreakpoints';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import PaqueteriaEHeader from "./PaqueteriaEHeader";
import PaqueteriaEFilterForm from "../form/PaqueteriaEFilterForm";

const columns = [
    {
        accessor: 'cliente',
        Header: 'Cliente',
        headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
        cellProps: {
            className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
        },
        Cell: rowData => {
            const { cliente, avatar } = rowData.row.original;
            return (
                <Flex alignItems="center" className="position-relative py-1">
                {avatar && avatar.img ? (
                    <Avatar src={avatar.img} size="xl" className="me-2" />
                ) : (
                    <Avatar size="xl" name={avatar ? avatar.name : cliente} className="me-2" />
                )}
                <h6 className="mb-0">
                    <Link
                    to="#"
                    className="stretched-link text-900"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {cliente}
                    </Link>
                </h6>
                </Flex>
            );
        }
    },
    {
        accessor: 'folio',
        Header: 'Folio de Paqueteria',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'fecha',
        Header: 'Fecha Entrega',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'telefono',
        Header: 'Telefono',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'origen',
        Header: 'Origen',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'destino',
        Header: 'Destino',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'cantidad',
        Header: 'Cantidad De Paquetes',
        headerProps: { className: 'text-900' }
    },
];

function TablePaqueteriaE({paqueteriaE, cliente, destino, movimiento, usuarios, layout, setFilter, filter}){

    const [result, setResult] = useState([]);
    const [formtoShow, setFormToShow] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const{breakpoints} = useBreakpoints();

    useEffect(() => {
        if(paqueteriaE && paqueteriaE.status === 200 && paqueteriaE.data.length > 0)
        {
            const transformedData = paqueteriaE.data.map(u => ({
                cliente: u.Cliente,
                folio: u.Folio,
                fecha: u.FechaEntrega,
                telefono: u.TelefonoC,
                origen: u.Origen,
                destino: u.Destino,
                cantidad: u.CantidadPaquetes,
                id: u.ID
            }));
            setResult(prevResult => {
                if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                  return transformedData;
                }
                return prevResult;
            });
        }
    },[paqueteriaE])

    return(
        <Row className="gx-3">
          <Col>
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
                <Card.Header className="border-bottom border-200 px-0">
                  <PaqueteriaEHeader
                    table
                    layout={layout}
                    handleShow={handleShow}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </Card.Header>
                <Card.Body className="p-0">
                  <TableRowClick
                    table
                    headerClassName="bg-body-tertiary align-middle"
                    rowClassName="align-middle white-space-nowrap"
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
                <PaqueteriaEFilterForm cliente={cliente} destino={destino} movimiento={movimiento} usuarios={usuarios} setFilter={setFilter} filter={filter} />
            </Offcanvas>
          </Col>
        </Row>
    );
}

export default TablePaqueteriaE;