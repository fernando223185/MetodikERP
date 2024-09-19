import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetAlmacenes } from '../../../hooks/Catalogos/Almacenes/useAlmacen' 
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
        accessor: 'grupo',
        Header: 'Grupo',
        headerProps: { className: 'text-900' }
    },
    {
        accessor:'tipo',
        Header: 'Tipo',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'sucursal',
        Header: 'Sucursal',
        headerProps: { className: 'text-900' }
    },
    {
        accessor: 'empresa',
        Header: 'Empresa',
        headerProps: { className: 'text-900' }
    }
  ];

function TableAlmacenes() {
    
    const { getAlmacenes, almacenes, isLoading } = useGetAlmacenes();
    const [result, setResult] = useState([]);

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const data = {
          ID: user.SucursalID,
        }
        getAlmacenes({ data });
    },[]);

    useEffect(() => {
        if(almacenes.status === 200)
        {   
          console.log(almacenes.data);
            const transformedData = almacenes.data.map(e => ({
                acciones: (
                     <Link
                        to={`/configuration/almacenes/editar/${e.ID}`}
                        className="btn btn-outline-primary rounded-pill me-1 mb-1"     
                    >
                        <FontAwesomeIcon icon="eye" />
                    </Link>
                ),
                estatus: 
                <SubtleBadge className="fs--2" pill bg={e.EstatusID === 1 ? 'success' : 'danger'}>{e.EstatusID === 1 ? 'Alta' : 'Baja'}</SubtleBadge>,
                nombre: e.Nombre,
                grupo: e.GrupoID,
                tipo: e.TipoID,
                sucursal: e.SucursalID,
                empresa: e.EmpresaID,
            }));
            setResult(transformedData);
        }
    }, [almacenes]);

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
      <Row className="justify-content-start ">
        <Col xs="auto">
          <AdvanceTableSearchBox table />
        </Col>
        <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
          <Link
                to={`/configuration/almacen/nuevo`}  
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

export default TableAlmacenes;
