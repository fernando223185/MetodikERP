import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetRutas } from '../../../hooks/Catalogos/Rutas/useRutas' 
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { Link } from 'react-router-dom';


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
      accessor: 'ruta',
      Header: 'Ruta',
      headerProps: { className: 'text-900' }
    },
    {
      accessor: 'destinoAID',
      Header: 'Destino A',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'destinoDID',
      Header: 'Destino D',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'costo',
      Header: 'Costo',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'kms',
      Header: 'Kms',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'tiempo',
      Header: 'Tiempo',
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

function TableRutas(){

    const { getRutas, rutas, isLoading } = useGetRutas();
    const [result, setResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRuta, setSelectedRuta] = useState(null);


    // Function to handle modal show
    const handleShowModal = (ruta) => {
      console.log(ruta);
      setSelectedRuta(ruta); // Set the selected route data
      setShowModal(true); // Show modal 
    };

    const handleCloseModal = () => {
      setShowModal(false); // Hide modal
      setSelectedRuta(null); // Clear selected data
      handleUpdateRutas(); 
    };

    const handleUpdateRutas = async () => {
      await getRutas(); // Fetch updated rutas from API
    };

    useEffect(() => {
        getRutas();
    },[]);
    
    useEffect(() => {
      console.log(rutas);
        if(rutas.status === 200){

            const transformedData = rutas.data.map(r => ({
                acciones: (
                <>
                  <Link
                    className="btn btn-outline-primary rounded-pill me-1 mb-1"
                    to={`/configuration/rutas/edit/${r.ID}`}
                  >
                    <FontAwesomeIcon icon="eye"/>
                  </Link>
                  <Link
                    className="btn btn-outline-primary rounded-pill me-1 mb-1"
                    to={`/configuration/rutas/horarios/${r.ID}`}
                  >
                    <FontAwesomeIcon icon="clock"/>
                  </Link>
                </>
                ),
                estatus: r.EstatusID === 1 ? (
                  <SubtleBadge pill bg="success" className="fs--2" >
                    Activo
                  </SubtleBadge>
                ) : (
                  <SubtleBadge pill bg="danger" className="fs--2">
                    Baja
                  </SubtleBadge>
                ),
                ruta: r.Ruta,
                destinoAID: r.DestinoAID,
                destinoDID: r.DestinoDID,
                sucursalD: r.SucursalD,
                costo: r.Costo,
                kms: r.Kms,
                tiempo: r.Tiempo,
                ultimoCambio: r.UltimoCambio,
            }));
            setResult(transformedData);
        }
    },[rutas]);

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
      <>
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
              to={`/configuration/rutas/nuevo`} // Open form with empty data
              className='btn btn-outline-primary rounded-pill me-1 mb-1'
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
    )

}
export default TableRutas;