import React from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetSucursalIDOption, useActSucursal } from 'hooks/Catalogos/Sucursales/useSucursal';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { actSucursalAsync } from 'api/catalogo/sucursales/sucursales';

const getInitialValues = (sucursalID) => {

    const initialForm = {
        ID: 0,
        Nombre: '',
        Prefijo:'',
        Direccion:'',
        DireccionNumero:'',
        DireccionNumeroINT:'',
        Delegacion:'',
        Colonia:'',
        Poblacion:'',
        Estado:'',
        Pais:'',
        CodigoPostal:'',
        Telefonos:'',
        EstatusID:'1',
        RFC:'',
        EmpresaID:1,
        PersonaID:1,
    };  

    if(sucursalID){
        return{
            ID: sucursalID.SucursalID || 0,
            Nombre: sucursalID.Nombre || '',
            Prefijo:sucursalID.Prefijo || '',
            Direccion:sucursalID.Direccion || '',
            DireccionNumero:sucursalID.DireccionNumero || '',
            DireccionNumeroINT:sucursalID.DireccionNumeroINT || '',
            Delegacion:sucursalID.Delegacion || '',
            Colonia:sucursalID.Colonia || '',
            Poblacion:sucursalID.Poblacion || '',
            Estado:sucursalID.Estado || '',
            Pais:sucursalID.Pais || '',
            CodigoPostal:sucursalID.CodigoPostal || '',
            Telefonos:sucursalID.Telefonos || '',
            EstatusID: String(sucursalID.EstatusID || '1'),
            RFC: sucursalID.RFC || '',
            EmpresaID: sucursalID.EmpresaID || 1,
            PersonaID: sucursalID.PersonaID || 1,
        };
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
    Prefijo: Yup.string().required('Prefijo es requerido'),
    Direccion: Yup.string().required('Dirección es requerida'),
    DireccionNumero: Yup.string().required('Número de dirección es requerido'),
    Delegacion: Yup.string().required('Delegación es requerida'),
    Colonia: Yup.string().required('Colonia es requerida'),
    Poblacion: Yup.string().required('Población es requerida'),
    Estado: Yup.string().required('Estado es requerido'),
    Pais: Yup.string().required('País es requerido'),
    CodigoPostal: Yup.string().required('Código postal es requerido'),
});

const FormSucursalD = ({sucursalID, isLoading, estatus}) => {

const {actSucursal, error} = useActSucursal();
const { getSucursalID, sucursalIdOption, isLoading: isLoadingId} = useGetSucursalIDOption();

const navigate = useNavigate();


    const formik= useFormik({
        initialValues: getInitialValues(sucursalID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: sucursalID.SucursalID,
                    Nombre: values.Nombre,
                    Prefijo: values.Prefijo,
                    Direccion: values.Direccion,
                    DireccionNumero: values.DireccionNumero,
                    DireccionNumeroINT: values.DireccionNumeroINT,
                    Delegacion: values.Delegacion,
                    Colonia: values.Colonia,
                    Poblacion: values.Poblacion,
                    Estado: values.Estado,
                    Pais: values.Pais,
                    CodigoPostal: values.CodigoPostal,
                    Telefonos: values.Telefonos,
                    EstatusID: values.EstatusID.toString(),
                    RFC: values.RFC,
                    EmpresaID: values.EmpresaID,
                    PersonaID: values.PersonaID,
                };
                actSucursal({data});     
            } catch (error) {
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
            actSucursalAsync({data: formik.values});
            console.log("datos enviados al store: ",formik.values);
            toast.success('Sucursal guardada exitosamente');
            navigate('/configuration/Sucursales/');
        }catch(error) {
            toast.error('Error al guardar la sucursal');
            console.error("error al guardar los datos ", error);
        }
    }

    return(
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
                                    onChange={option => formik.setFieldValue('EstatusID',option.value)}
                                    isLoading={isLoading}
                                    value={getOptionByValue(estatus,formik.values.EstatusID)}
                                />
                                {formik.touched.EstatusID && formik.errors.EstatusID && (
                                    <div className="text-danger">{formik.errors.EstatusID}</div>
                                )}
                            </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Nombre</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Nombre"
                                            {...getFieldProps('Nombre')}
                                            isInvalid={!!formik.errors.Nombre && formik.touched.Nombre}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Nombre}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Prefijo</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Prefijo"
                                            {...getFieldProps('Prefijo')}
                                            isInvalid={!!formik.errors.Prefijo && formik.touched.Prefijo}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Prefijo}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Direccion</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Direccion"
                                            {...getFieldProps('Direccion')}
                                            isInvalid={!!formik.errors.Direccion && formik.touched.Direccion}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Direccion}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Direccion Num. Exterior</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el numero exterior"
                                            {...getFieldProps('DireccionNumero')}
                                            isInvalid={!!formik.errors.DireccionNumero && formik.touched.DireccionNumero}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.DireccionNumero}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Direccion Num. Interior</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el numero Interior"
                                            {...getFieldProps('DireccionNumeroINT')}
                                            isInvalid={!!formik.errors.DireccionNumeroINT && formik.touched.DireccionNumeroINT}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.DireccionNumeroINT}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                             <Col md={4}>
                                <Form.Group controlId="formDelegacion">
                                    <Form.Label>Delegacion</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Delegacion"
                                            {...getFieldProps('Delegacion')}
                                            isInvalid={!!formik.errors.Delegacion && formik.touched.Delegacion}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Delegacion}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formColonia">
                                    <Form.Label>Colonia</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Colonia"
                                            {...getFieldProps('Colonia')}
                                            isInvalid={!!formik.errors.Colonia && formik.touched.Colonia}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Colonia}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formPoblacion">
                                    <Form.Label>Poblacion</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Poblacion"
                                            {...getFieldProps('Poblacion')}
                                            isInvalid={!!formik.errors.Poblacion && formik.touched.Poblacion}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Poblacion}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={4}>
                                <Form.Group controlId="formEstado">
                                    <Form.Label>Estado</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Estado"
                                            {...getFieldProps('Estado')}
                                            isInvalid={!!formik.errors.Estado && formik.touched.Estado}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Estado}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formPais">
                                    <Form.Label>Pais</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Pais"
                                            {...getFieldProps('Pais')}
                                            isInvalid={!!formik.errors.Pais && formik.touched.Pais}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Pais}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formCP">
                                    <Form.Label>Codigo Postal</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Codigo Postal"
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
                            <Col md={6}>
                                <Form.Group controlId="formTelefonos">
                                    <Form.Label>Telefono</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Telefono"
                                            {...getFieldProps('Telefonos')}
                                            isInvalid={!!formik.errors.Telefonos && formik.touched.Telefonos}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Telefonos}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formRFC">
                                    <Form.Label>RFC</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el RFC"
                                            {...getFieldProps('RFC')}
                                            isInvalid={!!formik.errors.RFC && formik.touched.RFC}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.RFC}
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

export default FormSucursalD;