import React from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetVehiculoIDOption, useActVehiculo } from 'hooks/Catalogos/Vehiculos/useVehiculo';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { actVehiculoAync } from 'api/catalogo/vehiculos/vehiculos';

const getInitialValues = (vehiculoID) => {

    const initialForm = {
        ID: 0,
        Vehiculo: '',
        Descripcion: '',
        Placas:'',
        Peso: '',
        EstatusID: '1',
        serie: '',
        Marca:'',
        NoEco:'',
        CapacidadPeso: '',
        EmpresaID: 1,
        PersonaID: 1,
        TipoVehiculo: '0',
    };

    if (vehiculoID) {
        return {
            ID: vehiculoID.VehiculoID || 0,
            Vehiculo: vehiculoID.Vehiculo || '',
            Descripcion: vehiculoID.Descripcion || '',
            Placas: vehiculoID.Placas || '',
            Peso: vehiculoID.Peso || '',
            EstatusID: String(vehiculoID.EstatusID || '1'),
            serie: vehiculoID.Serie || '',
            Marca: vehiculoID.Marca || '',
            NoEco: vehiculoID.NoEco || '',
            CapacidadPeso: vehiculoID.CapacidadPeso || '',
            EmpresaID: vehiculoID.EmpresaID || 1,
            PersonaID: vehiculoID.PersonaID || 1,
            TipoVehiculo: String(vehiculoID.TipoVehiculoID || '0'),
        };
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Vehiculo: Yup.string().required('Required'),
    Marca: Yup.string().required('Required'),
    NoEco: Yup.string().required('Required'),
    CapacidadPeso: Yup.number().required('Required'),
    Descripcion: Yup.string().required('Required'),
    Placas: Yup.string().required('Required'),
    Peso: Yup.number().required('Required'),
    TipoVehiculo: Yup.number().required('Required')
});

const FormVehiculosD = ({ vehiculoID, isLoading, estatus, tipovehiculo}) => {
    const { actVehiculo, error } = useActVehiculo();
    const { getVehiculoID,getVehiculoIDOption, isLoading: IsloadingId } = useGetVehiculoIDOption();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(vehiculoID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: vehiculoID.VehiculoID,
                    Vehiculo: values.Vehiculo,
                    Descripcion: values.Descripcion,
                    Placas: values.Placas,
                    Peso: values.Peso,
                    EstatusID: values.EstatusID.toString(),
                    serie: values.serie,
                    Marca: values.Marca,
                    NoEco: values.NoEco,
                    CapacidadPeso: values.CapacidadPeso,
                    TipoVehiculo: values.TipoVehiculo.toString()
                };
                actVehiculo({data});
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
        if (!formik.isValid || formik.values.Vehiculo === '' || formik.values.TipoVehiculo === '0' 
            || formik.values.Placas === '' || formik.values.Descripcion === '' || formik.values.Peso === ''
            || formik.values.serie === '' || formik.values.Marca === '' || formik.values.NoEco === '') {
            toast.error('Por favor completa los campos obligatorios', {
            theme: 'colored',
            position: 'top-right',
            });
            return;
        }
        
        try {
            await actVehiculoAync({ data: formik.values });
            console.log("Datos enviados al store: ", formik.values);
            toast.success('Vehculo guardado exitosamente', {
            theme: 'colored',
            position: 'top-right',
            });
            navigate('/Catalogos/Vehiculos/');
        } catch (error) {
            toast.error('Error al guardar el Destino', {
            theme: 'colored',
            position: 'top-right',
            });
            console.error("Error al guardar los datos: ", error);
        }
    };

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
                                <Form.Group controlId="formVehiculo">
                                    <Form.Label>Vehiculo</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese Vehiculo"
                                            {...getFieldProps('Vehiculo')}
                                            isInvalid={!!formik.errors.Vehiculo && formik.touched.Vehiculo}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Vehiculo}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Tipo de Vehiculo</Form.Label>
                                <Select
                                    classNamePrefix="react-select"
                                    options={tipovehiculo.map(item => ({
                                        value: item.Valor,
                                        label: item.Dato,
                                    }))}
                                    onChange={option => formik.setFieldValue('TipoVehiculo',option.value)}
                                    isLoading={isLoading}
                                    value={getOptionByValue(tipovehiculo,formik.values.TipoVehiculo)}
                                />
                                {formik.touched.TipoVehiculo && formik.errors.TipoVehiculo && (
                                    <div className="text-danger">{formik.errors.TipoVehiculo}</div>
                                )}
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formPlacas">
                                    <Form.Label>Placas</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese las placas del Vehiculo"
                                            {...getFieldProps('Placas')}
                                            isInvalid={!!formik.errors.Placas && formik.touched.Placas}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Placas}
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
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formPeso">
                                    <Form.Label>Peso/Kg</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Peso"
                                            {...getFieldProps('Peso')}
                                            isInvalid={!!formik.errors.Peso && formik.touched.Peso}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Peso}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCPeso">
                                    <Form.Label>Capacidad de peso/Kg</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Capacidad de peso/Kg"
                                            {...getFieldProps('CapacidadPeso')}
                                            isInvalid={!!formik.errors.CapacidadPeso && formik.touched.CapacidadPeso}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.CapacidadPeso}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formSerie">
                                    <Form.Label>Serie</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Serie"
                                            {...getFieldProps('serie')}
                                            isInvalid={!!formik.errors.serie && formik.touched.serie}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.serie}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formMarca">
                                    <Form.Label>Marca</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Marca"
                                            {...getFieldProps('Marca')}
                                            isInvalid={!!formik.errors.Marca && formik.touched.Marca}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Marca}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                        <Col md={12}>
                                <Form.Group controlId="formNoEco">
                                    <Form.Label>Numero Economico</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese NoEco"
                                            {...getFieldProps('NoEco')}
                                            isInvalid={!!formik.errors.NoEco && formik.touched.NoEco}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.NoEco}
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
                            <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar
                          </IconButton>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </FormikProvider> 
    )
}
export default FormVehiculosD;