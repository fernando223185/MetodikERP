import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCheckCircle, faExclamationTriangle, faInfoCircle,faPlay } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import {  useGetTicketIDOption, useActTicketD } from 'hooks/HelpDesk/Tickets/useTicketD';
import { actTicketAsync } from 'api/HelpDesk/Tickets/Tickets';
import IconButton from 'components/common/IconButton';
import { useNavigate } from 'react-router-dom';


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
    }

    if(ticketID){
        return{
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
        }
    }
    return initialForm;
}

const InfoDCard = ({ ticketID, isLoading, estatus, areas, conceptos, prioridad }) => {

    const { actTicketD, isLoading: isLoadingD} = useActTicketD();
    const {getTicketID, ticketIdOption, isLoading: isLoadingID, error} = useGetTicketIDOption();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: getInitialValues(ticketID),
        onSubmit: async (values) => {
            try{
                const data = {
                    ID: ticketID.ID,
                    EstatusID: values.EstatusID,
                    Prioridad: values.Prioridad,
                    ConceptoID: values.ConceptoID,
                    AreaID: values.AreaID,
                    Nombre: values.Nombre,
                    Descripcion: values.Descripcion,
                    RutaArchivo: values.RutaArchivo,
                    PersonaID: values.PersonaID,
                    EmpresaID: values.EmpresaID,
                };
                actTicketD({data});
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
            actTicketAsync({data: formik.values});
            console.log("datos enviados al store: ",formik.values);
            toast.success('Prioridad Actualizada Correctamente');
            navigate('/HelpDesk/tickets');
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
                                    <Form.Label>Titulo</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            {...getFieldProps('Nombre')}
                                            isInvalid={!!formik.errors.Nombre && formik.touched.Nombre}
                                            readOnly={true}
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
                                    isDisabled={true}
                                />
                                {formik.touched.EstatusID && formik.errors.EstatusID && (
                                    <div className="text-danger">{formik.errors.EstatusID}</div>
                                )}
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Concepto</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={conceptos.map(item => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('ConceptoID',option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(conceptos,formik.values.ConceptoID)}
                                        isDisabled={true}
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
                                        options={areas.map(item => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('AreaID',option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(areas,formik.values.AreaID)}
                                        isDisabled={true}
                                    />
                                    {formik.touched.AreaID && formik.errors.AreaID && (
                                        <div className="text-danger">{formik.errors.AreaID}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Prioridad</Form.Label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={prioridad.map(item => ({
                                            value: item.Valor,
                                            label: item.Dato,
                                        }))}
                                        onChange={option => formik.setFieldValue('Prioridad',option.value)}
                                        isLoading={isLoading}
                                        value={getOptionByValue(prioridad,formik.values.Prioridad)}
                                    />
                                    {formik.touched.Prioridad && formik.errors.Prioridad && (
                                        <div className="text-danger">{formik.errors.Prioridad}</div>
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
                                            readOnly={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.Descripcion}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                        {ticketID.Estatus === 'PENDIENTE' && (
                        <Col md={12}>
                            <Form.Group controlId="formArchivo">
                                <Form.Label>Archivo</Form.Label>
                                <InputGroup>
                                    {!formik.values.RutaArchivo ? (
                                        <Form.Control
                                            type="file"
                                            placeholder="Seleccione un archivo"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                formik.setFieldValue('RutaArchivo', file);
                                            }}
                                            isInvalid={!!formik.errors.RutaArchivo && formik.touched.RutaArchivo}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <span className="me-3">{formik.values.RutaArchivo}</span>
                                        </div>
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.RutaArchivo}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        )}
                        </Row>
                        {/* Nuevo bloque para mostrar el preview */}
                        {formik.values.RutaArchivo && (
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Form.Group controlId="formPreview">
                                        <Form.Label>Archivo</Form.Label>
                                        <div className="d-flex justify-content-center">
                                            {!formik.values.RutaArchivo.endsWith('.png') ? (
                                                <a
                                                    href={`http://localhost:5001/Archivos/${formik.values.RutaArchivo}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                    }}
                                                >
                                                    <i className="fas fa-file"></i>
                                                    Ver Adjunto
                                                </a>
                                            ) : (
                                                <a
                                                    href={`http://localhost:5001/Archivos/${formik.values.RutaArchivo}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={`http://localhost:5001/Archivos/${formik.values.RutaArchivo}`}
                                                        alt="Preview"
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '200px',
                                                            borderRadius: '10px',
                                                            border: '1px solid #ddd',
                                                            objectFit: 'contain',
                                                        }}
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
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

export default InfoDCard;
