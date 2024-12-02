import React from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetDestinoIDOption, useActDestino } from 'hooks/Catalogos/Destinos/useDestino';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/common/IconButton';
import { useNavigate } from 'react-router-dom';
import { actDestinoAsync } from 'api/catalogo/destinos/destinos';

const getInitialValues = (destinoID) => {
    const initialForm = {
        ID: 0,
        Nombre: '',
        Ciudad: '',
        Pais: '',
        CodigoPostal: '',
        Descripcion: '',
        EstatusID: '1',
        EmpresaID: 1,
        PersonaID: 1,
    };

    if(destinoID) {
        return {
            ID: destinoID.DestinoID || 0,
            Nombre: destinoID.Nombre || '',
            Ciudad: destinoID.Ciudad || '',
            Pais: destinoID.Pais || '',
            CodigoPostal: destinoID.CodigoPostal || '',
            Descripcion: destinoID.Descripcion || '',
            EstatusID: String(destinoID.EstatusID || '1'),
            EmpresaID: destinoID.EmpresaID || 1,
            PersonaID: destinoID.PersonaID || 1,
        };
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
    Ciudad: Yup.string().required('Ciudad es requerida'),
    Pais: Yup.string().required('País es requerido'),
    CodigoPostal: Yup.string().required('Código postal es requerido'),
    Descripcion: Yup.string().required('Descripción es requerida')
})

const FormDestinosD = ({ destinoID, isLoading, estatus}) => {
    const {actDestino, error} = useActDestino();
    const {getDestinoID, getDestinoIDOption, isLoading: isLoadingID} = useGetDestinoIDOption();

    const navigate = useNavigate();

    const formik =useFormik({
        initialValues: getInitialValues(destinoID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: destinoID.DestinoID,
                    Nombre: values.Nombre,
                    Ciudad: values.Ciudad,
                    Pais: values.Pais,
                    CodigoPostal: values.CodigoPostal,
                    Descripcion: values.Descripcion,
                    EstatusID: values.EstatusID.toString(),
                    EmpresaID: values.EmpresaID,
                    PersonaID: values.PersonaID
                };
                actDestino({data});
            } catch(error){
                toast.error('Error al enviar el formulario',{
                    theme: 'colored',
                    position: 'top-right',
                });
            }
        }
    })

    const getOptionByValue = (options, value) => {
        const result = options.find(option => option.Valor === value) || null;
        if (result) {
          return { value: result.Valor, label: result.Dato };
        }
        
        return null; 
    };

    const {getFieldProps} = formik;

    const handleSave = async () => {
      try{
        actDestinoAsync({data: formik.values});
        console.log("datos enviados al store: ",formik.values);
        toast.success('Destino guardado exitosamente');
        navigate('/configuration/Destinos/');
      }catch(error) {
        toast.error('Error al guardar el Destino');
        console.error("error al guardar los datos ", error);
      }
    }

    return(
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Card className='mb-3'>
              <Card.Body>
                <Row>
                  <Col md={6}>
                  <Form.Group>
                    <Form.Label>Estatus</Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        options={estatus.map(item => ({
                            value: item.Valor,
                            label: item.Dato,
                        }))}
                        onChange={option => formik.setFieldValue('EstatusID',option.value)}
                        isLoading={isLoading}
                        value={getOptionByValue(estatus,formik.values.EstatusID)}
                    />
                    {formik.touched.EstatusID && formik.errors.EstatusID && (
                        <div className="text-danger">{formik.errors.EstatusID}</div>
                    )}
                  </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Nombre"
                                {...getFieldProps('Nombre')}
                                isInvalid={!!formik.errors.Nombre && formik.touched.Nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Nombre}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                </Row>
                <Row className='mt-3'>
                <Col md={6}>
                    <Form.Group controlId="formCiudad">
                        <Form.Label>Ciudad</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Ciudad"
                                {...getFieldProps('Ciudad')}
                                isInvalid={!!formik.errors.Ciudad && formik.touched.Ciudad}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Ciudad}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formPais">
                        <Form.Label>Pais</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Pais"
                                {...getFieldProps('Pais')}
                                isInvalid={!!formik.errors.Pais && formik.touched.Pais}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Pais}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                </Row>
                <Row className='mt-3'>
                <Col md={12}>
                    <Form.Group controlId="formCodigoPostal">
                        <Form.Label>Codigo Postal</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Codigo Postal"
                                {...getFieldProps('CodigoPostal')}
                                isInvalid={!!formik.errors.CodigoPostal && formik.touched.CodigoPostal}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.CodigoPostal}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={12}>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripcion</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    {...getFieldProps('Descripcion')}
                                    isInvalid={!!formik.errors.Descripcion && formik.touched.Descripcion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Descripcion}
                                </Form.Control.Feedback>
                            </InputGroup>
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

    )
}

export default FormDestinosD;