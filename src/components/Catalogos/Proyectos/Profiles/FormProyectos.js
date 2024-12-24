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
import { useGetProyectoIDOption,useActProyecto,useSubirArchivo } from 'hooks/Catalogos/Proyectos/useProyectos';
import { actProyectoAsync } from 'api/catalogo/proyectos/Proyectos';
import { Button } from 'bootstrap';
const getInitialValues = (proyectoID) => {

    const initialForm = {
        ID: 0,
        Nombre: '',
        EstatusID: '5',
        EmpresaID: 1,
        PersonaID: 1,
        Descripcion: '',
        DepartamentoID: 0,
        Imagen: '',
        Observaciones: '',
        Correo: '',
        Telefono: '',
        EquipoID: 0,
        PerfilID: 0,
        Tiempo: '',
        EmpresaCte: 0,
    };

    if(proyectoID) {
        return{
            ID: proyectoID.ID || 0,
            Nombre: proyectoID.Nombre || '',
            EstatusID: String(proyectoID.EstatusID || '5'),
            EmpresaID: proyectoID.EmpresaID || 1,
            PersonaID: proyectoID.PersonaID || 1,
            Descripcion: proyectoID.Descripcion || '',
            DepartamentoID: String(proyectoID.DepartamentoID || '0'),
            Imagen: proyectoID.Imagen || '',
            Observaciones: proyectoID.Observaciones || '',
            Correo: proyectoID.Correo || '',
            Telefono: proyectoID.Telefono || '',
            EquipoID: String(proyectoID.EquipoID || '0'),
            PerfilID: String(proyectoID.PerfilID || '0'),
            Tiempo: proyectoID.Tiempo || '',
            EmpresaCte: String(proyectoID.EmpresaCte || '0'),
        }
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
    Descripcion: Yup.string().required('Descripción es requerida'),
    DepartamentoID: Yup.string().required('Departamento es requerido'),
    Tiempo: Yup.string().required('Tiempo es requerido'),
    EmpresaCte: Yup.string().required('EmpresaCte es requerido'),
    EquipoID: Yup.string().required('Equipo es requerido'),
})

