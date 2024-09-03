import FalconCardHeader from 'components/common/FalconCardHeader';
import React, { useState } from 'react';
import { Button, Card, Form, InputGroup  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChangePassword = ({formik}) => {
  const [showPassword, setShowPassword] = useState(false); 
  const { values, errors, touched, handleChange, handleSubmit, getFieldProps } = formik;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Cambiar Contraseña" />
      <Card.Body className="bg-body-tertiary">
      <Form.Group controlId="formUserPassword">
        <Form.Label>Contraseña</Form.Label>
        <InputGroup>
            <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
            <Form.Control
            type={showPassword ? 'text' : 'password'} 
            {...getFieldProps('Contra')}
            isInvalid={!!errors.Contra && touched.Contra}
            />
            <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer', 
                backgroundColor: 'transparent', 
                border: 'none' 
            }}>
                <FontAwesomeIcon icon='eye' style={{ transform: showPassword ? 'rotate(0deg)' : 'rotate(180deg)', fontSize: '15px'  }} />
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
            {errors.password}
            </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;
