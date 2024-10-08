import React, { useEffect } from 'react';
import { Card, Form, Row, Col, Button, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAvanzaPaqueteria } from '../../../../hooks/Comercial/Paqueteria/usePaqueteriaD';
import IconButton from 'components/common/IconButton';

const getInitialValues = (paqueteriaId) => {
  const initialForm = {
    movimiento: '',
    cliente: "0",
    origen: '',
    destino: '',
    fechaEnvio: null,
    formaPago: '',
    referenciaPago: '',
    destinatarioNombre: '',
    destinatarioTelefono: ''
  };

  if (paqueteriaId) {
    return {
      movimiento: paqueteriaId.Movimiento || '',
      cliente: paqueteriaId.Cliente || "0",
      origen: paqueteriaId.TerminalOrigen || '',
      destino: paqueteriaId.TerminalDestino || '',
      fechaEnvio: paqueteriaId.FechaEnvio ? moment(paqueteriaId.FechaEnvio, 'DD-MM-YYYY').toDate() : null,
      formaPago: paqueteriaId.FormaPago || '',
      referenciaPago: paqueteriaId.ReferenciaPago || '',
      destinatarioNombre: paqueteriaId.DestinatarioNombre || '',
      destinatarioTelefono: paqueteriaId.DestinatarioTel || ''
    };
  }
  
  return initialForm;
};

const validationSchema = Yup.object().shape({
});

