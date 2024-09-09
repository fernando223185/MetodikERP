import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { Form } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';

const CustomModal = ({ show, handleClose }) => {
  /*return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Articulo</Modal.Title>
        <FalconCloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Row className='mt-2'>
                    <Col md={6}>
                        <Form.Group controlId="formUserNickName">
                        <Form.Label>Descripcion</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                                <Form.Control
                                type="text"
                                {...getFieldProps('user')}
                                isInvalid={!!errors.user && touched.user}
                                readOnly
                                disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.user}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={6}>
                        <Form.Group controlId="formApellidoPat">
                        <Form.Label>Cantidad</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                            <Form.Control
                                type="text"
                                {...getFieldProps('Cantidad')}
                                isInvalid={!!errors.lastname && touched.lastname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastname}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formApellidoMat">
                        <Form.Label>Apellido Materno</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                            <Form.Control
                                type="text"
                                {...getFieldProps('lastname2')}
                                isInvalid={!!errors.lastname2 && touched.lastname2}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastname2}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={6}>
                        <Form.Group controlId="formUserEmail">
                        <Form.Label>Correo</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                {...getFieldProps('telephone')}
                                isInvalid={!!errors.telephone && touched.telephone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.telephone}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUserPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
                                <Form.Control
                                type={showPassword ? 'text' : 'password'} 
                                {...getFieldProps('password')}
                                isInvalid={!!errors.password && touched.password}
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
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={6}>
                    <Form.Group controlId="formUserStatus">
                        <Form.Label>Empresa</Form.Label>
                        <Form.Control as="select" {...getFieldProps('enableToDownloadStock')}>
                            <option value="1">Metodik</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group controlId="formUserStatus">
                        <Form.Label>PerfiL</Form.Label>
                        <Form.Control as="select" {...getFieldProps('enableToDownloadStock')}>
                            <option value="1">Sistemas</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                </Row>
                <Modal.Footer className='mt-4'>
                <IconButton 
                    variant="secondary" 
                    icon="reply" 
                    className="mt-4"
                    onClick={handleCloseModal}>
                </IconButton>
                <IconButton 
                    variant="primary" 
                    icon="plus" 
                    className="mt-4"
                    type="submit">
                </IconButton>
                </Modal.Footer>
            </Form>
        </FormikProvider>     
     </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
  */
};
