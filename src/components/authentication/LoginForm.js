import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAuth } from '../../hooks/Auth/useAuth';
import { Formik, Form as FormFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

const LoginForm = ({ hasLabel = false, layout = 'simple' }) => {
  const { login } = useAuth();
  const [formError, setFormError] = useState('');  


  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        const userData = {
          user: values.email,
          password: values.password,
        };

        try {
          const errorMessage = await login(userData);
          console.log(errorMessage)

          if (errorMessage) {
            setFormError(errorMessage);  
          } else {
            toast.success(`Inicio sesión como ${values.email}`, { theme: 'colored' });
            setFormError(''); 

          }
        } catch (error) {
          setFormError('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
          console.error('Error en el bloque catch:', error);
        }
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

          {formError && (
            <div className="text-danger mb-3">
              {formError}
            </div>
          )}

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
