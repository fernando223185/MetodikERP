import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Ensure you're using Form components
import {Col, Row } from 'react-bootstrap';
import { actRutas } from '../../../api/catalogo/rutas/rutas'; //llamada al api  
import moment from 'moment/moment';

function FormRutas({ showModal, handleShowModal, handleCloseModal, ruta, }) {


  const [formData, setFormData] = useState({
    ID: ruta.ID || '',
    Ruta: ruta.Ruta || '',
    Zona: ruta.Zona || '',
    Kms: ruta.Kms || '',
    Costo: ruta.Costo || '',
    SucursalD: ruta.SucursalD || '',
    DestinoDID: ruta.DestinoDID || '',
    DestinoAID: ruta.DestinoAID || '',
    Observaciones: ruta.Observaciones || '',
    EstatusID: ruta.EstatusID || '',
    Tiempo: ruta.Tiempo || '',
    UltimoCambio: ruta.UltimoCambio ? moment(ruta.UltimoCambio).format('YYYY-MM-DD') : '',
    FechaRegistro: ruta.FechaRegistro ? moment(ruta.FechaRegistro).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD 00:00:00'),
    });
    

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
    const formattedData = {
      ...formData,
      UltimoCambio:  moment().format('YYYY-MM-DD 00:00:00'),
    };
    console.log(formattedData);
    try {
      await actRutas(formattedData); // Make API call to update the data
      handleCloseModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating route:", error);
    } 
  };
  // `ruta` contains the selected route's data passed from the parent component.
  return (
    <>
     {/* Modal */}
     <Modal size="lg" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
       <Modal.Title>Editar Ruta</Modal.Title>
      </Modal.Header>

     <Modal.Body>
      <Form>
        {/* Example Input Fields with Pre-filled Data */}
        <Form.Group controlId="formRuta">
          <Form.Label>Ruta</Form.Label>
          <Form.Control
            type="text"
            name="Ruta"
            placeholder="Enter Ruta"
            value={formData.Ruta} // Pre-fill with selected route data
            onChange={onChangeHandler}
          />
        </Form.Group>
      <Row className='my-2'>
        <Col>
          <Form.Group controlId="formCosto">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="Costo"
              placeholder="Enter Costo"
              value={formData.Costo} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formKms">
            <Form.Label>Kilometers (Kms)</Form.Label>
            <Form.Control
              type="number"
              name="Kms"
              placeholder="Enter Kms"
              value={formData.Kms} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='my-2'>
        <Col>
          <Form.Group controlId="formTiempo">
            <Form.Label>Tiempo</Form.Label>
            <Form.Control
              type="text"
              name="Tiempo"
              placeholder="Enter Tiempo"
              value={formData.Tiempo} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formEstatus">
          <Form.Label>Estatus</Form.Label>
          <Form.Control
            as="select"
            name="EstatusID"
            value={formData.EstatusID}
            onChange={onChangeHandler}
          >
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </Form.Control>
        </Form.Group>
        </Col>
      </Row>
      <Row className='my-2'>
        <Col>
          <Form.Group controlId="formDestinoAID">
            <Form.Label>Destino A ID</Form.Label>
            <Form.Control
              type="text"
              name="DestinoAID"
              placeholder="Enter Destino A ID"
              value={formData.DestinoAID} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDestinoDID">
            <Form.Label>Destino D ID</Form.Label>
            <Form.Control
              type="text"
              name="DestinoDID"
              placeholder="Enter Destino D ID"
              value={formData.DestinoDID} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSucursalID">
            <Form.Label>Sucursal ID</Form.Label>
            <Form.Control
              type="text"
              name="SucursalD"
              placeholder="Enter Sucursal ID"
              value={formData.SucursalD} // Pre-fill with selected route data
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Col>
      </Row>
     </Form>
    </Modal.Body>
     <Modal.Footer>

       <Button variant="primary" onClick={handleSubmit}>
         Saves Changes
       </Button>

     </Modal.Footer>

   </Modal>

   </>
  );
}

export default FormRutas;
