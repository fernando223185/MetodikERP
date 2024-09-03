import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import IconButton from 'components/common/IconButton'; // Asegúrate de que esta importación sea correcta
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import { toast } from 'react-toastify';
import { useActUsers } from '../../../hooks/Catalogos/Usuarios/useUsuario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



// Esquema de validación
const userSchema = Yup.object().shape({
  name: Yup.string().max(255).required('El nombre es requerido'),
});

// Valores iniciales
const getInitialValues = () => ({
  name: '',
  lastname:  '',
  lastname2: '',
  email:  '',
  estatus: 0,
  user: '',
  password: '',
  notes: '',
  company: 0,
  roleId: 0,
});

const FormUserAdd = ({ selectedUser, handleCloseModal, setUpdateList }) => {

  const { actUsers, result: resultNew, isLoading  } = useActUsers();
  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: getInitialValues(selectedUser),
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const data = {
        ID: 0,
        Estatus: values.estatus,
        Usuario: values.user,
        Correo: values.email,
        Contra: values.password,
        Notas: values.notes,
        MultiEmpresa: false,
        LoginUsuario: '',
        EmpresaID: values.company,
        EmpresasID: '',
        Sucursales: '',
        PerfilID: values.roleId,
        PersonalID: 0,
        Nombre: values.name,
        ApellidoPaterno: values.lastname,
        ApellidoMaterno: values.lastname2,
        ClienteID: 0 
      };
      console.log(data);
      
      actUsers({ data });
    
    }
  });

  useEffect(() => {
    console.log(resultNew)
    if (resultNew && Array.isArray(resultNew) && resultNew.length === 0) {
        console.log("resultNew es un array vacío:", resultNew);
    } else if (resultNew && resultNew.status === 200) {
        toast.success(`Usuario creado `, {
            theme: 'colored',
        });

        setTimeout(() => {
            handleCloseModal();
            setUpdateList((prevState) => !prevState);
        }, 1_000);
    } else if (resultNew) {
        toast.error(`Error al crear el cliente`, {
            theme: 'colored',
        });
    }
}, [resultNew]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserStatus">
                <Form.Label>Estatus</Form.Label>
                <Form.Control as="select" {...getFieldProps('enableToDownloadStock')}>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </Form.Control>
            </Form.Group>
            <Row className='mt-2'>
                <Col md={6}>
                    <Form.Group controlId="formUserNickName">
                    <Form.Label>Usuario</Form.Label>
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
                <Col md={6}>
                    <Form.Group controlId="formUserName">
                    <Form.Label>Nombre</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                        <Form.Control
                        type="text"
                        {...getFieldProps('name')}
                        isInvalid={!!errors.name && touched.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col md={6}>
                    <Form.Group controlId="formApellidoPat">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Aa</InputGroup.Text>
                        <Form.Control
                            type="text"
                            {...getFieldProps('lastname')}
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
  );
};

FormUserAdd.propTypes = {
  selectedUser: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired
};

export default FormUserAdd;
