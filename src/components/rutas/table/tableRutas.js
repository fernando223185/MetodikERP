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
import FormRutas  from '../modals/FormRutas';



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
                  
                   <FontAwesomeIcon icon="eye" variant="secondary" onClick={() => 
                    {handleShowModal(r)}} // open modal on click
                    />
                ),
                estatus: 
                <SubtleBadge variant={r.EstatusID === 1 ? 'success' : 'danger'}>{r.EstatusID === 1 ? 'Activo' : 'Inactivo'}</SubtleBadge>,
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
        perPage={5}
     >
        <Row className="justify-content-start">
            <Col xs="auto">
                <AdvanceTableSearchBox table />
            </Col>
            <Col xs="auto" sm={6} lg={4} className="ms-auto text-end">
                <IconButton           variant="primary"
                icon="plus"
                size="sm"
                onClick={() => {
                    handleShowModal({}); // Open modal with empty data
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
    
    {selectedRuta && (
      <FormRutas 
        showModal={showModal} 
        handleShowModal={handleShowModal} 
        handleCloseModal={handleCloseModal}
        ruta={selectedRuta} 
        />
    )}
 
    </>
    )

}
export default TableRutas;