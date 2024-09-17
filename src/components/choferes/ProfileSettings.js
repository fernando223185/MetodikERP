import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useParams } from 'react-router-dom';
import { actChoferes } from 'api/catalogo/choferes/choferes';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { useGetChoferes } from '../../hooks/Catalogos/Choferes/useChoferes';

const ProfileSettings = ({mode = 'update',initialData = {}}) => {

  const { getChoferes, choferes, isLoading,setIsLoading } = useGetChoferes();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);


  useEffect(() => {
    if(mode === 'update' && initialData){
      setFormData(initialData);
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
        EmpresaID: formData.EmpresaID,
        EstatusID: formData.EstatusID,
        FechaRegistro: moment(formData.FechaRegistro).format('YYYY-MM-DD'),
        Nombre: formData.Nombre,
        Observaciones: formData.Observaciones,
        ProveedorID: formData.ProveedorID,
        SucursalID: formData.SucursalID,
        UltimaModificacion: moment().format('YYYY-MM-DD 00:00:00'), 
        VehiculoID: formData.VehiculoID
      }
    } else if(mode === 'create'){
      data = {
        EmpresaID: formData.EmpresaID,
        EstatusID: formData.EstatusID,
        FechaRegistro: moment().format('YYYY-MM-DD'),
        Nombre: formData.Nombre,
        Observaciones: formData.Observaciones,
        ProveedorID: formData.ProveedorID,
        SucursalID: formData.SucursalID,
        UltimaModificacion: moment().format('YYYY-MM-DD 00:00:00'), 
        VehiculoID: formData.VehiculoID
      }
    }
    const result = await actChoferes({ data });
    console.log(result);
    setIsLoading(false);
    navigate('/configuration/choferes');

  }
    return (
      <Card>
        <FalconCardHeader title="Informacion General" />
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
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Empresa"
                  value={formData.EmpresaID}
                  name="EmpresaID"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 g-3">
              <Form.Group as={Col} lg={6} controlId="codigoPostal">
                <Form.Label>Vehiculo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vehiculo" 
                  value={formData.VehiculoID}
                  name="VehiculoID"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} lg={6} controlId="Colonia">
                <Form.Label>Proveedor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Proveedor"
                  value={formData.ProveedorID}
                  name="ProveedorID"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-3">
              <Form.Group as={Col} lg={6} controlId="EstatusID">
                <Form.Label>EstatusID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Direccion Numero INT" 
                  value={formData.EstatusID}
                  name="EstatusID"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} lg={6} controlId="SucursalID">
                <Form.Label>SucursalID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Direccion Numero Ext"
                  value={formData.SucursalID}
                  name="SucursalID"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} lg={12} controlId="Observaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.Observaciones}
                  name="Observaciones"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            
            <div className="text-end">
              <Button variant="primary" type="submit">
                {mode === 'update' ? 'Guardar' : 'Crear'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
};

export default ProfileSettings;