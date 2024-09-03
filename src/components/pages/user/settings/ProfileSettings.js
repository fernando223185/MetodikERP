import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useParams } from 'react-router-dom';
import { actEmpresas } from 'api/catalogo/empresas/empresas';

const ProfileSettings = ({mode = 'update',initialData = {}}) => {

  const { id } = useParams();
  const [formData, setFormData] = useState(initialData[0] ? initialData[0] : {});


  useEffect(() => {
    if(mode === 'update' && initialData){
      setFormData(initialData[0]);
    }
  },[mode,initialData]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('the button was clicked');
    console.log(formData);
    let data = {};
    if(mode === 'update'){
      data = {
        ID: id,
        Nombre: formData.Nombre,
        RFC: formData.RFC,
        CodigoPostal: formData.CodigoPostal,
        Colonia: formData.Colonia,
        Direccion: formData.Direccion,
        DireccionNumeroINT: formData.DireccionNumeroINT,
        DireccionNumero: formData.DireccionNumero,
        Estado: formData.Estado,
        Pais: formData.Pais,
        Poblacion: formData.Poblacion
      }
    } else if(mode === 'create'){
      data = {
        Nombre: formData.Nombre,
        RFC: formData.RFC,
        CodigoPostal: formData.CodigoPostal,
        Colonia: formData.Colonia,
        Direccion: formData.Direccion,
        DireccionNumeroINT: formData.DireccionNumeroINT,
        DireccionNumero: formData.DireccionNumero,
        Estado: formData.Estado,
        Pais: formData.Pais,
        Poblacion: formData.Poblacion,
        EstatusID: formData.EstatusID
      }
    }
    const result = await actEmpresas({ data });
    console.log(result);
  }

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-body-tertiary">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={formData.Nombre}
                name="Nombre"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="RFC">
              <Form.Label>RFC</Form.Label>
              <Form.Control
                type="text"
                placeholder="RFC"
                value={formData.RFC}
                name="RFC"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="codigoPostal">
              <Form.Label>CodigoPostal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Codigo Postal" 
                value={formData.CodigoPostal}
                name="CodigoPostal"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="Colonia">
              <Form.Label>Colonia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Colonia"
                value={formData.Colonia}
                name="Colonia"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="Direccion">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              text="text"
              placeholder="Direccion"
              value={formData.Direccion}
              name="Direccion"
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Direccion Numero INT">
              <Form.Label>Direccion Numero INT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion Numero INT" 
                value={formData.DireccionNumeroINT}
                name="DireccionNumeroINT"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="Direccion Numero Ext">
              <Form.Label>Direccion Numero EXT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion Numero Ext"
                value={formData.DireccionNumero}
                name="DireccionNumero"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado" 
                value={formData.Estado}
                name="Estado"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="Pais">
              <Form.Label>Pais</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pais"
                value={formData.Pais}
                name="Pais"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Poblacion">
              <Form.Label>Poblacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Poblacion"
                value={formData.Poblacion}
                name="Poblacion"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} lg={6} controlId="EstatusID">
              <Form.Label>Estatus</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estatus"
                value={formData.EstatusID}
                name="EstatusID"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          
          <div className="text-end">
            <Button variant="primary" type="submit">
              {mode === 'update' ? 'Actualizar' : 'Crear'} 
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;
