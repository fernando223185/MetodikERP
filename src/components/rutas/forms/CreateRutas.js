import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'; // Ensure you're using Form components
import { Col, Row, Card } from 'react-bootstrap';
import Select from 'react-select';
import { actRutas } from '../../../api/catalogo/rutas/rutas'; //llamada al api  
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';

function CreateRutas() {

  const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();

  const [formData, setFormData] = useState({
    ID:  '',
    Ruta:  '',
    Zona:  '',
    Kms: '',
    Costo:  '',
    Estatus:  '',
    SucursalD:  '',
    DestinoDID:  '',
    DestinoAID:  '',
    Observaciones:'',
    Tiempo: '',
    });
    
  const [estatus, setEstatus] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [destinos, setDestinos] = useState([]);

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

  // Handle form input change

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name + ' ' + e.target.value);
  };

  const getOptionByValue = (options, value) => {

    console.log(options)
    const result = options.find(option => option.Valor === value) || null;
    if (result) {
      return { value: result.Valor, label: result.Dato };
    }
    
    return null; 
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log(formData);
    try {
      await actRutas(formData); // Make API call to update the data
      // Close the modal after saving
    } catch (error) {
      console.error("Error updating route:", error);
    } 
  };

  // `ruta` contains the selected route's data passed from the parent component.
  return (
    <>
      <Card>
        <Card.Body>
        <h3 className='text-primary text-left mb-4'>Nueva Ruta</h3> 
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
                  className="react-select"
                  options={estatus.map(item =>({ 
                    value: item.Valor, 
                    label: item.Dato,
                   }))}
                  onChange={option => setFormData({...formData, Estatus: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(estatus, formData.Estatus)}
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
                  className="react-select"
                  options={sucursales.map(item =>({ 
                    value: item.Valor, 
                    label: item.Dato,
                   }))}
                  onChange={option => setFormData({...formData, SucursalD: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(sucursales, formData.SucursalD)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Destino</Form.Label>
                <Select 
                  className="react-select"
                  options={destinos.map(item =>({ 
                    value: item.Valor, 
                    label: item.Dato,
                   }))}
                  onChange={option => setFormData({...formData, DestinoDID: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(destinos, formData.DestinoDID)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Origen</Form.Label>
                <Select 
                  className="react-select"
                  options={destinos.map(item =>({ 
                    value: item.Valor, 
                    label: item.Dato,
                   }))}
                  onChange={option => setFormData({...formData, DestinoAID: option.value})}
                  isLoading={isLoading}
                  value={getOptionByValue(destinos, formData.DestinoAID)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Horas</Form.Label>
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

export default CreateRutas;
