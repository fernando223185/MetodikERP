import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetAlmacenes } from '../../../hooks/Catalogos/Almacenes/useAlmacen' 
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import IconButton from 'components/common/IconButton';
import { useNavigate } from 'react-router-dom';

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
        accessor: 'almacen',
        Header: 'Almacen',
        headerProps: { className: 'text-900' }
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

    const navigate = useNavigate();

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
                    <IconButton
                        icon="edit"
                        size="sm"
                        variant="primary"
                        onClick={() => {
                            navigate(`/configuration/almacenes/editar/${e.ID}`);
                        }}
                    />
                ),
                estatus: 
                <SubtleBadge variant={e.EstatusID === 1 ? 'success' : 'danger'}>{e.EstatusID === 1 ? 'Activo' : 'Inactivo'}</SubtleBadge>,
                almacen: e.Almacen,
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
          <IconButton           variant="primary"
          icon="plus"
          size="sm"
          onClick={() => {
            navigate('/configuration/almacen/nuevo');
          }}
        >
        </IconButton>
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
          rowCount={4}
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