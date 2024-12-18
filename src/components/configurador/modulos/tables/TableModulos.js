import TableRowClick from "components/common/advance-table/TableRowClick";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Card, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { useBreakpoints } from 'hooks/useBreakpoints';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import ModuloHeader from "../Profile/ModulosHeader";
import { useActModulo } from "hooks/Configurador/useModulo";
import ModulosFilterForm from "../Profile/ModulosFilterForm";


const columns =[
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
      accessor: 'descripcion',
      Header: 'Descripcion',
      headerProps: { className: 'text-900' }
    },
    {
        accessor: 'tipo',
        Header: 'Tipo',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'ruta',
        Header: 'Ruta',
        headerProps: { className: 'text-900' }
    },
    {
        accessor:'fechaemision',
        Header: 'Fecha de Registro',
        headerProps: { className: 'text-900' }
    },
]

function TableModulos({modulos,layout,setFilter,filter}) {

  const [result, setResult] = useState([]);
  const [formtoShow, setFormToShow] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const{breakpoints} = useBreakpoints();
  const {actModulo,result:response,isLoading} = useActModulo();
  
  useEffect(() => {
    if(modulos && modulos.status === 200 && modulos.data.length > 0) {

        const transformedData = modulos.data.map(u => ({
          nombre: u.Nombre,
          descripcion: u.Descripcion,
          tipo: u.Tipo,
          ruta: u.Ruta,
          fechaemision: u.FechaEmision,
          id: u.ID,
    }));
    setResult(prevResult => {
        if(JSON.stringify(prevResult)!== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
    });
  }
  },[modulos]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handleRowClick = (id) => {
    navigate(`/configuracion/modulos/${id}`);
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
              <ModuloHeader
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
      <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="dark__bg-card-dark"
      >
          <Offcanvas.Header closeButton className="bg-body-tertiary">
          <h6 className="fs-0 mb-0 fw-semi-bold">Filtros</h6>
          </Offcanvas.Header>
          <ModulosFilterForm setFilter={setFilter} filter={filter} />
      </Offcanvas>
    </Row>
  );
}

export default TableModulos;