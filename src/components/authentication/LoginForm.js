import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/Auth/useAuth';


const LoginForm = ({ hasLabel, layout }) => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const { login } = useAuth();


  // Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      user: formData.email,
      password: formData.password
    }
    login(userData); 
    
    toast.success(`Logged in as ${formData.email}`, {
      theme: 'colored'
    });
  };



  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Correo</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Contraseña</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
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
          disabled={!formData.email || !formData.password}
        >
          Entrar
        </Button>
      </Form.Group>

    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
