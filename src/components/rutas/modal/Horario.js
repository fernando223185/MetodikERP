import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { useGetHorariosRutas } from 'hooks/Catalogos/Rutas/useRutas';
import { actHorarioRuta, deleteHorarioRutaAsync } from '../../../api/catalogo/rutas/rutas';
import AsyncSelect from 'react-select/async';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import { toast } from 'react-toastify';

const columns = [
  {
    accessor: 'acciones',
    Header: 'Acciones',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
  {
    accessor: 'horario',
    Header: 'Horarios',
    headerProps: { className: 'text-900' },
    cellProps: { className: 'text-center' }
  },
];

function Horario({ id, showModal, handleCloseModal,horarios }) {

  const { getHorariosRutas, horariosRutas, isLoading:loadingRutas } = useGetHorariosRutas();


  const [formData, setFormData] = useState({
    ID: '',
    RutaID: id,
    HorarioID: '',
  });

  const [result, setResult] = useState([]);


  const getOptionByValue = (options, value) => {
    const result = options.find(option => option.ID === value) || null;
    return result ? result.HoraString : null;
  };

  const transformData = () => {
    if (horariosRutas) {
      const transformedData = horariosRutas.map(h => ({
        acciones: (
          <Link
            className="btn btn-outline-primary rounded-pill me-1 mb-1"
            onClick={() => handleDelete(h.ID)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Link>
        ),
        horario: getOptionByValue(horarios, h.HorarioID),
      }));
      setResult(transformedData);
      setFormData({
        ID: 0,
        RutaID: id,
        HorarioID: '',
      });
    }
  };

  const fetchHorariosRutas = async () => {
    try{
      await getHorariosRutas(id);
    } catch (error) {
      console.error('Error fetching horarios:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await actHorarioRuta(formData);
      await getHorariosRutas(id);
      toast.success('Horario actualizado con éxito');
    } catch (error) {
      console.error('Error updating route:', error);
      toast.error('Error al actualizar el horario');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHorarioRutaAsync(id);
      await getHorariosRutas(formData.RutaID);
      toast.success('Horario eliminado con éxito');
    } catch (error) {
      console.error('Error deleting route:', error);
      toast.error('Error al eliminar el horario');
    }
  };

  useEffect(() => {
    fetchHorariosRutas();
  }, [id]);

  useEffect(() => {
    transformData();
    console.log(horariosRutas);
  }, [horariosRutas]);


  return (
    <Modal size="lg" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Horarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { loadingRutas ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Form>
              <Row className="justify-content-center">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Horarios</Form.Label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={horarios.map(h => ({
                        value: h.ID,
                        label: h.HoraString,
                      }))}
                      onChange={(selectedOption) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          HorarioID: selectedOption.value,
                        }))
                      }
                      placeholder="Buscar y seleccionar horario"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <AdvanceTableWrapper columns={columns} data={result} sortable pagination perPage={5}>
              <hr style={{ margin: '10px 0' }} />
              <AdvanceTable
                table
                headerClassName="bg-200 text-nowrap align-middle"
                rowClassName="align-middle white-space-nowrap"
                tableProps={{
                  bordered: true,
                  striped: true,
                  className: 'fs--1 mb-0 overflow-hidden',
                }}
              />
              <div className="mt-3">
                <AdvanceTableFooter rowCount={result.length} table rowInfo navButtons rowsPerPageSelection />
              </div>
            </AdvanceTableWrapper>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Horario;
