import React from 'react';
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';

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

            <Form.Group as={Col} lg={6} controlId="lastName">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido Paterno"
                name="profile.lastName"
                value={values.ApellidoPaterno}
                {...getFieldProps('ApellidoPaterno')}
                isInvalid={!!errors.ApellidoPaterno && touched.ApellidoPaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ApellidoPaterno}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="maternalName">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido Materno"
                name="maternalName"
                value={values.ApellidoMaterno}
                {...getFieldProps('ApellidoMaterno')}
                isInvalid={!!errors.ApellidoMaterno && touched.ApellidoMaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ApellidoMaterno}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg={6} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="profile.email"
                value={values.Correo}
                {...getFieldProps('Correo')}
                isInvalid={!!errors.Correo && touched.Correo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Correo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">

          </Row>

          <Form.Group className="mb-3" controlId="heading">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              name="profile.heading"
              value={values.Usuario}
              {...getFieldProps('Usuario')}
              isInvalid={!!errors.Usuario && touched.Usuario}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {errors.Usuario}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="intro">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              placeholder="Notas"
              name="profile.intro"
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
