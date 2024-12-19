import React, {useState}from 'react';
import { Card, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import IconButton from 'components/common/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGetTicketIDOption, useActTicketD, useSubirArchivo } from 'hooks/HelpDesk/Tickets/useTicketD';
import { actTicketAsync } from 'api/HelpDesk/Tickets/Tickets';

const getInitialValues = (ticketID) => {
    const initialForm = {
        ID: 0,
        EstatusID: '5',
        Prioridad: '',
        ConceptoID: '0',
        AreaID: '0',
        Nombre: '',
        Descripcion: '',
        RutaArchivo: '',
        PersonaID: 1,
        EmpresaID: 1,
    };

    if (ticketID) {
        return {
            ID: ticketID.ID || 0,
            EstatusID: String(ticketID.EstatusID || '5'),
            Prioridad: ticketID.Prioridad || '',
            ConceptoID: String(ticketID.ConceptoID || '0'),
            AreaID: String(ticketID.AreaID || '0'),
            Nombre: ticketID.Nombre || '',
            Descripcion: ticketID.Descripcion || '',
            RutaArchivo: ticketID.RutaArchivo || '',
            PersonaID: ticketID.PersonaID || 1,
            EmpresaID: ticketID.EmpresaID || 1,
        };
    }
    return initialForm;
};

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'),
    Descripcion: Yup.string().required('Descripción es requerida'),
});

const FormTicketsD = ({ ticketID, isLoading, estatus, areas, conceptos, prioridad }) => {
    const {ruta, setRuta} = useState(null);
    const { actTicketD } = useActTicketD();
    const { subirArchivo,result:resultadoarchivo, isLoading: isUploading } = useSubirArchivo();
    const { getTicketID } = useGetTicketIDOption();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(ticketID),
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Asegurar que RutaArchivo es una cadena antes de enviarlo
                const data = {
                    ...values,
                    RutaArchivo: typeof values.RutaArchivo === 'object' && values.RutaArchivo.name
                        ? resultadoarchivo.path
                        : values.RutaArchivo,
                };
        
                // Llamada al backend
                await actTicketD({ data });
                toast.success('Ticket guardado exitosamente');
            } catch (error) {
                console.error(error);
                toast.error('Error al enviar el formulario');
            }
        },        
    });

    console.log(resultadoarchivo)
    

    const handleFileUpload = async () => {
        if (formik.values.RutaArchivo && formik.values.RutaArchivo instanceof File) {
            try {
                const response = await subirArchivo({ file: formik.values.RutaArchivo, tipo: "Tickets" });
    
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

    console.log("ruta archivo", formik.values.RutaArchivo);

    const handleSave = async () => {
        try {
            if (formik.values.RutaArchivo && formik.values.RutaArchivo instanceof File) {
                // Subir el archivo y esperar a que se complete
                await handleFileUpload();
            }
    
            // Asegurarse de que se llama al envío del formulario después de actualizar RutaArchivo
            setTimeout(() => {
                formik.handleSubmit();
                navigate('/HelpDesk/tickets');
            }, 0);
        } catch (error) {
            toast.error('Error al guardar el formulario');
        }
    };
    
    
    

    const { getFieldProps } = formik;

    const getOptionByValue = (options, value) => {
        const result = options.find((option) => option.Valor === value) || null;
        return result ? { value: result.Valor, label: result.Dato } : null;
    };

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Card className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Titulo</Form.Label>
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
                                        options={estatus.map((item) => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={(option) => formik.setFieldValue('EstatusID', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(estatus, formik.values.EstatusID)}
                                        isDisabled={true}
                                    />
                                    {formik.touched.EstatusID && formik.errors.EstatusID && (
                                        <div className="text-danger">{formik.errors.EstatusID}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Concepto</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={conceptos.map((item) => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={(option) => formik.setFieldValue('ConceptoID', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(conceptos, formik.values.ConceptoID)}
                                    />
                                    {formik.touched.ConceptoID && formik.errors.ConceptoID && (
                                        <div className="text-danger">{formik.errors.ConceptoID}</div>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Area</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={areas.map((item) => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={(option) => formik.setFieldValue('AreaID', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(areas, formik.values.AreaID)}
                                    />
                                    {formik.touched.AreaID && formik.errors.AreaID && (
                                        <div className="text-danger">{formik.errors.AreaID}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Prioridad</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={prioridad.map((item) => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={(option) => formik.setFieldValue('Prioridad', option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(prioridad, formik.values.Prioridad)}
                                    />
                                    {formik.touched.Prioridad && formik.errors.Prioridad && (
                                        <div className="text-danger">{formik.errors.Prioridad}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
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
                        <Row className="mt-3">
                            <Col md={12}>
                            <Form.Group controlId="formArchivo">
                                <Form.Label>Archivo</Form.Label>
                                <InputGroup>
                                    {/* Si aún no se ha subido ningún archivo */}
                                    {!formik.values.RutaArchivo || typeof formik.values.RutaArchivo !== 'string' ? (
                                        <Form.Control
                                            type="file"
                                            placeholder="Seleccione un archivo"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                formik.setFieldValue('RutaArchivo', file);
                                                if(file){
                                                    handleFileUpload();
                                                }
                                            }}
                                            isInvalid={!!formik.errors.RutaArchivo && formik.touched.RutaArchivo}
                                        />
                                    ) : (
                                        // Si el archivo ya ha sido subido y se tiene la ruta
                                        <div className="d-flex align-items-center">
                                            <span className="me-3">{formik.values.RutaArchivo}</span>
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
                                                    formik.setFieldValue('RutaArchivo', null);
                                                }}
                                            >
                                                Quitar archivo
                                            </Button>
                                        </div>
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.RutaArchivo}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-4">
                            <IconButton
                                variant="falcon-primary"
                                size="sm"
                                className="mb-2 mb-sm-0 me-2 d-flex align-items-center"
                                title="Guardar"
                                onClick={handleSave}
                                disabled={isUploading || isLoading}
                            >
                                <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar
                            </IconButton>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </FormikProvider>
    );
};

export default FormTicketsD;
