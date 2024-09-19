import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetVehiculos } from '../../../hooks/Catalogos/Vehiculos/useVehiculo' 
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import { useNavigate } from 'react-router-dom';
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
      accessor: 'agente',
      Header: 'Agente',
      headerProps: { className: 'text-900' }
    },
    {
      accessor: 'ruta',
      Header: 'Ruta',
      headerProps: { className: 'text-900' }
    },
    {
      accessor: 'proveedor',
      Header: 'Proveedor',
      headerProps: { className: 'text-900' }
    },
    {
      accessor: 'condicion',
      Header: 'Condicion',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'empresa',
      Header: 'Empresa',
      headerProps: { className: 'text-900' }
    }
  ];

function TableVehiculos() {
    
    const { getVehiculos, vehiculos, isLoading } = useGetVehiculos();
    const [result, setResult] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const data = {
          ID: user.SucursalID,
        }
        getVehiculos({ data });
    },[]);

    useEffect(() => {
        if(vehiculos.status === 200)
        {   
          console.log(vehiculos.data);
            const transformedData = vehiculos.data.map(e => ({
                acciones: (
                    <Link
                        to={`/configuration/vehiculos/editar/${e.ID}`}
                        className="btn btn-outline-primary rounded-pill me-1 mb-1"     
                    >
                        <FontAwesomeIcon icon="eye" />
                    </Link>
                ),
                estatus: 
                <SubtleBadge className="fs--2" pill bg={e.EstatusID === 1 ? 'success' : 'danger'}>{e.EstatusID === 1 ? 'Alta' : 'Baja'}</SubtleBadge>,
                descripcion: e.Descripcion, placas: e.Placas, agente: e.Agente, ruta: e.RutaID, proveedor: e.Proveedor, condicion: e.Condicion, empresa: e.EmpresaID,
            }));
            setResult(transformedData);
        }
    }, [vehiculos]);

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
                to={`/configuration/vehiculo/nuevo`}  
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

export default TableVehiculos;
