import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { faBus } from '@fortawesome/free-solid-svg-icons'; 
import { useDelRowReservaD } from '../../../../hooks/Comercial/Reserva/useReservaD'
import { toast } from 'react-toastify';



const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'tipo',
    Header: 'Tipo',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'desc',
    Header: 'Descripcion',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'asiento',
    Header: 'Asientos',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'cant',
    Header: 'Cantidad',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'price',
    Header: 'Precio',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'priceT',
    Header: 'Precio Total',
    headerProps: { className: 'text-900' }
  }
];

function TableReservaD({ reservaD, setUpdateList }) {

  const [result, setResult] = useState([]);
  const [formToShow, setFormToShow] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const { delRowReservaD, result: resultDel, isLoading } = useDelRowReservaD();

  const handleOpenModal = (row) => {
    setSelectedItem(row);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleDeletedRow = async (id, RowID) => {
    try {
      await delRowReservaD({ id, RowID });      
      console.log("Fila eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la fila:", error);
    }
  };

  useEffect(() => {
    console.log(resultDel)
    if (resultDel && Object.keys(resultDel).length === 0) {
        console.log("resultNew es un array vacío:", resultDel);
      } else if (resultDel && resultDel.status === 200) {
          toast[resultDel.data[0].Tipo](`${resultDel.data[0].Mensaje}`, {
              theme: 'colored',
              position: resultDel.data[0].Posicion
          });
          setTimeout(() => {
            setUpdateList((prev) => !prev); 
          }, 1000)
      } else if (resultDel) {
          toast.error(`Error al guardar`, {
              theme: 'colored',
              position: 'top-right'
          });
      } 
  },[resultDel])

  useEffect(() => {
    console.log("rutaId",reservaD)
    if (reservaD) 
    {
      const transformedData = reservaD.map(u => ({
        acciones: (
            <>
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <button
                    className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
                    //onClick={() => handleOpenModal(u)} 
                  >
                    <FontAwesomeIcon icon="edit" />
                  </button>
                  <button
                    className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
                    //onClick={() => handleOpenModal(u)} 
                  >
                    <FontAwesomeIcon icon={faBus} />
                  </button>
                  <button
                    className="btn btn-outline-danger rounded-pill me-1 mb-1 btn-sm"
                    onClick={() => handleDeletedRow(u.ID, u.RenglonID)} 
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </>
              )}
            </>
        ),
        tipo: `${u.Tipo}`,
        desc: u.Descripcion,
        price: u.Precio,
        asiento: u.Asientos,
        cant: u.Cantidad,
        priceT: u.PrecioTotal
      }));
      setResult(prevResult => {
        if (JSON.stringify(prevResult) !== JSON.stringify(transformedData)) {
          return transformedData;
        }
        return prevResult;
      });
    }
  },[reservaD])


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

export default TableReservaD;
