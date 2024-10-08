import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'; 
import { toast } from 'react-toastify';
import { useActPaqueteriaD, useDelRowPaqueteriaD } from 'hooks/Comercial/Paqueteria/usePaqueteriaD'


const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'art',
    Header: 'Articulo',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'qtyArt',
    Header: 'Cantidad',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'peso',
    Header: 'Peso K/G',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'priceTArt',
    Header: 'Precio Total',
    headerProps: { className: 'text-900' }
  }
];

function TablePaqueteriaD({ paqueteriaD, setUpdateList }) {

  const [result, setResult] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const { actPaqueteriaD, result: resultD, isLoading } = useActPaqueteriaD();
  const { delRowPaqueteriaD, result: resultDel , isLoading: isLoadingDel } = useDelRowPaqueteriaD();


  const handleInputChange = (rowId, columnId, value) => {
    setEditableRows(prevState => ({
      ...prevState,
      [rowId]: {
        ...prevState[rowId],
        [columnId]: value
      }
    }));
  };

  const handleUpdateRow = (rowId) => {
    const updatedRow = editableRows[rowId.RenglonID];
    if (updatedRow) {
      const user = JSON.parse(localStorage.getItem('user'));

      const data = {
        ID: rowId.ID,
        RenglonID: rowId.RenglonID,
        UsuarioID: user.ID,
        Cantidad: updatedRow.qtyArt && updatedRow.qtyArt !== 0 ? updatedRow.qtyArt : rowId.Cantidad,
        Peso: updatedRow.peso && updatedRow.peso !== 0 ? updatedRow.peso : rowId.Peso,
        Precio: rowId.Precio
      }
      actPaqueteriaD({ data })
    }
  };

  const handleDeletedRow = async (id, RowID) => {
    try {
      await delRowPaqueteriaD({ id, RowID });      
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
              position: resultDel.data[0].Posicion,
              icon: resultDel.data[0].Tipo === 'success' ? 
              <FontAwesomeIcon icon={faCheckCircle} /> : 
              resultDel.data[0].Tipo === 'error' ? 
              <FontAwesomeIcon icon={faExclamationTriangle} /> : 
              <FontAwesomeIcon icon={faInfoCircle} />
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
    if (paqueteriaD) {
      const transformedData = paqueteriaD.map(u => ({
        acciones: (
          <>

            <button
              className="btn btn-outline-danger rounded-pill me-1 mb-1 btn-sm"
              onClick={() => handleDeletedRow(u.ID, u.RenglonID)} 
              title='Eliminar Renglon'
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className="btn btn-outline-primary rounded-pill me-1 mb-1 btn-sm"
              onClick={() => handleUpdateRow(u)} 
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </>
        ),
        art: `${u.Articulo}`,
        peso: (
          <input 
            type="text"
            value={editableRows[u.RenglonID]?.peso || u.Peso} 
            onChange={(e) => handleInputChange(u.RenglonID, 'peso', e.target.value)} 
            style={{
              margin: '5px 0',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '14px'
            }}
          />
        ),
        qtyArt: (
          <input 
            type="text"
            value={editableRows[u.RenglonID]?.qtyArt || u.Cantidad}
            onChange={(e) => handleInputChange(u.RenglonID, 'qtyArt', e.target.value)} 
            style={{
              margin: '5px 0',
              padding: '8px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '14px'
            }}
          />
        ),
        priceTArt: u.PrecioTotal
      }));
      setResult(transformedData);
    }
  }, [paqueteriaD, editableRows]);

  useEffect(() => {
    console.log(resultD)
    if (resultD && Object.keys(resultD).length === 0) {
        console.log("resultD es un array vacío:", resultD);
      } else if (resultD && resultD.status === 200) {
          toast[resultD.data[0].Tipo](`${resultD.data[0].Mensaje}`, {
              theme: 'colored',
              position: resultD.data[0].Posicion,
              icon: resultD.data[0].Tipo === 'success' ? 
              <FontAwesomeIcon icon={faCheckCircle} /> : 
              resultD.data[0].Tipo === 'error' ? 
              <FontAwesomeIcon icon={faExclamationTriangle} /> : 
              <FontAwesomeIcon icon={faInfoCircle} />
          }); 
          setUpdateList((prev) => !prev); 
      } else if (resultD) {
          toast.error(`Error al guardar`, {
              theme: 'colored',
              position: 'top-right'
          });
      } 
  },[resultD])

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

export default TablePaqueteriaD;
