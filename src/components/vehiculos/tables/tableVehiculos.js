import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Offcanvas } from 'react-bootstrap';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faPaperPlane, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { useActVehiculo } from "hooks/Catalogos/Vehiculos/useVehiculo";
import { useNavigate } from 'react-router-dom';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { useBreakpoints } from 'hooks/useBreakpoints';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import AllVehiculosHeader from "./AllVehiculosHeader";
import VehiculosFilterForm from "../sections/VehiculosFilterForm";

const columns = [
  {
    accessor: 'vehiculo',
    Header: 'Vehiculo',
    headerProps: { className: 'ps-2 text-900', style: { height: '46px' } },
    cellProps: {
        className: 'py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2'
    },
    Cell: rowData => {
        const { vehiculo, avatar } = rowData.row.original;
        return (
            <Flex alignItems="center" className="position-relative py-1">
            {avatar && avatar.img ? (
                <Avatar src={avatar.img} size="xl" className="me-2" />
            ) : (
                <Avatar size="xl" name={avatar ? avatar.name : vehiculo} className="me-2" />
            )}
            <h6 className="mb-0">
                <Link
                to="#"
                className="stretched-link text-900"
                onClick={(e) => e.stopPropagation()}
                >
                    {vehiculo}
                </Link>
            </h6>
            </Flex>
        );
    }
  },
  {
    accessor: 'descripcion',
    Header: 'Descripcion',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'placas',
    Header: 'Placas',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'noeco',
    Header: 'NoEco',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'capacidadpeso',
    Header: 'Capacidad Peso',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'tipovehiculo',
    Header: 'Tipo de Vehiculo',
    headerProps: { className: 'text-900' }
  },
  {
    accessor:'empresanombre',
    Header: 'Empresa',
    headerProps: { className: 'text-900' }
  },
  {
    accessor:'fechaemision',
    Header: 'FechaEmision',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'estatus',
    Header: 'Estatus',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
];

function TableVehiculos({vehiculos, estatus, tipovehiculo,layout,setFilter,filter}) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const {actVehiculo, result:response, isLoading} = useActVehiculo();
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { breakpoints } = useBreakpoints();

  useEffect(() => {
    if(vehiculos && vehiculos.status === 200 && vehiculos.data.length > 0)
    {
      const transformedData = vehiculos.data.map(u => ({
        vehiculo: u.Vehiculo,
        descripcion: u.Descripcion,
        placas: u.Placas,
        noeco: u.NoEco,
        capacidadpeso: u.CapacidadPeso,
        empresanombre: u.EmpresaNombre,
        fechaemision: u.FechaEmision,
        marca: u.Marca,
        peso: u.Peso,
        tipovehiculo: u.TipoVehiculo,
        serie: u.serie,
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
        if(JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[vehiculos])

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
    navigate(`/Catalogos/view-vehiculos/${id}`);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
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
              <AllVehiculosHeader
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
          <VehiculosFilterForm  estatus={estatus} setFilter={setFilter} filter={filter} />
      </Offcanvas>
      </Col>
    </Row>
  );
}

export default TableVehiculos;
