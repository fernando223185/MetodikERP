import React from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGetAreaIDOption, useActAreas } from 'hooks/Catalogos/Areas/useAreas';
import { actAreaAsync } from 'api/catalogo/areas/areas';

const getInitialValues = (areaID) => {

    const initialForm ={
        ID: 0,
        Nombre: '',
        EstatusID:'1',
        Descripcion:'',
        PersonaID:1,
        EmpresaID:1,
    };

    if(areaID){
        return {
            ID: areaID.ID || 0,
            Nombre: areaID.Nombre || '',
            EstatusID: String(areaID.EstatusID || '1'),
            Descripcion: areaID.Descripcion || '',
            PersonaID: areaID.PersonaID || 1,
            EmpresaID: areaID.EmpresaID || 1,
        };
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
});

const FormAreasD = ({areaID, isLoading, estatus}) => {

    const { actArea, error } = useActAreas();
    const { getAreaID, areaIdOption, isLoading:isLoadingID} = useGetAreaIDOption();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(areaID),
        validationSchema,
        onSubmit: async (values) => {
            try{
                const data = {
                    ID: areaID.ID,
                    Nombre: values.Nombre,
                    EstatusID: values.EstatusID.toString(),
                    Descripcion: values.Descripcion,
                    PersonaID: values.PersonaID,
                    EmpresaID: values.EmpresaID,
                };
                actArea({data});
            } catch(error) {
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
            actAreaAsync({data: formik.values});
            console.log("datos enviados al store: ",formik.values);
            toast.success('Concepto guardado exitosamente');
            navigate('/Catalogos/areas');
        }catch(error) {
            toast.error('Error al guardar el concepto');
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
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            {...getFieldProps('Nombre')}
                                            isInvalid={!!formik.errors.Nombre && formik.touched.Nombre}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Nombre}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
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

export default FormAreasD;