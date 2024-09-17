import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetEmpresas } from '../../../hooks/Catalogos/Empresas/useEmpresa' 
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
      accessor: 'empresa',
      Header: 'Nombre',
      headerProps: { className: 'text-900' }
    },
    {
      accessor: 'direccion',
      Header: 'Dirección',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'rfc',
      Header: 'RFC',
      headerProps: { className: 'text-900' }
    }
  ];

function TableEmpresas() {
    
    const { getEmpresas, empresas, isLoading } = useGetEmpresas();
    const [result, setResult] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const data = {
          ID: user.EmpresaID,
        }
        getEmpresas({ data });
    },[]);

    useEffect(() => {
        if(empresas.status === 200)
        {   
          console.log(empresas.data);
            const transformedData = empresas.data.map(e => ({
                acciones: (
                    <IconButton
                        icon="edit"
                        size="sm"
                        variant="primary"
                        onClick={() => {
                            navigate(`/configuration/empresas/editar/${e.ID}`);
                        }}
                    />
                ),
                estatus: 
                <SubtleBadge variant={e.EstatusID === 1 ? 'success' : 'danger'}>{e.EstatusID === 1 ? 'Activo' : 'Inactivo'}</SubtleBadge>,
                empresa: e.Nombre,
                direccion: `${e.CodigoPostal} ${e.Colonia} ${e.Direccion} ${e.DireccionNumero} ${e.Estado}`,
                rfc: e.RFC,
            }));
            setResult(transformedData);
        }
    }, [empresas]);

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
          <IconButton           variant="primary"
          icon="plus"
          size="sm"
          onClick={() => {
            navigate('/configuration/empresa/nuevo');
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

export default TableEmpresas;