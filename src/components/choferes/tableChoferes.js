import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetChoferes } from '../../hooks/Catalogos/Choferes/useChoferes'; 
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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
      accessor:'nombre',
      Header: 'Nombre',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'observaciones',
      Header: 'Observaciones',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'proveedor',
      Header: 'Proveedor',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'vehiculo',
      Header: 'Vehiculo',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'sucursalD',
      Header: 'Sucursal',
      headerProps: { className: 'text-800' }
    },
    {
      accessor:'ultimoCambio',
      Header: 'Ultimo Cambio',
      headerProps: { className: 'text-800' }
    },

];

function TableChoferes(){

    const { getChoferes, choferes, isLoading } = useGetChoferes();
    const [result, setResult] = useState([]);
    const [selectedChofer, setSelectedChofer] = useState(null);

    
    useEffect(() => {
        getChoferes();
    }, []);

    useEffect(() => {
        console.log(choferes);
          if(choferes.status === 200){
  
              const transformedData = choferes.data.map(c => ({
                  acciones: (
                    <Link
                    to={`/configuration/choferes/view-profile/${c.ID}`}  
                    className="btn btn-outline-primary rounded-pill me-1 mb-1"
                  >
                    <FontAwesomeIcon icon="edit" />
                  </Link>
                  ),
                  estatus: 
                  <SubtleBadge variant={c.EstatusID === 1 ? 'success' : 'danger'}>{c.EstatusID === 1 ? 'Activo' : 'Inactivo'}</SubtleBadge>,
                  nombre: c.Nombre,
                  observaciones: c.Observaciones,
                  proveedor: c.ProveedorID,
                  sucursalD: c.SucursalID,
                  vehiculo: c.VehiculoID,
                  ultimoCambio: c.UltimaModificacion,
              }));
              setResult(transformedData);
          }
      },[choferes]);
  
      if (isLoading) {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          );
        }

    return(
        <>
     <AdvanceTableWrapper
        columns={columns}
        data={result}
        sortable
        pagination
        perPage={5}
     >
        <Row className="justify-content-start">
            <Col xs="auto">
                <AdvanceTableSearchBox table />
            </Col>
            <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
              <Link
                to={`/configuration/choferes/nuevo`} // Open modal with empty data
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
            rowCount={4}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
            />
        </div>
    </AdvanceTableWrapper>
    </>
    );
}

export default TableChoferes;