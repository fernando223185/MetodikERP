import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Asegúrate de que los estilos de DatePicker estén incluidos
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'; 
import { useActParadaD, useDelRowParadaD } from 'hooks/Logistica/Ruta/useRutaD'
import { toast } from 'react-toastify';
import ModalAsientos from '../modal/ModalAsientos'
import { Link } from 'react-router-dom';
import moment from 'moment';


const columns = [
  {
    accessor: 'acciones',
    Header: '',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'paradas',
    Header: 'No. Parada',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'abordaje',
    Header: 'Hora Abordaje',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'destino',
    Header: 'Destino',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'desc',
    Header: 'Descripcion',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'horaDesc',
    Header: 'Hora Descanso',
    headerProps: { className: 'text-900' }
  },
  {
    accessor: 'pzsDisp',
    Header: 'Plazas Disponibles',
    headerProps: { className: 'text-900' }
  }
];

function TableRutaD({ rutaD, setUpdateList }) {

  const [result, setResult] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const [showModal, setShowModal] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const { delRowParadaD, result: resultDel, isLoading: isLoadingDel } = useDelRowParadaD();
  const { actParadaD, result: resultD, isLoading } = useActParadaD();

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
        HoraAbordaje: updatedRow.abordaje ? moment(updatedRow.abordaje).format('HH:mm:ss') : null,
        Descripcion: updatedRow.desc && updatedRow.desc !== 0 ? updatedRow.desc : rowId.desc      }
      console.log(updatedRow)
      actParadaD({ data })
    }
  };

  const handleDeletedRow = async (id, RowID) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      await delRowParadaD({ id, RowID, UsuarioID: user.ID});      
      console.log("Fila eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la fila:", error);
    }
  };

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
    if (rutaD) {
      const transformedData = rutaD.map(u => ({
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
        paradas: u.RenglonID,
        abordaje: (
          <DatePicker
            selected={editableRows[u.RenglonID]?.abordaje || (u.HoraAbordaje ? moment(u.HoraAbordaje, 'HH:mm:ss.SSSSSSS').toDate() : null)}
            onChange={(date) => handleInputChange(u.RenglonID, 'abordaje', date)}
            className="form-control"
            placeholderText="Seleccionar horario"
            timeIntervals={5}
            dateFormat="h:mm aa"
            showTimeSelect
            showTimeSelectOnly
          />
        ),
        destino: u.DestinoNombre,
        desc: (
          <input 
            type="text"
            value={editableRows[u.RenglonID]?.desc || u.Descripcion}
            onChange={(e) => handleInputChange(u.RenglonID, 'desc', e.target.value)} 
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
        horaDesc: u.HoraDescenso,
        pzsDisp: u.PlazasDisponible
      }));
      setResult(transformedData);
    }
  }, [rutaD, editableRows]);

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

export default TableRutaD;
