import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { useAgregarEquipajeD } from 'hooks/Comercial/Reserva/useReservaD'
import { faBus, faUsers, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import { toast } from 'react-toastify';

const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'clave',
    Header: 'Clave',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'desc',
    Header: 'Descripcion',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'price',
    Header: 'Precio',
    headerProps: { className: 'text-900' }
  }
];

function TableArtDisponible({ Art, setUpdateList, id }) {

  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const { agregarPaqueteriaD, result: resultDAdd, isLoading } = useAgregarEquipajeD();


  const handleAddArt = (row) => {
    console.log("row",row)
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
        ID: id,
        UsuarioID: user.ID,
        Articulo: row.Clave
    }
    agregarPaqueteriaD({ data })
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
            setUpdateList((prev) => !prev); 
      } else if (resultDAdd) {
          toast.error(`Error al guardar`, {
              theme: 'colored',
              position: 'top-right'
          });
      } 
  },[resultDAdd])

  useEffect(() => {
    if (Art) 
    {
      const transformedData = Art.map(u => ({
        acciones: (
          <button
            className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
            onClick={() => handleAddArt(u)} 
          >

            <FontAwesomeIcon icon="plus" />
          </button>
        ),
        clave: u.Clave,
        desc: u.Descripcion,
        price: u.Precio
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[Art])


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

export default TableArtDisponible;