const InfoDCard = ({ paqueteriaId, movimientos, clientes, origenes, formasPago, isLoading, setHasFetched }) => {

  const { avanzarPaqueteria, result: resultNew, isLoading: isLoadingNew } = useAvanzaPaqueteria();

  const formik = useFormik({
    initialValues: getInitialValues(paqueteriaId),
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values) => {
      const user = JSON.parse(localStorage.getItem('user'));

      try {
        const data = {
          ID: paqueteriaId.ID,
          Movimiento: values.movimiento,
          ClienteID: values.cliente,
          TerminalOrigenID: values.origen,
          TerminalDestinoID: values.destino,
          FechaEnvio: values.fechaEnvio ? moment(values.fechaEnvio).format('YYYY-MM-DD') : null,
          FormaPagoID: values.formaPago,
          ReferenciaPago: values.referenciaPago,
          NombreDest: values.destinatarioNombre,
          TelefonoDest: values.destinatarioTelefono,
          PersonaID : user.ID
        };
          
        avanzarPaqueteria({ data });

      } catch (error) {
        toast.error('Error al enviar el formulario', {
          theme: 'colored',
          position: 'top-right',
        });
      }
    },
  });

  useEffect(() => {
    if (resultNew && Object.keys(resultNew).length === 0) {
      console.log("resultNew es un array vacío:", resultNew);
    } else if (resultNew && resultNew.status === 200) {
        toast[resultNew.data[0].Tipo](`${resultNew.data[0].Mensaje}`, {
            theme: 'light',            
            position: resultNew.data[0].Posicion,
            icon: resultNew.data[0].Tipo === 'success' ? 
            <FontAwesomeIcon icon={faCheckCircle} /> : 
            resultNew.data[0].Tipo === 'error' ? 
            <FontAwesomeIcon icon={faExclamationTriangle} /> : 
            <FontAwesomeIcon icon={faInfoCircle} />
      });        
      
      setTimeout(() => {
          setHasFetched((prev) => !prev); 
        }, 1000)
    } else if (resultNew) {
        toast.error(`Error al guardar`, {
            theme: 'colored',
            position: 'top-right'
        });
    }  
  }, [resultNew])

  useEffect(() => {
    console.log('Formik values updated:', formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Movimiento</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={movimientos.map(item => ({
                      value: item.Valor,
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('movimiento', option.value)}
                    isLoading={isLoading}
                    value={
                      movimientos.find(item => item.Valor === formik.values.movimiento)
                        ? {
                            value: formik.values.movimiento,
                            label: movimientos.find(item => item.Valor === formik.values.movimiento).Dato,
                          }
                        : null
                    }/>
                  {formik.touched.movimiento && formik.errors.movimiento && (
                    <div className="text-danger">{formik.errors.movimiento}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Cliente</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={clientes.map(item => ({
                      value: Number(item.Valor),
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('cliente', option.value)}
                    isLoading={isLoading}
                    value={
                      clientes.find(item => Number(item.Valor) === formik.values.cliente) 
                        ? {
                            value: formik.values.cliente,
                            label: clientes.find(item => Number(item.Valor) === formik.values.cliente).Dato
                          }
                        : null
                    }
                  />
                  {formik.touched.cliente && formik.errors.cliente && (
                    <div className="text-danger">{formik.errors.cliente}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Terminal Origen</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={origenes.map(item => ({
                      value: Number(item.Valor),
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('origen', option.value)}
                    isLoading={isLoading}
                    value={
                      origenes.find(item => Number(item.Valor) === formik.values.origen)
                        ? {
                            value: formik.values.origen,
                            label: origenes.find(item => Number(item.Valor) === formik.values.origen).Dato,
                          }
                        : null
                    }/>
                  {formik.touched.origen && formik.errors.origen && (
                    <div className="text-danger">{formik.errors.origen}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Terminal Destino</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={origenes.map(item => ({
                      value: Number(item.Valor),
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('destino', option.value)}
                    isLoading={isLoading}
                    value={
                          origenes.find(item => Number(item.Valor) === formik.values.destino)
                        ? {
                            value: formik.values.destino,
                            label: origenes.find(item => Number(item.Valor) === formik.values.destino).Dato,
                          }
                        : null
                    }                  />
                  {formik.touched.destino && formik.errors.destino && (
                    <div className="text-danger">{formik.errors.destino}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de Envío</Form.Label>
                  <DatePicker
                    selected={formik.values.fechaEnvio}
                    onChange={date => formik.setFieldValue('fechaEnvio', date)}
                    className="form-control"
                    placeholderText="Selecciona una fecha"
                    dateFormat="dd-MM-yyyy"
                    locale="es"
                  />
                  {formik.touched.fechaEnvio && formik.errors.fechaEnvio && (
                    <div className="text-danger">{formik.errors.fechaEnvio}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Forma de Pago</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={formasPago.map(item => ({
                      value: Number(item.Valor),
                      label: item.Dato,
                    }))}
                    onChange={option => formik.setFieldValue('formaPago', option.value)}
                    isLoading={isLoading}
                    value={
                      formasPago.find(item => Number(item.Valor) === formik.values.formaPago)
                      ? {
                          value: formik.values.formaPago,
                          label: formasPago.find(item => Number(item.Valor) === formik.values.formaPago).Dato,
                        }
                      : null
                    }                    
                    />
                  {formik.touched.formaPago && formik.errors.formaPago && (
                    <div className="text-danger">{formik.errors.formaPago}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Referencia de Pago</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps('referenciaPago')}
                    />
                    {formik.touched.referenciaPago && formik.errors.referenciaPago && (
                      <div className="text-danger">{formik.errors.referenciaPago}</div>
                    )}
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Destinatario</h5>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps('destinatarioTelefono')}
                    />
                    {formik.touched.destinatarioTelefono && formik.errors.destinatarioTelefono && (
                      <div className="text-danger">{formik.errors.destinatarioTelefono}</div>
                    )}
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={9}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps('destinatarioNombre')}
                    />
                    {formik.touched.destinatarioNombre && formik.errors.destinatarioNombre && (
                      <div className="text-danger">{formik.errors.destinatarioNombre}</div>
                    )}
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex justify-content-start mt-2">
              {isLoadingNew ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <IconButton
                variant="falcon-default"
                size="sm"
                icon="search"
                className="mb-2 mb-sm-0"
                type = "submit"
              >
                  Buscar
              </IconButton>
              )}
            </div>
          </Card.Body>
        </Card>
      </form>
    </FormikProvider>
  );
};

export default InfoDCard;
