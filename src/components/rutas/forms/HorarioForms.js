import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Col, Row, Card,Spinner } from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faSolid, faSave, faReply} from '@fortawesome/free-solid-svg-icons';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { useGetHorarios,useGetHorariosRutas } from 'hooks/Catalogos/Rutas/useRutas';
import { actHorarioRuta, deleteHorarioRutaAsync } from '../../../api/catalogo/rutas/rutas';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';

function Horario() {

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

  const { id } = useParams();

  const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();

  const { getHorarios, horarios, isLoading2 } = useGetHorarios();

  const { getHorariosRutas, horariosRutas, isLoading3 } = useGetHorariosRutas();

  // use State
  // unicos campos que cambian son ID y HorarioID
  const [formData, setFormData] = useState({
    ID:  '',
    RutaID:  id,
    HorarioID:  '',
    Fecha: '',
    VehiculoID:  '',
    CostoInfantil:  '',
    CostoAdulto: '',
    CostoInapan:  '',
  });
  
  const [showModal, setShowModal] = useState(false);

  const [result, setResult] = useState([]);

  const handleModal = (prev) => !prev;

  // Future implementation for better performance
  // const loadOptions = async (inputValue) => {

  //   try {
  //     // Filtrar las opciones según lo que el usuario escribe
  //     const filteredOptions = horarios.filter(h => h.HoraString.includes(inputValue)).map(h => ({
  //       value: h.ID,
  //       label: h.HoraString,
  //     }));

  //     return filteredOptions;
  //   } catch {
  //     console.error("Error fetching horarios:", error);
  //     return[]
  //   }
  // }

  const getOptionByValue = (options, value) => {

    console.log(options)
    const result = options.find(option => option.ID === value) || null;
    if (result) {
      return result.HoraString;
    }
    
    return null; 
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        await getHorarios(); // Llamada a la API para obtener horarios
      } catch (error) {
        console.error("Error fetching horarios:", error);
      }
    };

    const fetchHorariosRutas = async () => {
      try {
        await getHorariosRutas(id); // Llamada a la API para obtener horarios
      } catch (error) {
        console.error("Error fetching horarios:", error);
      }
    }

    fetchHorarios();
    fetchHorariosRutas();
    }, [id]); // Ejecutar solo una vez al montar el componente

    const transformData = () => {
      if(horariosRutas.length > 0 && horarios.length > 0){
        console.log("Ya entro la condicion");
        const transformedData = horariosRutas.map(h => ({
            acciones: (
            <>
              <Link
                className="btn btn-outline-primary rounded-pill me-1 mb-1"
                onClick={() => handleDelete(h.ID)} // se envuelve en una función para evitar que se ejecute inmediatamente
              >
                <FontAwesomeIcon icon={faTrash}/>
              </Link>
            </>
            ),
          horario: getOptionByValue(horarios, h.HorarioID),
      }));       
          setResult(transformedData);
          // pasar la informacion al formulario
          setFormData({
            ID: 0,
            RutaID: id,
            HorarioID: '',
            Fecha: horariosRutas[0].Fecha,
            VehiculoID: horariosRutas[0].VehiculoID,
            CostoInfantil: horariosRutas[0].CostoInfantil,
            CostoAdulto: horariosRutas[0].CostoAdulto,
            CostoInapan: horariosRutas[0].CostoInapan,
          });
      };
    }
    useEffect(() => {
      transformData();
    }, [horariosRutas, ]);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name + ' ' + e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log(formData);
    try {
      console.log(formData);
      await actHorarioRuta(formData); // Make API call to create the data
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  // handle delete 
  const handleDelete = async (id) => {
    try {
      await deleteHorarioRutaAsync(id); // Make API call to delete the data
      getHorariosRutas(id);
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };
  
  if (isLoading || isLoading2 || isLoading3) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  console.log(horariosRutas);

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className='text-primary text-left mb-4'>Horarios</h3> 
          <Form>
            <Row>
              <Col mg={6} className='d-flex justify-content-end'>
                <Link to={`/configuration/rutas`} className="btn btn-secondary rounded-pill me-1">
                  <FontAwesomeIcon icon={faReply} />
                </Link>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ruta</Form.Label>
                  <Form.Control
                    type="text"
                    name="Ruta"
                    value={formData.Ruta}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Horario</Form.Label>
                  <Form.Control 
                    className="cursor-pointer"
                    type="text"
                    placeholder="Seleccionar horario"
                    onClick={() => setShowModal(handleModal)}
                    value={getOptionByValue(horarios, formData.HorarioID)}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="text"
                    name="Fecha"
                    value={formData.Fecha}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehiculo</Form.Label>
                  <Form.Control
                    type="text"
                    name="VehiculoID"
                    value={formData.VehiculoID}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Costo Infantil</Form.Label>
                  <Form.Control
                    type="text"
                    name="CostoInfantil"
                    value={formData.CostoInfantil}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Costo Adulto</Form.Label>
                  <Form.Control
                    type="text"
                    name="CostoAdulto"
                    value={formData.CostoAdulto}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Costo Inapan</Form.Label>
                  <Form.Control
                    type="text"
                    name="CostoInapan"
                    value={formData.CostoInapan}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-end'>
                <Button variant="primary" onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(handleModal)}>
      <Modal.Header closeButton>

        <Modal.Title>Horarios</Modal.Title>

      </Modal.Header>

     <Modal.Body>
      <Form>
        <Row className='justify-content-center'>
          <Col md={6} className=''>
            <Form.Group className="mb-3">
              <Form.Label>Horarios</Form.Label>
              <AsyncSelect
                    cacheOptions
                    defaultOptions={horarios.map(h => ({
                      value: h.ID,
                      label: h.HoraString,
                    }))} // Opciones por defecto
                    onChange={(selectedOption) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        HorarioID: selectedOption.value,
                      }));
                    }} // Manejar la opción seleccionada
                    placeholder="Buscar y seleccionar horario"
                  />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <AdvanceTableWrapper
        columns={columns}
        data={result}
        sortable
        pagination
        perPage={5}
      >
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
    </Modal.Body>
     <Modal.Footer>

       <Button variant="primary" onClick={handleSubmit}>
         <FontAwesomeIcon icon={faSave} />
       </Button>

     </Modal.Footer>

   </Modal>
   </>
  );
}

export default Horario;
