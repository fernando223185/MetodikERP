import React, { useEffect } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useGetPasajerosIDOption } from 'hooks/Catalogos/Pasajeros/usePasajeros';
import { useActPasajero } from 'hooks/Catalogos/Pasajeros/usePasajeros';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { actPasajerosAsync } from 'api/catalogo/Pasajeros/pasajeros';
import { useNavigate } from 'react-router-dom';


const getInitialValues = (pasajeroID) => {
    
    const initialForm = {
        pasajeroid: 0,
        nombre: '',
        curp: '',
        email: '',
        telefono: '',
        fechanacimiento: null,
        estatus: '1', 
        empresaid: 1,
        personaid: 1
    };

    if (pasajeroID) {
        return {
            pasajeroid: pasajeroID.ID || 0,
            nombre: pasajeroID.Nombre || '',
            curp: pasajeroID.Curp || '',
            email: pasajeroID.Email || '',
            telefono: pasajeroID.Telefono || '',
            fechanacimiento: pasajeroID.FechaNacimiento ? moment(pasajeroID.FechaNacimiento, 'DD-MM-YYYY').toDate() : null,
            estatus: String(pasajeroID.EstatusID || '1'),
            empresaid: pasajeroID.EmpresaID || 1,
            personaid: pasajeroID.PersonaID || 1
        };
    }
    return initialForm;
};

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Required'),
    curp: Yup.string().required('Required'),
    telefono: Yup.string().required('Required'),
    fechanacimiento: Yup.date().required('Required'),
});

const FormPasajerosD = ({ pasajeroID, isLoading, estatus }) => {
    const { actPasajero, error } = useActPasajero();
    const { getPasajeroID, pasajeroIdOption, isLoading: IsloadingId } = useGetPasajerosIDOption();

    const navigate= useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(pasajeroID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: pasajeroID.ID,
                    Estatus: values.estatus.toString(),
                    Nombre: values.nombre,
                    Curp: values.curp,
                    Email: values.email,
                    Telefono: values.telefono,
                    FechaNacimiento: values.fechanacimiento ? moment(values.fechanacimiento).format('YYYY-MM-DD') : null,
                };
                actPasajero({ data });
            } catch (error) {
                toast.error('Error al enviar el formulario', {
                    theme: 'colored',
                    position: 'top-right',
                });
            }
        },
    });

    const getOptionByValue = (options, value) => {
      const result = options.find(option => option.Valor === value) || null;
      if (result) {
        return { value: result.Valor, label: result.Dato };
      }
      
      return null; 
    };

    const { getFieldProps } = formik;

    const handleSave = async() =>{
      try{
        
        actPasajerosAsync({data : formik.values});
        console.log("estos son los dats que se van a mandar 2", formik.values);
        toast.success('Pasajero guardado correctamente');
        navigate('/Catalogos/Pasajeros/')
      } catch (error) {
        toast.error('Error al guardar el pasajero');
        console.error("error al guardar los datos ", error);
      }
    }

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Card className='mb-3'>
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                            <Form.Group>
                                    <Form.Label>Estatus</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={estatus.map(item => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('estatus', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(estatus, formik.values.estatus)}
                                    />
                                    {formik.touched.estatus && formik.errors.estatus && (
                                        <div className="text-danger">{formik.errors.estatus}</div>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Nombre"
                                            {...getFieldProps('nombre')}
                                            isInvalid={!!formik.errors.nombre && formik.touched.nombre}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.nombre}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formCurp">
                                    <Form.Label>Curp</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el CURP"
                                            {...getFieldProps('curp')}
                                            isInvalid={!!formik.errors.curp && formik.touched.curp}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.curp}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingrese el Email"
                                            {...getFieldProps('email')}
                                            isInvalid={!!formik.errors.email && formik.touched.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formTel">
                                    <Form.Label>Telefono</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Telefono"
                                            {...getFieldProps('telefono')}
                                            isInvalid={!!formik.errors.telefono && formik.touched.telefono}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.telefono}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Fecha De Nacimiento</Form.Label>
                                    <DatePicker
                                        className="form-control"
                                        placeholderText="Selecciona una fecha"
                                        dateFormat="dd-MM-yyyy"
                                        locale="es"
                                        selected={formik.values.fechanacimiento}
                                        onChange={date => formik.setFieldValue('fechanacimiento', date)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr style={{ margin: '10px 0' }} className="mt-4" />
                        <div className="d-flex justify-content-end mt-4">
                          <IconButton
                            variant="falcon-primary"
                            size="sm"
                            className="mb-2 mb-sm-0 me-2 d-flex align-items-center" 
                            title="Guardar"
                            onClick={handleSave}
                          >
                            <FontAwesomeIcon icon={faPlay} className="me-1" /> Guardar
                          </IconButton>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </FormikProvider>
    );
}

export default FormPasajerosD;
