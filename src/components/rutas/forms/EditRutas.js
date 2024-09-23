import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; // Ensure you're using Form components
import { Col, Row, Card } from 'react-bootstrap';
import { actRutas } from '../../../api/catalogo/rutas/rutas'; //llamada al api  
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { useGetRutasResumen } from '../../../hooks/Catalogos/Rutas/useRutas';
import { useGetFiltroCatalogo } from 'hooks/useFiltros';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faReply, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';


function EditRutas() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { getResumen , rutasResumen, isLoading: loadignRuta} = useGetRutasResumen();

  const { getFiltroCatalogo, isLoading: loadingFiltros, error } = useGetFiltroCatalogo();

  const [formData, setFormData] = useState({
    ID: id,
    Ruta: '',
    EstatusID: 0,
    Zona: '',
    Kms: '',
    Costo: '',
    SucursalID: 0,
    DestinoID: 0,
    OrigenID: 0,
    Tiempo: '',
    Observaciones: '',
    Fecha: '',
    VehiculoID: 0,
    CostoInfantil: 0,
    CostoAdulto: 0,
    CostoInapan: 0,
    });

    const [estatus, setEstatus] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [destinos, setDestinos] = useState([]);


  const getOptionByValue = (options, value) => {

    console.log(options)
    const result = options.find(option => option.Valor == value) || null;
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
      const data = { Tipo: "Destinos", PersonaID:1, Modulo: "Rutas"};
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
            SucursalID: rutasResumen.SucursalID,
            DestinoID: rutasResumen.DestinoID,
            OrigenID: rutasResumen.OrigenID,
            Tiempo: rutasResumen.Tiempo,
            Observaciones: rutasResumen.Observaciones,
            Fecha: moment(rutasResumen.Fecha).format('MM/DD/YYYY'),
            VehiculoID: rutasResumen.VehiculoID,
            CostoInfantil: rutasResumen.CostoInfantil,
            CostoAdulto: rutasResumen.CostoAdulto,
            CostoInapan: rutasResumen.CostoInapan,
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
      // Close the modal after saving
    } catch (error) {
      console.error("Error updating route:", error);
    } 
  };

  console.log(formData);
  if (loadingFiltros || loadignRuta) {
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
                  isInvalid={formData.Fecha === ''}
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

export default EditRutas;
