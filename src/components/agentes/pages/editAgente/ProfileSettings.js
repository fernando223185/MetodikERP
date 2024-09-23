import React from 'react';
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import SucursalSelect from '../../../vehiculos/FormFields/Sucursal.js';

const ProfileSettings = ({ formik }) => {

  const { values, errors, touched, handleChange, handleSubmit, getFieldProps } = formik;
  
  return (
    <Card>
      <FalconCardHeader title="Informacion general" />
      <Card.Body className="bg-body-tertiary">
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="Nombre"
                value={values.Nombre}
                {...getFieldProps('Nombre')}
                isInvalid={!!errors.profile?.Nombre && touched.Nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="Telefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono"
                name="Telefono"
                value={values.Telefono}
                {...getFieldProps('Telefono')}
                isInvalid={!!errors.Telefono && touched.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Telefono}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="Puesto">
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Puesto"
                name="Puesto"
                value={values.Puesto}
                {...getFieldProps('Puesto')}
                isInvalid={!!errors.Puesto && touched.Puesto}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Puesto}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg={6} controlId="Correo">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="Correo"
                value={values.Correo}
                {...getFieldProps('Correo')}
                isInvalid={!!errors.Correo && touched.Correo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Correo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <SucursalSelect tipo="Sucursal" modulo="Almacenes" value={values.SucursalID} onChange={handleChange} />

          <Form.Group className="mb-3" controlId="Notas">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              placeholder="Notas"
              name="Notas"
              value={values.Notas}
              {...getFieldProps('Notas')}
              isInvalid={!!errors.Notas && touched.Notas}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Notas}
            </Form.Control.Feedback>
          </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;