const FormProyectosD = ({proyectoID, isLoading, estatus,empresa,equipo,perfil,departamento}) => {
    const { actProyecto, error } = useActProyecto();
    const { getProyectoID, proyectoIDOption, isLoading: isLoadingID} = useGetProyectoIDOption();
    const {subirArchivo, result, isLoading:isLoadingArchivo, error:errorImagen} = useSubirArchivo();

    const navigate = useNavigate();
    
    const formik =useFormik({
        initialValues: getInitialValues(proyectoID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: proyectoID.ID,
                    Nombre: values.Nombre,
                    EstatusID: values.EstatusID.toString(),
                    EmpresaID: values.EmpresaID,
                    PersonaID: values.PersonaID,
                    Descripcion: values.Descripcion,
                    DepartamentoID: values.DepartamentoID,
                    Imagen: values.Imagen,
                    Observaciones: values.Observaciones,
                    Correo: values.Correo,
                    Telefono: values.Telefono,
                    EquipoID: values.EquipoID,
                    PerfilID: values.PerfilID,
                    Tiempo: values.Tiempo,
                    EmpresaCte: values.EmpresaCte
                };
                actProyecto({data});
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
        if (!formik.isValid || formik.values.Nombre === '' || formik.values.Descripcion === '' || formik.values.DepartamentoID === 0 || formik.values.EquipoID === 0 
            || formik.values.PerfilID === 0 || formik.values.Tiempo === '' || formik.values.EmpresaCte === 0) {
            toast.error('Por favor completa los campos obligatorios', {
            theme: 'colored',
            position: 'top-right',
            });
            return;
        }
        
        try {
            await actProyectoAsync({ data: formik.values });
            console.log("Datos enviados al store: ", formik.values);
            toast.success('Destino guardado exitosamente', {
            theme: 'colored',
            position: 'top-right',
            });
            navigate('/catalogos/proyectos/');
        } catch (error) {
            toast.error('Error al guardar el proyectos', {
            theme: 'colored',
            position: 'top-right',
            });
            console.error("Error al guardar los datos: ", error);
        }
    };

    const handleFileUpload = async () => {
        if (formik.values.Imagen && formik.values.Imagen instanceof File) {
            try {
                const response = await subirArchivo({ file: formik.values.Imagen, tipo: "Proyectos" });
    
                if (response && response.path) {
                    // Actualizar el campo RutaArchivo en Formik con la ruta devuelta
                    await formik.setFieldValue('RutaArchivo', response.path);
                    toast.success('Archivo subido con éxito');
                }

            } catch (error) {
                toast.error('Error al subir el archivo');
                throw error; // Lanzar el error para manejarlo en handleSave
            }
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
                <Row className='mt-3'>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Perfil</Form.Label>
                            <Select
                                classNamePrefix="react-select"
                                options={perfil.map(item => ({
                                    value: item.Valor,
                                    label: item.Dato,
                                }))}
                                onChange={option => formik.setFieldValue('PerfilID',option.value)}
                                isLoading={isLoading}
                                value={getOptionByValue(estatus,formik.values.PerfilID)}
                            />
                            {formik.touched.PerfilID && formik.errors.PerfilID && (
                                <div className="text-danger">{formik.errors.PerfilID}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Departamento</Form.Label>
                            <Select
                                classNamePrefix="react-select"
                                options={departamento.map(item => ({
                                    value: item.Valor,
                                    label: item.Dato,
                                }))}
                                onChange={option => formik.setFieldValue('DepartamentoID',option.value)}
                                isLoading={isLoading}
                                value={getOptionByValue(estatus,formik.values.DepartamentoID)}
                            />
                            {formik.touched.DepartamentoID && formik.errors.DepartamentoID && (
                                <div className="text-danger">{formik.errors.DepartamentoID}</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Equipo a Asignar</Form.Label>
                            <Select
                                classNamePrefix="react-select"
                                options={equipo.map(item => ({
                                    value: item.Valor,
                                    label: item.Dato,
                                }))}
                                onChange={option => formik.setFieldValue('EquipoID',option.value)}
                                isLoading={isLoading}
                                value={getOptionByValue(estatus,formik.values.EquipoID)}
                            />
                            {formik.touched.EquipoID && formik.errors.EquipoID && (
                                <div className="text-danger">{formik.errors.EquipoID}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Empresa Cliente</Form.Label>
                            <Select
                                classNamePrefix="react-select"
                                options={empresa.map(item => ({
                                    value: item.Valor,
                                    label: item.Dato,
                                }))}
                                onChange={option => formik.setFieldValue('EmpresaCte',option.value)}
                                isLoading={isLoading}
                                value={getOptionByValue(estatus,formik.values.EmpresaCte)}
                            />
                            {formik.touched.EmpresaCte && formik.errors.EmpresaCte && (
                                <div className="text-danger">{formik.errors.EmpresaCte}</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={6}>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingrese Descripción"
                                    {...getFieldProps('Descripcion')}
                                    isInvalid={!!formik.errors.Descripcion && formik.touched.Descripcion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Descripcion}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Observaciones</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingrese Observaciones"
                                    {...getFieldProps('Observaciones')}
                                    isInvalid={!!formik.errors.Observaciones && formik.touched.Observaciones}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Observaciones}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={6}>
                    <Form.Group controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Correo"
                                {...getFieldProps('Correo')}
                                isInvalid={!!formik.errors.Correo && formik.touched.Correo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Correo}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTelefono">
                        <Form.Label>Telefono</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese Telefono"
                                {...getFieldProps('Telefono')}
                                isInvalid={!!formik.errors.Telefono && formik.touched.Telefono}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Telefono}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="formTiempo">
                        <Form.Label>Tiempo</Form.Label>
                        <InputGroup>
                            <Form.Control
                            type="time"
                            {...getFieldProps('Tiempo')}
                            isInvalid={!!formik.errors.Tiempo && formik.touched.Tiempo}
                            />
                            <Form.Control.Feedback type="invalid">
                            {formik.errors.Tiempo}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group controlId="formArchivo">
                        <Form.Label>Imagen</Form.Label>
                        <InputGroup>
                            {/* Si aún no se ha subido ningún archivo */}
                            {!formik.values.Imagen || typeof formik.values.Imagen !== 'string' ? (
                                <Form.Control
                                    type="file"
                                    placeholder="Seleccione un archivo"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        formik.setFieldValue('Imagen', file);
                                        if(file){
                                            handleFileUpload();
                                        }
                                    }}
                                    isInvalid={!!formik.errors.Imagen && formik.touched.Imagen}
                                />
                            ) : (
                                // Si el archivo ya ha sido subido y se tiene la ruta
                                <div className="d-flex align-items-center">
                                    <span className="me-3">{formik.values.Imagen}</span>
                                    <Button
                                        variant="secondary"
                                        className="me-2"
                                        onClick={() => {
                                            document.querySelector('#formArchivo input[type="file"]').click();
                                        }}
                                    >
                                        Cambiar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            formik.setFieldValue('Imagen', null);
                                        }}
                                    >
                                        Quitar archivo
                                    </Button>
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Imagen}
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

export default FormProyectosD;