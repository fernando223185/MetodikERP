import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetProfiles } from '../../../hooks/Catalogos/Perfiles/usePerfiles' 
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
    Header: 'Acciones',
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
    accessor: 'notas',
    Header: 'Notas',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'empresa',
    Header: 'Empresa',
    headerProps: { className: 'text-900' }
  },
];

function TableProfiles({ onEditClick }) {

  const { getProfiles, profiles, isLoading } = useGetProfiles();
  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState(''); 



  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const data = {
      EmpresaID: user.EmpresaID,
      EstatusID: 1
    }
    getProfiles({ data })
  },[]);
  
  useEffect(() => {
    if(profiles.status === 200)
    {
      const transformedData = profiles.data.map(u => ({
        acciones: (
            <Link
              to={`/configuration/users/view-profile/${u.ID}`}  
              className="btn btn-outline-primary rounded-pill me-1 mb-1"
            >
              <FontAwesomeIcon icon="eye" />
            </Link>
        ),
        nombre: `${u.Nombre}`,
        notas: u.Notas,
        empresa: u.EmpresaNombre,
        estatus: u.EstatusID === 1 ? (
          <SubtleBadge pill bg="success" className="fs--2" >
            {u.Estatus}
          </SubtleBadge>
        ) : (
          <SubtleBadge pill bg="danger" className="fs--2">
            Inactive
          </SubtleBadge>
        ),
        rfc: u.RFC
      }));
      setResult(transformedData);
    }
  },[profiles])

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
      perPage={5}
    >
      <Row className="justify-content-start mb-3">
        <Col xs="auto">
          <AdvanceTableSearchBox table />
        </Col>
        <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
          <Link
            to={`/configuration/users/edit/0`}  
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

export default TableProfiles;
