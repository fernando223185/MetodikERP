import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/Auth/useAuth';
import { Formik, Form as FormFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

const LoginForm = ({ hasLabel = false, layout = 'simple' }) => {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        const userData = {
          user: values.email,
          password: values.password,
        };
        login(userData);
        toast.success(`Logged in as ${values.email}`, {
          theme: 'colored',
        });
      }}
    >
      {({ values, handleChange, handleSubmit, isValid }) => (
        <FormFormik onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            {hasLabel && <Form.Label>Correo</Form.Label>}
            <Field
              as={Form.Control}
              placeholder={!hasLabel ? 'Email address' : ''}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group className="mb-3">
            {hasLabel && <Form.Label>Contraseña</Form.Label>}
            <Field
              as={Form.Control}
              placeholder={!hasLabel ? 'Password' : ''}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </Form.Group>

          <Row className="justify-content-between align-items-center">
            <Col xs="auto">
              <Form.Check type="checkbox" id="rememberMe" className="mb-0">
                <Field
                  as={Form.Check.Input}
                  type="checkbox"
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                />
                <Form.Check.Label className="mb-0 text-700">
                  Recordarme
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>

          <Form.Group>
            <Button
              type="submit"
              className="mt-3 w-100"
              disabled={!isValid}
            >
              Entrar
            </Button>
          </Form.Group>
        </FormFormik>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
};

export default LoginForm;
