import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import FormRutaIda from '../modal/FormRutaIda'


const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'viaje',
    Header: 'Viaje',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
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

function TableRutaIda({ rutaIda, setUpdateList }) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const handleOpenModal = (row) => {
    setSelectedItem(row);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };
  useEffect(() => {
    console.log("rutaId",rutaIda)
    if (rutaIda) 
    {
      const transformedData = rutaIda.map(u => ({
        acciones: (
          <button
            className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
            onClick={() => handleOpenModal(u)} 
          >

            <FontAwesomeIcon icon="plus" />
          </button>
        ),
        viaje: `${u.HRutaID}`,
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
  },[rutaIda])


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
          {showModal && (
            <FormRutaIda 
              show={showModal} 
              handleClose={handleCloseModal} 
              selectedItem={selectedItem} 
              setUpdateList={setUpdateList}
            />
          )}
  </>

  );
}

export default TableRutaIda;
