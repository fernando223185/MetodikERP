import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import SubtleBadge from 'components/common/SubtleBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { Link } from 'react-router-dom';
import Horario from '../modal/Horario';
import IconButton from 'components/common/IconButton';
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
      accessor: 'origen',
      Header: 'Origen',
      headerProps: { className: 'text-900' }
    },
    {
      accessor:'destino',
      Header: 'Destino ',
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

function TableRutas({rutas, sucursales, destinos, horarios}) {

    const [result, setResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectID, setSelectID] = useState();

   // Function to open the modal and set the selected ID
    const openModal = (id) => {
      console.log("The button was clicked");
      setSelectID(id);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const getOptionByValue = (options, value) => {
      const result = options.find(option => option.Valor == value) || null;
       return result ? result.Dato : '';
    };


    useEffect(() => {
       if(rutas.status === 200){

         const transformedData = rutas.data.map(ruta => ({
           acciones: (
           <>
             <Link
               to={`/configuration/rutas/edit/${ruta.ID}`}
               className='btn btn-outline-primary rounded-pill me-1 mb-1'
             >
               <FontAwesomeIcon icon="eye" />
             </Link>
              <Link
                className='btn btn-outline-primary rounded-pill me-1 mb-1'
              >
                <FontAwesomeIcon icon="clock" 
                onClick={() => openModal(ruta.ID)}
                />
              </Link>
            </>
           ),
           estatus: ruta.EstatusID === 1 ? (
            <SubtleBadge pill bg="success" className="fs--2">
              Alta
            </SubtleBadge>
          ) : (
            <SubtleBadge pill bg="danger" className="fs--2">
              Baja
            </SubtleBadge>
          ),
           ruta: ruta.Ruta,
           origen: getOptionByValue(destinos, ruta.OrigenID),
           destino: getOptionByValue(destinos, ruta.DestinoID),
           costo: ruta.Costo,
           kms: ruta.Kms,
           tiempo: ruta.Tiempo,
           sucursalD: getOptionByValue(sucursales, ruta.SucursalID),
           ultimoCambio: ruta.UltimoCambio
         }));
         setResult(transformedData);
       }
      },[rutas, sucursales, destinos]);
    

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
            rowCount={result.length}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
            />
        </div>
    </AdvanceTableWrapper>
    {showModal && (
      <Horario 
        showModal={showModal}
        handleCloseModal={closeModal}
        id={selectID}
        horarios={horarios}
      />
    )}
    </>
    )

}
export default TableRutas;