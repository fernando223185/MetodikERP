import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; // Ensure you're using Form components
import { Col, Row, Card } from 'react-bootstrap';
import { actRutas } from '../../../api/catalogo/rutas/rutas'; //llamada al api  
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { useGetRutasResumen } from '../../../hooks/Catalogos/Rutas/useRutas';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function EditRutas() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { getResumen , rutasResumen, isLoading} = useGetRutasResumen();

  const { getFiltroCatalogo, isLoading2, error } = useGetFiltroCatalogo();

  const [formData, setFormData] = useState({
    ID: id,
    Ruta: '',
    EstatusID: '',
    Zona: '',
    Kms: '',
    Costo: '',
    SucursalD: '',
    DestinoDID: '',
    DestinoAID: '',
    Tiempo: '',
    Observaciones: '',
    });

    const [estatus, setEstatus] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [destinos, setDestinos] = useState([]);


  const getOptionByValue = (options, value) => {

    console.log(options)
    const result = options.find(option => option.Valor === value) || null;
    if (result) {
      return { value: result.Valor, label: result.Dato };
      }
    return null; 
    };

  useEffect(() => {

    const fetchEstatus = async () => {
      const data = { Tipo: "Estatus", PersonaID:1, Modulo: "Rutas"};
      const result = await getFiltroCatalogo(data);
      setEstatus(result);
    };
    const fetchSucursales = async () => {
      const data = { Tipo: "Sucursales", PersonaID:1, Modulo : "Rutas"};
      const result = await getFiltroCatalogo(data);
      setSucursales(result);
    };
    const fetchDestinos = async () => {
      const data = {Tipo: "Destinos",PersonaID:1, Modulo: "Rutas"};
      const result = await getFiltroCatalogo(data);
      setDestinos(result);
    };
    fetchEstatus();
    fetchSucursales();
    fetchDestinos();

  }, []);

    useEffect(() => {
        getResumen(id);
    }, [id]);

    useEffect(() => {
        if (rutasResumen) {
          setFormData({
            ID: id,
            Ruta: rutasResumen.Ruta,
            EstatusID: rutasResumen.EstatusID,
            Zona: rutasResumen.Zona,
            Kms: rutasResumen.Kms,
            Costo: rutasResumen.Costo,
            SucursalD: rutasResumen.SucursalD,
            DestinoDID: rutasResumen.DestinoDID,
            DestinoAID: rutasResumen.DestinoAID,
            Tiempo: rutasResumen.Tiempo,
            Observaciones: rutasResumen.Observaciones,
          });
        }
        console.log(rutasResumen)
      }
    , [rutasResumen]);

     // Handle form input change
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
      await actRutas(formData); // Make API call to update the data
      navigate('/configuration/rutas/horarios/' + id);
      // Close the modal after saving
    } catch (error) {
      console.error("Error updating route:", error);
    } 
  };

  if (isLoading || isLoading2) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // `ruta` contains the selected route's data passed from the parent component.
  return (
    <>
      <Card>
        <Card.Body>
        <h3 className='text-primary text-left mb-4'>Editar Ruta</h3> 
        <Form>
          <Row>
            <Col mg={6} className='d-flex justify-content-end'>
            <Link
              to={`/configuration/rutas`}
              className="btn btn-secondary rounded-pill me-1"
              >
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
                <Form.Label>Estatus</Form.Label>
                <Select 
                  options={estatus.map(item => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={option => setFormData({...formData, EstatusID: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(estatus, formData.EstatusID)}
                  placeholder="Selecciona un estatus"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Zona</Form.Label>
                <Form.Control
                  type="text"
                  name="Zona"
                  value={formData.Zona}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Kms</Form.Label>
                <Form.Control
                  type="text"
                  name="Kms"
                  value={formData.Kms}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Costo</Form.Label>
                <Form.Control
                  type="text"
                  name="Costo"
                  value={formData.Costo}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Sucursal</Form.Label>
                <Select
                  options={sucursales.map(item => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={option => setFormData({...formData, SucursalD: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(sucursales, formData.SucursalD)}
                  placeholder="Selecciona una sucursal"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Destino</Form.Label>
                <Select
                  options={destinos.map(item => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={option => setFormData({...formData, DestinoDID: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(destinos, formData.DestinoDID)}
                  placeholder="Selecciona un destino"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Origen</Form.Label>
                <Select
                  options={destinos.map(item => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={option => setFormData({...formData, DestinoAID: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(destinos, formData.DestinoAID)}
                  placeholder="Selecciona un destino"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tiempo</Form.Label>
                <Form.Control
                  type="text"
                  name="Tiempo"
                  value={formData.Tiempo}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
            <Form.Group className="mb-3"> 
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                name="Observaciones"
                value={formData.Observaciones}
                onChange={onChangeHandler}
              />
              </Form.Group>
            <Row>
              <Col className='d-flex justify-content-end'>
                <Button variant="primary" onClick={handleSubmit}>
                  Siguiente
                </Button>
              </Col>
            </Row>
        </Form>
        </Card.Body>
      </Card>
   </>
  );
}

export default EditRutas;
