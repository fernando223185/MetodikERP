import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import FormRutaIda from '../modal/FormRutaIda'
import { useAgregarParadaD } from 'hooks/Logistica/Ruta/useRutaD'
import { toast } from 'react-toastify';
import { faBus, faUsers, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 

const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'orden',
    Header: 'Orden',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'desc',
    Header: 'Nombre Parada',
    headerProps: { className: 'text-900' }
  }
];

function TableRutaDisp({ rutasDisponibles, setUpdateList, id }) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); 
  const { agregarParada, result: resultDAdd, isLoading } = useAgregarParadaD();

  const handleAddArt = (row) => {
    console.log("row",row)
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
        ID: id,
        UsuarioID: user.ID,
        DestinoID: row.DestinoID
    }
    agregarParada({ data })
  };

  useEffect(() => {
    console.log(resultDAdd)
    if (resultDAdd && Object.keys(resultDAdd).length === 0) {
        console.log("resultDAdd es un array vacío:", resultDAdd);
      } else if (resultDAdd && resultDAdd.status === 200) {
          toast[resultDAdd.data[0].Tipo](`${resultDAdd.data[0].Mensaje}`, {
              theme: 'colored',
              position: resultDAdd.data[0].Posicion,
              icon: resultDAdd.data[0].Tipo === 'success' ? 
              <FontAwesomeIcon icon={faCheckCircle} /> : 
              resultDAdd.data[0].Tipo === 'error' ? 
              <FontAwesomeIcon icon={faExclamationTriangle} /> : 
              <FontAwesomeIcon icon={faInfoCircle} />
          }); 
          setTimeout(() => {
            setUpdateList((prev) => !prev); 
          }, 1000)
      } else if (resultDAdd) {
          toast.error(`Error al guardar`, {
              theme: 'colored',
              position: 'top-right'
          });
      } 
  },[resultDAdd])

  useEffect(() => {
    console.log("rutaId",rutasDisponibles)
    if (rutasDisponibles) 
    {
      const transformedData = rutasDisponibles.map(u => ({
        acciones: (
          <button
            className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
            onClick={() => handleAddArt(u)} 
          >

            <FontAwesomeIcon icon="plus" />
          </button>
        ),
        desc: u.NombreParada,
        orden: u.Orden
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[rutasDisponibles])


  return (
  <>

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
  </>

  );
}

export default TableRutaDisp;
