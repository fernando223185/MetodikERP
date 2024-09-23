import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetAgentes } from '../../../hooks/Catalogos/Agentes/useAgente' 
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const columns = [
  {
    accessor: 'acciones',
    Header: 'Editar',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'estatus',
    Header: 'Estatus',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'nombre',
    Header: 'Nombre',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'usuario',
    Header: 'Usuario',
    headerProps: { className: 'text-900' }
  },
];

function TableAgentes({ onEditClick }) {

  const { getAgentes, agentes, isLoading } = useGetAgentes();
  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState(''); 



  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const data = {
      EmpresaID: user.EmpresaID,
      EstatusID: 1
    }
    getAgentes({ data })
  },[]);
  
  useEffect(() => {
    if(agentes.status === 200)
    {
      const transformedData = agentes.data.map(u => ({
        acciones: (
            <Link
              to={`/configuration/agentes/view-profile/${u.ID}`}  
              className="btn btn-outline-primary rounded-pill me-1 mb-1"
            >
              <FontAwesomeIcon icon="eye" />
            </Link>
        ),
        nombre: u.Nombre,
        usuario: u.Correo,
        estatus: 
            <SubtleBadge className="fs--2" pill bg={u.EstatusID === 1 ? 'success' : 'danger'}>{u.EstatusID === 1 ? 'Alta' : 'Baja'}</SubtleBadge>,
      }));
      setResult(transformedData);
    }
  },[agentes])

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
    <AdvanceTableWrapper
      columns={columns}
      data={result}
      sortable
      pagination
      perPage={10}
    >
      <Row className="justify-content-start mb-3">
        <Col xs="auto">
          <AdvanceTableSearchBox table />
        </Col>
        <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
          <Link
            to={`/configuration/agentes/edit/0`}  
            className="btn btn-outline-primary rounded-pill me-1 mb-1"
          >
            <FontAwesomeIcon icon="plus" />
          </Link>
        </Col>
      </Row>
      <hr style={{ margin: '10px 0' }} />
      <AdvanceTable
        table
        headerClassName="bg-200 text-nowrap align-middle"
        rowClassName="align-middle white-space-nowrap"
        tableProps={{
          bordered: true,
          striped: true,
          className: 'fs--1 mb-0 overflow-hidden'
        }}
      />
      <div className="mt-3">
        <AdvanceTableFooter
          rowCount={result.length}
          table
          rowInfo
          navButtons
          rowsPerPageSelection
        />
      </div>
    </AdvanceTableWrapper>
  );
}

export default TableAgentes;
