import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Offcanvas } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faStream, faPen, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useActPasajero } from "hooks/Catalogos/Pasajeros/usePasajeros";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AllPasajerosHeader from "./AllPasajerosHeader";
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import PropTypes from 'prop-types';
import { useBreakpoints } from 'hooks/useBreakpoints';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import Success from "components/wizard/Success";
import PasajerosFilterForm from "../sections/PasajerosFilterForm";

const columns = [
    {
        accessor: 'nombre',
        Header: 'Nombre',
        headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
        cellProps: {
            className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
        },
        Cell: rowData => {
            const { nombre, avatar } = rowData.row.original;
            return (
                <Flex alignItems="center" className="position-relative py-1">
                {avatar && avatar.img ? (
                    <Avatar src={avatar.img} size="xl" className="me-2" />
                ) : (
                    <Avatar size="xl" name={avatar ? avatar.name : nombre} className="me-2" />
                )}
                <h6 className="mb-0">
                    <Link
                    to="#"
                    className="stretched-link text-900"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {nombre}
                    </Link>
                </h6>
                </Flex>
            );
        }
    },
    {
        accessor: 'email',
        Header: 'Email',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'telefono',
        Header: 'Telefono',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'fechaemision',
        Header: 'Fecha Emision',
        headerProps: { className: 'text-900' },
        cellProps: {
            className: 'py-2 pe-4'
        }
    },
    {
        accessor: 'estatus',
        Header: 'Estatus',
        headerProps: { className: 'text-900' },
        cellProps: { className: ' py-2 pe-4' }
    },
]

function TablePasajeros({pasajeros, estatus, layout, setFilter, filter }) {

    const [result, setResult] = useState([]);
    const [formToShow, setFormToShow] = useState('');
    const { actPasajero, result:response, isLoading} = useActPasajero();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const { breakpoints } = useBreakpoints();

    console.log(pasajeros)


    useEffect(() => {
        if(pasajeros && pasajeros.status === 200 && pasajeros.data.length > 0)
        {
            const transformedData = pasajeros.data.map(u => ({
                nombre: u.Nombre,
                avatar:{
                    name: u.Nombre,
                    size: 'xl',
                    round: 'circle'
                },
                email: u.Email,
                telefono: u.Telefono,
                fechaemision: u.FechaEmision,
                estatus: (
                  <SubtleBadge pill
                  bg={classNames({
                    success: u.Estatus === "ALTA",
                    danger: u.Estatus === "BAJA"
                  })}
                  className="fs--2"
                  >
                    {u.Estatus}
                    <FontAwesomeIcon
                    icon={getStatusIcon(u.Estatus)}
                    transform="shrink-2"
                    className="ms-1"
                    />

                  </SubtleBadge>
                ),
                id: u.ID
            }));
            setResult(prevResult => {
              if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
                return transformedData;
              }
                return prevResult;
            });
        }
    },[pasajeros])


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

    const handleRowClick = (id) => {
        navigate(`/Catalogos/view-pasajeros/${id}`);
      };

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
                        <AllPasajerosHeader
                        table
                        layout={layout}
                        handleShow={handleShow}
                        isLoading={isLoading}
                        />
                    </Card.Header>
                    <Card.Body className="p-0">
                    <TableRowClick
                        table
                        headerClassName="bg-body-tertiary align-middle"
                        rowClassName="align-middle white-space-nowrap"
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
                <PasajerosFilterForm  estatus={estatus} setFilter={setFilter} filter={filter} />
            </Offcanvas>
            </Col>
        </Row>
    )

};

export default TablePasajeros;