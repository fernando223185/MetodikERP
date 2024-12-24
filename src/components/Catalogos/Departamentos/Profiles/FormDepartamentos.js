import React from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGetDepartamentosIDOption, useActDepartamentos } from 'hooks/Catalogos/Departamentos/useDepartamentos';
import { actDepartamentoAsync } from 'api/catalogo/departamentos/Departamentos';

const getInitialValues = (departamentoID) => {

    const initialForm = {
        ID: 0,
        Nombre: '',
        EstatusID: '1',
        EmpresaID: 1,
        PersonaID: 1,
    };

    if(departamentoID) {
        return{
            ID: departamentoID.ID || 0,
            Nombre: departamentoID.Nombre || '',
            EstatusID: String(departamentoID.EstatusID || '1'),
            EmpresaID: departamentoID.EmpresaID || 1,
            PersonaID: departamentoID.PersonaID || 1,
        }
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
})

const FormDepartamentosD = ({departamentoID, isLoading, estatus}) => {
    const { actDepartamento, error } = useActDepartamentos();
    const { getDepartamentoID, departamentoIDOption, isLoading: isLoadingID} = useGetDepartamentosIDOption();

    const navigate = useNavigate();
    
    const formik =useFormik({
        initialValues: getInitialValues(departamentoID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: departamentoID.ID,
                    Nombre: values.Nombre,
                    EstatusID: values.EstatusID.toString(),
                    EmpresaID: values.EmpresaID,
                    PersonaID: values.PersonaID
                };
                actDepartamento({data});
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
        if (!formik.isValid || formik.values.Nombre === '') {
            toast.error('Por favor completa los campos obligatorios', {
            theme: 'colored',
            position: 'top-right',
            });
            return;
        }
        
        try {
            await actDepartamentoAsync({ data: formik.values });
            console.log("Datos enviados al store: ", formik.values);
            toast.success('Destino guardado exitosamente', {
            theme: 'colored',
            position: 'top-right',
            });
            navigate('/catalogo/departamentos/');
        } catch (error) {
            toast.error('Error al guardar el departamento', {
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

export default FormDepartamentosD;