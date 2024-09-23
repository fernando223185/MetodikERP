import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'; // Ensure you're using Form components
import { Col, Row, Card } from 'react-bootstrap';
import Select from 'react-select';
import { actRutas } from '../../../api/catalogo/rutas/rutas'; //llamada al api  
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply,faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateRutas() {

  const { getFiltroCatalogo, isLoading, error } = useGetFiltroCatalogo();

  const navigate = useNavigate();

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
    Observaciones: '',
    Fecha: '',
    VehiculoID: '',
    CostoInfantil: '',
    CostoAdulto: '',
    CostoInapan: '',
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
    console.log(formData);
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
      const result = await actRutas(formData); // Make API call to update the data
      toast[result.data[0].Tipo](`${result.data[0].Mensaje}`,{
        theme: "colored",
        position: result.data[0].Position,
        icon: result.data[0].Tipo === 'success' ? 
          <FontAwesomeIcon icon={faCheckCircle} /> : 
          result.data[0].Tipo === 'error' ? 
          <FontAwesomeIcon icon={faExclamationTriangle} /> : 
          <FontAwesomeIcon icon={faInfoCircle} />
      }); 
      if(result.data[0].Tipo === "success"){  // Display the success message
        navigate('/configuration/rutas'); // Navigate to the routes list page
      }
    } catch (error) {
      console.error("Error updating route:", error);
    } 
  };

  // `ruta` contains the selected route's data passed from the parent component.
  return (
    <>
      <Card>
        <Card.Body>
        <h3 className='text-primary text-left mb-4'>Editar Ruta</h3> 
        <Form>
          <Row>
            <Col className='d-flex justify-content-end'>
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
                  defaultValue={getOptionByValue(estatus, formData.EstatusID)}
                  options={estatus.map(item => ({
                    value: item.Valor,
                    label: item.Dato,
                  }))}
                  onChange={option => setFormData({...formData, EstatusID: option.value})}
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
                  onChange={option => setFormData({...formData, SucursalID: option.value})}
                  value={getOptionByValue(sucursales, formData.SucursalID)}
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
                  onChange={option => setFormData({...formData, DestinoID: option.value})}
                  value={getOptionByValue(destinos, formData.DestinoID)}
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
                  onChange={option => setFormData({...formData, OrigenID: option.value})}
                  value={getOptionByValue(destinos, formData.OrigenID)}
                  placeholder="Selecciona un destino"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Vehiculo</Form.Label>
                <Form.Control
                  type="text"
                  name="VehiculoID"
                  value={formData.VehiculoID}
                  onChange={onChangeHandler}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3"> 
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  name="Observaciones"
                  value={formData.Observaciones}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Costo Infantil</Form.Label>
                <Form.Control
                  type="text"
                  name="CostoInfantil"
                  value={formData.CostoInfantil}
                  onChange={onChangeHandler}
                  required
                />
                </Form.Group>
            </Col>
            <Col>
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
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Costo Inapan</Form.Label>
                <Form.Control
                  type="text"
                  name="CostoInapan"
                  value={formData.CostoInapan}
                  onChange={onChangeHandler}
                  required
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
   </>
  );
}

export default CreateRutas;
