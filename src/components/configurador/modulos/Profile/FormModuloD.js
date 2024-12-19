import React from 'react';
import {
    faUser,
    faBook,
    faTruck,
    faRoute,
    faSearchLocation,
    faStore,
    faUsers,
    faUserSecret,
    faBox,
    faIdCard,
    faSave
  } from "@fortawesome/free-solid-svg-icons";
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetModuloIDOption, useActModulo } from 'hooks/Configurador/useModulo';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { actModuloAsync } from 'api/Configurador/Modulos/Modulos';
import * as iconMap from "@fortawesome/free-solid-svg-icons";



const getInitialValues = (moduloID) => {
    const initialForm = {
        ID:0,
        PersonaID:1,
        Nombre:'',
        Tipo:'',
        Descripcion:'',
        MenuID:0,
        NombreMenu:'',
        Icono:'',
        NombreArchivo:'',
        TipoMenu:'',
    };

    if (moduloID) {
        return{
            ID: moduloID.ID || 0,
            PersonaID: moduloID.PersonaID || 1,
            Nombre: moduloID.Nombre || '',
            Tipo: moduloID.Tipo || '',
            Descripcion: moduloID.Descripcion || '',
            MenuID: String(moduloID.MenuID || '0'),
            NombreMenu: moduloID.NombreMenu || '',
            Icono: String(moduloID.Icono || ''),
            NombreArchivo: moduloID.NombreArchivo || '',
            TipoMenu: moduloID.TipoMenu || '',
        }
    }
    return initialForm;
}

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es obligatorio'),
    Tipo: Yup.string().required('Tipo es obligatorio'),
    Descripcion: Yup.string().required('Descripción es obligatoria'),
    NombreArchivo: Yup.string().required('Nombre del archivo es obligatorio'),
});


const FormModuloD = ({moduloID, isLoading, iconos,menus,tipo}) => {
    const { actModulo, error } = useActModulo();
    const {getModuloID, moduloIdOption, isLoading: isLoadingID} = useGetModuloIDOption();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(moduloID),
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ID: moduloID.ID,
                    PersonaID: values.PersonaID,
                    Nombre: values.Nombre,
                    Tipo: values.Tipo,
                    Descripcion: values.Descripcion,
                    MenuID: values.MenuID.toString(),
                    NombreMenu: values.NombreMenu,
                    Icono: values.Icono.toString(),
                    NombreArchivo: values.NombreArchivo,
                    TipoMenu: values.TipoMenu,
                };
                actModulo({data});
            } catch (error) {
                toast.error('Error al enviar el formulario', {
                    theme: 'colored',
                    position: 'top-right',
                });
            }
        }
    })

    const getOptionByLabel = (options, value) => {
        const result = options.find(option => option.Dato === value) || null;
        if (result) {
            return { value: result.Dato, label: result.Dato };
        }
        return null;
    };

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
            actModuloAsync({data: formik.values});
            console.log("datos enviados al store: ",formik.values);
            toast.success('Modulo guardada exitosamente');
            navigate('/configuracion/modulos/');
        }catch(error) {
            toast.error('Error al guardar el Modulo');
            console.error("error al guardar los datos ", error);
        }
    }

    return(
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Card className='mb-3'>
                    <Card.Body>
                        <Row>
                        <Col md={8}>
                            <Form.Group controlId="formNombre">
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
                            <Form.Group>
                                <Form.Label>Icono</Form.Label>
                                <div className="d-flex align-items-center">
                                    {/* Select para seleccionar el icono */}
                                    <Select
                                        classNamePrefix="react-select"
                                        className='w-100'
                                        options={iconos.map(item => ({
                                            value: item.Dato,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('Icono', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByLabel(iconos, formik.values.Icono)}
                                    />
                                    
                                    {/* Previsualización del icono */}
                                    <div className="ms-3 p-2 border rounded bg-light text-center">
                                        {formik.values.Icono ? (
                                            <FontAwesomeIcon 
                                                icon={iconMap[formik.values.Icono]}  
                                                size="1x" // Ajusta el tamaño del icono aquí
                                            />
                                        ) : (
                                            <p>No icono seleccionado</p> // Mensaje por defecto si no se selecciona un icono
                                        )}
                                    </div>
                                </div>
                                {formik.touched.Icono && formik.errors.Icono && (
                                    <div className="text-danger">{formik.errors.Icono}</div>
                                )}
                            </Form.Group>
                        </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripcion</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Descripcion"
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
                                <Form.Group controlId='formTipo'>
                                    <Form.Label>Tipo</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <select
                                            classNamePrefix="react-select"
                                            className="form-control" 
                                            value={formik.values.Tipo} 
                                            onChange={e => formik.setFieldValue('Tipo', e.target.value)}
                                        >
                                            <option value="Selecciona">Selecciona un Tipo</option>
                                            <option value="Menu">Menu</option>
                                            <option value="Modulo">Modulo</option>
                                            <option value="Catalogo">Catalogo</option>                                        
                                        </select>
                                    </div>
                                    {formik.touched.Tipo && formik.errors.Tipo && (
                                        <div className="text-danger">{formik.errors.Tipo}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            {formik.values.Tipo === 'Catalogo' || formik.values.Tipo === 'Modulo' ? (
                            <Col md={6}>
                                <Form.Group controlId="formRuta">
                                    <Form.Label>Ruta</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la ruta"
                                            {...getFieldProps('NombreArchivo')}
                                            isInvalid={!!formik.errors.NombreArchivo && formik.touched.NombreArchivo}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.NombreArchivo}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            ) : null}
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Tipo Menu</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={tipo.map(item => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('TipoMenu',option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(tipo,formik.values.TipoMenu)}
                                    />
                                    {formik.touched.TipoMenu && formik.errors.TipoMenu && (
                                        <div className="text-danger">{formik.errors.TipoMenu}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        {formik.values.Tipo === 'Modulo' ? (
                        <Row className="mt-3">
                            <Col md={12}>
                            <Form.Group controlId="formMenu">
                                <Form.Label>Menú</Form.Label>
                                <InputGroup>
                                <Select
                                    classNamePrefix="react-select"
                                    className="w-100"
                                    options={menus.map(item => ({
                                    value: item.Valor,
                                    label: item.Dato,
                                    }))}
                                    onChange={option => formik.setFieldValue('MenuID', option.value)}
                                    isLoading={isLoading}
                                    value={getOptionByValue(menus, formik.values.MenuID)}
                                />
                                </InputGroup>
                            </Form.Group>
                            </Col>
                        </Row>
                        ) : null}
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

export default FormModuloD;